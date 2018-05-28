import React, { Component } from 'react';

class LoadingSpinner extends Component {
  constructor() {
    super();
    this.loaderRef = React.createRef();
  }

  componentDidMount() {
    const { parentElement } = this.loaderRef.current;

    parentElement.classList.add('position-relative');
  }

  componentWillUnmount() {
    const { parentElement } = this.loaderRef.current;

    parentElement.classList.remove('position-relative');
  }

  render() {
    return (
      <div className="loading-spinner" ref={this.loaderRef}>
        <div className="loading-spinner__roll" />

        <svg className="loading-spinner__logo" viewBox="0 0 164 133">
          <polygon fill="#FFD111" points="41,123 82,82 0,82 " />
          <rect x="53.009" y="12.009" transform="matrix(0.7071 0.7071 -0.7071 0.7071 53.0087 -45.9742)" fill="#0070BE" width="57.983" height="57.983" />
          <rect x="94.009" y="53.009" transform="matrix(0.7071 0.7071 -0.7071 0.7071 94.0088 -62.957)" fill="#33BA20" width="57.983" height="57.983" />
          <polygon fill="#FF4B34" points="0,82 82,82 41,41 " />
        </svg>
      </div>
    );
  }
}

export default LoadingSpinner;
