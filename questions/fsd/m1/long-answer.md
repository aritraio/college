# Long Answer Questions

**1. Outline the complete lifecycle of initiating a React project. Detail the software prerequisites, the command-line installation steps, and explain the entry point of the React application once created. (10 marks)**
**Answer:**
* **Prerequisites:** Before starting, the environment must have **Node.js** installed, which provides the JavaScript runtime outside the browser. Installing Node.js automatically installs **npm** (Node Package Manager), which is strictly required to download React packages.
* **Installation/Creation:** To create a React app, developers typically use a scaffolding tool. In the terminal, the command `npx create-react-app my-app` (or using modern bundlers like Vite: `npm create vite@latest my-app -- --template react`) is executed. This command automatically downloads dependencies, sets up the build pipeline (Webpack/Babel under the hood), and generates the default directory structure.
* **The Entry Point:** The execution flow starts in `public/index.html`, which contains an empty `div` with an id (usually `id="root"`). The actual React logic starts in `src/index.js` (or `main.jsx`). In this file, the `ReactDOM.createRoot()` method targets the `root` div, and the `render()` method injects the top-level React component (usually `<App />`) into the actual browser DOM.


**2. What is JSX? Explain its role in a React application. Provide a comprehensive example demonstrating the conversion of raw HTML into JSX, including the use of JavaScript variables and JSX comments. (12 marks)**
**Answer:**
* **Definition & Role:** JSX (JavaScript XML) is a syntax extension for JavaScript. It allows developers to write declarative HTML-like structures seamlessly inside JavaScript files. Its role is to describe what the UI should look like while maintaining the full programmatic power of JavaScript. Behind the scenes, Babel compiles JSX down into standard `React.createElement()` JavaScript objects.
* **Conversion Rules:**
  1. Wrap the entire return block in a single parent element or a Fragment `<> </>`.
  2. Change `class` to `className`.
  3. Close all unclosed tags (e.g., `<img ... />`).
  4. Inline styles must be written as JavaScript objects with camelCased properties, not strings.

* **Example Code:**
```jsx
// Standard JS Variable
const userRole = "Administrator";

// Functional Component utilizing JSX
function UserProfile() {
  return (
    <div className="profile-container">
      {/* This is a valid JSX comment: Displaying the header */}
      <h1 className="header">User Dashboard</h1>
      <br /> 
      <p>Role: {userRole}</p>
      <input type="text" placeholder="Update role..." />
    </div>
  );
}
```


**3. Compare and contrast Function Components and Class Components in React. Write code snippets demonstrating how to build a basic "Hello World" component using both methods. (10 marks)**
**Answer:**
* **Comparison:**
  * **Syntax:** Function components are just standard JavaScript functions (or arrow functions). Class components are ES6 classes that must extend `React.Component`.
  * **Return Mechanism:** Function components return JSX directly. Class components must use a `render()` method that returns the JSX.
  * **Modern Usage (Contextual):** Function components are the modern standard in React development (especially with Hooks), whereas class components are the legacy standard.

* **Function Component Example:**
```jsx
// Simple, clean, straightforward function
function HelloWorldFunc() {
  return <div>Hello World from a Function!</div>;
}
export default HelloWorldFunc;
```

* **Class Component Example:**
```jsx
import React, { Component } from 'react';

// Requires class declaration, extending, and a render method
class HelloWorldClass extends Component {
  render() {
    return <div>Hello World from a Class!</div>;
  }
}
export default HelloWorldClass;
```
