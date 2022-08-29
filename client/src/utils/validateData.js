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
export const validateCategory = (data) => {
 if(data){ //se valida data para evitar errores en renderizado
  let errors = {
    field : '',
    ready : false
};
if(data.name === '') {
errors.field = 'name is required'

}
if(errors.field.length === 0) {
   errors = {
    field : '',
    ready : true
  }
  return errors;
}

return errors;
 }
 
};
export const validateTransaction = (data) => {
 if(data){
  
  const { type, category, amount, description } = data;
  let errors = {
          field : '',
          ready : false
  };
  if(!type || !category || !amount || !description) {
     errors.field = 'All fields are required'
    
  }
    if(errors.field.length === 0) {
      
         errors = {
          field : '',
          ready : true
        }
        return errors;
    }
      
  return errors;
 }
}