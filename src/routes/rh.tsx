import { createFileRoute } from "@tanstack/react-router";
import { UserCog, Calendar, Clock, FileText, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { funcionarios } from "@/lib/mock-data";

export const Route = createFileRoute("/rh")({
  head: () => ({ meta: [{ title: "RH · Colchões & Cia" }] }),
  component: RH,
});

function RH() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Recursos Humanos"
        description="Funcionários, banco de horas, férias e holerites"
        actions={<Button size="sm" className="bg-gradient-primary shadow-glow"><Plus className="h-4 w-4 mr-1.5" /> Novo funcionário</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {[
          { t: "Funcionários", v: funcionarios.length, i: UserCog },
          { t: "Presentes hoje", v: funcionarios.filter(f => f.presente).length, i: Clock },
          { t: "Férias no mês", v: 2, i: Calendar },
          { t: "Holerites emitidos", v: 24, i: FileText },
        ].map((s, i) => (
          <Card key={i} className="shadow-card"><CardContent className="p-4 flex items-start justify-between">
            <div><p className="text-xs uppercase text-muted-foreground">{s.t}</p>
            <p className="mt-2 text-2xl font-semibold">{s.v}</p></div>
            <s.i className="h-5 w-5 text-primary" />
          </CardContent></Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-2"><CardTitle className="text-base">Quadro de funcionários</CardTitle></CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-muted-foreground border-b border-border">
              <tr>
                <th className="text-left px-4 py-2">Nome</th>
                <th className="text-left px-4 py-2">Cargo</th>
                <th className="text-left px-4 py-2">Setor</th>
                <th className="text-left px-4 py-2">Situação</th>
                <th className="text-left px-4 py-2">Último ponto</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.map((f) => (
                <tr key={f.id} className="border-b border-border/60 hover:bg-muted/40">
                  <td className="px-4 py-2.5 font-medium">{f.nome}</td>
                  <td className="px-4 py-2.5">{f.cargo}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{f.setor}</td>
                  <td className="px-4 py-2.5">
                    <span className={`inline-flex items-center gap-1.5 text-xs rounded-full px-2 py-0.5 border ${
                      f.presente ? "bg-success/15 text-success border-success/30" : "bg-destructive/15 text-destructive border-destructive/30"
                    }`}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {f.presente ? "Presente" : "Ausente"}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 tabular-nums">{f.ultimoPonto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
