export type AppRole = "admin" | "financeiro" | "administrativo" | "vendas" | "rh" | "estoque";

export const ROLE_LABELS: Record<AppRole, string> = {
  admin: "Administrador (CEO)",
  financeiro: "Financeiro",
  administrativo: "Administrativo",
  vendas: "Vendas",
  rh: "RH",
  estoque: "Estoque",
};

// Which roles may open each module (admin always allowed).
const ACCESS: Record<string, AppRole[]> = {
  "/": ["financeiro", "administrativo", "vendas", "rh", "estoque"],
  "/pedidos": ["vendas", "administrativo", "financeiro"],
  "/pix": ["financeiro"],
  "/produtos": ["vendas", "estoque", "administrativo"],
  "/clientes": ["vendas", "administrativo", "financeiro"],
  "/estoque": ["estoque", "administrativo"],
  "/sac": ["vendas", "administrativo"],
  "/compras": ["estoque", "administrativo", "financeiro"],
  "/expedicao": ["estoque", "administrativo"],
  "/logistica": ["estoque", "administrativo"],
  "/logistica-reversa": ["estoque", "administrativo", "vendas"],
  "/financeiro": ["financeiro"],
  "/boletos": ["financeiro"],
  "/rh": ["rh"],
  "/ponto": ["rh", "financeiro", "administrativo", "vendas", "estoque"],
  "/notificacoes": ["financeiro", "administrativo", "vendas", "rh", "estoque"],
  "/auditoria": ["administrativo"],
  "/relatorios": ["financeiro", "administrativo", "rh"],
  "/usuarios": [],
};

export function canAccess(roles: AppRole[], path: string): boolean {
  if (roles.includes("admin")) return true;
  const key =
    path === "/" ? "/" : Object.keys(ACCESS).find((k) => k !== "/" && path.startsWith(k));
  if (!key) return true;
  return ACCESS[key].some((r) => roles.includes(r));
}
