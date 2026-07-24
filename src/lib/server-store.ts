import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

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
};

type PendingOtp = {
  phone: string;
  code: string;
  expiresAt: number;
};

type SessionRecord = {
  token: string;
  userId: string;
  expiresAt: number;
};

type StoreState = {
  users: UserRecord[];
  invoices: InvoiceRecord[];
  rewardSlabs: RewardSlab[];
  redemptionOpen: boolean;
  pendingOtps: PendingOtp[];
  sessions: SessionRecord[];
};

const dataDirectory = path.join(process.cwd(), "data");
const storePath = path.join(dataDirectory, "snt-store.json");

const defaultSlabs: RewardSlab[] = [
  { level: "Level 1", target: 50, gift: "Basic appliance or branded gift", tone: "Starter" },
  { level: "Level 2", target: 100, gift: "Premium home appliance", tone: "Growth" },
  { level: "Level 3", target: 200, gift: "High-value consumer device", tone: "Momentum" },
  { level: "Mega", target: 250, gift: "Top-tier reward, bike, or flagship device", tone: "Elite" }
];

function createInitialState(): StoreState {
  return {
    users: [],
    invoices: [],
    rewardSlabs: defaultSlabs,
    redemptionOpen: false,
    pendingOtps: [],
    sessions: []
  };
}

function ensureStore() {
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }

  if (!fs.existsSync(storePath)) {
    fs.writeFileSync(storePath, JSON.stringify(createInitialState(), null, 2), "utf8");
  }
}

function readState(): StoreState {
  ensureStore();

  try {
    return JSON.parse(fs.readFileSync(storePath, "utf8")) as StoreState;
  } catch {
    const initialState = createInitialState();
    fs.writeFileSync(storePath, JSON.stringify(initialState, null, 2), "utf8");
    return initialState;
  }
}

function writeState(state: StoreState) {
  ensureStore();
  fs.writeFileSync(storePath, JSON.stringify(state, null, 2), "utf8");
}

function cleanPhone(phone: string) {
  return phone.replace(/\s+/g, "").trim();
}

export function requestOtp(phone: string) {
  const state = readState();
  const normalizedPhone = cleanPhone(phone);
  const code = process.env.NODE_ENV === "production" ? String(crypto.randomInt(100000, 999999)) : "123456";

  state.pendingOtps = state.pendingOtps.filter((item) => item.phone !== normalizedPhone);
  state.pendingOtps.push({ phone: normalizedPhone, code, expiresAt: Date.now() + 5 * 60 * 1000 });
  writeState(state);

  return { phone: normalizedPhone, expiresInSeconds: 300, code, devCode: process.env.NODE_ENV === "production" ? undefined : code };
}

export function verifyOtp(phone: string, code: string) {
  const state = readState();
  const normalizedPhone = cleanPhone(phone);
  const pending = state.pendingOtps.find((item) => item.phone === normalizedPhone);

  if (!pending || pending.expiresAt < Date.now() || pending.code !== code.trim()) {
    return null;
  }

  state.pendingOtps = state.pendingOtps.filter((item) => item.phone !== normalizedPhone);
  writeState(state);
  return normalizedPhone;
}

export function findOrCreateRetailer(input: { phone: string; name: string; shopName: string; city: string }) {
  const state = readState();
  const phone = cleanPhone(input.phone);
  const existing = state.users.find((user) => user.phone === phone && user.role === "retailer");

  if (existing) {
    existing.name = input.name.trim() || existing.name;
    existing.shopName = input.shopName.trim() || existing.shopName;
    existing.city = input.city.trim() || existing.city;
    writeState(state);
    return existing;
  }

  const user: UserRecord = {
    id: crypto.randomUUID(),
    name: input.name.trim() || "SNT Rice retailer",
    phone,
    shopName: input.shopName.trim() || "Retail outlet",
    city: input.city.trim() || "India",
    role: "retailer",
    createdAt: new Date().toISOString()
  };

  state.users.push(user);
  writeState(state);
  return user;
}

export function findOrCreateGoogleRetailer(input: { email: string; name: string }) {
  const state = readState();
  const existing = state.users.find((user) => user.email === input.email && user.role === "retailer");
  if (existing) return existing;

  const user: UserRecord = {
    id: crypto.randomUUID(),
    name: input.name || "SNT Rice retailer",
    phone: `google:${input.email}`,
    email: input.email,
    shopName: "Retail outlet",
    city: "India",
    role: "retailer",
    createdAt: new Date().toISOString()
  };
  state.users.push(user);
  writeState(state);
  return user;
}

