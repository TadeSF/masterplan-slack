import React, { useContext } from "react";
import { FileUpload } from 'primereact/fileupload';
import * as XLSX from 'xlsx';
import { DataContext } from "@/contexts/data";
import { useI18nContext } from "@/i18n/i18n-react";

export default function Excel() {
  const { LL } = useI18nContext();
  
  const { setData } = useContext(DataContext);


  const handleFileUpload = async (event) => {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });

      let data: any = [];
      for (const sheetName of workbook.SheetNames) {
        const worksheet = workbook.Sheets[sheetName];
        data.push({ sheetName: sheetName, data: XLSX.utils.sheet_to_json(worksheet, { raw: true }) });
      }
      setData(data);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <>
      <FileUpload
        name="ExcelFile"
        mode="advanced"
        accept=".xlsx"
        maxFileSize={100000000}
        emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>}
        chooseLabel="Excel Importieren"
        uploadLabel="Hochladen"
        cancelLabel="Abbrechen"
        className="w-full"
        customUpload
        removeIcon
        uploadHandler={handleFileUpload}
        onRemove={() => setData(null)}
        onClear={() => setData(null)}
      />
    </>
  )
}