import React, { Component } from 'react'

export class Button extends Component {
  render() {
      const {children, className = '', onClick} = this.props;
    return (
      <div>
        <button
            className = {className}
            onClick={onClick}
        >
            {children}
        </button>
      </div>
    )
  }
}

export default Button
