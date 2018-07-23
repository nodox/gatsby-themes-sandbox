import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import avatar from '../images/avatar.jpg';
import theme from '../../theme.json'


import '../styles/gatsby.css';
import '../styles/main.css';


// const themeData = {
//
// }

class Index extends React.Component {


  render() {


    return (
    	<div id="wrapper">

    		<section id="main">
    			<header>
    				<span className="avatar"><img src={avatar} alt="" /></span>
    				<h1>Jane Doe</h1>
    				<p>Senior Psychonautics Engineer</p>
    			</header>

    			<footer>
    				<ul className="icons">
    					<li><a href="#" className="fa-twitter">Twitter</a></li>
    					<li><a href="#" className="fa-instagram">Instagram</a></li>
    					<li><a href="#" className="fa-facebook">Facebook</a></li>
    				</ul>
    			</footer>
    		</section>

    		<footer id="footer">
    			<ul className="copyright">
    				<li>&copy; Jane Doe</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
    			</ul>
    		</footer>

    	</div>
    )
  }
}

export default Index
