# Flashcards

**Flashcard 1**
*Front:* BFS vs DFS Data Structures
*Back:* BFS relies on a Queue (FIFO logic). DFS relies on a Stack (LIFO logic) or system call stack via recursion.

**Flashcard 2**
*Front:* Dijkstra's Algorithm Limitation
*Back:* It cannot handle negative weight edges because it assumes that once a vertex is added to the finalized set, its shortest path is absolutely determined.

**Flashcard 3**
*Front:* Bellman-Ford Negative Cycle Detection
*Back:* If a shorter path is found during the $V$-th iteration (after relaxing all edges $V-1$ times), the graph contains a negative weight cycle.

**Flashcard 4**
*Front:* Floyd-Warshall Recurrence Relation
*Back:* $D[i][j] = \min(D[i][j], D[i][k] + D[k][j])$ where $k$ is the intermediate vertex.

**Flashcard 5**
*Front:* Primary Operations of Disjoint Set
*Back:* `Make-Set(x)` creates a new set, `Find(x)` returns the representative of the set containing $x$, and `Union(x, y)` merges the two sets.

**Flashcard 6**
*Front:* Kruskal's Cycle Detection
*Back:* Uses the Disjoint Set (Union-Find) data structure. If two vertices of an edge have the same root/parent, adding the edge forms a cycle.
