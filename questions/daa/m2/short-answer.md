# Short Answer Questions

**1. Compare Linear Search and Binary Search based on their prerequisites and complexities.**
**Answer:** Linear search requires no prerequisites (works on unsorted data) and searches sequentially, resulting in a worst-case time complexity of O(n). Binary search mandates that the data be sorted. It repeatedly divides the search interval in half, resulting in a vastly superior worst-case time complexity of O(log n).

**2. Explain the fundamental principle behind Interpolation Search.**
**Answer:** Interpolation search mimics how a human searches a dictionary. Instead of blindly checking the exact middle of the array (like Binary Search), it uses the value of the target key to probe and mathematically calculate an estimated position. It is highly efficient for uniformly distributed sorted arrays, achieving an average time complexity of O(log (log n)).

**3. Explain the Partition process in Quick Sort.**
**Answer:** The partition process selects a 'pivot' element from the array. It then rearranges the array by iterating through the elements, placing all values smaller than the pivot to its left, and all values larger than the pivot to its right. Finally, the pivot is swapped into its correct, sorted position in the array.

**4. Why does Merge Sort require O(n) extra space, while Quick Sort does not?**
**Answer:** Merge Sort requires O(n) auxiliary space because, during the "merge" phase, it must copy elements into a temporary array to combine the two sorted sub-arrays properly. Quick Sort, conversely, sorts the elements in-place by swapping them within the original array boundaries during the partitioning phase.

**5. What is the Heapify process in Heap Sort?**
**Answer:** Heapify is an algorithmic process used to maintain the heap property in a binary tree. If a node violates the max-heap property (its value is less than one of its children), heapify compares the parent with its children and swaps it with the largest child. This process is applied recursively down the tree until the heap property is restored.
