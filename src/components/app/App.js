import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch, Redirect
} from "react-router-dom";

import ProjectsComponent from "../projects";
import AboutComponent from "../about";
import ContactComponent from "../contact";

const App = () => {
    return (
        <Router>
            <div>
                <ul className="tabs">
                    <Tab
                        activeOnlyWhenExact={true}
                        to="/about"
                        label="About Me"
                    />
                    <Tab
                        activeOnlyWhenExact={true}
                        to="/projects"
                        label="Projects"
                    />
                    <Tab
                        activeOnlyWhenExact={true}
                        to="/contact"
                        label="Contact"
                    />
                </ul>

                <Switch>
                    <Route path="/about">
                        <AboutComponent/>
                    </Route>
                    <Route path="/projects">
                        <ProjectsComponent/>
                    </Route>
                    <Route path="/contact">
                        <ContactComponent/>
                    </Route>
                    <Redirect from='/' to='/about'/>
                </Switch>
            </div>
        </Router>
    );
};

const Tab = ({ label, to, activeOnlyWhenExact }) => {
    let match = useRouteMatch({
        path: to,
        exact: activeOnlyWhenExact
    });

    return (
        <div className={`tab ${match ? "tab--active" : ""}`}>
            <Link to={to}>
                <span className="tab-label">{label}</span>
            </Link>
        </div>
    );
};

export default App;

