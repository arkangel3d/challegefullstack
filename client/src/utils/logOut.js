

const logOut = (item)=>{
    const deleteLocalStorege = new Promise((resolve, reject)=>{
        
        if(!localStorage){
            reject('error')
        }
          
        const deleteItem = localStorage.removeItem(item); 
         return resolve(deleteItem);

          
    })
    return deleteLocalStorege
    };

export default logOut;
