import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useState } from "react";
import { api, formatApiError } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function ProductCard({ product, favorited, onFavoriteToggled }) {
  const { user } = useAuth();
  const [isFav, setIsFav] = useState(!!favorited);
  const [busy, setBusy] = useState(false);

  const toggleFav = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error("Entre na sua conta para favoritar");
      return;
    }
    setBusy(true);
    try {
      if (isFav) {
        await api.delete(`/favorites/${product.id}`);
        setIsFav(false);
        toast.success("Removido dos favoritos");
      } else {
        await api.post(`/favorites/${product.id}`);
        setIsFav(true);
        toast.success("Adicionado aos favoritos");
      }
      onFavoriteToggled && onFavoriteToggled(product.id);
    } catch (err) {
      toast.error(formatApiError(err));
    } finally {
      setBusy(false);
    }
  };

  const fallback = "https://images.unsplash.com/photo-1610502778270-c5c6f4c7d575?crop=entropy&cs=srgb&fm=jpg&q=85&w=800";

  return (
    <Link
      to={`/produto/${product.id}`}
      data-testid={`product-card-${product.id}`}
      className="product-card group relative block border border-white/15 bg-[#0a0a0a] overflow-hidden hover:border-white transition-colors duration-200"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#111]">
        <img
          src={product.image_url || fallback}
          alt={product.name}
          className="product-img h-full w-full object-cover"
          loading="lazy"
        />
        {product.featured && (
          <div className="absolute top-3 left-3 bg-transparent border border-white text-white text-[10px] tracking-[0.25em] uppercase font-bold px-2 py-1">
            Destaque
          </div>
        )}
        <button
          onClick={toggleFav}
          disabled={busy}
          data-testid={`favorite-btn-${product.id}`}
          className={`absolute top-3 right-3 h-9 w-9 flex items-center justify-center border transition-colors duration-200 ${
            isFav
              ? "bg-white border-white text-black"
              : "bg-black/60 border-white/30 text-white hover:bg-white hover:text-black"
          }`}
        >
          <Heart size={16} strokeWidth={2.5} fill={isFav ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="p-4 border-t border-white/10">
        <div className="text-[10px] tracking-[0.3em] uppercase text-white/40">
          {product.category}
        </div>
        <div className="mt-1 font-headline text-xl uppercase tracking-tight leading-tight">
          {product.name}
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <div className="font-display text-2xl tracking-tight">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </div>
          <div className="text-[10px] tracking-widest uppercase text-white/50">
            Ver peça →
          </div>
        </div>
      </div>
    </Link>
  );
}
