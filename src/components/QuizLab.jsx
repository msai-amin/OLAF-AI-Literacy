import { useState, useEffect } from 'react';
import { IconBook, IconDatabase } from './icons';

// Question pools for each module (each module has more than 5 questions for randomization)
const questionPools = {
    ml: [
        {
            question: "What is the main difference between Supervised Learning (SL) and Unsupervised Learning (UL)?",
            options: [
                "SL uses labeled data, UL uses unlabeled data",
                "SL is faster, UL is slower",
                "SL requires more data, UL requires less data",
                "SL is for classification, UL is for regression"
            ],
            correct: 0,
            module: "ML"
        },
        {
            question: "Which ML algorithm combines multiple decision trees to make predictions?",
            options: [
                "Linear Regression",
                "Random Forest",
                "K-Means Clustering",
                "Neural Network"
            ],
            correct: 1,
            module: "ML"
        },
        {
            question: "What does 'overfitting' mean in machine learning?",
            options: [
                "The model performs well on training data but poorly on new data",
                "The model needs more training data",
                "The model is too simple to learn patterns",
                "The model has too many features"
            ],
            correct: 0,
            module: "ML"
        },
        {
            question: "In Reinforcement Learning (RL), how does the model learn?",
            options: [
                "From labeled examples",
                "Through trial and error with rewards and penalties",
                "By finding patterns in unlabeled data",
                "By memorizing training data"
            ],
            correct: 1,
            module: "ML"
        },
        {
            question: "What is the primary purpose of a training set vs. a test set?",
            options: [
                "Training set teaches the model, test set evaluates generalization",
                "Training set is larger, test set is smaller",
                "Training set is for validation, test set is for training",
                "They serve the same purpose"
            ],
            correct: 0,
            module: "ML"
        },
        {
            question: "Which algorithm would you use to predict tree volume from DBH and height?",
            options: [
                "Classification algorithm",
                "Regression algorithm",
                "Clustering algorithm",
                "Decision tree"
            ],
            correct: 1,
            module: "ML"
        },
        {
            question: "What does K-Means Clustering discover?",
            options: [
                "Hidden patterns in labeled data",
                "Natural groupings in data without labels",
                "The best regression line",
                "Decision rules for classification"
            ],
            correct: 1,
            module: "ML"
        }
    ],
    vision: [
        {
            question: "What does 'Confidence Threshold' represent in computer vision?",
            options: [
                "The percentage of correct predictions",
                "The cutoff point you set for accepting AI predictions",
                "The number of training images needed",
                "The processing speed of the AI model"
            ],
            correct: 1,
            module: "Vision"
        },
        {
            question: "What is a 'False Positive' in computer vision?",
            options: [
                "Missing an actual log",
                "Correctly identifying a log",
                "Incorrectly identifying a rock as a log",
                "The model being too cautious"
            ],
            correct: 2,
            module: "Vision"
        },
        {
            question: "Precision measures what?",
            options: [
                "How many actual logs were found",
                "What percentage of detected objects were actually logs",
                "How fast the model processes images",
                "The total number of objects detected"
            ],
            correct: 1,
            module: "Vision"
        },
        {
            question: "Recall measures what?",
            options: [
                "The accuracy of positive predictions",
                "What percentage of actual logs were successfully identified",
                "The total number of false positives",
                "The processing time per image"
            ],
            correct: 1,
            module: "Vision"
        },
        {
            question: "Why might an AI model struggle with logs on a cloudy day versus a sunny day?",
            options: [
                "The model doesn't work in bad weather",
                "Lighting changes pixel values, affecting model performance",
                "Clouds block the camera view",
                "The model needs retraining for each weather condition"
            ],
            correct: 1,
            module: "Vision"
        },
        {
            question: "In computer vision, what does the AI actually 'see'?",
            options: [
                "Images like humans do",
                "A grid of numbers representing pixel RGB values",
                "Shapes and colors directly",
                "Text descriptions of objects"
            ],
            correct: 1,
            module: "Vision"
        },
        {
            question: "What is the trade-off between precision and recall?",
            options: [
                "Increasing one always increases the other",
                "Increasing threshold usually increases precision but decreases recall",
                "They are independent metrics",
                "Precision is always more important than recall"
            ],
            correct: 1,
            module: "Vision"
        }
    ],
    prediction: [
        {
            question: "What is Predictive Analytics?",
            options: [
                "Analyzing past data only",
                "Using historical data to predict future events",
                "Creating visualizations of current data",
                "Classifying data into categories"
            ],
            correct: 1,
            module: "Prediction"
        },
        {
            question: "What is Cellular Automata used for in fire prediction?",
            options: [
                "To create fire spread simulations using simple rules",
                "To measure fire temperature",
                "To detect fires from satellite imagery",
                "To calculate fire suppression costs"
            ],
            correct: 0,
            module: "Prediction"
        },
        {
            question: "Which environmental variable typically has the strongest influence on fire spread?",
            options: [
                "Fuel moisture",
                "Wind speed and direction",
                "Air temperature",
                "Humidity"
            ],
            correct: 1,
            module: "Prediction"
        },
        {
            question: "In fire prediction models, what does 'fuel load' refer to?",
            options: [
                "The amount of combustible material in an area",
                "The speed at which fire spreads",
                "The direction of fire movement",
                "The intensity of the fire"
            ],
            correct: 0,
            module: "Prediction"
        },
        {
            question: "Why is terrain important in fire spread prediction?",
            options: [
                "Fire doesn't spread on slopes",
                "Slope and aspect affect fire behavior and spread rate",
                "Terrain has no effect on fire",
                "Only flat terrain matters"
            ],
            correct: 1,
            module: "Prediction"
        },
        {
            question: "What makes predictive models valuable for foresters?",
            options: [
                "They can predict exact fire locations",
                "They identify patterns in historical data that humans can't see",
                "They eliminate the need for field work",
                "They work perfectly in all conditions"
            ],
            correct: 1,
            module: "Prediction"
        }
    ],
    genai: [
        {
            question: "What is a 'hallucination' in Generative AI?",
            options: [
                "The AI making mistakes",
                "The AI inventing information that sounds plausible but isn't in source data",
                "The AI being slow to respond",
                "The AI refusing to generate content"
            ],
            correct: 1,
            module: "GenAI"
        },
        {
            question: "What should you always do with GenAI-generated reports?",
            options: [
                "Use them as-is without checking",
                "Verify all facts against source documents",
                "Assume they are always accurate",
                "Only check the formatting"
            ],
            correct: 1,
            module: "GenAI"
        },
        {
            question: "Why might GenAI add information that wasn't in your source notes?",
            options: [
                "It makes random mistakes",
                "It tries to 'complete' the narrative by predicting what should be there",
                "It doesn't understand the input",
                "It's designed to expand content"
            ],
            correct: 1,
            module: "GenAI"
        },
        {
            question: "What is a key strength of Generative AI in forestry applications?",
            options: [
                "It always provides accurate facts",
                "It can transform informal field notes into professional reports",
                "It eliminates the need for human review",
                "It generates original research data"
            ],
            correct: 1,
            module: "GenAI"
        },
        {
            question: "If GenAI generates a report mentioning an endangered species sighting that wasn't in your notes, what should you do?",
            options: [
                "Trust it and include it in official reports",
                "Treat it as a hallucination and verify before using",
                "Assume it's correct because it sounds plausible",
                "Use it but note it came from AI"
            ],
            correct: 1,
            module: "GenAI"
        },
        {
            question: "What is the primary risk of using GenAI for regulatory compliance information?",
            options: [
                "The AI is too slow",
                "Regulations change frequently and AI training data may be outdated",
                "The AI charges too much",
                "The AI format is not professional"
            ],
            correct: 1,
            module: "GenAI"
        }
    ],
    dataQuality: [
        {
            question: "What does GIGO stand for?",
            options: [
                "Good Input, Good Output",
                "Garbage In, Garbage Out",
                "Great Information, Great Outcomes",
                "General Input, General Output"
            ],
            correct: 1,
            module: "Data Quality"
        },
        {
            question: "What happens if you train an AI model with telephone poles labeled as 'trees'?",
            options: [
                "The model will work perfectly",
                "The model will classify telephone poles as trees in the field",
                "The model will ignore the poles",
                "The model will need more training data"
            ],
            correct: 1,
            module: "Data Quality"
        },
        {
            question: "Why is data quality critical for AI models?",
            options: [
                "Bad data makes training slower",
                "AI models learn patterns from training data, so bad data creates bad models",
                "Bad data is just noisy but doesn't affect results",
                "Data quality only matters for large datasets"
            ],
            correct: 1,
            module: "Data Quality"
        },
        {
            question: "If your training data includes 20% mislabeled samples, what is the likely outcome?",
            options: [
                "The model will automatically correct the errors",
                "The model will learn the incorrect patterns and make similar mistakes",
                "The model will ignore the mislabeled samples",
                "The model will ask for better data"
            ],
            correct: 1,
            module: "Data Quality"
        },
        {
            question: "What is the best practice for training data in forestry AI applications?",
            options: [
                "Include all data, even if unsure about labels",
                "Only include high-quality, correctly labeled samples",
                "Use as much data as possible regardless of quality",
                "Let the AI automatically label everything"
            ],
            correct: 1,
            module: "Data Quality"
        },
        {
            question: "What should you do if you discover errors in your training data after model deployment?",
            options: [
                "Ignore them if the model seems to work",
                "Retrain the model with corrected data immediately",
                "Only fix errors for future training",
                "Assume the model will learn around the errors"
            ],
            correct: 1,
            module: "Data Quality"
        }
    ],
    lidar: [
        {
            question: "What is a LiDAR point cloud?",
            options: [
                "A 3D model of a cloud",
                "Millions of individual points in 3D space with X, Y, Z coordinates",
                "A single image from a drone",
                "A map showing forest boundaries"
            ],
            correct: 1,
            module: "LiDAR"
        },
        {
            question: "What is semantic segmentation in LiDAR processing?",
            options: [
                "Measuring point cloud density",
                "Classifying each point into categories like Ground, Vegetation, Buildings",
                "Converting points to images",
                "Counting the number of points"
            ],
            correct: 1,
            module: "LiDAR"
        },
        {
            question: "Why is accurate ground classification critical for forestry?",
            options: [
                "It's only needed for visualization",
                "It's the foundation for all downstream analysis (height, volume, terrain)",
                "Ground points are easier to process",
                "It doesn't affect other measurements"
            ],
            correct: 1,
            module: "LiDAR"
        },
        {
            question: "What does DTM stand for?",
            options: [
                "Digital Tree Model",
                "Digital Terrain Model",
                "Data Tree Mapping",
                "Detailed Terrain Measurement"
            ],
            correct: 1,
            module: "LiDAR"
        },
        {
            question: "In dense forests, why might some LiDAR pulses never reach the ground?",
            options: [
                "The sensor isn't powerful enough",
                "Pulses hit leaves and branches first, creating data gaps",
                "Ground absorbs all pulses",
                "The technology doesn't work in forests"
            ],
            correct: 1,
            module: "LiDAR"
        },
        {
            question: "How do foresters use LiDAR to measure tree height?",
            options: [
                "By counting points in each tree",
                "By calculating vertical distance from ground points to highest vegetation points",
                "By measuring tree diameter",
                "By analyzing tree color"
            ],
            correct: 1,
            module: "LiDAR"
        },
        {
            question: "What should you do if 15% of points in a LiDAR dataset are classified as 'unclassified'?",
            options: [
                "Ignore them and use the remaining 85%",
                "Investigate these areas as they may indicate data quality issues",
                "Assume they are all ground points",
                "Delete them from the dataset"
            ],
            correct: 1,
            module: "LiDAR"
        }
    ]
};

