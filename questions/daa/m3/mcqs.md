# MCQs

**1. Which algorithmic design technique is utilized to solve the Fractional Knapsack problem?**
A) Dynamic Programming
B) Divide-and-Conquer
C) Greedy Technique
D) Backtracking
**Answer:** C

**2. In the Divide-and-Conquer strategy, what is the 'Conquer' step?**
A) Breaking the problem into smaller subproblems
B) Solving the subproblems recursively
C) Combining the solutions of the subproblems
D) Evaluating the worst-case time complexity
**Answer:** B

**3. What is the time complexity of the Naive string matching algorithm in the worst-case scenario (where pattern length is $m$ and text length is $n$)?**
A) $O(n + m)$
B) $O(n \log m)$
C) $O(m \times n)$
D) $O(n)$
**Answer:** C

**4. The standard recursive algorithm for finding the Maximum and Minimum of an array divides the array into how many parts at each step?**
A) 2
B) 3
C) 4
D) $n$
**Answer:** A

**5. Which of the following problems requires Dynamic Programming to guarantee an optimal solution according to your syllabus?**
A) Job sequencing with deadline
B) N-Queens problem
C) 0/1 Knapsack problem
D) Fractional Knapsack problem
**Answer:** C

**6. To maximize profit in Job Sequencing with Deadlines, what is the critical first step before assigning slots?**
A) Sort jobs in ascending order of their deadlines
B) Sort jobs in descending order of their profit
C) Sort jobs in ascending order of their profit
D) Execute jobs in the order they are given
**Answer:** B

**7. How many scalar multiplications are required by Strassen’s algorithm to multiply two $2 \times 2$ matrices, and what is its asymptotic time complexity?**
A) 8 multiplications, $O(n^3)$
B) 7 multiplications, $O(n^2)$
C) 7 multiplications, $O(n^{\log_2 7})$
D) 8 multiplications, $O(n^{\log_2 7})$
**Answer:** C

**8. In the KMP (Knuth-Morris-Pratt) algorithm, what exactly does the preprocessing array (often called the $\pi$ or LPS array) compute?**
A) The frequency of characters in the text
B) The length of the longest proper prefix that is also a suffix for every substring of the pattern
C) The lexicographical order of the string
D) The optimal shift distance based on the text character
**Answer:** B

**9. Matrix Chain Multiplication focuses on minimizing the total number of scalar multiplications. If we multiply matrix $A$ (dimension $p \times q$) and matrix $B$ (dimension $q \times r$), how many scalar multiplications occur?**
A) $p + q + r$
B) $p \times r$
C) $p \times q \times r$
D) $q \times r$
**Answer:** C

**10. Why is the Backtracking technique effective for the N-Queens problem?**
A) It breaks the board into independent $2 \times 2$ matrices.
B) It systematically prunes search paths that violate the constraint (queens attacking each other), avoiding exhaustive brute-force evaluation of all invalid board states.
C) It stores the previously calculated valid board states in a dynamic programming table.
D) It uses a greedy approach to place the queen in the safest row.
**Answer:** B
