import { IconEye } from '../icons';

export const VisionGuideContent = () => (
    <div className="p-8 prose prose-green max-w-none text-gray-700">
        <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-6">
            <strong className="block text-green-800 mb-1">Objective</strong>
            Calibrate an AI model to count timber logs while avoiding "False Positives" (rocks/debris).
        </div>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Part 1: The Concept</h3>
        <p>
            <strong>Computer Vision</strong> is the science of teaching a computer to "see." Unlike a human, a computer sees a log as a grid of numbers (pixel colors).
        </p>
        <p>
            When an AI analyzes an image (like a drone photo of a cut block), it doesn't say <em>"That is a log."</em> It says: <em>"I am <strong>85% confident</strong> that this cluster of brown pixels is a log."</em>
        </p>
        <p>
            As the forester, <strong>YOU</strong> decide the cut-off point. This is called the <strong>Confidence Threshold</strong>.
        </p>

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

        <h3 className="font-bold text-lg text-gray-900">Part 2: The Simulation</h3>
        <p>In this lab, the <strong>Brown Circles</strong> are Merchantable Timber, and the <strong>Grey Shapes</strong> are Rocks/Debris.</p>

        <div className="space-y-6 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-green-800">Experiment A: The "Greedy" AI</h4>
                <p className="text-sm mb-2 italic">Set the AI Confidence Slider to <strong>10%</strong>.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Does it miss any logs?</li>
                    <li>Does it count rocks?</li>
                    <li><strong>Impact:</strong> If you used this setting to pay a logger, what would happen?</li>
                </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-green-800">Experiment B: The "Cautious" AI</h4>
                <p className="text-sm mb-2 italic">Set the AI Confidence Slider to <strong>90%</strong>.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Does it find all the logs?</li>
                    <li><strong>Impact:</strong> If you used this setting to calculate inventory value, what would happen?</li>
                </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-green-800">Experiment C: Calibration</h4>
                <p className="text-sm mb-2 italic">Adjust the slider until you find the perfect balance.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Target: Get False Positives to 0 while keeping "AI Found" close to "Actual Logs".</li>
                    <li>What was your optimal threshold %?</li>
                </ul>
            </div>
        </div>

        <hr className="my-6 border-gray-200"/>

        <h3 className="font-bold text-lg text-gray-900">Part 3: Critical Thinking</h3>
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
                    <p><strong>Q3:</strong> Yes. Lighting changes pixel values. Calibration is essential every flight.</p>
                </div>
            </details>
        </div>
    </div>
);

