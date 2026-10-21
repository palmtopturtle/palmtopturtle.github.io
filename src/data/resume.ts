export const person = {
  name: 'Jeff G',
  role: 'Web developer',
  location: 'Ohio',
  email: null as string | null,
  github: 'https://github.com/palmtopturtle',
  githubHandle: 'palmtopturtle',
  linkedin: 'https://www.linkedin.com/in/jeff-g-7b6ba1164/',
  resumePdf: null as string | null,
  summary:
    'I build fast, accessible storefronts and interfaces with React, Next.js and TypeScript. ' +
    'Five years of Shopify and headless ecommerce work for high-traffic brands, ' +
    'with a background in UI/UX that shows up in the details. ' +
    'My hands-on experience working with brands and cross-functional teams gives me a unique perspective, ' + 
    'and the ability to apply my skills to a variety of roles.' ,
};

export type Project = {
  title: string;
  context: string;
  description: string;
  stack: string[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    title: 'Headless storefront for Arrow Tool Group',
    context: 'DYODE',
    description:
      'Helped architect and build a headless ecommerce storefront, from scoping and API development through implementation and deployment. Worked directly with client to scope out requirements and successfully delivered on the project.',
    stack: ['Next.js', 'TypeScript', 'BigCommerce', 'Vercel'],
  },
  {
    title: 'Custom Shopify themes',
    context: 'DYODE',
    description:
      'Turned designs into pixel-accurate, maintainable themes and built a library of reusable UI components that sped up feature work across client projects. Used Web Components where clients needed something the existing theme architecture couldn’t offer.',
    stack: ['Shopify Liquid', 'JavaScript', 'React', 'Vue', 'Web Components', 'CSS'],
  },
  {
    title: 'Performance and accessibility audits',
    context: 'DYODE',
    description:
      'Audited live storefronts and shipped fixes such as code splitting, image optimization and caching, raising speed, SEO and accessibility scores against current WCAG guidance.',
    stack: ['Lighthouse', 'WCAG', 'Core Web Vitals'],
  },
  {
    title: 'Vue project starter',
    context: 'BVA',
    description:
      'Led development of an internal build tool that set up new repositories with Vue and shared components, cutting setup time and code churn on new projects.',
    stack: ['Vue', 'Shopify'],
  },
  {
    title: 'This site',
    context: 'Personal',
    description:
      'Built with Astro and deployed to GitHub Pages by a GitHub Actions workflow. Inspect mode is written in plain JavaScript with no dependencies.',
    stack: ['Astro', 'GitHub Actions', 'JavaScript', 'CSS'],
    links: [{ label: 'View the source', href: 'https://github.com/palmtopturtle/palmtopturtle.github.io' }],
  },
];

export type Job = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
};

export const experience: Job[] = [
  {
    role: 'Front-End Developer',
    company: 'DYODE',
    location: 'Remote',
    start: '2022',
    end: '2025',
    highlights: [
      'Built custom Shopify themes for more than 30 clients, matching designs with pixel-level accuracy.',
      'Partnered with designers on responsive, accessible interfaces and reusable components.',
      'Scoped projects directly with clients, chose tech stacks and managed work in Jira.',
      'Audited and optimized sites for performance, SEO and accessibility.',
      'Helped architect headless Next.js storefronts using Vercel.',
      'Followed an Agile methodology, keeping projects organized and on schedule.',
      'Worked closely with project team members, going above and beyond to help out when needed.',
    ],
  },
  {
    role: 'Associate Front-End Developer',
    company: 'BVA (Brand Value Accelerator)',
    location: 'Columbus, Ohio',
    start: '2019',
    end: '2020',
    highlights: [
      'Worked across several Shopify projects at once, each with its own team.',
      'Led an internal Vue-based build tool that sped up new projects and reduced code churn.',
    ],
  },
];

export const education = {
  school: 'The Ohio State University',
  degree: 'BA, Communication Technology',
  year: '2018',
};

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages and frameworks', items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue', 'Tailwind', 'Animation libraries (Motion)', 'SQL'] },
  { group: 'Commerce', items: ['Shopify Liquid', 'Shopify Hydrogen', 'BigCommerce', 'Headless storefronts'] },
  { group: 'Quality', items: ['Accessibility (WCAG)', 'Performance optimization', 'Unit testing'] },
  { group: 'Delivery', items: ['Git', 'GitHub', 'CI/CD', 'AWS', 'Vercel', 'Jira'] },
  { group: 'Design', items: ['Figma', 'Adobe Creative Suite', 'UI/UX'] },
  { group: 'AI-assisted development', items: ['Claude Code', 'Claude API'] },
];

export const about = {
  personalBlurb: 
    'I’ve been passionate about coding and computer technology since a young age, ' + 
    'and started out hosting my own forums and websites for things that I enjoyed as a kid. ' + 
    'I also became active in game modding communities, going as far as to code things in assembly! ' + 
    'These experiences serve as a strong foundation for my career, ' + 
    'and to this day I carry that same sense of wonder that I had when I wrote my first HTML file. ' + 
    'I also have a creative side and have been learning Blender to create 3D art. ' +
    'Hopefully I can create some experiences with three.js in the future!' ,
}
