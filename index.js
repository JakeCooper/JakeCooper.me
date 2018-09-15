import React from 'react';
import ReactDOM from 'react-dom';

import Typed from 'typed.js';

import face from './me.png';
import logo from './logo.png';

import resume from './JakeCooperResume.pdf';
import me from './me.json';

import styles from './styles.mod.scss';

import { Link, Route, BrowserRouter as Router } from 'react-router-dom'

const TypedElement = (accolade) => (
    `<a href="http://www.google.com"> ${accolade} </a>`
)

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
                <a ref={(el) => this.el = el}/>
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
                I'm currently a software engineer @{me['work'][0].short} in NYC 🍎
            </h3>
            <Typer />
            <Button onClick={() => window.location = resume}>
                Check out my resume
            </Button>
        </div>
        <div className={styles.rightContent}>
            <img className={styles.me} src={face} />
        </div>
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
        <div className={styles.button} onClick={props.onClick}>
            {props.children}
        </div>
    )
}

const Base = () => (
    <div>
        <div className={styles.filter}>
            <div className={styles.upper}>
                <Router>
                    <div>
                        <div className={styles.header}>
                            <div className={styles.logoContainer}>
                                <img className={styles.logo} src={logo}/>
                                <Navigator />
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
        </div>
        
        <div className={styles.lower}>
            <div className={styles.socialbar}>
                <a href="https://twitter.com/RealJakeCooper" target="_blank" className={styles.twitter}></a>
                <a href="https://facebook.com/JakeElijahCooper" target="_blank" className={styles.facebook}></a>
                <a href="mailto:Jake@JakeCooper.me" className={styles.email}></a>
                <a href="https://linkedin.com/thejakecooper" target="_blank" className={styles.linkedin}></a>
                <a href="https://github.com/thejakecooper" target="_blank" className={styles.github}></a>
            </div>
            <div className={styles.footer}>
                Made with 🍁 in Canada
            </div>
        </div>
    </div>
)

const rootDiv = document.getElementById('root');

ReactDOM.render(<Base/>, rootDiv);