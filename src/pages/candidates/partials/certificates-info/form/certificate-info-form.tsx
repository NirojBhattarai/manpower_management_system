import FormInputTextArea from "@/components/form/form-input-text-area";
import FormInputPdf from "@/components/form/FormInputPdf";
import FormInputText from "@/components/form/FormInputText";

const CertificateInfoForm = () => {
  return (
    <div className="space-y-6">
      <div className="gap-4 grid grid-cols-2">
        <FormInputText
          label="Certificate Title"
          name="title"
          placeholder="Enter Certificate Title"
        />
        <FormInputText
          label="Organization Name"
          name="organizationName"
          placeholder="Enter Organization Name"
        />
        <FormInputPdf label="Certificate" name="certificateFile" />
        <FormInputTextArea
          label="Description"
          name="description"
          placeholder="Enter Description"
          wrapperClassName="col-span-2"
        />
      </div>
    </div>
  );
};

export default CertificateInfoForm;
