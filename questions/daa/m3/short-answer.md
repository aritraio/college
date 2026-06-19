# Short Answer Questions

**1. Compare the Brute Force and Divide-and-Conquer approaches using the Max-Min problem.**
**Answer:** A Brute Force approach to finding the maximum and minimum of an array involves scanning the array sequentially, taking $2n - 2$ or $2n - 3$ comparisons in the worst case. The Divide-and-Conquer approach splits the array into halves recursively until it hits base cases of 1 or 2 elements, returning the local max/min up the tree. This reduces the number of comparisons to exactly $\frac{3n}{2} - 2$, proving mathematically more efficient than naive sequential scanning.

**2. Explain the Greedy Choice Property in the context of the Fractional Knapsack problem.**
**Answer:** The greedy choice property asserts that a global optimum can be reached by making a locally optimal choice. In Fractional Knapsack, the locally optimal choice is always picking the available item with the highest value-to-weight ratio. Because we are allowed to take fractions of an item to perfectly fill the knapsack capacity, this greedy strategy is mathematically guaranteed to maximize the total value.

**3. Why does the Naive string matching algorithm perform poorly on inputs like Text = "AAAAAAAAA" and Pattern = "AAAB"?**
**Answer:** The Naive algorithm shifts the pattern by only one position to the right after a mismatch. For the given input, it matches the first three 'A's, fails on 'B', and then shifts the pattern by exactly one index. It redundantly compares the 'A's over and over again for every single starting position in the text, resulting in the worst-case $O(m \times n)$ performance.

**4. Describe the state parameters in the 0/1 Knapsack Dynamic Programming approach.**
**Answer:** The state in the 0/1 Knapsack problem is typically defined by a 2D table $DP[i][w]$.

* `i` represents the subset of the first $i$ items we are considering.
* `w` represents the current remaining capacity of the knapsack.
The value at $DP[i][w]$ stores the maximum profit that can be achieved using a subset of the first $i$ items without exceeding the weight limit $w$.

**5. How does Strassen's matrix multiplication reduce time complexity?**
**Answer:** Standard matrix multiplication splits the matrices into 4 quadrants and requires 8 recursive multiplications of sub-matrices of size $n/2$. Strassen developed a mathematical trick involving additions and subtractions to compute the resulting quadrants using only 7 recursive multiplications. According to the Master Theorem for $T(n) = 7T(n/2) + O(n^2)$, this drops the asymptotic bound from $O(n^3)$ to $O(n^{\log_2 7})$.
