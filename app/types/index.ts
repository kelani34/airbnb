import { Listings, User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: String;
  updatedAt: String;
  emailVerified: String;
};

export type SafeListing = Omit<Listings, "createdAt"> & {
  createdAt: string;
};
