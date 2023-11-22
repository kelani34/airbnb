"use client";

import Image from "next/image";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import useCountries from "@/app/hooks/useCountries";
import HeartButton from "../HeartButton";
import Button from "../Button";

type Props = {
  data: SafeListing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
  disabled?: boolean;
};

const ListingCard = ({
  data,
  reservation,
  onAction,
  actionLabel,
  actionId = "",
  currentUser,
  disabled,
}: Props) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    } else {
      return data.price;
    }
  }, [data, reservation]);

  const reservationDate = useMemo(() => {
    if (reservation) {
      const start = new Date(reservation.startDate);
      const end = new Date(reservation.endDate);
      return `${format(start, "PP")} - ${format(end, "PP")}`;
    } else {
      return null;
    }
  }, [reservation]);

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            src={data.imageSrc}
            alt="listing image"
            fill
            className="object-cover w-full h-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>

        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light"> night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
