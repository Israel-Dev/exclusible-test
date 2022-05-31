import React, { useCallback, useEffect, useReducer, useState } from 'react';
import validator from 'validator';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Alert, CircularProgress } from '@mui/material';
import { Box } from '../../shared';
import { RoutePaths } from '../../routes';
import { useNavigate } from 'react-router-dom';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { UserService } from '../../api/services';
import Cookies from 'js-cookie';
import { PostRegisterSuccessResponse } from '../../api/dtos/user.dto';

enum SignUpFields {
  email = 'email',
  firstName = 'firstName',
  lastName = 'lastName',
  password = 'password',
}

interface State {
  [SignUpFields.email]: string;
  [SignUpFields.firstName]: string;
  [SignUpFields.lastName]: string;
  [SignUpFields.password]: string;
}

interface Action {
  type: SignUpFields;
  payload: string;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SignUpFields.email: {
      return { ...state, [SignUpFields.email]: action.payload };
    }
    case SignUpFields.firstName: {
      return { ...state, [SignUpFields.firstName]: action.payload };
    }
    case SignUpFields.lastName: {
      return { ...state, [SignUpFields.lastName]: action.payload };
    }
    case SignUpFields.password: {
      return { ...state, [SignUpFields.password]: action.payload };
    }
    default:
      return state;
  }
};

const INITIAL_STATE: State = {
  [SignUpFields.email]: '',
  [SignUpFields.firstName]: '',
  [SignUpFields.lastName]: '',
  [SignUpFields.password]: '',
};

const SignUp = () => {
  const navigate = useNavigate();
  const token = Cookies.get('token');

  useEffect(() => {
    if (token) navigate(RoutePaths.dashboard);
  }, [token]);

  const [formState, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const allFieldsAreValid = useCallback(() => {
    const { email, firstName, lastName, password } = formState;

    if (
      !email ||
      !email.trim() ||
      !validator.isEmail(email) ||
      !firstName ||
      !firstName.trim() ||
      !lastName ||
      !lastName.trim() ||
      !password ||
      !password.trim() ||
      !validator.isStrongPassword(password)
    ) {
      return false;
    }

    return true;
  }, [formState]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setIsLoading(true);

      if (allFieldsAreValid()) {
        const data = await UserService.registerUser(formState);

        if (data && (data as PostRegisterSuccessResponse).token) {
          Cookies.set('token', (data as PostRegisterSuccessResponse).token);
          setIsLoading(false);
          navigate(RoutePaths.dashboard);
        }
      }
    } catch (e) {
      console.error('Error in SignUp handleSubmit', e);
      setIsLoading(false);
    }
  };

  return (
    <Box handleSubmit={handleSubmit} headingTitle="Sign up">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="given-name"
            name={SignUpFields.firstName}
            required
            fullWidth
            id={SignUpFields.firstName}
            label="First Name"
            autoFocus
            onChange={(e) => {
              dispatch({ type: SignUpFields.firstName, payload: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="family-name"
            name={SignUpFields.lastName}
            required
            fullWidth
            id={SignUpFields.lastName}
            label="Last Name"
            onChange={(e) => dispatch({ type: SignUpFields.lastName, payload: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id={SignUpFields.email}
            label="Email Address"
            name={SignUpFields.email}
            autoComplete="email"
            type={SignUpFields.email}
            onChange={(e) => dispatch({ type: SignUpFields.email, payload: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name={SignUpFields.password}
            label="Password"
            type={isPwdVisible ? 'text' : 'password'}
            id={SignUpFields.password}
            autoComplete="new-password"
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
            onChange={(e) => dispatch({ type: SignUpFields.password, payload: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <Alert severity="info">
            Password must countain: <br />- One number <br />- One uppercase letter <br />- One
            lowercase letter <br />- One special character <br />- At least 8 characters
          </Alert>
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={!allFieldsAreValid() || isLoading}
      >
        {isLoading ? <CircularProgress color="secondary" /> : 'Sign Up'}
      </Button>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link onClick={() => navigate(RoutePaths.signIn)} variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUp;