export function getOrCreateAdmin() {
  const state = readState();
  const existing = state.users.find((user) => user.role === "admin");

  if (existing) {
    return existing;
  }

  const admin: UserRecord = {
    id: "admin-primary",
    name: "SNT Rice Admin",
    phone: "admin",
    shopName: "SNT Rice Operations",
    city: "India",
    role: "admin",
    createdAt: new Date().toISOString()
  };

  state.users.push(admin);
  writeState(state);
  return admin;
}

export function createSession(userId: string) {
  const state = readState();
  const token = crypto.randomBytes(32).toString("hex");
  state.sessions = state.sessions.filter((session) => session.userId !== userId && session.expiresAt > Date.now());
  state.sessions.push({ token, userId, expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000 });
  writeState(state);
  return token;
}

export function getUserBySession(token: string | undefined) {
  if (!token) return null;

  const state = readState();
  const session = state.sessions.find((item) => item.token === token && item.expiresAt > Date.now());
  return session ? state.users.find((user) => user.id === session.userId) ?? null : null;
}

export function createInvoice(input: Omit<InvoiceRecord, "id" | "status" | "createdAt">) {
  const state = readState();
  const invoice: InvoiceRecord = {
    ...input,
    id: crypto.randomUUID(),
    status: "pending",
    createdAt: new Date().toISOString()
  };
  state.invoices.unshift(invoice);
  writeState(state);
  return invoice;
}

export function getInvoicesForUser(userId: string) {
  return readState().invoices.filter((invoice) => invoice.userId === userId);
}

export function getAllInvoices() {
  const state = readState();
  return state.invoices.map((invoice) => ({
    ...invoice,
    user: state.users.find((user) => user.id === invoice.userId) ?? null
  }));
}

export function updateInvoiceStatus(id: string, status: InvoiceStatus) {
  const state = readState();
  const invoice = state.invoices.find((item) => item.id === id);
  if (!invoice) return null;

  invoice.status = status;
  invoice.reviewedAt = new Date().toISOString();
  writeState(state);
  return invoice;
}

export function getRewards() {
  const state = readState();
  return { rewardSlabs: state.rewardSlabs, redemptionOpen: state.redemptionOpen };
}

export function updateRewards(input: { rewardSlabs?: RewardSlab[]; redemptionOpen?: boolean }) {
  const state = readState();
  if (input.rewardSlabs) state.rewardSlabs = input.rewardSlabs;
  if (typeof input.redemptionOpen === "boolean") state.redemptionOpen = input.redemptionOpen;
  writeState(state);
  return { rewardSlabs: state.rewardSlabs, redemptionOpen: state.redemptionOpen };
}

export function getDashboardData(userId: string) {
  const state = readState();
  const user = state.users.find((item) => item.id === userId);
  const invoices = state.invoices.filter((invoice) => invoice.userId === userId);
  const approvedBags = invoices
    .filter((invoice) => invoice.status === "accepted" || invoice.status === "claimed")
    .reduce((total, invoice) => total + invoice.quantity, 0);
  const pendingCount = invoices.filter((invoice) => invoice.status === "pending").length;
  const currentSlab = [...state.rewardSlabs].reverse().find((slab) => approvedBags >= slab.target) ?? state.rewardSlabs[0];
  const nextSlab = state.rewardSlabs.find((slab) => approvedBags < slab.target);

  return {
    user,
    invoices,
    approvedBags,
    pendingCount,
    currentSlab,
    nextSlab: nextSlab ?? null,
    redemptionOpen: state.redemptionOpen,
    rewardSlabs: state.rewardSlabs
  };
}

export function getRetailers() {
  const state = readState();
  return state.users.filter((user) => user.role === "retailer").map((user) => {
    const invoices = state.invoices.filter((invoice) => invoice.userId === user.id);
    const approvedBags = invoices.filter((invoice) => invoice.status === "accepted" || invoice.status === "claimed").reduce((total, invoice) => total + invoice.quantity, 0);
    const currentSlab = [...state.rewardSlabs].reverse().find((slab) => approvedBags >= slab.target) ?? state.rewardSlabs[0];
    return { ...user, approvedBags, currentSlab: currentSlab?.level ?? "Unranked", invoiceCount: invoices.length };
  });
}
