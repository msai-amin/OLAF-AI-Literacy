import { useState } from 'react';
import { IconDatabase, IconBook } from './icons';
import { LabGuideModal } from './LabGuideModal';
import { DataQualityGuideContent } from './guides/DataQualityGuideContent';

export const DataLab = () => {
    const [stage, setStage] = useState('train'); // train, test, result
    const [trainingSet, setTrainingSet] = useState([]);
    const [modelQuality, setModelQuality] = useState(0); // 0 to 100
    const [showGuide, setShowGuide] = useState(false);
    
    // Training Images
    const samples = [
        { id: 1, type: 'tree', label: 'Healthy Fir', icon: '🌲', correct: true, description: 'Live merchantable tree' },
        { id: 2, type: 'tree', label: 'Spruce', icon: '🌲', correct: true, description: 'Live merchantable tree' },
        { id: 3, type: 'pole', label: 'Telephone Pole', icon: '📡', correct: false, description: 'NOT a tree - infrastructure' },
        { id: 4, type: 'snag', label: 'Dead Snag', icon: '💀', correct: false, description: 'NOT merchantable - dead tree' },
        { id: 5, type: 'tree', label: 'Pine', icon: '🌲', correct: true, description: 'Live merchantable tree' },
    ];

    const toggleTrain = (id) => {
        if(trainingSet.includes(id)) setTrainingSet(trainingSet.filter(i => i !== id));
        else setTrainingSet([...trainingSet, id]);
    };

    const runTraining = () => {
        let treesSelected = 0;
        let trashSelected = 0;
        const totalTrees = samples.filter(s => s.correct).length;

        trainingSet.forEach(id => {
            const sample = samples.find(s => s.id === id);
            if(sample.correct) { 
                treesSelected++; 
            } else { 
                trashSelected++; 
            }
        });

        // Calculate score based on data quality
        let score = 0;
        
        // Perfect selection: all trees selected, no trash = 100%
        if (treesSelected === totalTrees && trashSelected === 0) {
            score = 100;
        }
        // Good selection: all trees selected, but some trash included = 70-90%
        else if (treesSelected === totalTrees && trashSelected > 0) {
            score = Math.max(70, 90 - (trashSelected * 10)); // Each trash item reduces by 10%
        }
        // Partial selection: some trees missing, but no trash = 70-95%
        // Reward clean data even if incomplete
        else if (treesSelected < totalTrees && trashSelected === 0 && treesSelected > 0) {
            const completeness = (treesSelected / totalTrees) * 100;
            score = Math.max(70, completeness * 0.95); // High score for clean partial data
        }
        // Poor selection: missing trees AND including trash = 0-60%
        else {
            const completeness = (treesSelected / totalTrees) * 100;
            const penalty = trashSelected * 30; // Heavy penalty for garbage
            score = Math.max(0, completeness - penalty);
        }

        // Ensure score is between 0 and 100
        score = Math.max(0, Math.min(100, Math.round(score)));

        setModelQuality(score);
        setStage('result');
    };

    return (
        <div className="max-w-4xl mx-auto">
            {showGuide && (
                <LabGuideModal title="Lab 5: Garbage In, Garbage Out" onClose={() => setShowGuide(false)}>
                    <DataQualityGuideContent />
                </LabGuideModal>
            )}

            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-600 mb-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <IconDatabase className="text-yellow-600"/> Module 5: Data Quality
                    </h3>
                    <button 
                        onClick={() => setShowGuide(true)}
                        className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-sm font-bold py-1 px-3 rounded flex items-center gap-2 transition-colors"
                    >
                        <IconBook className="w-4 h-4" /> Open Lab Guide
                    </button>
                </div>
                <p className="text-gray-600 text-sm">
                    <strong>Scenario:</strong> You're training a drone AI to identify merchantable trees. Your training data quality determines whether the model succeeds or fails in the field.
                </p>
            </div>

            {stage === 'train' && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <div className="text-center mb-6">
                        <h3 className="font-bold text-xl mb-3 text-gray-800">Train Your Drone AI Model</h3>
                        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-4 text-left">
                            <p className="text-sm text-yellow-800 mb-2">
                                <strong>Your Mission:</strong> Select <strong>ONLY</strong> the samples that represent <strong>Live Merchantable Trees</strong>.
                            </p>
                            <p className="text-xs text-yellow-700">
                                ⚠️ <strong>Warning:</strong> If you include garbage (poles, snags) in your training data, the AI will learn to classify garbage as trees. This is called <strong>"Garbage In, Garbage Out" (GIGO)</strong>.
                            </p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                        {samples.map(s => (
                            <div 
                                key={s.id} 
                                onClick={() => toggleTrain(s.id)}
                                className={`border-2 rounded-lg cursor-pointer flex flex-col items-center justify-center gap-2 p-4 transition-all ${
                                    trainingSet.includes(s.id) 
                                        ? s.correct 
                                            ? 'border-green-500 bg-green-50 ring-4 ring-green-200 shadow-lg scale-105' 
                                            : 'border-red-500 bg-red-50 ring-4 ring-red-200 shadow-lg scale-105'
                                        : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                                }`}
                            >
                                <div className="text-5xl">{s.icon}</div>
                                <div className="text-sm font-bold text-gray-700 text-center">{s.label}</div>
                                <div className={`text-xs text-center ${s.correct ? 'text-green-700' : 'text-red-700'}`}>
                                    {s.description}
                                </div>
                                {trainingSet.includes(s.id) && (
                                    <div className="text-xs font-bold mt-1">
                                        {s.correct ? '✅ Selected' : '❌ Selected'}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="font-bold text-gray-700">Selected Samples:</span>
                            <span className="font-mono text-lg">{trainingSet.length} / {samples.length}</span>
                        </div>
                        <div className="mt-2 text-xs text-gray-600">
                            {trainingSet.length === 0 && <span className="text-gray-400">No samples selected yet</span>}
                            {trainingSet.length > 0 && (
                                <span>
                                    Selected: {trainingSet.map(id => {
                                        const s = samples.find(s => s.id === id);
                                        return s?.label;
                                    }).join(', ')}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="text-center">
                        <button 
                            onClick={runTraining} 
                            disabled={trainingSet.length === 0}
                            className="bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 shadow-lg transform transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Train Model
                        </button>
                        {trainingSet.length === 0 && (
                            <p className="text-xs text-gray-500 mt-2">Select at least one sample to train the model</p>
                        )}
                    </div>
                </div>
            )}

            {stage === 'result' && (
                <div className="bg-white p-6 rounded-lg border shadow-lg">
                    <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Model Performance Report</h3>
                    
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-bold text-gray-700">Model Accuracy Score</span>
                            <span className="font-mono font-bold text-2xl">{modelQuality}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                            <div 
                                className={`h-6 rounded-full transition-all duration-1000 flex items-center justify-center text-white text-xs font-bold ${
                                    modelQuality > 80 ? 'bg-green-500' : modelQuality > 40 ? 'bg-yellow-500' : 'bg-red-500'
                                }`} 
                                style={{ width: `${modelQuality}%` }}
                            >
                                {modelQuality > 0 && `${modelQuality}%`}
                            </div>
                        </div>
                    </div>

                    {/* Detailed Analysis */}
                    <div className="mb-6 space-y-4">
                        {(() => {
                            const treesSelected = trainingSet.filter(id => samples.find(s => s.id === id)?.correct).length;
                            const trashSelected = trainingSet.filter(id => !samples.find(s => s.id === id)?.correct).length;
                            const totalTrees = samples.filter(s => s.correct).length;
                            
                            return (
                                <div className="bg-gray-50 p-4 rounded-lg text-sm">
                                    <h4 className="font-bold mb-3 text-gray-800">Training Data Analysis</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-gray-600">Trees Selected:</div>
                                            <div className="font-bold text-lg">{treesSelected} / {totalTrees}</div>
                                        </div>
                                        <div>
                                            <div className="text-gray-600">Garbage Selected:</div>
                                            <div className={`font-bold text-lg ${trashSelected > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                {trashSelected}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}

                        <div className={`p-5 rounded-lg border-2 ${
                            modelQuality > 80 
                                ? 'bg-green-50 border-green-300' 
                                : modelQuality > 40 
                                    ? 'bg-yellow-50 border-yellow-300' 
                                    : 'bg-red-50 border-red-300'
                        }`}>
                            {modelQuality > 80 ? (
                                <div>
                                    <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                                        <span>✅ Success!</span>
                                    </h4>
                                    <p className="text-green-700 text-sm mb-2">
                                        <strong>Excellent work!</strong> You selected only high-quality training data (live merchantable trees). 
                                    </p>
                                    <p className="text-green-700 text-sm mb-2">
                                        This model can now distinguish between a tree and a telephone pole in the field. It's ready for deployment.
                                    </p>
                                    <p className="text-green-700 text-xs italic">
                                        <strong>Real-world impact:</strong> Accurate inventory counts, correct volume calculations, reliable harvest planning.
                                    </p>
                                </div>
                            ) : modelQuality > 40 ? (
                                <div>
                                    <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                                        <span>⚠️ Mediocre Performance</span>
                                    </h4>
                                    <p className="text-yellow-700 text-sm mb-2">
                                        <strong>Not quite there.</strong> You either missed some trees or included some garbage in your training data.
                                    </p>
                                    <p className="text-yellow-700 text-sm mb-2">
                                        The AI will struggle in the field. It may miss trees or incorrectly classify non-trees as merchantable timber.
                                    </p>
                                    <p className="text-yellow-700 text-xs italic">
                                        <strong>Real-world impact:</strong> Inaccurate inventory, potential financial losses, unreliable results.
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                                        <span>❌ Failure (GIGO)</span>
                                    </h4>
                                    <p className="text-red-700 text-sm mb-2">
                                        <strong>Garbage In, Garbage Out.</strong> You trained the AI on garbage (poles/snags). 
                                    </p>
                                    <p className="text-red-700 text-sm mb-2">
                                        This model will now classify every telephone pole and dead snag as a merchantable log. 
                                        <strong>This is a liability nightmare.</strong>
                                    </p>
                                    <p className="text-red-700 text-xs italic mb-2">
                                        <strong>Real-world impact:</strong> Massive overestimation of inventory, financial losses, regulatory violations, potential legal liability.
                                    </p>
                                    <div className="bg-red-100 p-3 rounded border border-red-300 mt-3">
                                        <p className="text-red-800 text-xs font-bold">
                                            ⚠️ This model should NOT be deployed. Retrain with clean data immediately.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-center space-y-3">
                        <button 
                            onClick={() => {setStage('train'); setTrainingSet([]); setModelQuality(0);}} 
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                        <p className="text-xs text-gray-500">
                            Experiment with different selections to see how data quality affects model performance
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

