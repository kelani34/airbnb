"use client";

import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";

import CategoriesBox from "../CategoriesBox";
import Container from "../Container";
import { usePathname, useSearchParams } from "next/navigation";

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
  {
    label: "Countryside",
    icon: TbMountain,
    desc: "This property is in the countryside!",
  },
  {
    label: "Pools",
    icon: TbPool,
    desc: "This is property has a beautiful pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    desc: "This property is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    desc: "This property is near a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    desc: "This property has skiing activies!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    desc: "This property is an ancient castle!",
  },
  {
    label: "Caves",
    icon: GiCaveEntrance,
    desc: "This property is in a spooky cave!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    desc: "This property offers camping activities!",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    desc: "This property is in arctic environment!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    desc: "This property is in the desert!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    desc: "This property is in a barn!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    desc: "This property is brand new and luxurious!",
  },
];
const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <div>
      <Container>
        <div className="pt-4 flex items-center justify-between overflow-x-auto">
          {categories.map((item) => (
            <CategoriesBox
              key={item.label}
              label={item.label}
              selected={item.label === category}
              icon={item.icon}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
