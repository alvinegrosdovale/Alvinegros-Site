import { useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { useAuth } from "@/context/AuthContext";

export default function Catalog() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [favSet, setFavSet] = useState(new Set());
  const [category, setCategory] = useState("todas");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get("/products").then((r) => setProducts(r.data)).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (user) {
      api.get("/favorites").then((r) => {
        setFavSet(new Set(r.data.map((p) => p.id)));
      }).catch(() => {});
    }
  }, [user]);

  const categories = useMemo(() => {
    const s = new Set(products.map((p) => p.category));
    return ["todas", ...Array.from(s)];
  }, [products]);

  const filtered = useMemo(
    () => (category === "todas" ? products : products.filter((p) => p.category === category)),
    [products, category]
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-16" data-testid="catalog-page">
      <div className="border-b border-white/10 pb-8">
        <div className="text-[10px] tracking-[0.35em] uppercase text-white/70 font-bold">
          Coleção 2026
        </div>
        <h1 className="mt-3 font-display uppercase text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-[0.9]">
          Vista o manto
        </h1>
        <p className="mt-4 text-white/60 max-w-xl">
          {products.length} peças oficiais e licenciadas prontas para a próxima jornada alvinegra.
        </p>
      </div>

      {/* Filters */}
      <div className="mt-10 flex flex-wrap gap-2" data-testid="catalog-filters">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            data-testid={`filter-${c}`}
            className={`px-4 py-2 text-xs tracking-[0.25em] uppercase font-bold border transition-colors duration-200 ${
              category === c
                ? "bg-white text-black border-white"
                : "bg-transparent text-white/70 border-white/20 hover:text-white hover:border-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-10">
        {loading ? (
          <div className="text-white/50 tracking-widest uppercase text-xs">Carregando…</div>
        ) : filtered.length === 0 ? (
          <div className="text-white/50 tracking-widest uppercase text-xs" data-testid="catalog-empty">
            Nenhum produto encontrado.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} favorited={favSet.has(p.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
