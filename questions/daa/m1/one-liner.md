# One-Liner Questions

1. **Question:** Define $O$ (Big-O) notation mathematically.
**Answer:** $O(g(n)) = \{f(n) :$ there exist positive constants $c$ and $n_0$ such that $0 \le f(n) \le c \cdot g(n)$ for all $n \ge n_0\}$.

2. **Question:** What does $\Theta$ (Big-Theta) notation represent?
**Answer:** It represents an asymptotically tight bound, meaning the function is bounded from both above and below by the same growth rate.

3. **Question:** Define a time-space trade-off.
**Answer:** It is a design choice where one resource (usually execution time) is reduced at the expense of increasing another resource (usually memory consumption), or vice versa.

4. **Question:** What is the primary limitation of the Master's Theorem?
**Answer:** It can only solve recurrences of the specific divide-and-conquer form $T(n) = aT(n/b) + f(n)$ and fails if the recurrence does not fit one of its three specific cases.

5. **Question:** State the difference between $O$ (Big-O) and $\Omega$ (Big-Omega).
**Answer:** Big-O provides an asymptotic upper bound (worst-case), whereas Big-Omega provides an asymptotic lower bound (best-case).

6. **Question:** What are the two essential steps in the Substitution Method?
**Answer:** First, guess the exact form of the solution; second, use mathematical induction to prove the guess is correct.

7. **Question:** How does a recurrence tree represent costs?
**Answer:** Each node represents the cost of a single subproblem, and the tree structure maps the recursive decomposition; total cost is the sum of all nodes.

8. **Question:** Define $\omega$ (little-omega) notation.
**Answer:** It represents a strict asymptotic lower bound, meaning $f(n)$ grows strictly faster than $g(n)$ (i.e., $\lim_{n \to \infty} \frac{f(n)}{g(n)} = \infty$).

9. **Question:** Why use asymptotic notations instead of exact execution times?
**Answer:** Asymptotic notations isolate the algorithm's inherent growth rate regarding input size, stripping away hardware and language-specific constants.

10. **Question:** What is the purpose of empirical analysis in this module?
**Answer:** Writing programs and timing them provides practical validation of theoretical asymptotic bounds, observing how constants and lower-order terms behave in reality.
