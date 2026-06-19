# Long Answer Questions

**1. Topic: Comprehensive React Styling Architecture (12 marks)**
Discuss the four styling methodologies covered in the syllabus: Inline styling, CSS stylesheets, CSS modules, and styled-components.
* Define each approach.
* Analyze the advantages and disadvantages of each.
* Provide a scenario dictating when you would choose one specific method over the others.

**Answer:**
* **Inline styling:** Defined via JavaScript objects containing camelCased keys, passed directly to JSX elements.
  * *Advantages:* Simple, fast for dynamic state-based adjustments, scoped automatically.
  * *Disadvantages:* Lacks full CSS features like media queries and pseudo-classes; clutters JSX.
* **CSS stylesheets:** Traditional CSS stylesheets imported at the top of components.
  * *Advantages:* Familiar, easy to port existing designs, separation of design and logic.
  * *Disadvantages:* Globally scoped by default, risking cascading style collision issues in larger apps.
* **CSS Modules:** Locally scoped CSS files.
  * *Advantages:* Resolves global naming conflicts by auto-generating hashed class names, keeps design isolated.
  * *Disadvantages:* Requires specific build bundler setup (e.g., Webpack loader configuration).
* **styled-components:** A CSS-in-JS library using template literals.
  * *Advantages:* Great for dynamic styling based on props, keeps styles component-centric.
  * *Disadvantages:* Adds runtime overhead, introduces a learning curve.
* *Scenario:* Choose styled-components when building a highly dynamic, theme-supported UI component library; choose CSS modules for standard static styling across a modular corporate app.


**2. Topic: State, Props, and Component Reusability (15 marks)**
Explain the distinct concepts of props and state. Detail how they interact to facilitate the creation of reusable components. Design an algorithm or structural example demonstrating a parent component holding data in state and passing it down to multiple instances of a reusable child component. Ensure you address props validation.

**Answer:**
* **Concepts:** State represents the local, mutable data of a component. Props are external, read-only parameters passed into a component.
* **Interaction:** A parent component holds state data and triggers updates. It propagates this data to child components by passing it down as props. When parent state changes, child props update and re-render.
* **Reusability:** By separating data handling (state in parent) from display logic (props in child), the child component remains pure and can be reused to render different datasets.
* **Structural Example:**
  1. Parent component `UserList` stores data in state: `const [users, setUsers] = useState([{id: 1, name: 'Aritra'}, {id: 2, name: 'Adil'}])`.
  2. Parent iterates over the `users` array and maps them to child components.
  3. Parent passes each user's data as props: `<UserCard name={user.name} />`.
  4. Child component `UserCard` declares and validates props using `PropTypes`:
     ```javascript
     UserCard.propTypes = {
       name: PropTypes.string.isRequired
     };
     ```
  5. Child prints `props.name` inside its template.


**3. Topic: Implementing React Router and UI Frameworks (10 marks)**
A project requires a multi-page interface featuring a navigation bar and a structured data table. Based on the syllabus, detail the steps to install and implement React Router for navigation, and explain how you would integrate React Bootstrap and `react-table` into this routed application.

**Answer:**
* **React Router Configuration:** Install with `npm install react-router-dom`. Wrap the root application component in a `<BrowserRouter>`. Configure paths using `<Routes>` and `<Route>` components. For example:
  ```jsx
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/data" element={<DataTablePage />} />
    </Routes>
  </BrowserRouter>
  ```
* **React Bootstrap Integration:** Install using `npm install react-bootstrap bootstrap`. Import the stylesheet in `index.js` or `App.js`: `import 'bootstrap/dist/css/bootstrap.min.css';`. Import and use structural components like `<Navbar>` or `<Container>` inside navigation layouts.
* **React Table Integration:** Install with `npm install react-table`. Inside the `/data` page component, initialize tables using the `useTable` hook. Pass the data and column definitions to structural tables, styling them using React Bootstrap's `<Table striped bordered>` classes.
