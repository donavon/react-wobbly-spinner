# react-wobbly-spinner
[![Build Status](https://travis-ci.org/donavon/react-wobbly-spinner.svg?branch=master)](https://travis-ci.org/donavon/react-wobbly-spinner)

A Wobbly Spinner Component for React.
The most highly over-engineered UI spinner component in the course of human history!

![A Wobbly Spinner screen shot](https://www.dropbox.com/s/jqg2r1oy7t8ixcn/colorful-wobbly-chasing-spinner.png?raw=1)

You want a spinner on your React powered site, but you aren't a CSS or SVG genius.
What is a React developer to do? You simply drop in React `<WobblySpinner/>` component
and your problems are solved.

Everything is controlled by `props`. No need to edit CSS files.
In fact, Wobbly Spinner doesn't use them! We make good use of [JSS](https://github.com/jsstyles/jss)
and intelligently manage the
dynamic attaching/detaching of style sheets to/from the DOM as needed. If you have multiple
Wobbly Spinners mounted, they will share a style sheet if the `props` are the same.
If they have different `props`, Wobbly Spinner will attach a unique style sheet.  

## How do I get it?

```
npm i react-wobbly-spinner --save
```

## See it Live!
You can see it live and try it out on [this Codepen](https://codepen.io/donavon/full/pbzOVR/).
<iframe src="https://codepen.io/donavon/full/pbzOVR/" style="width: 580px; height: 150px;"></iframe>

## Properties
Wobbly Spinner supports these `props`:

| prop  |  description |
| :----- | :------------ |
| diameter | The diameter of the spinner in pixels. (default=62) |
| thickness | The thickness of each line in pixels. (default=1) |
| wobbleOffset | The offset from center that the "wobble" arc spins in pixels. (default=1) |
| spinRate | The rate to complete a full rotation in msecs. (default=1000) |
| outerColor | The outer circle color (default = yellow) |
| innerColor | The outer partial circle color (default = magenta) |
| wobbleColor | The wobble partial circle color (default = cyan) |

## Sample Use

Here is an example of rendering the Wobbly Spinner in a simple Hello World React app.

```javascript
import WobblySpinner from "react-wobbly-spinner";

class App extends React.Component {
  render() {
    return (
      <div>
        <WobblySpinner diameter={30} />
        <span>Loading...</span>
      </div>
    );       
  }
}

var root = document.querySelector(".main");
ReactDOM.render(<App />, root);
```

A little too colorful for your taste? Try this grayscale version.
```xml
<WobblySpinner outerColor="#666" innerColor="#999" wobbleColor="#ccc"/>
```

Want a simple 3/4 circle spinner (i.e. no "wobble")?
```xml
<WobblySpinner thickness={5} outerColor="transparent" innerColor="white" wobbleColor="transparent"/>
```
