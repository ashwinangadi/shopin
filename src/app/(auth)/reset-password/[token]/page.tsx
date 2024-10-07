import NewPassword from "@/components/auth/new-password";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resetPassword } from "@/lib/actions";
import Link from "next/link";
import React from "react";

const NewPasswordPage = async ({ params }: { params: { token: string } }) => {
  const { token } = params;
  const decodedHashToken = decodeURIComponent(token);
  // console.log(decodedHashToken);
  const response = await resetPassword(decodedHashToken);
  return (
    <section className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[450px] flex-col space-y-2.5 md:-mt-32">
        {response?.success ? (
          <NewPassword token={decodedHashToken} />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen m-1 gap-5">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center ">
                  {response?.error}!
                </CardTitle>
              </CardHeader>
              <CardContent className="w-full">
                <Link href="/reset-password" className="text-center w-full hover:underline font-medium  text-blue-600 hover:text-blue-700">
                  <p>Request another link</p>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewPasswordPage;
