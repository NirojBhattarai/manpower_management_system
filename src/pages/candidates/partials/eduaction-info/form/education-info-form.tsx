import FormInputDate from "@/components/form/form-input-date";
import FormInputText from "@/components/form/FormInputText";
import FormSwitch from "@/components/form/FormSwitch";
import { useFormikContext } from "formik";
import { EducationSchemaType } from "../schema/education-info-schema";
import { useEffect } from "react";

const EducationInfoForm = () => {
  const { values, setFieldValue } = useFormikContext<EducationSchemaType>();

  useEffect(() => {
    if (values.currentlyStudying) {
      setFieldValue("endDate", "");
    }
  }, [values.currentlyStudying, setFieldValue]);

  return (
    <div className="space-y-6">
      <div className="gap-4 grid grid-cols-2">
        <FormInputText label="Degree" name="level" placeholder="Enter Degree" />

        <FormInputText
          label="Institute Name"
          name="instituteName"
          placeholder="Enter Institute Name"
        />

        <FormInputText
          label="Faculty Name"
          name="faculty"
          placeholder="Enter Faculty Name"
        />

        <div className="flex items-center">
          <FormSwitch
            title="Currently Studying"
            name="currentlyStudying"
            activeText="Yes"
            inActiveText="No"
          />
        </div>

        {/* Dates */}
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
            disabled={values.currentlyStudying} // ✅ disable if currentlyStudying
          />
        </div>
      </div>
    </div>
  );
};

export default EducationInfoForm;
