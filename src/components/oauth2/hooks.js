import { useCallback, useState, useRef, useContext } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { OAUTH_STATE_KEY, OAUTH_MSG_KEY } from './constants'
import { AuthContext } from "../../App";


const POPUP_HEIGHT = 800
const POPUP_WIDTH = 700

const generateState = () => {
  const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let array = new Uint8Array(40)
  window.crypto.getRandomValues(array)
  array = array.map((x) => validChars.codePointAt(x % validChars.length))
  const randomState = String.fromCharCode.apply(null, array)
  return randomState
}

const saveState = state => {
  sessionStorage.setItem(OAUTH_STATE_KEY, state)
}

const removeState = () => {
  sessionStorage.removeItem(OAUTH_STATE_KEY)
}

const openPopup = url => {
  const top = window.outerHeight / 2 + window.screenY - POPUP_HEIGHT / 2
  const left = window.outerWidth / 2 + window.screenX - POPUP_WIDTH / 2
  return window.open(
    url,
    'Authorization Popup Window',
    `height=${POPUP_HEIGHT},width=${POPUP_WIDTH},top=${top},left=${left}`
  )
}

const closePopup = ref => {
  ref.current?.close()
}

const getCompleteAuthUrl = (
  authorizationUri,
  redirectionUri,
  clientId,
  scope = "",
  state,
) => {
  const authUrl = `${authorizationUri}?response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${redirectionUri}&scope=${scope}`
  console.log(`Got completeAuthUrl: ${authUrl}`)
  return authUrl
}

// Github: https://github.com/login/oauth/access_token
const getCompleteTokenUrl = (
  tokenUri,
  clientId,
  code,
  redirectionUri,
) => {
  const tokenUrl = `${tokenUri}?client_id=${clientId}&code=${code}&redirect_uri=${redirectionUri}`
  // const tokenUrl = `${tokenUri}?client_id=${clientId}&code=${code}&client_secret=${clientSecret}&redirect_uri=${redirectionUri}`
  console.log(`Got completeTokenUrl: ${tokenUrl}`)
  return tokenUrl
}

const cleanup = (
  intervalRef,
  popupRef,
  handleOAuthMessage
) => {
  clearInterval(intervalRef.current)
  closePopup(popupRef)
  removeState()
  window.removeEventListener('message', handleOAuthMessage)
}

const useOAuth2 = ({
  authorizationUri,
  redirectionUri,
  clientId,
  scope = "",
  tokenUri,
}) => {
  const [{loading, error}, setOAuthState] = useState({loading: false, error: null})
  const [token, setToken] = useLocalStorageState(
    `${authorizationUri}-${clientId}-${scope}`,
    {
      defaultValue: null,
    },
  )
  const {state, dispatch} = useContext(AuthContext)
  const popupRef = useRef()
  const intervalRef = useRef()

  const getAuth = useCallback(() => {
    setOAuthState({
      loading: true,
      error: null,
    })

    const state = generateState()
    saveState(state)

    popupRef.current = openPopup(
      getCompleteAuthUrl(authorizationUri, redirectionUri, clientId, scope, state)
    )

    async function handleEvent(event) {
      const type = event?.data?.type
      if (type !== OAUTH_MSG_KEY) {
        return
      }
      try {
        console.log(`Got OAuth message: ${JSON.stringify(event?.data, null, 2)}`)
        const err = event?.data?.error
        if (err) {
          setOAuthState({
            loading: false,
            error: err || 'Unknown error'
          })
        } else {
          const code = event?.data?.payload?.code
          console.log(`Got OAuth2 code successfully: ${code}`)
          // const data = new FormData()
          // data.append('client_id', clientId)
          // data.append("client_secret", 'fa7ec52a110185fe8d040f46e7cd3cfcdde18e53')
          // data.append('code', code)
          // data.append('redirect_uri', redirectionUri)
          const resp = await fetch(
            // tokenUri,
            getCompleteTokenUrl(
              tokenUri,
              clientId,
              code,
              redirectionUri,
            ),
            {
              method: 'POST',
              // headers: {
                // Accept: 'application/json',
                // 'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              // },
              // body: data,
            }
          )
            // .then(resp => resp.json())
            // .then(data => {
            //   console.log(`Got access token info: ${data}`)
            // })
            // .catch(err => {
            //   console.error('Failed to exchange access token: ', err)
            //   setOAuthState({
            //     loading: false,
            //     error: err,
            //   })
            // })
          console.log(`Got token response status: ${resp.status}`);
          console.log(`Got token response status text: ${resp.statusText}`);
          console.log(`Got token response type: ${resp.type}`);
          console.log(`Got token response url: ${resp.url}`);
          if (!resp.ok) {
            const error = `Failed to get access token ${resp.status}: ${resp.statusText}`;
            console.log(error);
            setOAuthState({
              loading: false,
              error,
            });
          } else {
            const tokenPayload = await resp.json()
            setOAuthState({
              loading: false,
              error: null,
            });
            setToken(tokenPayload);
            fetch(`https://api.github.com/user`, {
              headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${tokenPayload?.access_token}`,
              }
            })
              .then(resp => {
                console.log(`Got user profile status ${resp.status}`);
                return resp.json();
              })
              .then(user => {
                console.log('Got user profile successfully.')
                dispatch({
                  type: 'LOGIN',
                  payload: {
                    user,
                  },
                })
              })
              .catch(err => {
                console.error('Failed to get user profile: ', err)
                setOAuthState({
                  loading: false,
                  error: err,
                })
              });
          }
        }
      } catch (e) {
        console.error(e);
        setOAuthState({
          loading: false,
          error: e.toString(),
        });
      } finally {
        cleanup(intervalRef, popupRef, handleEvent)
      }
    }
    window.addEventListener("message", handleEvent)

    intervalRef.current = setInterval(() => {
      const popupClosed = !popupRef.current?.window || popupRef.current?.window?.closed
      if (popupClosed) {
        setOAuthState(state => ({
          ...state,
          loading: false,
        }))
      }
    }, 250)

    return () => {
      window.removeEventListener('message', handleEvent)
      if (intervalRef) {
        clearInterval(intervalRef.current)
      }
    }
  }, [
    authorizationUri,
    redirectionUri,
    clientId,
    scope,
    tokenUri,
    // setOAuthState,
    setToken,
  ])

  return { token, loading, error, getAuth }
}

export default useOAuth2
