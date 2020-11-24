# Prim's Algorithm

Prim's algorithm is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph. Also called Jarník's algorithm, it begins by choosing an arbitrary vertex of the graph, and constructs a tree one edge at a time, growing until the tree spans the entire vertex set. In each iteration, it greedily adds the cheapest edge that extends the reach of the tree so far.

The straightforward implementation of the Prim's algorithm is fast enough to process medium-size graphs (with thousands of vertices and edges) in a reasonable amount of time, but not big graphs (with millions of vertices and edges). In order to achieve a near-linear-time solution to the problem, we don't need a better algorithm, just a better implementation of Prim's algorithm. The straightforward implementation performs repeated minumum computations, therefore the use of a heap data structure enables a blazingly fast, near-linear-time implementation.

## The problem

The input file describes an undirected graph with integer edge costs. You should not assume that edge costs are always positive, nor that they are distinct.

The task is to run Prim's minimum spanning tree algorithm on this graph. You should report the overall cost of the minumum spanning tree -- an integer, which may or may not be negative.

This graph is small enough that the straightforward O(mn) time implementation of Prim's algorithm should work fine. For those seeking an additional challenge, try implementing a heap-based version. The simpler approach, which should already give you a healthy speed-up, is to maintain relevant edges in a heap (with keys = edge costs). The superior approach stores the unprocessed vertices in the heap, as described in lecture. Note this requires a heap that supports deletions, and you'll probably need to maintain some kind of mapping between vertices and their positions in the heap.

> The information presented here and the problem were taken from the book [Algorithms Illuminated](http://algorithmsilluminated.org), by Tim Roughgarden.
