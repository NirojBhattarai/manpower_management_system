import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface IChartOfGroupListItem {
  id: string;
  groupName: string;
  under: string;
  description: string;
}
export type ChartOfGroupListResponse =
  IPaginationResponse<IChartOfGroupListItem>;

export type ChartOfGroupDetailsResponse =
  IApiDetailsResponse<IChartOfGroupListItem>;
