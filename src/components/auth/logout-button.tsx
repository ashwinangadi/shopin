import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "../../../auth";

const LogoutButton = ({ className }: { className?: string }) => {  
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button variant={"ghost"} className={cn(className)}>
        {" "}
        Logout
      </Button>
    </form>
  );
};

export default LogoutButton;
