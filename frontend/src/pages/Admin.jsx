import { useEffect, useState } from "react";
import { api, formatApiError } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";

const empty = {
  name: "", description: "", price: 0, category: "camiseta",
  sizes: "P,M,G,GG", colors: "Preto", image_url: "", stock: 0,
  featured: false, active: true,
};

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api.get("/products", { params: { admin: true } })
      .then((r) => setProducts(r.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (p) => {
    setEditing(p);
    setForm({
      name: p.name, description: p.description || "", price: p.price,
      category: p.category, sizes: (p.sizes || []).join(","),
      colors: (p.colors || []).join(","), image_url: p.image_url || "",
      stock: p.stock || 0, featured: !!p.featured, active: !!p.active,
    });
    setOpen(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price) || 0,
        stock: parseInt(form.stock) || 0,
        sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
        colors: form.colors.split(",").map((s) => s.trim()).filter(Boolean),
      };
      if (editing) {
        await api.put(`/products/${editing.id}`, payload);
        toast.success("Produto atualizado");
      } else {
        await api.post("/products", payload);
        toast.success("Produto criado");
      }
      setOpen(false);
      load();
    } catch (e) { toast.error(formatApiError(e)); }
    finally { setSaving(false); }
  };

  const remove = async (p) => {
    if (!window.confirm(`Remover "${p.name}"?`)) return;
    try {
      await api.delete(`/products/${p.id}`);
      toast.success("Produto removido");
      load();
    } catch (e) { toast.error(formatApiError(e)); }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-14" data-testid="admin-page">
      <div className="flex items-end justify-between flex-wrap gap-6 border-b border-white/10 pb-8">
        <div>
          <div className="text-[10px] tracking-[0.35em] uppercase text-white/70 font-bold">Painel</div>
          <h1 className="mt-2 font-display uppercase text-5xl tracking-tighter leading-none">Produtos</h1>
          <p className="mt-2 text-white/60 text-sm">{products.length} peças no catálogo</p>
        </div>
        <Button
          onClick={openNew}
          data-testid="admin-new-product"
          className="btn-brutal rounded-none bg-white text-black hover:bg-black hover:text-white hover:border hover:border-white h-11 px-6 text-xs tracking-[0.25em] uppercase font-bold"
        >
          <Plus size={16} strokeWidth={2.5} className="mr-2" /> Novo produto
        </Button>
      </div>

      <div className="mt-10 overflow-x-auto border border-white/15">
        <table className="w-full text-sm">
          <thead className="bg-[#0a0a0a] border-b border-white/15">
            <tr className="text-left text-white/60 uppercase text-xs tracking-widest">
              <th className="p-4">Imagem</th>
              <th className="p-4">Nome</th>
              <th className="p-4">Categoria</th>
              <th className="p-4">Preço</th>
              <th className="p-4">Estoque</th>
              <th className="p-4">Destaque</th>
              <th className="p-4">Ativo</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="p-8 text-center text-white/50">Carregando…</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={8} className="p-8 text-center text-white/50">Nenhum produto ainda.</td></tr>
            ) : products.map((p) => (
              <tr key={p.id} className="border-t border-white/10 hover:bg-white/5" data-testid={`admin-row-${p.id}`}>
                <td className="p-3">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.name} className="h-14 w-14 object-cover border border-white/15" />
                  ) : <div className="h-14 w-14 bg-[#111] border border-white/15" />}
                </td>
                <td className="p-4 font-semibold">{p.name}</td>
                <td className="p-4 text-white/70 uppercase text-xs tracking-widest">{p.category}</td>
                <td className="p-4">R$ {p.price.toFixed(2).replace(".", ",")}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4">{p.featured ? <span className="text-white/70 font-bold">SIM</span> : <span className="text-white/40">não</span>}</td>
                <td className="p-4">{p.active ? <span className="text-white">SIM</span> : <span className="text-white/40">não</span>}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEdit(p)}
                      data-testid={`admin-edit-${p.id}`}
                      className="p-2 border border-white/15 hover:bg-white hover:text-black transition-colors duration-200"
                    >
                      <Pencil size={14} strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={() => remove(p)}
                      data-testid={`admin-delete-${p.id}`}
                      className="p-2 border border-white/15 hover:bg-white hover:text-black hover:border-white transition-colors duration-200"
                    >
                      <Trash2 size={14} strokeWidth={2.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-none max-w-2xl bg-[#0a0a0a] border-white/15" data-testid="admin-product-dialog">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl uppercase tracking-tight">
              {editing ? "Editar produto" : "Novo produto"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="md:col-span-2">
              <Label className="text-xs tracking-widest uppercase text-white/60">Nome</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                data-testid="form-name"
                className="mt-2 rounded-none bg-black border-white/15 h-10" />
            </div>
            <div className="md:col-span-2">
              <Label className="text-xs tracking-widest uppercase text-white/60">Descrição</Label>
              <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                data-testid="form-description"
                className="mt-2 rounded-none bg-black border-white/15" />
            </div>
            <div>
              <Label className="text-xs tracking-widest uppercase text-white/60">Preço (R$)</Label>
              <Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                data-testid="form-price"
                className="mt-2 rounded-none bg-black border-white/15 h-10" />
            </div>
            <div>
              <Label className="text-xs tracking-widest uppercase text-white/60">Estoque</Label>
              <Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })}
                data-testid="form-stock"
                className="mt-2 rounded-none bg-black border-white/15 h-10" />
            </div>
            <div>
              <Label className="text-xs tracking-widest uppercase text-white/60">Categoria</Label>
              <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                data-testid="form-category"
                className="mt-2 rounded-none bg-black border-white/15 h-10" />
            </div>
            <div>
              <Label className="text-xs tracking-widest uppercase text-white/60">URL da imagem</Label>
              <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                data-testid="form-image"
                placeholder="https://..."
                className="mt-2 rounded-none bg-black border-white/15 h-10" />
            </div>
            <div>
              <Label className="text-xs tracking-widest uppercase text-white/60">Tamanhos (separados por vírgula)</Label>
              <Input value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })}
                data-testid="form-sizes"
                className="mt-2 rounded-none bg-black border-white/15 h-10" />
            </div>
            <div>
              <Label className="text-xs tracking-widest uppercase text-white/60">Cores (separadas por vírgula)</Label>
              <Input value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })}
                data-testid="form-colors"
                className="mt-2 rounded-none bg-black border-white/15 h-10" />
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })}
                data-testid="form-featured" />
              <span className="text-xs tracking-widest uppercase text-white/70">Destaque</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })}
                data-testid="form-active" />
              <span className="text-xs tracking-widest uppercase text-white/70">Ativo</span>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-none border-white/20 h-10 text-xs tracking-widest uppercase"
              data-testid="form-cancel"
            >
              Cancelar
            </Button>
            <Button
              onClick={save}
              disabled={saving}
              data-testid="form-save"
              className="btn-brutal rounded-none bg-white text-black hover:bg-black hover:text-white hover:border hover:border-white h-10 px-6 text-xs tracking-[0.25em] uppercase font-bold"
            >
              {saving ? "Salvando…" : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
