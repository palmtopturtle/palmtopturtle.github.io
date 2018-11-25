import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import NavTop from "./navtop/NavTop";
import Home from "./pages/home/Home";
import Resume from "./pages/resume/Resume";
import Projects from "./pages/projects/Projects";
import Contact from "./pages/contact/Contact";
import StarfieldAnimation from "./stars/StarfieldAnimation";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import "./app.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <Route
          render={({ location }) => (
            <div className="app-container">
              <StarfieldAnimation />
              <NavTop />
              <TransitionGroup>
                <CSSTransition
                  key={location.pathname}
                  timeout={{enter: 600, exit: 300}}
                  classNames="fade"
                >
                  <Switch location={location}>
                    <Route path="/" component={Home} exact />
                    <Route path="/resume" component={Resume} />
                    <Route path="/projects" component={Projects} />
                    <Route path="/contact" component={Contact} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </div>
          )}
        />
      </Router>
    );
  }
}

export default App;
