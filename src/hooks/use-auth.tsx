import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import type { AppRole } from "@/lib/permissions";

type AuthState = {
  loading: boolean;
  user: User | null;
  nome: string;
  roles: AppRole[];
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [nome, setNome] = useState("");
  const [roles, setRoles] = useState<AppRole[]>([]);

  useEffect(() => {
    let active = true;
    const load = async (u: User | null) => {
      setUser(u);
      if (!u) {
        setRoles([]);
        setNome("");
        setLoading(false);
        return;
      }
      const [{ data: r }, { data: p }] = await Promise.all([
        supabase.from("user_roles").select("role").eq("user_id", u.id),
        supabase.from("profiles").select("nome").eq("id", u.id).maybeSingle(),
      ]);
      if (!active) return;
      setRoles((r ?? []).map((x) => x.role as AppRole));
      setNome(p?.nome || u.email?.split("@")[0] || "");
      setLoading(false);
    };
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        setTimeout(() => load(session?.user ?? null), 0);
      }
    });
    supabase.auth.getUser().then(({ data }) => load(data.user ?? null));
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ loading, user, nome, roles, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
