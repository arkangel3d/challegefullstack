export const validate = (data) => {
    const { name, lastName, email, password, password2 } = data;
    let errors = {
            field : '',
            passwordError : '',
            ready : false
    };
    if(!name || !lastName || !email || !password || !password2) {
       errors.field = 'All fields are required'
      
    }
    if(password !== password2) {
      errors.passwordError = 'Passwords do not match';
    }
      if(errors.field.length ===0 && errors.passwordError.length === 0) {
           errors = {
            field : '',
            passwordError : '',
            ready : true
          }
          return errors;
      }
        
    return errors;
}