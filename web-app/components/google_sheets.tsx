import React, { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from "primereact/message";
import { google } from 'googleapis';

export default function GoogleSheets() {
  const [sheetName, setSheetName] = useState<string>("")
  const [sheetId, setSheetId] = useState<string>("")
  const [showWarning, setShowWarning] = useState<boolean>(false)

  const extractGoogleSheetId = (input: string) => {
    if (input.startsWith("https://docs.google.com/spreadsheets/d/")) {
      console.log("Extracting sheet name")
      const match = input.match(/\/d\/(.+?)\//);
      match ? (
        setSheetId(match[1]),
        setShowWarning(true)
      ) : (
        setSheetId(input),
        setShowWarning(false)
      );
    } else {
      setSheetId(input);
      setShowWarning(false);
    }
  }

  const importGoogleSheet = async () => {
    const response = await fetch('/api/sheets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sheetId: sheetId,
        range: "A1:Z1000"
      })
    });
    const data = await response.json();
    console.log(data);
  }



    return (
      <>
        <Message severity="error" text="Google Sheets import not yet implemented" className="w-full" />
        <div className="flex gap-3 items-center w-full">
          <InputText placeholder="Link zum Sheet" className="flex-1" onInput={(event) => extractGoogleSheetId(event.currentTarget.value)} value={sheetId} />
          <Button label="Importieren" onClick={importGoogleSheet} />
        </div>
        {showWarning && <Message severity="warn" text="Die Sheet ID wurde automatisch aus dem Link extrahiert!" className="w-full" />}
        {sheetName !== "" && <Message severity="info" text={<>Das eingelesene Dokument heißt <strong>{sheetName}</strong></>} className="w-full" />}
      </>
    )
  }