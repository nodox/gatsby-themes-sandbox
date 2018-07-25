import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import avatar from '../images/avatar.jpg';
import theme from '../../theme.json'


import '../styles/gatsby.css';
import '../styles/main.css';


class Index extends React.Component {

  constructor(props) {
    super(props)
  }


  render() {
    const { pathContext } = this.props
    const {
      displayName,
      displayPhoto,
      headline,
      socialIcons, 
    } = pathContext.data

    return (
    	<div id="wrapper">

    		<section id="main">
    			<header>
    				<span className="avatar">
              <img style={{
                width: '120px',
                height: '120px',
              }} src={displayPhoto.sizes.src} alt="" />
            </span>
    				<h1>{displayName}</h1>
    				<p>{headline}</p>
    			</header>

    			<footer>
    				<ul className="icons">
              {socialIcons.map(({ className, href, html }, idx) => {
                return (<li key={idx}><a href={href} className={className}>{html}</a></li>)
              })}
    				</ul>
    			</footer>
    		</section>

    		<footer id="footer">
    			<ul className="copyright">

    				<li>&copy; {displayName}</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
    			</ul>
    		</footer>

    	</div>
    )
  }
}

export default Index
