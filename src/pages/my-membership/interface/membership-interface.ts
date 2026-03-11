import { IApiDetailsResponse } from "@/interface/apiResponse.interface";

export interface IMembershipListItem {
  id: string;
  companyName: string;
  companyRegistrationNumber: string;
  registrationDate: string;
  panNumber: string;
  managingDirector: string;
  licenseNumber: string;
  created_at: string;
  updated_at: string;
}

export type MembershipDetailsResponse =
  IApiDetailsResponse<IMembershipListItem>;
