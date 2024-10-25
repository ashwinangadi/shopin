"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { profileFormSchema } from "@/lib/zod";
import { useAccount } from "@/hooks/useAccount";
import VerifyAccount from "./verify-account";
import DeleteAccount from "./delete-account";

const ProfileForm = ({ userId }: { userId: string | undefined }) => {
  const [isEditable, setIsEditable] = useState({
    fullName: false,
    username: false,
    email: false,
  });

  const { data: userAccount, isLoading: userAccountLoading } =
    useAccount(userId);

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
    },
  });

  useEffect(() => {
    if (userAccount?.data) {
      form.reset({
        fullName: userAccount.data.fullName || "",
        username: userAccount.data.username || "",
        email: userAccount.data.email || "",
      });
    }
  }, [userAccount, form]);

  function handleFieldSubmit(field: keyof typeof isEditable) {
    return (values: z.infer<typeof profileFormSchema>) => {
      console.log({ [field]: values[field] });
      setIsEditable((prev) => ({ ...prev, [field]: false })); // Reset the specific field's edit state
    };
  }

  const toggleEdit = (field: keyof typeof isEditable) => {
    setIsEditable((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFieldSubmit("fullName"))}
        className="space-y-8 w-full max-w-lg mx-auto mt-5 lg:mt-20"
      >
        <VerifyAccount
          userAccount={userAccount}
          userAccountLoading={userAccountLoading}
        />

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Full Name</FormLabel>
                <span className="flex gap-2">
                  <Button
                    variant="outline"
                    type={"button"}
                    onClick={() => {
                      form.setValue(
                        "fullName",
                        userAccount?.data?.fullName || ""
                      );
                      form.clearErrors("fullName");
                      toggleEdit("fullName");
                    }}
                    className={`${!isEditable.fullName ? "hidden" : "block"}`}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                      if (isEditable.fullName) {
                        form.handleSubmit((values) =>
                          handleFieldSubmit("fullName")(values)
                        )();
                      } else {
                        toggleEdit("fullName");
                      }
                    }}
                  >
                    {isEditable.fullName ? "Save" : "Edit"}
                  </Button>
                </span>
              </div>
              <FormControl>
                <Input
                  placeholder="Full Name"
                  {...field}
                  disabled={!isEditable.fullName}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Username</FormLabel>
                <span className="flex gap-2">
                  <Button
                    variant="outline"
                    type={"button"}
                    onClick={() => {
                      form.setValue(
                        "username",
                        userAccount?.data?.username || ""
                      );
                      form.clearErrors("username");
                      toggleEdit("username");
                    }}
                    className={`${!isEditable.username ? "hidden" : "block"}`}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                      if (isEditable.username) {
                        form.handleSubmit((values) =>
                          handleFieldSubmit("username")(values)
                        )();
                      } else {
                        toggleEdit("username");
                      }
                    }}
                  >
                    {isEditable.username ? "Save" : "Edit"}
                  </Button>
                </span>
              </div>
              <FormControl>
                <Input
                  placeholder="Username"
                  {...field}
                  disabled={!isEditable.username}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Email</FormLabel>
                <span className="flex gap-2">
                  <Button
                    variant="outline"
                    type={"button"}
                    onClick={() => {
                      form.setValue("email", userAccount?.data?.email || "");
                      form.clearErrors("email");
                      toggleEdit("email");
                    }}
                    className={`${!isEditable.email ? "hidden" : "block"}`}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                      if (isEditable.email) {
                        form.handleSubmit((values) =>
                          handleFieldSubmit("email")(values)
                        )();
                      } else {
                        toggleEdit("email");
                      }
                    }}
                  >
                    {isEditable.email ? "Save" : "Edit"}
                  </Button>
                </span>
              </div>
              <FormControl>
                <Input
                  placeholder="Email"
                  {...field}
                  disabled={!isEditable.email}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DeleteAccount userId={userId} />
      </form>
    </Form>
  );
};

export default ProfileForm;