// Function to randomly select 5 questions from each module pool
function selectRandomQuestions() {
    const selectedQuestions = [];
    
    Object.keys(questionPools).forEach(moduleKey => {
        const pool = questionPools[moduleKey];
        // Shuffle and take first 5
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        selectedQuestions.push(...shuffled.slice(0, 5));
    });
    
    // Shuffle all selected questions to randomize order
    return selectedQuestions.sort(() => Math.random() - 0.5);
}

export const QuizLab = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isCompleted, setIsCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    // Initialize questions on component mount
    useEffect(() => {
        setQuestions(selectRandomQuestions());
    }, []);

    const handleAnswer = (questionIndex, selectedOption) => {
        setAnswers({
            ...answers,
            [questionIndex]: selectedOption
        });
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = () => {
        let correctAnswers = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.correct) {
                correctAnswers++;
            }
        });
        
        setScore(correctAnswers);
        setIsCompleted(true);
        setShowResults(true);
    };

    const handleRestart = () => {
        setQuestions(selectRandomQuestions());
        setCurrentQuestion(0);
        setAnswers({});
        setIsCompleted(false);
        setScore(0);
        setShowResults(false);
    };

    if (questions.length === 0) {
        return (
            <div className="text-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading quiz questions...</p>
            </div>
        );
    }

    const currentQ = questions[currentQuestion];
    const answeredCount = Object.keys(answers).length;
    const isAllAnswered = answeredCount === questions.length;

    if (showResults) {
        const percentage = Math.round((score / questions.length) * 100);
        const getGradeMessage = () => {
            if (percentage >= 90) return { text: "Excellent!", color: "green", emoji: "🎉" };
            if (percentage >= 80) return { text: "Great Job!", color: "blue", emoji: "👏" };
            if (percentage >= 70) return { text: "Good Work!", color: "blue", emoji: "👍" };
            if (percentage >= 60) return { text: "Passing", color: "yellow", emoji: "📚" };
            return { text: "Needs Improvement", color: "red", emoji: "📖" };
        };
        const grade = getGradeMessage();

        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-blue-200">
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4">{grade.emoji}</div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Results</h2>
                        <div className={`text-5xl font-bold text-${grade.color}-600 mb-2`}>
                            {percentage}%
                        </div>
                        <div className={`text-xl text-${grade.color}-700 font-semibold mb-4`}>
                            {grade.text}
                        </div>
                        <div className="text-gray-600">
                            You got <strong>{score} out of {questions.length}</strong> questions correct
                        </div>
                    </div>

                    <div className="space-y-4 mb-8">
                        {questions.map((q, index) => {
                            const userAnswer = answers[index];
                            const isCorrect = userAnswer === q.correct;
                            const wasAnswered = userAnswer !== undefined;

                            return (
                                <div
                                    key={index}
                                    className={`p-4 rounded-lg border-2 ${
                                        isCorrect
                                            ? 'bg-green-50 border-green-300'
                                            : 'bg-red-50 border-red-300'
                                    }`}
                                >
                                    <div className="flex items-start gap-3 mb-2">
                                        <span className={`text-2xl ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                            {isCorrect ? '✓' : '✗'}
                                        </span>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs font-bold bg-gray-200 px-2 py-1 rounded">
                                                    {q.module}
                                                </span>
                                                <span className="text-sm text-gray-600">
                                                    Question {index + 1} of {questions.length}
                                                </span>
                                            </div>
                                            <p className="font-bold text-gray-800 mb-3">{q.question}</p>
                                            <div className="space-y-2">
                                                {q.options.map((option, optIndex) => {
                                                    const isUserAnswer = userAnswer === optIndex;
                                                    const isCorrectAnswer = optIndex === q.correct;

                                                    return (
                                                        <div
                                                            key={optIndex}
                                                            className={`p-2 rounded border ${
                                                                isCorrectAnswer
                                                                    ? 'bg-green-100 border-green-400 font-semibold'
                                                                    : isUserAnswer && !isCorrect
                                                                    ? 'bg-red-100 border-red-400'
                                                                    : 'bg-gray-50 border-gray-200'
                                                            }`}
                                                        >
                                                            {isCorrectAnswer && '✓ '}
                                                            {isUserAnswer && !isCorrect && '✗ '}
                                                            {option}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center">
                        <button
                            onClick={handleRestart}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg"
                        >
                            Take Quiz Again (New Random Questions)
                        </button>
                        <p className="text-xs text-gray-500 mt-3">
                            Questions are randomized each time you take the quiz
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-600 mb-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <IconBook className="text-purple-600"/> Module 7: Knowledge Assessment
                    </h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                    <strong>30 Questions Total:</strong> 5 questions from each module (ML, Vision, Prediction, GenAI, Data Quality, LiDAR)
                </p>
                <p className="text-gray-500 text-xs">
                    Questions are randomly selected from a larger pool, so each quiz is different. You can take it multiple times to practice!
                </p>
            </div>

            {/* Progress Bar */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-gray-700">
                        Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <span className="text-sm text-gray-600">
                        {answeredCount} / {questions.length} answered
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold bg-purple-100 text-purple-800 px-3 py-1 rounded">
                        {currentQ.module}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-6">
                    {currentQ.question}
                </h3>

                <div className="space-y-3">
                    {currentQ.options.map((option, optIndex) => {
                        const isSelected = answers[currentQuestion] === optIndex;
                        return (
                            <button
                                key={optIndex}
                                onClick={() => handleAnswer(currentQuestion, optIndex)}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                    isSelected
                                        ? 'bg-blue-50 border-blue-500 font-semibold'
                                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                            isSelected
                                                ? 'border-blue-500 bg-blue-500'
                                                : 'border-gray-400'
                                        }`}
                                    >
                                        {isSelected && (
                                            <div className="w-3 h-3 rounded-full bg-white"></div>
                                        )}
                                    </div>
                                    <span className="flex-1">{option}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
                <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ← Previous
                </button>

                <div className="text-sm text-gray-600">
                    {answers[currentQuestion] !== undefined ? '✓ Answered' : 'Not answered'}
                </div>

                {currentQuestion < questions.length - 1 ? (
                    <button
                        onClick={handleNext}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
                    >
                        Next →
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={!isAllAnswered}
                        className="px-8 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                        {isAllAnswered ? 'Submit Quiz ✓' : `Answer All Questions (${questions.length - answeredCount} remaining)`}
                    </button>
                )}
            </div>
        </div>
    );
};

