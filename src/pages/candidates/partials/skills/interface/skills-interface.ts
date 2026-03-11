import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface ISkillsListItem {
  id: string;
  skills: string[];
  languages: string[];
  created_at: string;
  updated_at: string;
}
export type SkillsListResponse = IPaginationResponse<ISkillsListItem>;

export type SkillsDetailsResponse = IApiDetailsResponse<ISkillsListItem>;
