import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';
import { useCallback, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import {
  PostCreateMemberParams,
  PostCreateMemberSuccessResponse,
} from '../../../../api/dtos/member.dto';
import { MemberService, TeamService } from '../../../../api/services';
import { RoutePaths } from '../../../../routes';
import { Header } from '../../../../shared';

enum CreateMemberFields {
  name = 'name',
  dob = 'dob',
  isMale = 'isMale',
  email = 'email',
  about = 'about',
}

interface State {
  [CreateMemberFields.name]: string;
  [CreateMemberFields.dob]: string;
  [CreateMemberFields.isMale]: string;
  [CreateMemberFields.email]: string;
  [CreateMemberFields.about]: string;
}

interface Action {
  type: CreateMemberFields;
  payload: string;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case CreateMemberFields.name: {
      return { ...state, [CreateMemberFields.name]: action.payload };
    }
    case CreateMemberFields.dob: {
      return { ...state, [CreateMemberFields.dob]: action.payload };
    }
    case CreateMemberFields.email: {
      return { ...state, [CreateMemberFields.email]: action.payload };
    }
    case CreateMemberFields.isMale: {
      return { ...state, [CreateMemberFields.isMale]: action.payload };
    }
    case CreateMemberFields.about: {
      return { ...state, [CreateMemberFields.about]: action.payload };
    }
    default:
      return state;
  }
};

const INITIAL_STATE: State = {
  [CreateMemberFields.name]: '',
  [CreateMemberFields.isMale]: '',
  [CreateMemberFields.email]: '',
  [CreateMemberFields.dob]: '',
  [CreateMemberFields.about]: '',
};

interface Props {
  teamRef: string;
}

const CreateMember = ({ teamRef }: Props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatch] = useReducer(reducer, INITIAL_STATE);

  const allFieldsAreValid = useCallback(() => {
    const { name, isMale, email, dob, about } = formState;

    if (
      !name ||
      !name.trim() ||
      !validator.isEmail(email) ||
      !isMale ||
      !isMale.trim() ||
      !dob ||
      !dob.trim()
    ) {
      return false;
    }

    return true;
  }, [formState]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      if (allFieldsAreValid()) {
        const newMemberData = await MemberService.createMember({
          ...formState,
          isMale: formState.isMale === 'male' ? true : false,
        });

        if (newMemberData && (newMemberData as PostCreateMemberSuccessResponse).memberId) {
          console.log(newMemberData);
          await TeamService.addMember({
            teamRef: teamRef,
            memberId: (newMemberData as PostCreateMemberSuccessResponse).memberId,
          });
          navigate(`${RoutePaths.myTeam}?teamRef=${teamRef}`);
        }
      }
    } catch (e) {
      console.error('Error in handleSubmit', e);
      setIsLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
      }}
    >
      <Header title="Create Member" paragraph="Fill the data bellow to create a new member" />

      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <TextField
              autoComplete="given-name"
              name={CreateMemberFields.name}
              required
              fullWidth
              id={CreateMemberFields.name}
              label="Full Name"
              autoFocus
              onChange={(e) => {
                dispatch({ type: CreateMemberFields.name, payload: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name={CreateMemberFields.isMale}
              value={formState[CreateMemberFields.isMale]}
              fullWidth
              required
              label="Gender"
              onChange={(e) => {
                dispatch({ type: CreateMemberFields.isMale, payload: e.target.value });
              }}
              sx={{ minWidth: '200px' }}
            >
              <MenuItem value={'female'}>Female</MenuItem>
              <MenuItem value={'male'}>Male</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              autoComplete="given-name"
              name={CreateMemberFields.dob}
              required
              fullWidth
              id={CreateMemberFields.dob}
              type="date"
              onChange={(e) => {
                dispatch({ type: CreateMemberFields.dob, payload: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              autoComplete="email"
              name={CreateMemberFields.email}
              required
              fullWidth
              id={CreateMemberFields.email}
              label="Email"
              onChange={(e) => {
                dispatch({ type: CreateMemberFields.email, payload: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              autoComplete="about"
              name={CreateMemberFields.about}
              fullWidth
              id={CreateMemberFields.about}
              label="About"
              onChange={(e) => {
                dispatch({ type: CreateMemberFields.about, payload: e.target.value });
              }}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={!allFieldsAreValid() || isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? <CircularProgress color="secondary" /> : 'Create Member'}
        </Button>
      </Box>
    </Paper>
  );
};

export default CreateMember;
