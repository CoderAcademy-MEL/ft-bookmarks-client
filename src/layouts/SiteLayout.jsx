import React from 'react'

class SiteLayout extends React.Component {
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    )
  }
}

export default SiteLayout