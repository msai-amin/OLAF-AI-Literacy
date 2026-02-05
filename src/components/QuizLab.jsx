import { useState, useEffect } from 'react';
import { IconBook } from './icons';
import { useProgress } from '../context/ProgressContext';
import { selectRandomQuestions } from '../data/quizQuestions';

export const QuizLab = () => {
    const { recordQuizAttempt, bestQuizScore } = useProgress();
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
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
        const percentage = questions.length > 0 ? Math.round((correctAnswers / questions.length) * 100) : 0;
        recordQuizAttempt(percentage);
        setScore(correctAnswers);
        setShowResults(true);
    };

    const handleRestart = () => {
        setQuestions(selectRandomQuestions());
        setCurrentQuestion(0);
        setAnswers({});
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
                        {bestQuizScore != null && (
                            <div className="text-sm text-blue-700 mt-2">
                                Your best score: <strong>{bestQuizScore}%</strong>
                            </div>
                        )}
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

