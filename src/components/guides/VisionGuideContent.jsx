import { IconEye } from '../icons';

export const VisionGuideContent = () => (
    <div className="p-8 prose prose-green max-w-none text-gray-700">
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
            <strong className="block text-blue-800 mb-1">Objective</strong>
            Calibrate an AI model to count timber logs while avoiding "False Positives" (rocks/debris).
        </div>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Part 1: The Concept</h3>
        <p>
            <strong>Computer Vision</strong> is the science of teaching a computer to "see" and interpret visual information. Unlike humans who see objects, colors, and shapes, a computer sees an image as a grid of numbers—each pixel has RGB (Red, Green, Blue) values ranging from 0-255.
        </p>
        <p>
            For example, a brown log might have pixel values like R=180, G=140, B=100. The computer doesn't "know" this is wood—it just sees numbers. Computer vision AI learns to recognize patterns in these numbers that correspond to real-world objects.
        </p>
        <p>
            When an AI analyzes an image (like a drone photo of a cut block), it doesn't say <em>"That is a log."</em> Instead, it calculates a probability: <em>"I am <strong>85% confident</strong> that this cluster of brown pixels matches the pattern of logs I've seen in training data."</em>
        </p>
        <p>
            This confidence score is based on:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><strong>Color similarity:</strong> How closely the pixel colors match known log colors</li>
            <li><strong>Shape patterns:</strong> Whether the object's outline matches circular log ends</li>
            <li><strong>Size consistency:</strong> Whether the dimensions are within expected log size ranges</li>
            <li><strong>Texture patterns:</strong> Whether surface texture matches wood grain patterns</li>
            <li><strong>Context:</strong> Whether surrounding objects support the classification (e.g., other logs nearby)</li>
        </ul>
        <p>
            As the forester, <strong>YOU</strong> decide the cut-off point. This is called the <strong>Confidence Threshold</strong>. Set it too low (e.g., 10%), and the AI becomes "greedy"—accepting almost anything, including false positives. Set it too high (e.g., 90%), and the AI becomes "cautious"—missing real logs that don't score perfectly.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg text-sm font-mono mb-4 border border-gray-300 mt-4">
            <strong>How Computer Vision Works (Simplified):</strong><br/>
            1. Training: AI analyzes thousands of labeled images (e.g., "this is a log," "this is a rock")<br/>
            2. Pattern Learning: AI identifies pixel patterns that distinguish logs from rocks<br/>
            3. Feature Extraction: AI learns key features (color, shape, size, texture)<br/>
            4. Classification: New images are compared to learned patterns<br/>
            5. Confidence Scoring: AI assigns a probability (0-100%) for each detection<br/>
            6. Threshold Filtering: You set the minimum confidence to accept a detection
        </div>

        <div className="mt-6 bg-blue-50 p-5 rounded-lg border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-3 text-base flex items-center gap-2">
                <IconEye className="w-4 h-4"/> Real-World Forestry Applications
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-blue-800">
                <li>
                    <strong>Digital Log Scaling:</strong> Mobile apps (e.g., Timbeter) use computer vision to detect log ends in a pile, automatically calculating volume, pile density, and diameter distributions in seconds.
                </li>
                <li>
                    <strong>Precision Inventory (Census):</strong> Instead of sampling 5% of a stand, drones capture the entire area. AI algorithms count every single individual tree (100% census) and measure canopy height from the imagery.
                </li>
                <li>
                    <strong>Early Pest Detection:</strong> AI analyzes multispectral satellite imagery to detect subtle color shifts in foliage (stress signals) caused by Bark Beetles or root rot <em>before</em> the trees turn red to the human eye.
                </li>
                <li>
                    <strong>Wildlife Monitoring:</strong> Machine learning models process millions of hours of camera trap footage to automatically identify and count species, filtering out "empty" videos triggered by wind.
                </li>
            </ul>
        </div>

        <hr className="my-6 border-gray-200"/>

        <h3 className="font-bold text-lg text-gray-900">Part 2: Understanding Precision and Recall</h3>
        <p>
            When evaluating computer vision models, foresters need to understand two critical metrics:
        </p>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-bold text-green-900 mb-2">Precision</h4>
                <p className="text-sm text-green-800 mb-2">
                    <strong>Definition:</strong> Of all the objects the AI identified as logs, how many were actually logs?
                </p>
                <p className="text-xs text-green-700 font-mono">
                    Precision = Correctly ID'd Logs / (Correctly ID'd Logs + False Positives)
                </p>
                <p className="text-xs text-green-700 mt-2">
                    <strong>High Precision:</strong> Few false positives. When AI says "log," you can trust it. But it might miss some real logs.
                </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-2">Recall</h4>
                <p className="text-sm text-blue-800 mb-2">
                    <strong>Definition:</strong> Of all the actual logs in the image, how many did the AI find?
                </p>
                <p className="text-xs text-blue-700 font-mono">
                    Recall = Correctly ID'd Logs / Actual Logs
                </p>
                <p className="text-xs text-blue-700 mt-2">
                    <strong>High Recall:</strong> Finds most real logs. But might also flag rocks/debris as logs (false positives).
                </p>
            </div>
        </div>
        <p className="mt-4 text-sm">
            <strong>The Trade-off:</strong> You typically can't maximize both precision and recall simultaneously. Lowering the confidence threshold increases recall (finds more logs) but decreases precision (more false positives). Raising the threshold increases precision (fewer false positives) but decreases recall (misses more logs).
        </p>

        <hr className="my-6 border-gray-200"/>

        <h3 className="font-bold text-lg text-gray-900">Part 3: The Simulation</h3>
        <p>In this lab, the <strong>Brown Circles</strong> are Merchantable Timber, and the <strong>Grey Shapes</strong> are Rocks/Debris.</p>
        <p className="text-sm text-gray-600 mt-2">
            Each object has a pre-assigned "confidence score" (shown when detected). Logs typically score 70-100%, while rocks score 0-60%. The green boxes show what the AI detects based on your threshold setting.
        </p>

        <div className="space-y-6 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-blue-800">Experiment A: The "Greedy" AI</h4>
                <p className="text-sm mb-2 italic">Set the AI Confidence Slider to <strong>10%</strong>.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Does it miss any logs?</li>
                    <li>Does it count rocks?</li>
                    <li><strong>Impact:</strong> If you used this setting to pay a logger, what would happen?</li>
                </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-blue-800">Experiment B: The "Cautious" AI</h4>
                <p className="text-sm mb-2 italic">Set the AI Confidence Slider to <strong>90%</strong>.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Does it find all the logs?</li>
                    <li><strong>Impact:</strong> If you used this setting to calculate inventory value, what would happen?</li>
                </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-bold text-blue-800">Experiment C: Calibration</h4>
                <p className="text-sm mb-2 italic">Adjust the slider until you find the perfect balance.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Target: Get False Positives to 0 while keeping "AI Found" close to "Actual Logs".</li>
                    <li>What was your optimal threshold %?</li>
                </ul>
            </div>
        </div>

        <hr className="my-6 border-gray-200"/>

        <h3 className="font-bold text-lg text-gray-900">Part 4: Factors Affecting Computer Vision Accuracy</h3>
        <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200 mt-4">
            <h4 className="font-bold text-yellow-900 mb-3">Environmental Variables That Impact Detection</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-yellow-800">
                <li>
                    <strong>Lighting Conditions:</strong> Sunny vs. cloudy days change pixel values. A log that scores 85% in bright sun might score 70% in shade. This is why calibration is essential for every flight.
                </li>
                <li>
                    <strong>Weather:</strong> Rain, snow, or fog can obscure features or create reflections that confuse the AI. Wet logs appear darker, changing their pixel values.
                </li>
                <li>
                    <strong>Time of Day:</strong> Shadows change throughout the day. Morning surveys might require different thresholds than afternoon surveys.
                </li>
                <li>
                    <strong>Camera Angle:</strong> Oblique angles (not directly overhead) distort shapes. Logs viewed from the side look like rectangles, not circles.
                </li>
                <li>
                    <strong>Image Resolution:</strong> Low-resolution images (fewer pixels) provide less detail. Small logs might be missed, or rocks might be misclassified.
                </li>
                <li>
                    <strong>Surface Condition:</strong> Clean, fresh-cut logs have higher confidence scores than dirty, weathered logs covered in mud or moss.
                </li>
                <li>
                    <strong>Background Contrast:</strong> Logs on dark soil are easier to detect than logs on similar-colored ground. Low contrast = lower confidence scores.
                </li>
            </ul>
        </div>

        <hr className="my-6 border-gray-200"/>

        <h3 className="font-bold text-lg text-gray-900">Part 5: Critical Thinking</h3>
        <ul className="list-decimal pl-5 space-y-4">
            <li>
                <strong>Question 1:</strong> In a real forestry scenario, which error is worse?
                <div className="mt-1 ml-4 text-sm bg-white p-2 border rounded">A) Over-estimating volume vs. B) Under-estimating volume</div>
            </li>
            <li>
                <strong>Question 2:</strong> Why did the AI struggle with some of the "Logs" in the simulation? (Hint: Look at the color/texture).
            </li>
            <li>
                <strong>Question 3:</strong> If you were flying a drone survey on a <strong>cloudy day</strong> versus a <strong>sunny day</strong>, would you need to change your threshold? Why?
            </li>
        </ul>

        <div className="mt-8">
            <details className="group border border-blue-200 rounded-lg bg-blue-50 open:bg-blue-50 transition-colors">
                <summary className="cursor-pointer p-4 font-bold text-blue-800 flex items-center gap-2 select-none">
                    <span>Instructor Answer Key</span>
                    <span className="text-xs font-normal text-blue-600">(Click to Reveal)</span>
                </summary>
                <div className="p-4 pt-0 text-sm text-blue-900 space-y-2">
                    <p><strong>Experiment A:</strong> High Recall, Low Precision. Result: Overpaying loggers, counting rocks as wood.</p>
                    <p><strong>Experiment B:</strong> High Precision, Low Recall. Result: Undervaluing the stand.</p>
                    <p><strong>Q1:</strong> Usually <strong>A (Over-estimating)</strong> is worse for liability, but B is bad for profit.</p>
                    <p><strong>Q2:</strong> The AI assigns a "Score" based on pixel similarity. "Dirty" logs have lower scores.</p>
                    <p><strong>Q3:</strong> Yes. Lighting changes pixel values dramatically. A log that scores 85% in bright sun might score 70% in shade. Calibration is essential every flight, and some foresters maintain different thresholds for different weather conditions.</p>
                    <p><strong>Precision vs. Recall Trade-off:</strong> Low threshold (10%) = High Recall, Low Precision. High threshold (90%) = High Precision, Low Recall. The optimal threshold depends on your business priorities: avoiding false positives (precision) vs. finding all logs (recall).</p>
                </div>
            </details>
        </div>
    </div>
);


