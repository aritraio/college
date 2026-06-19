# Short Answer Questions

**1. Differentiate between a standard CSS stylesheet and CSS modules in a React environment. (3 marks)**
**Answer:** A standard CSS stylesheet is globally scoped; any class defined in it can affect any element in the application with that class name, risking styling conflicts. A CSS module scopes styles locally to the component that imports it by automatically generating unique, hashed class names during the build process, eliminating global scope collisions.

**2. Explain the basic process of configuring router routes using React Router. (4 marks)**
**Answer:** To configure routes, you first wrap your application inside a Router component (like `BrowserRouter`). Then, you define your navigation paths using the `Routes` container and individual `Route` components. Each `Route` requires a `path` (the URL string) and an `element` (the component to render when the URL matches that path).

**3. Describe the concept of `styled-components` and provide a basic syntax example. (4 marks)**
**Answer:** `styled-components` is a CSS-in-JS library that allows you to write standard CSS syntax directly within your JavaScript files using ES6 tagged template literals. It creates React components with the defined styles attached.

Example:
```javascript
const Title = styled.h1`
  color: red;
  font-size: 24px;
`;
```

**4. Outline the rules of state in React. Why is direct mutation forbidden? (3 marks)**
**Answer:** The primary rule of state is that it should be treated as immutable. It must never be altered directly (e.g., `state.count = 1`). Direct mutation bypasses React's diffing algorithm and lifecycle; React will not recognize the change, and therefore will not trigger a re-render to update the UI. State must always be updated using its corresponding setter function.

**5. How does a parent component pass props to a child component, and how does the child utilize them? (3 marks)**
**Answer:** A parent passes props to a child by adding custom attributes to the child component's JSX tag (e.g., `<ChildComponent title="Hello" />`). The child component receives these properties as a single object argument (typically named `props`) and can utilize them in its render logic via dot notation (e.g., `{props.title}`).
