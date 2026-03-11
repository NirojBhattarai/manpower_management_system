import FormInputDate from "@/components/form/form-input-date";
import FormInputTextArea from "@/components/form/form-input-text-area";
import FormInputText from "@/components/form/FormInputText";
import FormSwitch from "@/components/form/FormSwitch";
import { ExperienceSchemaType } from "../schema/expereince-info-schema";
import { useFormikContext } from "formik";
import { useEffect } from "react";

const ExperienceInfoForm = () => {
  const { values, setFieldValue } = useFormikContext<ExperienceSchemaType>();

  useEffect(() => {
    if (values.currentlyWorking) {
      setFieldValue("endDate", "");
    }
  }, [values.currentlyWorking, setFieldValue]);

  return (
    <div className="space-y-6">
      <div className="gap-4 grid grid-cols-2">
        <FormInputText
          label="Job Title"
          name="title"
          placeholder="Enter Job Title"
        />

        <FormInputText
          label="Company Name"
          name="companyName"
          placeholder="Enter Company Name"
        />

        <FormInputText
          label="Job Level"
          name="level"
          placeholder="Enter Job Level"
        />

        <div className="flex items-center">
          <FormSwitch
            title="Currently Working"
            name="currentlyWorking"
            activeText="Yes"
            inActiveText="No"
          />
        </div>

        <div className="gap-4 grid grid-cols-2 col-span-2">
          <FormInputDate
            label="Start Date"
            name="startDate"
            placeholder="Enter Start Date"
          />

          <FormInputDate
            label="End Date"
            name="endDate"
            placeholder="Enter End Date"
            disabled={values.currentlyWorking}
          />
        </div>

        <FormInputTextArea
          label="Description"
          name="description"
          placeholder="Enter Job Description"
          wrapperClassName="col-span-2"
        />
      </div>
    </div>
  );
};

export default ExperienceInfoForm;
