import React from 'react';

const getReactCSSOMClass = (componentName) => `⚛${componentName}`;

function injectInElement(component, componentName) {
  let result = component;
  if (component) {
    const classToInject = getReactCSSOMClass(componentName);
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
}

function injectInComponent(Component, componentName) {
  let newComponent = Component;
  if (!Component.hasReactCSSOM) {
    const componentPrototype = Component.prototype;
    const componentConstructor = Component;

    //eslint-disable-next-line
    newComponent = function ReactComponent(...params) {
      componentConstructor.apply(this, [...params]);
      const originalRender = this.render;
      this.render = () => (
        injectInElement(
          originalRender.apply(this),
          componentName || this.constructor.displayName || this.constructor.name
        )
      );
    };

    newComponent.prototype = componentPrototype;
    Object.keys(Component).forEach((x) => {
      newComponent[x] = Component[x];
    });

    newComponent.hasReactCSSOM = true;
  }

  return newComponent;
}

function injectInFunctionalComponent(component, componentName) {
  return (props) => injectInElement(
    component(props),
    componentName
  );
}

export default function inject(component) {
  return (componentName) => {
    let result = null;
    if (
      typeof component === 'function' &&
      component.prototype &&
      component.prototype.isReactComponent
    ) {
      result = injectInComponent(component, componentName);
    } else if (typeof component === 'function') {
      result = injectInFunctionalComponent(component, componentName);
    } else if (component !== null && typeof component === 'object') {
      result = injectInElement(component, componentName);
    }
    return result;
  };
}
