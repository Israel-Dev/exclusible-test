import { Button, Paper, useTheme } from '@mui/material';
import { GridCallbackDetails, GridState, MuiEvent } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TeamService } from '../../../../api/services';
import { MembersModel } from '../../../../models/member.model';
import { RoutePaths } from '../../../../routes';
import { Header } from '../../../../shared';
import { MembersTable } from './components';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { ActionsContainer } from './MyTeam.styled';

interface Props {
  saveTeamRef: (teamRef: string) => void;
}

const MyTeam = ({ saveTeamRef }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const teamRef = new URLSearchParams(location.search).get('teamRef');
  const [team, setTeam] = useState<MembersModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTeamMembers = async () => {
    try {
      if (teamRef) {
        const members = await TeamService.getMembers({ teamRef });
        setTeam(members);
      }
    } catch (e) {
      console.error('Error in fetchTeamMembers', e);
    }
  };

  useEffect(() => {
    if (teamRef) saveTeamRef(teamRef);
    fetchTeamMembers();
  }, []);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleOnStateChange = (
    state: GridState,
    //, event: MuiEvent, details: GridCallbackDetails
  ) => {
    const { selection } = state;

    if (selection) setSelectedRows(selection as string[]);
  };

  const handleDeleteClick = useCallback(async () => {
    try {
      if (teamRef) {
        setIsLoading(true);
        await TeamService.removeMembersFromTeam({
          memberIds: selectedRows,
          teamRef,
        });

        fetchTeamMembers();
      }
      setIsLoading(false);
    } catch (e) {
      console.error('Error in handleDeleteClick', e);
      setIsLoading(false);
    }
  }, [selectedRows, teamRef]);

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
        paragraph="Double click on a member to update his/her info or click the create button to add a new member to the team"
      />

      <ActionsContainer className="action-container">
        <DeleteIcon
          color={'error'}
          cursor="pointer"
          onClick={isLoading ? undefined : handleDeleteClick}
        />
      </ActionsContainer>
      <MembersTable members={team} handleOnStateChange={handleOnStateChange} />

      <Button
        sx={{ marginTop: '25px', marginBottom: '25px' }}
        variant="contained"
        onClick={() => navigate(RoutePaths.createMember)}
        disabled={isLoading}
      >
        Create a Member
      </Button>
    </Paper>
  );
};

export default MyTeam;
