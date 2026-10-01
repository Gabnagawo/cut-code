import {
  Aperture,
  Clapperboard,
  LayoutTemplate,
  PanelsTopLeft,
  PartyPopper,
  Repeat,
  type LucideIcon,
} from "lucide-react";

// TODO: trocar pelos dados reais
export const CONTACT = {
  whatsapp: "#", // ex: https://wa.me/5511999999999
  instagram: "#", // ex: https://instagram.com/cutandcode
};

const unsplash = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export type Showcase = {
  niche: string;
  title: string;
  meta: string;
  image: string;
  thumb: string;
  /** gradiente de fallback caso a imagem não carregue */
  tone: string;
};

/** Vitrine do hero (slider vertical com miniaturas) */
export const SHOWCASE: Showcase[] = [
  {
    niche: "Clínicas",
    title: "Agendamento em 3 cliques",
    meta: "Landing page guiada + 4 reels",
    image: unsplash("1519494026892-80bbd2d6fd0d"),
    thumb: unsplash("1519494026892-80bbd2d6fd0d", 200),
    tone: "from-[#1d3348] to-[#0b0f15]",
  },
  {
    niche: "Restaurantes",
    title: "Cardápio que dá fome",
    meta: "Reels de pratos + site com reservas",
    image: unsplash("1517248135467-4c7edcad34c4"),
    thumb: unsplash("1517248135467-4c7edcad34c4", 200),
    tone: "from-[#3d2516] to-[#120c08]",
  },
  {
    niche: "Lojas",
    title: "Vitrine aberta 24h",
    meta: "Vídeos de produto + StoryMaker",
    image: unsplash("1441986300917-64674bd600d8"),
    thumb: unsplash("1441986300917-64674bd600d8", 200),
    tone: "from-[#2a2347] to-[#0e0c17]",
  },
  {
    niche: "Empresas",
    title: "Presença que passa confiança",
    meta: "Site completo + vídeo institucional",
    image: unsplash("1497366216548-37526070297c"),
    thumb: unsplash("1497366216548-37526070297c", 200),
    tone: "from-[#1f2b2a] to-[#0a0f0e]",
  },
  {
    niche: "Eventos",
    title: "Convites que viram assunto",
    meta: "Convite interativo + aftermovie",
    image: unsplash("1511578314322-379afb476865"),
    thumb: unsplash("1511578314322-379afb476865", 200),
    tone: "from-[#3f2030] to-[#130b10]",
  },
];

export const NICHES = ["Clínicas particulares", "Clínicas multiprofissionais", "Restaurantes", "Lojas", "Empresas", "Eventos"];

export type Service = {
  title: string;
  description: string;
  tag: string;
  icon: LucideIcon;
};

export const SERVICES: Service[] = [
  {
    title: "Landing page guiada",
    description:
      "Site institucional que conduz o visitante até a ação, como agendar uma consulta. Modelo validado em clínicas reais e adaptado ao seu negócio.",
    tag: "Site",
    icon: LayoutTemplate,
  },
  {
    title: "Site completo",
    description: "Uma versão mais robusta, com mais páginas e conteúdo. Avulso ou dentro do pacote.",
    tag: "Site",
    icon: PanelsTopLeft,
  },
  {
    title: "4 vídeos de divulgação",
    description:
      "Vídeos curtos gravados no celular, com edição e recursos audiovisuais de qualidade. Entrega em até 2 dias úteis.",
    tag: "Vídeo",
    icon: Clapperboard,
  },
  {
    title: "Convites interativos",
    description: "Convites digitais para eventos, com navegação, confirmação de presença e a sua identidade.",
    tag: "Site",
    icon: PartyPopper,
  },
  {
    title: "StoryMaker",
    description: "Criação de stories para o seu Instagram: roteiro, edição e ritmo pensados para manter o perfil ativo.",
    tag: "Vídeo",
    icon: Aperture,
  },
  {
    title: "Edição continuada",
    description: "Serviço recorrente: você grava e a gente edita. Conteúdo com padrão constante, todo mês.",
    tag: "Recorrente",
    icon: Repeat,
  },
];

export const CASES = [
  {
    name: "Clínica Santa Lourdes",
    url: "#", // TODO: link real
    domain: "clinicasantalourdes",
    kind: "Landing page guiada · agendamento de consultas",
    headline: "Agende sua consulta em 3 passos",
    tone: "bg-[radial-gradient(120%_90%_at_85%_10%,rgb(159_216_255/0.45),transparent_55%),linear-gradient(160deg,#1b2a3a,#0e1219)]",
  },
  {
    name: "Dra. Vanine",
    url: "#", // TODO: link real
    domain: "dravanine",
    kind: "Landing page guiada · consultório particular",
    headline: "Atendimento humanizado, do primeiro contato à consulta",
    tone: "bg-[radial-gradient(120%_90%_at_85%_10%,rgb(245_201_216/0.45),transparent_55%),linear-gradient(160deg,#3a1f2c,#140e12)]",
  },
];

export const REELS = [
  { label: "Clínica", duration: "0:30", image: unsplash("1519494026892-80bbd2d6fd0d", 500), tone: "from-[#1d3348] to-[#0b0f15]" },
  { label: "Restaurante", duration: "0:22", image: unsplash("1517248135467-4c7edcad34c4", 500), tone: "from-[#3d2516] to-[#120c08]" },
  { label: "Loja", duration: "0:18", image: unsplash("1441986300917-64674bd600d8", 500), tone: "from-[#2a2347] to-[#0e0c17]" },
  { label: "Evento", duration: "0:25", image: unsplash("1511578314322-379afb476865", 500), tone: "from-[#3f2030] to-[#130b10]" },
];

export const STEPS = [
  { title: "Questionário", text: "Você responde algumas perguntas sobre o seu negócio, público e objetivo." },
  { title: "Prévia do site", text: "Em até 1 semana você recebe a prévia para aprovar e ajustar.", highlight: "1 semana" },
  { title: "Gravação & edição", text: "Gravamos e editamos seus vídeos, entregues em até 2 dias úteis.", highlight: "2 dias úteis" },
  { title: "No ar", text: "Site publicado, vídeos prontos para postar e sua marca trabalhando por você." },
];
