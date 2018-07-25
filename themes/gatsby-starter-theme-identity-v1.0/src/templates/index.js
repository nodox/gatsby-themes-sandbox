import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import styled, { css } from 'styled-components'
import avatar from '../images/avatar.jpg';
import theme from '../../theme.json'
import { injectGlobal } from 'styled-components';

import '../styles/gatsby.css';
import '../styles/main.css';

function getLinearGradient(args = null) {
  let base = `60deg, rgba(255, 165, 150, 0.5) 5%, rgba(0, 228, 255, 0.35)`

  if (args !== null) {
    base = args
  }

  return {
    moz: `-moz-linear-gradient(${base})`,
    webkit: `-webkit-linear-gradient(${base})`,
    ms: `-ms-linear-gradient(${base})`,
    default: `linear-gradient(${base})`,
  }

}

function applyBackground(image) {
  // TODO: Since body tag is not exposed we need to global style body. Find a better way by refectoring css to be JS
  // TODO: Add option to change overlay image
  // TODO: Add option to adjust / add the linear gradiant

  injectGlobal`
    body {
      height: 100%;
  		background-color: #ffffff;
  		background-image: url(${image.src});
  		background-image: url(${image.src});
  		background-image: url(${image.src});
  		background-image: url(${image.src});
  		background-repeat: no-repeat;
  		background-size: cover;
  		background-position: top left, center center, bottom center;
  		background-attachment: fixed;
    }
  `;
}

class Index extends React.Component {

  constructor(props) {
    super(props)

    this.data = this.props.pathContext.data
    this.displayName = this.data.displayName
    this.displayPhoto = this.data.displayPhoto
    this.headline = this.data.headline
    this.socialIcons = this.data.socialIcons
    this.backgroundImage = this.data.backgroundImage
  }


  render() {

    // TODO: Move to better location. Constructor?
    applyBackground(this.backgroundImage)

    return (
    	<div id="wrapper">

    		<section id="main">
    			<header>
    				<span className="avatar">
              <img
                style={{ width: '120px', height: '120px' }}
                src={this.displayPhoto.sizes.src} alt="" />
            </span>
    				<h1>{this.displayName}</h1>
    				<p>{this.headline}</p>
    			</header>

    			<footer>
    				<ul className="icons">
              {this.socialIcons.map(({ className, href, html }, idx) => {
                return (
                  <li key={idx}>
                    <a href={href} className={className}>{html}</a>
                  </li>
                )
              })}
    				</ul>
    			</footer>
    		</section>

    		<footer id="footer">
    			<ul className="copyright">

    				<li>&copy; {this.displayName}</li>
            <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
    			</ul>
    		</footer>

    	</div>
    )
  }
}

export default Index
