export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-06-01";

/**
 * False until NEXT_PUBLIC_SANITY_PROJECT_ID is set. Pages that read
 * content check this and render a graceful "not connected yet" state
 * instead of trying to query a project that doesn't exist — so the site
 * still builds and runs before the owner has created a Sanity project.
 */
export const isSanityConfigured = projectId.length > 0;
