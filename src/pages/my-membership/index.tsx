import NoDataFound from "@/components/NoDataFound";
import useMembershipDetails from "./hooks/use-get-membership";
import MembershipCard from "./partials/membership-card";
import MembershipHeader from "./partials/membership-header";
import MembershipModal from "./partials/membership-modal";

export default function MyMembership() {
  const { membershipDetails } = useMembershipDetails();
  const isDataAvailable = membershipDetails !== null;

  return (
    <div className="u-flex-parent">
      <MembershipHeader isDataAvailable={isDataAvailable} />

      <div className="mt-4">
        {isDataAvailable ? (
          <MembershipCard
            companyName={membershipDetails?.data?.companyName}
            companyRegistrationNumber={
              membershipDetails?.data?.companyRegistrationNumber
            }
            registrationDate={membershipDetails?.data?.registrationDate}
            panNumber={membershipDetails?.data?.panNumber}
            managingDirector={membershipDetails?.data?.managingDirector}
            licenseNumber={membershipDetails?.data?.licenseNumber}
          />
        ) : (
          <NoDataFound />
        )}
      </div>

      <MembershipModal />
    </div>
  );
}
