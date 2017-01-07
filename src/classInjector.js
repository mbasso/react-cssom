import React from 'react';

export default function initClassInjector() {
  const reactComponentPrototype = React.Component.prototype;
  const reactComponentConstructor = React.Component;

  React.Component = function ReactComponent(...params) {
    reactComponentConstructor.apply(this, [...params]);
    const originalRender = this.render;
    this.render = () => {
      const component = originalRender.apply(this);
      let result = component;
      if (component) {
        const classToInject = `⚛${this.constructor.name}`;
        if (typeof component.type === 'string') {
          result = React.cloneElement(
            component,
            {
              className: `${classToInject} ${component.props.className || ''}`,
            }
          );
        } else if (typeof component.type === 'function') {
          result = (
            <div className={`${classToInject}`}>
              {component}
            </div>
					);
        }
      }
      return result;
    };
  };

  React.Component.prototype = reactComponentPrototype;
}
