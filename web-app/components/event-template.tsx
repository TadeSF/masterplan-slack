import React from "react";
import { Card } from "primereact/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faInfoCircle, faLocationDot, faUserTie, faUsers } from "@fortawesome/free-solid-svg-icons";


export default function EventTemplate({ item }: { item: any }) {
    console.log("Hello")
    console.log(item)
    return (
        <Card className="mb-6">
            <div className="grid gap-2 items-center" style={{ gridTemplateColumns: "auto 1fr" }}>
                <FontAwesomeIcon icon={faClock} />
                {`${item.time} Uhr ${item.until ? ("bis " + item.until + " Uhr") : ""}`}
                {item.location && (
                    <>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <div>{item.location}</div>
                    </>
                )}
                {item.description && (
                    <>
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <div>{item.description}</div>
                    </>
                )}
                {item.responsiblePersons.length > 0 && (
                    <>
                        <FontAwesomeIcon icon={faUserTie} />
                        <div>{item.responsiblePersons}</div>
                    </>
                )}
                {item.otherPersons.length > 0 && (
                    <>
                        <FontAwesomeIcon icon={faUsers} />
                        <div>{item.otherPersons.map((person: any, index: number) => (
                            <span key={index}>{person} </span>
                        ))
                        }</div>
                    </>
                )}
            </div>
        </Card>
    )
}