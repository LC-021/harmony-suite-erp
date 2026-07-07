import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeader } from "@/components/page-header";
import { auditoria } from "@/lib/mock-data";

export const Route = createFileRoute("/auditoria")({
  head: () => ({ meta: [{ title: "Auditoria · Colchões & Cia" }] }),
  component: Auditoria,
});

function Auditoria() {
  return (
    <div className="space-y-4">
      <PageHeader title="Auditoria" description="Rastreabilidade de todas as ações do sistema" />
      <Card className="shadow-card">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-muted-foreground border-b border-border">
              <tr>
                <th className="text-left px-4 py-2.5">Usuário</th>
                <th className="text-left px-4 py-2.5">Ação</th>
                <th className="text-left px-4 py-2.5">Detalhe</th>
                <th className="text-left px-4 py-2.5">IP</th>
                <th className="text-left px-4 py-2.5">Data · Hora</th>
              </tr>
            </thead>
            <tbody>
              {auditoria.map((a) => (
                <tr key={a.id} className="border-b border-border/60 hover:bg-muted/40">
                  <td className="px-4 py-2.5 font-medium flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" /> {a.usuario}
                  </td>
                  <td className="px-4 py-2.5">{a.acao}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{a.detalhe}</td>
                  <td className="px-4 py-2.5 tabular-nums text-muted-foreground">{a.ip}</td>
                  <td className="px-4 py-2.5 tabular-nums">{a.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
