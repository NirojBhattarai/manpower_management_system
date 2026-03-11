import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";
import { OrientationStatusType } from "@/pages/orientation/schema/orientation-schema";

namespace Orientation {
  // ================ Orientation List ==================
  export interface ListItem {
    id: string;
    candidate_name: string;
    candidate_job: string;
    employer_name: string;
    institute_name: string;
    orientation_date: string;
    orientation_location: string;
    orientation_status: OrientationStatusType;
  }

  export type List = IPaginationResponse<ListItem>;
  // ================ Orientation Details ==================
  interface IDetails {
    id: string;
    candidate_name: string;
    candidate_job: string;
    employer_name: string;
    institute_name: string;
    orientation_date: string;
    orientation_location: string;
    orientation_status: OrientationStatusType;
  }
  export type Details = IApiDetailsResponse<IDetails>;
}

export default Orientation;
