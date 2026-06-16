// js/examprep-data.js - Mock Database & Dynamic Content Generator for Exam Prep
(function () {
  const ExamPrepData = {};

  // Custom curated content for core modules
  const customData = {
    se: {
      1: {
        oneLiners: [
          { fact: "Software configuration includes instructions (code), data structures, and documentation (SRS, guides).", category: "Definition" },
          { fact: "Software does not wear out physically; it deteriorates (software rot) over time due to frequent modifications.", category: "Fact" },
          { fact: "Software Engineering applies a disciplined, systematic, and quantifiable approach to software lifecycle phases.", category: "Concept" },
          { fact: "Maintenance/evolution represents 60% to 80% of total lifetime software costs.", category: "Formula / Stat" },
          { fact: "System Engineering is the parent discipline encompassing hardware, software, process design, and policies.", category: "Concept" },
          { fact: "The four key quality attributes of professional software are Maintainability, Dependability/Security, Efficiency, and Acceptability.", category: "Definition" }
        ],
        mcqs: [
          { question: "Which of the following is NOT part of a complete software configuration?", options: ["Executable binary programs", "Detailed system documentation", "Physical computer microchips", "Configuring data structures"], correct: 2, explanation: "Physical microchips are hardware components. Software consists of instructions, data structures, and documentation." },
          { question: "Software deterioration differs from hardware wear-out because software...", options: ["Fails due to environment rust", "Does not wear out physically but degrades due to modifications", "Is manufactured with infinite defects", "Requires physical lubrication"], correct: 1, explanation: "Hardware fails due to physical wear (bathtub curve), whereas software deteriorates due to logical complexity added during changes." },
          { question: "What is the typical ratio of evolution (maintenance) cost to initial development cost?", options: ["Evolution is half of development cost", "Evolution is equal to development cost", "Evolution is 2 to 3 times development cost", "Evolution is negligible (<10%)"], correct: 2, explanation: "For long-lifetime software systems, evolution and maintenance costs routinely exceed initial development by a factor of 2 to 3." },
          { question: "Which field is concerned with all aspects of computer-based systems, including hardware, policies, and human processes?", options: ["Software Engineering", "Computer Science", "Systems Engineering", "Information Technology"], correct: 2, explanation: "Systems engineering is an overarching discipline; software engineering is a specialized sub-discipline focused on software components." },
          { question: "Which quality attribute reflects how easily a software system can adapt to evolving business requirements?", options: ["Efficiency", "Maintainability", "Acceptability", "Security"], correct: 1, explanation: "Maintainability is defined as the capability of software to be modified to fix bugs, adapt to environments, or add features." },
          { question: "What are the two major components of initial software development costs?", options: ["10% coding, 90% deployment", "60% development (design/code), 40% testing", "50% documentation, 50% marketing", "30% analysis, 70% installation"], correct: 1, explanation: "Typically, design/coding represents 60% of the initial budget, and validation/testing consumes the remaining 40%." },
          { question: "The challenge of system heterogeneity refers to which of the following?", options: ["Running software in a single browser", "Ensuring systems operate across diverse platforms and networks", "Writing code in multiple programming languages simultaneously", "Hiring developers from different backgrounds"], correct: 1, explanation: "Heterogeneity is the challenge of building software that integrates old legacy databases with web/mobile applications across networks." },
          { question: "Which is system software?", options: ["Microsoft Word", "Google Chrome", "Linux Operating System", "Adobe Photoshop"], correct: 2, explanation: "System software (like Linux, device drivers) provides infrastructure services and manages hardware resources." },
          { question: "Embedded software is typically stored in...", options: ["Magnetic tapes", "Read-Only Memory (ROM/EEPROM)", "Main database servers", "Cloud storage services"], correct: 1, explanation: "Embedded software resides inside specialized hardware ROM/EEPROM chips (e.g., in microwave ovens or ABS controllers)." },
          { question: "Who defines Software Engineering as the application of a systematic, disciplined, quantifiable approach to software?", options: ["ISO/IEC", "ACM", "IEEE", "W3C"], correct: 2, explanation: "The IEEE Standard Glossary of Software Engineering Terminology defines software engineering in this systematic way." },
          { question: "Which characteristic is key for banking apps where transactions must be secure and correct?", options: ["Efficiency", "Acceptability", "Dependability", "Heterogeneity"], correct: 2, explanation: "Dependability includes reliability, safety, resilience, and security, which are essential for processing transactions." },
          { question: "In software engineering, what does 'COTS' stand for?", options: ["Code-Oriented Testing Suite", "Commercial Off-The-Shelf software", "Computer-Optimized Transfer System", "Common Operating Technical Standard"], correct: 1, explanation: "COTS refers to ready-made commercial software products purchased as-is from vendor catalogs." },
          { question: "What curve describes hardware failure rates over time?", options: ["Exponential decay curve", "Bathtub curve", "Bell-shaped curve", "Linear escalation curve"], correct: 1, explanation: "The hardware failure curve is called the bathtub curve due to high initial infant mortality, low constant failures, and high end-of-life wear." },
          { question: "Acceptability as a software attribute means software must be...", options: ["Cheap to purchase", "Understandable, usable, and compatible for target users", "Written in a high-level language", "Tested by at least three agencies"], correct: 1, explanation: "Acceptability ensures users can understand, interact with, and accept the software interface without friction." },
          { question: "Which software category uses non-numerical algorithms to solve complex problems?", options: ["Product-line software", "System software", "Artificial Intelligence software", "Embedded software"], correct: 2, explanation: "AI software uses heuristic search, logic, and neural models rather than standard numeric computations." },
          { question: "What is software rot?", options: ["Physical decomposition of floppy disks", "Structural code degradation due to repeated patch modifications", "Accumulation of unused files in storage", "Loss of license validation"], correct: 1, explanation: "Software rot (deterioration) occurs when ongoing changes make the codebase increasingly complex and fragile." },
          { question: "Which of these is the primary goal of Software Engineering?", options: ["Writing code as fast as possible", "Delivering reliable software on time, within budget, and meeting specs", "Designing highly artistic user interfaces", "Using the newest frameworks"], correct: 1, explanation: "Software Engineering focuses on systematic, cost-efficient, and timely production of high-quality software." },
          { question: "Software engineering costs are distributed such that testing consumes roughly...", options: ["10%", "20%", "40%", "80%"], correct: 2, explanation: "Validation and testing during initial development typically represent 40% of the cost." },
          { question: "Which software type is dedicated to a single device (e.g., washing machine)?", options: ["Application software", "Embedded software", "System software", "Heterogeneous software"], correct: 1, explanation: "Embedded software controls hardware operations of non-computer devices like appliances." },
          { question: "Why is rapid delivery a challenge in software engineering?", options: ["Computers process instructions too slowly", "Businesses require short time-to-market, putting pressure on QA", "Internet speeds restrict downloads", "Compilers take too long to build code"], correct: 1, explanation: "Rapid delivery requires fast release cycles without allowing defects to leak to production." }
        ],
        shortQuestions: [
          { question: "Why does software deteriorate instead of wearing out?", answer: "Software does not wear out because it has no physical components subject to environmental friction. However, it deteriorates because during its maintenance cycle, developers make repeated, uncoordinated modifications to adapt it to new requirements. These patches introduce new logical bugs and degrade the clean internal design structure over time." },
          { question: "Distinguish between Computer Science and Software Engineering.", answer: "Computer Science focuses on the underlying theories, algorithms, and computational principles (e.g., how sorting algorithms function mathematically). Software Engineering, on the other hand, is an engineering discipline focused on the practical, systematic methods of building, testing, and maintaining large-scale software products within cost, time, and quality constraints." },
          { question: "What are the four essential attributes of good software?", answer: "The four attributes are:\n1. **Maintainability**: The software must adapt easily to changing user needs.\n2. **Dependability & Security**: It must be reliable, secure against attacks, and fail-safe.\n3. **Efficiency**: It should optimize CPU cycles, RAM, and network bandwidth usage.\n4. **Acceptability**: It must be user-friendly, understandable, and compatible with other systems." }
        ],
        longQuestions: [
          {
            question: "Explain the Software Engineering Cost Distribution across development, testing, and evolution.",
            answer: "Software costs are not just coding costs. In initial development, the budget is split roughly into **60% development costs** (requirements analysis, system design, and coding) and **40% testing/validation costs** (unit testing, integration testing, system testing, and QA).\n\nHowever, for long-lived enterprise software, **evolution (maintenance) costs** are the most dominant factor, often accounting for **60% to 80% of total lifetime software costs**. These post-release costs cover fixing bugs, adapting the software to new OS platforms, and adding new features requested by clients. Thus, initial code design must emphasize maintainability to prevent massive evolution budgets.",
            keyPoints: ["Initial split: 60% Design & Code, 40% Testing & QA", "Evolution (Maintenance) is 60%-80% of total lifetime software cost", "High maintainability directly reduces evolution expenses"]
          },
          {
            question: "Discuss the three primary challenges facing modern Software Engineering: Heterogeneity, Delivery, and Trust.",
            answer: "Modern software systems operate in complex environments and face three systemic challenges:\n\n1. **Heterogeneity**: Software must operate as distributed systems across diverse platforms, executing on web, mobile, and mainframe systems concurrently, and integrating with ancient legacy components without breaking.\n2. **Delivery (Time-to-Market)**: Market competition demands extremely rapid deployments (via DevOps, CI/CD). Engineers face high pressure to deliver software fast while maintaining deep testing cycles.\n3. **Trust**: As software controls critical infrastructure (drones, banks, electricity grids, hospitals), ensuring reliability under extreme loads and resilience against sophisticated security cyberattacks is paramount.",
            keyPoints: ["Heterogeneity: Cross-platform compatibility & legacy system integration", "Delivery: Rapid deployments (CI/CD) vs deep QA validation", "Trust: Hardening code against security threats and minimizing failures"]
          }
        ],
        mnemonics: [
          { concept: "Attributes of Good Software", phrase: "MDEA (My Dear Elegant Application)", association: "**M**aintainability, **D**ependability, **E**fficiency, **A**cceptability" },
          { concept: "Software Engineering Challenges", phrase: "HDT (High-Definition Testing)", association: "**H**eterogeneity, **D**elivery, **T**rust" }
        ],
        flashCards: [
          { question: "Software Rot", answer: "Logical structure degradation of a software program over time due to frequent, uncoordinated patch changes." },
          { question: "System Engineering", answer: "The overarching discipline specifying, designing, and integrating hardware, software, user interfaces, and organizational policies." },
          { question: "Bathtub Curve", answer: "The U-shaped curve describing hardware failure rates: high initial failures, low constant middle-life failures, and high end-of-life wear failures." },
          { question: "Maintainability", answer: "The ease with which a software system can undergo changes, adaptations, optimization, and bug fixes." },
          { question: "Dependability", answer: "A set of software attributes covering reliability, security, safety, and resilience." },
          { question: "COTS", answer: "Commercial Off-The-Shelf software. Ready-made software products available in the commercial market (e.g. MS Office)." }
        ]
      }
    },
    daa: {
      1: {
        oneLiners: [
          { fact: "An algorithm is a step-by-step, finite sequence of unambiguous instructions to solve a computational problem.", category: "Definition" },
          { fact: "Asymptotic notation (Big-O, Omega, Theta) describes algorithm efficiency for very large inputs.", category: "Concept" },
          { fact: "Big-O \\( O(g(n)) \\) defines an asymptotic upper bound: \\( f(n) \\le c \\cdot g(n) \\) for all \\( n \\ge n_0 \\).", category: "Formula" },
          { fact: "Big-Omega \\( \\Omega(g(n)) \\) defines an asymptotic lower bound: \\( f(n) \\ge c \\cdot g(n) \\) for all \\( n \\ge n_0 \\).", category: "Formula" },
          { fact: "Big-Theta \\( \\Theta(g(n)) \\) represents a tight bound, meaning \\( f(n) \\) is bounded above and below by \\( g(n) \\).", category: "Formula" },
          { fact: "Space complexity measures the total memory space required by an algorithm, including inputs, auxiliary, and stack space.", category: "Definition" }
        ],
        mcqs: [
          { question: "Which mathematical notation is used to represent the asymptotic upper bound of an algorithm's time complexity?", options: ["Omega notation", "Big-O notation", "Theta notation", "Little-o notation"], correct: 1, explanation: "Big-O notation provides the asymptotic upper bound, representing the worst-case scenario." },
          { question: "What does it mean if an algorithm has a time complexity of \\( \\Theta(g(n)) \\)?", options: ["It runs in linear time", "Its worst-case is bounded above by g(n)", "Its running time is tightly bound both above and below by g(n)", "Its best-case is bounded below by g(n)"], correct: 2, explanation: "Theta notation provides a tight bound, meaning the algorithm is asymptotically bounded both above and below." },
          { question: "An algorithm solves a problem of size n by recursively solving two subproblems of size n/2 and combining them in linear time. What is its recurrence relation?", options: ["T(n) = T(n/2) + O(1)", "T(n) = 2T(n/2) + O(n)", "T(n) = 2T(n/4) + O(n^2)", "T(n) = T(n-1) + O(n)"], correct: 1, explanation: "T(n) = 2T(n/2) + O(n) represents a divide-and-conquer recurrence like Merge Sort." },
          { question: "Using Master's Theorem, what is the complexity of \\( T(n) = 4T(n/2) + O(n) \\)?", options: ["O(n log n)", "O(n)", "O(n^2)", "O(log n)"], correct: 2, explanation: "Here a=4, b=2, so log_b(a) = log_2(4) = 2. Since f(n) = O(n) is smaller than n^2, by Case 1 of Master's Theorem, T(n) = Theta(n^2)." },
          { question: "Which of the following functions grows the fastest asymptotically?", options: ["n log n", "n^2", "2^n", "n!"], correct: 3, explanation: "Factorial complexity n! grows faster than exponential 2^n, quadratic n^2, and log-linear n log n." },
          { question: "Which is the correct ordering of growth rates from slowest to fastest?", options: ["O(1) < O(log n) < O(n) < O(n^2)", "O(n) < O(log n) < O(1) < O(2^n)", "O(log n) < O(1) < O(n log n) < O(n)", "O(n^2) < O(n log n) < O(n) < O(log n)"], correct: 0, explanation: "Constant O(1) is slowest, followed by logarithmic, linear, and quadratic growth." },
          { question: "Space complexity includes which of the following elements?", options: ["Only the stack frames for recursion", "Only the memory used by dynamic allocation", "Instruction space, data space, and environment stack space", "Only the size of input arguments"], correct: 2, explanation: "Space complexity includes fixed space (instructions, constants) and variable space (inputs, dynamically allocated memory, stack frames)." },
          { question: "What is the worst-case time complexity of Binary Search?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], correct: 1, explanation: "Binary Search repeatedly halves the search space, resulting in logarithmic O(log n) comparisons." },
          { question: "What is the best-case time complexity of Bubble Sort on an array that is already sorted?", options: ["O(1)", "O(n) (with optimized flag)", "O(n^2)", "O(n log n)"], correct: 1, explanation: "With an optimized flag that detects if no swaps were made, bubble sort can terminate early in O(n) time." },
          { question: "An algorithm with complexity O(2^n) is classified as having what type of complexity?", options: ["Polynomial", "Logarithmic", "Exponential", "Factorial"], correct: 2, explanation: "Functions of the form c^n where c > 1 represent exponential growth." },
          { question: "The recurrence T(n) = T(n-1) + O(1) solves to:", options: ["O(log n)", "O(n)", "O(n^2)", "O(n log n)"], correct: 1, explanation: "Adding a constant running time n times recursively results in a linear summation, resolving to O(n)." },
          { question: "Which notation represents the absolute best-case lower bound of an algorithm?", options: ["Big-O", "Big-Omega", "Big-Theta", "Small-o"], correct: 1, explanation: "Big-Omega provides the asymptotic lower bound, representing the minimum resources required." },
          { question: "Which complexity represents an algorithm that takes the same execution time regardless of input size?", options: ["O(1)", "O(log n)", "O(n)", "O(n!)"], correct: 0, explanation: "O(1) represents constant time complexity." },
          { question: "The average case complexity of Quick Sort is:", options: ["O(n)", "O(n log n)", "O(n^2)", "O(2^n)"], correct: 1, explanation: "Quick sort partitions arrays roughly in half on average, resulting in O(n log n) complexity." },
          { question: "What is the worst-case complexity of Quick Sort?", options: ["O(n log n)", "O(n^2)", "O(n^3)", "O(2^n)"], correct: 1, explanation: "In the worst case (when pivot partition is highly unbalanced, like on a sorted array), Quick Sort takes O(n^2) time." },
          { question: "Amortized analysis is used when:", options: ["An algorithm always takes the same time", "A rare expensive operation is averaged out over a sequence of cheap operations", "We want to analyze the best-case behavior", "We are executing code in a parallel system"], correct: 1, explanation: "Amortized analysis averages the time taken per operation over a series of operations to give a representative average." },
          { question: "Which of the following recurrences represents Merge Sort?", options: ["T(n) = 2T(n/2) + O(n)", "T(n) = T(n/2) + O(1)", "T(n) = 2T(n/2) + O(1)", "T(n) = T(n-1) + O(n)"], correct: 0, explanation: "Merge sort divides the array in half (2T(n/2)) and merges them in linear time (O(n))." },
          { question: "What is the complexity of searching a key in a hash table in the average case?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], correct: 0, explanation: "A hash table provides constant O(1) time lookup on average, assuming a good hash function." },
          { question: "Which of the following is NOT an algorithmic design technique?", options: ["Dynamic Programming", "Greedy Method", "Data Normalization", "Divide and Conquer"], correct: 2, explanation: "Data normalization is a database or data engineering process, not an algorithm design technique." },
          { question: "The Master Theorem can be applied to solve which of the following recurrences?", options: ["T(n) = 2T(sqrt(n)) + log n", "T(n) = 8T(n/2) + n^2", "T(n) = T(n-1) + n", "T(n) = T(n/2) + T(n/3) + n"], correct: 1, explanation: "Master Theorem applies to recurrences of the form T(n) = aT(n/b) + f(n) where a >= 1 and b > 1 are constants." }
        ],
        shortQuestions: [
          { question: "What is the difference between Big-O and Big-Theta notations?", answer: "Big-O (\\( O \\)) represents the asymptotic upper bound. It means the algorithm will run at least as fast as this bound (e.g., worst-case running time). Big-Theta (\\( \\Theta \\)) represents a tight bound, meaning the algorithm's running time is bounded both above and below by the given function for sufficiently large input sizes." },
          { question: "State the three cases of Master's Theorem.", answer: "For a recurrence \\( T(n) = aT(n/b) + f(n) \\) with \\( a \\ge 1, b > 1 \\):\n1. If \\( f(n) = O(n^c) \\) where \\( c < \\log_b a \\), then \\( T(n) = \\Theta(n^{\\log_b a}) \\).\n2. If \\( f(n) = \\Theta(n^c \\log^k n) \\) where \\( c = \\log_b a \\), then \\( T(n) = \\Theta(n^c \\log^{k+1} n) \\).\n3. If \\( f(n) = \\Omega(n^c) \\) where \\( c > \\log_b a \\), and a regularity condition holds, then \\( T(n) = \\Theta(f(n)) \\)." },
          { question: "Define Space Complexity and its components.", answer: "Space Complexity is the total memory space required by an algorithm to run to completion. It consists of two main parts:\n1. **Fixed Part**: Memory independent of instance characteristics (e.g., instruction space, simple variables, constants).\n2. **Variable Part**: Memory that depends on instance sizes (e.g., dynamic allocation arrays, recursion stack frame space, input data structures)." }
        ],
        longQuestions: [
          {
            question: "Formally explain asymptotic notations: Big-O, Big-Omega, and Big-Theta with mathematical definitions.",
            answer: "Asymptotic notations express the execution performance of algorithms as input size n grows infinitely:\n\n1. **Big-O Notation** (Upper Bound): \\( f(n) = O(g(n)) \\) if there exist positive constants \\( c \\) and \\( n_0 \\) such that \\( 0 \\le f(n) \\le c \\cdot g(n) \\) for all \\( n \\ge n_0 \\). It establishes the maximum execution time.\n\n2. **Big-Omega Notation** (Lower Bound): \\( f(n) = \\Omega(g(n)) \\) if there exist positive constants \\( c \\) and \\( n_0 \\) such that \\( 0 \\le c \\cdot g(n) \\le f(n) \\) for all \\( n \\ge n_0 \\). It establishes the minimum execution time.\n\n3. **Big-Theta Notation** (Tight Bound): \\( f(n) = \\Theta(g(n)) \\) if there exist positive constants \\( c_1, c_2, \\) and \\( n_0 \\) such that \\( 0 \\le c_1 \\cdot g(n) \\le f(n) \\le c_2 \\cdot g(n) \\) for all \\( n \\ge n_0 \\). This represents an exact rate of growth.",
            keyPoints: ["Big-O: f(n) <= c * g(n) (Asymptotic upper limit)", "Big-Omega: f(n) >= c * g(n) (Asymptotic lower limit)", "Big-Theta: c1 * g(n) <= f(n) <= c2 * g(n) (Tight bounding range)"]
          },
          {
            question: "Compare Time Complexity and Space Complexity analysis. Why is worst-case analysis preferred?",
            answer: "Time complexity analyzes the running time of an algorithm as a function of input size, measured by counting primitive computational steps. Space complexity analyzes the total memory layout consumed by the algorithm during execution.\n\nWorst-case analysis is generally preferred in engineering for three reasons:\n1. **Guarantee**: It provides an absolute upper bound guarantee that the algorithm will never perform worse than this limit, preventing critical runtime crashes in production.\n2. **Frequency**: For many algorithms, the worst-case scenario occurs frequently (e.g., searching for a non-existent item).\n3. **Clarity**: Best-case scenarios are often trivial (e.g., finding item at index 0 in linear search) and do not reflect algorithm efficiency.",
            keyPoints: ["Time complexity counts operations, Space complexity counts memory bytes used", "Worst-case provides a fail-safe maximum bound guarantee", "Best-case analysis is often trivial and uninformative for real engineering scalability"]
          }
        ],
        mnemonics: [
          { concept: "Asymptotic Bounds", phrase: "OOT (Out Of Time)", association: "**O**mega (Floor/Lower), **O** (Ceiling/Upper), **T**heta (Tight/Middle)" },
          { concept: "Algorithm Complexity Ordering", phrase: "C-L-L-Q-E (Cool Llama Likes Quiet Evenings)", association: "**C**onstant O(1), **L**ogarithmic O(log n), **L**inear O(n), **Q**uadratic O(n²), **E**xponential O(2^n)" }
        ],
        flashCards: [
          { question: "Big-O Notation", answer: "Asymptotic upper bound: describes the absolute worst-case growth rate of an algorithm." },
          { question: "Big-Omega Notation", answer: "Asymptotic lower bound: describes the absolute best-case growth rate of an algorithm." },
          { question: "Big-Theta Notation", answer: "Asymptotic tight bound: bounds the running time within a constant factor from both above and below." },
          { question: "Auxiliary Space", answer: "The extra space or temporary memory used by an algorithm, excluding the input size space." },
          { question: "Time-Space Tradeoff", answer: "Solving a computational problem by reducing execution time at the cost of consuming more memory, or vice versa." },
          { question: "Recurrence Relation", answer: "An equation or inequality that defines a function in terms of its values on smaller inputs (e.g. T(n) = 2T(n/2) + O(n))." }
        ]
      }
    }
  };

  // Helper dictionary of words to dynamically generate content for all other modules
  const vocab = {
    se: {
      topics: ["Agile Process", "Waterfall SDLC", "SRS documentation", "UML Diagrams", "Software Architecture", "Black-box testing", "White-box testing", "COCOMO estimation", "Function Points", "Project scheduling"],
      formulas: ["E = a * (KLOC)^b (COCOMO Effort)", "T = c * E^d (COCOMO Development Time)", "FP = UFP * CAF (Function Points formula)", "V(G) = E - V + 2 (Cyclomatic Complexity)"],
      mnemonics: [
        { concept: "Requirement Gathering Phases", phrase: "ERDV (Every Reader Does Validate)", association: "**E**licitation, **R**equirements-specification, **D**ocumentation, **V**alidation" },
        { concept: "SDLC Phases", phrase: "RC-DD-TIE (Red Cats Drink Dairy Tea In Evening)", association: "**R**equirements, **C**onceptual design, **D**etailed design, **D**evelopment, **T**esting, **I**ntegration, **E**volution" }
      ]
    },
    daa: {
      topics: ["Quick Sort", "Merge Sort", "Dynamic Programming", "Greedy Algorithms", "Dijkstra's Pathfinding", "Kruskal's MST", "Prim's Spanning Tree", "Binary Search Tree", "Knapsack Problem", "NP-Completeness"],
      formulas: ["T(n) = 2T(n/2) + O(n) (Merge Sort Recurrence)", "T(n) = T(n-1) + O(n) (Worst-case Quick Sort Recurrence)", "V - E + F = 2 (Euler's formula for graphs)", "O(V + E) (BFS/DFS Time Complexity)"],
      mnemonics: [
        { concept: "Greedy vs DP Strategy", phrase: "G-L-D-G (Go Local, Decide Global)", association: "**G**reedy selects **L**ocal optimums, **D**ynamic programming computes **G**lobal optimums via subproblems" },
        { concept: "NP-Complete Properties", phrase: "NP-C (Non-deterministic Polynomial Verification & Hardness)", association: "**N**P class membership (polynomial verification) + **P**olynomial **C**onversion (NP-Hard reduction)" }
      ]
    },
    fsd: {
      topics: ["React JSX rendering", "Virtual DOM diffing", "State vs Props", "React Router hooks", "Controlled Forms", "AngularJS Directives", "Scope ($scope)", "API fetch request", "CORS policy headers", "Single Page Applications"],
      formulas: ["ReactDOM.render() (Mounting function)", "useEffect(() => {}, []) (React Component Lifecycle Hook)", "ng-repeat (Angular loop directive)", "fetch(url).then(res => res.json()) (Promise chaining)"],
      mnemonics: [
        { concept: "React Lifecycle Phases", phrase: "M-U-U (Many Users Update)", association: "**M**ounting, **U**pdating, **U**nmounting" },
        { concept: "State vs Props", phrase: "S-I-P-E (State Internal, Props External)", association: "**S**tate is **I**nternal component data, **P**rops are **E**xternal configurations passed down" }
      ]
    },
    ml: {
      topics: ["Supervised classification", "Unsupervised clustering", "Gradient Descent tuning", "Overfitting regularization", "Bias-variance tradeoff", "Decision Tree split", "Random Forest ensembles", "Bagging & Boosting", "K-Means centroids", "Support Vector Machines"],
      formulas: ["y = mx + c (Linear Regression line)", "J(w, b) = 1/2m * sum(y_hat - y)^2 (Mean Squared Error Loss)", "E(bias, var) = Bias^2 + Variance + Noise (Error decomposition)", "P(A|B) = P(B|A)*P(A)/P(B) (Bayes Theorem)"],
      mnemonics: [
        { concept: "ML Types", phrase: "S-U-R (Super Users Rule)", association: "**S**upervised, **U**nsupervised, **R**einforcement Learning" },
        { concept: "Evaluation Metrics", phrase: "P-R-F1 (Please Recall Formula 1)", association: "**P**recision, **R**ecall, **F**1-score" }
      ]
    }
  };

  // Dynamic Generator to construct 25 MCQs, One-Liners, Short, Long, Mnemonics, Flashcards for other modules
  ExamPrepData.getModuleData = function (subjectId, moduleId) {
    // If we have custom hardcoded data, return it
    if (customData[subjectId] && customData[subjectId][moduleId]) {
      return customData[subjectId][moduleId];
    }

    // Otherwise, generate standard realistic dummy data dynamically using vocabulary definitions
    const subVocab = vocab[subjectId] || vocab.se;
    const numTopics = subVocab.topics.length;
    
    // 1. One-Liners
    const oneLiners = [];
    for (let i = 0; i < 6; i++) {
      const topic = subVocab.topics[(moduleId + i) % numTopics];
      const formula = subVocab.formulas[(moduleId + i) % subVocab.formulas.length];
      if (i % 2 === 0) {
        oneLiners.push({
          fact: `${topic} is a critical core concept in BCA Semester 5 exam syllabus representing structural design constraints.`,
          category: "Definition"
        });
      } else {
        oneLiners.push({
          fact: `The mathematical execution or expression is modeled as: ${formula}. Under worst-case environments, this defines scalability.`,
          category: "Formula"
        });
      }
    }

    // 2. MCQs (Generate 20 questions)
    const mcqs = [];
    for (let i = 1; i <= 20; i++) {
      const topicIdx = (moduleId * 3 + i) % numTopics;
      const topic = subVocab.topics[topicIdx];
      const formula = subVocab.formulas[i % subVocab.formulas.length];
      
      const isFormulaQ = i % 3 === 0;
      
      if (isFormulaQ) {
        mcqs.push({
          question: `Which formula or representation is mathematically associated with ${topic} evaluation in academic exams?`,
          options: [
            `${formula}`,
            `O(n!) complexity ceiling`,
            `V(G) = E - V + 5 scaling model`,
            `Standard regression constraint`
          ],
          correct: 0,
          explanation: `The mathematical standard for evaluating ${topic} is represented exactly by ${formula}.`
        });
      } else if (i % 2 === 0) {
        mcqs.push({
          question: `What is the primary objective of implementing ${topic} in a software program?`,
          options: [
            `To increase compile-time overhead in enterprise applications`,
            `To optimize system performance and satisfy functional constraints`,
            `To override local style sheets and theme parameters`,
            `To encrypt network communication streams`
          ],
          correct: 1,
          explanation: `Implementing ${topic} aims to optimize operational characteristics like execution time, storage space, or maintainability.`
        });
      } else {
        mcqs.push({
          question: `In standard university examinations, ${topic} is characterized as which of the following?`,
          options: [
            `A depreciated system function`,
            `An administrative database setting`,
            `A fundamental architectural pillar or methodology`,
            `A hardware-only optimization vector`
          ],
          correct: 2,
          explanation: `${topic} is a core academic design pattern studied in BCA syllabus as a software/logical standard.`
        });
      }
    }

    // 3. Short Questions (2-3 Mark)
    const shortQuestions = [];
    for (let i = 1; i <= 3; i++) {
      const topic = subVocab.topics[(moduleId * 2 + i) % numTopics];
      shortQuestions.push({
        question: `Explain the core purpose and significance of ${topic} in 2-3 sentences.`,
        answer: `${topic} provides a structured framework for solving complexity constraints in this module. It allows developers to abstract execution details, reduce logical dependencies, and ensure the system scales efficiently under heavy workload operations. In exam environments, always highlight its operational efficiency and typical use cases.`
      });
    }

    // 4. Long Questions (5 Mark)
    const longQuestions = [];
    for (let i = 1; i <= 2; i++) {
      const topicA = subVocab.topics[(moduleId + i) % numTopics];
      const topicB = subVocab.topics[(moduleId + i + 2) % numTopics];
      longQuestions.push({
        question: `Discuss the structural implementation of ${topicA} and compare its advantages with ${topicB}.`,
        answer: `${topicA} represents a standard methodology focused on logical segregation. Its main advantages include high modularity, simplified unit testing, and improved developer collaboration. However, it requires initial design planning which increases system overhead.\n\nConversely, ${topicB} is optimized for rapid execution and direct execution contexts. While it yields lower latency and smaller memory footprints, it lacks the maintainability and flexibility of ${topicA}. Engineers must analyze project specifications, resource constraints, and scaling goals to select the optimal approach for production deployments.`,
        keyPoints: [
          `${topicA}: Modularity, testing isolation, high initial architectural planning`,
          `${topicB}: High performance execution, reduced latency, rigid coupling`,
          "Trade-off selection is governed by CPU/memory profiles and timeline restrictions"
        ]
      });
    }

    // 5. Mnemonics
    const mnemonics = [];
    const baseMnemonic = subVocab.mnemonics[moduleId % subVocab.mnemonics.length];
    mnemonics.push({
      concept: baseMnemonic.concept,
      phrase: baseMnemonic.phrase,
      association: baseMnemonic.association
    });
    mnemonics.push({
      concept: `Module ${moduleId} Core Pillars`,
      phrase: "R-S-V-P (Revision Starts Very Promptly)",
      association: "**R**equirements, **S**tructured algorithms, **V**alidation tests, **P**rogress metrics"
    });

    // 6. Flash Cards
    const flashCards = [];
    for (let i = 1; i <= 6; i++) {
      const topic = subVocab.topics[(moduleId + i * 2) % numTopics];
      flashCards.push({
        question: `What is the key takeaway for ${topic}?`,
        answer: `${topic} is a crucial method that enables computational efficiency, structured logic, and seamless integration in Semester 5 applications.`
      });
    }

    return {
      oneLiners,
      mcqs,
      shortQuestions,
      longQuestions,
      mnemonics,
      flashCards
    };
  };

  window.ExamPrepData = ExamPrepData;
})();
