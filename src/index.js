import React from 'react';
import inject from './injector';

const ReactCSSOM = {
  initInjector: () => {
    React.Component = inject(React.Component)();
  },
  inject,
};

export default ReactCSSOM;
