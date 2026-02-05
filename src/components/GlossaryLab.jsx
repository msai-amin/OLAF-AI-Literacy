import { IconBook, IconDatabase, IconEye, IconScan } from './icons';

// Visual Components
const NeuralNetworkDiagram = () => (
    <div className="my-4 p-4 bg-white rounded-lg border-2 border-purple-300">
        <svg viewBox="0 0 300 200" className="w-full h-auto">
            {/* Input Layer */}
            <g>
                {[0, 1, 2].map(i => (
                    <circle key={i} cx="50" cy={40 + i * 60} r="12" fill="#9333ea" stroke="#6b21a8" strokeWidth="2"/>
                ))}
                <text x="50" y="180" textAnchor="middle" className="text-xs fill-gray-700 font-semibold">Input</text>
            </g>
            {/* Hidden Layers */}
            <g>
                {[0, 1, 2, 3].map(i => (
                    <circle key={i} cx="150" cy={20 + i * 45} r="12" fill="#a855f7" stroke="#7e22ce" strokeWidth="2"/>
                ))}
                <text x="150" y="180" textAnchor="middle" className="text-xs fill-gray-700 font-semibold">Hidden</text>
            </g>
            {/* Output Layer */}
            <g>
                {[0, 1].map(i => (
                    <circle key={i} cx="250" cy={50 + i * 100} r="12" fill="#c084fc" stroke="#9333ea" strokeWidth="2"/>
                ))}
                <text x="250" y="180" textAnchor="middle" className="text-xs fill-gray-700 font-semibold">Output</text>
            </g>
            {/* Connections */}
            {[0, 1, 2].map(i => 
                [0, 1, 2, 3].map(j => (
                    <line key={`${i}-${j}`} x1="62" y1={40 + i * 60} x2="138" y2={20 + j * 45} 
                          stroke="#d8b4fe" strokeWidth="1" opacity="0.5"/>
                ))
            )}
            {[0, 1, 2, 3].map(i => 
                [0, 1].map(j => (
                    <line key={`h${i}-o${j}`} x1="162" y1={20 + i * 45} x2="238" y2={50 + j * 100} 
                          stroke="#d8b4fe" strokeWidth="1" opacity="0.5"/>
                ))
            )}
        </svg>
    </div>
);

const RAGFlowDiagram = () => (
    <div className="my-4 p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl border-2 border-indigo-300 shadow-md">
        <img 
            src="/assets/rag-diagram.png" 
            alt="RAG (Retrieval-Augmented Generation) Architecture Flow Diagram showing the 5-step process: User Query → Embedding → Vector Database → Retrieve → LLM Generation"
            className="w-full h-auto rounded-lg"
        />
    </div>
);

const SupervisedUnsupervisedDiagram = () => (
    <div className="my-4 grid grid-cols-2 gap-4">
        <div className="p-3 bg-green-50 rounded-lg border-2 border-green-300">
            <div className="text-center mb-2">
                <span className="text-sm font-bold text-green-900">Supervised Learning</span>
            </div>
            <svg viewBox="0 0 150 120" className="w-full h-auto">
                {/* Labeled data points */}
                <circle cx="30" cy="30" r="5" fill="#22c55e"/>
                <text x="30" y="45" textAnchor="middle" className="text-xs fill-green-700">Tree</text>
                <circle cx="60" cy="50" r="5" fill="#22c55e"/>
                <text x="60" y="65" textAnchor="middle" className="text-xs fill-green-700">Tree</text>
                <circle cx="90" cy="40" r="5" fill="#ef4444"/>
                <text x="90" y="55" textAnchor="middle" className="text-xs fill-red-700">Pole</text>
                <circle cx="120" cy="60" r="5" fill="#ef4444"/>
                <text x="120" y="75" textAnchor="middle" className="text-xs fill-red-700">Pole</text>
                <line x1="20" y1="20" x2="130" y2="70" stroke="#86efac" strokeWidth="2" strokeDasharray="3,3"/>
                <text x="75" y="15" textAnchor="middle" className="text-xs fill-green-700 font-semibold">Decision Boundary</text>
            </svg>
        </div>
        <div className="p-3 bg-yellow-50 rounded-lg border-2 border-yellow-300">
            <div className="text-center mb-2">
                <span className="text-sm font-bold text-yellow-900">Unsupervised Learning</span>
            </div>
            <svg viewBox="0 0 150 120" className="w-full h-auto">
                {/* Clustered data points */}
                <g>
                    <circle cx="40" cy="30" r="5" fill="#eab308"/>
                    <circle cx="50" cy="35" r="5" fill="#eab308"/>
                    <circle cx="35" cy="40" r="5" fill="#eab308"/>
                </g>
                <g>
                    <circle cx="100" cy="60" r="5" fill="#f59e0b"/>
                    <circle cx="110" cy="65" r="5" fill="#f59e0b"/>
                    <circle cx="95" cy="70" r="5" fill="#f59e0b"/>
                </g>
                <text x="42" y="50" textAnchor="middle" className="text-xs fill-yellow-700">Cluster 1</text>
                <text x="102" y="80" textAnchor="middle" className="text-xs fill-yellow-700">Cluster 2</text>
            </svg>
        </div>
    </div>
);

