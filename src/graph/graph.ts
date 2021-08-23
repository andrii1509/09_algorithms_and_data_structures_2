export class Graph {
  matrix: {[key: string]: {}};
  constructor(matrix: {[key: string]: {}}) {
    this.matrix = matrix;
  }


  findShortestPath(startNode: string, endNode: string) {
    let distances: {[key: string]: {}} = {};
    distances[endNode] = 'Infinity';
    distances = {...distances, ...this.matrix[startNode]};
    let parents: {[key: string]: {}} = { endNode: null };
    for (let child in this.matrix[startNode]) {
      parents[child] = startNode;
    }
    let visited = [];
    let node = this.shortestDistanceNode(distances, visited);
    while (node) {
      let distance = distances[node];
      let children = this.matrix[node];
      for (let child in children) {
        if (String(child) !== String(startNode)) {
          let newDistance = distance + children[child];
          if (!distances[child] || distances[child] > newDistance) {
            distances[child] = newDistance;
            parents[child] = node;
          }
        }
      }
      visited.push(node);
      node = this.shortestDistanceNode(distances, visited);
    }
    let shortestPath = [endNode];
    let parent = parents[endNode];
    while (parent) {
      shortestPath.push(parent);
      parent = parents[parent];
    }
    shortestPath.reverse();
    let results = {
      distance: distances[endNode],
      path: shortestPath,
    };
    return results;
  }



  shortestDistanceNode(distances: {[key: string]: {}}, visited) {
    let shortest: string = '';
    for (let node in distances) {
      let currentIsShortest =
        shortest === '' || distances[node] < distances[shortest];
      if (currentIsShortest && !visited.includes(node)) {
        shortest = node;
      }
    }
    return shortest;
  }
}
