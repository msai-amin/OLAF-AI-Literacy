import { useState, useEffect, useRef } from 'react';
import { IconDatabase, IconBook } from './icons';
import { LabGuideModal } from './LabGuideModal';
import { MLGuideContent } from './guides/MLGuideContent';

export const MLLab = () => {
    const [activeWidget, setActiveWidget] = useState('decision-tree');
    const [showGuide, setShowGuide] = useState(false);
    
    // Decision Tree Widget State
    const [treeDecision, setTreeDecision] = useState({ dbh: 25, height: 12, age: 15 });
    const [treeResult, setTreeResult] = useState('');
    
    // Regression Widget State
    const [regressionData, setRegressionData] = useState([]);
    const [regressionLine, setRegressionLine] = useState(null);
    const canvasRef = useRef(null);
    
    // Clustering Widget State
    const [clusters, setClusters] = useState([]);
    const [numClusters, setNumClusters] = useState(3);
    const clusterCanvasRef = useRef(null);

    // Supervised Learning Widget State (Species Classification)
    const [slTrainingData, setSlTrainingData] = useState([]);
    const [slModel, setSlModel] = useState(null);
    const [slTestTree, setSlTestTree] = useState({ dbh: 30, height: 15, barkTexture: 'rough' });
    const [slPrediction, setSlPrediction] = useState('');
    const slCanvasRef = useRef(null);

    // Unsupervised Learning Widget State (Stand Clustering)
    const [uslStands, setUslStands] = useState([]);
    const [uslClusters, setUslClusters] = useState([]);
    const [uslNumClusters, setUslNumClusters] = useState(3);
    const uslCanvasRef = useRef(null);

    // Decision Tree Logic
    useEffect(() => {
        const { dbh, height, age } = treeDecision;
        let result = '';
        
        if (dbh > 30) {
            if (height > 15) {
                result = 'Mature Tree - Ready for harvest';
            } else {
                result = 'Young Tree - Needs more growth';
            }
        } else {
            if (age > 10) {
                result = 'Suppressed Sapling - Consider thinning';
            } else {
                result = 'Sapling - Continue monitoring';
            }
        }
        setTreeResult(result);
    }, [treeDecision]);

    // Initialize Regression Data
    useEffect(() => {
        if (activeWidget === 'regression') {
            // Generate sample DBH vs Volume data
            const data = [];
            for (let i = 0; i < 20; i++) {
                const dbh = 10 + i * 2;
                const volume = 0.5 + dbh * 0.15 + (Math.random() - 0.5) * 2; // Volume = f(DBH) + noise
                data.push({ dbh, volume: Math.max(0.1, volume) });
            }
            setRegressionData(data);
            
            // Calculate simple linear regression: volume = a * dbh + b
            const n = data.length;
            const sumX = data.reduce((s, d) => s + d.dbh, 0);
            const sumY = data.reduce((s, d) => s + d.volume, 0);
            const sumXY = data.reduce((s, d) => s + d.dbh * d.volume, 0);
            const sumX2 = data.reduce((s, d) => s + d.dbh * d.dbh, 0);
            
            const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
            const intercept = (sumY - slope * sumX) / n;
            
            setRegressionLine({ slope, intercept });
        }
    }, [activeWidget]);

    // Draw Regression Plot
    useEffect(() => {
        if (!canvasRef.current || !regressionLine || regressionData.length === 0 || activeWidget !== 'regression') return;
        
        // Small delay to ensure canvas is rendered
        const timer = setTimeout(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            const width = canvas.width;
            const height = canvas.height;
            const padding = 40;
            
            ctx.clearRect(0, 0, width, height);
            
            // Draw background
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, width, height);
            
            // Draw axes
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(padding, height - padding);
            ctx.lineTo(width - padding, height - padding);
            ctx.moveTo(padding, padding);
            ctx.lineTo(padding, height - padding);
            ctx.stroke();
            
            // Labels
            ctx.fillStyle = '#333';
            ctx.font = '12px sans-serif';
            ctx.fillText('DBH (cm)', width / 2 - 30, height - 10);
            ctx.save();
            ctx.translate(15, height / 2);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText('Volume (m³)', 0, 0);
            ctx.restore();
            
            // Scale
            const maxDBH = Math.max(...regressionData.map(d => d.dbh));
            const minDBH = Math.min(...regressionData.map(d => d.dbh));
            const maxVol = Math.max(...regressionData.map(d => d.volume));
            const minVol = Math.min(...regressionData.map(d => d.volume));
            const rangeDBH = maxDBH - minDBH || 1;
            const rangeVol = maxVol - minVol || 1;
            const scaleX = (width - 2 * padding) / rangeDBH;
            const scaleY = (height - 2 * padding) / rangeVol;
            
            // Draw grid lines
            ctx.strokeStyle = '#e5e7eb';
            ctx.lineWidth = 1;
            for (let i = 0; i <= 5; i++) {
                const x = padding + (i / 5) * (width - 2 * padding);
                ctx.beginPath();
                ctx.moveTo(x, padding);
                ctx.lineTo(x, height - padding);
                ctx.stroke();
            }
            for (let i = 0; i <= 5; i++) {
                const y = padding + (i / 5) * (height - 2 * padding);
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(width - padding, y);
                ctx.stroke();
            }
            
            // Draw data points
            ctx.fillStyle = '#3b82f6';
            regressionData.forEach(point => {
                const x = padding + (point.dbh - minDBH) * scaleX;
                const y = height - padding - (point.volume - minVol) * scaleY;
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, 2 * Math.PI);
                ctx.fill();
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.stroke();
            });
            
            // Draw regression line
            ctx.strokeStyle = '#ef4444';
            ctx.lineWidth = 3;
            ctx.beginPath();
            const x1 = padding;
            const y1 = height - padding - (regressionLine.intercept + regressionLine.slope * minDBH - minVol) * scaleY;
            const x2 = width - padding;
            const y2 = height - padding - (regressionLine.intercept + regressionLine.slope * maxDBH - minVol) * scaleY;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            
            // Equation
            ctx.fillStyle = '#ef4444';
            ctx.font = 'bold 12px monospace';
            ctx.fillText(`Volume = ${regressionLine.slope.toFixed(3)} × DBH + ${regressionLine.intercept.toFixed(2)}`, padding, 25);
        }, 100);
        
        return () => clearTimeout(timer);
    }, [regressionData, regressionLine, activeWidget]);

    // Initialize Clustering
    useEffect(() => {
        if (activeWidget === 'clustering') {
            // Generate sample stand data (DBH vs Height)
            const stands = [];
            for (let i = 0; i < 30; i++) {
                const cluster = Math.floor(i / 10);
                const baseX = [15, 35, 25][cluster];
                const baseY = [8, 18, 12][cluster];
                stands.push({
                    id: i,
                    dbh: baseX + (Math.random() - 0.5) * 10,
                    height: baseY + (Math.random() - 0.5) * 6,
                    cluster: -1
                });
            }
            setClusters(stands);
        }
    }, [activeWidget]);

    // Initialize Supervised Learning (Species Classification)
    useEffect(() => {
        if (activeWidget === 'supervised-learning') {
            // Generate labeled training data: Douglas Fir, Western Hemlock, Cedar
            const trainingData = [
                // Douglas Fir (large DBH, tall, rough bark)
                ...Array.from({ length: 8 }, () => ({
                    dbh: 35 + Math.random() * 15,
                    height: 18 + Math.random() * 7,
                    barkTexture: 'rough',
                    species: 'Douglas Fir'
                })),
                // Western Hemlock (medium DBH, medium height, smooth bark)
                ...Array.from({ length: 8 }, () => ({
                    dbh: 20 + Math.random() * 10,
                    height: 12 + Math.random() * 6,
                    barkTexture: 'smooth',
                    species: 'Western Hemlock'
                })),
                // Cedar (small DBH, short, fibrous bark)
                ...Array.from({ length: 8 }, () => ({
                    dbh: 15 + Math.random() * 8,
                    height: 8 + Math.random() * 4,
                    barkTexture: 'fibrous',
                    species: 'Cedar'
                }))
            ];
            setSlTrainingData(trainingData);
            
            // Train a simple model (decision rules based on training data)
            const model = {
                predict: (tree) => {
                    const { dbh, height, barkTexture } = tree;
                    // Simple rules learned from training data
                    if (barkTexture === 'fibrous' && dbh < 25) return 'Cedar';
                    if (barkTexture === 'smooth' && dbh < 30 && height < 18) return 'Western Hemlock';
                    if (dbh > 30 && height > 15) return 'Douglas Fir';
                    if (barkTexture === 'rough' && dbh > 25) return 'Douglas Fir';
                    return 'Western Hemlock'; // default
                }
            };
            setSlModel(model);
        }
    }, [activeWidget]);

    // Update SL prediction when test tree changes
    useEffect(() => {
        if (slModel && activeWidget === 'supervised-learning') {
            const prediction = slModel.predict(slTestTree);
            setSlPrediction(prediction);
        }
    }, [slTestTree, slModel, activeWidget]);

    // Draw SL Training Data Visualization
    useEffect(() => {
        if (!slCanvasRef.current || slTrainingData.length === 0 || activeWidget !== 'supervised-learning') return;
        
        const canvas = slCanvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const padding = 50;
        
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        
        // Draw axes
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.stroke();
        
        // Labels
        ctx.fillStyle = '#333';
        ctx.font = '12px sans-serif';
        ctx.fillText('DBH (cm)', width / 2 - 30, height - 10);
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Height (m)', 0, 0);
        ctx.restore();
        
        // Scale
        const maxDBH = Math.max(...slTrainingData.map(d => d.dbh));
        const minDBH = Math.min(...slTrainingData.map(d => d.dbh));
        const maxHeight = Math.max(...slTrainingData.map(d => d.height));
        const minHeight = Math.min(...slTrainingData.map(d => d.height));
        const rangeDBH = maxDBH - minDBH || 1;
        const rangeHeight = maxHeight - minHeight || 1;
        const scaleX = (width - 2 * padding) / rangeDBH;
        const scaleY = (height - 2 * padding) / rangeHeight;
        
        // Color mapping
        const speciesColors = {
            'Douglas Fir': '#8b4513',
            'Western Hemlock': '#228b22',
            'Cedar': '#2f4f4f'
        };
        
        // Draw training data points
        slTrainingData.forEach(point => {
            const x = padding + (point.dbh - minDBH) * scaleX;
            const y = height - padding - (point.height - minHeight) * scaleY;
            const color = speciesColors[point.species] || '#999';
            
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        });
        
        // Draw test tree if model exists
        if (slModel) {
            const x = padding + (slTestTree.dbh - minDBH) * scaleX;
            const y = height - padding - (slTestTree.height - minHeight) * scaleY;
            
            ctx.fillStyle = '#ff0000';
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Label
            ctx.fillStyle = '#ff0000';
            ctx.font = 'bold 11px sans-serif';
            ctx.fillText('Test Tree', x + 10, y - 10);
        }
    }, [slTrainingData, slTestTree, slModel, activeWidget]);

    // Initialize Unsupervised Learning (Stand Clustering)
    useEffect(() => {
        if (activeWidget === 'unsupervised-learning') {
            // Generate unlabeled stand data (Species Mix % vs Age)
            const stands = [];
            for (let i = 0; i < 40; i++) {
                const naturalCluster = Math.floor(i / 13);
                const baseSpecies = [20, 60, 40][naturalCluster % 3];
                const baseAge = [15, 35, 25][naturalCluster % 3];
                stands.push({
                    id: i,
                    speciesMix: baseSpecies + (Math.random() - 0.5) * 20,
                    age: baseAge + (Math.random() - 0.5) * 10,
                    cluster: -1
                });
            }
            setUslStands(stands);
        }
    }, [activeWidget]);

    // K-Means for Unsupervised Learning
    const runUSLClustering = () => {
        if (uslStands.length === 0) return;
        
        const centroids = [];
        for (let i = 0; i < uslNumClusters; i++) {
            centroids.push({
                speciesMix: Math.random() * 80 + 10,
                age: Math.random() * 40 + 5
            });
        }
        
        let changed = true;
        let iterations = 0;
        
        while (changed && iterations < 10) {
            changed = false;
            iterations++;
            
            const newStands = uslStands.map(stand => {
                let minDist = Infinity;
                let nearestCluster = 0;
                
                centroids.forEach((centroid, idx) => {
                    const dist = Math.sqrt(
                        Math.pow(stand.speciesMix - centroid.speciesMix, 2) + 
                        Math.pow(stand.age - centroid.age, 2)
                    );
                    if (dist < minDist) {
                        minDist = dist;
                        nearestCluster = idx;
                    }
                });
                
                if (stand.cluster !== nearestCluster) changed = true;
                return { ...stand, cluster: nearestCluster };
            });
            
            for (let i = 0; i < uslNumClusters; i++) {
                const clusterPoints = newStands.filter(s => s.cluster === i);
                if (clusterPoints.length > 0) {
                    centroids[i] = {
                        speciesMix: clusterPoints.reduce((s, p) => s + p.speciesMix, 0) / clusterPoints.length,
                        age: clusterPoints.reduce((s, p) => s + p.age, 0) / clusterPoints.length
                    };
                }
            }
            
            setUslStands(newStands);
        }
    };

    // Draw USL Visualization
    useEffect(() => {
        if (!uslCanvasRef.current || uslStands.length === 0 || activeWidget !== 'unsupervised-learning') return;
        
        const canvas = uslCanvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const padding = 50;
        
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        
        // Draw axes
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.stroke();
        
        // Labels
        ctx.fillStyle = '#333';
        ctx.font = '12px sans-serif';
        ctx.fillText('Species Mix (%)', width / 2 - 50, height - 10);
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Stand Age (years)', 0, 0);
        ctx.restore();
        
        // Scale
        const maxSpecies = Math.max(...uslStands.map(s => s.speciesMix));
        const minSpecies = Math.min(...uslStands.map(s => s.speciesMix));
        const maxAge = Math.max(...uslStands.map(s => s.age));
        const minAge = Math.min(...uslStands.map(s => s.age));
        const rangeSpecies = maxSpecies - minSpecies || 1;
        const rangeAge = maxAge - minAge || 1;
        const scaleX = (width - 2 * padding) / rangeSpecies;
        const scaleY = (height - 2 * padding) / rangeAge;
        
        // Color palette
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
        
        // Draw stands
        uslStands.forEach(stand => {
            const x = padding + (stand.speciesMix - minSpecies) * scaleX;
            const y = height - padding - (stand.age - minAge) * scaleY;
            const color = stand.cluster >= 0 ? colors[stand.cluster % colors.length] : '#9ca3af';
            
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1;
            ctx.stroke();
        });
    }, [uslStands, uslNumClusters, activeWidget]);

    // K-Means Clustering Algorithm
    const runClustering = () => {
        if (clusters.length === 0) return;
        
        // Initialize centroids randomly
        const centroids = [];
        for (let i = 0; i < numClusters; i++) {
            centroids.push({
                dbh: Math.random() * 40 + 10,
                height: Math.random() * 15 + 5
            });
        }
        
        // K-means iteration
        let changed = true;
        let iterations = 0;
        const maxIterations = 10;
        
        while (changed && iterations < maxIterations) {
            changed = false;
            iterations++;
            
            // Assign points to nearest centroid
            const newClusters = clusters.map(stand => {
                let minDist = Infinity;
                let nearestCluster = 0;
                
                centroids.forEach((centroid, idx) => {
                    const dist = Math.sqrt(
                        Math.pow(stand.dbh - centroid.dbh, 2) + 
                        Math.pow(stand.height - centroid.height, 2)
                    );
                    if (dist < minDist) {
                        minDist = dist;
                        nearestCluster = idx;
                    }
                });
                
                if (stand.cluster !== nearestCluster) changed = true;
                return { ...stand, cluster: nearestCluster };
            });
            
            // Update centroids
            for (let i = 0; i < numClusters; i++) {
                const clusterPoints = newClusters.filter(s => s.cluster === i);
                if (clusterPoints.length > 0) {
                    centroids[i] = {
                        dbh: clusterPoints.reduce((s, p) => s + p.dbh, 0) / clusterPoints.length,
                        height: clusterPoints.reduce((s, p) => s + p.height, 0) / clusterPoints.length
                    };
                }
            }
            
            setClusters(newClusters);
        }
    };

    // Draw Clustering Visualization
    useEffect(() => {
        if (!clusterCanvasRef.current || clusters.length === 0) return;
        
        const canvas = clusterCanvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const padding = 40;
        
        ctx.clearRect(0, 0, width, height);
        
        // Draw axes
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.stroke();
        
        // Labels
        ctx.fillStyle = '#333';
        ctx.font = '12px sans-serif';
        ctx.fillText('DBH (cm)', width / 2 - 30, height - 10);
        ctx.save();
        ctx.translate(15, height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Height (m)', 0, 0);
        ctx.restore();
        
        // Scale
        const maxDBH = Math.max(...clusters.map(c => c.dbh));
        const minDBH = Math.min(...clusters.map(c => c.dbh));
        const maxHeight = Math.max(...clusters.map(c => c.height));
        const minHeight = Math.min(...clusters.map(c => c.height));
        const rangeDBH = maxDBH - minDBH || 1;
        const rangeHeight = maxHeight - minHeight || 1;
        const scaleX = (width - 2 * padding) / (rangeDBH + 10);
        const scaleY = (height - 2 * padding) / (rangeHeight + 5);
        
        // Color palette
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
        
        // Draw clusters
        clusters.forEach(stand => {
            const x = padding + (stand.dbh - minDBH) * scaleX;
            const y = height - padding - (stand.height - minHeight) * scaleY;
            const color = stand.cluster >= 0 ? colors[stand.cluster % colors.length] : '#9ca3af';
            
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 1;
            ctx.stroke();
        });
    }, [clusters, numClusters]);

    return (
        <div className="flex flex-col gap-6">
            {showGuide && (
                <LabGuideModal title="Lab 1: Machine Learning Fundamentals" onClose={() => setShowGuide(false)}>
                    <MLGuideContent />
                </LabGuideModal>
            )}

            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-indigo-600">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <IconDatabase className="text-indigo-600"/> Module 1: Machine Learning
                    </h3>
                    <button 
                        onClick={() => setShowGuide(true)}
                        className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 text-sm font-bold py-1 px-3 rounded flex items-center gap-2 transition-colors shadow-sm"
                    >
                        <IconBook className="w-4 h-4" /> Open Lab Guide
                    </button>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                    <strong>Scenario:</strong> Explore core machine learning concepts through interactive widgets. Practice with decision trees, regression, and clustering algorithms used in forestry applications.
                </p>
            </div>

            {/* Widget Selector */}
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3">Interactive ML Widgets</h4>
                <div className="flex flex-wrap gap-2">
                    {[
                        { id: 'supervised-learning', label: 'SL: Species Classification', desc: 'Learn from labeled examples' },
                        { id: 'unsupervised-learning', label: 'USL: Stand Clustering', desc: 'Discover patterns without labels' },
                        { id: 'decision-tree', label: 'Decision Tree', desc: 'Build a classification tree' },
                        { id: 'regression', label: 'Linear Regression', desc: 'Predict volume from DBH' },
                        { id: 'clustering', label: 'K-Means Clustering', desc: 'Group similar stands' }
                    ].map(widget => (
                        <button
                            key={widget.id}
                            onClick={() => setActiveWidget(widget.id)}
                            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                                activeWidget === widget.id
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {widget.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Decision Tree Widget */}
            {activeWidget === 'decision-tree' && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h4 className="font-bold text-lg mb-4 text-indigo-800">Decision Tree: Tree Classification</h4>
                    <p className="text-sm text-gray-600 mb-4">
                        Adjust the tree characteristics below. The decision tree will classify the tree based on simple rules.
                    </p>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <label className="text-xs font-bold text-gray-700 block mb-2">DBH (cm)</label>
                            <input
                                type="range"
                                min="5"
                                max="50"
                                value={treeDecision.dbh}
                                onChange={(e) => setTreeDecision({...treeDecision, dbh: parseInt(e.target.value)})}
                                className="w-full"
                            />
                            <div className="text-center font-mono font-bold mt-1">{treeDecision.dbh} cm</div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-700 block mb-2">Height (m)</label>
                            <input
                                type="range"
                                min="2"
                                max="25"
                                value={treeDecision.height}
                                onChange={(e) => setTreeDecision({...treeDecision, height: parseInt(e.target.value)})}
                                className="w-full"
                            />
                            <div className="text-center font-mono font-bold mt-1">{treeDecision.height} m</div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-700 block mb-2">Age (years)</label>
                            <input
                                type="range"
                                min="1"
                                max="30"
                                value={treeDecision.age}
                                onChange={(e) => setTreeDecision({...treeDecision, age: parseInt(e.target.value)})}
                                className="w-full"
                            />
                            <div className="text-center font-mono font-bold mt-1">{treeDecision.age} yrs</div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                        <div className="text-xs font-mono text-gray-600 mb-2">Decision Tree Logic:</div>
                        <div className="text-xs font-mono bg-white p-2 rounded border">
                            IF DBH &gt; 30cm:<br/>
                            &nbsp;&nbsp;IF Height &gt; 15m: → Mature Tree<br/>
                            &nbsp;&nbsp;ELSE: → Young Tree<br/>
                            ELSE:<br/>
                            &nbsp;&nbsp;IF Age &gt; 10yrs: → Suppressed Sapling<br/>
                            &nbsp;&nbsp;ELSE: → Sapling
                        </div>
                    </div>

                    <div className={`p-4 rounded-lg border-2 ${
                        treeResult.includes('Mature') ? 'bg-green-50 border-green-300' :
                        treeResult.includes('Young') ? 'bg-blue-50 border-blue-300' :
                        treeResult.includes('Suppressed') ? 'bg-yellow-50 border-yellow-300' :
                        'bg-gray-50 border-gray-300'
                    }`}>
                        <div className="font-bold text-gray-800 mb-1">Classification Result:</div>
                        <div className="text-lg font-bold">{treeResult}</div>
                    </div>
                </div>
            )}

            {/* Regression Widget */}
            {activeWidget === 'regression' && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h4 className="font-bold text-lg mb-4 text-indigo-800">Linear Regression: Volume Prediction</h4>
                    <p className="text-sm text-gray-600 mb-4">
                        This widget shows how linear regression finds the best line to predict tree volume from DBH. The red line is the "best fit" that minimizes prediction error.
                    </p>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                        <div className="text-xs text-blue-800">
                            <strong>How It Works:</strong> The algorithm finds the line (Volume = slope × DBH + intercept) that minimizes the distance between all data points and the line. This is called "least squares" regression.
                        </div>
                    </div>

                    <div className="bg-gray-900 p-4 rounded-lg">
                        <canvas ref={canvasRef} width="500" height="300" className="w-full h-auto bg-white rounded"></canvas>
                    </div>

                    <div className="mt-4 bg-gray-50 p-3 rounded text-xs text-gray-700">
                        <strong>Interpretation:</strong> Each blue dot represents a measured tree. The red line shows the model's prediction. 
                        Trees above the line have more volume than predicted; trees below have less. This model can predict volume for new trees based on DBH alone.
                    </div>
                </div>
            )}

            {/* Clustering Widget */}
            {activeWidget === 'clustering' && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h4 className="font-bold text-lg mb-4 text-indigo-800">K-Means Clustering: Stand Grouping</h4>
                    <p className="text-sm text-gray-600 mb-4">
                        K-Means automatically groups similar stands together without labels. Each color represents a different cluster (stand type).
                    </p>
                    
                    <div className="flex items-center gap-4 mb-4">
                        <label className="text-sm font-bold">Number of Clusters:</label>
                        <input
                            type="range"
                            min="2"
                            max="5"
                            value={numClusters}
                            onChange={(e) => setNumClusters(parseInt(e.target.value))}
                            className="flex-1"
                        />
                        <span className="font-mono font-bold w-12 text-center">{numClusters}</span>
                        <button
                            onClick={runClustering}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
                        >
                            Run Clustering
                        </button>
                    </div>

                    <div className="bg-gray-900 p-4 rounded-lg mb-4">
                        <canvas ref={clusterCanvasRef} width="500" height="300" className="w-full h-auto bg-white rounded"></canvas>
                    </div>

                    <div className="bg-purple-50 p-3 rounded text-xs text-purple-800 border border-purple-200">
                        <strong>K-Means Algorithm:</strong> 1) Randomly place cluster centers, 2) Assign each stand to nearest center, 3) Move centers to average of their stands, 4) Repeat until stable. 
                        This discovers natural groupings in your data (e.g., "mature stands," "young stands," "mixed stands").
                    </div>
                </div>
            )}

            {/* Supervised Learning Widget */}
            {activeWidget === 'supervised-learning' && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h4 className="font-bold text-lg mb-4 text-green-800">Supervised Learning: Species Classification</h4>
                    <p className="text-sm text-gray-600 mb-4">
                        <strong>Forestry Application:</strong> Train a model to classify tree species from labeled examples. The model learns patterns from training data where you know the correct species (labels).
                    </p>
                    
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
                        <div className="text-xs text-green-800 mb-2">
                            <strong>How Supervised Learning Works:</strong> You provide labeled training data (e.g., "This tree with DBH=40cm, Height=20m, rough bark is Douglas Fir"). 
                            The model learns patterns and can then predict species for new, unlabeled trees.
                        </div>
                        <div className="text-xs text-green-700 mt-2">
                            <strong>Training Data:</strong> 24 labeled trees (8 Douglas Fir, 8 Western Hemlock, 8 Cedar)
                        </div>
                    </div>

                    <div className="bg-gray-900 p-4 rounded-lg mb-4">
                        <canvas ref={slCanvasRef} width="500" height="300" className="w-full h-auto bg-white rounded"></canvas>
                        <div className="mt-2 flex gap-4 justify-center text-xs text-white">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-[#8b4513]"></div>
                                <span>Douglas Fir</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-[#228b22]"></div>
                                <span>Western Hemlock</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-[#2f4f4f]"></div>
                                <span>Cedar</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white"></div>
                                <span>Test Tree</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                        <h5 className="font-bold text-sm mb-3 text-gray-800">Test Tree Characteristics</h5>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="text-xs font-bold text-gray-700 block mb-2">DBH (cm)</label>
                                <input
                                    type="range"
                                    min="10"
                                    max="50"
                                    value={slTestTree.dbh}
                                    onChange={(e) => setSlTestTree({...slTestTree, dbh: parseInt(e.target.value)})}
                                    className="w-full"
                                />
                                <div className="text-center font-mono font-bold mt-1">{slTestTree.dbh} cm</div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-700 block mb-2">Height (m)</label>
                                <input
                                    type="range"
                                    min="5"
                                    max="25"
                                    value={slTestTree.height}
                                    onChange={(e) => setSlTestTree({...slTestTree, height: parseInt(e.target.value)})}
                                    className="w-full"
                                />
                                <div className="text-center font-mono font-bold mt-1">{slTestTree.height} m</div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-700 block mb-2">Bark Texture</label>
                                <select
                                    value={slTestTree.barkTexture}
                                    onChange={(e) => setSlTestTree({...slTestTree, barkTexture: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded text-sm"
                                >
                                    <option value="rough">Rough</option>
                                    <option value="smooth">Smooth</option>
                                    <option value="fibrous">Fibrous</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={`p-4 rounded-lg border-2 ${
                        slPrediction === 'Douglas Fir' ? 'bg-amber-50 border-amber-300' :
                        slPrediction === 'Western Hemlock' ? 'bg-green-50 border-green-300' :
                        'bg-slate-50 border-slate-300'
                    }`}>
                        <div className="font-bold text-gray-800 mb-1">Model Prediction:</div>
                        <div className="text-xl font-bold">{slPrediction || 'Adjust tree characteristics above'}</div>
                        <div className="text-xs text-gray-600 mt-2">
                            The model learned from 24 labeled examples and is now predicting the species of your test tree.
                        </div>
                    </div>
                </div>
            )}

            {/* Unsupervised Learning Widget */}
            {activeWidget === 'unsupervised-learning' && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h4 className="font-bold text-lg mb-4 text-purple-800">Unsupervised Learning: Stand Type Discovery</h4>
                    <p className="text-sm text-gray-600 mb-4">
                        <strong>Forestry Application:</strong> Discover natural groupings in your stand data without labels. The algorithm finds patterns you might not have noticed manually.
                    </p>
                    
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-4">
                        <div className="text-xs text-purple-800 mb-2">
                            <strong>How Unsupervised Learning Works:</strong> You provide unlabeled data (40 stands with Species Mix % and Age). 
                            The algorithm discovers natural clusters—you don't tell it what to look for, it finds patterns on its own.
                        </div>
                        <div className="text-xs text-purple-700 mt-2">
                            <strong>Use Case:</strong> Identify stand types for harvest planning, market segmentation, or silvicultural prescriptions.
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <label className="text-sm font-bold">Number of Clusters:</label>
                        <input
                            type="range"
                            min="2"
                            max="5"
                            value={uslNumClusters}
                            onChange={(e) => setUslNumClusters(parseInt(e.target.value))}
                            className="flex-1"
                        />
                        <span className="font-mono font-bold w-12 text-center">{uslNumClusters}</span>
                        <button
                            onClick={runUSLClustering}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-purple-700 transition-colors"
                        >
                            Discover Clusters
                        </button>
                    </div>

                    <div className="bg-gray-900 p-4 rounded-lg mb-4">
                        <canvas ref={uslCanvasRef} width="500" height="300" className="w-full h-auto bg-white rounded"></canvas>
                    </div>

                    <div className="bg-purple-50 p-3 rounded text-xs text-purple-800 border border-purple-200">
                        <strong>Key Difference from Supervised Learning:</strong> In SL, you provide labels (e.g., "this is a Douglas Fir"). 
                        In USL, you provide only data (Species Mix %, Age) and the algorithm discovers that stands naturally group into types—patterns you might not have known existed.
                        <br/><br/>
                        <strong>Forestry Benefit:</strong> Discover stand types for operational planning without needing to manually classify hundreds of stands first.
                    </div>
                </div>
            )}
        </div>
    );
};

