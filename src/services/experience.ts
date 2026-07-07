import type { JobExperience } from '../types/JobExperience'

export const getExperience = (limit = -1): Array<JobExperience> => {
  let data: Array<JobExperience> = [
    {
      id: '1',
      title: 'Full-stack Developer',
      company: 'TALKUAL',
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
      responsibilities: [
        'Built and maintained production eCommerce features across product, checkout and order flows.',
        'Developed Vue/Nuxt interfaces connected to Node.js and Strapi services.',
        'Integrated backend workflows, PostgreSQL data models and Redis-backed processes.',
        'Collaborated on maintainable product features used by real users and internal teams.'
      ]
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
      responsibilities: [
        'Maintained and extended a production React web application.',
        'Converted static HTML views into reusable, maintainable components.',
        'Tested application flows and caught regressions before release.'
      ]
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
      responsibilities: [
        'Built web applications with Angular and Node.js/TypeScript backends.',
        'Developed cross-platform mobile apps with Ionic, published on App Store and Google Play.',
        'Delivered full-stack features from API design to client implementation.'
      ]
    },
    {
      id: '6',
      title: 'Web developer',
      company: 'Coach4Pro',
      location: 'Espoo, Uusimaa, Finland (remote)',
      type: 'freelance as needed',
      start: '2018-03-01',
      end: '2019-04-30',
      technologies: ['HTML5', 'JavaScript', 'CSS'],
      responsibilities: [
        'Updated and extended pages on the company website.',
        'Built new web pages from design mockups and integrated them into the existing site.'
      ]
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
      responsibilities: [
        'Developed a web app to manage users and information for a mobile app using Bootstrap, Less, and jQuery.',
        'Maintained a native Android app in Java and published it on Google Play.'
      ]
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
      responsibilities: [
        'Designed workflows with OpenKM.',
        'Developed an ASP.NET Web Forms application in C# with Entity Framework.',
        'Built a C# tool to convert documents to PDF for printing.'
      ]
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
