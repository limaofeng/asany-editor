import React, { Component } from 'react';

export interface ExtraProps {
  title: string;
  summary: string;
  content: any;
}

export class Extra extends Component<ExtraProps> {
  static defaultProps = {
    children: null,
    content: null,
  };

  render() {
    const { children, content } = this.props;
    return <div>{children || content}</div>;
  }
}
