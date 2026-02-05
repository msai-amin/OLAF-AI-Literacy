import { Component } from 'react';
import { Link } from 'react-router-dom';

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('ErrorBoundary caught an error:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[400px] flex items-center justify-center p-8">
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 max-w-md text-center">
                        <h2 className="text-xl font-bold text-red-900 mb-2">Something went wrong</h2>
                        <p className="text-red-800 mb-6">
                            This module encountered an error. You can go back to the home page or try reloading.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                to="/"
                                className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Go home
                            </Link>
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Reload page
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}
