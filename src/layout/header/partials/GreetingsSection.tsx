import React, { useEffect, useState } from "react";
import { Sun, CloudSun, Moon } from "lucide-react";

interface IGreetingsSectionProps {
  name: string;
}
const GreetingsSection: React.FC<IGreetingsSectionProps> = ({ name }) => {
  const [greeting, setGreeting] = useState("");
  const [Icon, setIcon] = useState<any>(Sun);

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      setGreeting("Good Morning");
      setIcon(() => Sun);
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
      setIcon(() => CloudSun);
    } else {
      setGreeting("Good Evening");
      setIcon(() => Moon);
    }
  }, []);

  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <Icon className="w-4 h-4 text-blue-500" />

      <h1 className="font-semibold text-slate-800 text-sm tracking-tight">
        {greeting},<span className="ml-1 font-bold text-blue-600">{name}</span>
      </h1>

      <span className="bg-slate-300 ml-2 w-px h-4" />

      <span className="text-slate-500 text-xs">
        {new Date().toLocaleDateString(undefined, {
          weekday: "short",
          day: "numeric",
          month: "short",
        })}
      </span>
    </div>
  );
};

export default GreetingsSection;
