import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface IChequeReceivedListItem {
  id: string;
  customerAccount: {
    id: string;
    accountName: string;
  };
  chequeNumber: string;
  chequeDate: string;
  receivedDate: string;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}
export type ChequeReceivedListResponse =
  IPaginationResponse<IChequeReceivedListItem>;

export type ChequeReceivedDetailsResponse =
  IApiDetailsResponse<IChequeReceivedListItem>;
