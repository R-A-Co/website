"use client";

import { useMemo, useState, useTransition } from "react";
import { ArrowDown, ArrowUp, Plus, Save, Trash2 } from "lucide-react";
import { saveCollectionAction, type SaveResult } from "@/lib/admin/actions";
import type { CollectionDef, FieldDef } from "@/lib/admin/schema";
import { cn } from "@/lib/utils";

type Row = Record<string, unknown>;

const inputClass =
  "w-full border border-border bg-surface px-2.5 py-2 font-sans text-[14px] leading-[1.5] text-ink transition-colors placeholder:text-faint focus:border-accent";

const labelClass =
  "mb-1.5 block font-mono text-[10px] uppercase leading-[1.5] tracking-[0.08em] text-secondary";

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asBoolean(value: unknown): boolean {
  return value === true;
}

function asTags(value: unknown): string[] {
  return Array.isArray(value) ? value.map((item) => String(item)) : [];
}

function asMetrics(value: unknown): { label: string; value: string }[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    const metric = (item ?? {}) as Record<string, unknown>;
    return {
      label: asString(metric.label),
      value: asString(metric.value),
    };
  });
}

function emptyRow(def: CollectionDef): Row {
  const row: Row = {};
  for (const field of def.fields) {
    if (field.type === "boolean") row[field.key] = false;
    else if (field.type === "tags" || field.type === "metrics") row[field.key] = [];
    else if (field.type === "select") row[field.key] = field.options?.[0] ?? "";
    else row[field.key] = "";
  }
  return row;
}

