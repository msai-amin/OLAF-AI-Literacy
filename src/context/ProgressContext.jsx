import { createContext, useContext, useCallback, useMemo, useState, useEffect } from 'react';

const STORAGE_KEY = 'olaf-forestry-ai-progress';

const MODULE_PATHS = ['/ml', '/vision', '/prediction', '/genai', '/data-quality', '/lidar'];

function loadProgress() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const data = JSON.parse(raw);
        return {
            completedModules: Array.isArray(data.completedModules) ? data.completedModules : [],
            quizAttempts: Array.isArray(data.quizAttempts) ? data.quizAttempts : [],
            lastRoute: typeof data.lastRoute === 'string' ? data.lastRoute : undefined,
        };
    } catch {
        return null;
    }
}

function saveProgress(progress) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (_) {}
}

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
    const [progress, setProgress] = useState(() => loadProgress());

    const persist = useCallback((next) => {
        setProgress((prev) => {
            const state = prev ?? {
                completedModules: [],
                quizAttempts: [],
                lastRoute: undefined,
            };
            const nextState = next(state);
            saveProgress(nextState);
            return nextState;
        });
    }, []);

    const recordModuleComplete = useCallback(
        (path) => {
            persist((state) => {
                if (state.completedModules.includes(path)) return state;
                return {
                    ...state,
                    completedModules: [...state.completedModules, path].filter((p) => MODULE_PATHS.includes(p)),
                };
            });
        },
        [persist]
    );

    const recordQuizAttempt = useCallback(
        (score) => {
            persist((state) => ({
                ...state,
                quizAttempts: [...(state.quizAttempts ?? []), { score, date: new Date().toISOString() }],
            }));
        },
        [persist]
    );

    const setLastRoute = useCallback(
        (path) => {
            if (!path || path === '/') return;
            persist((state) => ({ ...state, lastRoute: path }));
        },
        [persist]
    );

    const value = useMemo(
        () => ({
            completedModules: progress?.completedModules ?? [],
            quizAttempts: progress?.quizAttempts ?? [],
            lastRoute: progress?.lastRoute,
            recordModuleComplete,
            recordQuizAttempt,
            setLastRoute,
            completedCount: (progress?.completedModules ?? []).filter((p) => MODULE_PATHS.includes(p)).length,
            moduleCount: MODULE_PATHS.length,
            bestQuizScore:
                progress?.quizAttempts?.length > 0
                    ? Math.max(...progress.quizAttempts.map((a) => a.score))
                    : null,
        }),
        [
            progress?.completedModules,
            progress?.quizAttempts,
            progress?.lastRoute,
            recordModuleComplete,
            recordQuizAttempt,
            setLastRoute,
        ]
    );

    return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
    const ctx = useContext(ProgressContext);
    if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
    return ctx;
}

export { MODULE_PATHS };
