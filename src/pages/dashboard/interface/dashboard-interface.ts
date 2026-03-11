import { IApiDetailsResponse } from "@/interface/apiResponse.interface";

export interface ITotalStatisticsListItem {
  id: string;
  totalJobSeekers: number;
  totalVisaProcess: number;
  totalVisaApproved: number;
  totalReadyForDeparture: number;
  month: string;
  stages: Stages[];
}

export interface Stages {
  name: string;
  count: number;
}

export type TotalStatisticsDetailResponse =
  IApiDetailsResponse<ITotalStatisticsListItem>;
