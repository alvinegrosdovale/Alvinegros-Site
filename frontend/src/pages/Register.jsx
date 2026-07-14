import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatApiError } from "@/lib/api";
import { toast } from "sonner";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr("");
    try {
      await register(name, email, password);
      toast.success("Conta criada! Bem-vindo à torcida.");
      navigate("/");
    } catch (e) { setErr(formatApiError(e)); }
    finally { setBusy(false); }
  };

  return (
    <div className="mx-auto max-w-md px-6 py-20" data-testid="register-page">
      <div className="text-[10px] tracking-[0.35em] uppercase text-white/70 font-bold">Junte-se à torcida</div>
      <h1 className="mt-2 font-display uppercase text-5xl tracking-tighter leading-none">Criar conta</h1>
      <p className="mt-3 text-white/60 text-sm">Salve favoritos e receba novidades da coleção.</p>

      <form onSubmit={onSubmit} className="mt-10 space-y-5">
        <div>
          <Label className="text-xs tracking-[0.3em] uppercase text-white/60">Nome</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            data-testid="register-name"
            className="mt-2 rounded-none bg-[#0a0a0a] border-white/15 h-11 text-white focus-visible:ring-white focus-visible:ring-1"
          />
        </div>
        <div>
          <Label className="text-xs tracking-[0.3em] uppercase text-white/60">E-mail</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            data-testid="register-email"
            className="mt-2 rounded-none bg-[#0a0a0a] border-white/15 h-11 text-white focus-visible:ring-white focus-visible:ring-1"
          />
        </div>
        <div>
          <Label className="text-xs tracking-[0.3em] uppercase text-white/60">Senha (mín. 6 caracteres)</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            data-testid="register-password"
            className="mt-2 rounded-none bg-[#0a0a0a] border-white/15 h-11 text-white focus-visible:ring-white focus-visible:ring-1"
          />
        </div>

        {err && <div className="text-sm text-white border border-white/40 px-3 py-2 bg-white/5" data-testid="register-error">{err}</div>}

        <Button
          type="submit"
          disabled={busy}
          data-testid="register-submit"
          className="btn-brutal w-full rounded-none bg-white text-black hover:bg-black hover:text-white hover:border hover:border-white h-12 text-sm tracking-[0.25em] uppercase font-bold"
        >
          {busy ? "Criando…" : "Criar conta"}
        </Button>
      </form>

      <div className="mt-8 text-sm text-white/60">
        Já tem conta?{" "}
        <Link to="/entrar" className="text-white underline underline-offset-4 hover:text-white/70" data-testid="register-to-login">
          Entrar
        </Link>
      </div>
    </div>
  );
}
