import { useEffect } from 'react';
import { useProgress, MODULE_PATHS } from '../context/ProgressContext';

export function ModuleLayout({ path, children }) {
    const { setLastRoute, recordModuleComplete, completedModules } = useProgress();
    const isModule = MODULE_PATHS.includes(path);
    const isCompleted = completedModules.includes(path);

    useEffect(() => {
        setLastRoute(path);
    }, [path, setLastRoute]);

    return (
        <div className="flex flex-col gap-4">
            {isModule && (
                <div className="flex items-center justify-end gap-2">
                    {isCompleted ? (
                        <span className="text-sm text-green-700 font-semibold">Completed</span>
                    ) : (
                        <button
                            type="button"
                            onClick={() => recordModuleComplete(path)}
                            className="text-sm bg-green-100 hover:bg-green-200 text-green-800 font-bold py-1.5 px-3 rounded transition-colors"
                        >
                            Mark complete
                        </button>
                    )}
                </div>
            )}
            {children}
        </div>
    );
}
