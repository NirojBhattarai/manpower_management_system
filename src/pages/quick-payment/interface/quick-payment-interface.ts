import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface IQuickPaymentListItem {
  id: string;
  paidFrom: string;
  date: string;
  reference: string;
  payments: Payments[];
}

export interface Payments {
  account: {
    id: string;
    accountName: string;
  };
  amount: string;
  description: string;
}
export type QuickPaymentListResponse =
  IPaginationResponse<IQuickPaymentListItem>;
export type QuickPaymentDetailResponse =
  IApiDetailsResponse<IQuickPaymentListItem>;
