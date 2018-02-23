import React from 'react'

export default class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      error: null,
      info: null,
    }
  }

  componentDidCatch(error, info) {
    this.setState({error, info})
  }

  render() {
    return this.state.error ? (
      <div>
        Error during render: {this.state.error.toString()}
        <br />
        {this.state.info.componentStack}
      </div>
    ) : this.props.children
  }
}
