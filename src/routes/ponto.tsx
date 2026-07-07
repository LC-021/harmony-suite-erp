import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn, Coffee, LogOut, Utensils, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { funcionarios } from "@/lib/mock-data";

export const Route = createFileRoute("/ponto")({
  head: () => ({ meta: [{ title: "Ponto Eletrônico · Colchões & Cia" }] }),
  component: Ponto,
});

const espelho = [
  { data: "07/07", entrada: "08:02", almoco: "12:00", retorno: "13:02", saida: "18:05", horas: "9h 03m", extra: "+00h 03m" },
  { data: "06/07", entrada: "08:15", almoco: "12:05", retorno: "13:04", saida: "18:00", horas: "8h 36m", extra: "—" },
  { data: "05/07", entrada: "07:58", almoco: "12:00", retorno: "13:00", saida: "18:30", horas: "9h 32m", extra: "+00h 32m" },
  { data: "04/07", entrada: "08:22", almoco: "12:10", retorno: "13:08", saida: "18:00", horas: "8h 20m", extra: "—" },
  { data: "03/07", entrada: "—", almoco: "—", retorno: "—", saida: "—", horas: "Falta", extra: "-8h 00m" },
];

function Ponto() {
  const [ultimo, setUltimo] = useState("Entrada · 08:02");
  const bater = (tipo: string) => {
    const now = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    setUltimo(`${tipo} · ${now}`);
    toast.success(`Ponto registrado: ${tipo}`, { description: now });
  };

  return (
    <div className="space-y-4">
      <PageHeader title="Ponto Eletrônico" description="Registro e cálculo automático de horas" />

      <Card className="shadow-card bg-gradient-surface border-primary/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase text-muted-foreground">Bem-vindo(a)</p>
              <p className="text-xl font-semibold mt-1">Roberto Silva</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                <Clock className="h-3.5 w-3.5" /> Último registro: {ultimo}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full md:w-auto">
              <Button className="bg-success text-success-foreground hover:bg-success/90" onClick={() => bater("Entrada")}>
                <LogIn className="h-4 w-4 mr-1.5" /> Entrada
              </Button>
              <Button variant="outline" onClick={() => bater("Saída almoço")}>
                <Utensils className="h-4 w-4 mr-1.5" /> Almoço
              </Button>
              <Button variant="outline" onClick={() => bater("Retorno almoço")}>
                <Coffee className="h-4 w-4 mr-1.5" /> Retorno
              </Button>
              <Button variant="destructive" onClick={() => bater("Saída")}>
                <LogOut className="h-4 w-4 mr-1.5" /> Saída
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { t: "Horas trabalhadas (mês)", v: "168h 40m", tone: "text-primary" },
          { t: "Horas extras", v: "+04h 12m", tone: "text-success" },
          { t: "Horas negativas", v: "-01h 20m", tone: "text-warning" },
          { t: "Faltas", v: "1", tone: "text-destructive" },
        ].map((s, i) => (
          <Card key={i} className="shadow-card"><CardContent className="p-4">
            <p className="text-xs uppercase text-muted-foreground">{s.t}</p>
            <p className={`mt-2 text-2xl font-semibold ${s.tone}`}>{s.v}</p>
          </CardContent></Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-2 flex-row items-center justify-between">
          <CardTitle className="text-base">Espelho de ponto — semana atual</CardTitle>
          <Button size="sm" variant="outline"><Send className="h-4 w-4 mr-1.5" /> Solicitar ajuste</Button>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-muted-foreground border-b border-border">
              <tr>
                <th className="text-left px-4 py-2">Data</th>
                <th className="text-left px-4 py-2">Entrada</th>
                <th className="text-left px-4 py-2">Almoço</th>
                <th className="text-left px-4 py-2">Retorno</th>
                <th className="text-left px-4 py-2">Saída</th>
                <th className="text-left px-4 py-2">Horas</th>
                <th className="text-left px-4 py-2">Extra/Negativa</th>
              </tr>
            </thead>
            <tbody>
              {espelho.map((e, i) => (
                <tr key={i} className="border-b border-border/60 hover:bg-muted/40 tabular-nums">
                  <td className="px-4 py-2.5 font-medium">{e.data}</td>
                  <td className="px-4 py-2.5">{e.entrada}</td>
                  <td className="px-4 py-2.5">{e.almoco}</td>
                  <td className="px-4 py-2.5">{e.retorno}</td>
                  <td className="px-4 py-2.5">{e.saida}</td>
                  <td className="px-4 py-2.5">{e.horas}</td>
                  <td className={`px-4 py-2.5 ${e.extra.startsWith("+") ? "text-success" : e.extra.startsWith("-") ? "text-destructive" : "text-muted-foreground"}`}>{e.extra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-base">Presença hoje</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {funcionarios.map((f) => (
              <div key={f.id} className="flex items-center justify-between rounded-md border border-border/60 px-3 py-2">
                <div>
                  <p className="text-sm font-medium">{f.nome}</p>
                  <p className="text-xs text-muted-foreground">{f.setor}</p>
                </div>
                <span className={`text-xs ${f.presente ? "text-success" : "text-destructive"}`}>
                  {f.presente ? `✓ ${f.ultimoPonto}` : "Ausente"}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2"><CardTitle className="text-base">Solicitações pendentes</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground py-8 text-center">
            Nenhuma solicitação pendente.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
