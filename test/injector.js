import expect from 'expect';
import React from 'react';
import ReactCSSOM from '../src/index';
import ReactTestUtils from 'react-addons-test-utils';

describe('injector', () => {
  describe('functional stateless components', () => {
    it('should inject in functional stateless component', () => {
      /* eslint-disable */
      const Foo = ReactCSSOM.inject((props) => (
        <div>
          <span>{props.foo}</span>
        </div>
      ))('Foo');
      /* eslint-enable */

      const renderer = ReactTestUtils.createRenderer();
      renderer.render(<Foo className="bar" foo="bar" />);
      const result = renderer.getRenderOutput();
      expect(result.type).toEqual('div');
      expect(result.props.className).toEqual('⚛Foo ');
      expect(result.props.children).toMatch(
        <span>bar</span>
      );
    });
  });

  describe('ES6 components', () => {
    it('should not throw with null component', () => {
      //eslint-disable-next-line
      class Foo extends React.Component {
        render() {
          return null;
        }
      }

      const Bar = ReactCSSOM.inject(Foo)();
      const renderer = ReactTestUtils.createRenderer();
      expect(() => renderer.render(<Bar />)).toNotThrow();
    });

    it('should inject component name', () => {
      //eslint-disable-next-line
      class Foo extends React.Component {
        render() {
          return (
            <div {...this.props}>
              <p></p>
            </div>
          );
        }
      }

      const Bar = ReactCSSOM.inject(Foo)();
      const renderer = ReactTestUtils.createRenderer();
      renderer.render(<Bar style="bar" />);
      const result = renderer.getRenderOutput();
      expect(result.props.className).toEqual('⚛Foo ');
    });

    it('should inject displayName', () => {
      //eslint-disable-next-line
      class Foo extends React.Component {
        static displayName = 'Bar';

        render() {
          return (
            <div {...this.props}>
              <p></p>
            </div>
          );
        }
      }

      const Bar = ReactCSSOM.inject(Foo)();
      const renderer = ReactTestUtils.createRenderer();
      renderer.render(<Bar />);
      const result = renderer.getRenderOutput();
      expect(result.props).toMatch({
        className: '⚛Bar ',
      });
    });

    it('should inject the given name', () => {
      //eslint-disable-next-line
      class Foo extends React.Component {
        render() {
          return (
            <div {...this.props}>
              <p></p>
            </div>
          );
        }
      }

      const Bar = ReactCSSOM.inject(Foo)('Baz');
      const renderer = ReactTestUtils.createRenderer();
      renderer.render(<Bar />);
      const result = renderer.getRenderOutput();
      expect(result.props).toMatch({
        className: '⚛Baz ',
      });
    });

    it('should inject in presentational components', () => {
      //eslint-disable-next-line
      class Foo extends React.Component {
        render() {
          return (
            <div {...this.props}>
              <p></p>
            </div>
          );
        }
      }

      const Bar = ReactCSSOM.inject(Foo)();
      const renderer = ReactTestUtils.createRenderer();
      renderer.render(<Bar style="bar" />);
      const result = renderer.getRenderOutput();
      expect(result.props.className).toExist();
    });

    it('should inject in container components', () => {
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

      const Baz = ReactCSSOM.inject(Foo)();
      const renderer = ReactTestUtils.createRenderer();
      renderer.render(<Baz />);
      const result = renderer.getRenderOutput();
      expect(result.type).toEqual('div');
      expect(result.props.className).toExist();
    });

    it('should merge classNames', () => {
      //eslint-disable-next-line
      class Foo extends React.Component {
        render() {
          return (
            <span {...this.props} ></span>
          );
        }
      }

      const Bar = ReactCSSOM.inject(Foo)();
      const renderer = ReactTestUtils.createRenderer();
      renderer.render(<Bar className="bar" />);
      const result = renderer.getRenderOutput();
      expect(result.props).toMatch({
        className: '⚛Foo bar',
      });
    });

    it('should preserve props, state and context', () => {
      //eslint-disable-next-line
      class Bar extends React.Component {
        static contextTypes = {
          baz: React.PropTypes.string,
        }

        state = {
          foo: 'test',
        }

        render() {
          expect(this.state).toEqual({
            foo: 'test',
          });
          expect(this.context).toEqual({
            baz: 'lorem ipsum dolor',
          });
          return (
            <span></span>
          );
        }
      }

      //eslint-disable-next-line
      class Foo extends React.Component {
        static childContextTypes = {
          baz: React.PropTypes.string,
        }

        state = {
          foo: 'test',
        }

        getChildContext() {
          return {
            baz: 'lorem ipsum dolor',
          };
        }

        render() {
          expect(this.state).toEqual({
            foo: 'test',
          });
          expect(this.context).toEqual({});
          expect(this.props).toEqual({
            className: 'bar',
            style: 'foo',
          });
          return (
            <Bar {...this.props} />
          );
        }
      }

      const Baz = ReactCSSOM.inject(Foo)();
      const renderer = ReactTestUtils.createRenderer();
      renderer.render(<Baz style="foo" className="bar" />);
      const result = renderer.getRenderOutput();
      expect(result.type).toEqual('div');
      expect(result.props.className).toEqual('⚛Foo');
    });
  });

  describe('global injector', () => {
    const Component = React.Component;

    afterEach(() => {
      React.Component = Component;
    });

    it('should inject in all components', () => {
      ReactCSSOM.initInjector();
      //eslint-disable-next-line
      class Foo extends React.Component {
        render() {
          return (
            <div {...this.props}>
              <p></p>
            </div>
          );
        }
      }

      const renderer = ReactTestUtils.createRenderer();
      renderer.render(<Foo />);
      const result = renderer.getRenderOutput();
      expect(result.props).toMatch({
        className: '⚛Foo ',
      });
    });
  });
});
