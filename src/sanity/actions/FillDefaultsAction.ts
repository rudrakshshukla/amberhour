import { useDocumentOperation, type DocumentActionComponent } from "sanity";
import { STUDIO_DEFAULTS, blankFields, fillBlankPatches } from "../defaults";

/**
 * "Fill in default text": copies the design's wording into every field that
 * is still blank. Never overwrites anything already written. Changes land in
 * the draft, so nothing goes live until Publish.
 */
export const FillDefaultsAction: DocumentActionComponent = (props) => {
  const { patch } = useDocumentOperation(props.id, props.type);
  const defaults = STUDIO_DEFAULTS[props.type];
  const doc = (props.draft ?? props.published) as Record<string, unknown> | null;
  const blanks = defaults ? blankFields(doc, defaults) : {};
  const count = Object.keys(blanks).length;

  return {
    label: count ? `Fill in default text (${count} blank)` : "All fields filled",
    title: "Copies the site's default wording into every empty field. Nothing you've written is changed.",
    disabled: count === 0 || Boolean(patch.disabled),
    onHandle: () => {
      patch.execute(fillBlankPatches(blanks), { _id: props.id, _type: props.type });
      props.onComplete();
    },
  };
};
FillDefaultsAction.displayName = "FillDefaultsAction";
