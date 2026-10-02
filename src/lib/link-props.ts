import { hasWhatsapp, SELECT_SERVICE_EVENT, whatsappHref } from "@/data/content";

/** Props de <a>: links externos abrem em nova aba com rel seguro. */
export function linkProps(href: string) {
  return /^https?:/.test(href) ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
}

/**
 * Link de "Pedir orçamento" de um serviço: abre o WhatsApp com a mensagem pronta
 * ou, sem WhatsApp configurado, leva ao formulário já com o serviço selecionado.
 */
export function quoteLinkProps(service: string, message: string) {
  if (hasWhatsapp()) return linkProps(whatsappHref(message));
  return {
    href: "#orcamento",
    onClick: () => window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: service })),
  };
}
