# Short Answer Questions

**1. State the fundamental difference in strategy between Prim's and Kruskal's algorithms.**
**Answer:** Prim's algorithm operates on vertices; it starts with a single vertex and grows a single connected tree by always selecting the minimum weight edge that connects a visited vertex to an unvisited vertex. Kruskal's algorithm operates on edges; it sorts all edges in ascending order of weight and builds a forest, adding the cheapest edge that does not create a cycle until all vertices are connected.

**2. Explain the concept of "Relaxation" in shortest path algorithms.**
**Answer:** Relaxation is the process of updating the shortest known distance to a vertex. For a directed edge $(u, v)$ with weight $w$, if the current known distance to $v$ is greater than the distance to $u$ plus $w$ ($d[v] > d[u] + w$), the distance to $v$ is "relaxed" and updated to the smaller value ($d[v] = d[u] + w$).

**3. Why does Depth First Search (DFS) use a stack while Breadth First Search (BFS) uses a queue?**
**Answer:** DFS requires a stack (Last-In-First-Out) because it must remember the previous nodes to backtrack to once a path reaches a dead end. BFS requires a queue (First-In-First-Out) because it must process nodes in the exact order they were discovered, ensuring all nodes at depth $d$ are evaluated before nodes at depth $d+1$.

**4. What are the two main heuristics used to optimize Disjoint Set operations, and what do they achieve?**
**Answer:** The two heuristics are "Union by Rank" (or size) and "Path Compression". Union by Rank attaches the shorter tree to the root of the taller tree to minimize overall depth. Path Compression makes every node visited during a `Find` operation point directly to the root, significantly flattening the tree and bringing the amortized time complexity of operations to nearly $O(1)$.

**5. How does the Bellman-Ford algorithm detect a negative weight cycle?**
**Answer:** The longest possible shortest path in a graph with $V$ vertices without cycles has $V-1$ edges. Bellman-Ford relaxes all edges $V-1$ times. It then performs one final relaxation check. If any edge $(u, v)$ can still be relaxed ($d[v] > d[u] + weight(u,v)$), it logically proves a negative weight cycle exists in the graph.
