import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";

export default function Favorites() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get("/favorites").then((r) => setItems(r.data)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16" data-testid="favorites-page">
      <div className="text-[10px] tracking-[0.35em] uppercase text-white/70 font-bold">Área do sócio</div>
      <h1 className="mt-2 font-display uppercase text-5xl sm:text-6xl tracking-tighter leading-[0.9]">
        Seus favoritos
      </h1>

      <div className="mt-10">
        {loading ? (
          <div className="text-white/50 tracking-widest uppercase text-xs">Carregando…</div>
        ) : items.length === 0 ? (
          <div className="border border-white/15 p-10 text-center" data-testid="favorites-empty">
            <div className="text-white/60">Você ainda não salvou peças.</div>
            <Link to="/loja" className="mt-4 inline-block text-white/70 tracking-widest uppercase text-xs font-bold hover:underline">
              Ir para a coleção →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} favorited onFavoriteToggled={load} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
