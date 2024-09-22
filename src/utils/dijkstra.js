export function dijkstra(graph, start, end) {
    const distances = {};
    const previous = {};
    const queue = [];
  
    Object.keys(graph).forEach(station => {
      distances[station] = Infinity;
      previous[station] = null;
    });
    
    distances[start] = 0;
    queue.push(start);
  
    while (queue.length) {
      const current = queue.reduce((minStation, station) => 
        distances[station] < distances[minStation] ? station : minStation
      );
  
      queue.splice(queue.indexOf(current), 1);
  
      if (current === end) break; // Exit if we reached the destination
  
      graph[current].forEach(neighbor => {
        const distance = distances[current] + neighbor.distance;
        if (distance < distances[neighbor.station]) {
          distances[neighbor.station] = distance;
          previous[neighbor.station] = current;
          if (!queue.includes(neighbor.station)) queue.push(neighbor.station);
        }
      });
    }
  
    const path = [];
    let station = end;
    while (station) {
      path.unshift(station);
      station = previous[station];
    }
  
    return path.length > 1 ? path : []; // Return path only if valid
  }
  