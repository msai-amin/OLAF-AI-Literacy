import { useState } from 'react';
import { IconTree } from './components/icons';
import { IntroLab } from './components/IntroLab';
import { VisionLab } from './components/VisionLab';
import { PredictiveLab } from './components/PredictiveLab';
import { GenAILab } from './components/GenAILab';
import { DataLab } from './components/DataLab';
import { LidarLab } from './components/LidarLab';

function App() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { id: 0, title: "Home", component: <IntroLab setTab={setActiveTab} /> },
        { id: 1, title: "1. Vision", component: <VisionLab /> },
        { id: 2, title: "2. Prediction", component: <PredictiveLab /> },
        { id: 3, title: "3. GenAI", component: <GenAILab /> },
        { id: 4, title: "4. Data Quality", component: <DataLab /> },
        { id: 5, title: "5. LiDAR", component: <LidarLab /> },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            <div className="bg-green-900 text-white p-6 shadow-lg">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-3">
                            <IconTree className="text-green-300" /> Forestry AI Literacy Course
                        </h1>
                        <p className="text-green-200 opacity-80 mt-1 text-sm">Interactive Learning Labs v2.1</p>
                    </div>
                    <button onClick={() => setActiveTab(0)} className="text-sm bg-green-800 hover:bg-green-700 px-3 py-1 rounded border border-green-600 transition-colors hidden sm:block">
                        Back to Home
                    </button>
                </div>
            </div>

            <div className="max-w-5xl mx-auto mt-6 px-4">
                {/* Navigation */}
                <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-1 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-t-lg font-bold text-sm transition-all whitespace-nowrap ${
                                activeTab === tab.id 
                                ? 'bg-white text-green-900 border-t-4 border-green-600 shadow-sm translate-y-px' 
                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                        >
                            {tab.title}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="bg-white p-6 rounded-b-lg rounded-r-lg shadow-sm min-h-[500px]">
                    {tabs[activeTab].component}
                </div>
            </div>
        </div>
    );
}

export default App;

