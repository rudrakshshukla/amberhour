import { price } from "./objects/price";
import { pullQuote } from "./objects/pullQuote";
import { note } from "./note";
import { tool } from "./tool";
import { bundle } from "./bundle";
import { currency } from "./currency";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  // Documents
  note,
  tool,
  bundle,
  currency,
  siteSettings,
  // Objects
  price,
  pullQuote,
];
