import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface IPersonalDetailsListItem {
  id: string;
  fullName: string;
  passportNumber: string;
  dateOfBirth: string;
  birthPlace: string;
  fatherName: string;
  motherName: string;
  phone: string;
  email: string;
  province: string;
  district: string;
  municipality: string;
  wardNumber: string;
  created_at: string;
  updated_at: string;
}

export type PersonalDetailsListResponse =
  IPaginationResponse<IPersonalDetailsListItem>;

export type PersonalDetailsDetailsResponse =
  IApiDetailsResponse<IPersonalDetailsListItem>;

export interface LocationListItem {
  province: string;
  districts: string[];
}

export type LocationsListResponse = IPaginationResponse<LocationListItem>;
