import { Instagram, MapPin, Users } from "lucide-react";

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20" data-testid="about-page">
      <div className="text-[10px] tracking-[0.35em] uppercase text-white/70 font-bold">O movimento</div>
      <h1 className="mt-2 font-display uppercase text-5xl sm:text-6xl lg:text-7xl tracking-tighter leading-[0.9]">
        Alvinegros<br />
        <span className="text-outline">do Vale.</span>
      </h1>

      <div className="mt-10 grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-5 text-white/75 leading-relaxed">
          <p>
            <strong className="text-white">Alvinegros do Vale</strong> é um
            movimento coletivo de corintianos do{" "}
            <strong className="text-white">Vale do Paraíba</strong>, com base
            em <strong className="text-white">São José dos Campos (SP)</strong>.
            Nascemos para reunir a fiel torcida espalhada pela região sob
            uma só bandeira alvinegra.
          </p>
          <p>
            Somos rua, somos bar, somos arquibancada. Do dia comum ao dia
            de jogo, mantemos vivo o orgulho de carregar o Timão no peito,
            longe de São Paulo mas nunca longe do Corinthians.
          </p>
          <p>
            Esta é a nossa loja oficial. Cada peça é pensada para o
            corintiano do Vale — quem entende que futebol é território,
            resenha e identidade.
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3 text-sm text-white/70">
              <div className="h-9 w-9 flex items-center justify-center border border-white/20">
                <Users size={16} strokeWidth={2.5} />
              </div>
              <span>Fundado por <strong className="text-white">Ludinel Fonseca</strong></span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/70">
              <div className="h-9 w-9 flex items-center justify-center border border-white/20">
                <MapPin size={16} strokeWidth={2.5} />
              </div>
              <span>São José dos Campos · Vale do Paraíba</span>
            </div>
          </div>

          <a
            href="https://instagram.com/alvinegrosdovale"
            target="_blank"
            rel="noreferrer"
            data-testid="about-instagram"
            className="mt-6 inline-flex items-center gap-2 border border-white/30 hover:bg-white hover:text-black transition-colors duration-200 px-5 py-3 text-xs tracking-[0.3em] uppercase font-bold"
          >
            <Instagram size={16} strokeWidth={2.5} /> @alvinegrosdovale
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <img
            src="https://images.unsplash.com/photo-1706741368086-919e33b1dcd1?crop=entropy&cs=srgb&fm=jpg&q=85&w=600"
            alt="Torcida"
            className="w-full aspect-[3/4] object-cover border border-white/15 grayscale hover:grayscale-0 transition-all duration-500"
          />
          <img
            src="https://images.unsplash.com/photo-1711925842530-fe8a24ba9082?crop=entropy&cs=srgb&fm=jpg&q=85&w=600"
            alt="Streetwear"
            className="w-full aspect-[3/4] object-cover border border-white/15 grayscale hover:grayscale-0 transition-all duration-500 translate-y-6"
          />
        </div>
      </div>
    </div>
  );
}
