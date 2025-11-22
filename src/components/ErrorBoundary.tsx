import { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { WithTranslation, withTranslation } from 'react-i18next';

interface Props extends WithTranslation {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    const { t } = this.props;

    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
          <div className="max-w-2xl w-full text-center">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 shadow-xl">
              <div className="text-red-500 text-6xl mb-6">⚠️</div>
              <h1 className="text-3xl font-bold text-white mb-4">
                {t('components-error-boundary:title')}
              </h1>
              <p className="text-slate-300 mb-6">
                {t('components-error-boundary:description')}
              </p>
              {this.state.error && (
                <div className="bg-slate-900 border border-slate-700 rounded p-4 mb-6 text-left">
                  <p className="text-sm font-mono text-red-400">
                    {this.state.error.message}
                  </p>
                </div>
              )}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {t('components-error-boundary:buttons.reload_page')}
                </button>
                <Link
                  to="/"
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors inline-block"
                >
                  {t('components-error-boundary:buttons.go_home')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundary = withTranslation()(ErrorBoundaryComponent);
