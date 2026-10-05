import {
  Clapperboard,
  ClipboardList,
  Compass,
  LayoutTemplate,
  Repeat,
  Rocket,
  Video,
  type LucideIcon,
} from "lucide-react";

// Canais da CutCode. Se algum ficar vazio, o card dele some e os botões levam ao formulário.
export const CONTACT = {
  /** só números, com DDI e DDD. ex.: "5511999999999" */
  whatsappNumber: "5592994215789",
  /** exibição formatada no site */
  whatsappFormatted: "+55 92 99421-5789",
  /** ex.: "https://instagram.com/cutandcode" */
  instagram: "https://instagram.com/cut_code",
  email: "cutcode.contato@gmail.com",
};

export const hasWhatsapp = () => Boolean(CONTACT.whatsappNumber);

/** Link do WhatsApp com mensagem pronta; sem número configurado, cai no formulário de orçamento. */
export function whatsappHref(message = "Olá! Vim pelo site da CutCode e quero um orçamento.") {
  if (!hasWhatsapp()) return "#orcamento";
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const instagramHref = () => CONTACT.instagram || "#orcamento";

/** Evento que pré-seleciona o serviço no formulário de contato. */
export const SELECT_SERVICE_EVENT = "cutcode:servico";

export const emailHref = () => `mailto:${CONTACT.email}`;

export type Showcase = {
  niche: string;
  title: string;
  meta: string;
  videoSlug: string;
  /** gradiente de fallback caso o vídeo não carregue */
  tone: string;
};

/** Vitrine do hero (slider vertical com miniaturas) */
export const SHOWCASE: Showcase[] = [
  {
    niche: "Clínicas",
    title: "Produção audiovisual pra clínicas",
    meta: "Reels de divulgação",
    videoSlug: "clinicas",
    tone: "from-[#8fa3a4] to-[#3a4245]",
  },
  {
    niche: "Profissionais",
    title: "Seu trabalho em destaque",
    meta: "Reels de divulgação",
    videoSlug: "profissionais",
    tone: "from-[#a39a92] to-[#45403b]",
  },
  {
    niche: "Lojas",
    title: "Produtos que chamam atenção",
    meta: "Vídeo comercial",
    videoSlug: "lojas",
    tone: "from-[#9c98ad] to-[#3f3d4a]",
  },
  {
    niche: "Empresas",
    title: "Presença que passa confiança",
    meta: "Vídeo institucional",
    videoSlug: "empresas",
    tone: "from-[#93a0a8] to-[#3b4349]",
  },
  {
    niche: "Eventos",
    title: "Cada momento registrado",
    meta: "Cobertura em vídeo",
    videoSlug: "eventos",
    tone: "from-[#a7979f] to-[#4a3f45]",
  },
];

export const NICHES = ["Clínicas particulares", "Clínicas multiprofissionais", "Profissionais", "Lojas", "Empresas", "Eventos"];

export type Service = {
  title: string;
  description: string;
  whatsapp: string;
  icon: LucideIcon;
};

export const SERVICES: Service[] = [
  {
    title: "Landing Page ou Site Institucional",
    description: "Uma página focada em levar o visitante a uma ação, ou um site completo para apresentar sua marca, seus serviços, equipe e contato. Você escolhe o formato que o seu negócio precisa.",
    whatsapp: "Olá! Vim pelo site da CutCode e quero um orçamento de landing page ou site institucional.",
    icon: LayoutTemplate,
  },
  {
    title: "Vídeos de Divulgação",
    description: "Vídeos para Stories, Reels e outras redes, com planejamento, roteiro, direção de captação, gravação, edição, tratamento de imagem, legendas, textos na tela e som.",
    whatsapp: "Olá! Vim pelo site da CutCode e quero um orçamento de vídeos de divulgação.",
    icon: Clapperboard,
  },
  {
    title: "Edição Continuada",
    description: "Você grava. A CutCode transforma em conteúdo. Serviço de edição para quem já grava os próprios vídeos.",
    whatsapp: "Olá! Vim pelo site da CutCode e quero saber da edição continuada.",
    icon: Repeat,
  },
  {
    title: "Cobertura de Eventos",
    description: "Captação em vídeo do seu evento e edição de conteúdos prontos para as redes, para registrar e divulgar cada momento: antes, durante e depois.",
    whatsapp: "Olá! Vim pelo site da CutCode e quero um orçamento de cobertura de evento.",
    icon: Video,
  },
];

export type Package = {
  id: string;
  title: string;
  description: string;
  items: string[];
  whatsapp: string;
  highlight: string;
};

export const PACKAGES: Package[] = [
  {
    id: "digital",
    title: "Pacote Digital Completo",
    description:
      "Uma solução para quem precisa estruturar sua comunicação digital e, ao mesmo tempo, criar conteúdo para divulgar o negócio. O pacote reúne uma landing page orientada ou um site institucional completo, além de quatro vídeos curtos para divulgação.",
    items: [
      "Landing page orientada ou site institucional completo",
      "Quatro vídeos curtos para divulgação",
      "Prévia do site em até uma semana após o briefing",
      "Vídeos em até dois dias úteis após a captação",
    ],
    whatsapp: "Olá! Vim pelo site da CutCode e quero um orçamento do pacote digital completo.",
    highlight: "+2 vídeos bônus inclusos",
  },
  {
    id: "eventos",
    title: "Pacote de Eventos",
    description:
      "Do convite ao registro, o objetivo é criar uma experiência que começa antes mesmo do evento. O pacote reúne convite digital interativo, página personalizada e produção de conteúdos audiovisuais para registrar e divulgar cada momento.",
    items: [
      "Convite digital interativo e página personalizada",
      "Produção de conteúdos audiovisuais",
      "Informações do evento e confirmação de presença",
      "Personalização com a identidade da ocasião",
    ],
    whatsapp: "Olá! Vim pelo site da CutCode e quero um orçamento do pacote de eventos.",
    highlight: "2 em 1: convite + cobertura",
  },
];

/** Opções do formulário de contato */
export const FORM_SERVICES = [
  ...PACKAGES.map((p) => p.title),
  ...SERVICES.map((s) => s.title),
  "Outro",
  "Ainda não sei",
];

export const FORM_NICHES = [
  "Clínica particular",
  "Clínica multiprofissional",
  "Profissional",
  "Loja",
  "Empresa",
  "Evento",
  "Outro",
];

export type Step = {
  title: string;
  text: string;
  highlight?: string;
  icon: LucideIcon;
};

export const STEPS: Step[] = [
  {
    icon: ClipboardList,
    title: "Briefing",
    text: "Você nos conta sobre seu negócio, público e objetivos por meio de um questionário direcionado e, quando necessário, de uma reunião de alinhamento.",
  },
  {
    icon: Compass,
    title: "Direção do projeto",
    text: "A partir dessas informações, estruturamos o conteúdo, a experiência e a direção visual do projeto.",
  },
  {
    icon: Clapperboard,
    title: "Prévia e produção",
    text: "No caso de sites e landing pages, a prévia é apresentada em até uma semana após a conclusão do briefing, permitindo análise e ajustes antes da publicação. Para os projetos audiovisuais, seguimos para a captação e, posteriormente, para a pós-produção, etapa em que o material é editado, tratado e preparado para publicação. A entrega dos vídeos ocorre em até dois dias úteis após a captação.",
  },
  {
    icon: Rocket,
    title: "No ar",
    text: "Ao final, o site vai ao ar e os conteúdos ficam prontos para publicação, levando a mensagem da sua marca até o público que você deseja alcançar.",
  },
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

const ph = (): Pick<ClientMaterial, "image" | "thumb"> => ({
  image: "assets/videos/clinicas-poster.jpg",
  thumb: "assets/videos/clinicas-poster.jpg",
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
      { kind: "Site", title: "Página inicial", ...ph(), tone: "from-[#8fa3a4] to-[#3a4245]" },
      { kind: "Site", title: "Escolha da especialidade", ...ph(), tone: "from-[#93a0a8] to-[#3b4349]" },
      { kind: "Reel", title: "Conheça a clínica", ...ph(), tone: "from-[#9aa7a3] to-[#3d4442]" },
      { kind: "Reel", title: "Equipe e atendimento", ...ph(), tone: "from-[#a39a92] to-[#45403b]" },
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
      { kind: "Site", title: "Apresentação", ...ph(), tone: "from-[#a7979f] to-[#4a3f45]" },
      { kind: "Site", title: "Agende sua consulta", ...ph(), tone: "from-[#9c98ad] to-[#3f3d4a]" },
      { kind: "Stories", title: "Dicas da semana", ...ph(), tone: "from-[#a39a92] to-[#45403b]" },
      { kind: "Reel", title: "Bastidores do consultório", ...ph(), tone: "from-[#8fa3a4] to-[#3a4245]" },
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
    q: "Qual a diferença entre landing page e site completo?",
    a: "A landing page é uma página única construída para conduzir o visitante a uma ação específica, como agendar uma consulta, solicitar um orçamento ou entrar em contato pelo WhatsApp. É indicada para quem possui um serviço principal ou precisa de uma comunicação mais direta.\n\nJá o site completo possui múltiplas páginas e permite apresentar a marca de maneira mais ampla, reunindo serviços, equipe, informações institucionais, contato e outros conteúdos.",
  },
  {
    q: "Posso contratar apenas um serviço?",
    a: "Sim. Todos os serviços podem ser contratados individualmente. Os pacotes reúnem soluções que funcionam de forma integrada e oferecem condições e bônus específicos para a contratação conjunta.",
  },
  {
    q: "Em quanto tempo fica pronto?",
    a: "A prévia do site ou da landing page é apresentada em até uma semana após a conclusão do briefing. Os vídeos são entregues em até dois dias úteis após a captação.",
  },
];
