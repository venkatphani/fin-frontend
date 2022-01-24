import validator from "validator";

export const isJSONFile = (sFilename) => {
  var regexJsonFile = new RegExp(".json$", "i");
  return regexJsonFile.test(sFilename);
};

const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

const isInputValid = (value, name) => {
  if (isEmpty(value)) return false;
  if (name === "userId" && validator.isNumeric(value.toString())) return true;
  if (name === "id" && validator.isNumeric(value.toString())) return true;
  if (name === "body") return true;
  if (name === "title") return true;
  return true;
};

export const getValidatedData = (data) => {
  let isValidGlobal = true;
  const validatedData = Object.keys(data).reduce((acc, x) => {
    const isValid = isInputValid(data[x], x);
    if (!isValid && isValidGlobal) isValidGlobal = false;
    acc[x] = isValid ? data[x] : "";
    return acc;
  }, {});
  return {
    data: validatedData,
    isValid: isValidGlobal,
  };
};

export const validateJSONData = (uploadedData, headerValidationFailedCallback) => {
  let finalData = [];
  let isValidGlobal = true;
  let dataParsed;
  try {
    dataParsed = JSON.parse(uploadedData);
  } catch (err) {
    headerValidationFailedCallback(true);
  }
  const ids = [];
  if (!Array.isArray(dataParsed)) {
    headerValidationFailedCallback(true);
    return { finalData, isValid: false };
  }
  for (let i = 0; i < dataParsed.length; i += 1) {
    const { userId = "", id = "", title = "", body = "" } = dataParsed[i];
    const dataToValidate = {
      userId,
      id,
      title,
      body,
    };
    const validatedResponse = getValidatedData(dataToValidate);
    let { isValid } = validatedResponse;
    if (id && ids.includes[id]) {
      isValidGlobal = false;
      isValid = false;
    } else if (id) {
      ids.push(id);
    }
    if (!isValid && isValidGlobal) {
      isValidGlobal = false;
      headerValidationFailedCallback(true);
    }
    if (isValid) {
      finalData.push({
        userId,
        id,
        title,
        body,
      });
    }
  }
  return { finalData, isValid: isValidGlobal };
};
