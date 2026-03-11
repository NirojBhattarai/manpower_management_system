import QUERY_PARAMS from "@/constant/query-params";
import { useQueryParamState } from "@/hooks/use-query-params-state";
import { Pencil } from "lucide-react";

interface MembershipCardProps {
  companyName: string;
  companyRegistrationNumber: string;
  registrationDate: string;
  panNumber: string;
  managingDirector: string;
  licenseNumber: string;
}

const MembershipCard: React.FC<MembershipCardProps> = ({
  companyName,
  companyRegistrationNumber,
  registrationDate,
  panNumber,
  managingDirector,
  licenseNumber,
}) => {
  const updateMembership = useQueryParamState(
    QUERY_PARAMS.membership.updateMembership.key,
  );

  const Field = ({ label, value }: { label: string; value: string }) => (
    <div className="bg-gray-50 hover:bg-gray-100 p-4 border border-gray-100 rounded-lg transition">
      <p className="mb-1 font-medium text-gray-500 text-xs uppercase tracking-wide">
        {label}
      </p>
      <p className="font-semibold text-gray-800 text-sm wrap-break-word">
        {value || "-"}
      </p>
    </div>
  );

  return (
    <div className="bg-white shadow-sm hover:shadow-md p-6 border border-gray-200 rounded-xl transition">
      <div className="flex justify-between items-center mb-6 pb-4 border-gray-200 border-b">
        <div className="flex justify-between items-center w-full">
          <p className="font-semibold text-md text-text-500">
            Department of Foreign Employment
          </p>
          <span>
            <Pencil
              className="text-green-500 hover:text-green-800 hover:scale-125 transition-all duration-300 cursor-pointer shrink-0"
              size={16}
              onClick={() => updateMembership.setValue("updateMembership")}
            />
          </span>
        </div>
      </div>

      {/* Info Grid */}
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Company Name" value={companyName} />
        <Field
          label="Company Registration Number"
          value={companyRegistrationNumber}
        />
        <Field label="Registration Date" value={registrationDate} />
        <Field label="PAN Number" value={panNumber} />
        <Field label="Managing Director" value={managingDirector} />
        <Field label="License Number" value={licenseNumber} />
      </div>
    </div>
  );
};

export default MembershipCard;
