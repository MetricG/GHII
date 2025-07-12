//Node Class
class Node {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    //dx, dy track distance to be applied to the x, y positions to attract/reppel
    this.dx = 0;
    this.dy = 0;
  }
}

// Graph class
class Graph {
  constructor(nodesData, edges) {
    this.nodes = nodesData.map(n => new Node(n.id, n.x, n.y));
    this.edges = edges;
    //Optimal Attraction and Repelling force
    this.force = this.calculateOptimalForce();
  }

  calculateOptimalForce() {
    const area = 1; // area 1*1
    const room = 0.25; // optimal room between nodes during force application
    return room * Math.sqrt(area / this.nodes.length);
  }

  getNode(id) {
    return this.nodes.find(n => n.id === id);
  }

  //Repel Nodes from each other to avoid overlapping
  applyRepulsion() {
    for (let a of this.nodes) {
      for (let b of this.nodes) {
        if (a === b) continue;
        //get distance between nodes
        let dx = a.x - b.x;
        let dy = a.y - b.y;
        let distanceSquared = dx * dx + dy * dy;
        // Prevent division by zero and add minimum distance
        if (distanceSquared < 0.0001) {
          // Add small displacement to separate overlapping nodes 
          distanceSquared = dx * dx + dy * dy + 0.0001; // 0.0001 to avoid division by zero in case of overlap
        }
        let distance = Math.sqrt(distanceSquared);
        let repellingForce = this.force * this.force / distance; //get repelling force based off of distance
        a.dx += (dx / distance) * repellingForce;
        a.dy += (dy / distance) * repellingForce;
      }
    }
  }

  //Attract Nodes with connected edges
  applyAttraction() {
    for (let [id1, id2] of this.edges) {
      const a = this.getNode(id1);
      const b = this.getNode(id2);
      if (!a || !b) continue;
      let dx = b.x - a.x;
      let dy = b.y - a.y;
      let distanceSquared = dx * dx + dy * dy; //get distance between nodes
      let distance = Math.sqrt(distanceSquared);
      let attractionForce = distanceSquared / this.force; // get attraction force based off of distance
      let fx = (dx / distance) * attractionForce;
      let fy = (dy / distance) * attractionForce;
      a.dx += fx;
      a.dy += fy;
      b.dx -= fx;
      b.dy -= fy;
    }
  }

  //update positions nodes based off displacement distance applied to dx, dy
  updatePositions() {
    for (let node of this.nodes) {
      node.x += node.dx * 0.01;
      node.y += node.dy * 0.01;
      // Keep nodes within bounds with padding
      node.x = Math.max(0.05, Math.min(0.95, node.x));
      node.y = Math.max(0.05, Math.min(0.95, node.y));
      // Reset forces
      node.dx = 0;
      node.dy = 0;
    }
  }

  //run 550 times for optimal results based off the number of nodes '28'
  runForceLayout() {
    const iterations = 550;
    for (let i = 0; i < iterations; i++) {
      this.applyRepulsion();
      this.applyAttraction();
      this.updatePositions();
    }
  }

  getOptimizedPositions() {
    return this.nodes.map(n => ({ id: n.id, x: n.x, y: n.y }));
  }
}

