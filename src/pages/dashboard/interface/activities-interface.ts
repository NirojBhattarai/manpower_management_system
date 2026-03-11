import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface IActivitiesListItem {
  id: string;
  user: {
    name: string;
  };
  activityType: string;
  message: string;
  created_date: string;
  updated_date: string;
}

export type ActivitiesListResponse = IPaginationResponse<IActivitiesListItem>;
export type ActivitiesDetailResponse = IApiDetailsResponse<IActivitiesListItem>;
