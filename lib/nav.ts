export type NavLink = {
  label: string;
  href: string;
  id: string;
  index: string;
};

/** Primary navigation. Routes are fixed; labels/order are owned by code. */
export const navLinks: NavLink[] = [
  { label: "Learning", href: "/learning", id: "learning", index: "02" },
  { label: "Research", href: "/research", id: "research", index: "03" },
  { label: "Resources", href: "/resources", id: "resources", index: "04" },
  { label: "Our work", href: "/work", id: "work", index: "05" },
  { label: "Events", href: "/seminars", id: "events", index: "06" },
  { label: "People & contact", href: "/people", id: "people", index: "07" },
];

export const siteRoutes = [
  { href: "/", label: "Index", index: "01" },
  ...navLinks,
];
