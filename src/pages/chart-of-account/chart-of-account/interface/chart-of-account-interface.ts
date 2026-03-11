import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface IChartOfAccountListItem {
  id: string;
  accountName: string;
  group: {
    id: string;
    groupName: string;
  };
  description: string;
  code: string;
}
export type ChartOfAccountListResponse =
  IPaginationResponse<IChartOfAccountListItem>;

export type ChartOfAccountDetailsResponse =
  IApiDetailsResponse<IChartOfAccountListItem>;
