import { useState } from 'react';
import { IconTree } from './components/icons';
import { IntroLab } from './components/IntroLab';
import { VisionLab } from './components/VisionLab';
import { PredictiveLab } from './components/PredictiveLab';
import { GenAILab } from './components/GenAILab';
import { DataLab } from './components/DataLab';
import { LidarLab } from './components/LidarLab';
import { MLLab } from './components/MLLab';
import { QuizLab } from './components/QuizLab';

function App() {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        { id: 0, title: "Home", component: <IntroLab setTab={setActiveTab} /> },
        { id: 1, title: "1. ML", component: <MLLab /> },
        { id: 2, title: "2. Vision", component: <VisionLab /> },
        { id: 3, title: "3. Prediction", component: <PredictiveLab /> },
        { id: 4, title: "4. GenAI", component: <GenAILab /> },
        { id: 5, title: "5. Data Quality", component: <DataLab /> },
        { id: 6, title: "6. LiDAR", component: <LidarLab /> },
        { id: 7, title: "Quiz", component: <QuizLab /> },
    ];

    return (
        <div className="min-h-screen pb-10">
            <div className="bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 text-white p-6 shadow-xl border-b-4 border-blue-500">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <IconTree className="text-blue-300" /> Forestry AI Literacy Course
                    </h1>
                    <p className="text-blue-200 opacity-90 mt-1 text-sm font-medium">Interactive Learning Labs v2.1</p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto mt-6 px-4">
                {/* Navigation */}
                <div className="flex flex-wrap gap-2 mb-6 border-b-2 border-slate-200 pb-1 overflow-x-auto bg-white rounded-t-lg p-2 shadow-sm">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-2.5 rounded-t-lg font-bold text-sm transition-all whitespace-nowrap ${
                                activeTab === tab.id 
                                ? 'bg-gradient-to-b from-blue-50 to-white text-blue-900 border-t-4 border-blue-600 shadow-md translate-y-px' 
                                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                            }`}
                        >
                            {tab.title}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="bg-white p-6 rounded-b-lg rounded-r-lg shadow-lg min-h-[500px] border border-slate-200">
                    {tabs[activeTab].component}
                </div>
            </div>
        </div>
    );
}

export default App;

