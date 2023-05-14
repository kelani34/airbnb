"use client";

import { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoriesInput from "../Inputs/CategoriesInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../Inputs/CountrySelect";
import Map from "../Map";
import { latLng } from "leaflet";
import dynamic from "next/dynamic";
import Counter from "../Inputs/Counter";
import ImageUpload from "../Inputs/ImageUpload";
import Input from "../Inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}
const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
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
  const bathroomCountRes = watch("bathroomCount");
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

  const handelSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) return handleNext();

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing created successfully");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Oops! Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          value={bathroomCountRes}
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
  if (step === STEPS.DESCRIPTION) {
    body = (
      <div className=" flex flex-col gap-8">
        <Heading title="Describe your place" subtitle="Showcase your place" />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }
  if (step === STEPS.PRICE) {
    body = (
      <div className=" flex flex-col gap-8">
        <Heading
          title="How much do you want to charge?"
          subtitle="Set a price per night"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
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
      onSubmit={handleSubmit(handelSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step !== STEPS.CATEGORY ? handlePrev : undefined}
    />
  );
};

export default RentModal;
