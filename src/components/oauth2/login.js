import React, { useContext } from 'react';
import useOAuth2 from './hooks'
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Button from "@mui/material/Button"
import GitHubIcon from "@mui/icons-material/GitHub"
import Alert from "@mui/material/Alert"
import CircularProgress from "@mui/material/CircularProgress"
import Stack from "@mui/material/Stack";
import { AuthContext } from '../../App'
import {Icon, SvgIcon} from "@mui/material";


const Login = () => {
  const { state, dispatch } = useContext(AuthContext);

  const isAuthenticated = !!(state.user);

  console.log(`Using OAuth2 with redirectUri: ${document.location.origin}/cb ...`)
  const { loading, error, getAuth } = useOAuth2({
    authorizationUri: 'https://github.com/login/oauth/authorize',
    redirectionUri: `${document.location.origin}/cb`,
    clientId: 'e7dcfda17e92dfc11164',
    scope: 'user repo',
    tokenUri: 'http://localhost:3001/token',
    // tokenUri: 'https://github.com/login/oauth/access_token',
  })

  const LoginResult = () => {
    if (error) {
      return (
        <Alert severity="error">${error}</Alert>
      )
    } else if (loading) {
      return (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      )
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  }

  const sendMessage = () => {

  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          sx={{ mt: 3, mb: 2 }}
          disabled='true'
        >
          Sign In
        </Button>
        <div style={{ textAlign: 'center' }}>
          or
        </div>
        <LoginResult />
        { isAuthenticated ? (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              dispatch({
                type: 'LOGOUT',
              })
            }}
          >
            Sign out
          </Button>
        ) : (
          <>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => getAuth()}
          >
            <GitHubIcon style={{ marginRight: '10px' }} />
            Sign in with GitHub
          </Button>

          </>
        )}
      </Box>
    </Box>
  )
}

export default Login
