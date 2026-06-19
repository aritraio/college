# Flashcards

**Flashcard 1**
*Front:* `$scope` Object
*Back:* An object that refers to the application model. It acts as the execution context for expressions and serves as the communicative bridge between a controller and the view.

**Flashcard 2**
*Front:* Conditional Directives (`ng-if` vs `ng-show`)
*Back:* `ng-if` completely removes or inserts an element into the DOM based on the condition. `ng-show` leaves the element in the DOM but toggles its visibility using CSS (`display: none`).

**Flashcard 3**
*Front:* Primitive Shadowing (Scope Inheritance)
*Back:* If a child scope modifies an inherited primitive (string, number, boolean), it creates a local copy, shadowing the parent's property. To avoid this, bind to object properties instead of primitives.

**Flashcard 4**
*Front:* `ng-pristine` vs. `ng-dirty`
*Back:* Form validation states: `ng-pristine` indicates the user has not yet interacted with the input or form. `ng-dirty` indicates the user has modified it.

**Flashcard 5**
*Front:* Services
*Back:* Reusable, singleton entities that organize and share code, business logic, or state across an application independently of controllers and views.

**Flashcard 6**
*Front:* Custom Directives for Validation
*Back:* Used to implement custom validation logic. The directive requires the `ngModel` controller to access the input's value and set its validity state manually.
