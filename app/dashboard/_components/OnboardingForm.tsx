"use client";

import { updateUserProfile } from "@/app/actions/user.actions";
import { AvailabilityType, UserType } from "@/lib/propTypes";
import {
  availability,
  UserConfigurationForm,
  userConfigurationSchema,
} from "@/lib/schemas/userConfigurationSchema";
import {
  setName,
  setProfileConfigured,
  setSkillsOffered,
} from "@/store/slices/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

function OnboardingForm({
  existingSkills,
  details,
}: {
  existingSkills: string[] | undefined;
  details: UserType | null | undefined;
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserConfigurationForm>({
    resolver: zodResolver(userConfigurationSchema),
    defaultValues: {
      skillsOffered: [{ value: "" }],
    },
  });

  async function onSubmit(data: UserConfigurationForm) {
    try {
      const res = await updateUserProfile(data);

      if (res?.success) {
        console.log("Profile saved!");
      } else {
        console.log("Error saving profile", res?.error);
      }

      const skills = data.skillsOffered.map((skill) => skill.value);

      dispatch(setName(data.name));
      dispatch(setSkillsOffered(skills));
      dispatch(setProfileConfigured(true));

      router.push("/");
    } catch (error) {
      console.error("Unexpected error while saving profile", error);
    }
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skillsOffered",
  });

  useEffect(
    function () {
      setValue("name", details?.name as string);
      setValue("availability", details?.availability as AvailabilityType);
      setValue(
        "skillsOffered",
        details?.skillsOffered.map((skill) => ({
          value: skill.name,
        })) as { value: string }[]
      );
    },
    [existingSkills, setValue]
  );

  if (isSubmitting) return <p>SUBMITTING, WAIT MF</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name: </label>
      <input {...register("name")} placeholder="Name" />
      {errors.name && <p>{errors.name.message}</p>}

      <br />

      <div>
        {availability.map((availabityOption) => (
          <div key={availabityOption}>
            <label>
              {availabityOption}
              <input
                type="checkbox"
                value={availabityOption}
                {...register("availability")}
              />
            </label>
          </div>
        ))}
        {errors.availability && <p>{errors.availability.message}</p>}
      </div>

      <br />
      <div>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <label>Skill {index + 1}</label>
              <input {...register(`skillsOffered.${index}.value`)} />
              <button type="button" onClick={() => append({ value: "" })}>
                Add
              </button>
              {index > 0 && (
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              )}
            </div>
          );
        })}
        {errors.skillsOffered && (
          <p style={{ color: "red" }}>{errors.skillsOffered.message}</p>
        )}
      </div>

      <br />

      <button type="submit">Save Details</button>
    </form>
  );
}
export default OnboardingForm;
