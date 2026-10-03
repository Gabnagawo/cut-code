import * as React from "react";
import { ArrowRight, ChevronDown, CircleCheck, LoaderCircle } from "lucide-react";

import { WhatsAppIcon } from "@/components/brand-icons";
import { Button } from "@/components/ui/button";
import { CONTACT, FORM_NICHES, FORM_SERVICES, SELECT_SERVICE_EVENT, hasWhatsapp } from "@/data/content";
import { linkProps } from "@/lib/link-props";
import { cn } from "@/lib/utils";

/**
 * Envio pelo FormSubmit (sem backend). No primeiro envio, o FormSubmit manda um
 * e-mail de ativação para CONTACT.email; depois de confirmar, os pedidos chegam direto.
 */
const ENDPOINT = `https://formsubmit.co/ajax/${CONTACT.email}`;

type Field = "nome" | "contato" | "nicho" | "servico" | "mensagem";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

const EMPTY: Values = { nome: "", contato: "", nicho: "", servico: "", mensagem: "" };

function validate(field: Field, value: string): string | undefined {
  const v = value.trim();
  switch (field) {
    case "nome":
      return v.length < 2 ? "Informe seu nome ou o nome da empresa." : undefined;
    case "contato": {
      if (!v) return "Informe um WhatsApp ou e-mail para a gente responder.";
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      const digits = v.replace(/\D/g, "");
      const isPhone = !v.includes("@") && digits.length >= 10 && digits.length <= 13;
      return isEmail || isPhone ? undefined : "Use um e-mail (nome@email.com) ou um WhatsApp com DDD, ex.: (11) 99999-9999.";
    }
    case "nicho":
      return v ? undefined : "Escolha o nicho do seu negócio.";
    case "servico":
      return v ? undefined : "Escolha o serviço que você precisa.";
    default:
      return undefined;
  }
}

const REQUIRED: Field[] = ["nome", "contato", "nicho", "servico"];

/** Limites de tamanho: evitam envios gigantes (spam) sem atrapalhar o uso normal. */
const MAX: Record<"nome" | "contato" | "mensagem", number> = { nome: 120, contato: 120, mensagem: 1500 };

