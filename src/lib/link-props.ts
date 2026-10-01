/** Props de <a>: links externos abrem em nova aba com rel seguro. */
export function linkProps(href: string) {
  return /^https?:/.test(href) ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
}
