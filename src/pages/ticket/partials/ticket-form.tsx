import FormInputDate from "@/components/form/form-input-date";
import FormInputSelect, { IOption } from "@/components/form/form-input-select";
import FormInputPdf from "@/components/form/FormInputPdf";
import FormInputText from "@/components/form/FormInputText";

const TicketForm = () => {
  const FlightStatusOptions: IOption[] = [
    { label: "Pending", value: "pending" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Cancelled", value: "cancelled" },
  ];

  return (
    <div className="gap-4 grid grid-cols-1">
      <FormInputText label="Airline Name" name="airlineName" />
      <FormInputText label="Flight Number" name="flightNumber" />
      <FormInputDate label="Departure Date" name="departureDate" />
      <FormInputPdf label="Ticket File" name="ticketFile" />
      <FormInputSelect
        label="Flight Status"
        name="flightStatus"
        options={FlightStatusOptions}
      />
    </div>
  );
};
export default TicketForm;
