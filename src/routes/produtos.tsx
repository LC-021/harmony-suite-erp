import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Plus, Package, Tag, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { produtos, currency } from "@/lib/mock-data";

export const Route = createFileRoute("/produtos")({
  head: () => ({ meta: [{ title: "Catálogo · Colchões & Cia" }] }),
  component: Produtos,
});

function Produtos() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("Todos");
  const [marca, setMarca] = useState<string>("Todas");

  const categorias = useMemo(() => ["Todos", ...Array.from(new Set(produtos.map((p) => p.categoria)))], []);
  const marcas = useMemo(() => ["Todas", ...Array.from(new Set(produtos.map((p) => p.marca)))], []);

  const filtered = produtos.filter(
    (p) =>
      (cat === "Todos" || p.categoria === cat) &&
      (marca === "Todas" || p.marca === marca) &&
      (q === "" ||
        p.nome.toLowerCase().includes(q.toLowerCase()) ||
        p.codigo.toLowerCase().includes(q.toLowerCase()) ||
        (p.medidas ?? "").toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div className="space-y-4">
      <PageHeader
        title="Catálogo Inteligente"
        description={`${produtos.length} produtos cadastrados · promoções aplicadas automaticamente`}
        actions={<Button size="sm" className="bg-gradient-primary shadow-glow"><Plus className="h-4 w-4 mr-1.5" /> Novo produto</Button>}
      />

      <Card className="shadow-card">
        <CardContent className="p-4 space-y-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por código, nome ou medida…" className="pl-8" />
            </div>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="rounded-md border border-border bg-input px-3 h-9 text-sm"
            >
              {categorias.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              className="rounded-md border border-border bg-input px-3 h-9 text-sm"
            >
              {marcas.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {filtered.map((p) => {
          const hasPromo = p.valorPromocional !== undefined;
          const desconto = hasPromo
            ? Math.round(((p.valorTabela - (p.valorPromocional as number)) / p.valorTabela) * 100)
            : 0;
          return (
            <Card key={p.id} className="shadow-card hover:border-primary/40 transition-colors overflow-hidden">
              <div className="aspect-video bg-gradient-surface flex items-center justify-center relative border-b border-border/60">
                <Package className="h-12 w-12 text-muted-foreground/40" />
                {hasPromo && (
                  <span className="absolute top-2 right-2 rounded-full bg-gradient-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground shadow-glow">
                    -{desconto}%
                  </span>
                )}
                <span className="absolute top-2 left-2 rounded-md bg-background/80 backdrop-blur px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  {p.marca}
                </span>
              </div>
              <CardContent className="p-3 space-y-2">
                <div className="min-h-[42px]">
                  <p className="text-sm font-medium leading-tight line-clamp-2">{p.nome}</p>
                  {p.medidas && <p className="text-xs text-muted-foreground mt-0.5">{p.medidas}</p>}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    {hasPromo ? (
                      <>
                        <p className="text-xs text-muted-foreground line-through">{currency(p.valorTabela)}</p>
                        <p className="text-base font-semibold text-primary">{currency(p.valorPromocional as number)}</p>
                      </>
                    ) : (
                      <p className="text-base font-semibold">{currency(p.valorTabela)}</p>
                    )}
                  </div>
                  <StatusBadge status={p.situacao} />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border/60">
                  <span className="flex items-center gap-1"><Tag className="h-3 w-3" /> {p.codigo}</span>
                  <span>{p.estoque > 0 ? `${p.estoque} un.` : "—"}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="shadow-card border-primary/30 bg-gradient-surface">
        <CardContent className="p-4 flex items-start gap-3">
          <div className="rounded-lg bg-primary/15 p-2 text-primary"><Sparkles className="h-5 w-5" /></div>
          <div className="text-sm">
            <p className="font-medium">Sistema Inteligente de Promoções</p>
            <p className="text-muted-foreground text-xs mt-1">
              10% por marca, Casadinha (Box + Colchão), Cabeceira + Colchão, descontos cumulativos, desconto Pix e regras por período são aplicados automaticamente na hora da venda. Vendedores acima do limite exigem aprovação do Gerente/CEO.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
