import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { SANITY_TAGS, type SanityDocType } from "@/sanity/lib/tags";

/**
 * Sanity calls this on every publish (configure a GROQ-powered webhook in
 * the Sanity project pointing here — see design/README.md). Verifies the
 * signature, then revalidates the Next.js cache tag for that document
 * type, so content changes appear without a redeploy (README.md →
 * Content management).
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: "SANITY_REVALIDATE_SECRET is not set" },
      { status: 500 }
    );
  }

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret);

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    const type = body?._type;
    if (!type || !(type in SANITY_TAGS)) {
      return NextResponse.json({ message: "No matching tag for this document type", type });
    }

    const tag = SANITY_TAGS[type as SanityDocType];
    // 'max' = stale-while-revalidate: serve the cached page immediately,
    // refresh in the background. Recommended by the Next.js docs over a
    // shorter window for content like this.
    revalidateTag(tag, "max");

    return NextResponse.json({ revalidated: true, tag, now: Date.now() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
