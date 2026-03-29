const nodes = {
    hospital: { x: 750, y: 100, name: "Hospital" }, auditorium: { x: 300, y: 300, name: "Auditorium" }, tp_ground: { x: 550, y: 300, name: "TP Ground" },
    techpark2: { x: 300, y: 450, name: "Tech Park 2" }, vendhar_sq: { x: 550, y: 550, name: "Vendhar Sq" }, techpark1: { x: 300, y: 700, name: "Tech Park 1" },
    clock_tower: { x: 750, y: 750, name: "Clock Tower" }, java: { x: 300, y: 900, name: "Java" }, bel_block: { x: 300, y: 1100, name: "BEL Block" },
    girls_hostel: { x: 1250, y: 750, name: "Girls Hostel" }, boys_hostel: { x: 1250, y: 1350, name: "Boys Hostel" }, university_bldg: { x: 550, y: 1350, name: "Uni Bldg" },
    sports_complex: { x: 400, y: 1350, name: "Sports Complex" }, arch_gate: { x: 750, y: 1550, name: "Arch Gate" }, spine_java: { x: 750, y: 900, name: "Spine Java" },
    spine_bel: { x: 750, y: 1100, name: "Spine BEL" }, spine_boys: { x: 750, y: 1350, name: "Spine Boys" }
};

const getDistance = (node1, node2) => {
    const dx = nodes[node1].x - nodes[node2].x;
    const dy = nodes[node1].y - nodes[node2].y;
    return Math.sqrt(dx * dx + dy * dy);
};

const graph = {
    hospital: { clock_tower: { w: getDistance('hospital', 'clock_tower'), path: 'hosp-to-clock' }, auditorium: { w: getDistance('hospital', 'auditorium'), path: 'auditorium-hosp' } },
    auditorium: { hospital: { w: getDistance('auditorium', 'hospital'), path: 'auditorium-hosp' }, tp_ground: { w: getDistance('auditorium', 'tp_ground'), path: 'tpg-to-audi' }, techpark2: { w: getDistance('auditorium', 'techpark2'), path: 'audi-to-tp2' } },
    tp_ground: { auditorium: { w: getDistance('tp_ground', 'auditorium'), path: 'tpg-to-audi' }, vendhar_sq: { w: getDistance('tp_ground', 'vendhar_sq'), path: 'tpg-to-vendhar' } },
    techpark2: { auditorium: { w: getDistance('techpark2', 'auditorium'), path: 'audi-to-tp2' }, techpark1: { w: getDistance('techpark2', 'techpark1'), path: 'tp2-to-tp1' }, vendhar_sq: { w: getDistance('techpark2', 'vendhar_sq'), path: 'tp2-to-vendhar' } },
    techpark1: { techpark2: { w: getDistance('techpark1', 'techpark2'), path: 'tp2-to-tp1' }, java: { w: getDistance('techpark1', 'java'), path: 'tp1-to-java' }, vendhar_sq: { w: getDistance('techpark1', 'vendhar_sq'), path: 'tp1-to-vendhar' } },
    vendhar_sq: { tp_ground: { w: getDistance('vendhar_sq', 'tp_ground'), path: 'tpg-to-vendhar' }, techpark2: { w: getDistance('vendhar_sq', 'techpark2'), path: 'tp2-to-vendhar' }, techpark1: { w: getDistance('vendhar_sq', 'techpark1'), path: 'tp1-to-vendhar' }, clock_tower: { w: getDistance('vendhar_sq', 'clock_tower'), path: 'vendhar-to-clock' } },
    clock_tower: { hospital: { w: getDistance('clock_tower', 'hospital'), path: 'hosp-to-clock' }, spine_java: { w: getDistance('clock_tower', 'spine_java'), path: 'clock-to-sjava' }, vendhar_sq: { w: getDistance('clock_tower', 'vendhar_sq'), path: 'vendhar-to-clock' }, girls_hostel: { w: getDistance('clock_tower', 'girls_hostel'), path: 'girls-to-clock' } },
    java: { techpark1: { w: getDistance('java', 'techpark1'), path: 'tp1-to-java' }, bel_block: { w: getDistance('java', 'bel_block'), path: 'java-to-bel' }, spine_java: { w: getDistance('java', 'spine_java'), path: 'java-to-spine' } },
    spine_java: { clock_tower: { w: getDistance('spine_java', 'clock_tower'), path: 'clock-to-sjava' }, spine_bel: { w: getDistance('spine_java', 'spine_bel'), path: 'sjava-to-sbel' }, java: { w: getDistance('spine_java', 'java'), path: 'java-to-spine' } },
    bel_block: { java: { w: getDistance('bel_block', 'java'), path: 'java-to-bel' }, spine_bel: { w: getDistance('bel_block', 'spine_bel'), path: 'bel-to-spine' } },
    spine_bel: { spine_java: { w: getDistance('spine_bel', 'spine_java'), path: 'sjava-to-sbel' }, spine_boys: { w: getDistance('spine_bel', 'spine_boys'), path: 'sbel-to-sboys' }, bel_block: { w: getDistance('spine_bel', 'bel_block'), path: 'bel-to-spine' } },
    girls_hostel: { clock_tower: { w: getDistance('girls_hostel', 'clock_tower'), path: 'girls-to-clock' } },
    boys_hostel: { spine_boys: { w: getDistance('boys_hostel', 'spine_boys'), path: 'boys-to-spine' } },
    spine_boys: { spine_bel: { w: getDistance('spine_boys', 'spine_bel'), path: 'sbel-to-sboys' }, arch_gate: { w: getDistance('spine_boys', 'arch_gate'), path: 'sboys-to-gate' }, boys_hostel: { w: getDistance('spine_boys', 'boys_hostel'), path: 'boys-to-spine' }, university_bldg: { w: getDistance('spine_boys', 'university_bldg'), path: 'uni-to-spine' } },
    university_bldg: { sports_complex: { w: getDistance('university_bldg', 'sports_complex'), path: 'sports-to-uni' }, spine_boys: { w: getDistance('university_bldg', 'spine_boys'), path: 'uni-to-spine' } },
    sports_complex: { university_bldg: { w: getDistance('sports_complex', 'university_bldg'), path: 'sports-to-uni' } },
    arch_gate: { spine_boys: { w: getDistance('arch_gate', 'spine_boys'), path: 'sboys-to-gate' } }
};

