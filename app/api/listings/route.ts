import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.redirect("/login");
  }
  const body = await req.json();
  const {
    title,
    description,
    price,
    category,
    image,
    roomCount,
    bathroomCount,
    guestCount,
    location,
  } = await body;

  Object.keys(body).forEach((key: any) => {
    if (body[key] === "") {
      NextResponse.error();
    }
  });

  const listings = await prisma.listings.create({
    data: {
      title,
      description,
      category,
      image,
      roomCount,
      bathroomCount,
      guestCount,
      location: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  // return NextResponse.redirect(`/listings/${listing.id}`);
  return NextResponse.json(listings);
}
