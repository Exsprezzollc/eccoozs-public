export type BellmontPageInfo = {
  title: string;
  image?: string;
  alt: string;
  caption: string;
};

export const bellmontPages: Record<string, BellmontPageInfo> = {
  welcome: {
    title: "A Welcome from Bellmont",
    image: "/bellmont/welcome.png",
    alt: "Bellmont State University welcome page",
    caption: "Rooted in history. Preparing leaders for tomorrow."
  },
  "first-week": {
    title: "Your First Week at Bellmont",
    image: "/bellmont/first-week.png",
    alt: "Bellmont State University first week guide",
    caption: "New beginnings. New responsibilities. New possibilities."
  },
  code: {
    title: "The Bellmont Code",
    image: "/bellmont/bellmont-code.png",
    alt: "The Bellmont Code",
    caption: "What we carry. How we lead. Who we become."
  },
  circle: {
    title: "Meet the Bellmont Circle",
    image: "/bellmont/bellmont-circle.png",
    alt: "Meet the Bellmont Circle",
    caption: "The people. The personalities. The story in motion."
  },
  "campus-life": {
    title: "Campus Life",
    image: "/bellmont/campus-life.png",
    alt: "Bellmont State University campus life",
    caption: "More than a degree. A greater you."
  },
  career: {
    title: "Career & Professional Development",
    image: "/bellmont/career-development.png",
    alt: "Bellmont career and professional development",
    caption: "Work. Build. Lead. Own."
  },
  "career-development": {
    title: "Career & Professional Development",
    image: "/bellmont/career-development.png",
    alt: "Bellmont career and professional development",
    caption: "Work. Build. Lead. Own."
  },
  soundrooms: {
    title: "Bellmont Soundrooms",
    alt: "Bellmont Soundrooms",
    caption: "Listen. Speak. Reflect. Connect."
  },
  traditions: {
    title: "Bellmont Traditions",
    image: "/bellmont/traditions.png",
    alt: "Bellmont State University traditions",
    caption: "What we inherit. What we carry forward."
  },
  athletics: {
    title: "Athletics at Bellmont",
    image: "/bellmont/athletics.png",
    alt: "Bellmont State University athletics",
    caption: "Discipline on the field. Purpose in life."
  },
  faith: {
    title: "Faith & Chapel Life",
    image: "/bellmont/faith-chapel.png",
    alt: "Bellmont faith and chapel life",
    caption: "Faith that shapes character."
  },
  living: {
    title: "Living at Bellmont",
    image: "/bellmont/living.png",
    alt: "Bellmont residence life",
    caption: "Community today. Leaders tomorrow."
  },
  "student-support": {
    title: "Student Support & Success",
    image: "/bellmont/student-support.png",
    alt: "Bellmont student support and success",
    caption: "Support for the whole journey."
  },
  safety: {
    title: "Safety, Standards & Responsibility",
    image: "/bellmont/safety.png",
    alt: "Bellmont safety, standards, and responsibility",
    caption: "Character and accountability."
  },
  wellness: {
    title: "Health, Wellness & Recreation",
    image: "/bellmont/wellness.png",
    alt: "Bellmont health, wellness, and recreation",
    caption: "Strong minds. Healthy habits. A better life."
  },
  academics: {
    title: "Academic Life at Bellmont",
    image: "/bellmont/academics.png",
    alt: "Bellmont academic life",
    caption: "Knowledge with purpose. Preparation for life."
  },
  "financial-aid": {
    title: "Financing Your Bellmont Education",
    image: "/bellmont/financial-aid.png",
    alt: "Bellmont financial aid",
    caption: "Opportunity should be understood. Planning should be clear."
  },
  "sounds-of-triumph": {
    title: "Bellmont Sounds of Triumph",
    image: "/bellmont/sounds-of-triumph.png",
    alt: "Bellmont Sounds of Triumph marching band",
    caption: "Tradition. Precision. Power in motion."
  },
  "blue-belles": {
    title: "Bellmont Blue Belles",
    image: "/bellmont/blue-belles.png",
    alt: "Bellmont Blue Belles dance line",
    caption: "Performance. Pride. Purpose."
  },
  "student-organizations": {
    title: "Student Organizations & Leadership",
    image: "/bellmont/student-organizations.png",
    alt: "Bellmont State University student organizations and leadership page",
    caption: "Find your people. Build your voice. Leave your mark."
  },
  "everyday-life": {
    title: "Everyday Life at Bellmont",
    image: "/bellmont/everyday-life.png",
    alt: "Everyday life and student services at Bellmont State University",
    caption: "Everything you need. Right where you need it."
  },
  explore: {
    title: "Explore Bellmont",
    image: "/bellmont/explore.png",
    alt: "Explore Bellmont State University campus",
    caption: "Historic beauty. Modern opportunity."
  }
};

export const bellmontOrder = Object.entries(bellmontPages).map(([slug, page]) => ({
  slug,
  ...page
}));
