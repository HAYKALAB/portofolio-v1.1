"use client";

import React, { Component, ReactNode } from "react";

interface Props {
  fallback?: ReactNode;
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("WebGLContext error suppressed:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          // Fallback CSS elegan saat WebGL gagal/mode hemat baterai aktif
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <div className="w-[30rem] h-[30rem] rounded-full bg-blue-600/20 blur-3xl animate-pulse" />
          </div>
        )
      );
    }
    return this.props.children;
  }
}