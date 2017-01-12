// @flow

import React from 'react';
import inject from './injector';

React.Component = inject(React.Component)();
React.PureComponent = inject(React.PureComponent)();

export default {
  inject,
};
