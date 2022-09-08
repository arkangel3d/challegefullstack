import axios from 'axios';
import { urlApi } from './config';
const setRequest = async (type,options,url,body=null) =>{
    if(type === 'delete'){
        const request = await axios[type](`${urlApi}/${url}`,options);
        console.log(request)
        return request
    };
    const request = await axios[type](`${urlApi}/${url}`,body,options)
    return request
};

export default setRequest;