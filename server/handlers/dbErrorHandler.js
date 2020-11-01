const getErrorMessage = (err) => {
  let message = "";
  try {
    if (err.code) {
      switch (err.code) {
        case 11000:
        case 11001:
          message = getUniqueErrorMessage(err);
          break;
        default:
          message = "Something went wrong with the database";
          break;
      }
    } else {
      for (let i in err.errors) {
        if (err.errors[i].message) {
          message = err.errors[i].message;
        }
      }
    }
  } catch (error) {
    message = `ISE: ${error.message}`;
  }
  return message;
};

const getUniqueErrorMessage = (err) => {
  let output;
  try {
    let fieldname = err.message.substring(
      err.message.lastIndexOf(".$") + 2,
      err.message.lastIndexOf("_1")
    );
    output =
      fieldname.charAt(0).toUpperCase() +
      fieldname.slice(1) +
      " already exists";
  } catch (error) {
    output = "Unique field already exists";
  }
  return output;
};

export default { getErrorMessage };
