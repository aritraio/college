# Short Answer Questions

**1. Explain the conceptual overview of the MVC architecture in AngularJS.**
**Answer:** MVC stands for Model-View-Controller. The **Model** represents the application's data and state. The **View** is the user interface or HTML that displays the data. The **Controller** contains the business logic that manipulates the Model and interacts with the View. This separation of concerns makes the application easier to manage, scale, and test.

**2. Describe the basic workflow of creating an API using PHP and MySQL to serve a React application.**
**Answer:**
1. **MySQL Database:** Create the database tables to store the necessary data.
2. **PHP Script:** Write PHP code to connect to the MySQL database.
3. **API Logic:** The PHP script executes SQL queries (SELECT, INSERT) based on the HTTP request type (GET, POST).
4. **JSON Output:** The PHP script formats the SQL results into JSON and outputs them via HTTP headers, which the React application can then consume via a `fetch` request.

**3. Provide syntax examples differentiating number, string, and array expressions in AngularJS.**
**Answer:**
* **Number Expression:** Evaluates math. Example: `<p>Total: {{ 5 * 10 }}</p>` (Outputs 50).
* **String Expression:** Concatenates strings. Example: `<p>Name: {{ "John" + " " + "Doe" }}</p>` (Outputs John Doe).
* **Array Expression:** Accesses array indices. Example: `<p>First item: {{ items[0] }}</p>` (Outputs the first element of the `items` array).

**4. What is data binding in AngularJS, and why is it a core feature?**
**Answer:** Data binding in AngularJS is the automatic synchronization of data between the model and the view. It is a core feature because it eliminates the need for developers to write boilerplate DOM manipulation code. When the data model changes, the view updates automatically, and (in two-way binding) when the view changes via user input, the model updates instantly.

**5. How do you set up the environment and define your first AngularJS application?**
**Answer:** To set up the environment, you must include the AngularJS script file in the `<head>` or bottom of the `<body>` of your HTML document. To define the application, you add the `ng-app` attribute (directive) to the root element of your application, typically the `<html>` or `<body>` tag.
