import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface IChequeIssuedListItem {
  id: string;
  supplierAccount: {
    id: string;
    name: string;
  };
  payeeName: string;
  bankAccount: {
    id: string;
    bankName: string;
  };
  chequeNumber: string;
  chequeDate: string;
  issuedDate: string;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
export type ChequeIssuedListResponse =
  IPaginationResponse<IChequeIssuedListItem>;

export type ChequeIssuedDetailsResponse =
  IApiDetailsResponse<IChequeIssuedListItem>;
