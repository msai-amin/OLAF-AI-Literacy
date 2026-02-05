import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ProgressProvider, useProgress } from './ProgressContext';

const STORAGE_KEY = 'olaf-forestry-ai-progress';

function TestConsumer() {
    const progress = useProgress();
    return (
        <div>
            <span data-testid="count">{progress.completedCount}</span>
            <span data-testid="best">{String(progress.bestQuizScore)}</span>
            <button type="button" onClick={() => progress.recordModuleComplete('/ml')}>
                Complete ML
            </button>
            <button type="button" onClick={() => progress.recordQuizAttempt(85)}>
                Record Quiz
            </button>
        </div>
    );
}

describe('ProgressContext', () => {
    beforeEach(() => {
        localStorage.removeItem(STORAGE_KEY);
    });
    afterEach(() => {
        localStorage.removeItem(STORAGE_KEY);
    });

    it('provides completedCount and updates on recordModuleComplete', () => {
        render(
            <ProgressProvider>
                <TestConsumer />
            </ProgressProvider>
        );
        expect(screen.getByTestId('count').textContent).toBe('0');
        act(() => {
            screen.getByText('Complete ML').click();
        });
        expect(screen.getByTestId('count').textContent).toBe('1');
        expect(JSON.parse(localStorage.getItem(STORAGE_KEY)).completedModules).toContain('/ml');
    });

    it('persists quiz attempt and bestQuizScore', () => {
        render(
            <ProgressProvider>
                <TestConsumer />
            </ProgressProvider>
        );
        expect(screen.getByTestId('best').textContent).toBe('null');
        act(() => {
            screen.getByText('Record Quiz').click();
        });
        expect(screen.getByTestId('best').textContent).toBe('85');
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
        expect(stored.quizAttempts).toHaveLength(1);
        expect(stored.quizAttempts[0].score).toBe(85);
    });
});
