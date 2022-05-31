import { Button, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TeamService } from '../../../../api/services';
import { RoutePaths } from '../../../../routes';
import { Header } from '../../../../shared';
import { MembersTable } from './components';

interface Props {
  saveTeamRef: (teamRef: string) => void;
}

const MyTeam = ({ saveTeamRef }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const teamRef = new URLSearchParams(location.search).get('teamRef');
  const [team, setTeam] = useState([]);

  const fetchTeamMembers = async () => {
    try {
      if (teamRef) {
        await TeamService.getMembers({ teamRef });
      }
    } catch (e) {
      console.error('Error in fetchTeamMembers', e);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
    if (teamRef) saveTeamRef(teamRef);
  }, []);

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
      }}
    >
      <Header
        title="My Team"
        paragraph="Click on a member to update his/her info or click the create button to add a new member to the team"
      />

      <MembersTable />

      <Button
        sx={{ marginTop: '25px', marginBottom: '25px' }}
        variant="contained"
        onClick={() => navigate(RoutePaths.createMember)}
      >
        Create a Member
      </Button>
    </Paper>
  );
};

export default MyTeam;
