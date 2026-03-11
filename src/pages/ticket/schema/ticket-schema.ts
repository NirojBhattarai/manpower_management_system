import * as Yup from "yup";

const TicketSchema = Yup.object().shape({
  airlineName: Yup.string().required("This field is required"),
  flightNumber: Yup.string().required("This field is required"),
  departureDate: Yup.string().required("This field is required"),
});

const UpdateTicketSchema = Yup.object().shape({
  airlineName: Yup.string().required("This field is required"),
  flightNumber: Yup.string().required("This field is required"),
  departureDate: Yup.string().required("This field is required"),
  ticketFile: Yup.mixed<string | File>().required("This field is required"),
  flightStatus: Yup.string().required("This field is required"),
});

export type TicketSchemaType = Yup.InferType<typeof TicketSchema>;
export const TicketValidationSchema = TicketSchema;

export type UpdateTicketSchemaType = Yup.InferType<typeof UpdateTicketSchema>;
export const UpdateTicketValidationSchema = UpdateTicketSchema;
