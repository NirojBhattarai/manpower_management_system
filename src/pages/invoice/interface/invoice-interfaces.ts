import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface IInvoiceListItem {
  id: string;
  jobseeker: {
    id: string;
    fullName: string;
  };
  refNo: string;
  invoiceDate: string;
  dueDate: string;
  services: Services[];
}

export interface Services {
  service: string;
  quantity: string;
  rate: string;
  discount: string;
  vat: boolean;
}
export type InvoiceListResponse = IPaginationResponse<IInvoiceListItem>;
export type InvoiceDetailResponse = IApiDetailsResponse<IInvoiceListItem>;
