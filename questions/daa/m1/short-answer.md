# Short Answer Questions

**1. Differentiate between Big-O and Little-o notation using limit definitions.**
**Answer:** Big-O ($O$) indicates that a function grows no faster than a certain rate (inclusive upper bound). Little-o ($o$) indicates that a function grows strictly slower than a certain rate (strict upper bound). Mathematically, using limits:

* For $f(n) = O(g(n))$, $\lim_{n \to \infty} \frac{f(n)}{g(n)} = c$, where $0 \le c < \infty$.
* For $f(n) = o(g(n))$, the limit must equal exactly zero: $\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0$.

**2. Explain the mathematical significance of $\Theta$ notation.**
**Answer:** $\Theta$ notation mathematically signifies that two functions grow at the exact same rate asymptotically, ignoring constant factors and lower-order terms. It provides a tight bound, meaning it simultaneously acts as an upper bound ($O$) and a lower bound ($\Omega$). An algorithm is $\Theta(g(n))$ if and only if it is both $O(g(n))$ and $\Omega(g(n))$.

**3. Outline the procedure to solve a recurrence relation using the Substitution Method.**
**Answer:** The substitution method relies heavily on mathematical intuition and rigor. It involves two steps:

1. **Guess:** Formulate a hypothesis for the asymptotic bound of the solution.
2. **Induction:** Use mathematical induction to prove the guess holds. This involves proving a base case, assuming the bound holds for a value $k < n$, and substituting this assumption into the original recurrence to prove it holds for $n$.

**4. Briefly explain the mechanics of the Recurrence Tree method.**
**Answer:** The Recurrence Tree method converts a recurrence equation into a tree structure. The root is the initial cost. Each child node represents the cost of the recursive subproblems. The tree is expanded down to the base cases (the leaves). The total execution time is calculated by summing the costs horizontally across each level, and then summing those level totals vertically from root to leaves.

**5. Why is empirical analysis (finding time complexities by writing programs) insufficient on its own?**
**Answer:** Empirical analysis measures execution time in milliseconds/seconds on a physical machine. This data is polluted by the CPU speed, available RAM, background OS processes, the compiler's optimization algorithms, and the specific test data used. It does not yield a mathematical proof of how the algorithm scales as $n \to \infty$. It is only useful for validating theoretical asymptotic bounds, not defining them.
