# Long Answer Questions

**1. Discuss the five asymptotic notations ($O$, $\Omega$, $\Theta$, $o$, $\omega$) in detail. Define them mathematically and explain their significance in algorithm analysis.**
**Answer:**
Asymptotic notations are mathematical tools used to describe the limiting behavior of an algorithm's execution time or space as the input size $n$ tends toward infinity.

1. **$O$-notation (Big-O): Asymptotic Upper Bound.**
* *Math:* $O(g(n)) = \{f(n): \exists \text{ constants } c, n_0 > 0 \text{ such that } 0 \le f(n) \le c \cdot g(n) \text{ for all } n \ge n_0\}$.
* *Significance:* Defines the worst-case scenario. It guarantees the algorithm will not take longer than this bound.

2. **$\Omega$-notation (Big-Omega): Asymptotic Lower Bound.**
* *Math:* $\Omega(g(n)) = \{f(n): \exists \text{ constants } c, n_0 > 0 \text{ such that } 0 \le c \cdot g(n) \le f(n) \text{ for all } n \ge n_0\}$.
* *Significance:* Defines the best-case scenario or a fundamental limitation. The algorithm will take *at least* this much time.

3. **$\Theta$-notation (Big-Theta): Asymptotically Tight Bound.**
* *Math:* $\Theta(g(n)) = \{f(n): \exists \text{ constants } c_1, c_2, n_0 > 0 \text{ such that } 0 \le c_1 \cdot g(n) \le f(n) \le c_2 \cdot g(n) \text{ for all } n \ge n_0\}$.
* *Significance:* The most precise notation. It means the best-case and worst-case grow at the exact same rate.

4. **$o$-notation (Little-o): Strict Upper Bound.**
* *Math:* $o(g(n)) = \{f(n): \text{for any constant } c > 0, \exists \text{ a constant } n_0 > 0 \text{ such that } 0 \le f(n) < c \cdot g(n) \text{ for all } n \ge n_0\}$. ($\lim_{n \to \infty} \frac{f(n)}{g(n)} = 0$)
* *Significance:* Used when an upper bound is not asymptotically tight. $f(n)$ becomes insignificant compared to $g(n)$.

5. **$\omega$-notation (Little-omega): Strict Lower Bound.**
* *Math:* $\omega(g(n)) = \{f(n): \text{for any constant } c > 0, \exists \text{ a constant } n_0 > 0 \text{ such that } 0 \le c \cdot g(n) < f(n) \text{ for all } n \ge n_0\}$. ($\lim_{n \to \infty} \frac{f(n)}{g(n)} = \infty$)
* *Significance:* The inverse of little-o. $f(n)$ grows strictly faster than $g(n)$.


**2. State the Master's Theorem. Detail the three standard cases used to solve recurrences of the form $T(n) = aT(n/b) + f(n)$.**
**Answer:**
The Master Theorem provides a cookbook method for solving recurrence relations that result from divide-and-conquer algorithms. It applies to recurrences of the form:

$$T(n) = aT(n/b) + f(n)$$

Where:
* $a \ge 1$ is the number of subproblems.
* $b > 1$ is the factor by which the input size is divided.
* $f(n)$ is the cost of dividing the problem and combining the results.

The theorem compares $f(n)$ to the function $n^{\log_b a}$ (the watershed function). There are three distinct cases based on this comparison:

* **Case 1: $f(n)$ is polynomially smaller than $n^{\log_b a}$.**
* Condition: If $f(n) = O(n^{\log_b a - \epsilon})$ for some constant $\epsilon > 0$.
* Result: $T(n) = \Theta(n^{\log_b a})$.
* *Logic:* The cost is dominated by the leaves of the recursion tree.

* **Case 2: $f(n)$ is similar in growth to $n^{\log_b a}$.**
* Condition: If $f(n) = \Theta(n^{\log_b a})$.
* Result: $T(n) = \Theta(n^{\log_b a} \cdot \log n)$.
* *Logic:* The cost is evenly distributed across all levels of the tree.

* **Case 3: $f(n)$ is polynomially larger than $n^{\log_b a}$.**
* Condition: If $f(n) = \Omega(n^{\log_b a + \epsilon})$ for some $\epsilon > 0$, AND it satisfies the regularity condition: $a \cdot f(n/b) \le c \cdot f(n)$ for some constant $c < 1$ and sufficiently large $n$.
* Result: $T(n) = \Theta(f(n))$.
* *Logic:* The cost is dominated by the root of the recursion tree.


**3. Analyze the process of solving a recurrence relation using the Recurrence Tree method. Illustrate how it calculates the total cost of an algorithm.**
**Answer:**
The Recurrence Tree method is a visual and algebraic way to determine the sum of costs for executing a recursive algorithm. It avoids the pure guesswork of the substitution method by mapping out the algorithm's execution flow.

**Step-by-Step Breakdown:**

1. **Decomposition:** The initial equation $T(n)$ forms the root node. If the recurrence is $T(n) = 2T(n/2) + cn$, the root node has a cost of $cn$.
2. **Branching:** The root node splits into branches representing the subproblems. In $T(n) = 2T(n/2)$, there are 2 branches, each representing a node of size $n/2$. The cost at this second level for each node is $c(n/2)$.
3. **Expansion:** This branching continues. Level 2 will have 4 nodes of size $n/4$. Level $i$ will have $2^i$ nodes of size $n/2^i$.
4. **Determine Tree Depth:** The tree stops expanding when the subproblem size reaches the base case (usually size 1). For a division by 2, the depth of the tree is $\log_2 n$.
5. **Calculate Level Costs:** Sum the costs horizontally across each level.
* Level 0 (Root): $cn$
* Level 1: $2 \cdot c(n/2) = cn$
* Level 2: $4 \cdot c(n/4) = cn$

6. **Sum Total Cost:** Add the costs of all levels together. In this example, there are $\log_2 n$ levels, and each level costs $cn$.
7. **Result:** The total cost is $cn \cdot \log_2 n$, which simplifies to an asymptotic bound of $\Theta(n \log n)$.
