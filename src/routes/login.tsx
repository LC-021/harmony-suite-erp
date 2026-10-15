import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Building2, Eye, EyeOff, LogIn } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/use-auth";
import "@lovable.dev/cloud-auth-js/styles.css";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login · Colchões & Cia ERP" },
      { name: "description", content: "Acesse o ERP Colchões & Cia com seu usuário corporativo." },
      { property: "og:title", content: "Login · Colchões & Cia ERP" },
      { property: "og:description", content: "Acesso ao sistema de gestão empresarial." },
    ],
  }),
  component: Login,
});

const REMEMBER_KEY = "erp_lembrar_email";

function Login() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [mode, setMode] = useState<"entrar" | "criar" | "recuperar">("entrar");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [lembrar, setLembrar] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(REMEMBER_KEY);
    if (saved) setEmail(saved);
  }, []);

  useEffect(() => {
    if (!authLoading && user) navigate({ to: "/", replace: true });
  }, [authLoading, user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "recuperar") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Enviamos um link de recuperação para seu e-mail.");
        setMode("entrar");
      } else if (mode === "criar") {
        const { error } = await supabase.auth.signUp({
          email,
          password: senha,
          options: { emailRedirectTo: window.location.origin, data: { nome } },
        });
        if (error) throw error;
        toast.success("Conta criada! Confirme pelo link enviado ao seu e-mail.");
        setMode("entrar");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
        if (error) throw error;
        if (lembrar) localStorage.setItem(REMEMBER_KEY, email);
        else localStorage.removeItem(REMEMBER_KEY);
        toast.success("Bem-vindo(a)!");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro";
      toast.error(msg === "Invalid login credentials" ? "E-mail ou senha incorretos." : msg);
    } finally {
      setLoading(false);
    }
  };

  const social = async (provider: "google" | "lovable") => {
    const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin });
    if (result.error) toast.error("Não foi possível entrar.");
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
            <p className="text-sm text-muted-foreground">
              {mode === "entrar" ? "Acesse sua conta corporativa" : mode === "criar" ? "Criar nova conta" : "Recuperar senha"}
            </p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {mode === "criar" && (
              <div className="space-y-1.5">
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="user">E-mail</Label>
              <Input id="user" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            {mode !== "recuperar" && (
              <div className="space-y-1.5">
                <Label htmlFor="pass">Senha</Label>
                <div className="relative">
                  <Input id="pass" type={showPass ? "text" : "password"} value={senha} minLength={6}
                    onChange={(e) => setSenha(e.target.value)} required />
                  <button type="button" onClick={() => setShowPass((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}
            {mode === "entrar" && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox checked={lembrar} onCheckedChange={(v) => setLembrar(!!v)} /> Lembrar usuário
                </label>
                <button type="button" onClick={() => setMode("recuperar")} className="text-sm text-primary hover:underline">
                  Recuperar senha
                </button>
              </div>
            )}
            <Button type="submit" className="w-full bg-gradient-primary shadow-glow" disabled={loading}>
              <LogIn className="h-4 w-4 mr-1.5" />
              {loading ? "Aguarde…" : mode === "entrar" ? "Entrar" : mode === "criar" ? "Criar conta" : "Enviar link"}
            </Button>
          </form>

          {mode === "entrar" && (
            <div className="mt-4 space-y-2">
              <Button variant="outline" className="w-full" onClick={() => social("google")}>Continuar com Google</Button>
              <button type="button" className="lovable-auth-button w-full" onClick={() => social("lovable")}>
                Continue with Lovable
              </button>
            </div>
          )}

          <p className="mt-4 text-center text-sm text-muted-foreground">
            {mode === "entrar" ? (
              <>Não tem conta? <button className="text-primary hover:underline" onClick={() => setMode("criar")}>Criar conta</button></>
            ) : (
              <button className="text-primary hover:underline" onClick={() => setMode("entrar")}>Voltar ao login</button>
            )}
          </p>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            A primeira conta criada vira Administrador (CEO). As demais recebem o perfil pelo CEO.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
