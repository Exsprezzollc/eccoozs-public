export type BellmontPageInfo = { title: string; index: number; alt: string; caption: string };

export const bellmontPages: Record<string, BellmontPageInfo> = {
  welcome: { title: "A Welcome from Bellmont", index: 0, alt: "Bellmont State University welcome page", caption: "Rooted in history. Preparing leaders for tomorrow." },
  "first-week": { title: "Your First Week at Bellmont", index: 1, alt: "Bellmont State University first week guide", caption: "New beginnings. New responsibilities. New possibilities." },
  code: { title: "The Bellmont Code", index: 2, alt: "The Bellmont Code", caption: "What we carry. How we lead. Who we become." },
  circle: { title: "Meet the Bellmont Circle", index: 3, alt: "Meet the Bellmont Circle", caption: "The people. The personalities. The story in motion." },
  "campus-life": { title: "Campus Life", index: 4, alt: "Bellmont State University campus life", caption: "More than a degree. A greater you." },
  career: { title: "Career & Professional Development", index: 5, alt: "Bellmont career and professional development", caption: "Work. Build. Lead. Own." },
  soundrooms: { title: "Bellmont Soundrooms", index: 6, alt: "Bellmont Soundrooms", caption: "Listen. Speak. Reflect. Connect." },
  traditions: { title: "Bellmont Traditions", index: 7, alt: "Bellmont State University traditions", caption: "What we inherit. What we carry forward." },
  athletics: { title: "Athletics at Bellmont", index: 8, alt: "Bellmont State University athletics", caption: "Discipline on the field. Purpose in life." },
  faith: { title: "Faith & Chapel Life", index: 9, alt: "Bellmont faith and chapel life", caption: "Faith that shapes character." },
  living: { title: "Living at Bellmont", index: 10, alt: "Bellmont residence life", caption: "Community today. Leaders tomorrow." },
  "student-support": { title: "Student Support & Success", index: 11, alt: "Bellmont student support and success", caption: "Support for the whole journey." },
  safety: { title: "Safety, Standards & Responsibility", index: 12, alt: "Bellmont safety, standards, and responsibility", caption: "Character and accountability." },
  wellness: { title: "Health, Wellness & Recreation", index: 13, alt: "Bellmont health, wellness, and recreation", caption: "Strong minds. Healthy habits. A better life." },
  academics: { title: "Academic Life at Bellmont", index: 14, alt: "Bellmont academic life", caption: "Knowledge with purpose. Preparation for life." },
  "financial-aid": { title: "Financing Your Bellmont Education", index: 15, alt: "Bellmont financial aid", caption: "Opportunity should be understood. Planning should be clear." },
  "sounds-of-triumph": { title: "Bellmont Sounds of Triumph", index: 16, alt: "Bellmont Sounds of Triumph marching band", caption: "Tradition. Precision. Power in motion." },
  "blue-belles": { title: "Bellmont Blue Belles", index: 17, alt: "Bellmont Blue Belles dance line", caption: "Performance. Pride. Purpose." }
};

export const bellmontOrder = Object.entries(bellmontPages).map(([slug, page]) => ({ slug, ...page }));
