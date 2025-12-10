import { IconDatabase, IconEye, IconFire, IconScan, IconBook } from './icons';

export const IntroLab = ({ setTab }) => (
    <div className="space-y-8 animate-fade-in">
        <div className="bg-white p-8 rounded-xl shadow-lg border-l-8 border-blue-700">
            <h2 className="text-3xl font-bold mb-4 text-slate-900">Welcome to AI-Enhanced Forestry</h2>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                This interactive lab is designed for professional foresters. Our goal is not to make you a programmer, 
                but to make you an <strong>Informed Operator</strong>.
            </p>
            <p className="text-gray-600 italic border-l-4 border-gray-300 pl-4 py-2 bg-gray-50 rounded-r">
                "Just as you don't need to know how to build a chainsaw engine to fell a tree, you don't need to write code to use AI. 
                However, you <strong>do</strong> need to know when the tool is dull, broken, or dangerous."
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-700"><IconDatabase /></div>
                    <h3 className="font-bold text-xl text-gray-800">The Big Shift</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                    For 100 years, forestry has relied on <strong>Sampling</strong> (measuring 5% of a stand to guess the rest). 
                    AI enables a <strong>Census</strong> approach—measuring every single tree using sensors (LiDAR, Drone) and algorithms.
                </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-yellow-100 rounded-lg text-yellow-700"><IconEye /></div>
                    <h3 className="font-bold text-xl text-gray-800">Human in the Loop</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                    AI is a "Decision Support Tool," not a decision maker. It can calculate volume in seconds, but it cannot judge ethics or context. 
                    Throughout these labs, watch for errors and "hallucinations." <strong>You are the safety net.</strong>
                </p>
            </div>
        </div>

        {/* AI Applications in Forestry */}
        <div className="bg-gradient-to-br from-blue-50 to-slate-50 p-6 rounded-xl shadow-md border border-blue-200">
            <h3 className="font-bold text-2xl mb-4 text-gray-800 flex items-center gap-2">
                <IconEye className="text-blue-700" /> AI Applications in Modern Forestry
            </h3>
            <p className="text-gray-700 mb-4">
                Artificial Intelligence is transforming forestry operations across the entire value chain. Here are real-world applications you'll encounter:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-blue-800 mb-2">📊 Inventory & Measurement</h4>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>Automated tree counting from drone imagery</li>
                        <li>Log scaling apps (e.g., Timbeter) for pile volume</li>
                        <li>Diameter-at-breast-height (DBH) estimation</li>
                        <li>100% census vs. traditional 5% sampling</li>
                    </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-red-800 mb-2">🔥 Fire Management</h4>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>Fire behavior prediction (FARSITE, Prometheus)</li>
                        <li>Burn probability mapping</li>
                        <li>Early detection from satellite imagery</li>
                        <li>Post-fire damage assessment</li>
                    </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-blue-800 mb-2">🌲 Forest Health</h4>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>Pest detection (Bark Beetle, root rot)</li>
                        <li>Disease identification from multispectral data</li>
                        <li>Stress detection before visible symptoms</li>
                        <li>Wildlife monitoring via camera traps</li>
                    </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-purple-800 mb-2">📐 3D Mapping & Planning</h4>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>LiDAR point cloud classification</li>
                        <li>Digital Terrain Model (DTM) creation</li>
                        <li>Harvest planning and road layout</li>
                        <li>Canopy structure analysis</li>
                    </ul>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-indigo-800 mb-2">🤖 Machine Learning Models</h4>
                    <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>Species classification (Random Forest)</li>
                        <li>Volume prediction (Regression models)</li>
                        <li>Pest risk assessment (Classification)</li>
                        <li>Stand clustering (K-Means)</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Key AI Concepts */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="font-bold text-2xl mb-4 text-gray-800 border-b pb-2">Key AI Concepts You'll Learn</h3>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                        <IconEye className="w-5 h-5" /> Computer Vision
                    </h4>
                    <p className="text-sm text-gray-700 mb-2">
                        Teaching computers to "see" and interpret images. Unlike humans, AI sees images as grids of numbers (pixels).
                    </p>
                    <p className="text-xs text-gray-600">
                        <strong>Key Concept:</strong> <em>Confidence Thresholds</em> - AI doesn't say "that's a log," it says "I'm 85% confident this is a log." You decide the cutoff point.
                    </p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                        <IconFire className="w-5 h-5" /> Predictive Analytics
                    </h4>
                    <p className="text-sm text-gray-700 mb-2">
                        Using historical data to predict future events. AI finds patterns in thousands of past events that humans can't see.
                    </p>
                    <p className="text-xs text-gray-600">
                        <strong>Key Concept:</strong> <em>Cellular Automata</em> - Simple rules run thousands of times create complex behaviors (like fire spread).
                    </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                        <IconScan className="w-5 h-5" /> Generative AI
                    </h4>
                    <p className="text-sm text-gray-700 mb-2">
                        AI that creates new content (text, reports) based on patterns it learned from training data.
                    </p>
                    <p className="text-xs text-gray-600">
                        <strong>Key Concept:</strong> <em>Hallucinations</em> - AI can invent information that sounds plausible but isn't in your source data. Always verify!
                    </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
                        <IconDatabase className="w-5 h-5" /> Data Quality (GIGO)
                    </h4>
                    <p className="text-sm text-gray-700 mb-2">
                        "Garbage In, Garbage Out" - AI models are only as good as the data they're trained on.
                    </p>
                    <p className="text-xs text-gray-600">
                        <strong>Key Concept:</strong> If you train AI on bad data (e.g., labeling telephone poles as trees), it will make those mistakes in the field. Data quality is everyone's responsibility.
                    </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                        <IconScan className="w-5 h-5" /> Semantic Segmentation
                    </h4>
                    <p className="text-sm text-gray-700 mb-2">
                        Classifying each point in a 3D point cloud (like LiDAR data) into categories: Ground, Vegetation, Buildings, etc.
                    </p>
                    <p className="text-xs text-gray-600">
                        <strong>Key Concept:</strong> Raw LiDAR is just millions of X,Y,Z coordinates. AI analyzes elevation, density, and spatial relationships to label each point. This enables tree height measurement, terrain mapping, and volume calculations.
                    </p>
                </div>
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                        <IconDatabase className="w-5 h-5" /> Machine Learning
                    </h4>
                    <p className="text-sm text-gray-700 mb-2">
                        Algorithms that learn patterns from data to make predictions or classifications without explicit programming.
                    </p>
                    <p className="text-xs text-gray-600">
                        <strong>Key Concept:</strong> Models learn from examples (training data) to find patterns. Common algorithms include Decision Trees, Random Forests, Regression, and Clustering—each suited to different forestry problems.
                    </p>
                </div>
            </div>
        </div>

        <div>
            <h3 className="font-bold text-2xl mb-4 text-gray-800 border-b pb-2">Interactive Lab Modules</h3>
            <p className="text-gray-600 mb-6 text-sm">
                Each module includes hands-on simulations, real-world applications, and critical thinking exercises. Click any module to begin.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button onClick={() => setTab(1)} className="group p-5 bg-white hover:bg-indigo-50 rounded-xl border border-gray-200 hover:border-indigo-300 text-left transition-all shadow-sm hover:shadow-md">
                    <div className="font-bold text-indigo-800 flex items-center gap-2 text-lg group-hover:text-indigo-900">
                        <IconDatabase className="w-5 h-5"/> 1. Machine Learning
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                        Explore core ML algorithms: decision trees, regression, and clustering. Practice with interactive widgets and learn how models learn from data.
                    </div>
                    <div className="text-xs text-indigo-700 mt-2 font-semibold">
                        Concepts: Supervised Learning • Decision Trees • Regression • Clustering • Model Training
                    </div>
                </button>

                <button onClick={() => setTab(2)} className="group p-5 bg-white hover:bg-blue-50 rounded-xl border border-gray-200 hover:border-blue-300 text-left transition-all shadow-sm hover:shadow-md">
                    <div className="font-bold text-blue-800 flex items-center gap-2 text-lg group-hover:text-blue-900">
                        <IconEye className="w-5 h-5"/> 2. Computer Vision
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                        Learn how AI "sees" the forest. Simulate a log scaling app and understand confidence thresholds, precision, and recall.
                    </div>
                    <div className="text-xs text-blue-700 mt-2 font-semibold">
                        Concepts: Confidence Thresholds • False Positives • Precision vs. Recall
                    </div>
                </button>

                <button onClick={() => setTab(3)} className="group p-5 bg-white hover:bg-red-50 rounded-xl border border-gray-200 hover:border-red-300 text-left transition-all shadow-sm hover:shadow-md">
                    <div className="font-bold text-red-800 flex items-center gap-2 text-lg group-hover:text-red-900">
                        <IconFire className="w-5 h-5"/> 3. Prediction
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                        Use historical data to predict the future. Simulate fire spread with variables like wind, fuel moisture, and terrain.
                    </div>
                    <div className="text-xs text-red-700 mt-2 font-semibold">
                        Concepts: Predictive Analytics • Cellular Automata • Environmental Variables
                    </div>
                </button>

                <button onClick={() => setTab(4)} className="group p-5 bg-white hover:bg-blue-50 rounded-xl border border-gray-200 hover:border-blue-300 text-left transition-all shadow-sm hover:shadow-md">
                    <div className="font-bold text-blue-800 flex items-center gap-2 text-lg group-hover:text-blue-900">
                        <IconScan className="w-5 h-5"/> 4. Generative AI
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                        The "Digital Clerk." Generate professional reports from field notes but learn to catch AI "hallucinations."
                    </div>
                    <div className="text-xs text-blue-700 mt-2 font-semibold">
                        Concepts: Text Generation • Hallucinations • Verification & Validation
                    </div>
                </button>

                <button onClick={() => setTab(5)} className="group p-5 bg-white hover:bg-yellow-50 rounded-xl border border-gray-200 hover:border-yellow-300 text-left transition-all shadow-sm hover:shadow-md">
                    <div className="font-bold text-yellow-800 flex items-center gap-2 text-lg group-hover:text-yellow-900">
                        <IconDatabase className="w-5 h-5"/> 5. Data Quality
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                        "Garbage In, Garbage Out." Train a model yourself and see why bad data ruins results. Learn data validation techniques.
                    </div>
                    <div className="text-xs text-yellow-700 mt-2 font-semibold">
                        Concepts: GIGO • Training Data • Model Accuracy • Data Validation
                    </div>
                </button>

                <button onClick={() => setTab(6)} className="group p-5 bg-white hover:bg-purple-50 rounded-xl border border-gray-200 hover:border-purple-300 text-left transition-all shadow-sm hover:shadow-md">
                    <div className="font-bold text-purple-800 flex items-center gap-2 text-lg group-hover:text-purple-900">
                        <IconScan className="w-5 h-5"/> 6. 3D LiDAR
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                        Interactive 3D point cloud visualization. See how AI performs semantic segmentation to separate ground from vegetation.
                    </div>
                    <div className="text-xs text-purple-700 mt-2 font-semibold">
                        Concepts: Point Clouds • Semantic Segmentation • DTM Creation • Tree Height Measurement
                    </div>
                </button>

                <button onClick={() => setTab(7)} className="group p-5 bg-white hover:bg-indigo-50 rounded-xl border-2 border-indigo-300 hover:border-indigo-400 text-left transition-all shadow-lg hover:shadow-xl">
                    <div className="font-bold text-indigo-800 flex items-center gap-2 text-lg group-hover:text-indigo-900">
                        <IconBook className="w-5 h-5"/> 7. Knowledge Assessment Quiz
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                        Test your understanding with 30 multiple-choice questions covering all modules. Questions are randomized each time!
                    </div>
                    <div className="text-xs text-indigo-700 mt-2 font-semibold">
                        Features: 5 Questions per Module • Instant Grading • Randomized Questions • Detailed Feedback
                    </div>
                </button>
            </div>
        </div>
    </div>
);

