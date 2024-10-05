// import AcmeLogo from '@/app/ui/acme-logo';

import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <section className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[450px] flex-col space-y-2.5 md:-mt-32">
        <LoginForm />
      </div>
    </section>
  );
}
