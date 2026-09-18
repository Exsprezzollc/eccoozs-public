export type HistoryPageEntry = {
  section: "people" | "innovation" | "service" | "events" | "indigenous";
  slug: string;
  category: string;
  title: string;
  subtitle: string;
  summary: string;
  image: string;
  thumbnail: string;
  alt: string;
  searchTerms: string[];
};

export const historyPages: HistoryPageEntry[] = [
  {
    section: "people",
    slug: "carter-g-woodson",
    category: "People",
    title: "Carter G. Woodson",
    subtitle: "Lives Worth Knowing",
    summary:
      "Historian, educator, author, and institution-builder whose scholarship helped secure Black history a permanent place in the American historical record.",
    image: "/history/people/carter-g-woodson.png",
    thumbnail: "/history/history-lives-worth-knowing.png",
    alt: "ECCOOZS History editorial page about Carter G. Woodson",
    searchTerms: [
      "carter woodson",
      "black history",
      "negro history week",
      "historian",
      "education",
      "people"
    ]
  },
  {
    section: "innovation",
    slug: "garrett-morgan",
    category: "Ideas & Innovation",
    title: "Garrett Augustus Morgan",
    subtitle: "Ingenuity in Service of Everyday Life",
    summary:
      "Inventor and entrepreneur remembered for practical safety innovations, including his breathing device and an improved traffic signal.",
    image: "/history/innovation/garrett-morgan.png",
    thumbnail: "/history/history-ideas-and-innovation.png",
    alt: "ECCOOZS History editorial page about Garrett Augustus Morgan",
    searchTerms: [
      "garrett morgan",
      "inventor",
      "traffic signal",
      "safety hood",
      "cleveland",
      "innovation",
      "patent"
    ]
  },
  {
    section: "service",
    slug: "tuskegee-airmen",
    category: "Service & Sacrifice",
    title: "The Tuskegee Airmen",
    subtitle: "Courage. Skill. Opportunity.",
    summary:
      "The pilots, instructors, mechanics, navigators, bombardiers, and support personnel whose World War II service challenged barriers in American military aviation.",
    image: "/history/service/tuskegee-airmen.png",
    thumbnail: "/history/history-duty-across-generations.png",
    alt: "ECCOOZS History editorial page about the Tuskegee Airmen",
    searchTerms: [
      "tuskegee airmen",
      "red tails",
      "world war ii",
      "military",
      "aviation",
      "benjamin davis",
      "service"
    ]
  },
  {
    section: "events",
    slug: "great-migration",
    category: "Events",
    title: "The Great Migration",
    subtitle: "Movement Changed Places. People Changed Everything.",
    summary:
      "The mass movement of millions of Black Americans from the South to cities across the North, Midwest, and West during the twentieth century.",
    image: "/history/events/great-migration.png",
    thumbnail: "/history/history-leadership-and-culture.png",
    alt: "ECCOOZS History editorial page about the Great Migration",
    searchTerms: [
      "great migration",
      "migration",
      "harlem",
      "bronzeville",
      "detroit",
      "chicago",
      "events"
    ]
  },
  {
    section: "indigenous",
    slug: "who-decided-your-race",
    category: "Indigenous · Foundations",
    title: "Who Decided Your Race?",
    subtitle: "How American Racial Classifications Were Created, Changed, and Applied",
    summary:
      "A foundation lesson on changing government racial categories, who assigned them, why those classifications existed, and how historical records should be interpreted.",
    image: "/history/indigenous/who-decided-your-race.png",
    thumbnail: "/history/history-indigenous-heritage.png",
    alt: "ECCOOZS History foundation page explaining changing American racial classifications",
    searchTerms: [
      "who decided your race",
      "race",
      "racial classification",
      "census",
      "enumerator",
      "omb",
      "indigenous",
      "identity in the record",
      "sociopolitical constructs",
      "paper records"
    ]
  }
];

export function getHistoryPage(section: string, slug: string) {
  return historyPages.find((page) => page.section === section && page.slug === slug);
}
