# Short Answer Questions

**1. What is the fundamental difference between the P and NP complexity classes?**
**Answer:** The P class contains decision problems that can be *solved* in polynomial time by a deterministic Turing machine. The NP class contains decision problems whose solutions can be *verified* in polynomial time. Every problem in P is also in NP, but it remains an unproven hypothesis whether $P = NP$.

**2. Explain the significance of Cook's Theorem in the study of algorithms.**
**Answer:** Cook's Theorem proved that the Boolean Satisfiability Problem (SAT) is NP-Complete. Its significance lies in providing the first known NP-Complete problem. Because of this, computer scientists can prove other problems are NP-Complete simply by polynomially reducing SAT (or subsequent known NP-Complete problems) to the new problem, rather than proving it from scratch.

**3. Define the Vertex Cover problem. Why is it important in complexity theory?**
**Answer:** A vertex cover of an undirected graph is a subset of its vertices such that for every edge $(u, v)$ in the graph, either $u$ or $v$ (or both) are in the subset. Finding the smallest such subset is the minimum vertex cover problem. It is important because it is a classic NP-Complete problem, heavily used in reduction proofs for other graph-based NP-Complete problems.

**4. Differentiate between the Hamiltonian Path and Hamiltonian Cycle problems.**
**Answer:** Both problems deal with traversing a graph. A Hamiltonian Path visits every vertex in the graph exactly once. A Hamiltonian Cycle is a Hamiltonian Path with the strict added condition that there must be an edge from the last visited vertex back to the starting vertex, creating a closed loop.

**5. Why are Approximation algorithms necessary?**
**Answer:** Many critical real-world optimization problems (like logistics and scheduling) are NP-Hard or NP-Complete. Finding an exact, optimal solution would take exponential time, making it practically impossible for large datasets. Approximation algorithms are necessary because they run in polynomial time and guarantee a solution that is mathematically proven to be within a specific ratio of the true optimal solution.
