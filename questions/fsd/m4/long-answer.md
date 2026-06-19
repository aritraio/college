# Long Answer Questions

**1. Detail the complete process of React API Integration. Explain how a React application fetches data from and sends data to a custom API built with PHP and MySQL.**
**Answer:**
React API integration involves connecting a frontend UI with a backend server and database.

* **The Backend (PHP & MySQL):** First, an API must be built. A MySQL database is structured to hold the data. A PHP script acts as the API endpoint. For fetching data, the PHP script connects to MySQL, runs a `SELECT` query, converts the resulting array into JSON format using `json_encode()`, and echoes it to the client. For sending data, the PHP script reads the incoming HTTP POST request payload, decodes the JSON, and runs an `INSERT` or `UPDATE` query on the database. Crucially, the PHP API must have CORS (Cross-Origin Resource Sharing) headers configured so the React app can access it.
* **Fetching Data in React:** In the React component, the `useEffect` hook is typically used to fetch data when the component mounts. The `fetch('api_url')` function makes a GET request to the PHP endpoint. The response is converted to JSON (`response.json()`), and the resulting data is stored in the component's state using the `useState` hook. This state is then mapped over to render the UI.
* **Sending Data in React:** When a user submits a form, a function is triggered that gathers the input data. A `fetch('api_url', { method: 'POST', body: JSON.stringify(data) })` request is made. The React app waits for a successful response from the PHP API, confirming the data was saved to MySQL, and then updates the UI accordingly.


**2. Discuss AngularJS expressions in depth. Explain the conceptual usage and provide HTML examples demonstrating how to bind numbers, strings, objects, and arrays.**
**Answer:**
AngularJS expressions are JavaScript-like code snippets used to bind application data to standard HTML. They are written inside double curly braces `{{ expression }}`. Unlike standard JavaScript, AngularJS expressions evaluate against a local scope object rather than the global `window` object, and they are forgiving of null or undefined values (they won't throw ReferenceErrors).

* **Number Expressions:** Used for mathematical calculations directly in the view.
  * *Example:* `<p>Cost: {{ quantity * price }}</p>` (If quantity is 2 and price is 50, outputs 100).
* **String Expressions:** Used for string manipulation, like concatenation.
  * *Example:* `<h1>Welcome, {{ firstName + ' ' + lastName }}</h1>`
* **Object Binding and Expressions:** Used to access properties of complex data structures (objects) defined in the controller scope.
  * *Example:* Assuming a scope object `student = { name: "Alice", grade: "A" }`. The HTML would be `<p>Student Name: {{ student.name }}, Grade: {{ student.grade }}</p>`.
* **Working with Arrays:** Used to access specific elements via their index.
  * *Example:* Assuming a scope array `marks = [85, 90, 78]`. The HTML would be `<p>Math Score: {{ marks[0] }}</p>`.


**3. Analyze the concept of Data Binding in AngularJS. What problem does it solve, and how does it fit into the MVC architecture?**
**Answer:**
Data binding is the process that establishes a connection between the application UI (View) and the business logic/data (Model).

* **The Problem Solved:** In traditional JavaScript/jQuery development, developers had to manually write code to manipulate the DOM whenever data changed (e.g., `document.getElementById('text').innerHTML = newData;`), and write event listeners to update data when the UI changed. This resulted in tangled, hard-to-maintain "spaghetti code." AngularJS data binding automates this process entirely.
* **Data Binding inside MVC:** In AngularJS's MVC architecture, the Controller sets up the initial state of the Model. The View binds to this Model using expressions `{{ }}` and directives like `ng-model`.
  * *One-way binding* means the View reflects the Model (e.g., displaying a variable).
  * *Two-way binding* (specifically using `ng-model` on input fields) means if the user types in an input box (changing the View), the underlying data (Model) updates instantly. Conversely, if the controller logic changes the Model, the input box updates instantly. This seamless data flow is the cornerstone of AngularJS, allowing developers to focus purely on application logic rather than DOM manipulation.
