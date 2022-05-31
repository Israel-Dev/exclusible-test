import { InputLabel, MenuItem, Paper, Select, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamService } from '../../../../api/services';
import { RoutePaths } from '../../../../routes';
import { StyledHeader, StyledParagraph, StyledTitle } from './Team.styled';

const Teams = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<string[]>([]);

  const fetchTeams = async () => {
    try {
      const response: string[] = await TeamService.getMyTeams();
      setTeams(response);
    } catch (e) {
      console.error('Error in fetchTeams', e);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const getTeamsElem = teams.map((team) => (
    <MenuItem
      key={`key-${team}`}
      value={team}
      onClick={() => navigate(`${RoutePaths.myTeam}?teamRef=${team}`)}
    >
      Ref. {team}
    </MenuItem>
  ));

  const [activeTeam, setActiveTeam] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setActiveTeam(event.target.value);
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
      <StyledHeader>
        <StyledTitle>My Teams</StyledTitle>
        <StyledParagraph>Select one item from the list below to update it's member</StyledParagraph>
      </StyledHeader>
      <InputLabel id="demo-simple-select-label">Select a team</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={activeTeam}
        label="Teams"
        onChange={handleChange}
        sx={{ minWidth: '200px' }}
      >
        {getTeamsElem}
      </Select>
    </Paper>
  );
};

export default Teams;
