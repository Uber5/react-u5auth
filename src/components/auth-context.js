import React from 'react'
import AuthContextType from '../context-types'
import PropTypes from 'prop-types'
import { getHashValues } from '../lib/utils'

import TokenManager from './token-manager'

const styles = {
  debug: {
    position: 'absolute',
    top: 5,
    right: 5,
    background: '#b1d85da8',
    padding: 10
  }
}

class Debug extends React.Component {
  state = { open: true }
  render() {
    const { contextProps, contextState, hashValues } = this.props
    // we remove the loggingInIndicator from the props we show, as JSON.stringify fails
    // otherwise
    const { loggingInIndicator, ...otherContextProps } = contextProps

    if (!this.state.open) {
      return null
    }
    
    return (
      <div style={ styles.debug }>
        <button onClick={() => this.setState({ open: false })}>close</button>
        <ul>
          <li>contextProps={JSON.stringify(otherContextProps)}</li>
          <li>contextState={JSON.stringify(contextState)}</li>
          <li>hashValues={JSON.stringify(hashValues)}</li>
        </ul>
      </div>
    )
  }
}

export class AuthContext extends React.Component {
  isDebugEnabled = () => {
    return !!(localStorage.getItem('debug') || '').match(/react-u5auth/)
  }

  render() {
    const state = getHashValues().state
    const showChildren = !(state && state.match(/^refreshing/))

    const { children, onTokenUpdate, ...contextProps } = this.props

    const debug = this.isDebugEnabled()
    console.log('react-u5auth, debug', debug)
    return (
      <div>
        <AuthContextType.Provider value={contextProps}>
          <TokenManager
            onTokenUpdate={token => {
              this.setState({ token })
              onTokenUpdate && onTokenUpdate(token)
            }}
          />
          { debug && <Debug contextProps={contextProps} contextState={this.state} hashValues={state} />}
          { showChildren && this.props.children }
        </AuthContextType.Provider>
      </div>
    )
  }
}

AuthContext.propTypes = {
  provider: PropTypes.string.isRequired,
  clientId: PropTypes.string.isRequired,
  loggingInIndicator: PropTypes.element
}
