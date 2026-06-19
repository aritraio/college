# Long Answer Questions

**1. Discuss the concepts of Verification and Validation in software testing. Detail how black-box and white-box testing methodologies are applied to achieve quality assurance, including how test cases are designed for each. (12 marks)**
**Answer:**
* **Verification vs. Validation:** Verification ensures that the software is built according to the technical specifications defined during the design phase ("Are we building the product right?"). Validation ensures that the final software actually meets the operational needs and expectations of the user ("Are we building the right product?"). Both are required for comprehensive Quality Assurance.
* **Black-Box Testing:** Applied primarily during later stages (system and acceptance testing) to achieve validation. It checks functionality.
  * *Test Case Design:* Designed using requirement specifications. Techniques include Equivalence Partitioning (dividing inputs into valid/invalid classes), Boundary Value Analysis (testing limits of input ranges), and Error Guessing. The internal code is ignored.
* **White-Box Testing:** Applied primarily during early stages (unit and integration testing) to achieve verification. It checks internal logic.
  * *Test Case Design:* Designed using the source code. The goal is logical coverage. Techniques include Statement Coverage (executing every line of code at least once), Branch/Decision Coverage (executing true and false branches of conditions), and Path Testing (executing all possible control paths through the module).


**2. Evaluate the role of Quality Frameworks in Software Engineering. Compare and contrast ISO 9000 quality standards with the Capability Maturity Model (CMM). (10 marks)**
**Answer:**
Quality frameworks establish baseline processes to ensure both product and process quality, shifting the focus from finding defects to preventing them.

* **ISO 9000:** An international standard that outlines the requirements for a Quality Management System (QMS). It is a broad standard applicable to many industries, not just software. It focuses on ensuring that an organization documents its processes, follows the documented processes, and passes external audits to receive certification. It guarantees process consistency but does not prescribe specific software engineering techniques.
* **Capability Maturity Model (CMM):** Specifically designed for the software industry. Instead of a binary "certified or not" approach like ISO, CMM provides an evolutionary, 5-level path for process improvement (Initial, Repeatable, Defined, Managed, Optimizing). It focuses on identifying specific process areas (like configuration management or quantitative process management) that an organization must master to move to the next level of maturity.
* **Comparison:** ISO 9000 establishes a baseline for documentation and consistency, while CMM provides a roadmap for continuous software process improvement. Many software organizations use both concurrently.


**3. Comprehensive software project management requires accurate estimation, scheduling, and risk management. Explain the process of cost estimation using the COCOMO II model and discuss how network scheduling and Earned Value Analysis ensure the project stays on track. (15 marks)**
**Answer:**
* **Cost Estimation & COCOMO II:** You cannot schedule a project without knowing its size and effort. COCOMO II (Constructive Cost Model II) is an algorithmic model that takes a size estimate (using LOC or Function Points) and applies a mathematical formula to predict the person-months of effort required. It adjusts this baseline calculation using scale factors (like project novelty or team cohesion) and cost drivers (like personnel capability or platform difficulty). This provides the project manager with a data-driven budget and timeline.
* **Network Scheduling:** Once the effort and timeline are established via COCOMO II, the project manager breaks the work into Task Sets. Network scheduling uses diagrams (like PERT or CPM charts) to map out these tasks chronologically. It visualizes dependencies (Task B cannot start until Task A finishes) and identifies the Critical Path—the longest sequence of dependent tasks that dictates the absolute minimum duration of the project. Any delay on the critical path delays the entire project.
* **Earned Value Analysis (EVA):** During execution, EVA is utilized to monitor the schedule defined by the network diagram. By assigning a planned value to each task, the manager can calculate the Earned Value as tasks are completed. Comparing Earned Value to the Planned Value reveals schedule variances, allowing the manager to objectively quantify progress and implement corrective actions (managing people or adjusting resources) before the project fails.
