
const TransactionRender = ({data, handleOnclik}) => {
  
    const { id, type, category, amount, description, date } = data;
   
    return(
        
        <tr key={id} id={id} name={id} onClick={ (e)=>handleOnclik(e)}>
          <td>{id}</td>
          <td>{type}</td>
          <td>{category}</td>
          <td>${amount}</td>
          <td>{description}</td>
          <td>{date}</td>
        </tr>
     
    )
};

export default TransactionRender;