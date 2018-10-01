import React from 'react';
import ReactDOM from 'react-dom';

import Darklaunch from 'darklaunch-js';

import classNames from 'classnames';

import Typed from 'typed.js';

import face from './assets/me.png';
import logo from './assets/logo.png';

import resume from './assets/JakeCooperResume.pdf';
import me from './me.json';

import styles from './styles.mod.scss';

import { Link, Route, BrowserRouter as Router } from 'react-router-dom'

const TypedElement = (accolade) => {
    return accolade;
    // `<a href="${accolade.link}" target="_blank"> ${accolade} </a>` 
}


const shuffle = (array) => {
    // Fisher Yates Shuffle
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const accolades = () => {
    const workplaces = me['work'].slice(1).map((job) => `worked at ${job.short}`);
    const projects = me['projects'].map((project) => uncapitalize(project.short));
    let allAccolades = [...workplaces, ...projects];
    shuffle(allAccolades);
    return allAccolades.map((accolade) => `Once, I ${TypedElement(accolade)} ^2000`);
}

class Typer extends React.Component {
    componentDidMount() {
        new Typed(this.el, {
            strings: accolades(),
            typeSpeed: 50,
            backSpeed: 50,
            loop: true
        });
    }

    render() {
        return (
            <h3>
                <a className={styles.typer} ref={(el) => this.el = el}/>
            </h3>
        )
    }
}


const home = () => (
    <div className={styles.content}>
        <div className={styles.leftContent}>
            <h1 className={styles.intro}>
                Hey, I'm Jake
            </h1>
            <h3 className={styles.about}>
                I'm a software engineer @{me['work'][0].short} in NYC 🍎
            </h3>
            <Typer />
            <Button onClick={() => window.location = resume} className={styles.resumeBtn}>
                Check out my resume
            </Button>
        </div>
        {!mobile ? 
            <div className={styles.rightContent}>
                <img className={styles.me} src={face} />
            </div> : null}
        
    </div>
)

const about = () => (
    <h1>About</h1>
)

const work = () => (
    <h1>work</h1>
)

const projects = () => (
    <h1>projects</h1>
)

const capitalize = (word) => {
    return word.charAt().toUpperCase() + word.slice(1)
}

const uncapitalize = (word) => {
    return word.charAt().toLowerCase() + word.slice(1)
}

const Navigator = () => (
    <div className={styles.navigator}>
        <Link to="/">Home</Link>
        {Object.keys(me).map((category, i) => (
            <Link key={i} to={`/${category}`}>{capitalize(category)}</Link>
        ))}
    </div>
)

const Button = (props) => {
    return (
        <div className={classNames(styles.button, props.className)} onClick={props.onClick}>
            {props.children}
        </div>
    )
}

const enableNav = false; // Darklaunch.isEnabled("navEnabled");

const mobile = window.outerWidth < 760; //760

const logoSrc = mobile ? null : logo;

const Base = () => (
    <div>
        <div className={styles.upper}>
            <Router basename={process.env.PUBLIC_URL}>
                <div className={styles.routerContainer}>
                    <div className={styles.header}>
                        <div className={styles.logoContainer}>
                            <img className={styles.logo} src={logoSrc}/>
                            {enableNav && <Navigator />}
                        </div>
                    </div>
                    <div className={styles.main}>
                        <div className={styles.flexContent}>
                            <Route exact path="/" component={home}/>
                            <Route path="/about" component={about} />
                            <Route path="/work" component={work} />
                            <Route path="/projects" component={projects} />
                        </div>
                    </div>
                </div>          
            </Router>
        </div>        
        <div className={styles.lower}>
            <div className={styles.socialbar}>
                <a href="https://twitter.com/RealJakeCooper" target="_blank" className={styles.twitter}></a>
                <a href="https://facebook.com/JakeElijahCooper" target="_blank" className={styles.facebook}></a>
                <a href="mailto:Jake@JakeCooper.me" className={styles.email}></a>
                <a href="https://www.linkedin.com/in/thejakecooper/" target="_blank" className={styles.linkedin}></a>
                <a href="https://github.com/jakecooper" target="_blank" className={styles.github}></a>
            </div>
            <div className={styles.footer}>
                Made with 🍁 in Canada
            </div>
        </div>
    </div>
)

const rootDiv = document.getElementById('root');

ReactDOM.render(<Base/>, rootDiv);
