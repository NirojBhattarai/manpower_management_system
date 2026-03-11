import {
  IApiDetailsResponse,
  IPaginationResponse,
} from "@/interface/apiResponse.interface";

export interface ITicketListItem {
  id: string;
  jobseeker: {
    id: string;
    fullName: string;
  };
  jobTitle: {
    id: string;
    jobtitle: string;
  };
  jobVacancy: {
    id: string;
  };
  company: {
    id: string;
    companyName: string;
  };
  airlineName: string;
  flightNumber: string;
  flightStatus: string;
  departureDate: string;
  ticketFile: string;
  created_at: string;
  updated_at: string;
}
export type TicketListResponse = IPaginationResponse<ITicketListItem>;

export type TicketDetailsResponse = IApiDetailsResponse<ITicketListItem>;
