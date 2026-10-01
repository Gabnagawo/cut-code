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
    tone: "from-[#8fa3a4] to-[#3a4245]",
  },
  {
    niche: "Restaurantes",
    title: "Cardápio que dá fome",
    meta: "Reels de pratos + site com reservas",
    image: unsplash("1517248135467-4c7edcad34c4"),
    thumb: unsplash("1517248135467-4c7edcad34c4", 200),
    tone: "from-[#a39a92] to-[#45403b]",
  },
  {
    niche: "Lojas",
    title: "Vitrine aberta 24h",
    meta: "Vídeos de produto + StoryMaker",
    image: unsplash("1441986300917-64674bd600d8"),
    thumb: unsplash("1441986300917-64674bd600d8", 200),
    tone: "from-[#9c98ad] to-[#3f3d4a]",
  },
  {
    niche: "Empresas",
    title: "Presença que passa confiança",
    meta: "Site completo + vídeo institucional",
    image: unsplash("1497366216548-37526070297c"),
    thumb: unsplash("1497366216548-37526070297c", 200),
    tone: "from-[#93a0a8] to-[#3b4349]",
  },
  {
    niche: "Eventos",
    title: "Convites que viram assunto",
    meta: "Convite interativo + aftermovie",
    image: unsplash("1511578314322-379afb476865"),
    thumb: unsplash("1511578314322-379afb476865", 200),
    tone: "from-[#a7979f] to-[#4a3f45]",
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

export const REELS = [
  { label: "Clínica", duration: "0:30", image: unsplash("1519494026892-80bbd2d6fd0d", 500), tone: "from-[#8fa3a4] to-[#3a4245]" },
  { label: "Restaurante", duration: "0:22", image: unsplash("1517248135467-4c7edcad34c4", 500), tone: "from-[#a39a92] to-[#45403b]" },
  { label: "Loja", duration: "0:18", image: unsplash("1441986300917-64674bd600d8", 500), tone: "from-[#9c98ad] to-[#3f3d4a]" },
  { label: "Evento", duration: "0:25", image: unsplash("1511578314322-379afb476865", 500), tone: "from-[#a7979f] to-[#4a3f45]" },
];

export const STEPS = [
  { title: "Questionário", text: "Você responde algumas perguntas sobre o seu negócio, público e objetivo." },
  { title: "Prévia do site", text: "Em até 1 semana você recebe a prévia para aprovar e ajustar.", highlight: "1 semana" },
  { title: "Gravação & edição", text: "Gravamos e editamos seus vídeos, entregues em até 2 dias úteis.", highlight: "2 dias úteis" },
  { title: "No ar", text: "Site publicado, vídeos prontos para postar e sua marca trabalhando por você." },
];

/* ------------------------------------------------------------------
   Material de clientes (vitrine vertical do portfólio)

   Para trocar pelo material real, coloque os arquivos em
   public/clientes/<slug>/ e aponte `image` / `thumb` / `video` para eles, ex.:
     image: "clientes/santa-lourdes/site-home.jpg"
     video: "clientes/santa-lourdes/reel-01.mp4"   (vertical, curto, sem áudio obrigatório)
   As fotos abaixo são PROVISÓRIAS (Unsplash) só para visualizar o layout.
   ------------------------------------------------------------------ */
export type ClientMaterial = {
  kind: "Site" | "Reel" | "Stories" | "Convite" | "Vídeo";
  title: string;
  image: string;
  thumb: string;
  /** opcional: vídeo que toca quando o slide está ativo (usa `image` como capa) */
  video?: string;
  tone: string;
};

export type Client = {
  slug: string;
  name: string;
  niche: string;
  summary: string;
  delivered: string[];
  url: string;
  materials: ClientMaterial[];
};

const ph = (id: string): Pick<ClientMaterial, "image" | "thumb"> => ({
  image: unsplash(id, 1000),
  thumb: unsplash(id, 200),
});

export const CLIENTS: Client[] = [
  {
    slug: "santa-lourdes",
    name: "Clínica Santa Lourdes",
    niche: "Clínica multiprofissional",
    summary:
      "Landing page guiada que leva o paciente da escolha da especialidade até o agendamento, com vídeos curtos apresentando a estrutura e a equipe.",
    delivered: ["Landing page guiada", "Agendamento online", "Reels de divulgação"],
    url: "#", // TODO: link real
    materials: [
      { kind: "Site", title: "Página inicial", ...ph("1519494026892-80bbd2d6fd0d"), tone: "from-[#8fa3a4] to-[#3a4245]" },
      { kind: "Site", title: "Escolha da especialidade", ...ph("1576091160550-2173dba999ef"), tone: "from-[#93a0a8] to-[#3b4349]" },
      { kind: "Reel", title: "Conheça a clínica", ...ph("1505751172876-fa1923c5c528"), tone: "from-[#9aa7a3] to-[#3d4442]" },
      { kind: "Reel", title: "Equipe e atendimento", ...ph("1551076805-e1869033e561"), tone: "from-[#a39a92] to-[#45403b]" },
    ],
  },
  {
    slug: "dra-vanine",
    name: "Dra. Vanine",
    niche: "Consultório particular",
    summary:
      "Site com atendimento humanizado do primeiro contato à consulta, mais conteúdo em vídeo para manter o Instagram ativo.",
    delivered: ["Landing page guiada", "StoryMaker", "Edição continuada"],
    url: "#", // TODO: link real
    materials: [
      { kind: "Site", title: "Apresentação", ...ph("1579684385127-1ef15d508118"), tone: "from-[#a7979f] to-[#4a3f45]" },
      { kind: "Site", title: "Agende sua consulta", ...ph("1460925895917-afdab827c52f"), tone: "from-[#9c98ad] to-[#3f3d4a]" },
      { kind: "Stories", title: "Dicas da semana", ...ph("1498050108023-c5249f4df085"), tone: "from-[#a39a92] to-[#45403b]" },
      { kind: "Reel", title: "Bastidores do consultório", ...ph("1522202176988-66273c2fd55f"), tone: "from-[#8fa3a4] to-[#3a4245]" },
    ],
  },
];
