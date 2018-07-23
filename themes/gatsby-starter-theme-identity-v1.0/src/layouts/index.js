import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import classNames from 'classnames';

import '../styles/gatsby.css';

export default class Template extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="___gatsby_layout">
        {this.props.children()}
      </div>
    );
  }
}
