import { useRef, useCallback, lazy, Suspense } from 'react';
import { Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IconTree } from './components/icons';
import { IntroLab } from './components/IntroLab';
import { ModuleLayout } from './components/ModuleLayout';
import { ErrorBoundary } from './components/ErrorBoundary';

const VisionLab = lazy(() => import('./components/VisionLab').then((m) => ({ default: m.VisionLab })));
const PredictiveLab = lazy(() => import('./components/PredictiveLab').then((m) => ({ default: m.PredictiveLab })));
const GenAILab = lazy(() => import('./components/GenAILab').then((m) => ({ default: m.GenAILab })));
const DataLab = lazy(() => import('./components/DataLab').then((m) => ({ default: m.DataLab })));
const LidarLab = lazy(() => import('./components/LidarLab').then((m) => ({ default: m.LidarLab })));
const MLLab = lazy(() => import('./components/MLLab').then((m) => ({ default: m.MLLab })));
const QuizLab = lazy(() => import('./components/QuizLab').then((m) => ({ default: m.QuizLab })));
const GlossaryLab = lazy(() => import('./components/GlossaryLab').then((m) => ({ default: m.GlossaryLab })));

function LabSkeleton() {
    return (
        <div className="flex items-center justify-center min-h-[400px]" aria-label="Loading module">
            <div className="animate-pulse text-gray-500 font-medium">Loading...</div>
        </div>
    );
}

const ROUTES = [
    { path: '/', title: 'Home' },
    { path: '/ml', title: '1. ML' },
    { path: '/vision', title: '2. Vision' },
    { path: '/prediction', title: '3. Prediction' },
    { path: '/genai', title: '4. GenAI' },
    { path: '/data-quality', title: '5. Data Quality' },
    { path: '/lidar', title: '6. LiDAR' },
    { path: '/quiz', title: 'Quiz' },
    { path: '/glossary', title: 'Glossary' },
];

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const tablistRef = useRef(null);

    const handleTabListKeyDown = useCallback(
        (e) => {
            if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
            const tabs = tablistRef.current?.querySelectorAll('[role="tab"]');
            if (!tabs?.length) return;
            const currentIndex = ROUTES.findIndex((r) => r.path === location.pathname);
            if (currentIndex < 0) return;
            let nextIndex;
            if (e.key === 'ArrowRight') {
                nextIndex = Math.min(currentIndex + 1, ROUTES.length - 1);
            } else {
                nextIndex = Math.max(currentIndex - 1, 0);
            }
            if (nextIndex !== currentIndex) {
                e.preventDefault();
                navigate(ROUTES[nextIndex].path);
                tabs[nextIndex]?.focus();
            }
        },
        [location.pathname, navigate]
    );

    return (
        <div className="min-h-screen pb-10">
            <a href="#main-content" className="skip-link">
                Skip to main content
            </a>
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
                <div
                    ref={tablistRef}
                    className="flex flex-wrap gap-2 mb-6 border-b-2 border-slate-200 pb-1 overflow-x-auto bg-white rounded-t-lg p-2 shadow-sm"
                    role="tablist"
                    aria-label="Course modules"
                    onKeyDown={handleTabListKeyDown}
                >
                    {ROUTES.map(({ path, title }) => (
                        <NavLink
                            key={path}
                            to={path}
                            end={path === '/'}
                            role="tab"
                            aria-selected={location.pathname === path}
                            aria-current={location.pathname === path ? 'page' : undefined}
                            className={({ isActive }) =>
                                `px-5 py-2.5 rounded-t-lg font-bold text-sm transition-all whitespace-nowrap ${
                                    isActive
                                        ? 'bg-gradient-to-b from-blue-50 to-white text-blue-900 border-t-4 border-blue-600 shadow-md translate-y-px'
                                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                                }`
                            }
                        >
                            {title}
                        </NavLink>
                    ))}
                </div>

                {/* Content Area */}
                <main
                    id="main-content"
                    role="tabpanel"
                    aria-label="Module content"
                    className="bg-white p-6 rounded-b-lg rounded-r-lg shadow-lg min-h-[500px] border border-slate-200"
                >
                    <ErrorBoundary>
                        <Suspense fallback={<LabSkeleton />}>
                            <Routes>
                                <Route path="/" element={<IntroLab />} />
                                <Route path="/ml" element={<ModuleLayout path="/ml"><MLLab /></ModuleLayout>} />
                                <Route path="/vision" element={<ModuleLayout path="/vision"><VisionLab /></ModuleLayout>} />
                                <Route path="/prediction" element={<ModuleLayout path="/prediction"><PredictiveLab /></ModuleLayout>} />
                                <Route path="/genai" element={<ModuleLayout path="/genai"><GenAILab /></ModuleLayout>} />
                                <Route path="/data-quality" element={<ModuleLayout path="/data-quality"><DataLab /></ModuleLayout>} />
                                <Route path="/lidar" element={<ModuleLayout path="/lidar"><LidarLab /></ModuleLayout>} />
                                <Route path="/quiz" element={<QuizLab />} />
                                <Route path="/glossary" element={<GlossaryLab />} />
                            </Routes>
                        </Suspense>
                    </ErrorBoundary>
                </main>
            </div>
        </div>
    );
}

export default App;
