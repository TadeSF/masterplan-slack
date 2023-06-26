import React, { useContext, useEffect, useState } from "react";
import { faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import { PreSettingsContext } from "@/contexts/pre-settings";
import { Dropdown } from "primereact/dropdown";

export default function Columnnames() {

  const { columnNames, setColumnNames } = useContext(PreSettingsContext);

  useEffect(() => {
    console.log(columnNames);
  }, [columnNames]);

  return (
    <Panel header="Spaltennamen">
      <div className="flex flex-col gap-4">
        <div className="text-md">
          Hier musst du die Spaltennamen angeben, die in deiner Tabelle verwendet werden, die keine Personenspalten sind. Die Personenspalten werden automatisch erkannt. Spaltennamen und ihre Kategorien können nicht doppelt verwendet werden und müssen eindeutig sein. Die einzige Ausnahme bildet die "Generisch"-Kategorie, die für alle Spalten verwendet werden kann. Alle Spalten mit Kategorie "Generisch" werden am Ende des Termins angehängt.
        </div>
        {columnNames.length > 0 ? (
          <div className="flex flex-col gap-4">
            {columnNames.map((columnname: any) => (
              <div className="flex flex-row gap-4">
                <InputText
                  value={columnname.name}
                  onChange={(e) => {
                    const newColumnnames = [...columnNames];
                    newColumnnames[columnNames.indexOf(columnname)] = { name: e.target.value, type: columnname.type };
                    setColumnNames(newColumnnames);
                  }}
                  className="flex-1"
                />
                <Dropdown
                  options={[{ label: "Uhrzeit", value: "time" }, { label: "bis", value: "until" }, { label: "Task", value: "task" }, { label: "Ort", value: "location" }, { label: "Beschreibung", value: "description" }, { label: "Generisch", value: "generic"}]}
                  value={columnname["type"]}
                  onChange={(e) => {
                    // except for "generic" only one column can have a type
                    const newColumnnames = [...columnNames];
                    if (e.value !== "generic") {
                      if (columnNames.filter((column: any) => column.type === e.value).length > 0) {
                        newColumnnames[columnNames.indexOf(columnname)] = { name: columnname.name, type: "generic" };
                        setColumnNames(newColumnnames);
                      } else {
                        newColumnnames[columnNames.indexOf(columnname)] = { name: columnname.name, type: e.value };
                        setColumnNames(newColumnnames);
                      }
                    } else {
                      newColumnnames[columnNames.indexOf(columnname)] = { name: columnname.name, type: "generic" };
                      setColumnNames(newColumnnames);
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  icon={<FontAwesomeIcon icon={faTrash} />}
                  severity="danger"
                  onClick={() => {
                    const newColumnnames = [...columnNames];
                    newColumnnames.splice(columnNames.indexOf(columnname), 1);
                    setColumnNames(newColumnnames);
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-md">
            Es wurden keine Spaltennamen gefunden.
          </div>
        )}
        <div className="flex flex-row gap-4">
          <Button
            icon={<FontAwesomeIcon icon={faPlus} className="mr-3" />}
            label="Hinzufügen"
            severity="success"
            onClick={() => {
              setColumnNames([...columnNames, { name: "", type: "generic" }]);
            }}
          />
          <Button
            icon={<FontAwesomeIcon icon={faXmark} className="mr-3" />}
            label="Alle löschen"
            severity="danger"
            onClick={() => {
              setColumnNames([]);
            }}
          />
        </div>
      </div>
    </Panel>
  )
}