const fs = require("fs");
const readline = require("readline");

const minHeap = function () {
  const heap = new Array();
  /**
   * Position of parent:      i/2
   * Position of left child:  2i
   * Position of right child: 2i + 1
   */

  this.size = function () {
    return heap.length;
  };

  this.insert = function (value) {
    heap.push(value);
    let index = heap.length - 1;
    let parentIndex = Math.trunc(index / 2);
    while (heap[parentIndex][2] > heap[index][2]) {
      [heap[index], heap[parentIndex]] = [heap[parentIndex], heap[index]];
      index = parentIndex;
      parentIndex = Math.trunc(index / 2);
    }

    // Returns the current root
    return heap[0];
  };

  this.extractMin = function () {
    if (heap.length === 0) {
      return null;
    }
    const lastIndex = heap.length - 1;
    [heap[0], heap[lastIndex]] = [heap[lastIndex], heap[0]];
    const min = heap.pop();

    let xIndex = 0;
    let smallerChild;

    if (heap.length <= 1) {
      return min;
    } else if (heap.length === 2) {
      smallerChild = 1;
    } else {
      smallerChild = heap[1][2] > heap[2][2] ? 2 : 1;
    }

    while (heap[xIndex][2] > heap[smallerChild][2]) {
      [heap[xIndex], heap[smallerChild]] = [heap[smallerChild], heap[xIndex]];
      xIndex = smallerChild;

      if (!heap[2 * xIndex]) {
        break;
      } else if (!heap[2 * xIndex + 1]) {
        smallerChild = 2 * xIndex;
      } else {
        smallerChild =
          heap[2 * xIndex][2] > heap[2 * xIndex + 1][2]
            ? 2 * xIndex + 1
            : 2 * xIndex;
      }
    }
    return min;
  };
};

async function readGraph() {
  const readStream = fs.createReadStream(__dirname + "/edges.txt");
  const rl = readline.createInterface({
    input: readStream,
    crlfDelay: Infinity,
  });

  let graph;

  for await (const line of rl) {
    const splitLine = line.split(" ").map((i) => Number(i));

    if (splitLine.length === 2) {
      const nVertices = splitLine[0];
      graph = new Array(nVertices + 1).fill(null);
    } else {
      const vertex1 = splitLine[0];
      const vertex2 = splitLine[1];
      const cost = splitLine[2];
      const edge1 = [vertex2, cost];
      const edge2 = [vertex1, cost];

      if (!Array.isArray(graph[vertex1])) {
        graph[vertex1] = new Array();
      }

      if (!Array.isArray(graph[vertex2])) {
        graph[vertex2] = new Array();
      }

      graph[vertex1].push(edge1);
      graph[vertex2].push(edge2);
    }
  }

  return graph;
}

function primMST(graph) {
  const nVertices = graph.length - 1;
  const minSpanTree = [];
  let mstCost = 0;

  const firstVertex = Math.ceil(Math.random() * nVertices);

  const visitedVertices = [firstVertex];

  const crossingEdges = new minHeap();

  graph[firstVertex].forEach((edge) => {
    crossingEdges.insert([firstVertex, edge[0], edge[1]]);
  });

  while (crossingEdges.size() > 0) {
    const minEdge = crossingEdges.extractMin();

    if (visitedVertices.includes(minEdge[1])) {
      continue;
    }

    const newVertex = minEdge[1];

    visitedVertices.push(newVertex);
    minSpanTree.push(minEdge);
    mstCost += minEdge[2];

    graph[newVertex].forEach((e) => {
      crossingEdges.insert([newVertex, e[0], e[1]]);
    });
  }

  console.log(mstCost);
}

async function run() {
  const graph = await readGraph();
  primMST(graph);
}

run();
