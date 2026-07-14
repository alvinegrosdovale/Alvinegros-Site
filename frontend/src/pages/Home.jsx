import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Shield, Truck, Flame } from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1568101794887-a7a3f149f6e6?crop=entropy&cs=srgb&fm=jpg&q=85&w=1800";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.get("/products", { params: { featured: true } })
      .then((r) => setFeatured(r.data))
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-white/10" data-testid="home-hero">
        <img
          src={HERO_IMG}
          alt="Estádio"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/70" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-white text-white px-3 py-1 text-[10px] tracking-[0.35em] uppercase font-bold">
              <span className="inline-block w-2 h-2 bg-white" /> Loja Oficial · Licenciada
            </div>
            <h1 className="mt-6 font-display uppercase text-6xl sm:text-7xl lg:text-8xl leading-[0.85] tracking-tighter">
              O manto <span className="text-outline">da nossa</span><br />torcida.
            </h1>
            <p className="mt-8 text-base md:text-lg text-white/70 max-w-xl leading-relaxed">
              Do Vale do Paraíba para todo canto. Peças pensadas para o
              corintiano fiel que carrega o Timão no peito, dentro e fora
              da arquibancada.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/loja">
                <Button
                  data-testid="hero-cta-shop"
                  className="btn-brutal rounded-none bg-white text-black hover:bg-black hover:text-white hover:border hover:border-white h-12 px-8 text-sm tracking-[0.25em] uppercase font-bold"
                >
                  Ver a coleção <ArrowRight size={16} strokeWidth={2.5} className="ml-2" />
                </Button>
              </Link>
              <Link to="/sobre">
                <Button
                  variant="outline"
                  data-testid="hero-cta-about"
                  className="btn-brutal rounded-none border-white/40 bg-transparent hover:bg-white hover:text-black h-12 px-8 text-sm tracking-[0.25em] uppercase font-bold"
                >
                  A história
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Diagonal stripe */}
        <div className="absolute bottom-0 left-0 right-0 h-4 stripe-accent opacity-70" />
      </section>

      {/* Value props */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3">
          {[
            { icon: Shield, label: "Oficial licenciada", desc: "Produtos autorizados da marca Alvinegros do Vale." },
            { icon: Flame, label: "Feito para torcedor", desc: "Tecidos resistentes que aguentam o jogo inteiro." },
            { icon: Truck, label: "Envio para todo o Brasil", desc: "Direto de São José dos Campos para o seu bairro." },
          ].map((v, i) => (
            <div
              key={i}
              className={`p-8 flex items-start gap-4 ${
                i > 0 ? "md:border-l border-white/10" : ""
              } ${i < 2 ? "border-b md:border-b-0 border-white/10" : ""}`}
            >
              <div className="h-11 w-11 flex items-center justify-center border border-white/20 text-white">
                <v.icon size={20} strokeWidth={2.5} />
              </div>
              <div>
                <div className="font-headline text-lg uppercase tracking-wide">{v.label}</div>
                <div className="text-sm text-white/60 mt-1 leading-relaxed">{v.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-6 py-20" data-testid="home-featured">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="text-[10px] tracking-[0.35em] uppercase text-white/70 font-bold">
              Destaques
            </div>
            <h2 className="mt-2 font-display uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-none">
              Peças em campo
            </h2>
          </div>
          <Link to="/loja" className="text-xs tracking-[0.3em] uppercase text-white/70 hover:text-white/70 transition-colors duration-200 font-semibold">
            Ver tudo →
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="text-white/50 text-sm tracking-widest uppercase">Sem produtos em destaque no momento.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>

      {/* Manifesto strip */}
      <section className="relative border-y border-white/10 bg-[#0a0a0a] overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-[10px] tracking-[0.35em] uppercase text-white/50 font-bold">
              Manifesto
            </div>
            <h3 className="mt-3 font-display uppercase text-4xl sm:text-5xl tracking-tighter leading-[0.95]">
              Preto no branco.<br />
              <span className="text-outline">Vale no coração.</span>
            </h3>
            <p className="mt-6 text-white/70 leading-relaxed max-w-lg">
              Movimento alvinegro nascido no Vale do Paraíba, feito por
              corintianos, para corintianos. Levantamos a bandeira do Timão
              em cada esquina do Vale — do campo à rua, do dia a dia à
              final de campeonato.
            </p>
          </div>
          <div className="relative aspect-[4/3] border border-white/15 overflow-hidden">
            <img
              src="https://images.pexels.com/photos/4066292/pexels-photo-4066292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="Torcedor"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
