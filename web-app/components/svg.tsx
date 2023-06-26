import React from "react";
import { FileUpload } from 'primereact/fileupload';
import { Message } from "primereact/message";

export default function SVG() {
  return (
    <>
      <Message severity="error" text="SVG import not yet implemented" className="w-full" />
      <FileUpload
        name="SVGFile"
        url="./upload.php"
        mode="advanced"
        accept=".svg"
        maxFileSize={1000000}
        emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
        chooseLabel="SVG Importieren"
        uploadLabel="Hochladen"
        cancelLabel="Abbrechen"
        className="w-full"
      />
    </>
  )
}