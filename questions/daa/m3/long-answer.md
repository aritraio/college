# Long Answer Questions

**1. Detail Strassen's Algorithm for Matrix Multiplication. Explain why it is an application of Divide-and-Conquer and derive its time complexity.**
**Answer:**
Strassen's algorithm is a divide-and-conquer methodology. Given two $n \times n$ matrices $A$ and $B$, standard multiplication divides them into four $n/2 \times n/2$ submatrices:
$A = \begin{bmatrix} A_{11} & A_{12} \\ A_{21} & A_{22} \end{bmatrix}, B = \begin{bmatrix} B_{11} & B_{12} \\ B_{21} & B_{22} \end{bmatrix}$

Instead of computing the 8 products required by brute force, Strassen creates 7 intermediate matrices ($P_1$ to $P_7$) using specific additions and subtractions of the submatrices.
For example:
$P_1 = A_{11} \times (B_{12} - B_{22})$
$P_2 = (A_{11} + A_{12}) \times B_{22}$
...and so on up to $P_7$.

The final quadrants of the result matrix $C$ are formed by adding/subtracting these $P$ matrices. Since matrix addition takes $O(n^2)$ time, the recurrence relation becomes:
$T(n) = 7T(n/2) + O(n^2)$

Using the Master Theorem ($a=7, b=2, d=2$), since $7 > 2^2$, the time complexity is tightly bound by $O(n^{\log_2 7}) \approx O(n^{2.81})$. This proves that increasing mathematical overhead (matrix additions) to reduce recursive branches yields better asymptotic performance.


**2. Solve the following Job Sequencing with Deadline problem using the Greedy approach. Outline the algorithm and show the execution.**
**Jobs (Profit, Deadline):** $J_1(20, 2), J_2(15, 2), J_3(10, 1), J_4(5, 3), J_5(1, 3)$
**Answer:**
**Algorithm:**

1. Sort all jobs in descending order of profit.
2. Find the maximum deadline among all jobs to determine the size of the time-slot array.
3. Initialize a time-slot array to keep track of free slots.
4. Iterate through the sorted jobs. For each job, find the latest available empty time slot that is $\le$ its deadline. Assign the job to that slot. If no slot is free, ignore the job.

**Execution:**
Step 1: Sort by profit (already sorted in this example).
$J_1(20, 2), J_2(15, 2), J_3(10, 1), J_4(5, 3), J_5(1, 3)$
Step 2: Max deadline is 3. We have slots: `[ _ , _ , _ ]` (representing slots 1, 2, 3).
Step 3: Allocate jobs.

* **$J_1$ (Deadline 2):** Latest available slot $\le 2$ is Slot 2. Array: `[ _ , J_1, _ ]`
* **$J_2$ (Deadline 2):** Latest available slot $\le 2$ is Slot 1. Array: `[ J_2, J_1, _ ]`
* **$J_3$ (Deadline 1):** Latest available slot $\le 1$ is Slot 1, which is occupied. Discard $J_3$.
* **$J_4$ (Deadline 3):** Latest available slot $\le 3$ is Slot 3. Array: `[ J_2, J_1, J_4 ]`
* **$J_5$ (Deadline 3):** No slots $\le 3$ are available. Discard $J_5$.

Final scheduled jobs: $J_2, J_1, J_4$.
Total Maximum Profit: $15 + 20 + 5 = 40$.


**3. Formulate the Dynamic Programming solution for the 0/1 Knapsack problem. Define the recurrence relation and explain why a greedy approach fails here.**
**Answer:**
**Why Greedy Fails:** In 0/1 Knapsack, you cannot take fractions of an item. A greedy strategy (e.g., sorting by value/weight) might select an item that takes up most of the capacity but leaves a small, unusable remainder of space, blocking other combinations of items that would perfectly fill the knapsack and yield a higher total profit.

**Dynamic Programming Formulation:**
Let $wt[]$ be the array of weights, $val[]$ be the array of values, $W$ be the total capacity, and $n$ be the number of items.
We build a 2D table `K[i][w]` representing the maximum value that can be attained with a knapsack capacity $w$ using a subset of the first $i$ items.

**Recurrence Relation:**
For item $i$ (weight $wt[i-1]$, value $val[i-1]$), we have two choices: include it or exclude it.

1. **Base Case:** `K[0][w] = 0` and `K[i][0] = 0` (Zero capacity or zero items means zero profit).
2. **If weight of the $i$-th item is greater than current capacity $w$:** We cannot include it.
`K[i][w] = K[i-1][w]`
3. **If weight is less than or equal to $w$:** We take the maximum of including or excluding the item.
`K[i][w] = max(val[i-1] + K[i-1][w - wt[i-1]], K[i-1][w])`

The algorithm builds the table bottom-up in $O(n \times W)$ time.


**4. Explain the Knuth-Morris-Pratt (KMP) Algorithm. Detail the construction and purpose of the LPS array.**
**Answer:**
The Naive string matching algorithm is flawed because it ignores information gathered during a partial match. KMP eliminates this by preprocessing the pattern to determine exactly how far to shift the pattern when a mismatch occurs.

**The LPS Array (Longest Proper Prefix which is also Suffix):**
The LPS array is constructed solely from the Pattern string. For each sub-pattern `pattern[0...i]`, `LPS[i]` stores the length of the longest proper prefix that matches a proper suffix.
*Example Pattern:* `A B A B C`
`LPS[0]` for "A" $\rightarrow 0$
`LPS[1]` for "AB" $\rightarrow 0$
`LPS[2]` for "ABA" $\rightarrow 1$ (prefix "A" matches suffix "A")
`LPS[3]` for "ABAB" $\rightarrow 2$ (prefix "AB" matches suffix "AB")
`LPS[4]` for "ABABC" $\rightarrow 0$

**How KMP uses LPS:**
When comparing Text and Pattern, if a mismatch occurs at `pattern[j]`, the naive approach resets $j$ to 0 and increments the text pointer by 1. KMP, however, looks at `LPS[j-1]`. This value tells the algorithm that a certain prefix of the pattern has already matched a suffix of the text we just processed. KMP updates `j = LPS[j-1]` without moving the text pointer backwards. This ensures the text pointer only moves forward, resulting in an $O(n)$ matching phase and $O(m)$ preprocessing phase, for a total optimal $O(n + m)$ time complexity.
