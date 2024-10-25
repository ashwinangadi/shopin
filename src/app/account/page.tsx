import { SelectSeparator } from "@/components/ui/select";
import React from "react";
import ProfileForm from "@/components/account/my-account/profile-form";
import { auth } from "../../../auth";

const AccountPage = async () => {
  const session = await auth();
  return (
    <div className="flex flex-col gap-2 ">
      <h1 className="text-xl font-medium py-3 px-5">My Account</h1>
      <SelectSeparator className="w-full" />
      <ProfileForm userId={session?.user?.id} />
    </div>
  );
};

export default AccountPage;
