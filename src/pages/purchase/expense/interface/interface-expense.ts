import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface IExpenseListItem {
  id: string;
  supplier: {
    id: string;
    name: string;
  };
  invoiceReferenceNo: string;
  date: string;
  dueDate: string;
  expenses: Expenses[];
}

export interface Expenses {
  account: string;
  amount: string;
  tax: boolean;
}
export type ExpenseListResponse = IPaginationResponse<IExpenseListItem>;
export type ExpenseDetailResponse = IApiDetailsResponse<IExpenseListItem>;