export function ContactForm({ className }: { className?: string }) {
  const [values, setValues] = React.useState<Values>(EMPTY);
  const [errors, setErrors] = React.useState<Errors>({});
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = React.useRef<HTMLFormElement>(null);
  const successRef = React.useRef<HTMLHeadingElement>(null);

  // "Pedir orçamento" de um serviço/pacote já chega com o serviço escolhido
  React.useEffect(() => {
    const onSelect = (e: Event) => {
      const service = (e as CustomEvent<string>).detail;
      if (!FORM_SERVICES.includes(service)) return;
      setStatus((s) => (s === "sent" ? "idle" : s));
      setValues((v) => ({ ...v, servico: service }));
      setErrors((er) => ({ ...er, servico: undefined }));
      // espera a rolagem até #orcamento e leva o foco ao formulário
      window.setTimeout(() => {
        const first = formRef.current?.querySelector<HTMLElement>('[name="nome"]');
        first?.focus({ preventScroll: true });
      }, 400);
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  // o formulário e a confirmação se alternam: o foco acompanha, em vez de cair no <body>
  const prevStatus = React.useRef(status);
  React.useEffect(() => {
    if (status === "sent") successRef.current?.focus();
    else if (prevStatus.current === "sent") formRef.current?.querySelector<HTMLElement>('[name="nome"]')?.focus();
    prevStatus.current = status;
  }, [status]);

  const set = (field: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setValues((s) => ({ ...s, [field]: value }));
    // se o campo já mostrava erro, some assim que ficar válido
    if (errors[field]) setErrors((s) => ({ ...s, [field]: validate(field, value) }));
  };

  const blur = (field: Field) => () => setErrors((s) => ({ ...s, [field]: validate(field, values[field]) }));

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: Errors = {};
    for (const f of REQUIRED) next[f] = validate(f, values[f]);
    setErrors(next);
    const firstInvalid = REQUIRED.find((f) => next[f]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          "Nome / empresa": values.nome.trim(),
          Contato: values.contato.trim(),
          Nicho: values.nicho,
          Serviço: values.servico,
          Mensagem: values.mensagem.trim() || "(sem mensagem)",
          _subject: `Novo pedido de orçamento: ${values.servico} (${values.nicho})`,
          _template: "table",
          _captcha: "false",
          _honey: (formRef.current?.elements.namedItem("_honey") as HTMLInputElement | null)?.value ?? "",
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== "true") throw new Error("falha no envio");
      setStatus("sent");
      setValues(EMPTY);
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className={cn("glass flex flex-col items-start rounded-[28px] p-6 sm:p-8", className)}>
        <span className="grid size-12 place-items-center rounded-full bg-graphite text-paper">
          <CircleCheck aria-hidden className="size-6" />
        </span>
        <h3 ref={successRef} tabIndex={-1} className="font-heading mt-6 text-3xl leading-tight text-graphite outline-none">
          Pedido enviado!
        </h3>
        <p className="mt-3 max-w-sm text-mist">
          Recebemos seus dados e vamos responder pelo WhatsApp ou e-mail que você informou. Se preferir, escreva para{" "}
          <a href={`mailto:${CONTACT.email}`} className="font-medium text-graphite underline underline-offset-4">
            {CONTACT.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex min-h-11 items-center text-sm font-medium text-graphite underline underline-offset-4"
        >
          Enviar outro pedido
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className={cn("glass rounded-[28px] p-6 sm:p-8", className)}>
      <h3 className="font-heading text-2xl text-graphite">Pedir orçamento</h3>
      <p className="mt-2 text-sm text-mist">Todos os campos são obrigatórios, menos a mensagem.</p>

      <div className="mt-6 grid gap-5">
        <TextField
          id="nome"
          label="Nome ou empresa"
          autoComplete="name"
          maxLength={MAX.nome}
          value={values.nome}
          error={errors.nome}
          onChange={set("nome")}
          onBlur={blur("nome")}
        />
        <TextField
          id="contato"
          label="Seu WhatsApp ou e-mail"
          autoComplete="off"
          maxLength={MAX.contato}
          value={values.contato}
          error={errors.contato}
          onChange={set("contato")}
          onBlur={blur("contato")}
        />
        <SelectField
          id="nicho"
          label="Nicho de atuação"
          placeholder="Selecione o seu nicho"
          options={FORM_NICHES}
          value={values.nicho}
          error={errors.nicho}
          onChange={set("nicho")}
          onBlur={blur("nicho")}
        />
        <SelectField
          id="servico"
          label="Serviço que você precisa"
          placeholder="Selecione um serviço"
          options={FORM_SERVICES}
          value={values.servico}
          error={errors.servico}
          onChange={set("servico")}
          onBlur={blur("servico")}
        />
        <div>
          <label htmlFor="campo-mensagem" className="mb-2 block text-sm font-medium text-graphite">
            Mensagem <span className="font-normal text-mist">(opcional)</span>
          </label>
          <textarea
            id="campo-mensagem"
            name="mensagem"
            rows={3}
            maxLength={MAX.mensagem}
            value={values.mensagem}
            onChange={set("mensagem")}
            className={cn(fieldClass, "min-h-24 resize-y py-3")}
            placeholder="Conte rapidinho o que você imagina"
          />
        </div>

        {/* armadilha para robôs: invisível para pessoas */}
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      </div>

      {status === "error" && (
        <div role="alert" className="mt-5 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-graphite">
          <p className="font-medium text-graphite">
            Não conseguimos enviar pelo formulário agora.
          </p>
          <p className="mt-1 text-mist">
            Você pode enviar o pedido direto pelo WhatsApp com seus dados já preenchidos, ou escrever para{" "}
            <a href={`mailto:${CONTACT.email}`} className="font-medium text-graphite underline underline-offset-4">
              {CONTACT.email}
            </a>
            .
          </p>
          {hasWhatsapp() && (
            <Button
              asChild
              type="button"
              className="mt-3.5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-graphite px-5 text-sm font-medium text-paper transition-colors hover:bg-graphite-2 sm:w-auto"
            >
              <a
                {...linkProps(
                  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(
                    [
                      "Olá! Vim pelo formulário do site da Cut Code para pedir um orçamento:",
                      values.nome.trim() ? `• Nome: ${values.nome.trim()}` : "",
                      values.nicho ? `• Nicho: ${values.nicho}` : "",
                      values.servico ? `• Serviço: ${values.servico}` : "",
                      values.mensagem.trim() ? `• Mensagem: ${values.mensagem.trim()}` : "",
                      values.contato.trim() ? `• Contato informado: ${values.contato.trim()}` : "",
                    ]
                      .filter(Boolean)
                      .join("\n")
                  )}`
                )}
              >
                <WhatsAppIcon aria-hidden className="size-4 shrink-0 text-emerald-400" />
                Continuar pedido no WhatsApp
              </a>
            </Button>
          )}
        </div>
      )}

      <p className="mt-6 text-xs leading-relaxed text-mist">
        Usamos seus dados só para responder este pedido. O envio passa pelo serviço FormSubmit, fora do Brasil, e chega ao nosso e-mail.{" "}
        <a href="privacidade" className="text-graphite underline underline-offset-4">
          Política de privacidade
        </a>
        .
      </p>

      <Button
        type="submit"
        variant="cta"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
        className="group/btn mt-4 w-full"
      >
        {status === "sending" ? (
          <>
            <LoaderCircle aria-hidden className="mr-2 size-4 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            Enviar pedido de orçamento
            <ArrowRight aria-hidden className="ml-2 size-4 transition-transform duration-150 group-hover/btn:translate-x-1" />
          </>
        )}
      </Button>
    </form>
  );
}

const fieldClass =
  "w-full rounded-2xl border border-graphite/15 bg-white/80 px-4 text-base text-graphite placeholder:text-mist/80 transition-colors duration-150 hover:border-graphite/30 focus-visible:border-graphite focus-visible:outline-2 focus-visible:outline-offset-2 aria-[invalid=true]:border-[#b3261e]";

type BaseProps = {
  id: Field;
  label: string;
  value: string;
  error?: string;
  onBlur: () => void;
};

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`campo-${id}-erro`} className="mt-2 text-sm text-[#b3261e]">
      {error}
    </p>
  );
}

function TextField({
  id,
  label,
  value,
  error,
  onBlur,
  onChange,
  autoComplete,
  maxLength,
}: BaseProps & {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  autoComplete?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label htmlFor={`campo-${id}`} className="mb-2 block text-sm font-medium text-graphite">
        {label}
      </label>
      <input
        id={`campo-${id}`}
        name={id}
        type="text"
        required
        autoComplete={autoComplete}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `campo-${id}-erro` : undefined}
        className={cn(fieldClass, "h-12")}
      />
      <FieldError id={id} error={error} />
    </div>
  );
}

function SelectField({
  id,
  label,
  placeholder,
  options,
  value,
  error,
  onBlur,
  onChange,
}: BaseProps & { placeholder: string; options: string[]; onChange: React.ChangeEventHandler<HTMLSelectElement> }) {
  return (
    <div>
      <label htmlFor={`campo-${id}`} className="mb-2 block text-sm font-medium text-graphite">
        {label}
      </label>
      <div className="relative">
        <select
          id={`campo-${id}`}
          name={id}
          required
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={!!error}
          aria-describedby={error ? `campo-${id}-erro` : undefined}
          className={cn(fieldClass, "h-12 appearance-none pr-11", !value && "text-mist")}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="text-graphite">
              {o}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-graphite" />
      </div>
      <FieldError id={id} error={error} />
    </div>
  );
}