// --- A* STATE MACHINE FOR VISUALIZATION ---
let state = null; // Holds the current state of the search

function initAStar() {
    resetMapUIOnly();
    const start = document.getElementById('startNode').value;
    const goal = document.getElementById('endNode').value;

    if (start === goal) {
        alert("Already at destination!");
        return false;
    }

    state = {
        start: start, goal: goal,
        openSet: [start], closedSet: new Set(), cameFrom: {},
        gScore: {}, fScore: {}, hScore: {}, 
        finished: false, pathFound: null
    };

    for (let node in nodes) {
        state.gScore[node] = Infinity;
        state.fScore[node] = Infinity;
    }

    state.gScore[start] = 0;
    state.hScore[start] = getDistance(start, goal);
    state.fScore[start] = state.hScore[start];

    updateLog(`Initialized. Start: ${nodes[start].name}. Goal: ${nodes[goal].name}.`);
    updateDOMColors();
    return true;
}

function nextStep(instant = false) {
    if (!state || state.finished) return;

    if (state.openSet.length === 0) {
        state.finished = true;
        updateLog(`❌ Search Failed. No path found.`);
        return;
    }

    // 1. Find the node in openSet with the lowest fScore
    let current = state.openSet.reduce((lowest, node) => 
        (state.fScore[node] < state.fScore[lowest] ? node : lowest), state.openSet[0]);

    // Update Heuristic Line visually
    drawHeuristicLine(current, state.goal);

    // 2. Are we there?
    if (current === state.goal) {
        state.finished = true;
        state.pathFound = reconstructPath(state.cameFrom, current);
        state.pathFound.totalCost = state.gScore[current];
        
        updateLog(`✅ Reached Goal! Path cost: ${Math.round(state.pathFound.totalCost)}m.`);
        if (!instant) {
            document.getElementById('total-distance').innerText = `Total Distance: ${Math.round(state.pathFound.totalCost)}m`;
            animatePathSafe(state.pathFound.pathIds);
            animateDotSmooth(state.pathFound.pathNodes);
            document.getElementById('heuristic-line').style.display = 'none'; // hide line at end
        }
        return;
    }

    // 3. Move current from openSet to closedSet
    state.openSet = state.openSet.filter(node => node !== current);
    state.closedSet.add(current);

    if(!instant) updateLog(`Evaluating node <b>${nodes[current].name}</b> (total score f = ${Math.round(state.fScore[current])}). checking neighbors...`);

    // 4. Process neighbors
    for (let neighbor in graph[current]) {
        if (state.closedSet.has(neighbor)) continue; // Already evaluated

        let tentative_gScore = state.gScore[current] + graph[current][neighbor].w;

        if (tentative_gScore < state.gScore[neighbor]) {
            // Found a better path to neighbor! Record it.
            state.cameFrom[neighbor] = { node: current, pathId: graph[current][neighbor].path };
            state.gScore[neighbor] = tentative_gScore;
            state.hScore[neighbor] = getDistance(neighbor, state.goal);
            state.fScore[neighbor] = state.gScore[neighbor] + state.hScore[neighbor];

            if (!state.openSet.includes(neighbor)) {
                state.openSet.push(neighbor);
            }
        }
    }

    if (!instant) updateDOMColors(current);
}

