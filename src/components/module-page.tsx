import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";

export type ModuleRow = { id: string; cols: string[]; status: string };

export function ModulePage({
  title, description, novo, kpis, headers, rows, statuses,
}: {
  title: string; description: string; novo: string;
  kpis: { label: string; value: string }[];
  headers: string[]; rows: ModuleRow[]; statuses: string[];
}) {
  const [q, setQ] = useState("");
  const [f, setF] = useState("Todos");
  const list = rows.filter(
    (r) => (f === "Todos" || r.status === f) && (q === "" || [r.id, ...r.cols].join(" ").toLowerCase().includes(q.toLowerCase())),
  );
  return (
    <div className="space-y-4">
      <PageHeader title={title} description={description}
        actions={<Button size="sm" className="bg-gradient-primary shadow-glow" onClick={() => toast.info(`${novo}: formulário em breve`)}><Plus className="h-4 w-4 mr-1.5" /> {novo}</Button>} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k) => (
          <Card key={k.label} className="shadow-card"><CardContent className="p-4">
            <p className="text-xs text-muted-foreground">{k.label}</p>
            <p className="text-2xl font-semibold mt-1 tabular-nums">{k.value}</p>
          </CardContent></Card>
        ))}
      </div>
      <Card className="shadow-card"><CardContent className="p-4 space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar…" className="pl-8" />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Todos", ...statuses].map((s) => (
              <button key={s} onClick={() => setF(s)}
                className={`text-xs px-2.5 py-1.5 rounded-md border transition-colors ${f === s ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted/60"}`}>{s}</button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto rounded-md border border-border/60">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-muted-foreground bg-muted/30">
              <tr><th className="text-left px-3 py-2.5">Código</th>{headers.map((h) => <th key={h} className="text-left px-3 py-2.5">{h}</th>)}<th className="text-left px-3 py-2.5">Status</th></tr>
            </thead>
            <tbody>
              {list.map((r) => (
                <tr key={r.id} className="border-t border-border/60 hover:bg-muted/40">
                  <td className="px-3 py-2.5 font-medium">{r.id}</td>
                  {r.cols.map((c, i) => <td key={i} className="px-3 py-2.5">{c}</td>)}
                  <td className="px-3 py-2.5"><span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs text-primary">{r.status}</span></td>
                </tr>
              ))}
              {list.length === 0 && <tr><td colSpan={headers.length + 2} className="text-center py-10 text-muted-foreground">Nenhum registro encontrado.</td></tr>}
            </tbody>
          </table>
        </div>
      </CardContent></Card>
    </div>
  );
}
