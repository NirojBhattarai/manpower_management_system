import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface ISupplierListItem {
  id: string;
  name: string;
  address: string;
  code: string;
  panNumber: string;
  phone: string;
  group: {
    id: string;
    groupName: string;
  };
  createdAt: string;
  updatedAt: string;
}
export type SupplierListResponse = IPaginationResponse<ISupplierListItem>;

export type SupplierDetailsResponse = IApiDetailsResponse<ISupplierListItem>;
