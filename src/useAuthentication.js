import { useContext } from 'react'
import { getLocalToken } from './local-token'
import AuthContextType from './context-types'
import { authorize } from './lib/utils'

export function useAuthentication() {
  const token = getLocalToken()
  const { clientId, provider } = useContext(AuthContextType)
  
  if (!token) {
    authorize(provider, clientId)
    return { authenticated: false }
  } else {
    return { authenticated: true, token }
  }
}
