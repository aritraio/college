# MCQs

**1. Which asymptotic notation is used to define an asymptotic upper bound, representing the worst-case scenario of an algorithm?**
A) $\Omega$ (Big-Omega)
B) $\Theta$ (Big-Theta)
C) $O$ (Big-O)
D) $\omega$ (Little-omega)
**Answer:** C

**2. Space complexity is strictly defined as:**
A) The amount of time an algorithm takes to execute completely.
B) The total amount of computer memory an algorithm requires to run to completion.
C) The size of the compiled binary executable file.
D) The number of lines of code in the algorithm.
**Answer:** B

**3. If an algorithm's execution time is bounded from both above and below by the same function (ignoring constant factors), which notation is the most accurate to use?**
A) $O$
B) $\Omega$
C) $o$
D) $\Theta$
**Answer:** D

**4. What is the fundamental difference between $O$ (Big-O) and $o$ (Little-o) notation?**
A) $O$ is an inclusive upper bound ($f(n) \le c \cdot g(n)$), while $o$ is a strict upper bound ($f(n) < c \cdot g(n)$).
B) $O$ is for time complexity, and $o$ is for space complexity.
C) $O$ represents an upper bound, while $o$ represents a lower bound.
D) There is no mathematical difference; they are used interchangeably.
**Answer:** A

**5. In the Master Theorem formula $T(n) = aT(n/b) + f(n)$, what do the parameters $a$ and $b$ represent?**
A) $a$ is the size of the subproblems, $b$ is the number of subproblems.
B) $a$ is the number of subproblems, $b$ is the factor by which the subproblem size is divided.
C) $a$ is the cost of dividing, $b$ is the cost of conquering.
D) $a$ and $b$ are arbitrary constants that hold no physical meaning.
**Answer:** B

**6. Which statement accurately describes a "Time-Space Trade-off"?**
A) Reducing the execution time of an algorithm always guarantees a reduction in memory usage.
B) You can often decrease the execution time of an algorithm by utilizing more memory, or decrease memory usage at the cost of slower execution.
C) Modern processors eliminate the need to balance time and space.
D) Time and space complexity are completely independent and cannot influence each other.
**Answer:** B

**7. When using the Recurrence Tree method, the total cost of the algorithm is determined by:**
A) The cost of the root node alone.
B) The height of the tree multiplied by the number of leaves.
C) Summing the costs of the nodes across all levels of the tree.
D) The number of recursive calls made in the first step.
**Answer:** C

**8. Mathematically, $f(n) = \omega(g(n))$ implies which of the following limit conditions as $n \to \infty$?**
A) $\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0$
B) $\lim_{n \to \infty} \frac{f(n)}{g(n)} = \infty$
C) $\lim_{n \to \infty} \frac{f(n)}{g(n)} = c$, where $c > 0$
D) $\lim_{n \to \infty} \frac{g(n)}{f(n)} = \infty$
**Answer:** B

**9. The Substitution Method for solving recurrences strictly requires the use of which mathematical proof technique?**
A) Proof by contradiction
B) Proof by exhaustion
C) Mathematical induction
D) Pigeonhole principle
**Answer:** C

**10. Why is empirical analysis (writing programs and timing them) fundamentally flawed for proving absolute algorithmic complexity?**
A) It depends heavily on the hardware, language, compiler, and specific inputs used during the test.
B) It is impossible to write programs that test worst-case scenarios.
C) Timers on modern operating systems lack the precision to measure algorithms.
D) Compilers automatically change the asymptotic bounds of code.
**Answer:** A
