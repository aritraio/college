# One-Liner Questions

1. **Question:** Name two core prerequisites required before diving into React JS.
**Answer:** Strong understanding of JavaScript (ES6) and HTML/DOM fundamentals.

2. **Question:** State the primary reason for using React JS.
**Answer:** To build fast, scalable user interfaces using reusable, encapsulated components.

3. **Question:** What is JSX?
**Answer:** JSX is a syntax extension for JavaScript that allows you to write HTML structures directly within JavaScript code.

4. **Question:** Why must we convert standard HTML attributes like `class` to `className` in JSX?
**Answer:** Because `class` is a reserved keyword in JavaScript, and JSX is ultimately compiled into standard JavaScript.

5. **Question:** In a typical React project, what is the purpose of the `src` directory?
**Answer:** It contains the actual source code, including JavaScript components, styling, and application logic.

6. **Question:** In a standard React project, what is the purpose of the `node_modules` directory?
**Answer:** It stores all third-party libraries and dependencies downloaded via npm that the React app requires to run.

7. **Question:** Provide the exact syntax to evaluate a mathematical expression `2 + 2` inside JSX.
**Answer:** `{2 + 2}`

8. **Question:** State the core structural difference between a class component and a function component.
**Answer:** A class component is an ES6 class extending `React.Component` containing a `render()` method, while a function component is a plain JavaScript function.

9. **Question:** Why do we need to import React at the top of component files in older React versions (or under the hood)?
**Answer:** Because JSX elements are transpiled into `React.createElement()` calls, meaning the React library must be in scope.

10. **Question:** What rule dictates how many top-level elements a React component can return?
**Answer:** A component must return exactly one single parent/root element (or a fragment `<>` wrapping multiple elements).
