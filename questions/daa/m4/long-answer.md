# Long Answer Questions

**1. Detail Dijkstra's Algorithm for finding the single-source shortest path. Write the pseudo-code and logically explain why it fails with negative edge weights. State its time complexity using a Min-Priority Queue.**
**Answer:**
Dijkstra's algorithm is a greedy algorithm that determines the shortest path from a starting node to all other nodes in a graph with non-negative edge weights.

*Pseudo-code:*
```text
Dijkstra(G, source):
    For each vertex v in G:
        distance[v] = infinity
        previous[v] = undefined
    distance[source] = 0
    Q = MinPriorityQueue of all vertices in G, keyed by distance

    While Q is not empty:
        u = Extract_Min(Q)
        For each neighbor v of u:
            alt = distance[u] + weight(u, v)
            If alt < distance[v]:
                distance[v] = alt
                previous[v] = u
                Decrease_Key(Q, v, alt)
```

*Why it fails with negative weights:*
Dijkstra's greedy choice assumes that once a vertex `u` is extracted from the priority queue, the absolute shortest path to `u` has been found. If there are negative weights, a node processed later could provide a "cheaper" path to a node already finalized, breaking the fundamental assumption of the algorithm.

*Time Complexity:*
Using an adjacency list and a Binary Min-Heap (Priority Queue), extracting the minimum takes $O(\log V)$ and decreasing the key takes $O(\log V)$. Doing this for all vertices and edges yields a time complexity of $O((V + E) \log V)$.


**2. Explain the Floyd-Warshall Algorithm. Outline the dynamic programming approach it uses, provide the pseudo-code, and deduce its time complexity.**
**Answer:**
The Floyd-Warshall algorithm calculates the shortest path between every pair of vertices in a directed weighted graph. It relies on the dynamic programming paradigm, building the solution by systematically considering whether a path between two nodes $i$ and $j$ can be shortened by going through an intermediate vertex $k$.

*Dynamic Programming Approach:*
Let $D[i][j]$ represent the shortest distance from vertex $i$ to vertex $j$. The algorithm iterates through every vertex $k$ from 1 to $V$, checking if the path from $i$ to $j$ via $k$ is shorter than the currently known path from $i$ to $j$.
Recurrence: $D[i][j] = \min(D[i][j], D[i][k] + D[k][j])$

*Pseudo-code:*
```text
Floyd_Warshall(W): // W is the adjacency matrix
    n = W.rows
    D = W
    For k = 1 to n:
        For i = 1 to n:
            For j = 1 to n:
                If D[i][k] + D[k][j] < D[i][j]:
                    D[i][j] = D[i][k] + D[k][j]
    Return D
```

*Time Complexity:*
The algorithm consists of three nested loops, each iterating $V$ times (where $V$ is the number of vertices). Therefore, the time complexity is strictly $O(V^3)$. The space complexity is $O(V^2)$ to store the distance matrix.


**3. Define the Disjoint Set Data Structure. Explain how it is specifically integrated into Kruskal’s Algorithm to determine a Minimum Spanning Tree. Provide the pseudo-code for Kruskal's algorithm.**
**Answer:**
A Disjoint Set (or Union-Find) data structure manages a collection of disjoint (non-overlapping) sets. It supports two primary operations efficiently: `Find` (determines which set a particular element belongs to) and `Union` (merges two sets into one).

*Integration in Kruskal's Algorithm:*
Kruskal's algorithm relies on adding the smallest available edge to the growing MST without forming a cycle. To detect cycles, every vertex starts in its own individual set within the Disjoint Set structure. When evaluating an edge $(u, v)$, the algorithm calls `Find(u)` and `Find(v)`. If they return the same root, $u$ and $v$ are already in the same connected component, meaning adding the edge would create a cycle (so it is rejected). If they return different roots, the edge is safe to add, and a `Union(u, v)` operation merges the two components.

*Pseudo-code:*
```text
Kruskal(G):
    A = empty set
    For each vertex v in G:
        Make_Set(v)
    Sort all edges E in G in non-decreasing order by weight
    
    For each edge (u, v) in E:
        If Find(u) != Find(v):
            Add edge (u, v) to A
            Union(u, v)
    
    Return A
```

*Time Complexity:*
Sorting the edges takes $O(E \log E)$. With path compression and union by rank, disjoint-set operations take essentially $O(1)$ time, making the total complexity dominated by the sorting step: $O(E \log E)$ or $O(E \log V)$.
```
