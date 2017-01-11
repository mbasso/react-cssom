import expect from 'expect';
import { jsdom } from 'jsdom';
import ReactCSSOM from '../src/index';

describe('DOMUtils', () => {
  afterEach(() => {
    global.document = jsdom('<!doctype html><html><head></head><body></body></html>');
  });

  it('should mount', () => {
    expect(document.getElementsByTagName('style').length).toEqual(0);
    ReactCSSOM.mount('.body {}');
    const styles = document.getElementsByTagName('style');
    expect(styles.length).toEqual(1);
    expect(styles[0].type).toEqual('text/css');
    expect(styles[0].childNodes[0].data).toEqual('.body {}');
  });

  it('should unmount', () => {
    expect(document.getElementsByTagName('style').length).toEqual(0);
    const style = ReactCSSOM.mount('');
    expect(document.getElementsByTagName('style').length).toEqual(1);
    ReactCSSOM.unmount(style);
    expect(document.getElementsByTagName('style').length).toEqual(0);
  });
});
