
// utils/index.js

export const getErrors = error => {
    let messages = [];
    if (error.response) {
      if (error.response.status >= 500) {
        messages = [`An error occured. Try again Later ${error.response.status}`];
        return messages;
      }
      const errors = error.response.data;
      for (let key in errors) {
        if (typeof errors[key] == "string") {
          messages.push(errors[key]);
        } else {
          messages.push(errors[key][0]);
        }
      }
    } else {
      messages = ["An Error occured"];
    }
    return messages;
  };
  
  export const BASE_URL = 'http://localhost:8000'