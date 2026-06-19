# Long Answer Questions

**1. Provide a comprehensive definition of software, detailing its configuration components. Furthermore, critically analyze why the statement "software doesn't wear out" is true, yet software still eventually fails. (10 marks)**
**Answer:**
*Definition and Components (4 marks):* Software is not merely the executable code. It comprises three vital configuration components:

1. **Programs:** The actual instructions that, when executed, provide desired features, functions, and performance.
2. **Data Structures:** The logical organization of data that enables the programs to adequately store, manipulate, and retrieve information.
3. **Documentation:** The descriptive information in both hard copy and virtual forms that explains the system's operation, usage, and underlying architecture.

*Wear-out vs. Deterioration (6 marks):* The statement "software doesn't wear out" is true because software is a logical entity, not a physical one. It is immune to physical environmental stressors like moisture, heat, or mechanical friction. Therefore, its failure rate does not naturally spike at the end of its life due to physical decay.
However, software fails due to **deterioration**. Throughout its lifecycle, software undergoes constant evolution—new features are added, environments change, and bugs are patched. Every time a change is made to the source code, there is a probability of introducing new anomalies or unintended side effects. Over time, these continuous modifications degrade the software's original structural integrity. The code becomes a "spaghetti" of patches and workarounds. Eventually, the software becomes so brittle and complex that making a simple change causes multiple failures elsewhere, leading to its ultimate retirement or necessity for a complete rewrite.


**2. Analyze the discipline of Software Engineering. Define the concept, explain the economic realities regarding its cost distribution (development, testing, evolution), and evaluate the primary challenges modern software engineers must navigate. (12 marks)**
**Answer:**
*Definition (2 marks):* Software Engineering is the establishment and use of sound engineering principles to obtain economical software that is reliable and works efficiently on real machines. It applies a systematic, disciplined, and quantifiable approach to software creation and maintenance.

*Cost Distribution (5 marks):* The economics of software engineering reveal that initial coding is only a small fraction of the total cost.

1. **Development:** Includes requirements gathering, design, and coding. While significant, it is not the majority cost.
2. **Testing:** Consumes a massive portion of upfront costs, often taking 30-40% or more of the initial project budget to ensure dependability and fix initial defects.
3. **Evolution/Maintenance:** This is the most expensive phase. Because software must adapt to changing business needs, hardware upgrades, and operating system shifts, the cost to maintain and evolve software post-deployment typically dwarfs the original development costs, often accounting for 60% or more of the software's total lifecycle budget.

*Key Challenges (5 marks):*

1. **Heterogeneity:** Engineers no longer build for a single static machine. Software must dynamically adapt to different architectures, distributed networks, cloud environments, and mobile devices simultaneously.
2. **Rapid Delivery:** Time-to-market is a critical business metric. Engineers must find ways (like Agile and DevOps) to drastically compress development timelines while still meeting strict quality and safety standards.
3. **Security/Trust:** As software integrates deeply into critical infrastructure and personal lives, malicious exploitation is a constant threat. Engineers must build inherently secure systems that users can trust with their physical safety and private data.


**3. Elaborate on the various types of software categorized in the software engineering domain. Furthermore, map how the "Four Quality Attributes" dictate the success of any of these software types. (10 marks)**
**Answer:**
*Types of Software (5 marks):*

1. **System Software:** Programs servicing other programs (e.g., OS, device drivers). Focuses heavily on resource management.
2. **Application Software:** Stand-alone programs solving specific business or personal needs (e.g., MS Word, inventory software).
3. **Embedded Software:** Code living inside hardware to control physical devices (e.g., IoT devices, car engine controllers).
4. **Product-line Software:** Frameworks designed to be customized for various customers within a niche market (e.g., healthcare management systems).
5. **Web Applications:** Network-centric software accessed via browsers, ranging from simple sites to complex computing platforms.
6. **Artificial Intelligence Software:** Systems using non-numerical algorithms to solve complex problems (e.g., machine learning models, expert systems).

*The Four Quality Attributes (5 marks):* Regardless of the type, successful software must exhibit:

1. **Maintainability:** An AI model or Web App must be structured so it can be easily updated when new algorithms or web standards are released.
2. **Dependability/Security:** Embedded software in a pacemaker must have absolute dependability, while System software requires rigid security to prevent root-level breaches.
3. **Efficiency:** System and Application software must execute quickly without draining the battery or hogging RAM.
4. **Acceptability:** Product-line software must be intuitive enough that the specific target market can adopt it into their workflow without excessive training. If the users reject the interface, the technical brilliance of the underlying code is irrelevant.
