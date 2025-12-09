import { IconDatabase } from '../icons';

export const PredictionGuideContent = () => (
    <div className="p-8 prose prose-green max-w-none text-gray-700">
        <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
            <strong className="block text-red-800 mb-1">Objective</strong>
            Use variables (Fuel, Wind, Slope) to predict future outcomes and mitigate risk.
        </div>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Part 1: The Digital Crystal Ball</h3>
        <p>
            <strong>Predictive Analytics</strong> is the use of historical data to estimate future events. In forestry, we don't have a crystal ball, but we have math.
        </p>
        <p>
            By feeding an AI model thousands of past events (e.g., "On days with 15% humidity and 20km/h wind, fire spread 500m/hour"), the system learns patterns that are invisible to humans.
        </p>

        <div className="mt-6 bg-blue-50 p-5 rounded-lg border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-3 text-base flex items-center gap-2">
                <IconDatabase className="w-4 h-4"/> Real-World Forestry Applications
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-blue-800">
                <li>
                    <strong>Fire Behaviour Prediction:</strong> Tools like <em>FARSITE</em> or <em>Prometheus</em> use the same logic as this simulator. They ingest weather data, topography, and fuel types to generate "Burn Probability Maps" for the next 24 hours.
                </li>
                <li>
                    <strong>Growth & Yield Modeling:</strong> Models like <em>FVS (Forest Vegetation Simulator)</em> or <em>TASS</em> predict how a stand will grow over 50 years. "If I thin this stand to 800 stems/ha today, what will the merchantable volume be in 2045?"
                </li>
                <li>
                    <strong>Harvest Optimization:</strong> Mills use predictive models to match log supply with market demand. "Based on housing starts, we predict a shortage of 2x4s next month; prioritize harvesting Block A."
                </li>
            </ul>
        </div>

        <hr className="my-6 border-gray-200"/>

        <h3 className="font-bold text-lg text-gray-900">Part 2: The Simulation Logic</h3>
        <p>This simulation runs a <strong>Cellular Automaton</strong>. It is not magic; it is a set of simple rules run thousands of times.</p>
        
        <div className="bg-gray-100 p-4 rounded-lg text-sm font-mono mb-4 border border-gray-300">
            <strong>Logic Loop:</strong><br/>
            1. Am I burning?<br/>
            2. Check my North neighbor.<br/>
            3. Is the wind blowing North? (Increase Probability)<br/>
            4. Is the neighbor Grass or Timber? (Modify Probability)<br/>
            5. Roll the dice. If random number &lt; Probability, ignite neighbor.
        </div>

        <h4 className="font-bold text-red-800 mt-6">Experiment A: Fuel Types</h4>
        <p className="text-sm mb-2">Reset the map until you get a mix of Grass (Light Green) and Timber (Dark Green). Ignite the Grass.</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Does the fire move faster in Grass or Timber?</li>
            <li>Why is "Flashy Fuel" (Grass) dangerous for initial attack crews?</li>
        </ul>

        <h4 className="font-bold text-red-800 mt-4">Experiment B: The Wind Factor</h4>
        <p className="text-sm mb-2">Set <strong>Wind Speed to 10</strong> (Max) and direction to <strong>East</strong>.</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Watch the shape of the fire. It should form a narrow "Cigar" or "Flank" shape.</li>
            <li>Now set <strong>Wind Speed to 0</strong>. The fire should grow in a circle.</li>
        </ul>

        <h4 className="font-bold text-red-800 mt-4">Experiment C: Containment Challenge</h4>
        <p className="text-sm mb-2"><strong>Goal:</strong> Stop the fire before it burns 50% of the map.</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Start the fire.</li>
            <li>Pause the simulation (optional).</li>
            <li>Use the <strong>Dozer Line</strong> tool to dig a break ahead of the fire front.</li>
            <li>Resume. Did the fire jump your line? (If wind is high, it might!).</li>
        </ul>

        <hr className="my-6 border-gray-200"/>

        <h3 className="font-bold text-lg text-gray-900">Part 3: Critical Thinking</h3>
        <p className="italic text-gray-600 mb-4">"All models are wrong, but some are useful." - George Box</p>
        <ul className="list-decimal pl-5 space-y-4">
            <li>
                <strong>Question 1:</strong> Why might a fire prediction model fail in real life? What variables are missing from this simple simulation? (e.g., Spotting/Embers, detailed topography).
            </li>
            <li>
                <strong>Question 2:</strong> If an AI predicts a low fire risk, but you walk outside and feel hot dry wind, which data source do you trust? The AI or your skin?
            </li>
        </ul>
    </div>
);