const ComputerVisionPipeline = () => (
    <div className="my-4 p-4 bg-white rounded-lg border-2 border-cyan-300">
        <svg viewBox="0 0 500 100" className="w-full h-auto">
            <rect x="10" y="30" width="80" height="40" rx="5" fill="#06b6d4" stroke="#0891b2" strokeWidth="2"/>
            <text x="50" y="55" textAnchor="middle" className="text-xs fill-white font-semibold">Image</text>
            <path d="M 100 50 L 120 50" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
            
            <rect x="130" y="30" width="80" height="40" rx="5" fill="#22d3ee" stroke="#06b6d4" strokeWidth="2"/>
            <text x="170" y="55" textAnchor="middle" className="text-xs fill-cyan-900 font-semibold">Preprocess</text>
            <path d="M 220 50 L 240 50" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
            
            <rect x="250" y="30" width="80" height="40" rx="5" fill="#67e8f9" stroke="#22d3ee" strokeWidth="2"/>
            <text x="290" y="55" textAnchor="middle" className="text-xs fill-cyan-900 font-semibold">Feature</text>
            <text x="290" y="65" textAnchor="middle" className="text-xs fill-cyan-900 font-semibold">Extract</text>
            <path d="M 340 50 L 360 50" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead2)"/>
            
            <rect x="370" y="30" width="80" height="40" rx="5" fill="#a5f3fc" stroke="#67e8f9" strokeWidth="2"/>
            <text x="410" y="55" textAnchor="middle" className="text-xs fill-cyan-900 font-semibold">Detect</text>
            <defs>
                <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#06b6d4"/>
                </marker>
            </defs>
        </svg>
    </div>
);

