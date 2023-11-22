import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
  } = body;

  // check if any of fields are empty
  Object.keys(body).forEach((key: any) => {
    if (!body[key]) {
      return NextResponse.error();
    }
  });

  const listing = await prisma.listing.create({
    data: {
      category,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      locationValue: location.value,
      price: parseInt(price, 10),
      title,
      description,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
