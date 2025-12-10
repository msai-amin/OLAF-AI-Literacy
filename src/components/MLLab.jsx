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
        </div>
    );
};

