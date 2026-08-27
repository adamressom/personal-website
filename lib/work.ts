export type WorkItem = {
  role: string;
  organization: string;
  location?: string;
  dates: string;
  summary: string;
  note?: string;
};

export const featuredWork: WorkItem[] = [
  {
    role: "Software Engineering Intern",
    organization: "SEO Tech",
    location: "Remote",
    dates: "Jun 2026 to Aug 2026",
    note: "returning summer 2026",
    summary:
      "Built PlanGuard, a full-stack study planning app with Flask, SQLAlchemy, REST APIs, secure auth, priority scoring, and 62 automated tests.",
  },
  {
    role: "Data Science Research Intern",
    organization: "Georgetown Data Science Corps",
    location: "Washington, DC",
    dates: "Jun 2026 to Aug 2026",
    summary:
      "Built and evaluated machine learning pipelines on 1.1M+ single-cell records, improving multiclass classification with ensemble methods.",
  },
  {
    role: "Software Engineering Intern",
    organization: "SEO Tech",
    location: "New York, NY",
    dates: "Feb 2025 to Aug 2025",
    summary:
      "Built technical projects through Agile sprints, tested features with teammates, and improved debugging, documentation, and delivery practices.",
  },
  {
    role: "Data Science Intern",
    organization: "Lombardi Comprehensive Cancer Center",
    location: "Washington, DC",
    dates: "Jun 2023 to Aug 2023",
    summary:
      "Analyzed metabolomics data with METLIN and XCMS, reducing processing time by 50%, improving accuracy, and identifying 2 potential biomarkers. Presented weekly findings to Dr. Cheema and the research team to improve experimental protocols and lab efficiency.",
  },
  {
    role: "AI and Software Engineering Intern",
    organization: "OmicsCraft LLC",
    dates: "Jun 2022 to Aug 2022",
    summary:
      "Contributed to AI-powered bioinformatics platforms supporting metabolomics and multi-omics analysis. Tested 3 toolkits, identified 2 critical bugs, and evaluated usability to inform redesigns for 2 platform features.",
  },
];

export const allWork: WorkItem[] = [
  {
    role: "Software Engineering Intern",
    organization: "SEO Tech",
    location: "Remote",
    dates: "Jun 2026 to Aug 2026",
    summary:
      "Built PlanGuard, a full-stack study planning application using Python, Flask, SQLAlchemy, JavaScript, and SQLite.",
  },
  {
    role: "Data Science Research Intern",
    organization: "Georgetown Data Science Corps",
    location: "Washington, DC",
    dates: "Jun 2026 to Aug 2026",
    summary:
      "Built and evaluated machine learning models on 1.1M+ single-cell records, optimized supervised classification pipelines, and used dimensionality reduction and clustering to find dataset patterns.",
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
    organization: "Lombardi Comprehensive Cancer Center",
    location: "Washington, DC",
    dates: "Jun 2023 to Aug 2023",
    summary:
      "Analyzed metabolomics data with METLIN and XCMS, reducing processing time by 50%, improving accuracy, and identifying 2 potential biomarkers. Presented weekly findings to Dr. Cheema and the research team to improve experimental protocols and lab efficiency.",
  },
  {
    role: "AI and Software Engineering Intern",
    organization: "OmicsCraft LLC",
    dates: "Jun 2022 to Aug 2022",
    summary:
      "Contributed to AI-powered bioinformatics platforms supporting metabolomics and multi-omics analysis. Tested 3 toolkits, identified 2 critical bugs, and evaluated usability to inform redesigns for 2 platform features.",
  },
];
