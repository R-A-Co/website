import type { CollectionDef, FieldDef } from "./schema";

function normalizeField(field: FieldDef, value: unknown): unknown {
  switch (field.type) {
    case "boolean":
      return value === true;
    case "tags":
      return Array.isArray(value)
        ? value.map((tag) => String(tag).trim()).filter(Boolean)
        : [];
    case "metrics":
      return Array.isArray(value)
        ? value
            .map((metric) => {
              const item = (metric ?? {}) as Record<string, unknown>;
              return {
                label: String(item.label ?? "").trim(),
                value: String(item.value ?? "").trim(),
              };
            })
            .filter((metric) => metric.label || metric.value)
        : [];
    case "select": {
      const selected = String(value ?? "");
      return field.options?.includes(selected)
        ? selected
        : (field.options?.[0] ?? "");
    }
    default:
      return String(value ?? "").trim();
  }
}

function normalizeItem(
  def: CollectionDef,
  input: unknown,
): Record<string, unknown> {
  const source =
    input && typeof input === "object"
      ? (input as Record<string, unknown>)
      : {};

  const result: Record<string, unknown> = {};
  for (const field of def.fields) {
    result[field.key] = normalizeField(field, source[field.key]);
  }
  return result;
}

export function normalizeCollection(
  def: CollectionDef,
  input: unknown,
): unknown {
  if (def.singleton) {
    return normalizeItem(def, input);
  }

  if (!Array.isArray(input)) {
    throw new Error("Expected a list of entries.");
  }

  return input.map((item) => normalizeItem(def, item));
}
