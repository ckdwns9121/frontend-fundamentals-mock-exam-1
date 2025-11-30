import { Component, ReactNode, ErrorInfo } from 'react';
import { ListRow } from 'tosslib';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary 컴포넌트
 * @description React 컴포넌트 트리에서 발생한 에러를 캐치하여 UI에 표시합니다.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ListRow
          contents={
            <ListRow.Texts
              type="1RowTypeA"
              top={this.state.error?.message || '오류가 발생했습니다.'}
            />
          }
        />
      );
    }

    return this.props.children;
  }
}

