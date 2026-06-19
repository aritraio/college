# Short Answer Questions

**1. Explain the mechanism of adding behavior to a `$scope` object with parameters.**
**Answer:** To add behavior, you attach a function to the `$scope` object within the controller. This function can accept parameters. In the view, you trigger this function using an event directive (like `ng-click`) and pass arguments to it directly within the expression.
Example:
Controller: `$scope.greet = function(name) { alert("Hello " + name); }`.
View: `<button ng-click="greet('Aritra')">Greet</button>`.

**2. Describe how scope inheritance functions with nested controllers.**
**Answer:** When controllers are nested in the DOM, the child controller's `$scope` prototypally inherits from the parent controller's `$scope`. This means if a property is not found on the child scope, the framework climbs the prototype chain to check the parent scope. However, writing to primitive properties on the child scope creates a local copy, "shadowing" the parent data rather than overwriting it.

**3. What is the process for creating a custom filter?**
**Answer:** A custom filter is created by registering a filter factory function with the application module. This function must return a worker function that accepts an input value (and optional parameters) and returns the transformed/filtered data. It can then be used in the view using the pipe character `|`.

**4. How does the framework utilize CSS classes for form validation?**
**Answer:** The framework monitors forms and input fields, automatically appending specific CSS classes based on their state. `ng-pristine` and `ng-dirty` track user interaction. `ng-valid` and `ng-invalid` track whether the input meets validation rules. Developers can target these classes in their stylesheets to provide immediate visual feedback (e.g., a red border for invalid data).

**5. Briefly explain dependency injection in a service.**
**Answer:** Dependency Injection (DI) is a concept where the framework automatically provides dependencies to components rather than components instantiating them themselves. When defining a service, you declare its dependencies (like `$http` or `$log`) as arguments in the factory function, and the DI subsystem injects those instances automatically when the service is created.
