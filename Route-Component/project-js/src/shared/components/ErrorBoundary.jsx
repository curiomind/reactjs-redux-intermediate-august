import React from 'react';
import logger from '../services/logger';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logger.push({ error, info });
  }

  render() {
    if (this.state.hasError) {
      return <p className="text-danger">Something went wrong.</p>;
    }

    return this.props.children;
  }
}
