# Long Answer Questions

**1. Explain the Merge Sort algorithm. Detail its approach and mathematically justify its time complexity for the best, average, and worst cases.**
**Answer:**
Merge sort is a recursive algorithm that strictly follows the Divide and Conquer paradigm.

* **Divide:** The algorithm continually divides the unsorted array into two halves until it reaches sub-arrays containing only a single element (an array of one element is inherently sorted).
* **Conquer & Merge:** It repeatedly merges the sub-arrays to produce new sorted sub-arrays until there is only one sorted array remaining. This is done by comparing the elements of the split arrays one by one and copying the smaller element into a temporary array.

**Complexity Analysis:**

* **Best, Average, and Worst Case:** O(n log n).
* *Justification:* The array is always divided precisely in half at each step, taking O(log n) divisions to reach single elements. At each level of division, the merge process iterates through all 'n' elements to combine them. Therefore, the total time is always the number of levels multiplied by the time to merge at each level: O(n) * O(log n) = O(n log n). The algorithm's behavior does not change regardless of the initial order of the data.


**2. Describe the Quick Sort algorithm. Explain exactly why its worst-case complexity degrades to O(n²) and how it can be mitigated.**
**Answer:**
Quick sort is an in-place, divide-and-conquer sorting algorithm. It selects a 'pivot' element and partitions the array around the pivot, ensuring the pivot ends up in its final sorted position. It then recursively applies the same logic to the sub-arrays on the left and right of the pivot.

**Complexity Analysis:**

* **Best & Average Case:** O(n log n). This occurs when the pivot consistently divides the array into two roughly equal halves.
* **Worst Case:** O(n²).
* *Why the Worst Case Happens:* The worst-case scenario triggers when the partition process repeatedly produces highly unbalanced sub-arrays—specifically, one sub-array with 0 elements and another with n-1 elements. If you use the last element as a pivot, this happens when the array is already sorted (either ascending or descending). The recursive tree depth becomes O(n) instead of O(log n), and at each level, O(n) work is done, yielding O(n²).
* *Mitigation:* This flaw is mitigated by using Randomized Quick Sort (picking a random element as the pivot) or the "Median-of-Three" method (picking the median of the first, middle, and last elements as the pivot), drastically reducing the probability of hitting the worst-case.


**3. What is Heap Sort? Outline the algorithm steps and analyze its time and space complexities.**
**Answer:**
Heap Sort leverages a complete binary tree concept mapped onto an array to sort elements. It typically uses a Max-Heap for ascending order sorting.

**Algorithm Steps:**

1. **Build Max-Heap:** Transform the initial unsorted array into a Max-Heap. This ensures the largest element in the array is at the root (index 0).
2. **Extract Max & Swap:** Swap the root element (the maximum value) with the last element in the array. The largest element is now at its correct, final sorted position.
3. **Reduce Heap Size:** Decrease the considered size of the heap by 1 (ignoring the newly sorted element at the end).
4. **Heapify:** Call the `heapify` function on the root node to restore the Max-Heap property for the remaining elements.
5. **Repeat:** Repeat steps 2-4 until the heap size is reduced to 1.

**Complexity Analysis:**

* **Time Complexity (Best, Average, Worst):** O(n log n).
* *Justification:* Building the initial heap takes O(n) time. The extraction process runs n-1 times. Each extraction requires a `heapify` operation to fix the tree, which takes O(log n) time. Thus, the total time is O(n) + O(n log n), which simplifies to O(n log n).
* **Space Complexity:** O(1). The sorting is done strictly in-place; the array itself represents the tree structure using index math (e.g., left child = `2i + 1`, right child = `2i + 2`), requiring no external memory scaling with 'n'.
