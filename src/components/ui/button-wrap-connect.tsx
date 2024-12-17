"use client";

import { usePrivy } from "@privy-io/react-auth";
import { Button } from "./button";
import { useTranslations } from "next-intl";

export const ButtonWrapConnect = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const t = useTranslations("common");
  const { login, authenticated } = usePrivy();

  if (!authenticated) {
    return (
      <Button type="button" className="w-full" onClick={() => login()}>
        {t("connect_wallet")}
      </Button>
    );
  }
  return <>{children}</>;
};
