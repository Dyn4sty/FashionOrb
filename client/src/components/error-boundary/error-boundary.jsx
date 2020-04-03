import React from 'react';
import { ErrorImageContainer, ErrorImageOverlay, ErrorImageText, ErrorImageHead } from './error-boundary.styles'
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return (
            <ErrorImageOverlay>
                <ErrorImageContainer imageUrl="https://i.imgur.com/lKJiT77.png"/>
                <ErrorImageHead>A Dog Ate this Page</ErrorImageHead>
                <ErrorImageText>
                Your dog is cute but honestly a menace...
                </ErrorImageText>
            </ErrorImageOverlay>
        )
      }
  
      return this.props.children; 
    }
  }

export default ErrorBoundary