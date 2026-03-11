import { IPaginationResponse } from "@/interface/apiResponse.interface";

namespace Candidate {
  // ================== Candidate List ========================
  export interface ListItem {
    id: string;
    first_name: string;
    last_name: string;
    phone_no: string;
    passport_no: string;
    address: string;
    company_name: string;
    interview_process: string;
  }
  export type List = IPaginationResponse<ListItem>;
  // ================== Candidate Details ========================
}

export default Candidate;
