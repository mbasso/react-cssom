import expect from 'expect';
import React from 'react';
import ReactCSSOM from '../src/index';
import ReactTestUtils from 'react-addons-test-utils';

describe('Css class injector', () => {
  it('should not throw with null component', () => {
    //eslint-disable-next-line
    class Foo extends React.Component {
      render() {
        return null;
      }
    }

    const renderer = ReactTestUtils.createRenderer();
    expect(() => renderer.render(<Foo />)).toNotThrow();
  });

  it('should inject class in presentation components', () => {
    //eslint-disable-next-line
    class Foo extends React.Component {
      static propTypes = {
        style: React.PropTypes.string,
        className: React.PropTypes.string,
      }

      state = {
        foo: 'bar',
      }

      render() {
        return (
          <div {...this.props}>
            <p></p>
          </div>
        );
      }
    }

    let renderer = ReactTestUtils.createRenderer();
    renderer.render(<Foo style="bar" />);
    let result = renderer.getRenderOutput();
    expect(result.props).toMatch({
      style: 'bar',
      className: '⚛Foo ',
    });

    renderer = ReactTestUtils.createRenderer();
    renderer.render(<Foo className="bar" />);
    result = renderer.getRenderOutput();
    expect(result.props).toMatch({
      className: '⚛Foo bar',
    });

    const rendered = ReactTestUtils.renderIntoDocument(<Foo />);
    const foo = ReactTestUtils.findRenderedComponentWithType(rendered, Foo);
    expect(foo.state).toEqual({
      foo: 'bar',
    });
  });

  it('should inject class in container components', () => {
    //eslint-disable-next-line
    class Bar extends React.Component {
      render() {
        return (
          <span></span>
        );
      }
    }

    //eslint-disable-next-line
    class Foo extends React.Component {
      render() {
        return (
          <Bar />
        );
      }
    }

    const renderer = ReactTestUtils.createRenderer();
    renderer.render(<Foo />);
    const result = renderer.getRenderOutput();
    expect(result.type).toEqual('div');
    expect(result.props).toMatch({
      className: '⚛Foo',
    });
  });
});
