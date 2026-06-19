# Short Answer Questions

**1. Why should a development team choose to use React JS instead of traditional Vanilla JS and HTML? (3 marks)**
**Answer:** React enables a component-based architecture. Instead of managing a massive, tangled DOM manually with vanilla JS, React allows teams to build encapsulated, reusable UI pieces (components). This makes code highly modular, easier to debug, faster to develop, and far more scalable for complex, dynamic applications.

**2. Explain the fundamental process of converting standard HTML to JSX. Highlight at least two specific changes. (4 marks)**
**Answer:** Converting HTML to JSX requires adhering to JavaScript's strict rules, as JSX compiles to JS. Two primary changes must be made:
1. Standard HTML attributes that conflict with JS keywords must be renamed. Most notably, `class` becomes `className`, and `for` becomes `htmlFor`.
2. All tags must be strictly closed. Even self-closing HTML tags like `<input>` or `<br>` must be closed with a trailing slash in JSX: `<input />` or `<br />`.

**3. Briefly describe the default directory structure of a generated React app, specifically focusing on `node_modules`, `public`, and `src`. (3 marks)**
**Answer:**
* **`node_modules/`**: Contains all installed npm dependencies and libraries.
* **`public/`**: Contains static files, most importantly `index.html`, which serves as the mounting point for the app.
* **`src/`**: The workspace. This is where developers write their actual React components (`.js`/`.jsx`), styles, and tests.

**4. How do you inject JavaScript variables and logic into JSX code? Provide a code snippet. (3 marks)**
**Answer:** You evaluate JavaScript inside JSX by wrapping the variables or expressions in curly braces `{}`.

Code snippet:
```jsx
function Greeting() {
  const name = "Aritra";
  return <h1>Hello, {name}! Your score is {10 + 5}.</h1>;
}
```

**5. Distinguish between a Class Component and a Function Component at a structural level. (4 marks)**
**Answer:** Structurally, a Function Component is simply a JavaScript function that returns JSX. It is lightweight and straightforward. A Class Component requires you to write an ES6 class that extends the `React.Component` library. Furthermore, a Class component cannot return JSX directly; it must implement a `render()` method, and the JSX is returned from within that `render()` block.
