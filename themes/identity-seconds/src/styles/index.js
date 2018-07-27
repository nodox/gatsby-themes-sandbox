import { injectGlobal } from 'styled-components';

exports.applyCustomStyles = (config) => {
  let styles = ''
  if (!!config.styles) {
    styles = config.styles
  }

  injectGlobal`
    ${config.styles}
  `;
}

exports.applyBackground = (image) => {
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
