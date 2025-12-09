import { IconDatabase } from '../icons';

export const DataQualityGuideContent = () => (
    <div className="p-8 prose prose-green max-w-none text-gray-700">
        <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mb-6">
            <strong className="block text-yellow-800 mb-1">Objective</strong>
            Understand why training data quality determines AI model performance. Learn to identify and filter bad data before it corrupts your model.
        </div>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Part 1: The Golden Rule</h3>
        <p>
            <strong>"Garbage In, Garbage Out" (GIGO)</strong> is the fundamental principle of machine learning. An AI model can only be as good as the data it was trained on.
        </p>
        <p>
            Think of it like teaching a child: if you show them 100 photos and call them all "trees" (even though 30 are telephone poles), the child will learn to call telephone poles "trees." The AI works the same way.
        </p>
        <p>
            In forestry, this isn't just an academic problem. A model trained on bad data can:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><strong>Overestimate inventory</strong> → Financial losses, regulatory violations</li>
            <li><strong>Misclassify species</strong> → Wrong silvicultural prescriptions</li>
            <li><strong>Miss hazards</strong> → Safety incidents, equipment damage</li>
        </ul>

        <div className="mt-6 bg-blue-50 p-5 rounded-lg border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-3 text-base flex items-center gap-2">
                <IconDatabase className="w-4 h-4"/> Real-World Forestry Applications
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-blue-800">
                <li>
                    <strong>Drone Inventory Systems:</strong> A forester uploads 500 drone images to train a tree-counting model. If 50 of those images contain power lines, fence posts, or snags labeled as "merchantable trees," the model will count infrastructure as timber. Result: Overvalued stands, incorrect harvest planning.
                </li>
                <li>
                    <strong>Pest Detection Models:</strong> Training data that includes healthy trees with natural bark patterns (mistakenly labeled as "beetle damage") creates false positives. The model flags healthy stands for treatment, wasting resources and potentially harming the ecosystem.
                </li>
                <li>
                    <strong>Species Classification:</strong> A model trained on images where "Douglas Fir" and "Western Hemlock" are mixed up will misidentify species in the field. This leads to incorrect volume calculations and wrong silvicultural prescriptions.
                </li>
                <li>
                    <strong>LiDAR Ground Classification:</strong> If training data includes bridges, buildings, or vehicles as "ground points," the digital terrain model (DTM) will be inaccurate. This corrupts all downstream calculations (slope, aspect, volume).
                </li>
            </ul>
        </div>

        <hr className="my-6 border-gray-200"/>

        <h3 className="font-bold text-lg text-gray-900">Part 2: The Simulation</h3>
        <p>In this lab, you are training a drone AI to identify <strong>Live Merchantable Trees</strong> from aerial imagery.</p>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
            <h4 className="font-bold text-yellow-800 mb-2">Your Task</h4>
            <p className="text-sm mb-2">Select <strong>ONLY</strong> the samples that represent what you want the AI to learn:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><strong>✅ Include:</strong> Healthy Fir, Spruce, Pine (these are merchantable trees)</li>
                <li><strong>❌ Exclude:</strong> Telephone Pole, Dead Snag (these are NOT merchantable trees)</li>
            </ul>
        </div>

        <div className="space-y-6 mt-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-yellow-800">Experiment A: The "Inclusive" Approach</h4>
                <p className="text-sm mb-2 italic">Select ALL 5 samples (including the pole and snag).</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>What happens to the model accuracy?</li>
                    <li>What would this model do in the field?</li>
                    <li><strong>Impact:</strong> If you used this model to calculate harvest volume, what would happen?</li>
                </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-yellow-800">Experiment B: The "Selective" Approach</h4>
                <p className="text-sm mb-2 italic">Select ONLY the 3 healthy trees (Fir, Spruce, Pine).</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>What happens to the model accuracy?</li>
                    <li>Is this model ready for field deployment?</li>
                    <li><strong>Impact:</strong> How would this model perform in a real inventory survey?</li>
                </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-yellow-800">Experiment C: The "Incomplete" Approach</h4>
                <p className="text-sm mb-2 italic">Select only 1 or 2 trees (not enough training data).</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>What happens to the model accuracy?</li>
                    <li>Why does the model struggle even with "good" data?</li>
                    <li><strong>Lesson:</strong> Quality AND quantity matter. You need enough good examples.</li>
                </ul>
            </div>
        </div>

        <hr className="my-6 border-gray-200"/>

        <h3 className="font-bold text-lg text-gray-900">Part 3: Critical Thinking</h3>
        <ul className="list-decimal pl-5 space-y-4">
            <li>
                <strong>Question 1:</strong> In a real forestry operation, who is responsible for data quality? The field crew collecting images, the data scientist training the model, or the forester approving the results?
            </li>
            <li>
                <strong>Question 2:</strong> If you discover that a model was trained on bad data AFTER it's been used for 6 months of inventory surveys, what should you do? Can you "fix" the model, or do you need to retrain from scratch?
            </li>
            <li>
                <strong>Question 3:</strong> How would you verify that your training data is high quality? What checks would you perform before training a model?
            </li>
            <li>
                <strong>Question 4:</strong> A vendor offers you an "AI-ready" dataset of 10,000 labeled tree images for $5,000. How would you evaluate whether this data is worth the cost?
            </li>
        </ul>

        <div className="mt-8">
            <details className="group border border-blue-200 rounded-lg bg-blue-50 open:bg-blue-50 transition-colors">
                <summary className="cursor-pointer p-4 font-bold text-blue-800 flex items-center gap-2 select-none">
                    <span>Instructor Answer Key</span>
                    <span className="text-xs font-normal text-blue-600">(Click to Reveal)</span>
                </summary>
                <div className="p-4 pt-0 text-sm text-blue-900 space-y-2">
                    <p><strong>Experiment A:</strong> Model accuracy drops significantly. The AI learns to classify poles and snags as merchantable trees. Result: Overestimated inventory, financial losses, potential regulatory issues.</p>
                    <p><strong>Experiment B:</strong> High accuracy. Model correctly identifies merchantable trees. This is the correct approach for production use.</p>
                    <p><strong>Experiment C:</strong> Low accuracy due to insufficient training data. Even with perfect data, you need enough examples for the model to learn patterns.</p>
                    <p><strong>Q1:</strong> <strong>Everyone</strong> is responsible. Field crews must collect clean data, data scientists must validate it, and foresters must verify results. Data quality is a team effort.</p>
                    <p><strong>Q2:</strong> You must retrain from scratch with corrected data. You cannot "patch" a model trained on bad data. All previous results are suspect and may need to be recalculated.</p>
                    <p><strong>Q3:</strong> Sample validation (spot-check 10% of labels), consistency checks (same object labeled by multiple people), expert review, and test on known ground truth data.</p>
                    <p><strong>Q4:</strong> Request a sample (100-200 images), verify labels with your own experts, check for diversity (species, age classes, lighting conditions), and test a small model first before purchasing the full dataset.</p>
                </div>
            </details>
        </div>
    </div>
);

