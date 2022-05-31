import React, { useCallback, useReducer, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { RoutePaths } from '../../routes';
import { useNavigate } from 'react-router-dom';
import { Box } from '../../shared';
import validator from 'validator';
import { UserService } from '../../api/services';
import { PostLoginFailedResponse, PostLoginSuccessResponse } from '../../api/dtos/user.dto';
import Cookies from 'js-cookie';
import { Alert, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

enum SignInFields {
  email = 'email',
  password = 'password',
}

interface State {
  [SignInFields.email]: string;
  [SignInFields.password]: string;
}

interface Action {
  type: SignInFields;
  payload: string;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SignInFields.email: {
      return { ...state, [SignInFields.email]: action.payload };
    }
    case SignInFields.password: {
      return { ...state, [SignInFields.password]: action.payload };
    }
    default:
      return state;
  }
};

const INITIAL_STATE: State = {
  [SignInFields.email]: '',
  [SignInFields.password]: '',
};

const SignIn = () => {
  const navigate = useNavigate();

  const [formState, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState<{ message: string } | null>(null);

  const allFieldsAreValid = useCallback(() => {
    const { email, password } = formState;

    if (!email || !email.trim() || !validator.isEmail(email) || !password || !password.trim()) {
      return false;
    }

    return true;
  }, [formState]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setIsLoading(true);

      if (allFieldsAreValid()) {
        const data = await UserService.login(formState);

        if (data && (data as PostLoginSuccessResponse).token) {
          Cookies.set('token', (data as PostLoginSuccessResponse).token);
          setIsLoading(false);
          setHasError(null);
          navigate(RoutePaths.dashboard);
        }
      }
    } catch (e: unknown | PostLoginFailedResponse) {
      console.error('Error in SignUp handleSubmit', e);
      if (e && (e as PostLoginFailedResponse).message) {
        setHasError({ message: (e as PostLoginFailedResponse).message });
      }
      setIsLoading(false);
    }
  };

  return (
    <Box handleSubmit={handleSubmit} headingTitle="Sign in">
      <TextField
        margin="normal"
        required
        fullWidth
        id={SignInFields.email}
        label="Email Address"
        name={SignInFields.email}
        autoComplete="email"
        onChange={(e) => {
          setHasError(null);
          dispatch({ type: SignInFields.email, payload: e.target.value });
        }}
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name={SignInFields.password}
        label="Password"
        type={isPwdVisible ? 'text' : 'password'}
        id="password"
        onChange={(e) => {
          setHasError(null);
          dispatch({ type: SignInFields.password, payload: e.target.value });
        }}
        autoComplete="current-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setIsPwdVisible(!isPwdVisible)}
                onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
                edge="end"
              >
                {isPwdVisible ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      {hasError && hasError.message ? <Alert severity="error">{hasError.message}</Alert> : null}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={!allFieldsAreValid() || isLoading}
      >
        {isLoading ? <CircularProgress color="secondary" /> : 'Sign in'}
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link onClick={() => navigate(RoutePaths.signUp)} variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignIn;
