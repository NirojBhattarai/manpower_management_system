import FormInputDate from "@/components/form/form-input-date";
import FormInputSelect, { IOption } from "@/components/form/form-input-select";
import FormInputText from "@/components/form/FormInputText";
import useLocationsList from "../hooks/use-get-locations";
import { useFormikContext } from "formik";
import { PersonalDetailsSchemaType } from "../schema/personal-details-schema";
import { useEffect } from "react";
import { LocationListItem } from "../interface/personal-details-interface";

const PersonalDetailsForm = () => {
  const { LocationsListResponse } = useLocationsList();
  const { values, setFieldValue } =
    useFormikContext<PersonalDetailsSchemaType>();

  const provinceOption: IOption[] =
    LocationsListResponse?.data?.records?.map((item: LocationListItem) => ({
      label: item.province,
      value: item.province,
    })) || [];

  const selectedProvince = LocationsListResponse?.data?.records?.find(
    (item: LocationListItem) => item.province === values.province,
  );

  const districtOption: IOption[] =
    selectedProvince?.districts?.map((district: string) => ({
      label: district,
      value: district,
    })) || [];

  useEffect(() => {
    if (!values.province || !LocationsListResponse?.data) return;

    const provinceData = LocationsListResponse.data?.records?.find(
      (item: LocationListItem) => item.province === values.province,
    );

    if (!provinceData) return;

    const isValidDistrict = provinceData.districts.includes(values.district);

    if (!isValidDistrict) {
      setFieldValue("district", "");
    }
  }, [values.province, LocationsListResponse]);

  return (
    <div className="space-y-6">
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        <FormInputText
          label="Full Name"
          name="fullName"
          placeholder="Enter Your First Name"
        />

        <FormInputText
          label="Passport No."
          name="passportNumber"
          placeholder="Enter Passport Number"
        />

        <FormInputDate
          label="Date Of Birth"
          name="dateOfBirth"
          placeholder="Enter your Date of Birth"
        />

        <FormInputSelect
          label="Birth Place"
          name="birthPlace"
          placeholder="Select Your Birth Place"
          options={[{ label: "Nepal", value: "nepal" }]}
        />

        <FormInputText
          label="Father Name"
          name="fatherName"
          placeholder="Enter Father Name"
        />

        <FormInputText
          label="Mother Name"
          name="motherName"
          placeholder="Enter Mother Name"
        />
      </div>

      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        <FormInputSelect
          label="Province"
          name="province"
          options={provinceOption}
        />

        <FormInputSelect
          label="District"
          name="district"
          options={districtOption}
        />

        <FormInputText
          label="Municipality"
          name="municipality"
          placeholder="Enter Your Municipality"
        />

        <FormInputText
          label="Ward No."
          name="wardNumber"
          placeholder="Enter Your Ward No."
        />
      </div>

      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        <FormInputText
          label="Phone Number"
          name="phone"
          placeholder="Enter Phone Number"
        />

        <FormInputText
          label="Email Address"
          name="email"
          placeholder="Enter Email"
        />
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
