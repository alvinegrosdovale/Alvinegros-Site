import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api, formatApiError } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Heart, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/products/${id}`)
      .then((r) => { setProduct(r.data); setSize(r.data.sizes?.[0] || null); })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (user) {
      api.get("/favorites").then((r) => {
        setIsFav(r.data.some((p) => p.id === id));
      }).catch(() => {});
    }
  }, [user, id]);

  const toggleFav = async () => {
    if (!user) { toast.error("Entre na sua conta para favoritar"); return; }
    try {
      if (isFav) {
        await api.delete(`/favorites/${id}`); setIsFav(false); toast.success("Removido dos favoritos");
      } else {
        await api.post(`/favorites/${id}`); setIsFav(true); toast.success("Adicionado aos favoritos");
      }
    } catch (e) { toast.error(formatApiError(e)); }
  };

  if (loading) return <div className="mx-auto max-w-7xl px-6 py-24 text-white/50 tracking-widest uppercase">Carregando…</div>;
  if (!product) return <div className="mx-auto max-w-7xl px-6 py-24 text-white/50">Produto não encontrado. <Link to="/loja" className="underline">Ver coleção</Link></div>;

  return (
    <div className="mx-auto max-w-7xl px-6 py-14" data-testid="product-detail">
      <Link to="/loja" className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-200">
        <ArrowLeft size={14} strokeWidth={2.5} /> Voltar para coleção
      </Link>

      <div className="mt-8 grid lg:grid-cols-2 gap-12">
        <div className="border border-white/15 bg-[#0a0a0a] overflow-hidden">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full aspect-[4/5] object-cover"
          />
        </div>

        <div>
          <div className="text-[10px] tracking-[0.35em] uppercase text-white/70 font-bold">
            {product.category}
          </div>
          <h1 className="mt-3 font-display uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-[0.95]" data-testid="product-name">
            {product.name}
          </h1>
          <div className="mt-6 font-display text-4xl tracking-tight" data-testid="product-price">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </div>

          <p className="mt-6 text-white/70 leading-relaxed">
            {product.description}
          </p>

          {product.sizes?.length > 0 && (
            <div className="mt-8">
              <div className="text-xs tracking-[0.3em] uppercase text-white/50 mb-3">Tamanho</div>
              <div className="flex flex-wrap gap-2" data-testid="size-options">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    data-testid={`size-${s}`}
                    className={`h-11 min-w-[56px] px-4 border text-sm font-bold tracking-widest transition-colors duration-200 ${
                      size === s ? "bg-white text-black border-white" : "bg-transparent text-white border-white/25 hover:border-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              data-testid="add-to-favorites-button"
              onClick={toggleFav}
              className={`btn-brutal rounded-none h-12 px-8 text-sm tracking-[0.25em] uppercase font-bold ${
                isFav
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-white text-black hover:bg-black hover:text-white hover:border hover:border-white"
              }`}
            >
              <Heart size={16} strokeWidth={2.5} fill={isFav ? "currentColor" : "none"} className="mr-2" />
              {isFav ? "Nos favoritos" : "Salvar peça"}
            </Button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Olá! Tenho interesse na peça "${product.name}" da Alvinegros do Vale (R$ ${product.price.toFixed(2)})`)}`}
              target="_blank"
              rel="noreferrer"
              data-testid="whatsapp-cta"
            >
              <Button
                variant="outline"
                className="btn-brutal rounded-none border-white/30 bg-transparent hover:bg-white hover:text-black h-12 px-8 text-sm tracking-[0.25em] uppercase font-bold"
              >
                Consultar por WhatsApp
              </Button>
            </a>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs tracking-widest uppercase text-white/50 space-y-2">
            <div><span className="text-white/40">Estoque:</span> <span className="text-white/80">{product.stock} unidades</span></div>
            <div><span className="text-white/40">Cores:</span> <span className="text-white/80">{product.colors?.join(", ") || "Padrão"}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
