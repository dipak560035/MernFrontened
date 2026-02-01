import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught", error, info);
  }
  reset = () => {
    this.setState({ hasError: false });
  };
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold">Something went wrong.</h2>
          <p className="mt-2 text-sm text-neutral-600">Please try again or reload the page.</p>
          <button className="mt-4 rounded-md border px-3 py-1 text-sm" onClick={this.reset}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
