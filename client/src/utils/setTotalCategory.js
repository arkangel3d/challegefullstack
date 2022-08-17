
const setTotalCategory = (filtered) => {
    const amount = new Promise((resolve, reject)=>{
        try{
            const total = filtered.map(item=>Number(item.amount)).reduce((prev,current)=>prev + current, 0)
            resolve(total)
        }catch(err){
            reject(err)
        }
    })
    return amount;
};

export default setTotalCategory;