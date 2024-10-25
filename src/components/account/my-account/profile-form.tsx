"use client";
import { SelectSeparator } from "@/components/ui/select";
import React, { useState } from "react";
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

const ProfileForm = () => {
  const [isEditable, setIsEditable] = useState({
    fullName: false,
    username: false,
    email: false,
  });

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      fullName: "Ashwin Angadi",
      username: "ashwin.angadi",
      email: "ashwin.angadi1@gmail.com",
    },
  });

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
                    onClick={() => toggleEdit("fullName")}
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
                    onClick={() => toggleEdit("username")}
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
                    onClick={() => toggleEdit("email")}
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

        <span className="flex justify-center pt-10">
          <Button
            variant="destructive"
            type="button"
            className="w-full max-w-xs mx-auto"
          >
            Delete Account
          </Button>
        </span>
      </form>
    </Form>
  );
};

export default ProfileForm;
