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
          { fact: "Big-O \\( O(g(n)) \\) notation defines an asymptotic upper bound: there exist positive constants \\( c \\) and \\( n_0 \\) such that \\( 0 \\le f(n) \\le c \\cdot g(n) \\) for all \\( n \\ge n_0 \\).", category: "Formula" },
          { fact: "Big-Theta \\( \\Theta(g(n)) \\) notation represents an asymptotically tight bound, meaning the function is bounded from both above and below by the same growth rate.", category: "Concept" },
          { fact: "A time-space trade-off is a design choice where one resource (usually execution time) is reduced at the expense of increasing another resource (usually memory consumption), or vice versa.", category: "Concept" },
          { fact: "The primary limitation of the Master's Theorem is that it can only solve divide-and-conquer recurrences of form \\( T(n) = aT(n/b) + f(n) \\) and fails if the recurrence does not fit one of its three cases.", category: "Concept" },
          { fact: "Difference between Big-O and Big-Omega: Big-O provides an asymptotic upper bound (worst-case), whereas Big-Omega provides an asymptotic lower bound (best-case).", category: "Concept" },
          { fact: "The two essential steps in the Substitution Method are: first, guess the exact form of the solution; second, use mathematical induction to prove the guess is correct.", category: "Concept" },
          { fact: "A recurrence tree represents costs by mapping recursive decomposition; each node represents the cost of a single subproblem, and total cost is the sum of all nodes.", category: "Concept" },
          { fact: "Little-omega \\( \\omega(g(n)) \\) notation represents a strict asymptotic lower bound, meaning \\( f(n) \\) grows strictly faster than \\( g(n) \\) (\\( \\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = \\infty \\)).", category: "Formula" },
          { fact: "Using asymptotic notations instead of exact execution times isolates the algorithm's inherent growth rate regarding input size, stripping away hardware and language-specific constants.", category: "Concept" },
          { fact: "The purpose of empirical analysis (writing programs and timing them) in this module is to provide practical validation of theoretical asymptotic bounds, observing how constants and lower-order terms behave in reality.", category: "Concept" }
        ],
        mcqs: [
          {
            question: "Which asymptotic notation is used to define an asymptotic upper bound, representing the worst-case scenario of an algorithm?",
            options: [
              "\\( \\Omega \\) (Big-Omega)",
              "\\( \\Theta \\) (Big-Theta)",
              "\\( O \\) (Big-O)",
              "\\( \\omega \\) (Little-omega)"
            ],
            correct: 2,
            explanation: "Big-O notation provides an asymptotic upper bound, representing the worst-case scenario where the running time grows no faster than a constant multiple of the bounding function."
          },
          {
            question: "Space complexity is strictly defined as:",
            options: [
              "The amount of time an algorithm takes to execute completely.",
              "The total amount of computer memory an algorithm requires to run to completion.",
              "The size of the compiled binary executable file.",
              "The number of lines of code in the algorithm."
            ],
            correct: 1,
            explanation: "Space complexity measures the total amount of memory space (including variables, instruction execution space, input data, and system stack space) required by an algorithm to run to completion."
          },
          {
            question: "If an algorithm's execution time is bounded from both above and below by the same function (ignoring constant factors), which notation is the most accurate to use?",
            options: [
              "\\( O \\)",
              "\\( \\Omega \\)",
              "\\( o \\)",
              "\\( \\Theta \\)"
            ],
            correct: 3,
            explanation: "Big-Theta (\\( \\Theta \\)) notation represents an asymptotically tight bound, which squeeze-bounds a function from both above and below."
          },
          {
            question: "What is the fundamental difference between \\( O \\) (Big-O) and \\( o \\) (Little-o) notation?",
            options: [
              "\\( O \\) is an inclusive upper bound (\\( f(n) \\le c \\cdot g(n) \\)), while \\( o \\) is a strict upper bound (\\( f(n) < c \\cdot g(n) \\)).",
              "\\( O \\) is for time complexity, and \\( o \\) is for space complexity.",
              "\\( O \\) represents an upper bound, while \\( o \\) represents a lower bound.",
              "There is no mathematical difference; they are used interchangeably."
            ],
            correct: 0,
            explanation: "Big-O is an inclusive upper bound (allowing the function to grow at the same rate, \\( \\le \\)), whereas Little-o is a strict upper bound (the function must grow strictly slower, \\( < \\))."
          },
          {
            question: "In the Master Theorem formula \\( T(n) = aT(n/b) + f(n) \\), what do the parameters \\( a \\) and \\( b \\) represent?",
            options: [
              "\\( a \\) is the size of the subproblems, \\( b \\) is the number of subproblems.",
              "\\( a \\) is the number of subproblems, \\( b \\) is the factor by which the subproblem size is divided.",
              "\\( a \\) is the cost of dividing, \\( b \\) is the cost of conquering.",
              "\\( a \\) and \\( b \\) are arbitrary constants that hold no physical meaning."
            ],
            correct: 1,
            explanation: "In the divide-and-conquer recurrence, \\( a \\) is the number of subproblems recursively solved, and \\( b \\) is the division factor reducing the input size."
          },
          {
            question: "Which statement accurately describes a \"Time-Space Trade-off\"?",
            options: [
              "Reducing the execution time of an algorithm always guarantees a reduction in memory usage.",
              "You can often decrease the execution time of an algorithm by utilizing more memory, or decrease memory usage at the cost of slower execution.",
              "Modern processors eliminate the need to balance time and space.",
              "Time and space complexity are completely independent and cannot influence each other."
            ],
            correct: 1,
            explanation: "A Time-Space Trade-off means you can sacrifice space (e.g. by using a lookup table or cache) to achieve faster execution times, or conserve space by recalculating values when needed, increasing execution time."
          },
          {
            question: "When using the Recurrence Tree method, the total cost of the algorithm is determined by:",
            options: [
              "The cost of the root node alone.",
              "The height of the tree multiplied by the number of leaves.",
              "Summing the costs of the nodes across all levels of the tree.",
              "The number of recursive calls made in the first step."
            ],
            correct: 2,
            explanation: "The total cost of a recurrence tree is calculated by summing the horizontal costs at each individual level across all levels of the tree."
          },
          {
            question: "Mathematically, \\( f(n) = \\omega(g(n)) \\) implies which of the following limit conditions as \\( n \\to \\infty \\)?",
            options: [
              "\\( \\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = 0 \\)",
              "\\( \\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = \\infty \\)",
              "\\( \\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = c \\), where \\( c > 0 \\)",
              "\\( \\lim_{n \\to \\infty} \\frac{g(n)}{f(n)} = \\infty \\)"
            ],
            correct: 1,
            explanation: "Little-omega (\\( \\omega \\)) represents a strict asymptotic lower bound. If \\( f(n) = \\omega(g(n)) \\), then \\( f(n) \\) grows strictly faster than \\( g(n) \\), meaning the limit of their ratio is infinity."
          },
          {
            question: "The Substitution Method for solving recurrences strictly requires the use of which mathematical proof technique?",
            options: [
              "Proof by contradiction",
              "Proof by exhaustion",
              "Mathematical induction",
              "Pigeonhole principle"
            ],
            correct: 2,
            explanation: "The Substitution method relies on making a guess of the solution and then using mathematical induction to find the constants and prove that the guess holds true."
          },
          {
            question: "Why is empirical analysis (writing programs and timing them) fundamentally flawed for proving absolute algorithmic complexity?",
            options: [
              "It depends heavily on the hardware, language, compiler, and specific inputs used during the test.",
              "It is impossible to write programs that test worst-case scenarios.",
              "Timers on modern operating systems lack the precision to measure algorithms.",
              "Compilers automatically change the asymptotic bounds of code."
            ],
            correct: 0,
            explanation: "Empirical timings represent execution behavior on a single system and are heavily influenced by the CPU speed, RAM, background system load, programming language, and compiler optimizations."
          }
        ],
        shortQuestions: [
          {
            question: "Differentiate between Big-O and Little-o notation using limit definitions.",
            answer: "Big-O (\\( O \\)) indicates that a function grows no faster than a certain rate (inclusive upper bound). Little-o (\\( o \\)) indicates that a function grows strictly slower than a certain rate (strict upper bound). Mathematically, using limits:\n\n• For \\( f(n) = O(g(n)) \\), \\( \\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = c \\), where \\( 0 \\le c < \\infty \\).\n• For \\( f(n) = o(g(n)) \\), the limit must equal exactly zero: \\( \\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = 0 \\)."
          },
          {
            question: "Explain the mathematical significance of \\( \\Theta \\) notation.",
            answer: "\\( \\Theta \\) notation mathematically signifies that two functions grow at the exact same rate asymptotically, ignoring constant factors and lower-order terms. It provides a tight bound, meaning it simultaneously acts as an upper bound (\\( O \\)) and a lower bound (\\( \\Omega \\)). An algorithm is \\( \\Theta(g(n)) \\) if and only if it is both \\( O(g(n)) \\) and \\( \\Omega(g(n)) \\)."
          },
          {
            question: "Outline the procedure to solve a recurrence relation using the Substitution Method.",
            answer: "The substitution method relies heavily on mathematical intuition and rigor. It involves two steps:\n\n1. **Guess**: Formulate a hypothesis for the asymptotic bound of the solution.\n2. **Induction**: Use mathematical induction to prove the guess holds. This involves proving a base case, assuming the bound holds for a value \\( k < n \\), and substituting this assumption into the original recurrence to prove it holds for \\( n \\)."
          },
          {
            question: "Briefly explain the mechanics of the Recurrence Tree method.",
            answer: "The Recurrence Tree method converts a recurrence equation into a tree structure. The root is the initial cost. Each child node represents the cost of the recursive subproblems. The tree is expanded down to the base cases (the leaves). The total execution time is calculated by summing the costs horizontally across each level, and then summing those level totals vertically from root to leaves."
          },
          {
            question: "Why is empirical analysis (finding time complexities by writing programs) insufficient on its own?",
            answer: "Empirical analysis measures execution time in milliseconds/seconds on a physical machine. This data is polluted by the CPU speed, available RAM, background OS processes, the compiler's optimization algorithms, and the specific test data used. It does not yield a mathematical proof of how the algorithm scales as \\( n \\to \\infty \\). It is only useful for validating theoretical asymptotic bounds, not defining them."
          }
        ],
        longQuestions: [
          {
            question: "Discuss the five asymptotic notations (\\( O, \\Omega, \\Theta, o, \\omega \\)) in detail. Define them mathematically and explain their significance in algorithm analysis.",
            answer: "Asymptotic notations are mathematical tools used to describe the limiting behavior of an algorithm's execution time or space as the input size \\( n \\) tends toward infinity.\n\n1. **\\( O \\)-notation (Big-O): Asymptotic Upper Bound.**\n• *Math*: \\( O(g(n)) = \\{f(n): \\exists \\text{ constants } c, n_0 > 0 \\text{ such that } 0 \\le f(n) \\le c \\cdot g(n) \\text{ for all } n \\ge n_0\\} \\).\n• *Significance*: Defines the worst-case scenario. It guarantees the algorithm will not take longer than this bound.\n\n2. **\\( \\Omega \\)-notation (Big-Omega): Asymptotic Lower Bound.**\n• *Math*: \\( \\Omega(g(n)) = \\{f(n): \\exists \\text{ constants } c, n_0 > 0 \\text{ such that } 0 \\le c \\cdot g(n) \\le f(n) \\text{ for all } n \\ge n_0\\} \\).\n• *Significance*: Defines the best-case scenario or a fundamental limitation. The algorithm will take *at least* this much time.\n\n3. **\\( \\Theta \\)-notation (Big-Theta): Asymptotically Tight Bound.**\n• *Math*: \\( \\Theta(g(n)) = \\{f(n): \\exists \\text{ constants } c_1, c_2, n_0 > 0 \\text{ such that } 0 \\le c_1 \\cdot g(n) \\le f(n) \\le c_2 \\cdot g(n) \\text{ for all } n \\ge n_0\\} \\).\n• *Significance*: The most precise notation. It means the best-case and worst-case grow at the exact same rate.\n\n4. **\\( o \\)-notation (Little-o): Strict Upper Bound.**\n• *Math*: \\( o(g(n)) = \\{f(n): \\text{for any constant } c > 0, \\exists \\text{ a constant } n_0 > 0 \\text{ such that } 0 \\le f(n) < c \\cdot g(n) \\text{ for all } n \\ge n_0\\} \\) (\\( \\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = 0 \\)).\n• *Significance*: Used when an upper bound is not asymptotically tight. \\( f(n) \\) becomes insignificant compared to \\( g(n) \\).\n\n5. **\\( \\omega \\)-notation (Little-omega): Strict Lower Bound.**\n• *Math*: \\( \\omega(g(n)) = \\{f(n): \\text{for any constant } c > 0, \\exists \\text{ a constant } n_0 > 0 \\text{ such that } 0 \\le c \\cdot g(n) < f(n) \\text{ for all } n \\ge n_0\\} \\) (\\( \\lim_{n \\to \\infty} \\frac{f(n)}{g(n)} = \\infty \\)).\n• *Significance*: The inverse of little-o. \\( f(n) \\) grows strictly faster than \\( g(n) \\).",
            keyPoints: [
              "Big-O, Big-Omega, Big-Theta define inclusive upper, lower, and tight bounds respectively",
              "Little-o and Little-omega define strict upper and lower bounds (limit conditions 0 and infinity)",
              "Significance: isolates growth rate to predict software scaling characteristics independent of hardware"
            ]
          },
          {
            question: "State the Master's Theorem. Detail the three standard cases used to solve recurrences of the form \\( T(n) = aT(n/b) + f(n) \\).",
            answer: "The Master Theorem provides a cookbook method for solving recurrence relations that result from divide-and-conquer algorithms. It applies to recurrences of the form:\n\n\\[ T(n) = aT(n/b) + f(n) \\]\n\nWhere:\n• \\( a \\ge 1 \\) is the number of subproblems.\n• \\( b > 1 \\) is the factor by which the input size is divided.\n• \\( f(n) \\) is the cost of dividing the problem and combining the results.\n\nThe theorem compares \\( f(n) \\) to the function \\( n^{\\log_b a} \\) (the watershed function). There are three distinct cases based on this comparison:\n\n• **Case 1: \\( f(n) \\) is polynomially smaller than \\( n^{\\log_b a} \\).**\n  - Condition: If \\( f(n) = O(n^{\\log_b a - \\epsilon}) \\) for some constant \\( \\epsilon > 0 \\).\n  - Result: \\( T(n) = \\Theta(n^{\\log_b a}) \\).\n  - *Logic*: The cost is dominated by the leaves of the recursion tree.\n\n• **Case 2: \\( f(n) \\) is similar in growth to \\( n^{\\log_b a} \\).**\n  - Condition: If \\( f(n) = \\Theta(n^{\\log_b a}) \\).\n  - Result: \\( T(n) = \\Theta(n^{\\log_b a} \\cdot \\log n) \\).\n  - *Logic*: The cost is evenly distributed across all levels of the tree.\n\n• **Case 3: \\( f(n) \\) is polynomially larger than \\( n^{\\log_b a} \\).**\n  - Condition: If \\( f(n) = \\Omega(n^{\\log_b a + \\epsilon}) \\) for some \\( \\epsilon > 0 \\), AND it satisfies the regularity condition: \\( a \\cdot f(n/b) \\le c \\cdot f(n) \\) for some constant \\( c < 1 \\) and sufficiently large \\( n \\).\n  - Result: \\( T(n) = \\Theta(f(n)) \\).\n  - *Logic*: The cost is dominated by the root of the recursion tree.",
            keyPoints: [
              "Divide-and-conquer format: T(n) = aT(n/b) + f(n) with a >= 1, b > 1",
              "Case 1: Leaves dominate (T(n) = Theta(n^(log_b a)))",
              "Case 2: Distributed costs (T(n) = Theta(n^(log_b a) * log n))",
              "Case 3: Root dominates (T(n) = Theta(f(n))) subject to regularity condition a*f(n/b) <= c*f(n)"
            ]
          },
          {
            question: "Analyze the process of solving a recurrence relation using the Recurrence Tree method. Illustrate how it calculates the total cost of an algorithm.",
            answer: "The Recurrence Tree method is a visual and algebraic way to determine the sum of costs for executing a recursive algorithm. It avoids the pure guesswork of the substitution method by mapping out the algorithm's execution flow.\n\n**Step-by-Step Breakdown:**\n\n1. **Decomposition**: The initial equation \\( T(n) \\) forms the root node. If the recurrence is \\( T(n) = 2T(n/2) + cn \\), the root node has a cost of \\( cn \\).\n2. **Branching**: The root node splits into branches representing the subproblems. In \\( T(n) = 2T(n/2) \\), there are 2 branches, each representing a node of size \\( n/2 \\). The cost at this second level for each node is \\( c(n/2) \\).\n3. **Expansion**: This branching continues. Level 2 will have 4 nodes of size \\( n/4 \\). Level \\( i \\) will have \\( 2^i \\) nodes of size \\( n/2^i \\).\n4. **Determine Tree Depth**: The tree stops expanding when the subproblem size reaches the base case (usually size 1). For a division by 2, the depth of the tree is \\( \\log_2 n \\).\n5. **Calculate Level Costs**: Sum the costs horizontally across each level.\n   • Level 0 (Root): \\( cn \\)\n   • Level 1: \\( 2 \\cdot c(n/2) = cn \\)\n   • Level 2: \\( 4 \\cdot c(n/4) = cn \\)\n6. **Sum Total Cost**: Add the costs of all levels together. In this example, there are \\( \\log_2 n \\) levels, and each level costs \\( cn \\).\n7. **Result**: The total cost is \\( cn \\cdot \\log_2 n \\), which simplifies to an asymptotic bound of \\( \\Theta(n \\log n) \\).",
            keyPoints: [
              "Deconstruct recursive subproblems into nodes of a tree structure",
              "Compute costs horizontally across each tree level",
              "Determine tree height/depth using input division factors",
              "Sum costs vertically across all levels to find final bound (e.g. Theta(n log n) for Merge Sort)"
            ]
          }
        ],
        mnemonics: [
          { concept: "Asymptotic Bounds", phrase: "OOT (Out Of Time)", association: "**O**mega (Floor/Lower), **O** (Ceiling/Upper), **T**heta (Tight/Middle)" },
          { concept: "Algorithm Complexity Ordering", phrase: "C-L-L-Q-E (Cool Llama Likes Quiet Evenings)", association: "**C**onstant O(1), **L**ogarithmic O(log n), **L**inear O(n), **Q**uadratic O(n²), **E**xponential O(2^n)" }
        ],
        flashCards: [
          { question: "\\( \\Theta(g(n)) \\) Mathematical Definition", answer: "\\( c_1 \\cdot g(n) \\le f(n) \\le c_2 \\cdot g(n) \\) for all \\( n \\ge n_0 \\) (where \\( c_1, c_2, n_0 > 0 \\)). It is a tight bound." },
          { question: "Master Theorem Standard Form", answer: "\\( T(n) = aT(n/b) + f(n) \\), where \\( a \\ge 1 \\) (number of subproblems) and \\( b > 1 \\) (division factor of the problem size)." },
          { question: "\\( o(g(n)) \\) vs \\( O(g(n)) \\)", answer: "Big-O (\\( O \\)) is an inclusive upper bound (\\( \\le \\)). Little-o (\\( o \\)) is a strict upper bound (\\( < \\)). In Little-o, \\( f(n) \\) becomes insignificant relative to \\( g(n) \\) as \\( n \\to \\infty \\)." },
          { question: "Recurrence Tree Method Application", answer: "Best used to generate a good 'guess' for the time complexity bound, which must then usually be proven rigorously using the Substitution Method." },
          { question: "\\( \\Omega(g(n)) \\) Mathematical Definition", answer: "\\( 0 \\le c \\cdot g(n) \\le f(n) \\) for all \\( n \\ge n_0 \\). It represents an asymptotic lower bound." },
          { question: "Time-Space Trade-off Example", answer: "Lookup tables or caching (Memoization). You use extra space (memory) to store precomputed results, saving time (CPU cycles) by not recalculating them." }
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
