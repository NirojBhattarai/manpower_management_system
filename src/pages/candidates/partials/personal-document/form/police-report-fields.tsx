import FormInputDate from "@/components/form/form-input-date";
import FormInputPdf from "@/components/form/FormInputPdf";
import FormInputText from "@/components/form/FormInputText";

export const PoliceReportFields = () => {
  return (
    <div className="gap-4 grid grid-cols-2">
      <FormInputPdf
        label="Police Report"
        name="policeReport.policeReportImage"
      />

      <FormInputText
        label="Dispatch Number"
        name="policeReport.dispatchNo"
        placeholder="Enter Dispatch Number"
      />

      <FormInputDate label="Issue Date" name="policeReport.issueDate" />
    </div>
  );
};
