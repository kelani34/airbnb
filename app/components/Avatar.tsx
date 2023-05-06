"use client";

import Image from "next/image";
import React from "react";

interface Props {
  src: string | undefined | null;
}
const Avatar: React.FC<Props> = ({ src }) => {
  return (
    <Image
      className="rounded-full"
      height={30}
      width={30}
      alt="avatar"
      src={src || "/images/avatar.jpg"}
    />
  );
};

export default Avatar;
