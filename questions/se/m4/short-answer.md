# Short Answer Questions

**1. Explain the relationship between abstraction and refinement. (4 marks)**
**Answer:** Abstraction and refinement are complementary concepts. Abstraction is a macro-level view that focuses on *what* a system or component does by hiding complex details. Refinement is the top-down execution of that concept, detailing *how* it operates step-by-step. You start with a high-level abstraction and progressively refine it into actionable, granular design details.

**2. Why is functional independence critical in modular design? (4 marks)**
**Answer:** Functional independence ensures that a module performs a single, specific sub-function with minimal interaction with other parts of the system. This is critical because it makes modules easier to develop, test, and maintain. If a bug occurs, or a feature needs updating, an independent module can be modified without causing a cascade of breaking changes (ripple effect) across the rest of the software.

**3. Identify three critical design issues in UI development and how to avoid them. (5 marks)**
**Answer:**
1. **Inconsistent layouts:** Avoid by enforcing strict UI guidelines where buttons and menus remain in the same locations across all screens.
2. **High user memory load:** Avoid by designing inputs that don't require the user to remember complex codes from previous screens.
3. **Poor error handling:** Avoid by replacing cryptic system error codes with plain-language error messages that tell the user exactly how to fix the problem.

**4. What are the key criteria for selecting programming languages and development tools? (4 marks)**
**Answer:** Selection should be based strictly on technical and architectural alignment, not trends. Key criteria include:
* The nature of the application (e.g., web, embedded, data-heavy).
* Compatibility with the designed architecture.
* Availability of robust development tools (IDEs, debuggers).
* The existing skill set of the development team.

**5. Differentiate between cohesion and coupling. (3 marks)**
**Answer:** Cohesion evaluates the internal strength of a module—how closely related the tasks within that module are. Coupling evaluates the external dependence—how much one module relies on another. Good design requires *high* cohesion (strong internal focus) and *low* coupling (weak external dependence).
