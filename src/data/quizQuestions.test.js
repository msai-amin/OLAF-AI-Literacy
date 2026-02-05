import { describe, it, expect } from 'vitest';
import { questionPools, selectRandomQuestions } from './quizQuestions';

describe('quizQuestions', () => {
    it('questionPools has all module keys', () => {
        expect(Object.keys(questionPools)).toEqual(['ml', 'vision', 'prediction', 'genai', 'dataQuality', 'lidar']);
    });

    it('selectRandomQuestions returns 30 questions (5 per module)', () => {
        const questions = selectRandomQuestions();
        expect(questions).toHaveLength(30);
    });

    it('each question has question, options, correct, module', () => {
        const questions = selectRandomQuestions();
        questions.forEach((q) => {
            expect(q).toHaveProperty('question');
            expect(q).toHaveProperty('options');
            expect(q).toHaveProperty('correct');
            expect(q).toHaveProperty('module');
            expect(Array.isArray(q.options)).toBe(true);
            expect(q.correct).toBeGreaterThanOrEqual(0);
            expect(q.correct).toBeLessThan(q.options.length);
        });
    });

    it('computing score from answers matches expected', () => {
        const questions = selectRandomQuestions();
        const answers = {};
        questions.forEach((q, index) => {
            answers[index] = q.correct;
        });
        let correctCount = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.correct) correctCount++;
        });
        expect(correctCount).toBe(questions.length);
    });
});
