import { useState, useEffect, useRef } from 'react';
import { IconFire, IconBook, IconShovel } from './icons';
import { LabGuideModal } from './LabGuideModal';
import { PredictionGuideContent } from './guides/PredictionGuideContent';

export const PredictiveLab = () => {
    const GRID_SIZE = 30;
    // Cell: 0=Forest, 1=Grass, 2=Water, 3=Burnt, 4=Fire, 5=Break
    const [grid, setGrid] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [params, setParams] = useState({ windSpeed: 2, windDir: 'E', moisture: 15 });
    const [tool, setTool] = useState('break'); // 'break', 'ignite'
    const [stats, setStats] = useState({ burned: 0, containment: 0 });
    const [showGuide, setShowGuide] = useState(false);
    const simulationRef = useRef(null);

    // Initialize Map with Terrain
    const resetGrid = () => {
        const newGrid = [];
        for(let y=0; y<GRID_SIZE; y++) {
            const row = [];
            for(let x=0; x<GRID_SIZE; x++) {
                // Generate terrain noise
                const noise = Math.sin(x*0.2) + Math.cos(y*0.3);
                let cell = { type: 0, state: 0 }; // 0:Forest
                
                if(noise > 1.2) cell.type = 2; // Water
                else if(noise < -0.8) cell.type = 1; // Grass (Flashy fuel)
                
                row.push(cell);
            }
            newGrid.push(row);
        }
        // Initial ignition point center
        newGrid[Math.floor(GRID_SIZE/2)][Math.floor(GRID_SIZE/2)].state = 1; 
        setGrid(newGrid);
        setStats({ burned: 0, containment: 0 });
        setIsRunning(false);
        if(simulationRef.current) clearInterval(simulationRef.current);
    };

    useEffect(() => resetGrid(), []);

    const handleCellClick = (x, y) => {
        if(isRunning) return; // No editing while running for simplicity
        const newGrid = [...grid];
        const cell = newGrid[y][x];
        
        if(tool === 'break') {
            // Toggle Dozer Line
            if(cell.type === 5) cell.type = 0; // Remove break
            else cell.type = 5; // Add break
        } else if(tool === 'ignite') {
            cell.state = 1; // Ignite
        }
        setGrid(newGrid);
    };

    const step = () => {
        setGrid(prev => {
            const next = prev.map(row => row.map(cell => ({...cell})));
            let changed = false;
            let burnCount = 0;

            for(let y=0; y<GRID_SIZE; y++) {
                for(let x=0; x<GRID_SIZE; x++) {
                    const cell = prev[y][x];
                    if(cell.state === 2) burnCount++; // Count burnt

                    if(cell.state === 1) {
                        // Cell is burning, turn to ash next turn
                        next[y][x].state = 2;
                        changed = true;
                        burnCount++;

                        // Spread to neighbors
                        const neighbors = [
                            {dx:0, dy:-1, dir:'N'}, {dx:0, dy:1, dir:'S'}, 
                            {dx:-1, dy:0, dir:'W'}, {dx:1, dy:0, dir:'E'}
                        ];

                        neighbors.forEach(n => {
                            const ny = y + n.dy;
                            const nx = x + n.dx;
                            
                            if(ny >= 0 && ny < GRID_SIZE && nx >= 0 && nx < GRID_SIZE) {
                                const target = prev[ny][nx];
                                if(target.state === 0 && target.type !== 2 && target.type !== 5) { // Not water, not break
                                    // Spread Probability Logic (The Fire Triangle)
                                    let prob = 0.15; // Base rate
                                    
                                    // 1. Fuel Modifier
                                    if(target.type === 1) prob += 0.25; // Grass burns fast
                                    
                                    // 2. Moisture Modifier
                                    prob -= (params.moisture / 100) * 0.2; 

                                    // 3. Wind Modifier
                                    if(params.windSpeed > 0) {
                                        if(params.windDir === n.dir) prob += (params.windSpeed * 0.08); // Pushing fire
                                        else if(params.windDir !== n.dir) prob -= 0.05; // Backing fire
                                    }

                                    if(Math.random() < prob) {
                                        next[ny][nx].state = 1;
                                        changed = true;
                                    }
                                }
                            }
                        });
                    }
                }
            }
            setStats(s => ({ ...s, burned: burnCount }));
            if(!changed) setIsRunning(false);
            return next;
        });
    };

    useEffect(() => {
        if(isRunning) simulationRef.current = setInterval(step, 150);
        else clearInterval(simulationRef.current);
        return () => clearInterval(simulationRef.current);
    }, [isRunning, params]);

    const getCellClass = (cell) => {
        if(cell.state === 1) return 'burning';
        if(cell.state === 2) return 'bg-gray-800'; // Ash
        if(cell.type === 2) return 'bg-blue-400'; // Water
        if(cell.type === 5) return 'bg-yellow-700 border border-yellow-900'; // Dozer Line
        if(cell.type === 1) return 'bg-green-300'; // Grass
        return 'bg-green-700'; // Forest
    };

    return (
        <div className="flex flex-col md:flex-row gap-6">
            {showGuide && (
                <LabGuideModal title="Lab 3: The Crystal Ball" onClose={() => setShowGuide(false)}>
                    <PredictionGuideContent />
                </LabGuideModal>
            )}

            <div className="flex-1 bg-white p-4 rounded-lg shadow-md border-l-4 border-red-600 space-y-6">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <IconFire className="text-red-600"/> Module 3: Prediction
                        </h3>
                        <button 
                            onClick={() => setShowGuide(true)}
                            className="bg-red-100 hover:bg-red-200 text-red-800 text-sm font-bold py-1 px-3 rounded flex items-center gap-2 transition-colors"
                        >
                            <IconBook className="w-4 h-4" /> Open Lab Guide
                        </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                        <strong>Scenario:</strong> A fire has started in mixed terrain. As the Incident Commander, you must predict spread and dig containment lines.
                    </p>
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded-lg text-xs text-yellow-800">
                        <strong>⚠️ Educational Note:</strong> This is a <strong>simplified toy model</strong> designed to illustrate core concepts of predictive analytics and fire behavior. Real-world fire prediction models (like FARSITE, Prometheus, or FlamMap) use complex physics-based equations, weather data integration, and detailed fuel models. This simulation is simplified for learning purposes to demonstrate how environmental variables (wind, moisture, fuel type) affect fire spread patterns.
                    </div>
                </div>

                {/* Fire Triangle Controls */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
                    <h4 className="font-bold text-xs uppercase text-gray-500 tracking-wider border-b pb-1">Environmental Inputs</h4>
                    
                    <div>
                        <label className="text-xs font-bold flex justify-between">
                            <span>Wind Direction</span> 
                            <span className="text-red-600">{params.windDir}</span>
                        </label>
                        <div className="flex gap-1 mt-1">
                            {['N','S','E','W'].map(d => (
                                <button key={d} onClick={()=>setParams({...params, windDir:d})} 
                                    className={`flex-1 py-1 text-xs font-bold rounded ${params.windDir===d ? 'bg-red-600 text-white' : 'bg-gray-200'}`}>
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-xs font-bold block text-gray-900">Wind Speed: {params.windSpeed}</label>
                            <input type="range" min="0" max="10" value={params.windSpeed} onChange={e=>setParams({...params, windSpeed: parseInt(e.target.value)})} className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider-thumb mt-1"/>
                        </div>
                        <div className="flex-1">
                            <label className="text-xs font-bold block text-gray-900">Fuel Moisture: {params.moisture}%</label>
                            <input type="range" min="0" max="50" value={params.moisture} onChange={e=>setParams({...params, moisture: parseInt(e.target.value)})} className="w-full h-2 bg-cyan-200 rounded-lg appearance-none cursor-pointer slider-thumb mt-1"/>
                        </div>
                    </div>
                </div>

                {/* Interactive Tools */}
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 space-y-3">
                    <h4 className="font-bold text-xs uppercase text-yellow-800 tracking-wider border-b border-yellow-200 pb-1">Response Tactics</h4>
                    <div className="flex gap-2">
                        <button onClick={() => setTool('break')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded font-bold text-sm border-2 ${tool==='break' ? 'border-yellow-700 bg-yellow-100 text-yellow-900' : 'border-transparent bg-white text-gray-600 hover:bg-yellow-50'}`}>
                            <IconShovel className="w-4 h-4"/> Dozer Line
                        </button>
                        <button onClick={() => setTool('ignite')} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded font-bold text-sm border-2 ${tool==='ignite' ? 'border-red-500 bg-red-50 text-red-900' : 'border-transparent bg-white text-gray-600 hover:bg-red-50'}`}>
                            <IconFire className="w-4 h-4"/> Ignite
                        </button>
                    </div>
                    <p className="text-xs text-yellow-800 italic">
                        *Click on the map to use the selected tool. Build firebreaks to stop the spread.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                    <button onClick={() => setIsRunning(!isRunning)} className={`flex-1 py-3 rounded-lg font-bold text-white shadow-md transition-all active:scale-95 ${isRunning ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-700 hover:bg-green-800'}`}>
                        {isRunning ? 'PAUSE OPERATION' : 'START SIMULATION'}
                    </button>
                    <button onClick={resetGrid} className="px-4 py-3 border border-gray-300 bg-white rounded-lg hover:bg-gray-100 font-bold text-gray-600">
                        Reset
                    </button>
                </div>

                {/* Metrics */}
                <div className="flex justify-between items-center text-sm font-mono bg-gray-100 p-2 rounded">
                    <span>Burned Cells: {stats.burned}</span>
                    <span className={isRunning ? "text-red-500 font-bold animate-pulse" : "text-gray-500"}>
                        {isRunning ? "LIVE" : "PAUSED"}
                    </span>
                </div>
            </div>

            {/* Map Visualization */}
            <div className="bg-gray-900 p-2 rounded-lg shadow-2xl border-4 border-gray-800 flex-1 relative">
                <div className="absolute top-4 left-4 bg-black/60 text-white text-[10px] p-2 rounded pointer-events-none z-10 space-y-1 backdrop-blur-sm">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-700 rounded-sm"></div> Timber (Slow)</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-300 rounded-sm"></div> Grass (Fast)</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-400 rounded-sm"></div> Water (Barrier)</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-700 rounded-sm border border-yellow-500"></div> Dozer Line</div>
                </div>
                
                <div className="grid gap-px bg-gray-900 h-full w-full aspect-square" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}>
                    {grid.map((row, y) => (
                        row.map((cell, x) => (
                            <div 
                                key={`${x}-${y}`} 
                                onMouseDown={() => handleCellClick(x, y)}
                                onMouseEnter={(e) => { if(e.buttons === 1) handleCellClick(x,y); }}
                                className={`w-full h-full cursor-pointer transition-colors duration-200 ${getCellClass(cell)}`}
                            ></div>
                        ))
                    ))}
                </div>
            </div>
        </div>
    );
};

