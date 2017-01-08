# react-cssom

> Style React Components just like real DOM nodes

- - -

**Attention - This project is not completed yet.**

- - -

![Preview](preview.gif)

## Motivation

Styling components is a critical point when we decide to develop in React.
There are a lot of ways in which we can do this but all of these have pro and cons.
In some situations this means having strong connection with the source code, that is not so good if it means that we have to allows our designer to modify our `.js`.
On other situations we are supposed to use only inline styles, that is not so good for a set of reasons.
With ReactCSSOM we have tried to develop a system that allows us to separate `js` and `css` in a way that allows our designers to work independently,
using normal CSS with the support of [React Developer Tools](#https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi).
Using ReactCSSOM means:

- Each Component has its own `style.css`
- Scoped styles based on component's structure
- No extra inline styles, use them only when and where you really need, this means better performance
- No limitations to CSS power
- Easy to use with CSS Preprocessors (no more stuff needed)
- Highly expressive
- Lightweight, only 50 lines of js

## Installation

You can install react-cssom using [npm](https://www.npmjs.com/package/react-cssom):

```bash
npm install --save react-cssom
```

If you aren't using npm in your project, you can include ReactCSSOM using UMD build in the dist folder with `<script>` tag.

## Usage

### Basic

Once you have installed react-cssom, supposing a CommonJS environment, you can import it in your index file, before `ReactDOM.render`.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSOM from 'react-cssom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

Now you can use react-cssom as you can see in the gif above, just like in normal css, you can select React Components.
You can load styles in the way that you prefer but is important to keep in mind that selectors must be in this form:

```css
.⚛ComponentName
```

For example, this is a valid one `.⚛App`.
So, pay attention that components' names and css selectors always match.
This is particular important if you have css-modules that modifies the original names, or code obfuscation.
The first ones for example need a syntax like this:

```css
:global .⚛ComponentName {
	/* styles here */
}
```


### Adapting based on props

If you want to set styles based on props, you can do it in 2 ways:

1. Set inline styles, as we can see in this example:
```js
class Button extends React.Component {
	render() {
		return (
			<button
				style={{
					backgroundColor: this.props.primary ? 'blue' : 'black',
				}}
			>
				Click me
			</button>
		)
	}
}
```

2. Set a specific class, maybe using css-modules, as we can see here:
```js
import styles from './Button.css';

export default class Button extends React.Component {
	render() {
		return (
			<button
				className={this.props.primary ? styles.primary : styles.default}
			>
				Click me
			</button>
		)
	}
}
```

and here is the corresponding css, note the global selector:

```css
:global .⚛Button {
	height: 50px;
	width: 100px;
}

.primary {
	background-color: blue;
}

.primary:global.⚛Button {
	color: yellow;
}

.default {
	background-color: grey;
}

.default:global.⚛Button {
	color: black;
}
```

### Additional API

ReactCSSOM also exposes 2 simple API to mount and unmount styles, here they are:

```js
import ReactCSSOM from 'react-cssom';

// add styles to the DOM
const style = ReactCSSOM.mount(`
	.⚛App {
		background-color: #000000;
	}

	.⚛App > .⚛Page {
		background-color: #C0C0C0;
	}
`);


// remove styles
ReactCSSOM.unmount(style);
```

## Change Log

This project adheres to [Semantic Versioning](http://semver.org/).  
Every release, along with the migration instructions, is documented on the Github [Releases](https://github.com/mbasso/react-cssom/releases) page.

## Authors
**Matteo Basso**
- [github/mbasso](https://github.com/mbasso)
- [@Teo_Basso](https://twitter.com/Teo_Basso)

## Copyright and License
Copyright (c) 2016, Matteo Basso.

react-cssom source code is licensed under the [MIT License](https://github.com/mbasso/react-cssom/blob/master/LICENSE.md).
