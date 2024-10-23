import { SelectSeparator } from "@/components/ui/select";
import React from "react";

const AccountPage = () => {
  return (
    // TODO: Add User name in the session data of credentials, Only getting user name from the Google and Github providers.
    <div className="flex flex-col gap-2 ">
      <h1 className="text-xl font-medium py-3 px-5">My Account</h1>
      <SelectSeparator className="w-full" />
      <p className="text-sm text-gray-500">Coming Soon...</p>
    </div>
  );
};

export default AccountPage;
