import { useState, useEffect, useRef } from 'react';
import { IconEye, IconBook } from './icons';
import { LabGuideModal } from './LabGuideModal';
import { VisionGuideContent } from './guides/VisionGuideContent';
import { computeVisionStats } from '../utils/visionStats';

export const VisionLab = () => {
    const canvasRef = useRef(null);
    const [threshold, setThreshold] = useState(50);
    const [stats, setStats] = useState({ logsFound: 0, falsePositives: 0, actualLogs: 0 });
    const [objects, setObjects] = useState([]);
    const [showGuide, setShowGuide] = useState(false);

    useEffect(() => {
        const newObjects = [];
        // Logs: scores distributed across a wider range (0.3 to 1.0) so recall can vary with threshold
        for(let i=0; i<15; i++) {
            newObjects.push({
                x: Math.random() * 500 + 50,
                y: Math.random() * 300 + 50,
                r: Math.random() * 15 + 10,
                type: 'log',
                score: Math.random() * 0.7 + 0.3  // Range: 0.3 to 1.0
            });
        }
        // Rocks: scores also distributed but generally lower, with some overlap
        for(let i=0; i<20; i++) {
            newObjects.push({
                x: Math.random() * 500 + 50,
                y: Math.random() * 300 + 50,
                r: Math.random() * 10 + 5,
                type: 'rock',
                score: Math.random() * 0.65  // Range: 0 to 0.65 (overlaps with logs in 0.3-0.65 range)
            });
        }
        setObjects(newObjects);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0,0, 600, 400);

        ctx.fillStyle = '#3f3f3f'; 
        ctx.fillRect(0,0, 600, 400);

        const nextStats = computeVisionStats(objects, threshold);
        setStats(nextStats);

        objects.forEach(obj => {
            if(obj.type === 'log') {
                ctx.beginPath();
                ctx.arc(obj.x, obj.y, obj.r, 0, 2*Math.PI);
                ctx.fillStyle = '#d4a373'; 
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(obj.x, obj.y, obj.r*0.6, 0, 2*Math.PI);
                ctx.strokeStyle = '#a98467';
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.moveTo(obj.x, obj.y - obj.r);
                ctx.lineTo(obj.x + obj.r, obj.y + obj.r);
                ctx.lineTo(obj.x - obj.r, obj.y + obj.r);
                ctx.closePath();
                ctx.fillStyle = '#7f8c8d'; 
                ctx.fill();
            }

            if(obj.score >= (threshold / 100)) {
                ctx.strokeStyle = '#00ff00'; 
                ctx.lineWidth = 2;
                ctx.strokeRect(obj.x - obj.r - 2, obj.y - obj.r - 2, obj.r*2+4, obj.r*2+4);
                ctx.fillStyle = '#00ff00';
                ctx.font = '10px monospace';
                ctx.fillText(`LOG ${(obj.score*100).toFixed(0)}%`, obj.x - obj.r, obj.y - obj.r - 4);
            }
        });

    }, [threshold, objects]);

    return (
        <div className="flex flex-col gap-4">
            {showGuide && (
                <LabGuideModal title="Lab 2: The Digital Eye" onClose={() => setShowGuide(false)}>
                    <VisionGuideContent />
                </LabGuideModal>
            )}
            
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <IconEye className="text-blue-600"/> Module 2: Computer Vision
                    </h3>
                    <button 
                        onClick={() => setShowGuide(true)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-bold py-1 px-3 rounded flex items-center gap-2 transition-colors shadow-sm"
                    >
                        <IconBook className="w-4 h-4" /> Open Lab Guide
                    </button>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                    Simulate a "Log Scaler" app. Adjust the <strong>Confidence Threshold</strong> to see how the AI decides what is a log. Each object has a confidence score—only objects scoring above your threshold are detected (shown with green boxes).
                </p>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mb-4 text-xs">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <strong className="text-blue-900">How It Works:</strong>
                            <ul className="text-blue-800 mt-1 space-y-1 list-disc list-inside">
                                <li>AI analyzes pixel colors, shapes, and patterns</li>
                                <li>Assigns a confidence score (0-100%) to each object</li>
                                <li>Your threshold filters detections</li>
                                <li>Green boxes = detected objects</li>
                            </ul>
                        </div>
                        <div>
                            <strong className="text-blue-900">Key Metrics:</strong>
                            <ul className="text-blue-800 mt-1 space-y-1">
                                <li><strong>Precision:</strong> Accuracy of detections (fewer false positives = higher precision)</li>
                                <li><strong>Recall:</strong> Coverage of actual logs (finding more logs = higher recall)</li>
                                <li><strong>Trade-off:</strong> Can't maximize both simultaneously</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                    <label id="confidence-threshold-label" htmlFor="confidence-threshold" className="font-bold text-sm whitespace-nowrap">
                        AI Confidence:
                    </label>
                    <input 
                        id="confidence-threshold"
                        type="range" 
                        min="1" max="99" 
                        value={threshold} 
                        onChange={(e) => setThreshold(e.target.value)}
                        aria-valuemin={1}
                        aria-valuemax={99}
                        aria-valuenow={threshold}
                        aria-valuetext={`${threshold} percent`}
                        aria-labelledby="confidence-threshold-label"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="w-12 text-center font-mono font-bold bg-gray-100 p-1 rounded" aria-hidden="true">{threshold}%</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center mb-2" role="status" aria-live="polite" aria-atomic="true">
                    <div className="bg-blue-50 p-2 rounded border border-blue-200">
                        <div className="text-xs text-blue-800 font-semibold">Actual Logs</div>
                        <div className="font-bold text-xl text-blue-900">{stats.actualLogs}</div>
                        <div className="text-xs text-blue-600 mt-1">Ground Truth</div>
                    </div>
                    <div className="bg-green-50 p-2 rounded border border-green-200">
                        <div className="text-xs text-green-800 font-semibold">Correctly ID'd</div>
                        <div className="font-bold text-xl text-green-900">{stats.logsFound}</div>
                        <div className="text-xs text-green-600 mt-1">
                            Recall: {stats.actualLogs > 0 ? Math.round((stats.logsFound / stats.actualLogs) * 100) : 0}%
                        </div>
                    </div>
                    <div className="bg-red-50 p-2 rounded border border-red-200">
                        <div className="text-xs text-red-800 font-semibold">False Positives</div>
                        <div className="font-bold text-xl text-red-600">{stats.falsePositives}</div>
                        <div className="text-xs text-red-600 mt-1">
                            Precision: {stats.logsFound + stats.falsePositives > 0 ? Math.round((stats.logsFound / (stats.logsFound + stats.falsePositives)) * 100) : 0}%
                        </div>
                    </div>
                </div>
                {stats.logsFound + stats.falsePositives > 0 && (
                    <div className="bg-gray-50 p-2 rounded text-xs text-gray-700 border border-gray-200">
                        <strong>Performance Summary:</strong> The AI detected {stats.logsFound + stats.falsePositives} objects. 
                        {stats.falsePositives > 0 ? (
                            <span className="text-red-600"> {stats.falsePositives} are false positives (rocks misidentified as logs).</span>
                        ) : (
                            <span className="text-green-600"> No false positives detected!</span>
                        )}
                        {' '}Found {stats.logsFound} of {stats.actualLogs} actual logs ({stats.actualLogs > 0 ? Math.round((stats.logsFound / stats.actualLogs) * 100) : 0}% recall).
                    </div>
                )}
            </div>
            <div className="flex justify-center bg-gray-900 rounded-lg p-2 shadow-inner overflow-hidden relative">
                <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded pointer-events-none">
                    Live Feed
                </div>
                <canvas ref={canvasRef} width="600" height="400" className="w-full h-auto bg-gray-800 rounded"></canvas>
            </div>
        </div>
    );
};

