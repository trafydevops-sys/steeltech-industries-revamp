import { Component, type ReactNode } from "react";

/** Scoped fallback for the 3D canvas: on a WebGL/render failure this renders nothing, letting the
 * section's own CSS background show through instead of taking down the whole page. */
export default class Scene3DBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
