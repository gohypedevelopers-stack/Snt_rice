import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { initDb, pool } from "@/lib/db";

export type UserRole = "retailer" | "admin";
export type InvoiceStatus = "pending" | "accepted" | "rejected" | "claimed";

export type RewardSlab = {
  level: string;
  target: number;
  gift: string;
  tone: string;
};

export type UserRecord = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  shopName: string;
  city: string;
  role: UserRole;
  createdAt: string;
};

export type InvoiceRecord = {
  id: string;
  userId: string;
  invoiceDate: string;
  invoiceNumber: string;
  quantity: number;
  shopReference: string;
  notes: string;
  proofFileName?: string;
  proofFileUrl?: string;
  status: InvoiceStatus;
  createdAt: string;
  reviewedAt?: string;
  user?: UserRecord | null;
};

function cleanPhone(phone: string) {
  return phone.replace(/\s+/g, "").trim();
}

function mapUserRow(row: any): UserRecord {
  return {
    id: row.id,
    email: row.email || undefined,
    name: row.name,
    phone: row.phone,
    shopName: row.shop_name,
    city: row.city,
    role: row.role as UserRole,
    createdAt: new Date(row.created_at).toISOString()
  };
}

function mapInvoiceRow(row: any): InvoiceRecord {
  return {
    id: row.id,
    userId: row.user_id,
    invoiceDate: row.invoice_date,
    invoiceNumber: row.invoice_number,
    quantity: row.quantity,
    shopReference: row.shop_reference || "",
    notes: row.notes || "",
    proofFileName: row.proof_file_name || undefined,
    proofFileUrl: row.proof_file_url || undefined,
    status: row.status as InvoiceStatus,
    createdAt: new Date(row.created_at).toISOString(),
    reviewedAt: row.reviewed_at ? new Date(row.reviewed_at).toISOString() : undefined
  };
}

export async function requestOtp(phone: string) {
  await initDb();
  const normalizedPhone = cleanPhone(phone);
  const code = process.env.NODE_ENV === "production" ? String(crypto.randomInt(100000, 999999)) : "123456";
  const expiresAt = Date.now() + 5 * 60 * 1000;

  await pool.query(
    `INSERT INTO pending_otps (phone, code, expires_at)
     VALUES ($1, $2, $3)
     ON CONFLICT (phone) DO UPDATE SET code = $2, expires_at = $3`,
    [normalizedPhone, code, expiresAt]
  );

  return { phone: normalizedPhone, expiresInSeconds: 300, code, devCode: process.env.NODE_ENV === "production" ? undefined : code };
}

export async function verifyOtp(phone: string, code: string) {
  await initDb();
  const normalizedPhone = cleanPhone(phone);
  const result = await pool.query(`SELECT * FROM pending_otps WHERE phone = $1`, [normalizedPhone]);
  if (result.rows.length === 0) return null;

  const pending = result.rows[0];
  if (Number(pending.expires_at) < Date.now() || pending.code !== code.trim()) {
    return null;
  }

  await pool.query(`DELETE FROM pending_otps WHERE phone = $1`, [normalizedPhone]);
  return normalizedPhone;
}

export async function registerWithEmailPassword(input: {
  email: string;
  password: string;
  name: string;
  phone: string;
  shopName: string;
  city: string;
}) {
  await initDb();
  const email = input.email.trim().toLowerCase();
  const phone = cleanPhone(input.phone);

  const existingEmail = await pool.query(`SELECT id FROM users WHERE LOWER(email) = $1`, [email]);
  if (existingEmail.rows.length > 0) {
    throw new Error("An account with this email address already exists.");
  }

  const existingPhone = await pool.query(`SELECT id FROM users WHERE phone = $1`, [phone]);
  if (existingPhone.rows.length > 0) {
    throw new Error("An account with this phone number already exists.");
  }

  const passwordHash = await bcrypt.hash(input.password, 10);
  const userId = crypto.randomUUID();

  const result = await pool.query(
    `INSERT INTO users (id, email, password_hash, name, phone, shop_name, city, role, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, 'retailer', NOW())
     RETURNING *`,
    [userId, email, passwordHash, input.name.trim(), phone, input.shopName.trim(), input.city.trim()]
  );

  return mapUserRow(result.rows[0]);
}

export async function loginWithEmailPassword(input: { email: string; password: string }) {
  await initDb();
  const email = input.email.trim().toLowerCase();
  const result = await pool.query(`SELECT * FROM users WHERE LOWER(email) = $1`, [email]);

  if (result.rows.length === 0) {
    throw new Error("Invalid email or password.");
  }

  const userRow = result.rows[0];
  if (!userRow.password_hash) {
    throw new Error("This account uses Google/OTP login. Please sign in using your regular method.");
  }

  const isValid = await bcrypt.compare(input.password, userRow.password_hash);
  if (!isValid) {
    throw new Error("Invalid email or password.");
  }

  return mapUserRow(userRow);
}

