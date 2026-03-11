import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface IBankListItem {
  id: string;
  bankName: string;
  accountNumber: string;
  created_at: string;
  updated_at: string;
}
export type BankListResponse = IPaginationResponse<IBankListItem>;

export type BankDetailsResponse = IApiDetailsResponse<IBankListItem>;
