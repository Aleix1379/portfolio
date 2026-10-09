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
      end: '2026-04',
      technologies: [
        'Nuxt.js',
        'Vue.js',
        'Node.js',
        'TypeScript',
        'Strapi',
        'PostgreSQL'
      ],
      responsibilities: [
        'Built commerce features with Nuxt and Strapi, including discounts, orders and subscription management.',
        'Connected the commerce platform to the delivery company API.',
        'Collaborated with the designer to implement the new website design.'
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
      technologies: ['React JS'],
      responsibilities: [
        'Maintained a React web application and developed its interface.',
        'Tested application functionality to verify changes.',
        'Converted HTML interfaces into JSX components.'
      ]
    },
    {
      id: '3',
      title: 'Web Developer',
      company: 'Ubiquat Technologies',
      type: 'full-time',
      location: 'Igualada, Catalonia, Spain',
      start: '2016-08-01',
      end: '2019-09-15',
      technologies: ['Angular', 'Node JS'],
      responsibilities: [
        'Developed Angular web applications and backend services with Node.js and TypeScript.',
        'Built Ionic 4 applications for Android and iOS and published them on Google Play and the App Store.',
        'Created application prototypes with Fluid UI.'
      ]
    },
    {
      id: '6',
      title: 'Web Developer',
      company: 'Coach4Pro',
      location: 'Espoo, Uusimaa, Finland (remote)',
      type: 'freelance as needed',
      start: '2018-03-01',
      end: '2019-04-30',
      technologies: ['HTML5', 'Javascript', 'CSS'],
      responsibilities: [
        'Updated and maintained pages of the company website.',
        'Built additional pages with HTML, JavaScript and CSS.',
        'Translated website designs into working interfaces.'
      ]
    },
    {
      id: '5',
      title: 'Web Developer',
      company: 'Ubiquat Technologies',
      type: 'internship',
      location: 'Igualada, Catalonia, Spain',
      start: '2016-01-01',
      end: '2016-05-31',
      technologies: ['Javascript', 'JQuery', 'Less', 'Bootstrap'],
      responsibilities: [
        'Built a web application to manage mobile users and data using Bootstrap, Less and jQuery.',
        'Maintained a native Java Android application and published it on Google Play.'
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
        'Designed document workflows with OpenKM.',
        'Developed an ASP.NET Web Forms application with C# and Entity Framework.',
        'Built a C# tool to convert documents to PDF and send them to print with configurable colour and duplex settings.'
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
