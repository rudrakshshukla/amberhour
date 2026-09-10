export interface NavLink {
  label: string;
  href: string;
}

/** The five pillar/library/notes links in the primary nav, in order. */
export const PILLAR_LINKS: NavLink[] = [
  { label: "Think", href: "/think" },
  { label: "Decide", href: "/decide" },
  { label: "Build", href: "/build" },
  { label: "Library", href: "/library" },
  { label: "Notes", href: "/notes" },
];

export const WORK_WITH_ME_LINK: NavLink = {
  label: "Work with me",
  href: "/work-with-me",
};

/** Footer, left column: "The work". */
export const FOOTER_WORK_LINKS: NavLink[] = [
  { label: "Think", href: "/think" },
  { label: "Decide", href: "/decide" },
  { label: "Build", href: "/build" },
  WORK_WITH_ME_LINK,
];

/** Footer, right column: "Elsewhere". */
export const FOOTER_ELSEWHERE_LINKS: NavLink[] = [
  { label: "Library", href: "/library" },
  { label: "Notes", href: "/notes" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