export async function findOrCreateRetailer(input: { phone: string; name: string; shopName: string; city: string }) {
  await initDb();
  const phone = cleanPhone(input.phone);
  const existing = await pool.query(`SELECT * FROM users WHERE phone = $1 AND role = 'retailer'`, [phone]);

  if (existing.rows.length > 0) {
    const updated = await pool.query(
      `UPDATE users
       SET name = COALESCE(NULLIF($1, ''), name),
           shop_name = COALESCE(NULLIF($2, ''), shop_name),
           city = COALESCE(NULLIF($3, ''), city)
       WHERE id = $4 RETURNING *`,
      [input.name.trim(), input.shopName.trim(), input.city.trim(), existing.rows[0].id]
    );
    return mapUserRow(updated.rows[0]);
  }

  const userId = crypto.randomUUID();
  const created = await pool.query(
    `INSERT INTO users (id, name, phone, shop_name, city, role, created_at)
     VALUES ($1, $2, $3, $4, $5, 'retailer', NOW())
     RETURNING *`,
    [userId, input.name.trim() || "SNT Rice retailer", phone, input.shopName.trim() || "Retail outlet", input.city.trim() || "India"]
  );

  return mapUserRow(created.rows[0]);
}

export async function findOrCreateGoogleRetailer(input: { email: string; name: string }) {
  await initDb();
  const email = input.email.trim().toLowerCase();
  const existing = await pool.query(`SELECT * FROM users WHERE LOWER(email) = $1 AND role = 'retailer'`, [email]);

  if (existing.rows.length > 0) {
    return mapUserRow(existing.rows[0]);
  }

  const userId = crypto.randomUUID();
  const created = await pool.query(
    `INSERT INTO users (id, email, name, phone, shop_name, city, role, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, 'retailer', NOW())
     RETURNING *`,
    [userId, email, input.name || "SNT Rice retailer", `google:${email}`, "Retail outlet", "India"]
  );

  return mapUserRow(created.rows[0]);
}

export async function getOrCreateAdmin() {
  await initDb();
  const adminEmail = process.env.ADMIN_EMAIL || "admin@sntrice.com";
  const adminPass = process.env.ADMIN_PASSWORD || "AdminPass@2026";
  const existing = await pool.query(`SELECT * FROM users WHERE role = 'admin' LIMIT 1`);

  if (existing.rows.length > 0) {
    return mapUserRow(existing.rows[0]);
  }

  const passwordHash = await bcrypt.hash(adminPass, 10);
  const adminId = "admin-primary";
  const created = await pool.query(
    `INSERT INTO users (id, email, password_hash, name, phone, shop_name, city, role, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, 'admin', NOW())
     RETURNING *`,
    [adminId, adminEmail, passwordHash, "SNT Rice Admin", "admin", "SNT Rice Operations", "India"]
  );

  return mapUserRow(created.rows[0]);
}

export async function loginAdminWithKeyOrCredentials(input: { secret?: string; email?: string; password?: string }) {
  await initDb();
  const adminKey = process.env.SNT_ADMIN_KEY ?? "SNT@2026";

  if (input.secret && input.secret === adminKey) {
    return getOrCreateAdmin();
  }

  if (input.email && input.password) {
    const admin = await pool.query(`SELECT * FROM users WHERE LOWER(email) = $1 AND role = 'admin'`, [input.email.trim().toLowerCase()]);
    if (admin.rows.length > 0 && admin.rows[0].password_hash) {
      const isValid = await bcrypt.compare(input.password, admin.rows[0].password_hash);
      if (isValid) {
        return mapUserRow(admin.rows[0]);
      }
    }
  }

  throw new Error("Invalid admin credentials or secret key.");
}

export async function createSession(userId: string) {
  await initDb();
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;

  await pool.query(`DELETE FROM sessions WHERE user_id = $1 OR expires_at < $2`, [userId, Date.now()]);
  await pool.query(`INSERT INTO sessions (token, user_id, expires_at) VALUES ($1, $2, $3)`, [token, userId, expiresAt]);

  return token;
}

export async function getUserBySession(token: string | undefined) {
  if (!token) return null;
  await initDb();

  const sessionRes = await pool.query(
    `SELECT u.* FROM sessions s
     JOIN users u ON s.user_id = u.id
     WHERE s.token = $1 AND s.expires_at > $2`,
    [token, Date.now()]
  );

  if (sessionRes.rows.length === 0) return null;
  return mapUserRow(sessionRes.rows[0]);
}

export async function createInvoice(input: Omit<InvoiceRecord, "id" | "status" | "createdAt">) {
  await initDb();
  const id = crypto.randomUUID();

  const result = await pool.query(
    `INSERT INTO invoices (id, user_id, invoice_date, invoice_number, quantity, shop_reference, notes, proof_file_name, proof_file_url, status, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending', NOW())
     RETURNING *`,
    [id, input.userId, input.invoiceDate, input.invoiceNumber, input.quantity, input.shopReference, input.notes, input.proofFileName || null, input.proofFileUrl || null]
  );

  return mapInvoiceRow(result.rows[0]);
}

