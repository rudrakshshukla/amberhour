import { fallbackHomeContent } from "../lib/home-content";
import { fallbackSiteSettings } from "../lib/site-settings";

/**
 * The design copy, used two ways in the Studio:
 * - as each singleton's initial value, so a brand-new document opens pre-filled;
 * - by the "Fill in default text" action, which fills any field still blank.
 * The site itself falls back to the same copy (lib/get-home-content.ts).
 */
export const STUDIO_DEFAULTS: Record<string, Record<string, unknown>> = {
  homePage: fallbackHomeContent as unknown as Record<string, unknown>,
  siteSettings: fallbackSiteSettings as unknown as Record<string, unknown>,
};

type Leaf = string | string[];

function isSection(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isBlank(value: unknown) {
  if (value === undefined || value === null) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

/** Dotted paths (e.g. "hero.headline") whose value is blank in `doc`, with their default. */
export function blankFields(doc: Record<string, unknown> | null | undefined, defaults: Record<string, unknown>) {
  const blanks: Record<string, Leaf> = {};
  for (const [key, value] of Object.entries(defaults)) {
    if (isSection(value)) {
      const current = doc?.[key];
      const section = isSection(current) ? current : undefined;
      for (const [field, fieldDefault] of Object.entries(value)) {
        if (isBlank(section?.[field])) blanks[`${key}.${field}`] = fieldDefault as Leaf;
      }
    } else if (isBlank(doc?.[key])) {
      blanks[key] = value as Leaf;
    }
  }
  return blanks;
}

/** Patches that create any missing section objects, then set every blank field. */
export function fillBlankPatches(blanks: Record<string, Leaf>) {
  const sections: Record<string, object> = {};
  for (const path of Object.keys(blanks)) {
    const [section, field] = path.split(".");
    if (field) sections[section] = {};
  }
  return [
    ...(Object.keys(sections).length ? [{ setIfMissing: sections }] : []),
    { set: blanks },
  ];
}

/** A fresh deep copy of the defaults for `initialValue`. */
export function initialValueFor(type: keyof typeof STUDIO_DEFAULTS) {
  return JSON.parse(JSON.stringify(STUDIO_DEFAULTS[type])) as Record<string, unknown>;
}
