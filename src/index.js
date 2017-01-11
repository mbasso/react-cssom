import React from 'react';
import inject from './injector';

export default {
  initInjector: () => {
    React.Component = inject(React.Component)();
  },
  inject,
};
