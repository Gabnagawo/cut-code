import {
  Aperture,
  Clapperboard,
  LayoutTemplate,
  PanelsTopLeft,
  PartyPopper,
  Repeat,
  type LucideIcon,
} from "lucide-react";

// Canais da Cut Code. Se algum ficar vazio, o card dele some e os botões levam ao formulário.
export const CONTACT = {
  /** só números, com DDI e DDD. ex.: "5511999999999" */
  whatsappNumber: "559294215789",
  /** ex.: "https://instagram.com/cutandcode" */
  instagram: "https://instagram.com/cut_code",
  email: "cutcode.contato@gmail.com",
};

export const hasWhatsapp = () => Boolean(CONTACT.whatsappNumber);

/** Link do WhatsApp com mensagem pronta; sem número configurado, cai no formulário de orçamento. */
export function whatsappHref(message = "Olá! Vim pelo site da Cut Code e quero um orçamento.") {
  if (!hasWhatsapp()) return "#orcamento";
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const instagramHref = () => CONTACT.instagram || "#orcamento";

/** Evento que pré-seleciona o serviço no formulário de contato. */
export const SELECT_SERVICE_EVENT = "cutcode:servico";

export const emailHref = () => `mailto:${CONTACT.email}`;

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
    meta: "Cobertura e convites interativos",
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

export type Package = {
  badge: string;
  title: string;
  description: string;
  items: string[];
  whatsapp: string;
  /** destaque no círculo de vidro */
  highlight: { big: string; small: string };
};

export const PACKAGES: Package[] = [
  {
    badge: "Recomendado",
    title: "Pacote digital completo",
    description:
      "Site + 4 vídeos curtos de divulgação. Sua presença digital inteira, pronta em poucos dias, com o mesmo cuidado estético do começo ao fim.",
    items: ["Landing page guiada ou site completo", "4 vídeos curtos editados", "Prévia do site em até 1 semana após o questionário", "Vídeos em até 2 dias úteis após a gravação"],
    whatsapp: "Olá! Vim pelo site e quero um orçamento do pacote digital completo (site + vídeos).",
    highlight: { big: "+2", small: "vídeos grátis" },
  },
  {
    badge: "Para eventos",
    title: "Pacote de eventos",
    description:
      "Convite interativo + cobertura do evento. Do convite que chega no celular dos convidados ao vídeo que guarda o dia.",
    items: ["Convite digital interativo", "Confirmação de presença", "Cobertura do evento em vídeo", "Identidade visual do seu evento"],
    whatsapp: "Olá! Vim pelo site e quero um orçamento do pacote de eventos (convite + cobertura).",
    highlight: { big: "2 em 1", small: "convite + cobertura" },
  },
];

/** Opções do formulário de contato */
export const FORM_SERVICES = [
  ...PACKAGES.map((p) => p.title),
  ...SERVICES.map((s) => s.title),
  "Cobertura de evento",
  "Ainda não sei",
];

export const FORM_NICHES = [
  "Clínica particular",
  "Clínica multiprofissional",
  "Restaurante",
  "Loja",
  "Empresa",
  "Evento",
  "Outro",
];

export const STEPS = [
  { title: "Questionário", text: "Você responde algumas perguntas sobre o seu negócio, público e objetivo." },
  { title: "Prévia do site", text: "Em até 1 semana você recebe a prévia para aprovar e ajustar.", highlight: "1 semana" },
  { title: "Gravação e edição", text: "Gravamos e editamos seus vídeos, entregues em até 2 dias úteis.", highlight: "2 dias úteis" },
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
  /**
   * Só aparece no site com `ready: true`, ou seja, com material real do cliente
   * (telas, vídeos) e autorização dele para divulgar. Sem nenhum cliente pronto,
   * a seção Portfólio some do site e do menu.
   */
  ready: boolean;
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

const ALL_CLIENTS: Client[] = [
  {
    ready: false, // TODO: true quando o material real e a autorização estiverem prontos
    slug: "santa-lourdes",
    name: "Clínica Santa Lourdes",
    niche: "Clínica multiprofissional",
    summary:
      "Landing page guiada que leva o paciente da escolha da especialidade até o agendamento, com vídeos curtos apresentando a estrutura e a equipe.",
    delivered: ["Landing page guiada", "Agendamento online", "Reels de divulgação"],
    url: "", // TODO: link real (o botão "Ver site no ar" só aparece quando preenchido)
    materials: [
      { kind: "Site", title: "Página inicial", ...ph("1519494026892-80bbd2d6fd0d"), tone: "from-[#8fa3a4] to-[#3a4245]" },
      { kind: "Site", title: "Escolha da especialidade", ...ph("1576091160550-2173dba999ef"), tone: "from-[#93a0a8] to-[#3b4349]" },
      { kind: "Reel", title: "Conheça a clínica", ...ph("1505751172876-fa1923c5c528"), tone: "from-[#9aa7a3] to-[#3d4442]" },
      { kind: "Reel", title: "Equipe e atendimento", ...ph("1551076805-e1869033e561"), tone: "from-[#a39a92] to-[#45403b]" },
    ],
  },
  {
    ready: false, // TODO: true quando o material real e a autorização estiverem prontos
    slug: "dra-vanine",
    name: "Dra. Vanine",
    niche: "Consultório particular",
    summary:
      "Site com atendimento humanizado do primeiro contato à consulta, mais conteúdo em vídeo para manter o Instagram ativo.",
    delivered: ["Landing page guiada", "StoryMaker", "Edição continuada"],
    url: "", // TODO: link real (o botão "Ver site no ar" só aparece quando preenchido)
    materials: [
      { kind: "Site", title: "Apresentação", ...ph("1579684385127-1ef15d508118"), tone: "from-[#a7979f] to-[#4a3f45]" },
      { kind: "Site", title: "Agende sua consulta", ...ph("1460925895917-afdab827c52f"), tone: "from-[#9c98ad] to-[#3f3d4a]" },
      { kind: "Stories", title: "Dicas da semana", ...ph("1498050108023-c5249f4df085"), tone: "from-[#a39a92] to-[#45403b]" },
      { kind: "Reel", title: "Bastidores do consultório", ...ph("1522202176988-66273c2fd55f"), tone: "from-[#8fa3a4] to-[#3a4245]" },
    ],
  },
];

export const CLIENTS = ALL_CLIENTS.filter((c) => c.ready);
export const HAS_PORTFOLIO = CLIENTS.length > 0;

/* ------------------------------------------------------------------
   Perguntas frequentes (objeções antes do contato).
   Respostas só com o que já está definido no site; ajuste se mudar algo.
   ------------------------------------------------------------------ */
export const FAQ: { q: string; a: string }[] = [
  {
    q: "Em quanto tempo fica pronto?",
    a: "A prévia do site chega em até 1 semana depois do questionário. Os vídeos são entregues em até 2 dias úteis depois da gravação.",
  },
  {
    q: "Qual a diferença entre landing page guiada e site completo?",
    a: "A landing page guiada é uma página única com um objetivo só: levar o visitante a agir, como agendar uma consulta ou chamar no WhatsApp. É ideal para quem quer resultado rápido e tem um serviço principal. O site completo tem várias páginas (serviços, equipe, sobre, contato) e serve para quem precisa apresentar mais coisas e passar mais credibilidade. Na dúvida, a gente indica o melhor formato no orçamento.",
  },
  {
    q: "Posso contratar só um serviço?",
    a: "Pode. Cada serviço pode ser contratado separado. O pacote digital completo junta site e 4 vídeos e ainda vem com 2 vídeos grátis. O pacote de eventos junta o convite interativo e a cobertura do evento.",
  },
];
