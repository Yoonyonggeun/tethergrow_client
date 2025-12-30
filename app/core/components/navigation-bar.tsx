// Navigation Bar Component
import { User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import LangSwitcher from "./lang-switcher";

import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { SheetClose } from "./ui/sheet";

// AuthButtons Component
function AuthButtons() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-2">
      {/* Sign in button (less prominent) */}
      <Actions />
      <Separator orientation="vertical" />
      <Button asChild>
        <SheetClose asChild>
          <Link to="/auth/login" viewTransition>
            {t("navigation.login")}
          </Link>
        </SheetClose>
      </Button>
    </div>
  );
}

// Actions Component
function Actions() {
  return (
    <>
      <LangSwitcher />
    </>
  );
}

// NavigationBar Component
export function NavigationBar({
  email,
  loading,
}: {
  email?: string;
  loading: boolean;
}) {
  return (
    <nav
      className={
        "fixed top-0 left-0 z-100 mx-auto flex h-16 w-full items-center justify-between border-b px-5 shadow-xs backdrop-blur-lg transition-opacity md:px-10"
      }
    >
      <div className="mx-auto flex h-full w-full max-w-screen-2xl items-center justify-between py-3">
        {/* Application logo/title with link to home */}
        <Link to="/">
          <img
            src="/images/logo/tethergrow_logo_dark_mode_full.svg"
            alt="logo"
            className="h-6"
          />
        </Link>

        <div>
          {loading ? (
            <div className="flex items-center">
              <div className="bg-muted-foreground/20 size-8 animate-pulse rounded-lg" />
            </div>
          ) : (
            <></>
            // <>
            //   {email ? (
            //     <div className="flex items-center gap-2">
            //       <Actions />
            //       <Separator orientation="vertical" />
            //       <Link to="/dashboard">
            //         <Avatar className="size-8 cursor-pointer rounded-lg">
            //           <AvatarFallback>
            //             <User />
            //           </AvatarFallback>
            //         </Avatar>
            //       </Link>
            //     </div>
            //   ) : (
            //     <AuthButtons />
            //   )}
            // </>
          )}
        </div>
      </div>
    </nav>
  );
}
