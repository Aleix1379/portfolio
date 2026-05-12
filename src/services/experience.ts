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
      technologies: ['Nuxt.js', 'Vue.js', 'Node JS', 'Strapi'],
      responsibilities: [
        'Developed an eCommerce platform with Nuxt.js on the front end and Strapi on the back end',
        'Integrated the eCommerce platform with a delivery company API',
        'Built features for discount coupons, subscriptions, and order management',
        'Worked with the designer to implement a refreshed web design',
        'Built and maintained subscription management flows'
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
        'Maintained a React JS web application',
        'Tested web application functionality',
        'Converted HTML views into JSX components'
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
      technologies: ['Angular', 'Node JS'],
      responsibilities: [
        'Built web applications with Angular JS',
        'Built Android and iOS mobile apps with Ionic 4',
        'Developed Node.js and TypeScript back-end services',
        'Created application prototypes with Fluid UI',
        'Published apps on Google Play and the App Store'
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
      technologies: ['HTML5', 'Javascript', 'CSS'],
      responsibilities: [
        'Updated pages on the company website',
        'Created additional web pages',
        'Integrated designs into the website'
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
        'Developed a web app to manage users and information for a mobile app using Bootstrap, Less, and jQuery',
        'Maintained a native Android app in Java and published it on Google Play'
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
        'Designed workflows with OpenKM',
        'Developed an ASP.NET Web Forms application in C# with Entity Framework',
        'Built a C# tool to convert documents to PDF for printing',
        'Sent print jobs through the printer driver with options for color, black and white, and duplex printing'
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
