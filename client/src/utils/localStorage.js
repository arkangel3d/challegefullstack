export const setLocalStore = (data) => {
      
    const setStore = new Promise ((resolve, reject) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      resolve(data);
      reject('error');
    })
    return setStore;
  };