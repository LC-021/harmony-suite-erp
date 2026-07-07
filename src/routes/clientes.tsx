import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import { clientes, currency } from "@/lib/mock-data";

export const Route = createFileRoute("/clientes")({
  head: () => ({ meta: [{ title: "Clientes · Colchões & Cia" }] }),
  component: Clientes,
});

function Clientes() {
  const [q, setQ] = useState("");
  const filtered = clientes.filter((c) =>
    q === "" || c.nome.toLowerCase().includes(q.toLowerCase()) || c.documento.includes(q),
  );

  return (
    <div className="space-y-4">
      <PageHeader
        title="Clientes"
        description="Cadastro completo com histórico de compras e financeiro"
        actions={<Button size="sm" className="bg-gradient-primary shadow-glow"><Plus className="h-4 w-4 mr-1.5" /> Novo cliente</Button>}
      />
      <Card className="shadow-card">
        <CardContent className="p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nome ou CPF/CNPJ…" className="pl-8" />
          </div>
          <div className="overflow-x-auto rounded-md border border-border/60">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground bg-muted/30">
                <tr>
                  <th className="text-left px-3 py-2.5">Nome</th>
                  <th className="text-left px-3 py-2.5">CPF/CNPJ</th>
                  <th className="text-left px-3 py-2.5">Telefone</th>
                  <th className="text-left px-3 py-2.5">Cidade</th>
                  <th className="text-center px-3 py-2.5">Compras</th>
                  <th className="text-right px-3 py-2.5">Total</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-t border-border/60 hover:bg-muted/40">
                    <td className="px-3 py-2.5 font-medium">{c.nome}</td>
                    <td className="px-3 py-2.5 text-muted-foreground">{c.documento}</td>
                    <td className="px-3 py-2.5">{c.telefone}</td>
                    <td className="px-3 py-2.5">{c.cidade}</td>
                    <td className="px-3 py-2.5 text-center tabular-nums">{c.compras}</td>
                    <td className="px-3 py-2.5 text-right tabular-nums font-medium">{currency(c.totalGasto)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
