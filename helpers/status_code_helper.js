const OK = (data, message = "Success") => ({
    code: 200,
    status: "OK",    
    message,
    data,
  });
  
  const NOT_FOUND = (message = "NOT FOUND!") => ({
    code: 404,
    status: "NOT FOUND",
    message,
  });
  
  const UNKNOWN = (message = "UNKNOW SERVER ERROR") => ({
    code: 500,
    status: "UNKNOWN SERVER ERROR",
    message,
  });
  
  const INVALID_ARGUMENT = (message = "INVALID_ARGUMENT") => ({
    code: 400,
    status: "INVALID ARGUMENT",
    message,
  });
  
  module.exports = { OK, NOT_FOUND, UNKNOWN, INVALID_ARGUMENT };
  