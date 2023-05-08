"use client";

import { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoriesInput from "../Inputs/CategoriesInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../Inputs/CountrySelect";
import Map from "../Map";
import { latLng } from "leaflet";
import dynamic from "next/dynamic";
import Counter from "../Inputs/Counter";
import ImageUpload from "../Inputs/ImageUpload";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}
const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathRoomCount: 1,
      image: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const categoryRes = watch("category");
  const locationRes = watch("location");
  const guestCountRes = watch("guestCount");
  const roomCountRes = watch("roomCount");
  const bathRoomCountRes = watch("bathRoomCount");
  const imageRes = watch("image");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [locationRes]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const handlePrev = () => {
    setStep((step) => step - 1);
  };
  const handleNext = () => {
    setStep((step) => step + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) return "Create";
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) return undefined;
    return "Previous";
  }, [step]);

  let body = (
    <div className="flex flex-col gap-8">
      <Heading
        center
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((category) => (
          <div key={category.label} className="col-span-1">
            <CategoriesInput
              onClick={(category) => setCustomValue("category", category)}
              selected={categoryRes === category.label}
              label={category.label}
              icon={category.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    body = (
      <div className=" flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you"
        />
        <CountrySelect
          value={locationRes}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={locationRes?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    body = (
      <div className=" flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCountRes}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCountRes}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="bathRooms"
          subtitle="How many bathrooms do you have?"
          value={bathRoomCountRes}
          onChange={(value) => setCustomValue("bathRoomCount", value)}
        />
        <hr />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    body = (
      <div className=" flex flex-col gap-8">
        <Heading
          title="Upload some images of your place"
          subtitle="Showcase your place"
        />
        <ImageUpload
          value={imageRes}
          onChange={(value) => setCustomValue("image", value)}
        />
      </div>
    );
  }
  return (
    <Modal
      title="Airbnb your home"
      body={body}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step !== STEPS.CATEGORY ? handlePrev : undefined}
    />
  );
};

export default RentModal;
