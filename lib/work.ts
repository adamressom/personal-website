export type WorkItem = {
  role: string;
  organization: string;
  location?: string;
  dates: string;
  summary: string;
};

export const featuredWork: WorkItem[] = [
  {
    role: "Software Engineering Intern",
    organization: "SEO Tech",
    location: "New York, NY",
    dates: "Feb 2025 to Aug 2025, returning Summer 2026",
    summary:
      "Prototyped interactive systems, debug tooling, and release-ready UI flows across Agile sprints.",
  },
  {
    role: "Data Science Intern",
    organization: "Georgetown University",
    dates: "Jun 2023 to Aug 2023",
    summary: "Cut metabolomics processing time by 50%. Found 2 potential biomarkers.",
  },
  {
    role: "AI and Software Engineering Intern",
    organization: "OmicsCraft LLC",
    dates: "Jun 2022 to Aug 2022",
    summary: "Tested 3 bioinformatics toolkits. Found 2 critical bugs.",
  },
];

export const allWork: WorkItem[] = [
  {
    role: "Software Engineering Intern",
    organization: "SEO Tech",
    location: "New York, NY",
    dates: "Incoming, Summer 2026",
    summary:
      "Returning for another summer to build technical projects, collaborate with engineering mentors, and ship production-minded work.",
  },
  {
    role: "Software Engineering Intern",
    organization: "SEO Tech",
    location: "New York, NY",
    dates: "Feb 2025 to Aug 2025",
    summary:
      "Built technical projects through Agile sprints, tested features with teammates, and improved how I debug, document, and ship code.",
  },
  {
    role: "Professional Development Chair",
    organization: "National Society of Black Engineers",
    location: "Ann Arbor, MI",
    dates: "Oct 2025 to Present",
    summary:
      "Mentor Black underclassmen pursuing engineering, support academic and career growth, and build connections with industry professionals and graduate students.",
  },
  {
    role: "Career Prep Fellow",
    organization: "Management Leadership for Tomorrow",
    location: "Washington, DC",
    dates: "Jan 2026 to Present",
    summary:
      "Selected for an 18-month career program focused on coaching, mentorship, technical assessments, case studies, simulations, and exposure to partners including LinkedIn, Bloomberg, and Deloitte.",
  },
  {
    role: "Academic Chair",
    organization: "ColorStack at UMich",
    location: "Ann Arbor, MI",
    dates: "Aug 2026, upcoming",
    summary:
      "Supporting chapter growth through coding challenges, career preparation, and technical skill development for students in the community.",
  },
  {
    role: "Data Science Intern",
    organization: "Georgetown University",
    dates: "Jun 2023 to Aug 2023",
    summary: "Cut metabolomics processing time by 50%. Found 2 potential biomarkers.",
  },
  {
    role: "AI and Software Engineering Intern",
    organization: "OmicsCraft LLC",
    dates: "Jun 2022 to Aug 2022",
    summary: "Tested 3 bioinformatics toolkits. Found 2 critical bugs.",
  },
];
