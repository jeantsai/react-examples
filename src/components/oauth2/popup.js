import React, {useEffect} from 'react'
import { OAUTH_STATE_KEY, OAUTH_MSG_KEY } from './constants'


const objectToQuery = obj => {
  return new URLSearchParams(obj).toString();
};

const queryToObject = q => {
  const parameters = new URLSearchParams(q);
  return Object.fromEntries(parameters.entries());
};

const checkState = state => {
  const storedState = sessionStorage.getItem(OAUTH_STATE_KEY)
  return storedState === state
}

const OAuthPopup = (props) => {
  const {
    Component = (
      <div data-test="auth-loading">
        Loading...
      </div>
    )
  } = props

  useEffect(() => {
    const payload = queryToObject(window.location.search)
    const state = payload?.state
    const error = payload?.error

    if (!window.opener) {
      throw new Error("Opener is missing")
    }

    console.log(`OAuth2 callback got playload: ${JSON.stringify(payload)}`)
    if (error) {
      window.opener.postMessage({
        type: OAUTH_MSG_KEY,
        error: decodeURI(error) || "Error occurred when login through OAuth2",
      })
    } else if (state && checkState(state)) {
      window.opener.postMessage({
        type: OAUTH_MSG_KEY,
        payload,
      })
    } else {
      window.opener.postMessage({
        type: OAUTH_MSG_KEY,
        error: "OAuth: state mismatch",
      })
    }

  }, [])

  return Component
};

export default OAuthPopup
