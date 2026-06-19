# MCQs

**1. Which object serves as the execution context for expressions and acts as the "glue" between a controller and the view?**
A) `$rootScope`
B) `$scope`
C) `$bind`
D) `$view`
**Answer:** B

**2. Which conditional directive completely removes or recreates a portion of the DOM tree based on an expression?**
A) `ng-show`
B) `ng-hide`
C) `ng-if`
D) `ng-switch`
**Answer:** C

**3. How are built-in filters applied to an expression in the view?**
A) Using a dot `.`
B) Using a pipe `|`
C) Using a colon `:`
D) Using an arrow `->`
**Answer:** B

**4. When a user modifies the value of an input field within a form, which CSS class is automatically appended to that input element?**
A) `ng-pristine`
B) `ng-touched`
C) `ng-dirty`
D) `ng-modified`
**Answer:** C

**5. How do you pass a parameter to a behavior (function) defined on the `$scope` object from a view?**
A) Define the parameter in the controller's dependency array.
B) Call the function inside an expression with the argument, e.g., `ng-click="doTask(param)"`.
C) Bind it using a built-in filter.
D) It is impossible to pass parameters directly from the view.
**Answer:** B

**6. In nested controllers, what happens due to prototypal inheritance if a child controller attempts to read a property that only exists on the parent controller's `$scope`?**
A) It throws a ReferenceError.
B) It reads the property from the parent `$scope`.
C) It creates a new `undefined` property on the child `$scope`.
D) It forces the controller to reload.
**Answer:** B

**7. Why is array notation generally preferred when injecting dependencies into a service or controller?**
A) It executes faster in the browser.
B) It protects dependency names from being mangled during code minification.
C) It enforces strict typing.
D) It allows injecting HTML directly into the service.
**Answer:** B

**8. To create a custom validation rule for a form field, what must you typically implement?**
A) A custom directive that requires the `ngModel` controller.
B) A custom `$scope` property named `validation`.
C) A specialized filter piped directly into the input tag.
D) A service that overrides HTML5 attributes.
**Answer:** A

**9. What is a primary characteristic of a Service in this architecture?**
A) It is instantiated anew every time it is injected.
B) It is tightly coupled to the DOM and manipulates HTML directly.
C) It is a singleton object used to organize and share data/functions across the application.
D) It inherits directly from `$rootScope`.
**Answer:** C

**10. When dealing with scope inheritance, what occurs if a child scope assigns a new value to a primitive data type (like a string or boolean) inherited from the parent scope?**
A) The parent scope's primitive is permanently overwritten.
B) The child scope creates its own local property, shadowing the parent's primitive.
C) An error is thrown because inherited primitives are immutable.
D) The `$rootScope` broadcasts a change event.
**Answer:** B
