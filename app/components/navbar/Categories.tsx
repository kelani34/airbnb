"use client";

import Container from "../Container";
import { TbBeach } from "react-icons/tb";
import { GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoriesBox from "../CategoriesBox";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    desc: "This property is close to the beach",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    desc: "This property is has windmills",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    desc: "This property is a modern villa",
  },
];
const Categories = () => {
  return (
    <div>
      <Container>
        <div className="pt-4 flex items-center justify-between overflow-x-auto">
          {categories.map((item) => (
            <CategoriesBox
              key={item.label}
              label={item.label}
              // selected={item.label === "Beach"}
              icon={item.icon}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
