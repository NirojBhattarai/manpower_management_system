import FormInputDate from "@/components/form/form-input-date";
import FormInputSelect, { IOption } from "@/components/form/form-input-select";
import { OrientationStatusType } from "../schema/orientation-schema";
import FormAsyncInputSelect from "@/components/form/form-async-input-select";
import { endpoints } from "@/api/endpoints";

export const orientationStatusOption: IOption<OrientationStatusType>[] = [
  { label: "Scheduled", value: "scheduled" },
  { label: "Attended", value: "attended" },
  { label: "Not Attended", value: "not-attended" },
];

const OrientationForm = () => {
  return (
    <div className="gap-4 grid grid-cols-1">
      <FormAsyncInputSelect
        fetchUrl={endpoints.orientationInstitute.list}
        label="Orientation Institute"
        name="instituteName"
        labelKey="name"
        valueKey="id"
      />
      <FormInputDate label="Orientation Date" name="orientationDate" />
      <FormInputDate
        label="Orientation Expire Date"
        name="orientationExpireDate"
      />
      <FormInputSelect
        label="Orientation Status"
        name="orientationStatus"
        options={orientationStatusOption}
      />
    </div>
  );
};
export default OrientationForm;