// --- CONTROLS ---

function startStepByStep() {
    if(initAStar()) {
        document.getElementById('btn-next').disabled = false;
        document.getElementById('heuristic-line').style.display = document.getElementById('showHeuristic').checked ? 'block' : 'none';
    }
}

function runInstantly() {
    if(!initAStar()) return;
    document.getElementById('btn-next').disabled = true;
    
    // Run the loop instantly
    while(!state.finished) { nextStep(true); }

    // Display final UI
    if (state.pathFound) {
        document.getElementById('total-distance').innerText = `Total Distance: ${Math.round(state.pathFound.totalCost)}m`;
        updateDOMColors();
        animatePathSafe(state.pathFound.pathIds);
        animateDotSmooth(state.pathFound.pathNodes);
        document.getElementById('heuristic-line').style.display = 'none';
    } else {
        alert("No route found!");
    }
}

// --- VISUALIZATION HELPERS ---

function updateDOMColors(currentNode = null) {
    if(!state) return;
    document.querySelectorAll('.node').forEach(nodeGroup => {
        const id = nodeGroup.id;
        nodeGroup.classList.remove('open-set', 'closed-set', 'current-eval');
        
        if (id === currentNode) {
            nodeGroup.classList.add('current-eval');
        } else if (state.closedSet.has(id)) {
            nodeGroup.classList.add('closed-set');
        } else if (state.openSet.includes(id)) {
            nodeGroup.classList.add('open-set');
        }
    });
}

function updateLog(text) {
    document.getElementById('algo-log').innerHTML = text;
}

function drawHeuristicLine(fromNode, toNode) {
    const line = document.getElementById('heuristic-line');
    if (!document.getElementById('showHeuristic').checked) {
        line.style.display = 'none';
        return;
    }
    line.style.display = 'block';
    line.setAttribute('x1', nodes[fromNode].x);
    line.setAttribute('y1', nodes[fromNode].y);
    line.setAttribute('x2', nodes[toNode].x);
    line.setAttribute('y2', nodes[toNode].y);
}

function toggleHeuristic() {
    const line = document.getElementById('heuristic-line');
    if(document.getElementById('showHeuristic').checked && state && !state.finished) {
        line.style.display = 'block';
    } else {
        line.style.display = 'none';
    }
}

function resetMapUIOnly() {
    state = null;
    document.querySelectorAll('.path').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.node').forEach(n => n.classList.remove('open-set', 'closed-set', 'current-eval'));
    const dot = document.getElementById("moving-dot");
    if (dot) dot.remove();
    document.getElementById('heuristic-line').style.display = 'none';
    document.getElementById('total-distance').innerText = "Total Distance: 0m";
    document.getElementById('algo-log').innerHTML = "Waiting to start...";
    document.getElementById('btn-next').disabled = true;
}

