import { useState } from 'react';
import { IconScan, IconBook } from './icons';
import { LabGuideModal } from './LabGuideModal';
import { GenAIGuideContent } from './guides/GenAIGuideContent';

export const GenAILab = () => {
    const [input, setInput] = useState("Block 42 survey complete. Found good stocking, approx 400 stems/ha. Mostly Douglas Fir. Some minor blowdown on the west edge. Access road needs grading.");
    const [output, setOutput] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [showTruth, setShowTruth] = useState(false);
    const [showGuide, setShowGuide] = useState(false);

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
        <div className="flex flex-col gap-6">
            {showGuide && (
                <LabGuideModal title="Lab 3: The Digital Clerk" onClose={() => setShowGuide(false)}>
                    <GenAIGuideContent />
                </LabGuideModal>
            )}

            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-600">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <IconScan className="text-blue-600"/> Module 3: Generative AI
                    </h3>
                    <button 
                        onClick={() => setShowGuide(true)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm font-bold py-1 px-3 rounded flex items-center gap-2 transition-colors shadow-sm"
                    >
                        <IconBook className="w-4 h-4" /> Open Lab Guide
                    </button>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                    <strong>Scenario:</strong> You've returned from the field with messy notes. Use Generative AI to transform them into a professional report, but beware—AI can "hallucinate" and invent information that sounds plausible but isn't in your source data.
                </p>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-xs text-blue-800">
                    <strong>💡 What is Generative AI?</strong> AI that creates new content (text, reports) based on patterns learned from training data. Unlike classification AI, it generates new text rather than just categorizing existing data.
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-sm">
                <h4 className="font-bold text-yellow-900 mb-2">⚠️ Key Takeaway: The Hallucination Risk</h4>
                <p className="text-yellow-800 mb-2">
                    Generative AI doesn't have a database of facts—it predicts what words should come next based on patterns. This means it can invent information that sounds plausible but isn't in your source data.
                </p>
                <p className="text-yellow-800 text-xs">
                    <strong>Best Practice:</strong> Always use GenAI as a "first draft" tool. Never submit AI-generated content without fact-checking every detail against your original source materials.
                </p>
            </div>
        </div>
    );
};

