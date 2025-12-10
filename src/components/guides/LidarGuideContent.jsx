import { IconScan } from '../icons';

export const LidarGuideContent = () => (
    <div className="p-8 prose prose-green max-w-none text-gray-700">
        <div className="bg-purple-50 border-l-4 border-purple-600 p-4 mb-6">
            <strong className="block text-purple-800 mb-1">Objective</strong>
            Understand how LiDAR creates 3D point clouds and how AI performs semantic segmentation to separate ground from vegetation.
        </div>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Part 1: What is LiDAR?</h3>
        <p>
            <strong>LiDAR</strong> (Light Detection and Ranging) is a remote sensing technology that measures distance by illuminating a target with laser light and analyzing the reflected light.
        </p>
        <p>
            Think of it like radar, but using light instead of radio waves. A LiDAR sensor on a drone or aircraft fires millions of laser pulses per second. Each pulse bounces off objects (trees, ground, buildings) and returns to the sensor. By measuring the time it takes for each pulse to return, the system calculates precise 3D coordinates.
        </p>
        <p>
            The result is a <strong>"Point Cloud"</strong>—millions of individual points in 3D space, each with X, Y, Z coordinates. Raw LiDAR data is just points; it doesn't "know" what each point represents.
        </p>

        <div className="mt-6 bg-indigo-50 p-5 rounded-lg border border-indigo-200 mb-6">
            <h4 className="font-bold text-indigo-900 mb-3 text-base flex items-center gap-2">
                <IconScan className="w-4 h-4"/> LiDAR Processing Tools & Resources
            </h4>
            <p className="text-sm text-indigo-800 mb-2">
                <strong>Data to Science (D2S) Platform:</strong> The <a href="https://ps2.d2s.org/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline hover:text-indigo-800">ps2.d2s.org</a> platform provides modular tools for data-driven innovation and research, including specialized resources for LiDAR data processing, analysis, and visualization. This platform supports forestry professionals and researchers in working with point cloud data, offering applications that facilitate the transformation of raw LiDAR measurements into actionable insights for forest management and analysis.
            </p>
        </div>

        <div className="mt-6 bg-blue-50 p-5 rounded-lg border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-3 text-base flex items-center gap-2">
                <IconScan className="w-4 h-4"/> Real-World Forestry Applications
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-blue-800">
                <li>
                    <strong>Digital Terrain Models (DTM):</strong> By separating ground points from vegetation, LiDAR creates accurate elevation maps. Foresters use DTMs to calculate slope, aspect, and identify drainage patterns—critical for road planning and harvest layout.
                </li>
                <li>
                    <strong>Tree Height Measurement:</strong> Once ground is classified, the height of each tree can be calculated by measuring the vertical distance from ground points to the highest vegetation point above. This enables precise volume calculations without climbing trees.
                </li>
                <li>
                    <strong>Canopy Structure Analysis:</strong> LiDAR penetrates through foliage to capture the 3D structure of the forest. Foresters can analyze canopy density, identify gaps, and measure vertical diversity—all from the air.
                </li>
                <li>
                    <strong>Pre-Harvest Planning:</strong> By classifying points into ground, understory, and overstory, foresters can create 3D models of stands. This helps identify optimal harvest boundaries, plan cable yarding corridors, and estimate volume before ground crews arrive.
                </li>
                <li>
                    <strong>Post-Fire Assessment:</strong> LiDAR can detect changes in forest structure after fires. By comparing pre- and post-fire point clouds, foresters can quantify burn severity and plan salvage operations.
                </li>
            </ul>
        </div>

        <hr className="my-6 border-gray-200"/>

        <h3 className="font-bold text-lg text-gray-900">Part 2: Semantic Segmentation</h3>
        <p>
            <strong>Semantic Segmentation</strong> is the AI process of classifying each point in the cloud into categories: Ground, Vegetation, Buildings, Water, etc.
        </p>
        <p>
            This is not trivial. A human can look at a point cloud and say "those points are a tree," but a computer sees only numbers. The AI must learn patterns:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm">
            <li><strong>Elevation:</strong> Ground points are typically the lowest points in a local area</li>
            <li><strong>Density:</strong> Vegetation points cluster vertically (tree trunks, branches)</li>
            <li><strong>Slope:</strong> Ground points form continuous surfaces; vegetation points are more scattered</li>
            <li><strong>Height above ground:</strong> Points far above the local ground level are likely vegetation</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg text-sm font-mono mb-4 border border-gray-300 mt-4">
            <strong>Classification Algorithm (Simplified):</strong><br/>
            1. Identify lowest points in each local area (ground seed points)<br/>
            2. Grow ground surface by connecting nearby low points<br/>
            3. Calculate height above ground for all remaining points<br/>
            4. Points above threshold height → Vegetation<br/>
            5. Points below threshold → Ground<br/>
            6. Apply smoothing and filtering to remove errors
        </div>

        <hr className="my-6 border-gray-200"/>

        <h3 className="font-bold text-lg text-gray-900">Part 3: The Simulation</h3>
        <p>This lab simulates a LiDAR point cloud with ~5,000 points representing a forest stand.</p>

        <div className="space-y-6 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-purple-800">Experiment A: Raw Data View</h4>
                <p className="text-sm mb-2 italic">Click <strong>"Raw Data"</strong> to see the unprocessed point cloud.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>What do you see? Can you distinguish trees from ground?</li>
                    <li>Why is it difficult to interpret raw LiDAR data?</li>
                    <li>What information is missing that would help you understand the scene?</li>
                </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-purple-800">Experiment B: AI Classification</h4>
                <p className="text-sm mb-2 italic">Click <strong>"Run AI Classification"</strong> to see semantic segmentation.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Notice the color change: <span className="text-green-600 font-bold">Green = Vegetation</span>, <span className="text-amber-700 font-bold">Brown = Ground</span></li>
                    <li>How does the AI distinguish between ground and trees?</li>
                    <li>Are there any points that seem misclassified? Why might that happen?</li>
                </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-purple-800">Experiment C: Elevation Filtering</h4>
                <p className="text-sm mb-2 italic">Use the <strong>"Filter Elevation"</strong> slider to hide points below a certain height.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Start with the slider at minimum. Gradually increase it.</li>
                    <li>What happens to the visualization?</li>
                    <li>How could this tool help you analyze forest structure?</li>
                    <li><strong>Practical Use:</strong> Foresters use elevation filters to isolate canopy layers or focus on understory vegetation.</li>
                </ul>
            </div>
        </div>

        <hr className="my-6 border-gray-200"/>

        <h3 className="font-bold text-lg text-gray-900">Part 4: Critical Thinking</h3>
        <ul className="list-decimal pl-5 space-y-4">
            <li>
                <strong>Question 1:</strong> Why is accurate ground classification critical for forestry applications? What happens if the AI misclassifies a bridge or building as "ground"?
            </li>
            <li>
                <strong>Question 2:</strong> In a dense forest, some laser pulses hit the ground, while others hit only vegetation. How does this affect the point cloud? What information might be missing?
            </li>
            <li>
                <strong>Question 3:</strong> A forester receives a LiDAR dataset where 15% of points are classified as "unclassified" (neither ground nor vegetation). Should they trust the remaining 85%? Why or why not?
            </li>
            <li>
                <strong>Question 4:</strong> How would you verify that a LiDAR classification is accurate? What ground truth data would you collect?
            </li>
        </ul>

        <div className="mt-8">
            <details className="group border border-blue-200 rounded-lg bg-blue-50 open:bg-blue-50 transition-colors">
                <summary className="cursor-pointer p-4 font-bold text-blue-800 flex items-center gap-2 select-none">
                    <span>Instructor Answer Key</span>
                    <span className="text-xs font-normal text-blue-600">(Click to Reveal)</span>
                </summary>
                <div className="p-4 pt-0 text-sm text-blue-900 space-y-2">
                    <p><strong>Experiment A:</strong> Raw data appears as a uniform gray cloud. It's difficult to distinguish features because all points look the same. Without classification, you can't extract meaningful information.</p>
                    <p><strong>Experiment B:</strong> Classification reveals structure: green points show vegetation (trees), brown points show ground. The AI uses elevation, density, and spatial relationships to make these distinctions.</p>
                    <p><strong>Experiment C:</strong> Elevation filtering allows you to "slice" the point cloud at different heights, revealing forest layers. This is useful for analyzing canopy structure and understory conditions.</p>
                    <p><strong>Q1:</strong> Ground classification is the foundation for all downstream analysis. If bridges/buildings are misclassified as ground, the Digital Terrain Model (DTM) will be wrong, corrupting all height measurements, slope calculations, and volume estimates.</p>
                    <p><strong>Q2:</strong> In dense forests, many pulses never reach the ground (they hit leaves/branches first). This creates "data gaps" where ground elevation is unknown. Foresters must interpolate or use ground surveys to fill these gaps.</p>
                    <p><strong>Q3:</strong> Unclassified points are a red flag. They often indicate areas where the AI is uncertain (steep slopes, complex terrain, or data quality issues). The forester should investigate these areas and may need to manually classify them or collect ground truth data.</p>
                    <p><strong>Q4:</strong> Ground truth verification requires: (1) GPS surveys of known ground points, (2) Tree height measurements using clinometers or laser rangefinders, (3) Visual inspection of classified areas, and (4) Comparison with aerial photography or field notes.</p>
                </div>
            </details>
        </div>
    </div>
);

