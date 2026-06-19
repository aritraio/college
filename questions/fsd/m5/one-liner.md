# One-Liner Questions

1. **Question:** What is the primary role of a controller?
**Answer:** To initialize the state of the `$scope` object and add behavior to it.

2. **Question:** Give an example of adding behavior to a scope object.
**Answer:** Assigning a function to a property, like `$scope.calculate = function(a, b) { return a + b; };`.

3. **Question:** What is a conditional directive?
**Answer:** A directive that modifies the DOM layout (adding, removing, or hiding elements) based on a boolean expression, such as `ng-if`.

4. **Question:** Define scope inheritance.
**Answer:** The mechanism by which nested controllers create child scopes that prototypally inherit properties and methods from their parent scope.

5. **Question:** Name three commonly used built-in filters.
**Answer:** `currency`, `date`, and `uppercase`.

6. **Question:** What is the fundamental purpose of creating a custom filter?
**Answer:** To transform or format data for display in a specific way that is not covered by the framework's built-in filters.

7. **Question:** How does the framework handle form validation states via CSS?
**Answer:** It automatically applies CSS classes like `ng-valid`, `ng-invalid`, `ng-pristine`, and `ng-dirty` to the form and its inputs dynamically.

8. **Question:** What does dependency injection in a service achieve?
**Answer:** It allows the framework to automatically provide required dependencies (like other services or built-in objects) to your service when it is instantiated.

9. **Question:** What is the difference between simple forms and forms with custom validations?
**Answer:** Simple forms rely on standard HTML5 attributes (like `required` or `minlength`), whereas custom validation requires writing a directive to execute complex, user-defined logic.

10. **Question:** How do multiple controllers manage their scopes?
**Answer:** Each controller creates its own isolated execution context (`$scope`), but they can be nested to share data hierarchically via prototypal inheritance.
