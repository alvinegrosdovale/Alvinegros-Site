import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Heart, LogOut, ShieldCheck, User, Instagram } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

const navLinkClass = ({ isActive }) =>
  `text-xs tracking-[0.28em] uppercase font-semibold transition-colors duration-200 ${
    isActive ? "text-white" : "text-white/60 hover:text-white"
  }`;

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header
      data-testid="site-header"
      className="sticky top-0 z-40 border-b border-white/10 bg-black/85 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" data-testid="logo-link" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center bg-white text-black font-display text-lg leading-none">
            AV
          </div>
          <div className="hidden sm:block">
            <div className="font-display text-xl leading-none tracking-tight uppercase">
              Alvinegros
            </div>
            <div className="text-[10px] tracking-[0.35em] text-white/50 uppercase">
              do Vale · Loja Oficial
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <NavLink to="/" end className={navLinkClass} data-testid="nav-home">Início</NavLink>
          <NavLink to="/loja" className={navLinkClass} data-testid="nav-catalog">Coleção</NavLink>
          <NavLink to="/sobre" className={navLinkClass} data-testid="nav-about">A Torcida</NavLink>
          {user && user.role === "admin" && (
            <NavLink to="/admin" className={navLinkClass} data-testid="nav-admin">Admin</NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user && (
            <Link
              to="/favoritos"
              data-testid="nav-favorites"
              className="hidden sm:inline-flex items-center gap-1.5 text-white/80 hover:text-white text-xs tracking-widest uppercase transition-colors duration-200"
            >
              <Heart size={16} strokeWidth={2.5} /> Favoritos
            </Link>
          )}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 border border-white/15 px-3 py-1.5 rounded-none">
                {user.role === "admin" ? (
                  <ShieldCheck size={14} className="text-white" strokeWidth={2.5} />
                ) : (
                  <User size={14} strokeWidth={2.5} />
                )}
                <span className="text-xs uppercase tracking-widest font-semibold" data-testid="user-name">
                  {user.name?.split(" ")[0]}
                </span>
              </div>
              <Button
                data-testid="logout-button"
                variant="ghost"
                className="rounded-none border border-white/15 hover:bg-white hover:text-black text-xs tracking-widest uppercase h-9 px-3"
                onClick={async () => { await logout(); navigate("/"); }}
              >
                <LogOut size={14} strokeWidth={2.5} /> Sair
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/entrar"
                data-testid="nav-login"
                className="hidden sm:inline-flex text-xs uppercase tracking-widest text-white/80 hover:text-white transition-colors duration-200 font-semibold"
              >
                Entrar
              </Link>
              <Link to="/cadastrar" data-testid="nav-register">
                <Button className="btn-brutal rounded-none bg-white text-black hover:bg-black hover:text-white hover:border hover:border-white text-xs tracking-widest uppercase h-9 px-4 font-bold">
                  Criar conta
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black" data-testid="site-footer">
      <div className="mx-auto max-w-7xl px-6 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <div className="font-display text-3xl uppercase tracking-tight">Alvinegros do Vale</div>
          <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-xs">
            Movimento alvinegro do Vale do Paraíba. Loja oficial
            licenciada com o manto, a resenha e a paixão fiel corintiana
            em cada peça.
          </p>
        </div>
        <div>
          <div className="text-xs tracking-[0.3em] uppercase text-white/50 mb-4">Navegue</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/loja" className="hover:text-white transition-colors duration-200">Coleção completa</Link></li>
            <li><Link to="/sobre" className="hover:text-white transition-colors duration-200">Sobre a torcida</Link></li>
            <li><Link to="/entrar" className="hover:text-white transition-colors duration-200">Área do sócio</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-xs tracking-[0.3em] uppercase text-white/50 mb-4">Siga</div>
          <a
            href="https://instagram.com/alvinegrosdovale"
            target="_blank"
            rel="noreferrer"
            data-testid="footer-instagram"
            className="inline-flex items-center gap-2 text-sm hover:text-white transition-colors duration-200"
          >
            <Instagram size={18} strokeWidth={2.5} /> @alvinegrosdovale
          </a>
          <p className="mt-6 text-xs text-white/40 leading-relaxed">
            São José dos Campos / SP · Vale do Paraíba<br />
            Produtos oficiais licenciados.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40 tracking-widest uppercase">
        © {new Date().getFullYear()} Alvinegros do Vale · Todos os direitos reservados
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="App noise-bg relative">
      <Header />
      <main className="relative z-[2]"><Outlet /></main>
      <Footer />
      <Toaster theme="dark" position="top-right" />
    </div>
  );
}
