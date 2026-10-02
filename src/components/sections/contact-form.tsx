import * as React from "react";
import { ArrowRight, ChevronDown, CircleCheck, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CONTACT, FORM_NICHES, FORM_SERVICES } from "@/data/content";
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

export function ContactForm({ className }: { className?: string }) {
  const [values, setValues] = React.useState<Values>(EMPTY);
  const [errors, setErrors] = React.useState<Errors>({});
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = React.useRef<HTMLFormElement>(null);

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
        <h3 className="font-heading mt-6 text-3xl leading-tight text-graphite">Pedido enviado!</h3>
        <p className="mt-3 max-w-sm text-mist">Recebemos seus dados e vamos responder pelo contato que você informou.</p>
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
      <h3 className="font-heading text-2xl tracking-[-0.03em]! text-graphite">Pedir orçamento</h3>
      <p className="mt-2 text-sm text-mist">Todos os campos são obrigatórios, menos a mensagem.</p>

      <div className="mt-6 grid gap-5">
        <TextField
          id="nome"
          label="Nome ou empresa"
          autoComplete="organization"
          value={values.nome}
          error={errors.nome}
          onChange={set("nome")}
          onBlur={blur("nome")}
        />
        <TextField
          id="contato"
          label="Seu WhatsApp ou e-mail"
          autoComplete="email"
          inputMode="email"
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
        <p role="alert" className="mt-5 rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-graphite">
          Não conseguimos enviar agora. Tente de novo ou escreva para{" "}
          <a href={`mailto:${CONTACT.email}`} className="font-medium underline underline-offset-4">
            {CONTACT.email}
          </a>
          .
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
        className="group/btn mt-6 h-13 w-full rounded-full bg-graphite px-7 text-base text-paper shadow-[0_14px_34px_-14px_rgb(30_30_30/0.7)] hover:bg-graphite-2"
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
  inputMode,
}: BaseProps & {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
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
        inputMode={inputMode}
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
