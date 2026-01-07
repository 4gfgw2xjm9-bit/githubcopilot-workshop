import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="error-fallback glass-effect" style={{ padding: '2rem', textAlign: 'center', margin: '2rem' }}>
                    <h2>Oops, something went wrong.</h2>
                    <p>The harvest was a bit too heavy this time. Please try refreshing the page.</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="submit-btn"
                    >
                        Refresh Harvest
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
