export interface PostCreateMemberParams {
  name: string;
  dob: string;
  isMale: boolean;
  email: string;
  about: string;
}

export interface PostCreateMemberSuccessResponse {
  message: string;
  memberId: string;
}

export interface PostCreateMemberFailedResponse {
  message: string;
}

export interface GetMemberParams {
  memberId: string;
}

export interface PatchUpdateMemberParams {
  name?: string;
  dob?: string;
  isMale?: boolean;
  email?: string;
  about?: string;
}

export interface PatchUpdateMemberSuccessResponse {
  message: string;
}
