import React from 'react'
import { getLocalToken } from './local-token'
import AuthContextType from './context-types'
import { authorize } from './lib/utils'

export const authenticated = () => Component => {
  class Authed extends React.Component {
    render() {
      const token = getLocalToken()
      if (!token) {
        const { clientId, provider, loggingInIndicator } = this.context
        authorize(provider, clientId)
        return (loggingInIndicator || <p>Logging in...</p>)
      } else {
        return <Component {...this.props} />
      }
    }
  }
  Authed.contextType = AuthContextType
  return Authed
}
