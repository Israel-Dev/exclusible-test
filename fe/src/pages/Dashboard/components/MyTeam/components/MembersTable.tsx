import React, { useCallback } from 'react';
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridRowParams,
  GridState,
  MuiEvent,
} from '@mui/x-data-grid';
import { MembersModel } from '../../../../../models/member.model';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../../../../routes';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 200, sortable: false },
  { field: 'gender', headerName: 'Gender', width: 100, sortable: false },
  { field: 'email', headerName: 'Email', width: 250, sortable: false },
  { field: 'dob', headerName: 'Date of Birth', width: 125, sortable: false },
  { field: 'about', headerName: 'About', width: 250, sortable: false },
];

interface Props {
  members: MembersModel[];
  handleOnStateChange: (state: GridState, event: MuiEvent, details: GridCallbackDetails) => void;
}

const MembersTable = ({ members, handleOnStateChange }: Props) => {
  const navigate = useNavigate();

  const rows = members.map((member) => ({
    id: member._id,
    name: member.name,
    gender: member.gender,
    email: member.email,
    dob: member.dob,
    about: member.about,
  }));

  const handleOnDoubleClick = useCallback(
    (
      params: GridRowParams,
      // , event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails
    ) => {
      const { row } = params;
      navigate(`${RoutePaths.editMember}?memberId=${row.id}`);
    },
    [],
  );

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        sortingMode="server"
        autoHeight={true}
        disableSelectionOnClick={true}
        onStateChange={handleOnStateChange}
        onRowDoubleClick={handleOnDoubleClick}
      />
    </div>
  );
};

export default MembersTable;