export async function getInvoicesForUser(userId: string) {
  await initDb();
  const result = await pool.query(`SELECT * FROM invoices WHERE user_id = $1 ORDER BY created_at DESC`, [userId]);
  return result.rows.map(mapInvoiceRow);
}

export async function getAllInvoices() {
  await initDb();
  const result = await pool.query(
    `SELECT i.*, u.name as user_name, u.phone as user_phone, u.shop_name as user_shop_name, u.city as user_city, u.email as user_email
     FROM invoices i
     LEFT JOIN users u ON i.user_id = u.id
     ORDER BY i.created_at DESC`
  );

  return result.rows.map((row) => ({
    ...mapInvoiceRow(row),
    user: row.user_name
      ? {
          id: row.user_id,
          name: row.user_name,
          phone: row.user_phone,
          shopName: row.user_shop_name,
          city: row.user_city,
          email: row.user_email || undefined,
          role: "retailer" as UserRole,
          createdAt: ""
        }
      : null
  }));
}

export async function updateInvoiceStatus(id: string, status: InvoiceStatus) {
  await initDb();
  const result = await pool.query(
    `UPDATE invoices
     SET status = $1, reviewed_at = NOW()
     WHERE id = $2 RETURNING *`,
    [status, id]
  );

  if (result.rows.length === 0) return null;
  return mapInvoiceRow(result.rows[0]);
}

export async function getRewards() {
  await initDb();
  const slabsRes = await pool.query(`SELECT level, target, gift, tone FROM reward_slabs ORDER BY target ASC`);
  const settingRes = await pool.query(`SELECT value FROM store_settings WHERE key = 'redemption_open'`);

  const rewardSlabs: RewardSlab[] = slabsRes.rows;
  const redemptionOpen = settingRes.rows.length > 0 ? settingRes.rows[0].value === "true" : false;

  return { rewardSlabs, redemptionOpen };
}

export async function updateRewards(input: { rewardSlabs?: RewardSlab[]; redemptionOpen?: boolean }) {
  await initDb();

  if (input.rewardSlabs && Array.isArray(input.rewardSlabs)) {
    await pool.query(`DELETE FROM reward_slabs`);
    for (const slab of input.rewardSlabs) {
      await pool.query(
        `INSERT INTO reward_slabs (level, target, gift, tone) VALUES ($1, $2, $3, $4)`,
        [slab.level, slab.target, slab.gift, slab.tone || "General"]
      );
    }
  }

  if (typeof input.redemptionOpen === "boolean") {
    await pool.query(
      `INSERT INTO store_settings (key, value) VALUES ('redemption_open', $1)
       ON CONFLICT (key) DO UPDATE SET value = $1`,
      [String(input.redemptionOpen)]
    );
  }

  return getRewards();
}

export async function getDashboardData(userId: string) {
  await initDb();
  const userRes = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);
  const user = userRes.rows.length > 0 ? mapUserRow(userRes.rows[0]) : null;

  const invoices = await getInvoicesForUser(userId);
  const approvedBags = invoices
    .filter((invoice) => invoice.status === "accepted" || invoice.status === "claimed")
    .reduce((total, invoice) => total + invoice.quantity, 0);

  const pendingCount = invoices.filter((invoice) => invoice.status === "pending").length;
  const { rewardSlabs, redemptionOpen } = await getRewards();

  const currentSlab = [...rewardSlabs].reverse().find((slab) => approvedBags >= slab.target) ?? rewardSlabs[0];
  const nextSlab = rewardSlabs.find((slab) => approvedBags < slab.target);

  return {
    user,
    invoices,
    approvedBags,
    pendingCount,
    currentSlab,
    nextSlab: nextSlab ?? null,
    redemptionOpen,
    rewardSlabs
  };
}

export async function getRetailers() {
  await initDb();
  const retailersRes = await pool.query(`SELECT * FROM users WHERE role = 'retailer' ORDER BY created_at DESC`);
  const invoicesRes = await pool.query(`SELECT user_id, quantity, status FROM invoices`);
  const { rewardSlabs } = await getRewards();

  return retailersRes.rows.map((row) => {
    const user = mapUserRow(row);
    const userInvoices = invoicesRes.rows.filter((inv) => inv.user_id === user.id);
    const approvedBags = userInvoices
      .filter((inv) => inv.status === "accepted" || inv.status === "claimed")
      .reduce((sum, inv) => sum + Number(inv.quantity), 0);

    const currentSlab = [...rewardSlabs].reverse().find((slab) => approvedBags >= slab.target) ?? rewardSlabs[0];
    return {
      ...user,
      approvedBags,
      currentSlab: currentSlab?.level ?? "Unranked",
      invoiceCount: userInvoices.length
    };
  });
}
