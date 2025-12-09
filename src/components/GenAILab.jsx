import { useState } from 'react';

export const GenAILab = () => {
    const [input, setInput] = useState("Block 42 survey complete. Found good stocking, approx 400 stems/ha. Mostly Douglas Fir. Some minor blowdown on the west edge. Access road needs grading.");
    const [output, setOutput] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [showTruth, setShowTruth] = useState(false);

    const generateReport = () => {
        setIsGenerating(true);
        setOutput("");
        setShowTruth(false);
        
        setTimeout(() => {
            const cleanText = `SURVEY REPORT: BLOCK 42\n\nDATE: ${new Date().toLocaleDateString()}\n\nOVERVIEW:\nThe stocking survey for Block 42 indicates a healthy regeneration status with approximately 400 stems per hectare (sph), predominantly composed of Douglas Fir. \n\nFOREST HEALTH:\nNo significant pest or disease issues were noted. `;
            
            // The Hallucination
            const hallucination = `However, a nesting pair of Marbled Murrelets (endangered) was observed in the old-growth patch near the creek. `;
            
            const endText = `\n\nOPERATIONAL NOTES:\nMinor blowdown was observed along the western boundary. The primary access road requires grading to ensure safe vehicle passage for future operations.`;

            setOutput({ prefix: cleanText, lie: hallucination, suffix: endText });
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="grid md:grid-cols-2 gap-6 h-full">
            <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-gray-700">1. Messy Field Notes (Input)</label>
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full h-40 p-3 border rounded-lg font-mono text-sm shadow-inner focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button 
                    onClick={generateReport}
                    disabled={isGenerating}
                    className="bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 flex justify-center items-center gap-2"
                >
                    {isGenerating ? <span><span className="animate-spin">⟳</span> AI is Thinking...</span> : "Generate Professional Report"}
                </button>
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-bold text-sm text-gray-700 flex justify-between">
                    <span>2. AI Output</span>
                    {output && (
                        <button onClick={() => setShowTruth(!showTruth)} className="text-xs font-bold text-blue-600 hover:underline">
                            {showTruth ? "Hide Validation" : "Verify Data"}
                        </button>
                    )}
                </label>
                <div className="w-full h-full min-h-[200px] p-4 bg-white border rounded-lg shadow-sm whitespace-pre-wrap text-sm leading-relaxed font-serif text-gray-800">
                    {!output && <span className="text-gray-400 italic font-sans">Output will appear here...</span>}
                    {output && (
                        <>
                            {output.prefix}
                            <span className={`transition-colors duration-500 ${showTruth ? 'bg-red-100 text-red-800 font-bold px-1 rounded border border-red-200' : ''}`}>
                                {output.lie}
                            </span>
                            {output.suffix}
                        </>
                    )}
                </div>
                {showTruth && (
                    <div className="bg-yellow-50 p-3 rounded text-xs text-yellow-800 border border-yellow-200 flex gap-2 items-start">
                        <span className="text-lg">⚠️</span>
                        <div>
                            <strong>Hallucination Detected:</strong> The AI invented the "Marbled Murrelet" sighting. This was not in your original notes! 
                            <br/><em>Lesson: Always verify AI outputs against your ground truth data.</em>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

