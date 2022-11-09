import React, { useState, useEffect } from 'react'

const loadJSON = key => key && JSON.parse(localStorage.getItem(key))
const saveJSON = (key, value) => localStorage.setItem(key, JSON.stringify(value))

const GitHubUser = ({ login }) => {
  const [profile, setProfile] = useState(
    loadJSON(`github_user:${login}`)
  )

  useEffect(() => {
    if (!profile) return
    // if (profile.login === login) return
    const { name, avatar_url, location, public_repos, public_gists, followers, following } = profile
    saveJSON(
      `github_user:${login}`,
      { name, avatar_url, location, public_repos, public_gists, followers, following }
    )
  }, [profile])

  useEffect(() => {
    if (!login) return
    if (profile && profile.login === login) return
    fetch(`https://api.github.com/users/${login}`)
      .then(resp => resp.json())
      .then(setProfile)
      .catch(console.error)
  }, [login])

  if (profile) return (
    <pre>{ JSON.stringify(profile, null, 2) }</pre>
  )

  return null
}

export default GitHubUser
