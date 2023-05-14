"use client";

import { useCountries } from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { Listings, Reservations } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface Props {
  data: Listings;
  reservation?: Reservations;
  onAction?: (id: string) => void;
  actionLabel?: string;
  disabled?: boolean;
  actionId?: string;
  user?: SafeUser | null;
}

const ListingCard: React.FC<Props> = ({
  data,
  reservation,
  onAction,
  actionLabel,
  actionId = "",
  user,
  disabled,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.location);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;
      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;

    return data.price;
  }, [data.price, reservation]);

  const reservationData = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            src={data.image}
            alt="listing"
            className="object-cover h-full w-full group-hover:scale-110 transition"
            fill
          />
          <div className=" absolute top-3 right-3">
            <HeartButton id={data.id} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
