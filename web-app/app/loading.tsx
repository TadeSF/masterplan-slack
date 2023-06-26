"use client";
import React from "react";
import { useI18nContext } from "@/i18n/i18n-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Loading() {
  const { LL } = useI18nContext();

  return (
    <div className="flex justify-center items-center my-20">
      <div
        className="flex flex-col justify-center items-center gap-10"
        role="status"
      >
        <div>
          <FontAwesomeIcon icon={faSpinner} className="text-dmun fa fa-spin" style={{ fontSize: "3rem" }} />
        </div>
        <div>{LL.LOADING_PAGE()}</div>
      </div>
    </div>
  );
}