export const GlossaryLab = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div className="bg-white p-8 rounded-xl shadow-lg border-l-8 border-blue-700">
                <h2 className="text-3xl font-bold mb-4 text-slate-900 flex items-center gap-3">
                    <IconBook className="text-blue-700" /> AI Glossary
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                    A comprehensive glossary of Artificial Intelligence (AI) terms and definitions, organized by category for clarity.
                </p>
            </div>

            {/* Core Concepts */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-2xl font-bold mb-4 text-slate-900 border-b-2 border-blue-500 pb-2">
                    Core Concepts
                </h3>
                <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                                <IconDatabase className="w-6 h-6 text-blue-700" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg text-blue-900 mb-2">Artificial Intelligence (AI)</h4>
                                <p className="text-gray-700">
                                    A field of computer science dedicated to creating systems capable of performing tasks that typically require human intelligence, such as recognizing speech, making decisions, and identifying patterns.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-bold text-lg text-blue-900 mb-2">Algorithm</h4>
                        <p className="text-gray-700">
                            A set of rules or instructions given to an AI, neural network, or other machine to help it learn on its own (see Machine Learning).
                        </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-bold text-lg text-blue-900 mb-2">Artificial General Intelligence (AGI)</h4>
                        <p className="text-gray-700">
                            A theoretical form of AI where a machine would possess the ability to understand, learn, and apply intelligence to any intellectual task that a human being can. Also known as "Strong AI."
                        </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-bold text-lg text-blue-900 mb-2">Narrow AI (Weak AI)</h4>
                        <p className="text-gray-700">
                            AI systems designed to handle a specific or limited task, such as facial recognition, internet searches, or driving a car. This is the only form of AI that exists today.
                        </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-bold text-lg text-blue-900 mb-2">Turing Test</h4>
                        <p className="text-gray-700">
                            A test proposed by Alan Turing in 1950 to determine if a machine has the ability to exhibit intelligent behavior equivalent to, or indistinguishable from, that of a human.
                        </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <h4 className="font-bold text-lg text-blue-900 mb-2">Black Box</h4>
                        <p className="text-gray-700 mb-4">
                            A description of an AI system whose internal workings and decision-making processes are not transparent or understood by humans, even its creators.
                        </p>
                        <div className="my-4 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-300 shadow-md">
                            <svg viewBox="0 0 500 200" className="w-full h-auto">
                                <defs>
                                    <linearGradient id="inputGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#dbeafe" />
                                        <stop offset="100%" stopColor="#bfdbfe" />
                                    </linearGradient>
                                    <linearGradient id="blackBoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#1e3a8a" />
                                        <stop offset="50%" stopColor="#1e40af" />
                                        <stop offset="100%" stopColor="#1e3a8a" />
                                    </linearGradient>
                                    <linearGradient id="outputGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#dbeafe" />
                                        <stop offset="100%" stopColor="#bfdbfe" />
                                    </linearGradient>
                                    <pattern id="opacityPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <rect width="20" height="20" fill="#1e3a8a"/>
                                        <circle cx="10" cy="10" r="2" fill="#1e40af" opacity="0.3"/>
                                    </pattern>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                        <feMerge>
                                            <feMergeNode in="coloredBlur"/>
                                            <feMergeNode in="SourceGraphic"/>
                                        </feMerge>
                                    </filter>
                                    <marker id="bbArrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                                        <path d="M0,0 L10,5 L0,10 z" fill="#3b82f6" />
                                    </marker>
                                </defs>
                                
                                {/* Title */}
                                <text x="250" y="25" textAnchor="middle" className="text-sm fill-blue-900 font-bold">Black Box AI System</text>
                                
                                {/* Input Box */}
                                <g>
                                    <rect x="30" y="60" width="100" height="60" rx="8" fill="url(#inputGrad)" stroke="#3b82f6" strokeWidth="2.5"/>
                                    <text x="80" y="85" textAnchor="middle" className="text-sm fill-blue-900 font-bold">Input</text>
                                    <text x="80" y="105" textAnchor="middle" className="text-xs fill-blue-700">Data</text>
                                    <circle cx="60" cy="115" r="3" fill="#3b82f6"/>
                                    <circle cx="75" cy="115" r="3" fill="#3b82f6"/>
                                    <circle cx="90" cy="115" r="3" fill="#3b82f6"/>
                                    <circle cx="105" cy="115" r="3" fill="#3b82f6"/>
                                </g>
                                
                                {/* Arrow to Black Box */}
                                <path d="M 140 90 L 180 90" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#bbArrow)"/>
                                
                                {/* Black Box - Opaque */}
                                <g>
                                    <rect x="200" y="50" width="100" height="80" rx="8" fill="url(#blackBoxGrad)" stroke="#1e40af" strokeWidth="3" filter="url(#glow)"/>
                                    <rect x="200" y="50" width="100" height="80" rx="8" fill="url(#opacityPattern)" opacity="0.4"/>
                                    
                                    {/* Question marks inside */}
                                    <text x="250" y="85" textAnchor="middle" className="text-2xl fill-white font-bold" opacity="0.8">?</text>
                                    <text x="250" y="105" textAnchor="middle" className="text-sm fill-blue-200 font-semibold">Black Box</text>
                                    <text x="250" y="120" textAnchor="middle" className="text-xs fill-blue-300">Unknown</text>
                                    
                                    {/* Lock icon representation */}
                                    <path d="M 235 70 L 235 75 L 240 75 L 240 70 L 235 70 M 237.5 70 L 237.5 68 L 240 68 L 240 70" 
                                          stroke="#c7d2fe" strokeWidth="1.5" fill="none" opacity="0.6"/>
                                </g>
                                
                                {/* Arrow from Black Box */}
                                <path d="M 310 90 L 350 90" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#bbArrow)"/>
                                
                                {/* Output Box */}
                                <g>
                                    <rect x="370" y="60" width="100" height="60" rx="8" fill="url(#outputGrad)" stroke="#3b82f6" strokeWidth="2.5"/>
                                    <text x="420" y="85" textAnchor="middle" className="text-sm fill-blue-900 font-bold">Output</text>
                                    <text x="420" y="105" textAnchor="middle" className="text-xs fill-blue-700">Result</text>
                                    <rect x="380" y="110" width="80" height="4" rx="2" fill="#3b82f6" opacity="0.6"/>
                                </g>
                                
                                {/* Warning indicators */}
                                <g opacity="0.7">
                                    <path d="M 250 40 L 245 50 L 255 50 Z" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1"/>
                                    <text x="250" y="38" textAnchor="middle" className="text-xs fill-amber-700 font-bold">!</text>
                                </g>
                                
                                {/* Opaque lines around black box */}
                                <g opacity="0.3">
                                    <line x1="200" y1="50" x2="300" y2="50" stroke="#c7d2fe" strokeWidth="2"/>
                                    <line x1="200" y1="130" x2="300" y2="130" stroke="#c7d2fe" strokeWidth="2"/>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Machine Learning */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-2xl font-bold mb-4 text-slate-900 border-b-2 border-green-500 pb-2">
                    Machine Learning (ML)
                </h3>
                <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                                <IconDatabase className="w-6 h-6 text-green-700" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg text-green-900 mb-2">Machine Learning (ML)</h4>
                                <p className="text-gray-700">
                                    A subset of AI that focuses on building systems that learn from data, identify patterns, and make decisions with minimal human intervention.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <h4 className="font-bold text-lg text-green-900 mb-2">Supervised Learning</h4>
                        <p className="text-gray-700 mb-3">
                            A type of ML where the model is trained on labeled data (data paired with the correct answer). The model learns to map inputs to the correct outputs.
                        </p>
                        <SupervisedUnsupervisedDiagram />
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <h4 className="font-bold text-lg text-green-900 mb-2">Unsupervised Learning</h4>
                        <p className="text-gray-700">
                            A type of ML where the model is given data without explicit instructions or labels. It must find structure, patterns, or relationships in the data on its own.
                        </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <h4 className="font-bold text-lg text-green-900 mb-2">Reinforcement Learning (RL)</h4>
                        <p className="text-gray-700">
                            A training method where an AI agent learns to make decisions by performing actions in an environment and receiving feedback in the form of rewards or penalties.
                        </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <h4 className="font-bold text-lg text-green-900 mb-2">Training Data</h4>
                        <p className="text-gray-700">
                            The dataset used to train a machine learning model. The model learns patterns and relationships from this data.
                        </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <h4 className="font-bold text-lg text-green-900 mb-2">Overfitting</h4>
                        <p className="text-gray-700">
                            A modeling error where an AI function is too closely aligned to a limited set of data points (the training data), making it perform poorly on new, unseen data.
                        </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                        <h4 className="font-bold text-lg text-green-900 mb-2">Bias (Inductive Bias)</h4>
                        <p className="text-gray-700">
                            Systematic errors in an AI system that result in unfair or incorrect outcomes, often stemming from prejudiced assumptions in the algorithm or unrepresentative training data.
                        </p>
                    </div>
                </div>
            </div>

            {/* Deep Learning & Neural Networks */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-2xl font-bold mb-4 text-slate-900 border-b-2 border-purple-500 pb-2">
                    Deep Learning & Neural Networks
                </h3>
                <div className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                                <IconScan className="w-6 h-6 text-purple-700" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg text-purple-900 mb-2">Deep Learning</h4>
                                <p className="text-gray-700">
                                    A specialized subset of machine learning inspired by the structure of the human brain. It uses multi-layered neural networks to solve complex problems like image recognition and natural language processing.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                        <h4 className="font-bold text-lg text-purple-900 mb-2">Neural Network (Artificial Neural Network - ANN)</h4>
                        <p className="text-gray-700 mb-3">
                            A computing system made up of interconnected nodes (neurons) that processes information by mimicking the way biological brains operate.
                        </p>
                        <NeuralNetworkDiagram />
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                        <h4 className="font-bold text-lg text-purple-900 mb-2">Layers</h4>
                        <div className="text-gray-700 space-y-2 mt-2 mb-3">
                            <p><strong>Input Layer:</strong> The first layer that receives raw data.</p>
                            <p><strong>Hidden Layers:</strong> Layers between input and output where computations and feature extraction occur. "Deep" learning refers to having many hidden layers.</p>
                            <p><strong>Output Layer:</strong> The final layer that produces the result.</p>
                        </div>
                        <div className="my-3 p-3 bg-white rounded-lg border border-purple-200">
                            <svg viewBox="0 0 250 80" className="w-full h-auto">
                                <rect x="10" y="30" width="60" height="20" rx="3" fill="#9333ea" opacity="0.7"/>
                                <text x="40" y="45" textAnchor="middle" className="text-xs fill-white font-semibold">Input</text>
                                <path d="M 80 40 L 100 40" stroke="#9333ea" strokeWidth="2"/>
                                <rect x="100" y="30" width="60" height="20" rx="3" fill="#a855f7" opacity="0.7"/>
                                <text x="130" y="45" textAnchor="middle" className="text-xs fill-white font-semibold">Hidden</text>
                                <path d="M 170 40 L 190 40" stroke="#9333ea" strokeWidth="2"/>
                                <rect x="190" y="30" width="60" height="20" rx="3" fill="#c084fc" opacity="0.7"/>
                                <text x="220" y="45" textAnchor="middle" className="text-xs fill-white font-semibold">Output</text>
                            </svg>
                        </div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                        <h4 className="font-bold text-lg text-purple-900 mb-2">Backpropagation</h4>
                        <p className="text-gray-700">
                            The central mechanism by which neural networks learn. It involves calculating the error of the model's output and propagating it backward through the layers to adjust the weights and improve accuracy.
                        </p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                        <h4 className="font-bold text-lg text-purple-900 mb-2">Parameters (Weights and Biases)</h4>
                        <p className="text-gray-700">
                            Internal variables that the model adjusts during training. "Weights" determine the importance of a connection between neurons; "biases" shift the activation function.
                        </p>
                    </div>
                </div>
            </div>

            {/* Generative AI & Language Models */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-2xl font-bold mb-4 text-slate-900 border-b-2 border-indigo-500 pb-2">
                    Generative AI & Language Models
                </h3>
                <div className="space-y-4">
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-indigo-100 rounded-lg flex-shrink-0">
                                <IconScan className="w-6 h-6 text-indigo-700" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg text-indigo-900 mb-2">Generative AI</h4>
                                <p className="text-gray-700">
                                    AI models that can create new content, including text, images, audio, and video, in response to prompts.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                        <h4 className="font-bold text-lg text-indigo-900 mb-2">Large Language Model (LLM)</h4>
                        <p className="text-gray-700">
                            A deep learning algorithm that can recognize, summarize, translate, predict, and generate text and other content based on knowledge gained from massive datasets. (e.g., GPT-4, Gemini, Claude).
                        </p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                        <h4 className="font-bold text-lg text-indigo-900 mb-2">Transformer</h4>
                        <p className="text-gray-700">
                            The architecture that underlies modern LLMs. It uses a mechanism called "self-attention" to weigh the significance of different parts of the input data, allowing it to handle long-range dependencies in text.
                        </p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                        <h4 className="font-bold text-lg text-indigo-900 mb-2">Token</h4>
                        <p className="text-gray-700">
                            The basic unit of text for an LLM. A token can be a word, part of a word, or a single character.
                        </p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                        <h4 className="font-bold text-lg text-indigo-900 mb-2">Hallucination</h4>
                        <p className="text-gray-700">
                            A phenomenon where an AI model generates incorrect, nonsensical, or factually untrue information but presents it confidently as fact.
                        </p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                        <h4 className="font-bold text-lg text-indigo-900 mb-2">Prompt Engineering</h4>
                        <p className="text-gray-700">
                            The practice of designing and refining inputs (prompts) to guide Generative AI models to produce the most accurate and relevant outputs.
                        </p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                        <h4 className="font-bold text-lg text-indigo-900 mb-2">Temperature</h4>
                        <p className="text-gray-700">
                            A parameter in generative models that controls the randomness of the output. High temperature results in more creative/random text; low temperature results in more deterministic/focused text.
                        </p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                        <h4 className="font-bold text-lg text-indigo-900 mb-2">RAG (Retrieval-Augmented Generation)</h4>
                        <p className="text-gray-700 mb-3">
                            A technique that enhances LLM responses by retrieving relevant information from external knowledge sources (documents, databases) and including it in the context before generating a response. This reduces hallucinations and allows models to access up-to-date or domain-specific information not in their training data.
                        </p>
                        <RAGFlowDiagram />
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                        <h4 className="font-bold text-lg text-indigo-900 mb-2">Fine-tuning</h4>
                        <p className="text-gray-700">
                            The process of adapting a pre-trained LLM to a specific task or domain by training it further on a smaller, task-specific dataset. This allows the model to learn domain-specific patterns while retaining its general knowledge.
                        </p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                        <h4 className="font-bold text-lg text-indigo-900 mb-2">Few-shot Learning</h4>
                        <p className="text-gray-700">
                            A technique where an LLM learns to perform a task by seeing just a few examples (shots) in the prompt, without requiring additional training. The model infers the pattern from the examples and applies it to new inputs.
                        </p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                        <h4 className="font-bold text-lg text-indigo-900 mb-2">In-context Learning</h4>
                        <p className="text-gray-700">
                            The ability of LLMs to learn and adapt to new tasks based solely on the information provided in the current conversation or prompt context, without updating their weights. This includes zero-shot, one-shot, and few-shot learning scenarios.
                        </p>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-indigo-100 rounded-lg flex-shrink-0">
                                <IconDatabase className="w-6 h-6 text-indigo-700" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg text-indigo-900 mb-2">Vector Database</h4>
                                <p className="text-gray-700">
                                    A specialized database that stores and retrieves data as high-dimensional vectors (embeddings). Commonly used with RAG systems to efficiently search and retrieve semantically similar documents or chunks of text based on meaning rather than exact keyword matches.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                        <h4 className="font-bold text-lg text-indigo-900 mb-2">Embedding</h4>
                        <p className="text-gray-700 mb-4">
                            A numerical representation of text, images, or other data as a vector of numbers that captures semantic meaning. Similar concepts have similar embeddings, enabling semantic search and similarity comparisons. Used extensively in RAG systems to convert documents into searchable vectors.
                        </p>
                        <div className="my-4 p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl border-2 border-indigo-300 shadow-md">
                            <svg viewBox="0 0 600 320" className="w-full h-auto">
                                <defs>
                                    <linearGradient id="embedGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#6366f1" />
                                        <stop offset="100%" stopColor="#4f46e5" />
                                    </linearGradient>
                                    <linearGradient id="embedGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#818cf8" />
                                        <stop offset="100%" stopColor="#6366f1" />
                                    </linearGradient>
                                    <linearGradient id="embedGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#a5b4fc" />
                                        <stop offset="100%" stopColor="#818cf8" />
                                    </linearGradient>
                                    <marker id="embedArrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                                        <path d="M0,0 L10,5 L0,10 z" fill="#6366f1" />
                                    </marker>
                                    <filter id="embedShadow">
                                        <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.2"/>
                                    </filter>
                                </defs>
                                
                                {/* Title */}
                                <text x="300" y="30" textAnchor="middle" className="text-base fill-indigo-900 font-bold">Text to Vector Embedding Transformation</text>
                                
                                {/* Example 1: Tree */}
                                <g>
                                    {/* Text Input */}
                                    <rect x="50" y="70" width="120" height="50" rx="6" fill="#e0e7ff" stroke="#818cf8" strokeWidth="2" filter="url(#embedShadow)"/>
                                    <text x="110" y="95" textAnchor="middle" className="text-sm fill-indigo-900 font-bold">"Tree"</text>
                                    <text x="110" y="110" textAnchor="middle" className="text-xs fill-indigo-600">Text Input</text>
                                    
                                    {/* Arrow */}
                                    <path d="M 180 95 L 220 95" stroke="#6366f1" strokeWidth="3" markerEnd="url(#embedArrow)"/>
                                    
                                    {/* Embedding Model */}
                                    <rect x="230" y="70" width="100" height="50" rx="6" fill="url(#embedGrad1)" stroke="#4f46e5" strokeWidth="2" filter="url(#embedShadow)"/>
                                    <text x="280" y="95" textAnchor="middle" className="text-xs fill-white font-bold">Embedding</text>
                                    <text x="280" y="110" textAnchor="middle" className="text-xs fill-indigo-100">Model</text>
                                    
                                    {/* Arrow */}
                                    <path d="M 340 95 L 380 95" stroke="#6366f1" strokeWidth="3" markerEnd="url(#embedArrow)"/>
                                    
                                    {/* Vector Output */}
                                    <g>
                                        <rect x="390" y="60" width="180" height="70" rx="6" fill="#f5f3ff" stroke="#818cf8" strokeWidth="2" filter="url(#embedShadow)"/>
                                        <text x="480" y="80" textAnchor="middle" className="text-xs fill-indigo-700 font-semibold">Vector Embedding (384 dimensions)</text>
                                        
                                        {/* Vector bars */}
                                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i, idx) => {
                                            const height = 15 + Math.random() * 20;
                                            const x = 400 + i * 14;
                                            return (
                                                <rect key={idx} x={x} y={95 - height/2} width="10" height={height} 
                                                      fill={idx < 3 ? "#6366f1" : idx < 6 ? "#818cf8" : "#a5b4fc"} 
                                                      rx="2" opacity="0.8"/>
                                            );
                                        })}
                                        <text x="480" y="125" textAnchor="middle" className="text-xs fill-indigo-600 font-mono">[0.23, 0.45, 0.12, 0.67, ...]</text>
                                    </g>
                                </g>
                                
                                {/* Example 2: Forest */}
                                <g>
                                    {/* Text Input */}
                                    <rect x="50" y="160" width="120" height="50" rx="6" fill="#e0e7ff" stroke="#818cf8" strokeWidth="2" filter="url(#embedShadow)"/>
                                    <text x="110" y="185" textAnchor="middle" className="text-sm fill-indigo-900 font-bold">"Forest"</text>
                                    <text x="110" y="200" textAnchor="middle" className="text-xs fill-indigo-600">Text Input</text>
                                    
                                    {/* Arrow */}
                                    <path d="M 180 185 L 220 185" stroke="#6366f1" strokeWidth="3" markerEnd="url(#embedArrow)"/>
                                    
                                    {/* Embedding Model */}
                                    <rect x="230" y="160" width="100" height="50" rx="6" fill="url(#embedGrad2)" stroke="#6366f1" strokeWidth="2" filter="url(#embedShadow)"/>
                                    <text x="280" y="185" textAnchor="middle" className="text-xs fill-white font-bold">Embedding</text>
                                    <text x="280" y="200" textAnchor="middle" className="text-xs fill-indigo-100">Model</text>
                                    
                                    {/* Arrow */}
                                    <path d="M 340 185 L 380 185" stroke="#6366f1" strokeWidth="3" markerEnd="url(#embedArrow)"/>
                                    
                                    {/* Vector Output */}
                                    <g>
                                        <rect x="390" y="150" width="180" height="70" rx="6" fill="#f5f3ff" stroke="#818cf8" strokeWidth="2" filter="url(#embedShadow)"/>
                                        <text x="480" y="170" textAnchor="middle" className="text-xs fill-indigo-700 font-semibold">Vector Embedding (384 dimensions)</text>
                                        
                                        {/* Vector bars - similar pattern to "Tree" */}
                                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i, idx) => {
                                            const height = 15 + Math.random() * 20;
                                            const x = 400 + i * 14;
                                            return (
                                                <rect key={idx} x={x} y={205 - height/2} width="10" height={height} 
                                                      fill={idx < 3 ? "#6366f1" : idx < 6 ? "#818cf8" : "#a5b4fc"} 
                                                      rx="2" opacity="0.8"/>
                                            );
                                        })}
                                        <text x="480" y="215" textAnchor="middle" className="text-xs fill-indigo-600 font-mono">[0.25, 0.42, 0.15, 0.64, ...]</text>
                                    </g>
                                </g>
                                
                                {/* Similarity Connection */}
                                <path d="M 480 130 Q 520 145 480 160" stroke="#10b981" strokeWidth="2" fill="none" strokeDasharray="4,2" opacity="0.6"/>
                                <text x="520" y="145" textAnchor="middle" className="text-xs fill-green-700 font-semibold">High</text>
                                <text x="520" y="157" textAnchor="middle" className="text-xs fill-green-700 font-semibold">Similarity</text>
                                
                                {/* Example 3: Car (different concept) */}
                                <g opacity="0.7">
                                    {/* Text Input */}
                                    <rect x="50" y="250" width="120" height="50" rx="6" fill="#e0e7ff" stroke="#c7d2fe" strokeWidth="2"/>
                                    <text x="110" y="275" textAnchor="middle" className="text-sm fill-indigo-700 font-bold">"Car"</text>
                                    <text x="110" y="290" textAnchor="middle" className="text-xs fill-indigo-500">Text Input</text>
                                    
                                    {/* Arrow */}
                                    <path d="M 180 275 L 220 275" stroke="#a5b4fc" strokeWidth="2" markerEnd="url(#embedArrow)"/>
                                    
                                    {/* Embedding Model */}
                                    <rect x="230" y="250" width="100" height="50" rx="6" fill="url(#embedGrad3)" stroke="#818cf8" strokeWidth="2"/>
                                    <text x="280" y="275" textAnchor="middle" className="text-xs fill-white font-bold">Embedding</text>
                                    <text x="280" y="290" textAnchor="middle" className="text-xs fill-indigo-100">Model</text>
                                    
                                    {/* Arrow */}
                                    <path d="M 340 275 L 380 275" stroke="#a5b4fc" strokeWidth="2" markerEnd="url(#embedArrow)"/>
                                    
                                    {/* Vector Output - different pattern */}
                                    <g>
                                        <rect x="390" y="240" width="180" height="70" rx="6" fill="#f5f3ff" stroke="#c7d2fe" strokeWidth="2"/>
                                        <text x="480" y="260" textAnchor="middle" className="text-xs fill-indigo-600 font-semibold">Vector Embedding (384 dimensions)</text>
                                        
                                        {/* Different vector pattern */}
                                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i, idx) => {
                                            const height = 10 + Math.random() * 15;
                                            const x = 400 + i * 14;
                                            return (
                                                <rect key={idx} x={x} y={295 - height/2} width="10" height={height} 
                                                      fill="#c7d2fe" rx="2" opacity="0.6"/>
                                            );
                                        })}
                                        <text x="480" y="305" textAnchor="middle" className="text-xs fill-indigo-500 font-mono">[0.05, 0.12, 0.88, 0.03, ...]</text>
                                    </g>
                                </g>
                                
                                {/* Low similarity indicator */}
                                <path d="M 480 220 Q 520 235 480 250" stroke="#ef4444" strokeWidth="2" fill="none" strokeDasharray="4,2" opacity="0.4"/>
                                <text x="520" y="235" textAnchor="middle" className="text-xs fill-red-600 font-semibold">Low</text>
                                <text x="520" y="247" textAnchor="middle" className="text-xs fill-red-600 font-semibold">Similarity</text>
                                
                                {/* Key Insight */}
                                <rect x="50" y="310" width="520" height="8" rx="4" fill="#6366f1" opacity="0.2"/>
                                <text x="310" y="318" textAnchor="middle" className="text-xs fill-indigo-700 font-semibold">Similar words → Similar vectors | Different words → Different vectors</text>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Computer Vision */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-2xl font-bold mb-4 text-slate-900 border-b-2 border-cyan-500 pb-2">
                    Computer Vision
                </h3>
                <div className="space-y-4">
                    <div className="p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-500">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-cyan-100 rounded-lg flex-shrink-0">
                                <IconEye className="w-6 h-6 text-cyan-700" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg text-cyan-900 mb-2">Computer Vision</h4>
                                <p className="text-gray-700 mb-3">
                                    A field of AI that enables computers to interpret and understand the visual world (images and videos).
                                </p>
                                <ComputerVisionPipeline />
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-500">
                        <h4 className="font-bold text-lg text-cyan-900 mb-2">Object Detection</h4>
                        <p className="text-gray-700 mb-3">
                            The ability of an AI to identify and locate objects within an image or video (e.g., bounding boxes around cars in a street scene).
                        </p>
                        <div className="my-3 p-3 bg-white rounded-lg border border-cyan-200">
                            <svg viewBox="0 0 200 150" className="w-full h-auto">
                                <rect x="30" y="40" width="60" height="50" fill="none" stroke="#06b6d4" strokeWidth="3" strokeDasharray="5,5"/>
                                <text x="60" y="35" textAnchor="middle" className="text-xs fill-cyan-700 font-semibold">Tree</text>
                                <rect x="110" y="60" width="50" height="40" fill="none" stroke="#06b6d4" strokeWidth="3" strokeDasharray="5,5"/>
                                <text x="135" y="55" textAnchor="middle" className="text-xs fill-cyan-700 font-semibold">Log</text>
                                <circle cx="60" cy="65" r="8" fill="#22c55e" opacity="0.6"/>
                                <rect x="120" y="70" width="30" height="20" fill="#f59e0b" opacity="0.6"/>
                            </svg>
                        </div>
                    </div>
                    <div className="p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-500">
                        <h4 className="font-bold text-lg text-cyan-900 mb-2">Segmentation</h4>
                        <p className="text-gray-700 mb-3">
                            The process of partitioning a digital image into multiple segments (sets of pixels) to simplify its representation (e.g., separating the foreground subject from the background).
                        </p>
                        <div className="my-3 p-3 bg-white rounded-lg border border-cyan-200">
                            <svg viewBox="0 0 200 150" className="w-full h-auto">
                                <rect x="20" y="30" width="80" height="90" fill="#22c55e" opacity="0.4" stroke="#16a34a" strokeWidth="2"/>
                                <text x="60" y="25" textAnchor="middle" className="text-xs fill-green-700 font-semibold">Vegetation</text>
                                <rect x="100" y="50" width="80" height="70" fill="#f59e0b" opacity="0.4" stroke="#d97706" strokeWidth="2"/>
                                <text x="140" y="45" textAnchor="middle" className="text-xs fill-yellow-700 font-semibold">Ground</text>
                            </svg>
                        </div>
                    </div>
                    <div className="p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-500">
                        <h4 className="font-bold text-lg text-cyan-900 mb-2">Facial Recognition</h4>
                        <p className="text-gray-700">
                            A biometric technology that uses AI to map facial features from a photograph or video and compare them with a database of known faces.
                        </p>
                    </div>
                </div>
            </div>

            {/* Ethics & Safety */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-2xl font-bold mb-4 text-slate-900 border-b-2 border-red-500 pb-2">
                    Ethics & Safety
                </h3>
                <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                        <h4 className="font-bold text-lg text-red-900 mb-2">Alignment</h4>
                        <p className="text-gray-700">
                            The problem of ensuring AI systems' goals and behaviors are aligned with human values and intentions.
                        </p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                        <h4 className="font-bold text-lg text-red-900 mb-2">Explainable AI (XAI)</h4>
                        <p className="text-gray-700">
                            Processes and methods that allow human users to understand and trust the results and output created by machine learning algorithms.
                        </p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                        <h4 className="font-bold text-lg text-red-900 mb-2">Model Drift</h4>
                        <p className="text-gray-700">
                            The decay of an AI model's performance over time as the real-world data it encounters diverges from the data it was trained on.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
