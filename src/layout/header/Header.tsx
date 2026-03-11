import useGetProfile from "@/pages/auth/login/hooks/useGetProfile";
import GreetingsSection from "./partials/GreetingsSection";
import ProfileSection from "./partials/ProfileSection";

const Header = () => {
  const { userProfile } = useGetProfile();
  return (
    <header className="flex justify-between items-center u-gap-x bg-white p-2 border-text-50 border-b">
      <GreetingsSection name={userProfile?.data?.name} />
      <ProfileSection
        name={userProfile?.data?.name}
        email={userProfile?.data?.email}
      />
    </header>
  );
};

export default Header;
