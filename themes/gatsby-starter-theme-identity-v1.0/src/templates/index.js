import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import styled from 'styled-components'
import avatar from '../images/avatar.jpg';
import bg from '../images/bg.jpg';
import config from '../../theme.json'

import '../styles/gatsby.css';
import '../styles/main.css';
import { applyCustomStyles, applyBackground } from '../styles';

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.default = {
      backgroundImage: {
        src: bg,
      },
      displayPhoto: {
        src: avatar,
      },
      displayName: 'Jane Doe',
      copyright: 'Hammer Records. Ltd',
      headline: 'senior psychonautics engineer',
      socialIcons: [
        {
          className: 'fa-twitter',
          url: 'https://twitter.com',
          name: 'Twitter',
        },
        {
          className: 'fa-instagram',
          url: 'https://instagram.com',
          name: 'Instagram',
        },
        {
          className: 'fa-facebook',
          url: 'https://facebook.com',
          name: 'Facebook'
        },
      ],
      styles: '',
    }

    // data config
    this.data = this.props.pathContext.data
    this.displayName = this.data.displayName || this.default.displayName
    this.displayPhoto = this.data.displayPhoto || this.default.displayPhoto
    this.headline = this.data.headline || this.default.headline
    this.socialIcons = this.data.socialIcons || this.default.socialIcons
    this.backgroundImage = this.data.backgroundImage || this.default.backgroundImage
    this.copyright = this.data.copyright || this.default.copyright
  }


  render() {
    applyBackground(this.backgroundImage)
    applyCustomStyles(config)

    return (
    	<div id="wrapper">

    		<section id="main">
    			<header>
    				<span className="avatar">
              <img
                src={this.displayPhoto.src} alt="" />
            </span>
    				<h1>{this.displayName}</h1>
    				<p>{this.headline}</p>
    			</header>

    			<footer>
    				<ul className="icons">
              {this.socialIcons.map((obj, idx) => {
                const { name, url, className } = obj.node
                return (
                  <li key={idx}>
                    <a href={url} className={className}>{name}</a>
                  </li>
                )
              })}
    				</ul>
    			</footer>
    		</section>

    		<footer id="footer">
    			<ul className="copyright">

    				<li>&copy; {this.copyright}</li>
            <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
    			</ul>
    		</footer>

    	</div>
    )
  }
}

export default Index

// TODO: figure out a way to do string interpolation on graphql query
