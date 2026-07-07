import type { JobExperience } from '../types/JobExperience'

export const getExperience = (limit = -1): Array<JobExperience> => {
  let data: Array<JobExperience> = [
    {
      id: '1',
      title: 'Full-stack Developer',
      company: 'Talkual',
      type: 'full-time',
      location: 'Bellpuig, Catalonia, Spain',
      start: '2021-12-01',
      end: '2026-04-15',
      technologies: [
        'Nuxt.js',
        'Vue.js',
        'Node.js',
        'TypeScript',
        'Strapi',
        'PostgreSQL',
        'Redis'
      ],
      summary:
        'At Talkual I built and maintained production eCommerce flows across product, checkout and orders, connecting Vue/Nuxt frontends to Node.js and Strapi services. I worked on PostgreSQL data models, Redis-backed processes and features used by real customers and internal teams, with a focus on maintainable product delivery.'
    },
    {
      id: '2',
      title: 'Front-end Developer',
      company: 'Movetia',
      type: 'full-time',
      location: 'Barcelona, Catalonia, Spain',
      start: '2020-05-01',
      end: '2021-12-22',
      technologies: ['React', 'TypeScript', 'JavaScript'],
      summary:
        'At Movetia I maintained and extended a production React application, turning static HTML into reusable TypeScript components and testing flows before release to keep the product stable as it evolved.'
    },
    {
      id: '3',
      title: 'Full-stack Developer',
      company: 'Ubiquat Technologies',
      type: 'full-time',
      location: 'Igualada, Catalonia, Spain',
      start: '2016-08-01',
      end: '2019-09-15',
      technologies: ['Angular', 'Node.js', 'TypeScript', 'Ionic'],
      summary:
        'At Ubiquat I delivered full-stack web and mobile products with Angular, Node.js and Ionic, taking features from API design through to App Store and Google Play releases.'
    },
    {
      id: '6',
      title: 'Web developer',
      company: 'Coach4Pro',
      location: 'Espoo, Uusimaa, Finland (remote)',
      type: 'freelance',
      start: '2018-03-01',
      end: '2019-04-30',
      technologies: ['HTML5', 'JavaScript', 'CSS'],
      summary:
        'For Coach4Pro I updated and extended the company website remotely, building new pages from design mockups and integrating them into the existing site.'
    },
    {
      id: '5',
      title: 'Web developer',
      company: 'Ubiquat Technologies',
      type: 'internship',
      location: 'Igualada, Catalonia, Spain',
      start: '2016-01-01',
      end: '2016-05-31',
      technologies: ['Javascript', 'JQuery', 'Less', 'Bootstrap'],
      summary:
        'Internship at Ubiquat building a Bootstrap and jQuery web app for mobile user management, while also maintaining a native Android app published on Google Play.'
    },
    {
      id: '4',
      title: 'C# Developer',
      company: 'Ofimàtica anoia',
      type: 'internship',
      location: 'Igualada, Catalonia, Spain',
      start: '2014-10-01',
      end: '2015-01-31',
      technologies: ['C#', 'Entity framework'],
      summary:
        'Internship developing ASP.NET Web Forms tools in C# with Entity Framework, including document workflows and PDF conversion utilities.'
    }
  ]

  data = data.sort(
    (a, b) => new Date(b.start).getTime() - new Date(a.start).getTime()
  )

  if (limit === -1) {
    return data
  }

  return data.slice(0, limit)
}
