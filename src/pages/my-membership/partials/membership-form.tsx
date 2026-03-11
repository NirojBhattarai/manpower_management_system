import FormInputDate from "@/components/form/form-input-date";
import FormInputText from "@/components/form/FormInputText";

const MembershipForm: React.FC = () => {
  return (
    <div className="gap-4 grid grid-cols-2">
      <FormInputText
        label="Company Name"
        name="companyName"
        placeholder="Enter Company Name"
      />
      <FormInputText
        label="Company Registration Number"
        name="companyRegistrationNumber"
        placeholder="Enter Company Registration Number"
      />
      <FormInputDate
        label="Registration Date"
        name="registrationDate"
        placeholder="Enter Registration Date"
      />
      <FormInputText
        label="PAN Number"
        name="panNumber"
        placeholder="Enter PAN Number"
      />
      <FormInputText
        label="Mamging Director"
        name="managingDirector"
        placeholder="Enter Managing Director Name"
      />
      <FormInputText
        label="License Number"
        name="licenseNumber"
        placeholder="Enter License Number"
      />
    </div>
  );
};
export default MembershipForm;
