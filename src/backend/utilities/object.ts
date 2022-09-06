/**
 * Check if an object contain some fields ( key-value pair ).
 * @param obj The object to check
 * @param fields An object that contains all fields to search.
 */
export const objectContainsFields = (
  obj: { [key: string]: any },
  fields: { [key: string]: any }
) => {
  for (const field in fields) {
    if (obj[field] !== fields[field]) return false;
  }
  return true;
};
