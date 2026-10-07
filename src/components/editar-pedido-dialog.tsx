import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { produtos, currency, type Pedido } from "@/lib/mock-data";

type Linha = { id: string; nome: string; qtd: number; valor: number; desconto: number };

function linhasIniciais(p: Pedido): Linha[] {
  const seed = Number(p.id.replace(/\D/g, "")) || 1;
  return Array.from({ length: Math.max(1, Math.min(p.itens, 4)) }, (_, i) => {
    const prod = produtos[(seed * 7 + i * 5) % produtos.length];
    return { id: prod.id + i, nome: prod.nome, qtd: 1, valor: prod.valorPromocional ?? prod.valorTabela, desconto: 0 };
  });
}

export function EditarPedidoDialog({ pedido, onClose }: { pedido: Pedido | null; onClose: () => void }) {
  return (
    <Dialog open={!!pedido} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl">
        {pedido && <Conteudo key={pedido.id} pedido={pedido} onClose={onClose} />}
      </DialogContent>
    </Dialog>
  );
}

function Conteudo({ pedido, onClose }: { pedido: Pedido; onClose: () => void }) {
  const [linhas, setLinhas] = useState<Linha[]>(() => linhasIniciais(pedido));
  const upd = (id: string, campo: keyof Linha, v: number) =>
    setLinhas((ls) => ls.map((l) => (l.id === id ? { ...l, [campo]: v } : l)));
  const total = useMemo(
    () => linhas.reduce((s, l) => s + l.qtd * l.valor * (1 - l.desconto / 100), 0),
    [linhas],
  );
  const descMax = Math.max(...linhas.map((l) => l.desconto));

  return (
    <>
      <DialogHeader>
        <DialogTitle>Editar pedido {pedido.numero} · {pedido.cliente}</DialogTitle>
      </DialogHeader>
      <div className="overflow-x-auto rounded-md border border-border/60">
        <table className="w-full text-sm">
          <thead className="text-xs uppercase text-muted-foreground bg-muted/30">
            <tr>
              <th className="text-left px-3 py-2">Produto</th>
              <th className="px-3 py-2 w-20">Qtd</th>
              <th className="px-3 py-2 w-32">Valor unit.</th>
              <th className="px-3 py-2 w-24">Desc. %</th>
              <th className="text-right px-3 py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {linhas.map((l) => (
              <tr key={l.id} className="border-t border-border/60">
                <td className="px-3 py-2">{l.nome}</td>
                <td className="px-2 py-2"><Input type="number" min={1} value={l.qtd} onChange={(e) => upd(l.id, "qtd", Math.max(1, +e.target.value))} className="h-8" /></td>
                <td className="px-2 py-2"><Input type="number" min={0} step="0.01" value={l.valor} onChange={(e) => upd(l.id, "valor", Math.max(0, +e.target.value))} className="h-8" /></td>
                <td className="px-2 py-2"><Input type="number" min={0} max={100} value={l.desconto} onChange={(e) => upd(l.id, "desconto", Math.min(100, Math.max(0, +e.target.value)))} className="h-8" /></td>
                <td className="px-3 py-2 text-right tabular-nums font-medium">{currency(l.qtd * l.valor * (1 - l.desconto / 100))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className={descMax > 15 ? "text-warning" : "text-muted-foreground"}>
          {descMax > 15 ? "Desconto acima de 15% exige aprovação do Gerente/CEO" : "Descontos dentro do limite do vendedor"}
        </span>
        <span className="text-base font-semibold">Total: {currency(total)}</span>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>Cancelar</Button>
        <Button
          className="bg-gradient-primary"
          onClick={() => {
            toast.success(descMax > 15 ? "Alterações enviadas para aprovação" : "Pedido atualizado");
            onClose();
          }}
        >
          Salvar alterações
        </Button>
      </DialogFooter>
    </>
  );
}
