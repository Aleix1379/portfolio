import React from 'react';
import './about.scss';
import userPicture from '../../assets/images/user-picture.jpg';
import ExperienceComponent from "../experience";

const AboutComponent = () => {
    return (
        <div className="about">

            <div className="about__card">

                <img src={userPicture} alt="user" className="about__picture"/>
                <div className="about__name">Aleix Martínez</div>

                <div className="about__position">Mid-Senior Full-Stack Developer
                    <span role="img" aria-label="smartphone">📱</span>
                    <span role="img" aria-label="face">👨</span>
                    <span role="img" aria-label="laptop">‍💻</span>
                </div>

                <div className="about__location">
                    <span>Espoo, Southern Finland, Finland</span>
                    <span role="img" aria-label="Finland flag"> 🇫🇮</span>
                </div>

                <div className="about__description">
                    <p>I have been working as a Front End Developer designing and implementing user interfaces.</p>
                    <p>I have used AngularJS, Angular 7, Ionic 4, Node JS, Typescript, MongoDB, React Native and
                        Sass.</p>
                    <p>I am interested on web development (Front End and Back End) and mobile apps.</p>
                </div>
            </div>

            <div className="about__section-title">
                Experience
            </div>

            <ExperienceComponent
                title="Full-Stack Developer"
                company="Ubiquat Technologies"
                startDate="August 2016"
                endDate="September 2019"
                diff="3 yrs 2 mos"
                location="Barcelona Area, Spain"
                description="Web apps using the framework Angular JS (Front-end).

                            Mobile apps for Android and iOS using Ionic 4 framework.

                            Backend with Node JS and Typescript.

                            Develop the prototype of the application using https://www.fluidui.com/

                            Publish apps on Google Play and App Store."
            />

            <ExperienceComponent
                title="Front-end developer"
                company="Coach4Pro"
                startDate="March 2018"
                endDate="April 2019"
                diff="1 yrs 2 mos"
                location="Espoo, Finland"
                description="Working remotely from my office in Barcelona and some visits to Finland.
                            Maintenance of their commercial web page."
            />

            <ExperienceComponent
                title="Web Developer"
                company="Ubiquat Technologies"
                startDate="January 2016"
                endDate="May 2016"
                diff="5 mos"
                location="Barcelona Area, Spain"
                description="I developed a web app to manage the users and information of a mobile app using bootstrap, less and jquery.
                            Maintenance an Android app  (Native with Java) and publish the application on google play."
            />

            <ExperienceComponent
                title="C# Developer"
                company="Ofimàtica anoia"
                startDate="October 2014"
                endDate="January 2015"
                diff="4 mos"
                location="Barcelona Area, Spain"
                description="Design of Workflows with OpenKM.

                            Schedule an asp.net webform application with C # using entity framework.

                            With C #:

                            Make a program that allows to convert documents (office, images, html) to pdf, to be able to print them.

                            Use the printer driver to send print documents, with parameters (color, b / w, duplex)"
            />

            <div className="about__section-title">
                Education
            </div>

            <ExperienceComponent
                title="Web application development"
                company="IES Milà i Fontanals"
                startDate="September 2015"
                endDate="June 2016"
                location="Barcelona Area, Spain"
            />

            <ExperienceComponent
                title="Cross-platform software development"
                company="IES Milà i Fontanals"
                startDate="September 2012"
                endDate="June 2015"
                location="Barcelona Area, Spain"
            />

        </div>
    );
};

export default AboutComponent;
