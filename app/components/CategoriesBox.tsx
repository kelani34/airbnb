"use client";

import { IconType } from "react-icons";

interface Props {
  icon: IconType;
  label: String;
  selected: String;
}
const CategoriesBox: React.FC<Props> = ({ icon: Icon, label, selected }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected
          ? "border-b-neutral-800 text-neutral-800"
          : " border-transparent text-neutral-500"
      }`}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoriesBox;
