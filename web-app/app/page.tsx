"use client";
import React, { useEffect, useState } from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import Image from "next/image";
import ImportSection from "@/components/import_section";


export default function Home() {
  const { LL } = useI18nContext();

  return (
    <>
    <div className="text-2xl font-bold">Masterplan Slackbot</div>
        <div className="text-md">
          Mit diesem Service kannst du aus deinem Masterplan in Tabellenform ganz einfach personalisierte Tagesabläufe an Slack-Benutzer senden.
          Eine Anleitung findest du <a href="/howto" className="decoration-solid decoration-dmun text-dmun">hier in unserem How-To</a>.
        </div>
      <ImportSection />
    </>
  )
}