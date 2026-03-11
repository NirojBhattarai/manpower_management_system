import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

namespace Medical {
  // ========== List Item ==============
  export interface ListItem {
    id: string;
    candidate: string;
    exam_date: string;
    medical_center: string;
    report_file: string;
    status: string;
    remarks: string;
    created_at: string;
  }
  export type List = IPaginationResponse<ListItem>;
  // ============= Details ===============
  interface IDetails {
    id: string;
    candidate: string;
    exam_date: string;
    medical_center: string;
    report_file: string;
    status: string;
    remarks: string;
    created_at: string;
  }
  export type Details = IApiDetailsResponse<IDetails>;
}

export default Medical;
