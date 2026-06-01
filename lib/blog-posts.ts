export type BlogPost = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  tag: string;
  readTime: string;
  image?: {
    src: string;
    alt: string;
    orientation: "wide" | "portrait" | "square";
  };
  repo?: {
    href: string;
    label: string;
    textBefore: string;
    textAfter: string;
  };
  titleImage?: {
    src: string;
    alt: string;
    orientation: "wide" | "portrait" | "square";
  };
  body: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "biggest-coding-project-didnt-launch",
    date: "June 2026",
    title: "My biggest coding project did not launch. Here's why.",
    excerpt:
      "I built a full-stack app with auth, data, deployment, and a polished UI. Then I stopped before launch.",
    tag: "Engineering",
    readTime: "6 min",
    image: {
      src: "/blog-project.png",
      alt: "Screenshot of the production-style web app contact page",
      orientation: "wide",
    },
    repo: {
      href: "https://github.com/adamressom/________Properties",
      label: "adamressom/________Properties",
      textBefore:
        "I also made a public template version of the project on GitHub. It keeps the reusable real estate app structure, including listings, team pages, contact forms, auth, saved favorites, admin-protected lead data, validation, rate limiting, and the deployment-ready Next.js, Convex, and WorkOS setup:",
      textAfter: ".",
    },
    body: [
      "This project started with one goal. I wanted to build something that felt real from the first screen. I did not want a tutorial clone or a small demo. I wanted a full web app with auth, a live database, deployment, and a UI that did not look rushed.",
      "I used Next.js, Convex, WorkOS, Vercel, and GitHub Actions. The stack taught me how the pieces of a real app connect. I dealt with route handlers, cookies, schema changes, generated backend functions, and deploy errors. Convex made the data side easier because I could inspect tables and function calls while the app ran. WorkOS slowed me down at first, but fixing the auth flow helped me understand how login works outside a tutorial.",
      "The app reached a real preview deployment. The database worked. Auth worked. The design system was consistent. The deploy pipeline worked from GitHub to Convex to Vercel. From a code point of view, it was ready enough to show.",
      "Then I stopped because the timing and legal risk around the properties became the problem. The app used real listing data, contact information, and pricing, and the project was supposed to be a surprise for a close friend because he wanted to sell more of his properties. But one of the owners was already dealing with a lawsuit, and putting all of his properties online could have created more exposure. After talking it through, I was told not to ship it for that reason.",
      "That was frustrating, especially after spending around two months building it, but it was useful. The project taught me that shipping is not only code. Legal risk, data rights, and compliance can stop a product even when the app works.",
      "I still count the project as a win. I learned how a full-stack app fits together, where production bugs come from, and why a clean launch needs more than a clean repo. The public version never happened, but the skills carried into the next thing I built.",
    ],
  },
  {
    slug: "missed-three-concerts-this-school-year",
    date: "May 2026",
    title: "I missed three concerts this school year. Here's why.",
    excerpt:
      "I skipped Osamason, Nettspend, Che, and Rolling Loud plans. Some reasons were valid. Some were not.",
    tag: "Life",
    readTime: "4 min",
    image: {
      src: "/blog-afrotech.jpg",
      alt: "Adam standing in front of the AfroTech Conference sign in Houston",
      orientation: "portrait",
    },
    titleImage: {
      src: "/nettspend.jpg",
      alt: "Nettspend concert photo",
      orientation: "square",
    },
    body: [
      "I missed three concerts this school year, and the reasons were not really about school.",
      "The first one was Osamason in Detroit. I bought the ticket before I knew I was going to Houston for AfroTech. AfroTech ran from October 27 to October 31, 2025, and it is one of the biggest spaces for Black tech professionals, students, founders, and companies to meet. I wanted to be there because it connected to my future, but it still meant I was in a different state when the concert happened.",
      "I ended up giving my Osamason ticket to a friend for free. That felt better than wasting it, but it still bothered me because I had already pictured myself going.",
      "The next two concerts were Nettspend and Che. We planned those about two months early. Nettspend was on Friday and Che was on Sunday, so the plan was to make a whole weekend out of it. We had four people in the group, and everyone sounded excited at first.",
      "Then one person backed out of Nettspend a few weeks before the show. After that, the energy changed and everyone backed out too. It was annoying, but at least it happened early enough to accept.",
      "The Che concert hurt more. On Saturday, the day before the show, we still had serious plans. We talked about where to meet, how we would hang out, and how the night would go. Then one person backed out, and somehow all of us backed out.",
      "That one was the worst because it happened the day before. I had not been to a concert all year, and I wanted one fun night before finals. Instead, the plan disappeared right when it felt real.",
      "Later, I watched Rolling Loud Orlando 2026 live in May. Rolling Loud is one of the biggest rap festivals in the world, and seeing everyone there having fun made me think about the concerts I missed. Then my roommate texted me saying we should have gone because our favorite rappers were there. That made the feeling worse.",
      "The lesson is that plans need someone to own them. If everyone waits for the group to stay excited, the plan can fall apart fast. Next time, if I care enough, I need to decide what I am doing first and let people join me instead of letting the whole plan depend on everyone.",
    ],
  },
  {
    slug: "why-i-made-this-site",
    date: "April 2026",
    title: "Why I made this site.",
    excerpt:
      "I wanted one place for my work, notes, links, and experiments. A small site makes that easier.",
    tag: "Thoughts",
    readTime: "6 min",
    body: [
      "I made this site because I needed one place to send people.",
      "A resume gives facts. GitHub shows code. LinkedIn shows history. I wanted a page that connects those pieces.",
      "I also wanted a place that felt like mine. The site shows what I build, what I am learning, and how I think through projects.",
      "Building it helped me practice the full path. I designed the page, built the UI, added auth, stored data, deployed it, and fixed the parts that broke.",
      "That work is different from finishing a tutorial. You have to make small choices that affect the whole product.",
      "The site is small on purpose. The homepage says what I do. The blogs hold notes. The project page gives context. The contact page gives people a clear next step.",
      "You do not need a large site to look serious. You need a site that loads, reads clearly, and makes your work easy to inspect.",
      "That was the goal, and I can keep improving it as I build more.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
