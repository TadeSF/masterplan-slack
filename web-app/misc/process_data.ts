export default function processData(
  data: any,
  informationColumnames: any,
  indicators: any
) {
  // Return null if data is null or not an object
  if (!data || typeof data !== "object") return null;

  // Create a Set of blacklisted column names for constant-time lookup
  const columnNamesBlacklist = new Set(
    informationColumnames.map((obj: any) => obj.name)
  );

  // Create a map from column type to column name for efficient lookups
  const columnTypeToName = Object.fromEntries(
    informationColumnames.map((obj: any) => [obj.type, obj.name])
  );

  // Create a list of unique person names, excluding blacklisted column names
  // Persons are defined as column names that are not blacklisted
  const persons = [...new Set(Object.values(data).flatMap(Object.keys))].filter(
    (name) => !columnNamesBlacklist.has(name)
  );

  // For each person, create an object with their name and data
  return persons.map((person, i) => {
    // Select rows where the person is defined and map each row to an object containing relevant information
    const personData = Object.values(data)
      .filter((row) => row[person] !== undefined)
      .map((row, eventId) => {
        // Retrieve basic information by type from the row
        const basicInfo = [
          "time",
          "until",
          "task",
          "description",
          "location",
        ].reduce((info, type) => {
          info[type] = row[columnTypeToName[type]];
          return info;
        }, {});

        // Collect generic information from the row
        const genericInformation = Object.fromEntries(
          Object.entries(row).filter(
            ([columnName]) =>
              columnNamesBlacklist.has(columnName) &&
              informationColumnames.find((obj: any) => obj.name == columnName)
                .type == "generic"
          )
        );

        // Find responsible persons in the row
        const responsiblePersons = Object.keys(row).filter(
          (columnName) =>
            !columnNamesBlacklist.has(columnName) &&
            row[columnName] == indicators.responsible
        );

        // Find other participants in the row
        const otherPersons = Object.keys(row).filter(
          (columnName) =>
            !columnNamesBlacklist.has(columnName) &&
            columnName !== person &&
            row[columnName] == indicators.participant
        );

        console.log("basicInfo")
        console.log(genericInformation)
        console.log(otherPersons);

        // Combine all information into a single object and add an event id
        return {
          id: eventId,
          ...basicInfo,
          genericInformation,
          responsiblePersons,
          otherPersons,
        };
      });

    // Return an object representing the person and their associated data
    return { person, data: personData };
  });
}
