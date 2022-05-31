export interface GetTeamMembersParams {
  teamRef: string;
}

export interface GetTeamMembersSuccessResponse {
  about: string;
  dob: string;
  email: string;
  isMale: boolean;
  name: string;
  _id: string;
}

export interface GetAddMembersParams {
  teamRef: string;
  memberId: string;
}

export interface DeleteMembersFromTeamParams {
  memberIds: string[];
  teamRef: string;
}

export interface DeleteMembersFromTeamSuccessResponse {
  message: string;
}

export interface DeleteMembersFromTeamFailedResponse {
  message: string;
}