function Field({
  field,
  value,
  onChange,
  idPrefix,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (value: unknown) => void;
  idPrefix: string;
}) {
  const id = `${idPrefix}-${field.key}`;

  if (field.type === "boolean") {
    return (
      <label className="flex items-center gap-2.5 border border-border bg-surface px-2.5 py-2.5">
        <input
          id={id}
          type="checkbox"
          checked={asBoolean(value)}
          onChange={(event) => onChange(event.target.checked)}
          className="size-4 accent-[var(--color-accent)]"
        />
        <span className="font-sans text-[14px] leading-[1.5] text-ink">
          {field.label}
        </span>
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <div>
        <label className={labelClass} htmlFor={id}>
          {field.label}
        </label>
        <select
          id={id}
          value={asString(value)}
          onChange={(event) => onChange(event.target.value)}
          className={inputClass}
        >
          {(field.options ?? []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "metrics") {
    const metrics = asMetrics(value);
    return (
      <div>
        <span className={labelClass}>{field.label}</span>
        <div className="space-y-2">
          {metrics.map((metric, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                aria-label={`${field.label} ${index + 1} label`}
                value={metric.label}
                onChange={(event) => {
                  const next = [...metrics];
                  next[index] = { ...next[index], label: event.target.value };
                  onChange(next);
                }}
                placeholder="Label"
                className={inputClass}
              />
              <input
                aria-label={`${field.label} ${index + 1} value`}
                value={metric.value}
                onChange={(event) => {
                  const next = [...metrics];
                  next[index] = { ...next[index], value: event.target.value };
                  onChange(next);
                }}
                placeholder="Value"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => onChange(metrics.filter((_, i) => i !== index))}
                className="inline-flex size-8 shrink-0 items-center justify-center border border-border text-secondary transition-colors hover:border-ink hover:text-ink"
                aria-label={`Remove ${field.label} ${index + 1}`}
              >
                <Trash2 aria-hidden="true" className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onChange([...metrics, { label: "", value: "" }])}
          className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-accent transition-opacity hover:opacity-60"
        >
          <Plus aria-hidden="true" className="size-3" />
          Add {field.label.toLowerCase()}
        </button>
      </div>
    );
  }

  if (field.type === "tags") {
    return (
      <div>
        <label className={labelClass} htmlFor={id}>
          {field.label}
        </label>
        <input
          id={id}
          value={asTags(value).join(", ")}
          onChange={(event) => onChange(event.target.value.split(","))}
          placeholder={field.placeholder}
          className={inputClass}
        />
        {field.help ? (
          <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.06em] text-secondary">
            {field.help}
          </p>
        ) : null}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div>
        <label className={labelClass} htmlFor={id}>
          {field.label}
        </label>
        <textarea
          id={id}
          value={asString(value)}
          onChange={(event) => onChange(event.target.value)}
          rows={4}
          placeholder={field.placeholder}
          className={cn(inputClass, "resize-y")}
        />
      </div>
    );
  }

  const inputType =
    field.type === "url"
      ? "url"
      : field.type === "email"
        ? "email"
        : field.type === "date"
          ? "date"
          : "text";

  return (
    <div>
      <label className={labelClass} htmlFor={id}>
        {field.label}
      </label>
      <input
        id={id}
        type={inputType}
        value={asString(value)}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholder}
        className={inputClass}
      />
    </div>
  );
}

function ItemForm({
  def,
  row,
  onChange,
  idPrefix,
}: {
  def: CollectionDef;
  row: Row;
  onChange: (next: Row) => void;
  idPrefix: string;
}) {
  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 md:p-5">
      {def.fields.map((field) => (
        <div key={field.key} className={field.full ? "sm:col-span-2" : undefined}>
          <Field
            field={field}
            value={row[field.key]}
            idPrefix={idPrefix}
            onChange={(value) => onChange({ ...row, [field.key]: value })}
          />
        </div>
      ))}
    </div>
  );
}

export function CollectionEditor({
  collection,
  initialData,
}: {
  collection: CollectionDef;
  initialData: unknown;
}) {
  const initialRows = useMemo<Row[]>(() => {
    if (collection.singleton) {
      return [
        (initialData && typeof initialData === "object"
          ? initialData
          : emptyRow(collection)) as Row,
      ];
    }
    return Array.isArray(initialData) ? (initialData as Row[]) : [];
  }, [collection, initialData]);

  const [rows, setRows] = useState<Row[]>(initialRows);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<SaveResult | null>(null);
  const [pending, startTransition] = useTransition();

  function updateRow(index: number, next: Row) {
    setRows((current) =>
      current.map((row, rowIndex) => (rowIndex === index ? next : row)),
    );
    setDirty(true);
    setStatus(null);
  }

  function addRow() {
    setRows((current) => [...current, emptyRow(collection)]);
    setDirty(true);
    setStatus(null);
  }

  function removeRow(index: number) {
    setRows((current) => current.filter((_, rowIndex) => rowIndex !== index));
    setDirty(true);
    setStatus(null);
  }

  function moveRow(index: number, direction: -1 | 1) {
    setRows((current) => {
      const target = index + direction;
      if (target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    setDirty(true);
    setStatus(null);
  }

  function save() {
    startTransition(async () => {
      const result = await saveCollectionAction(
        collection.slug,
        collection.singleton ? rows[0] : rows,
      );
      setStatus(result);
      if (result.ok) setDirty(false);
    });
  }

  return (
    <div>
      <div className="sticky top-0 z-20 -mx-5 mb-6 border-b border-border bg-background/95 px-5 py-4 backdrop-blur-md md:-mx-8 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary">
              {collection.singleton
                ? "Singleton"
                : `${rows.length} ${rows.length === 1 ? "entry" : "entries"}`}
              {dirty ? " · Unsaved changes" : ""}
            </p>
            <h1 className="mt-1 font-sans text-[24px] leading-[1.2] tracking-[-0.02em] text-ink">
              {collection.label}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {!collection.singleton ? (
              <button
                type="button"
                onClick={addRow}
                className="inline-flex h-8 items-center gap-1.5 border border-ink px-2.5 text-[14px] leading-[1.3] text-ink transition-colors hover:bg-ink hover:text-background"
              >
                <Plus aria-hidden="true" className="size-3.5" />
                Add {collection.singular.toLowerCase()}
              </button>
            ) : null}
            <button
              type="button"
              onClick={save}
              disabled={pending}
              className="inline-flex h-8 items-center gap-1.5 bg-ink px-2.5 text-[14px] leading-[1.3] text-background transition-opacity hover:opacity-80 disabled:opacity-50"
            >
              <Save aria-hidden="true" className="size-3.5" />
              {pending ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>

        {status ? (
          <p
            role="status"
            className={cn(
              "mt-3 border px-2.5 py-2 text-[13px] leading-[1.5]",
              status.ok
                ? "border-accent/30 bg-accent/5 text-ink"
                : "border-red-700/30 bg-red-700/5 text-red-800",
            )}
          >
            {status.message}
          </p>
        ) : null}
      </div>

      <p className="mb-6 max-w-[620px] text-[15px] leading-[1.5] text-ink">
        {collection.description}
      </p>

      {collection.singleton ? (
        <div className="border border-border">
          <ItemForm
            def={collection}
            row={rows[0]}
            idPrefix="item-0"
            onChange={(next) => updateRow(0, next)}
          />
        </div>
      ) : (
        <div className="space-y-3">
          {rows.length === 0 ? (
            <p className="border border-dashed border-border px-4 py-10 text-center text-[14px] text-secondary">
              No entries yet. Add the first {collection.singular.toLowerCase()}.
            </p>
          ) : null}

          {rows.map((row, index) => {
            const title = asString(row[collection.titleKey]) || "Untitled";
            const subtitle = collection.subtitleKey
              ? asString(row[collection.subtitleKey])
              : "";

            return (
              <details
                key={index}
                className="group border border-border open:border-ink/20"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 marker:hidden">
                  <span className="min-w-0">
                    <span className="flex items-baseline gap-2">
                      <span className="font-mono text-[10px] leading-none text-secondary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="truncate font-sans text-[15px] leading-[1.3] text-ink">
                        {title}
                      </span>
                    </span>
                    {subtitle ? (
                      <span className="mt-1 block truncate font-mono text-[9px] uppercase tracking-[0.08em] text-secondary">
                        {subtitle}
                      </span>
                    ) : null}
                  </span>

                  <span className="flex shrink-0 items-center gap-1">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        moveRow(index, -1);
                      }}
                      disabled={index === 0}
                      aria-label={`Move ${title} up`}
                      className="inline-flex size-7 items-center justify-center text-secondary transition-colors hover:text-accent disabled:opacity-30"
                    >
                      <ArrowUp aria-hidden="true" className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        moveRow(index, 1);
                      }}
                      disabled={index === rows.length - 1}
                      aria-label={`Move ${title} down`}
                      className="inline-flex size-7 items-center justify-center text-secondary transition-colors hover:text-accent disabled:opacity-30"
                    >
                      <ArrowDown aria-hidden="true" className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        removeRow(index);
                      }}
                      aria-label={`Remove ${title}`}
                      className="inline-flex size-7 items-center justify-center text-secondary transition-colors hover:text-red-700"
                    >
                      <Trash2 aria-hidden="true" className="size-3.5" />
                    </button>
                  </span>
                </summary>

                <div className="border-t border-border">
                  <ItemForm
                    def={collection}
                    row={row}
                    idPrefix={`item-${index}`}
                    onChange={(next) => updateRow(index, next)}
                  />
                </div>
              </details>
            );
          })}

          {rows.length > 0 ? (
            <button
              type="button"
              onClick={addRow}
              className="inline-flex h-9 w-full items-center justify-center gap-1.5 border border-dashed border-border font-mono text-[10px] uppercase tracking-[0.08em] text-secondary transition-colors hover:border-ink hover:text-ink"
            >
              <Plus aria-hidden="true" className="size-3.5" />
              Add {collection.singular.toLowerCase()}
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
