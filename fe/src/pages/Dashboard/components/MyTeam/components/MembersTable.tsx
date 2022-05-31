import React, { useState } from 'react';
import {
  DataGrid,
  GridCallbackDetails,
  GridCellParams,
  GridColDef,
  GridState,
  GridValueGetterParams,
  MuiEvent,
} from '@mui/x-data-grid';
import { MembersModel } from '../../../../../models/member.model';

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
  const rows = members.map((member) => ({
    id: member._id,
    name: member.name,
    gender: member.gender,
    email: member.email,
    dob: member.dob,
    about: member.about,
  }));

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
        // onCellClick={(
        //   params: GridCellParams,
        //   event: MuiEvent<React.MouseEvent>,
        //   details: GridCallbackDetails,
        // ) => {
        //   console.log('params', params);
        //   console.log('event', event);
        //   console.log('details', details);
        // }}
        onStateChange={handleOnStateChange}
      />
    </div>
  );
};

export default MembersTable;