// Data
const data = {
  "nodes": [
    { "id": "Blantyre", "x": 0.9134213014976535, "y": 0.2540740323898225 },
    { "id": "Chikwawa", "x": 0.14374226893980302, "y": 0.3910154112946962 },
    { "id": "Chiradzulu", "x": 0.9351749046225152, "y": 0.5027042682331085 },
    { "id": "Chitipa", "x": 0.5033532302137712, "y": 0.6371050642113303 },
    { "id": "Dedza", "x": 0.32675593364689126, "y": 0.32741458873737384 },
    { "id": "Dowa", "x": 0.44893854232683894, "y": 0.3534310438093927 },
    { "id": "Karonga", "x": 0.7719114930591756, "y": 0.7164846847486838 },
    { "id": "Kasungu", "x": 0.9486271739760203, "y": 0.03717616769235954 },
    { "id": "Lilongwe", "x": 0.03185092819745572, "y": 0.07907784991666855 },
    { "id": "Machinga", "x": 0.4976553188158377, "y": 0.15957191749775634 },
    { "id": "Mangochi", "x": 0.2417748469656349, "y": 0.22132470346325728 },
    { "id": "Mchinji", "x": 0.8029651384628501, "y": 0.4170419722297135 },
    { "id": "Mulanje", "x": 0.6998851394303303, "y": 0.7300336822154281 },
    { "id": "Mwanza", "x": 0.3093976112949879, "y": 0.9141857772478698 },
    { "id": "Mzimba", "x": 0.16190201617155997, "y": 0.8356366262711726 },
    { "id": "Neno", "x": 0.9869012833729535, "y": 0.3511167097222222 },
    { "id": "Nkhata Bay", "x": 0.0882233026546202, "y": 0.18674223158715342 },
    { "id": "Nkhotakota", "x": 0.17467106409589772, "y": 0.0010883823237957113 },
    { "id": "Nsanje", "x": 0.8093914854184416, "y": 0.5079865816371467 },
    { "id": "Ntcheu", "x": 0.8588177668360885, "y": 0.4167540312634731 },
    { "id": "Ntchisi", "x": 0.3969781197576786, "y": 0.9982702660465445 },
    { "id": "Phalombe", "x": 0.934352810085411, "y": 0.7328019939159007 },
    { "id": "Rumphi", "x": 0.2438492080065875, "y": 0.0387865957339274 },
    { "id": "Salima", "x": 0.837201462046805, "y": 0.9965726289086905 },
    { "id": "Thyolo", "x": 0.6272655175304893, "y": 0.7688215502317457 },
    { "id": "Zomba", "x": 0.7252659639019722, "y": 0.810888016094619 },
    { "id": "Balaka", "x": 0.15932838570160823, "y": 0.5698123530031478 },
    { "id": "Likoma", "x": 0.3488343806746971, "y": 0.6253864059894712 }
  ],
  "edges": [
    ["Blantyre", "Chikwawa"], ["Blantyre", "Chiradzulu"], ["Blantyre", "Thyolo"],
    ["Chikwawa", "Nsanje"], ["Chikwawa", "Mwanza"], ["Chiradzulu", "Zomba"],
    ["Chiradzulu", "Phalombe"], ["Chitipa", "Karonga"], ["Dedza", "Lilongwe"],
    ["Dedza", "Ntcheu"], ["Dowa", "Lilongwe"], ["Dowa", "Ntchisi"],
    ["Karonga", "Rumphi"], ["Kasungu", "Lilongwe"], ["Kasungu", "Mzimba"],
    ["Lilongwe", "Mchinji"], ["Lilongwe", "Salima"], ["Machinga", "Zomba"],
    ["Machinga", "Balaka"], ["Mangochi", "Balaka"], ["Mangochi", "Salima"],
    ["Mulanje", "Phalombe"], ["Mulanje", "Thyolo"], ["Mwanza", "Neno"],
    ["Mzimba", "Nkhata Bay"], ["Mzimba", "Rumphi"], ["Nkhata Bay", "Nkhotakota"],
    ["Nkhotakota", "Salima"], ["Nsanje", "Chikwawa"], ["Ntcheu", "Balaka"],
    ["Ntchisi", "Nkhotakota"], ["Phalombe", "Mulanje"], ["Salima", "Nkhotakota"],
    ["Zomba", "Machinga"]
  ]
};

// Visualization function
function createVisualization(nodes, edges) {
  const output = document.getElementById('output');
  
  // Create SVG for visualization
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '800');
  svg.setAttribute('height', '600');
  svg.style.border = '1px solid #ccc';
  svg.style.background = '#f9f9f9';
  
  // Draw edges
  edges.forEach(([id1, id2]) => {
    const node1 = nodes.find(n => n.id === id1);
    const node2 = nodes.find(n => n.id === id2);
    if (!node1 || !node2) return;
    
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', node1.x * 800);
    line.setAttribute('y1', node1.y * 600);
    line.setAttribute('x2', node2.x * 800);
    line.setAttribute('y2', node2.y * 600);
    line.setAttribute('stroke', '#999');
    line.setAttribute('stroke-width', '1');
    svg.appendChild(line);
  });
  
  // Draw nodes
  nodes.forEach(node => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', node.x * 800);
    circle.setAttribute('cy', node.y * 600);
    circle.setAttribute('r', '5');
    circle.setAttribute('fill', '#4CAF50');
    circle.setAttribute('stroke', '#333');
    circle.setAttribute('stroke-width', '1');
    svg.appendChild(circle);
    
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', node.x * 800);
    text.setAttribute('y', node.y * 600 + 15);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-family', 'Arial');
    text.setAttribute('font-size', '10');
    text.setAttribute('fill', '#333');
    text.textContent = node.id;
    svg.appendChild(text);
  });
  
  return svg;
}

// Main function
function runGraphLayout() {
  const graph = new Graph(data.nodes, data.edges);
  
  // Show original layout
  const originalSvg = createVisualization(data.nodes, data.edges);
  const originalTitle = document.createElement('h3');
  originalTitle.textContent = 'Original Layout';
  document.getElementById('output').appendChild(originalTitle);
  document.getElementById('output').appendChild(originalSvg);
  
  // Run force layout
  graph.runForceLayout();
  const optimized = graph.getOptimizedPositions();
  
  // Show optimized layout
  const optimizedSvg = createVisualization(optimized, data.edges);
  const optimizedTitle = document.createElement('h3');
  optimizedTitle.textContent = 'Optimized Layout';
  document.getElementById('output').appendChild(optimizedTitle);
  document.getElementById('output').appendChild(optimizedSvg);
  
  // Create and download JSON file
  const blob = new Blob([JSON.stringify(optimized, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'optimized-nodes.json';
  downloadLink.textContent = 'Download Optimized Nodes';
  downloadLink.style.display = 'block';
  downloadLink.style.marginTop = '20px';
  document.getElementById('output').appendChild(downloadLink);
  
  // Also log to console for debugging
  console.log('Optimized positions:', optimized);
}

// Run when page loads
window.addEventListener('load', runGraphLayout);