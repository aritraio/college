# One-Liner Questions

1. **Question:** What is a brute force algorithm?
**Answer:** A straightforward, exhaustive approach to solving a problem based directly on the problem statement and definitions, usually lacking optimization.

2. **Question:** Define the divide-and-conquer strategy.
**Answer:** An algorithm design paradigm that recursively breaks a problem down into two or more subproblems of the same or related type, until these become simple enough to be solved directly, and then combines the sub-solutions.

3. **Question:** What is the base case for the recursive Max-Min algorithm?
**Answer:** The base case occurs when the array sub-segment has either exactly one element (max and min are the same) or exactly two elements (requires one comparison to determine max and min).

4. **Question:** Why does Strassen’s algorithm outperform standard matrix multiplication for large $n$?
**Answer:** It reduces the number of recursive matrix multiplications from 8 to 7, dropping the time complexity from $O(n^3)$ to approximately $O(n^{2.81})$.

5. **Question:** State the core difference between the 0/1 Knapsack and Fractional Knapsack problems.
**Answer:** Fractional Knapsack allows breaking items into parts (solvable via Greedy), whereas 0/1 Knapsack requires taking an item whole or leaving it (requires Dynamic Programming).

6. **Question:** What is the objective of the Job Sequencing with Deadline problem?
**Answer:** To schedule a set of jobs, each taking one unit of time, within their respective deadlines to maximize the total accumulated profit.

7. **Question:** What is the primary characteristic of problems solvable by Dynamic Programming?
**Answer:** They must exhibit overlapping subproblems and optimal substructure.

8. **Question:** What does Matrix Chain Multiplication optimize?
**Answer:** It finds the optimal parenthesization of a sequence of matrices to minimize the total number of scalar multiplications required to compute the final matrix product.

9. **Question:** Define the backtracking methodology used in N-Queens.
**Answer:** It builds a solution incrementally by placing queens row by row, and abandons (backtracks) a path immediately if placing a queen leads to an unsafe configuration.

10. **Question:** Why is the KMP algorithm faster than Naive String Matching?
**Answer:** KMP uses an LPS (Longest Proper Prefix which is also Suffix) array to skip redundant comparisons, resulting in a linear $O(n + m)$ time complexity instead of checking every shift blindly.
