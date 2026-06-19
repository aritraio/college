# Long Answer Questions

**1. Practical Implementation of Scope Inheritance**
Explain the concept of nested controllers and scope inheritance. Discuss the "Dot Rule" and why it is critical when dealing with inherited scopes. Provide a concrete code example demonstrating a parent and child controller, and prove how shadowing occurs with primitives but is prevented by using objects.

**Answer:**
Nested controllers occur when one DOM element with a controller contains a child element with a different controller. The child `$scope` prototypally inherits from the parent `$scope`.
The "Dot Rule" dictates that you should always bind view models to object properties (e.g., `$scope.data.model`) rather than primitives (e.g., `$scope.primitiveModel`). If a child scope assigns a new value to an inherited primitive, JavaScript creates a local property on the child, breaking the binding with the parent. Binding to an object prevents this because the child scope modifies a property *on* the inherited reference, modifying the original object.

Example HTML:
```html
<div ng-controller="ParentController">
  Parent Primitive: {{ title }} <br>
  Parent Object: {{ data.title }}
  
  <div ng-controller="ChildController">
    <input type="text" ng-model="title"> 
    <input type="text" ng-model="data.title"> 
  </div>
</div>
```

Example JavaScript:
```javascript
// Controllers
app.controller('ParentController', function($scope) {
  $scope.title = "Primitive Title";
  $scope.data = { title: "Object Title" };
});
app.controller('ChildController', function($scope) {
  // Inherits $scope.title and $scope.data automatically
});
```


**2. Forms, Events, and Custom Validations**
Detail how to utilize simple forms with CSS validation classes. Then, outline the technical process of implementing a custom validation control. Include how a custom directive interacts with the `ngModel` controller to manually set form validity.

**Answer:**
Forms evaluate the validity of their internal controls. By using HTML5 attributes like `required` or `minlength`, the framework automatically updates the model state and applies CSS classes like `.ng-invalid` or `.ng-dirty`. Form events like `ng-submit` can be used to prevent submission if the form is in an invalid state.

To implement custom validation, you must create a custom directive that `require`s the `ngModel` controller. This grants access to the `$validators` pipeline.

Example Custom Validation Directive:
```javascript
app.directive('evenNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attributes, ngModelCtrl) {
      ngModelCtrl.$validators.evenNumber = function(modelValue, viewValue) {
        if (ngModelCtrl.$isEmpty(modelValue)) return true; // Let 'required' handle empty
        return (modelValue % 2 === 0); // Returns true if valid, false if invalid
      };
    }
  };
});
```

In the HTML, applying `even-number` to an input field will tie this custom logic to the form's overall validation state, toggling the `ng-invalid-even-number` CSS class based on the return value.


**3. Services and Dependency Injection Workflow**
Define what a service is within this ecosystem. Explain the step-by-step process of creating a custom service, injecting it with built-in dependencies, and subsequently utilizing that service within a controller.

**Answer:**
A Service is a singleton object instantiated exactly once per application lifecycle. It acts as a centralized mechanism to store data, manage external API calls, or handle reusable business logic, keeping controllers lean.

* **Step 1: Create the Service.** Use `app.service()` or `app.factory()`.
* **Step 2: Inject Dependencies into the Service.** Use array notation to ensure minification safety, requesting core services like `$log` to log activity.
* **Step 3: Inject the Custom Service into the Controller.** Request the custom service by name in the controller's dependency array.

Example Code:
```javascript
// 1 & 2: Creating a service with dependency injection
app.service('MathService', ['$log', function($log) {
  this.multiply = function(a, b) {
    $log.info("Multiplying " + a + " and " + b);
    return a * b;
  };
}]);

// 3: Using the service in a controller
app.controller('CalcController', ['$scope', 'MathService', function($scope, MathService) {
  $scope.calculate = function(val1, val2) {
    $scope.result = MathService.multiply(val1, val2);
  };
}]);
```

This abstracts the logic away from the controller and promotes code reuse across multiple controllers.