function resetMap() {
    resetMapUIOnly();
    document.getElementById('startNode').selectedIndex = 0;
    document.getElementById('endNode').selectedIndex = 0;
}

// --- MATH TOOLTIP LOGIC ---
const tooltip = document.getElementById('math-tooltip');

document.querySelectorAll('.node').forEach(nodeGroup => {
    nodeGroup.addEventListener('mouseenter', (e) => {
        if(!state) return; // Only show math if algo is running/ran
        const id = nodeGroup.id;
        
        // If node hasn't been discovered yet
        if(state.fScore[id] === Infinity) {
            tooltip.innerHTML = `<b>${nodes[id].name}</b>\nNot yet discovered by A*`;
        } else {
            const g = Math.round(state.gScore[id]);
            const h = Math.round(state.hScore[id] || getDistance(id, state.goal));
            const f = g + h;
            tooltip.innerHTML = `<b>${nodes[id].name}</b>
            g (Cost from start): ${g}m
            h (Est. to goal): ${h}m
            ----------------------
            <b>f (Total Score): ${f}</b>`;
        }
        
        tooltip.style.left = e.pageX + 'px';
        tooltip.style.top = e.pageY + 'px';
        tooltip.classList.remove('hidden');
    });

    nodeGroup.addEventListener('mousemove', (e) => {
        tooltip.style.left = e.pageX + 'px';
        tooltip.style.top = e.pageY + 'px';
    });

    nodeGroup.addEventListener('mouseleave', () => {
        tooltip.classList.add('hidden');
    });
});

// --- ORIGINAL UTILS (Path reconstruct, animation, drawing distances) ---

function reconstructPath(cameFrom, current) {
    let totalPathIds = [];
    let pathNodes = [current];
    while (cameFrom[current]) {
        totalPathIds.unshift(cameFrom[current].pathId);
        current = cameFrom[current].node;
        pathNodes.unshift(current);
    }
    return { pathNodes: pathNodes, pathIds: [...new Set(totalPathIds)] };
}

function animatePathSafe(pathIds) {
    pathIds.forEach((id, index) => {
        const line = document.getElementById(id);
        if (line) setTimeout(() => { line.classList.add("active"); }, index * 250);
    });
}

function animateDotSmooth(nodeList) {
    const svg = document.getElementById("campus-map");
    const oldDot = document.getElementById("moving-dot");
    if (oldDot) oldDot.remove();

    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("r", 8); dot.setAttribute("fill", "#22d3ee"); dot.setAttribute("id", "moving-dot");
    svg.appendChild(dot);

    let i = 0;
    function moveToNext() {
        if (i >= nodeList.length - 1) return;
        const start = nodes[nodeList[i]], end = nodes[nodeList[i + 1]];
        let progress = 0;

        function animate() {
            progress += 0.02;
            dot.setAttribute("cx", start.x + (end.x - start.x) * progress);
            dot.setAttribute("cy", start.y + (end.y - start.y) * progress);
            if (progress < 1) requestAnimationFrame(animate);
            else { i++; moveToNext(); }
        }
        animate();
    }
    const first = nodes[nodeList[0]];
    dot.setAttribute("cx", first.x); dot.setAttribute("cy", first.y);
    moveToNext();
}

function drawEdgeWeights() {
    const svg = document.getElementById("campus-map");
    const drawn = new Set();

    for (let node1 in graph) {
        for (let node2 in graph[node1]) {
            const edge = graph[node1][node2];
            if (!drawn.has(edge.path)) {
                drawn.add(edge.path);
                const midX = (nodes[node1].x + nodes[node2].x) / 2;
                const midY = (nodes[node1].y + nodes[node2].y) / 2;
                
                const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                text.setAttribute("x", midX); text.setAttribute("y", midY - 10);
                text.setAttribute("class", "edge-weight"); text.textContent = Math.round(edge.w) + "m";
                svg.insertBefore(text, svg.querySelector('.node'));
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", drawEdgeWeights);