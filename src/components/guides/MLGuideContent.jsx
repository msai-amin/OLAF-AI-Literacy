import { IconDatabase } from '../icons';

export const MLGuideContent = () => (
    <div className="p-8 prose prose-green max-w-none text-gray-700">
        <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 mb-6">
            <strong className="block text-indigo-800 mb-1">Objective</strong>
            Understand core machine learning concepts and algorithms used in forestry applications. Learn how models learn from data to make predictions and classifications.
        </div>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Part 1: What is Machine Learning?</h3>
        <p>
            <strong>Machine Learning (ML)</strong> is a subset of artificial intelligence where computers learn to make decisions or predictions by finding patterns in data, rather than being explicitly programmed with rules.
        </p>
        <p>
            Traditional programming: <em>"If tree height > 20m and DBH > 40cm, classify as mature."</em> You write the rules.
        </p>
        <p>
            Machine Learning: <em>"Here are 10,000 trees with their measurements and classifications. Find the patterns that distinguish mature from immature trees."</em> The computer learns the rules.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg text-sm font-mono mb-4 border border-gray-300 mt-4">
            <strong>The ML Learning Process:</strong><br/>
            1. <strong>Training Data:</strong> Provide examples (e.g., 1000 trees with height, DBH, age, species)<br/>
            2. <strong>Feature Extraction:</strong> Identify relevant variables (height, DBH, crown diameter)<br/>
            3. <strong>Model Training:</strong> Algorithm finds patterns that predict outcomes<br/>
            4. <strong>Validation:</strong> Test on new data the model hasn't seen<br/>
            5. <strong>Deployment:</strong> Use model to make predictions on real-world data
        </div>

        <div className="mt-6 bg-blue-50 p-5 rounded-lg border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-3 text-base flex items-center gap-2">
                <IconDatabase className="w-4 h-4"/> Real-World Forestry ML Applications
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-blue-800">
                <li>
                    <strong>Species Classification:</strong> Random Forest models analyze leaf shape, bark texture, and canopy structure from drone imagery to identify tree species automatically. Used in biodiversity surveys and inventory systems.
                </li>
                <li>
                    <strong>Volume Prediction:</strong> Regression models (e.g., Linear Regression, Gradient Boosting) predict tree volume from DBH, height, and species. Trained on thousands of felled trees, these models replace manual volume tables.
                </li>
                <li>
                    <strong>Pest Risk Assessment:</strong> Classification models analyze weather data, stand density, and tree health indicators to predict Bark Beetle outbreak probability. Helps prioritize treatment areas.
                </li>
                <li>
                    <strong>Harvest Optimization:</strong> Clustering algorithms group stands with similar characteristics (species mix, age, accessibility) to optimize harvest scheduling and logistics.
                </li>
                <li>
                    <strong>Growth Modeling:</strong> Time-series models predict how stands will grow over decades, incorporating climate data, soil conditions, and management history.
                </li>
                <li>
                    <strong>Wildlife Habitat Classification:</strong> Support Vector Machines (SVM) classify forest patches into habitat types (nesting, foraging, migration corridors) based on vegetation structure and composition.
                </li>
                <li>
                    <strong>Road Condition Prediction:</strong> Regression models predict road maintenance needs from traffic data, weather history, and LiDAR-derived slope measurements.
                </li>
                <li>
                    <strong>Autonomous Harvest Planning (RL):</strong> Reinforcement learning agents optimize harvest sequences, learning which stands to harvest first to maximize profit while minimizing environmental impact. The agent receives rewards for efficient operations and penalties for violations.
                </li>
            </ul>
        </div>

        <hr className="my-6 border-gray-200"/>

        <h3 className="font-bold text-lg text-gray-900">Part 2: Types of Machine Learning</h3>
        <p className="text-gray-700 mb-4">
            Machine learning can be categorized into three main paradigms based on how the model learns from data. Understanding these types helps you choose the right approach for your forestry problem.
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-900 mb-2">SL: Supervised Learning</h4>
                <p className="text-sm text-green-800 mb-2">
                    <strong>Definition:</strong> Learning from labeled examples. You provide both inputs (features) and the correct outputs (labels/answers). The model learns to map inputs to outputs.
                </p>
                <p className="text-xs text-green-700 mb-2">
                    <strong>How it works:</strong> You show the model many examples with known answers. For instance, "This tree (DBH=45cm, Height=20m) is a Douglas Fir." The model learns patterns to predict labels for new, unseen data.
                </p>
                <p className="text-xs text-green-700 mb-2">
                    <strong>Example:</strong> Train on 1000 trees where you know the species. Model learns: "Trees with these features are Douglas Fir."
                </p>
                <p className="text-xs text-green-700 font-semibold">
                    <strong>Forestry Use:</strong> Species classification, volume prediction, disease detection, pest risk assessment
                </p>
                <div className="mt-2 text-xs text-green-600 italic">
                    Most common type in forestry applications
                </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-bold text-purple-900 mb-2">UL: Unsupervised Learning</h4>
                <p className="text-sm text-purple-800 mb-2">
                    <strong>Definition:</strong> Finding patterns in data without labels. The model discovers hidden structures, groupings, or relationships on its own.
                </p>
                <p className="text-xs text-purple-700 mb-2">
                    <strong>How it works:</strong> You provide only input data (no answers). The algorithm explores the data to find natural groupings, anomalies, or relationships. You don't tell it what to look for—it discovers patterns.
                </p>
                <p className="text-xs text-purple-700 mb-2">
                    <strong>Example:</strong> Analyze 1000 stands and discover they naturally group into 5 types based on species mix and age—patterns you didn't know existed.
                </p>
                <p className="text-xs text-purple-700 font-semibold">
                    <strong>Forestry Use:</strong> Stand clustering, anomaly detection (diseased trees), market segmentation, exploratory data analysis
                </p>
                <div className="mt-2 text-xs text-purple-600 italic">
                    Useful when you don't have labeled data
                </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h4 className="font-bold text-orange-900 mb-2">RL: Reinforcement Learning</h4>
                <p className="text-sm text-orange-800 mb-2">
                    <strong>Definition:</strong> Learning through trial and error with rewards and penalties. An agent takes actions in an environment and receives feedback (rewards/punishments) to learn optimal strategies.
                </p>
                <p className="text-xs text-orange-700 mb-2">
                    <strong>How it works:</strong> The model (agent) tries different actions, receives rewards for good decisions and penalties for bad ones, and gradually learns the best strategy. Like training a dog—reward good behavior, discourage bad behavior.
                </p>
                <p className="text-xs text-orange-700 mb-2">
                    <strong>Example:</strong> An autonomous drone learns optimal flight paths for forest surveys. Good paths (complete coverage, minimal battery) get rewards; poor paths (missed areas, crashes) get penalties.
                </p>
                <p className="text-xs text-orange-700 font-semibold">
                    <strong>Forestry Use:</strong> Autonomous vehicle path planning, harvest scheduling optimization, adaptive forest management strategies, drone navigation
                </p>
                <div className="mt-2 text-xs text-orange-600 italic">
                    Emerging technology for optimization problems
                </div>
            </div>
        </div>

        <div className="mt-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-3">Quick Comparison</h4>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
                <div>
                    <strong className="text-green-800">Supervised Learning:</strong>
                    <ul className="list-disc pl-4 mt-1 text-slate-700">
                        <li>Needs labeled data</li>
                        <li>Predicts known outcomes</li>
                        <li>Most common in forestry</li>
                    </ul>
                </div>
                <div>
                    <strong className="text-purple-800">Unsupervised Learning:</strong>
                    <ul className="list-disc pl-4 mt-1 text-slate-700">
                        <li>No labels needed</li>
                        <li>Discovers hidden patterns</li>
                        <li>Exploratory analysis</li>
                    </ul>
                </div>
                <div>
                    <strong className="text-orange-800">Reinforcement Learning:</strong>
                    <ul className="list-disc pl-4 mt-1 text-slate-700">
                        <li>Learns from feedback</li>
                        <li>Optimizes decisions over time</li>
                        <li>Sequential decision-making</li>
                    </ul>
                </div>
            </div>
        </div>

        <hr className="my-6 border-gray-200"/>

        <h3 className="font-bold text-lg text-gray-900">Part 3: Key ML Algorithms in Forestry</h3>

        <div className="space-y-4 mt-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-indigo-800 mb-2">Decision Trees</h4>
                <p className="text-sm text-gray-700 mb-2">
                    A tree-like model that makes decisions by asking yes/no questions. Each branch represents a decision based on a feature.
                </p>
                <div className="bg-gray-50 p-3 rounded text-xs font-mono mb-2 border border-gray-300">
                    <strong>Example Decision Tree:</strong><br/>
                    Is DBH &gt; 30cm?<br/>
                    ├─ Yes → Is height &gt; 15m?<br/>
                    │   ├─ Yes → Mature Tree<br/>
                    │   └─ No → Young Tree<br/>
                    └─ No → Sapling
                </div>
                <p className="text-xs text-gray-600">
                    <strong>Forestry Use:</strong> Stand classification, harvest decision support, risk assessment. Easy to interpret, but can overfit to training data.
                </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-indigo-800 mb-2">Random Forest</h4>
                <p className="text-sm text-gray-700 mb-2">
                    Combines hundreds of decision trees. Each tree votes, and the majority decision wins. More robust than a single tree.
                </p>
                <p className="text-xs text-gray-600 mb-2">
                    <strong>Why "Random":</strong> Each tree is trained on a random subset of data and features, reducing overfitting.
                </p>
                <p className="text-xs text-gray-600">
                    <strong>Forestry Use:</strong> Species identification, volume prediction, pest risk modeling. Very accurate but harder to interpret than single trees.
                </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-indigo-800 mb-2">Linear Regression</h4>
                <p className="text-sm text-gray-700 mb-2">
                    Finds the best straight line (or plane) that predicts a continuous value (like volume) from input features (like DBH, height).
                </p>
                <p className="text-xs text-gray-600 mb-2">
                    <strong>Formula:</strong> Volume = (a × DBH) + (b × Height) + c<br/>
                    The algorithm finds the best values for a, b, and c.
                </p>
                <p className="text-xs text-gray-600">
                    <strong>Forestry Use:</strong> Volume equations, growth prediction, yield modeling. Simple, interpretable, but assumes linear relationships.
                </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-indigo-800 mb-2">K-Means Clustering</h4>
                <p className="text-sm text-gray-700 mb-2">
                    Groups similar data points together without labels. Finds natural clusters in your data.
                </p>
                <p className="text-xs text-gray-600 mb-2">
                    <strong>Process:</strong> Algorithm randomly places "centroids" (cluster centers), assigns points to nearest centroid, moves centroids to center of their clusters, repeats until stable.
                </p>
                <p className="text-xs text-gray-600">
                    <strong>Forestry Use:</strong> Stand type classification, market segmentation, harvest planning. Discovers patterns you might not see manually.
                </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-indigo-800 mb-2">Neural Networks</h4>
                <p className="text-sm text-gray-700 mb-2">
                    Inspired by the brain. Multiple layers of "neurons" that process information. Can learn complex, non-linear patterns.
                </p>
                <p className="text-xs text-gray-600 mb-2">
                    <strong>Structure:</strong> Input layer (features) → Hidden layers (pattern detection) → Output layer (prediction). Each connection has a "weight" that adjusts during training.
                </p>
                <p className="text-xs text-gray-600">
                    <strong>Forestry Use:</strong> Image classification (tree species from photos), complex pattern recognition, LiDAR point cloud classification. Powerful but requires large datasets and computing resources.
                </p>
            </div>
        </div>

        <hr className="my-6 border-gray-200"/>

        <h3 className="font-bold text-lg text-gray-900">Part 4: Model Training Concepts</h3>
        
        <div className="space-y-4 mt-4">
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-bold text-yellow-900 mb-2">Training vs. Testing</h4>
                <p className="text-sm text-yellow-800 mb-2">
                    <strong>Training Set (70-80%):</strong> Data used to teach the model. The model learns patterns from this data.
                </p>
                <p className="text-sm text-yellow-800 mb-2">
                    <strong>Test Set (20-30%):</strong> Data held back and never shown during training. Used to evaluate how well the model generalizes to new, unseen data.
                </p>
                <p className="text-xs text-yellow-700">
                    <strong>Why Separate?</strong> A model that memorizes training data (overfitting) will fail on new data. Testing on unseen data reveals true performance.
                </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-bold text-red-900 mb-2">Overfitting</h4>
                <p className="text-sm text-red-800 mb-2">
                    When a model learns the training data too well, including noise and irrelevant patterns. It performs perfectly on training data but poorly on new data.
                </p>
                <p className="text-xs text-red-700">
                    <strong>Analogy:</strong> A student who memorizes answers to specific test questions but can't solve new problems. The model "memorized" rather than "learned" the underlying patterns.
                </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-900 mb-2">Cross-Validation</h4>
                <p className="text-sm text-green-800 mb-2">
                    A technique to assess model performance by splitting data into multiple "folds," training on some folds and testing on others, then averaging results.
                </p>
                <p className="text-xs text-green-700">
                    <strong>Benefit:</strong> More reliable performance estimate than a single train/test split. Reduces the impact of random data splits.
                </p>
            </div>
        </div>

        <hr className="my-6 border-gray-200"/>

        <h3 className="font-bold text-lg text-gray-900">Part 5: Critical Thinking</h3>
        <ul className="list-decimal pl-5 space-y-4">
            <li>
                <strong>Question 1:</strong> A Random Forest model achieves 95% accuracy on training data but only 70% on test data. What is happening, and what should you do?
            </li>
            <li>
                <strong>Question 2:</strong> You want to predict tree volume from DBH and height. Would you use classification or regression? Why?
            </li>
            <li>
                <strong>Question 3:</strong> A vendor offers an ML model that identifies tree species with "99% accuracy." What questions should you ask before using it in your operation?
            </li>
            <li>
                <strong>Question 4:</strong> You have 100 labeled tree images for training. Is this enough data? What factors determine if you need more?
            </li>
        </ul>

        <div className="mt-8">
            <details className="group border border-blue-200 rounded-lg bg-blue-50 open:bg-blue-50 transition-colors">
                <summary className="cursor-pointer p-4 font-bold text-blue-800 flex items-center gap-2 select-none">
                    <span>Instructor Answer Key</span>
                    <span className="text-xs font-normal text-blue-600">(Click to Reveal)</span>
                </summary>
                <div className="p-4 pt-0 text-sm text-blue-900 space-y-2">
                    <p><strong>Q1:</strong> This is <strong>overfitting</strong>. The model memorized training patterns that don't generalize. Solutions: Get more training data, simplify the model, use regularization, or try a different algorithm.</p>
                    <p><strong>Q2:</strong> Use <strong>regression</strong> because volume is a continuous value (not a category). Classification predicts categories (e.g., species), regression predicts numbers (e.g., volume in m³).</p>
                    <p><strong>Q3:</strong> Ask: What was the test accuracy (not training)? What species were tested? What were the lighting/weather conditions? How many images were in the test set? What's the false positive rate? Can you test it on your own data?</p>
                    <p><strong>Q4:</strong> Depends on: Model complexity (simple models need less data), number of classes (more species = more data needed), image diversity (different lighting, angles, seasons), and desired accuracy. Generally, 100 images is minimal—aim for 500-1000+ per species for robust models.</p>
                </div>
            </details>
        </div>
    </div>
);

