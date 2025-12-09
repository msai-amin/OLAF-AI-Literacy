import { IconScan } from '../icons';

export const GenAIGuideContent = () => (
    <div className="p-8 prose prose-green max-w-none text-gray-700">
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
            <strong className="block text-blue-800 mb-1">Objective</strong>
            Understand how Generative AI creates content and learn to identify "hallucinations" - when AI invents plausible-sounding but false information.
        </div>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Part 1: What is Generative AI?</h3>
        <p>
            <strong>Generative AI</strong> is a type of artificial intelligence that creates new content—text, images, code, or other media—based on patterns it learned from training data.
        </p>
        <p>
            Unlike traditional AI that classifies or predicts (e.g., "Is this a tree?" or "Will fire spread here?"), Generative AI <em>creates</em> new content. Think of it as a "digital clerk" that can write reports, summarize notes, or draft documents.
        </p>
        <p>
            Popular examples include ChatGPT, Claude, and Gemini. These systems are trained on vast amounts of text from the internet, books, and documents, learning patterns of language, structure, and style.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg text-sm font-mono mb-4 border border-gray-300 mt-4">
            <strong>How It Works (Simplified):</strong><br/>
            1. AI analyzes millions of documents to learn patterns<br/>
            2. When you give it a prompt, it predicts the most likely next words<br/>
            3. It generates text word-by-word, following learned patterns<br/>
            4. The result sounds human-like but is actually statistical prediction<br/>
            <br/>
            <strong>Critical Point:</strong> The AI doesn't "know" facts—it predicts what words typically follow other words based on training data.
        </div>

        <div className="mt-6 bg-blue-50 p-5 rounded-lg border border-blue-100">
            <h4 className="font-bold text-blue-900 mb-3 text-base flex items-center gap-2">
                <IconScan className="w-4 h-4"/> Real-World Forestry Applications
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-blue-800">
                <li>
                    <strong>Field Report Generation:</strong> Convert messy field notes into professional survey reports. A forester dictates observations into a phone, and GenAI structures it into a formal document with proper sections, formatting, and terminology.
                </li>
                <li>
                    <strong>Regulatory Compliance Documentation:</strong> Generate Environmental Impact Assessments (EIA), Forest Stewardship Plans, or permit applications by providing key data points. The AI structures the information according to regulatory templates.
                </li>
                <li>
                    <strong>Data Summarization:</strong> Process hundreds of pages of research papers, policy documents, or historical records. GenAI can extract key findings, create executive summaries, or identify relevant sections for specific questions.
                </li>
                <li>
                    <strong>Training Material Creation:</strong> Generate training manuals, safety protocols, or educational content for new employees. Input your company's procedures, and GenAI creates structured training materials.
                </li>
                <li>
                    <strong>Client Communication:</strong> Draft professional emails, proposals, or presentations. Provide bullet points of key information, and GenAI creates polished, client-ready communications.
                </li>
                <li>
                    <strong>Code Generation for GIS:</strong> Generate Python scripts for ArcGIS or QGIS workflows. Describe what you want to do (e.g., "calculate stand volume from LiDAR"), and GenAI writes the code.
                </li>
                <li>
                    <strong>Species Identification Assistance:</strong> Generate detailed descriptions of tree species characteristics, helping field crews identify species. Input location and basic observations, get comprehensive species profiles.
                </li>
                <li>
                    <strong>Harvest Planning Documentation:</strong> Create detailed harvest plans from basic inputs (block number, species, volume estimates). GenAI structures the information into professional planning documents.
                </li>
                <li>
                    <strong>Incident Report Writing:</strong> Transform brief incident notes into comprehensive safety reports. Input basic facts, and GenAI creates properly formatted incident documentation.
                </li>
                <li>
                    <strong>Research Literature Reviews:</strong> Summarize scientific papers on specific topics (e.g., "effects of climate change on Douglas Fir"). GenAI can synthesize findings from multiple sources.
                </li>
                <li>
                    <strong>Contract and Agreement Drafting:</strong> Generate template contracts for loggers, consultants, or suppliers. Provide key terms, and GenAI creates professional legal documents (always review with legal counsel).
                </li>
                <li>
                    <strong>Public Relations Content:</strong> Create press releases, social media posts, or public education materials about forestry practices. Input key messages, get polished public-facing content.
                </li>
                <li>
                    <strong>Budget and Financial Reports:</strong> Transform financial data into narrative budget justifications or financial reports. Input numbers and context, get professional explanations.
                </li>
                <li>
                    <strong>Standard Operating Procedures (SOPs):</strong> Generate detailed SOPs from brief descriptions. Input "how to conduct a regeneration survey," get a comprehensive step-by-step procedure document.
                </li>
                <li>
                    <strong>Meeting Minutes and Action Items:</strong> Convert rough meeting notes into formal minutes with action items, decisions, and next steps clearly identified and formatted.
                </li>
            </ul>
        </div>

        <hr className="my-6 border-gray-200"/>

        <h3 className="font-bold text-lg text-gray-900">Part 2: The Hallucination Problem</h3>
        <p>
            <strong>Hallucinations</strong> are when Generative AI invents information that sounds plausible but isn't in your source data. This is the #1 risk when using GenAI in professional forestry.
        </p>
        <p>
            Why do hallucinations happen? The AI is trained to generate text that <em>sounds right</em>, not text that <em>is right</em>. It doesn't have a database of facts—it predicts what words should come next based on patterns.
        </p>

        <div className="bg-red-50 p-4 rounded-lg border border-red-200 mt-4">
            <h4 className="font-bold text-red-900 mb-2">Common Hallucination Types in Forestry:</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-red-800">
                <li><strong>Invented Species:</strong> AI might mention "Western Red Cedar" when you only said "cedar," or invent a subspecies that doesn't exist.</li>
                <li><strong>Fabricated Regulations:</strong> AI might cite specific permit numbers, regulations, or compliance requirements that sound real but aren't accurate for your jurisdiction.</li>
                <li><strong>Made-Up Measurements:</strong> AI might add specific numbers (hectares, volumes, dates) that weren't in your input but "sound right" for the context.</li>
                <li><strong>Invented Locations:</strong> AI might reference specific creeks, roads, or landmarks that don't exist in your actual survey area.</li>
                <li><strong>Fabricated Wildlife Observations:</strong> AI might add endangered species sightings, nesting sites, or wildlife observations that weren't in your notes.</li>
            </ul>
        </div>

        <hr className="my-6 border-gray-200"/>

        <h3 className="font-bold text-lg text-gray-900">Part 3: The Simulation</h3>
        <p>In this lab, you'll see how GenAI transforms messy field notes into a professional report—and how it can invent information that wasn't in your original notes.</p>

        <div className="space-y-6 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-blue-800">Experiment A: The Transformation</h4>
                <p className="text-sm mb-2 italic">Click "Generate Professional Report" with the default field notes.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Notice how the AI structures your messy notes into a formal report format.</li>
                    <li>Does it capture all the key information from your input?</li>
                    <li>How does the tone and style compare to your original notes?</li>
                </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-blue-800">Experiment B: The Hallucination</h4>
                <p className="text-sm mb-2 italic">Click "Verify Data" to reveal the hallucination.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>What information did the AI invent?</li>
                    <li>Why does this hallucination sound plausible?</li>
                    <li>What would happen if you submitted this report without verification?</li>
                </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-bold text-blue-800">Experiment C: Custom Input</h4>
                <p className="text-sm mb-2 italic">Try your own field notes. Edit the input text and generate a new report.</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Does the AI always add information not in your notes?</li>
                    <li>What types of information does it tend to invent?</li>
                    <li>How can you structure your input to minimize hallucinations?</li>
                </ul>
            </div>
        </div>

        <hr className="my-6 border-gray-200"/>

        <h3 className="font-bold text-lg text-gray-900">Part 4: Best Practices for Forestry Professionals</h3>
        <div className="bg-green-50 p-5 rounded-lg border border-green-200 mt-4">
            <h4 className="font-bold text-green-900 mb-3">The Verification Workflow</h4>
            <ol className="list-decimal pl-5 space-y-2 text-sm text-green-800">
                <li><strong>Use GenAI as a First Draft Tool:</strong> Let it structure and format, but never use output as final without review.</li>
                <li><strong>Fact-Check Everything:</strong> Verify all numbers, dates, locations, species names, and regulatory references against your source data.</li>
                <li><strong>Compare Input vs. Output:</strong> Create a checklist of all facts in your input. Verify each one appears correctly in the output.</li>
                <li><strong>Be Explicit About What NOT to Include:</strong> Tell the AI "only use information from the input, do not add any additional details."</li>
                <li><strong>Use Structured Prompts:</strong> Provide clear instructions: "Create a report with these exact sections: Overview, Forest Health, Operational Notes. Use only the information provided."</li>
                <li><strong>Review with Domain Experts:</strong> Have a senior forester review AI-generated reports before submission.</li>
                <li><strong>Keep Source Documents:</strong> Always maintain original field notes, data files, and source materials for verification.</li>
            </ol>
        </div>

        <hr className="my-6 border-gray-200"/>

        <h3 className="font-bold text-lg text-gray-900">Part 5: Critical Thinking</h3>
        <ul className="list-decimal pl-5 space-y-4">
            <li>
                <strong>Question 1:</strong> A GenAI tool generates a report that looks perfect and professional. It includes all the information from your field notes, plus some additional context that "sounds right." Should you use it as-is? Why or why not?
            </li>
            <li>
                <strong>Question 2:</strong> You use GenAI to draft a permit application. The AI includes specific regulation citations and compliance requirements. How would you verify these are accurate for your jurisdiction?
            </li>
            <li>
                <strong>Question 3:</strong> A colleague uses GenAI to summarize 50 research papers on climate change impacts. The summary sounds comprehensive and well-written. What risks should you consider before using this summary for decision-making?
            </li>
            <li>
                <strong>Question 4:</strong> You're considering using GenAI to generate client proposals. What disclaimers or review processes would you implement to ensure accuracy and protect your professional reputation?
            </li>
        </ul>

        <div className="mt-8">
            <details className="group border border-blue-200 rounded-lg bg-blue-50 open:bg-blue-50 transition-colors">
                <summary className="cursor-pointer p-4 font-bold text-blue-800 flex items-center gap-2 select-none">
                    <span>Instructor Answer Key</span>
                    <span className="text-xs font-normal text-blue-600">(Click to Reveal)</span>
                </summary>
                <div className="p-4 pt-0 text-sm text-blue-900 space-y-2">
                    <p><strong>Experiment A:</strong> GenAI excels at structuring and formatting. It transforms informal notes into professional documents, but this transformation can introduce errors or additions.</p>
                    <p><strong>Experiment B:</strong> The hallucination (Marbled Murrelet sighting) sounds plausible because it's contextually appropriate (endangered species, old-growth habitat), but it wasn't in the source data. This demonstrates why verification is critical.</p>
                    <p><strong>Experiment C:</strong> GenAI often adds information to "complete" the narrative, even when not requested. This is a feature of how it works—it predicts what "should" be there.</p>
                    <p><strong>Q1:</strong> <strong>Never use as-is.</strong> The additional context that "sounds right" is likely hallucinated. Always verify every fact against source documents. Professional liability requires accuracy, not just professional appearance.</p>
                    <p><strong>Q2:</strong> Cross-reference with official government websites, consult with regulatory experts, or review current permit applications. Never trust AI-generated citations without verification. Regulations change frequently, and AI training data may be outdated.</p>
                    <p><strong>Q3:</strong> The summary may miss critical nuances, misinterpret findings, or emphasize less important papers. Always review original sources for critical decisions. AI summaries are starting points, not authoritative sources.</p>
                    <p><strong>Q4:</strong> Implement mandatory fact-checking, require senior review, include disclaimers about AI assistance, maintain version control showing human edits, and establish clear accountability for final content. Consider client disclosure policies.</p>
                </div>
            </details>
        </div>
    </div>
);

