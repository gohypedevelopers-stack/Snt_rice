import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_JCqVzuZd08pH@ep-falling-field-azmocv57-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require";

// Global pool instance to prevent multiple connection pools during Next.js hot reloads
const globalForPg = globalThis as unknown as { pgPool?: Pool };

export const pool =
  globalForPg.pgPool ??
  new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

if (process.env.NODE_ENV !== "production") {
  globalForPg.pgPool = pool;
}

let initPromise: Promise<void> | null = null;

export async function initDb() {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(64) PRIMARY KEY,
          email VARCHAR(255) UNIQUE,
          password_hash VARCHAR(255),
          name VARCHAR(255) NOT NULL,
          phone VARCHAR(32) NOT NULL UNIQUE,
          shop_name VARCHAR(255) NOT NULL,
          city VARCHAR(255) NOT NULL,
          role VARCHAR(32) NOT NULL DEFAULT 'retailer',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS invoices (
          id VARCHAR(64) PRIMARY KEY,
          user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          invoice_date VARCHAR(64) NOT NULL,
          invoice_number VARCHAR(128) NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 0,
          shop_reference VARCHAR(255),
          notes TEXT,
          proof_file_name VARCHAR(255),
          proof_file_url TEXT,
          status VARCHAR(32) NOT NULL DEFAULT 'pending',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          reviewed_at TIMESTAMPTZ
        );

        CREATE TABLE IF NOT EXISTS reward_slabs (
          id SERIAL PRIMARY KEY,
          level VARCHAR(64) UNIQUE NOT NULL,
          target INTEGER NOT NULL,
          gift VARCHAR(255) NOT NULL,
          tone VARCHAR(64) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS store_settings (
          key VARCHAR(64) PRIMARY KEY,
          value TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS pending_otps (
          phone VARCHAR(32) PRIMARY KEY,
          code VARCHAR(16) NOT NULL,
          expires_at BIGINT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS sessions (
          token VARCHAR(128) PRIMARY KEY,
          user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          expires_at BIGINT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS support_tickets (
          id VARCHAR(64) PRIMARY KEY,
          user_id VARCHAR(64) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          subject VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          status VARCHAR(32) NOT NULL DEFAULT 'open',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);

      // Seed default reward slabs if empty
      const slabsCheck = await client.query(`SELECT COUNT(*) FROM reward_slabs`);
      if (parseInt(slabsCheck.rows[0].count, 10) === 0) {
        await client.query(`
          INSERT INTO reward_slabs (level, target, gift, tone) VALUES
          ('Level 1', 50, 'Basic appliance or branded gift', 'Starter'),
          ('Level 2', 100, 'Premium home appliance', 'Growth'),
          ('Level 3', 200, 'High-value consumer device', 'Momentum'),
          ('Mega', 250, 'Top-tier reward, bike, or flagship device', 'Elite')
        `);
      }

      // Seed redemption setting if missing
      await client.query(`
        INSERT INTO store_settings (key, value)
        VALUES ('redemption_open', 'false')
        ON CONFLICT (key) DO NOTHING
      `);
    } finally {
      client.release();
    }
  })();

  return initPromise;
}
