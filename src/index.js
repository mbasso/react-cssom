import React from 'react';
import inject from './injector';

const ReactCSSOM = {
  initInjector: () => {
    React.Component = inject(React.Component)();
  },
  inject,
  mount: (css) => {
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
    return style;
  },
  unmount: (style) => {
    const head = document.head || document.getElementsByTagName('head')[0];
    head.removeChild(style);
  },
};

export default ReactCSSOM;
