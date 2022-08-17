
const TransactionRender = ({data}) => {
  
    const { id, type, category, amount, description, date } = data;
    
    return(
        
        <tr>
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