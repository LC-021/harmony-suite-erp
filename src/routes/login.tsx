import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, Eye, EyeOff, LogIn } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login · Colchões & Cia ERP" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Bem-vindo(a) de volta, Carlos!");
      navigate({ to: "/" });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-surface" />
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-chart-5/15 blur-3xl" />

      <Card className="relative w-full max-w-md shadow-card border-border/60 backdrop-blur-sm bg-card/90">
        <CardContent className="p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="h-12 w-12 rounded-xl bg-gradient-primary shadow-glow flex items-center justify-center mb-3">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold">Colchões & Cia · ERP</h1>
            <p className="text-sm text-muted-foreground">Acesse sua conta corporativa</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="user">Usuário</Label>
              <Input id="user" defaultValue="ceo@empresa.com" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pass">Senha</Label>
              <div className="relative">
                <Input id="pass" type={showPass ? "text" : "password"} defaultValue="••••••••" required />
                <button type="button" onClick={() => setShowPass((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox defaultChecked /> Lembrar usuário
              </label>
              <button type="button" className="text-sm text-primary hover:underline">Recuperar senha</button>
            </div>
            <Button type="submit" className="w-full bg-gradient-primary shadow-glow" disabled={loading}>
              <LogIn className="h-4 w-4 mr-1.5" /> {loading ? "Entrando…" : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-border/60">
            <p className="text-xs text-muted-foreground text-center mb-2">Perfis suportados</p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {["Administrador (CEO)", "Financeiro", "Administrativo", "Vendas", "RH", "Estoque"].map((r) => (
                <span key={r} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">{r}</span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
