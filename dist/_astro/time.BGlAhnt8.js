const m=(r=-1)=>{let e=[{id:"1",title:"Web developer developer",company:"TALKUAL",type:"full-time",location:"Bellpuig, Catalonia, Spain",start:"2021-12-01",end:null,technologies:["Nuxt.js","Vue.js","Node JS","Strapi"],responsibilities:["Develop an eCommerce using Nuxt JS for the front-end and Strapi for the back-end","Integrate ecommerce with delivery company API","New functionalities for the website (coupons for discount, manage subscriptions and orders)","Working with the designer to implement the new web design"]},{id:"2",title:"Front-end developer",company:"Movetia",type:"full-time",location:"Barcelona, Catalonia, Spain",start:"2020-05-01",end:"2021-12-22",technologies:["React JS"],responsibilities:["Maintaining a web application using React JS","Testing the functionality of the web application","Convert HTML to JSX"]},{id:"3",title:"Web developer developer",company:"Ubiquat Technologies",type:"full-time",location:"Igualada, Catalonia, Spain",start:"2016-08-01",end:"2019-09-15",technologies:["Angular","Node JS"],responsibilities:["Web apps using the framework Angular JS","Mobile apps for Android and iOS using Ionic 4 framework","Backend with Node JS and Typescript","Develop the prototype of the application using https://www.fluidui.com/","Publish apps on Google Play and App Store"]},{id:"6",title:"Web developer",company:"Coach4Pro",location:"Espoo, Uusimaa, Finland (remote)",type:"freelance as needed",start:"2018-03-01",end:"2019-04-30",technologies:["HTML5","Javascript","CSS"],responsibilities:["Updating pages of the company website","Creating additional web pages","Design integration for website"]},{id:"5",title:"Web developer",company:"Ubiquat Technologies",type:"internship",location:"Igualada, Catalonia, Spain",start:"2016-01-01",end:"2016-05-31",technologies:["Javascript","JQuery","Less","Bootstrap"],responsibilities:["I developed a web app to manage the users and information of a mobile app using bootstrap, less and jquery","Maintenance an Android app (Native with Java) and publish the application on google play"]},{id:"4",title:"C# Developer",company:"Ofimàtica anoia",type:"internship",location:"Igualada, Catalonia, Spain",start:"2014-10-01",end:"2015-01-31",technologies:["C#","Entity framework"],responsibilities:["Design of Workflows with OpenKM.","Schedule an asp.net webform application with C # using entity framework","With C #: Make a program that allows to convert documents (office, images, html) to pdf, to be able to print them","Use the printer driver to send print documents, with parameters (color, b / w, duplex)"]}];return e=e.sort((i,t)=>new Date(t.start).getTime()-new Date(i.start).getTime()),r===-1?e:e.slice(0,r)},d=r=>{let e,i,t,n,a;a=Math.floor(r/1e3),n=Math.floor(a/60),a=a%60,t=Math.floor(n/60),n=n%60,i=Math.floor(t/24),t=t%24,e=Math.floor(i/30),i=i%30;const o=Math.floor(e/12);return e=e%12,{year:o,month:e,day:i,hour:t,minute:n,second:a}},h=(r,e)=>{const i=new Date(r);let t=new Date;e&&(t=new Date(e));let n=t.getTime()-i.getTime();t<i&&(n=i.getTime()-t.getTime());const a=d(n);let o="",l="";return a.year>0&&(o=`${a.year} year${a.year>1?"s":""}`),a.month>0&&(l=`${a.year>0?" and ":""}${a.month} months`),`${o} ${l}`},f=(r,e)=>{e||(e={day:!0,month:!0,year:!0,short:!1});const i=["january","february","march","april","may","june","july","august","september","october","november","december"],t=new Date(r),n=i[t.getMonth()];let a=n.length;e.short&&(a=3);let o="";return e.day&&(o+=` ${t.getDate()}`),e.month&&(o+=` ${n.substring(0,a)}`),e.year&&(o+=` ${t.getFullYear()}`),o},u=r=>{let e=0,i=0,t=null,n=m();r&&(t=r.filter);const a=[];return t&&(t.fullTime&&a.push("full-time"),t.freelance&&a.push("freelance"),t.internship&&a.push("internship"),n=n.filter(o=>a.includes(o.type))),n.forEach(o=>{const l=new Date(o.start),s=new Date(o.end??new Date);let p=s.getTime()-l.getTime();s<l&&(p=l.getTime()-s.getTime());const c=d(p);e+=c.year,i+=c.month}),e=Math.floor(e+i/12),e};export{h as a,m as b,f,u as g};
