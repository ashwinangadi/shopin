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
import { updateUserProfile } from "@/lib/actions";
import { toast } from "sonner";
import { ZodError } from "zod";

const ProfileForm = ({ userId }: { userId: string | undefined }) => {
  const [isEditable, setIsEditable] = useState({
    fullName: false,
    username: false,
    email: false,
  });

  const {
    data: userAccount,
    isLoading: userAccountLoading,
    refetch,
  } = useAccount(userId);

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

  async function handleFieldSubmit(field: keyof typeof isEditable) {
    // TODO: disable buttons while the request is being made
    // TODO: data not updated in frontend immediately after updating in backend, verify account
    // TODO: add password field 
    return async (values: z.infer<typeof profileFormSchema>) => {
      try {
        if (userId === "671b4cf661c252de3b7855d8") {
          toast.error(
            "You are not authorised to update this account. Create your own account for better experience."
          );
          setIsEditable((prev) => ({ ...prev, [field]: false }));
          return;
        }

        // Create a sub-schema for the specific field
        const fieldSchema = z.object({
          [field]: profileFormSchema.shape[field],
        });

        // Validate only the specific field
        await fieldSchema.parseAsync({ [field]: values[field] });

        // Update the field in the database
        const result = updateUserProfile(userId!, {
          [field]: values[field],
        });

        toast.promise(result, {
          loading: `Updating ${field}...`,
          success: () => {
            setIsEditable((prev) => ({ ...prev, [field]: false }));
            refetch();
            return `${field} updated successfully`;
          },
          error: (error) => {
            form.setError(field, {
              type: "manual",
              message: typeof error === "string" ? error : "An error occurred",
            });
            return `Error updating ${field}: ${error}`;
          }
        });

        // if (result.success) {
        //   console.log(`${field} updated successfully:`, values[field]);
        //   toast.success(`${field} updated successfully`);
        //   setIsEditable((prev) => ({ ...prev, [field]: false }));
        // } else {
        //   console.error(`Error updating ${field}:`, result.error);
        //   toast.error(
        //     typeof result.error === "string"
        //       ? result.error
        //       : "An error occurred"
        //   );
        //   form.setError(field, {
        //     type: "manual",
        //     message:
        //       typeof result.error === "string"
        //         ? result.error
        //         : "An error occurred",
        //   });
        // }
      } catch (error) {
        console.error(`Error updating ${field}:`, error);
        if (error instanceof ZodError) {
          // Set the error for the specific field
          form.setError(field, {
            type: "manual",
            message: error.errors[0].message,
          });
        } else {
          toast.error((error as Error).message);
          form.setError(field, {
            type: "manual",
            message: (error as Error).message,
          });
        }
      }
    };
  }

  const toggleEdit = (field: keyof typeof isEditable) => {
    setIsEditable((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          const submitHandler = await handleFieldSubmit("fullName");
          await submitHandler(values);
        })}
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
                        form.handleSubmit(async (values) => {
                          const submitHandler =
                            await handleFieldSubmit("fullName");
                          await submitHandler(values);
                        })();
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
                        form.handleSubmit(async (values) => {
                          const submitHandler =
                            await handleFieldSubmit("username");
                          await submitHandler(values);
                        })();
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
                        form.handleSubmit(async (values) => {
                          const submitHandler =
                            await handleFieldSubmit("email");
                          await submitHandler(values);
                        })();
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
