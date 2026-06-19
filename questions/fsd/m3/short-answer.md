# Short Answer Questions

**1. Explain the structural difference between a traditional function and an arrow function.**
**Answer:** A traditional function uses the `function` keyword, requires explicit `return` statements for outputs, and binds its own `this` context. An arrow function drops the `function` keyword, uses the `=>` operator, allows implicit returns for single expressions, and lexically binds `this` (it inherits `this` from the parent scope), making it highly suitable for React callbacks.

**2. How do you create a controlled form input in React?**
**Answer:** To create a controlled input, you define a state variable using `useState`. You then set the input element's `value` attribute equal to that state variable. Finally, you attach an `onChange` event handler to the input that captures the `event.target.value` and updates the state variable.

**3. What specific benefits do free React Developer Tools provide over standard browser dev tools (like Chrome DevTools' Elements tab)?**
**Answer:** While standard dev tools show the raw HTML DOM, React Developer Tools show the React component tree. This allows developers to see how components are nested, instantly view and modify the current `props` and `state` of any specific component without adding `console.log` statements, and profile rendering performance to identify bottlenecks.

**4. Describe the standard flow of form handling using the `onSubmit` event.**
**Answer:** The `onSubmit` event is attached to the `<form>` element. When the user clicks a submit button, the handler function fires. The first step inside the function is usually `e.preventDefault()` to stop the page from reloading. Then, the function processes the data stored in the component's state (e.g., sending an API request).

**5. What is the logical process of deploying a React app to a static server?**
**Answer:** First, the developer runs a build command (like `npm run build`) locally. This compiles JSX, minifies JavaScript and CSS, and creates an optimized `/build` directory. Second, the developer provisions a web server (like Vercel, Netlify, or an Nginx server). Finally, the contents of the `/build` directory are uploaded to the server to be served as static files to users.
