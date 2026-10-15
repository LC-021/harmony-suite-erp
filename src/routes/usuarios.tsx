import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { ROLE_LABELS, type AppRole } from "@/lib/permissions";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/usuarios")({
  head: () => ({
    meta: [
      { title: "Usuários e perfis · Colchões & Cia ERP" },
      { name: "description", content: "Gerencie os perfis de acesso de cada usuário." },
      { property: "og:title", content: "Usuários e perfis · Colchões & Cia ERP" },
      { property: "og:description", content: "Controle de permissões por perfil." },
    ],
  }),
  component: Usuarios,
});

type Row = { id: string; nome: string; email: string; roles: AppRole[] };
const ALL = Object.keys(ROLE_LABELS) as AppRole[];

function Usuarios() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);

  const load = async () => {
    const [{ data: p }, { data: r }] = await Promise.all([
      supabase.from("profiles").select("id,nome,email").order("created_at"),
      supabase.from("user_roles").select("user_id,role"),
    ]);
    setRows(
      (p ?? []).map((x) => ({
        ...x,
        roles: (r ?? []).filter((y) => y.user_id === x.id).map((y) => y.role as AppRole),
      })),
    );
  };
  useEffect(() => { load(); }, []);

  const toggle = async (row: Row, role: AppRole, on: boolean) => {
    if (row.id === user?.id && role === "admin" && !on) return toast.error("Você não pode remover seu próprio acesso de CEO.");
    const { error } = on
      ? await supabase.from("user_roles").insert({ user_id: row.id, role })
      : await supabase.from("user_roles").delete().eq("user_id", row.id).eq("role", role);
    if (error) return toast.error(error.message);
    toast.success("Perfil atualizado");
    load();
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Usuários e perfis</h1>
        <p className="text-sm text-muted-foreground">Marque quais módulos cada pessoa pode ver. Novas contas aparecem aqui após o cadastro.</p>
      </div>
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-muted-foreground">
              <tr>
                <th className="p-3 text-left">Usuário</th>
                {ALL.map((r) => <th key={r} className="p-3 text-center font-medium">{ROLE_LABELS[r]}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-border/50">
                  <td className="p-3"><div className="font-medium">{row.nome}</div><div className="text-xs text-muted-foreground">{row.email}</div></td>
                  {ALL.map((r) => (
                    <td key={r} className="p-3 text-center">
                      <Checkbox checked={row.roles.includes(r)} onCheckedChange={(v) => toggle(row, r, !!v)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
