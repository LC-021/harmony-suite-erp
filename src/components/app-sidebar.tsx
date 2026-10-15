import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import { canAccess, ROLE_LABELS } from "@/lib/permissions";
import {
  LayoutDashboard,
  ShoppingCart,
  QrCode,
  Package,
  Users,
  Wallet,
  FileText,
  UserCog,
  Clock,
  Boxes,
  Bell,
  ShieldCheck,
  BarChart3,
  LogOut,
  Building2,
  Headset,
  ShoppingBag,
  PackageCheck,
  Truck,
  Undo2,
  KeyRound,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const groups = [
  {
    label: "Visão geral",
    items: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
    ],
  },
  {
    label: "Operação",
    items: [
      { title: "Pedidos", url: "/pedidos", icon: ShoppingCart },
      { title: "Pix", url: "/pix", icon: QrCode },
      { title: "Produtos", url: "/produtos", icon: Package },
      { title: "Clientes", url: "/clientes", icon: Users },
      { title: "Estoque", url: "/estoque", icon: Boxes },
      { title: "SAC", url: "/sac", icon: Headset },
      { title: "Compras", url: "/compras", icon: ShoppingBag },
    ],
  },
  {
    label: "Logística",
    items: [
      { title: "Expedição", url: "/expedicao", icon: PackageCheck },
      { title: "Logística", url: "/logistica", icon: Truck },
      { title: "Logística Reversa", url: "/logistica-reversa", icon: Undo2 },
    ],
  },
  {
    label: "Financeiro",
    items: [
      { title: "Caixa", url: "/financeiro", icon: Wallet },
      { title: "Boletos", url: "/boletos", icon: FileText },
    ],
  },
  {
    label: "Pessoas",
    items: [
      { title: "RH", url: "/rh", icon: UserCog },
      { title: "Ponto Eletrônico", url: "/ponto", icon: Clock },
    ],
  },
  {
    label: "Sistema",
    items: [
      { title: "Notificações", url: "/notificacoes", icon: Bell },
      { title: "Auditoria", url: "/auditoria", icon: ShieldCheck },
      { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
      { title: "Usuários e perfis", url: "/usuarios", icon: KeyRound },
    ],
  },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { roles, nome, user, signOut } = useAuth();
  const navigate = useNavigate();
  const visible = groups
    .map((g) => ({ ...g, items: g.items.filter((i) => canAccess(roles, i.url)) }))
    .filter((g) => g.items.length > 0);
  const roleText = roles.length ? roles.map((r) => ROLE_LABELS[r]).join(", ") : "Sem perfil";
  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/login", replace: true });
  };
  const isActive = (url: string) => (url === "/" ? pathname === "/" : pathname.startsWith(url));

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-primary shadow-glow">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold leading-none">Colchões & Cia</span>
            <span className="text-xs text-muted-foreground">ERP Corporativo</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {visible.map((g) => (
          <SidebarGroup key={g.label}>
            <SidebarGroupLabel>{g.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {g.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Sair" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex items-center gap-2 px-2 py-2 group-data-[collapsible=icon]:hidden">
          <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
            {(nome || "U").slice(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col text-xs min-w-0">
            <span className="font-medium truncate">{nome || user?.email}</span>
            <span className="text-muted-foreground truncate">{roleText}</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
