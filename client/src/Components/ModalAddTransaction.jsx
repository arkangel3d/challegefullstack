import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import FormTransaction from './FormTransaction';
import { validateTransaction } from '../utils/validateData';
import { useParams } from 'react-router-dom';
import formatDate from '../utils/date'
import setRequest from '../utils/setRequest';

function ModalTransaction({state, getTransactions, setTransactions,data, setActive, setActiveUpdate}) {
  const token = localStorage.getItem('token');
  const option = {
    headers: {authorization: `Bearer ${token}`}
  };
  const userId = JSON.parse(localStorage.getItem('user'));
    const { id } = useParams();
    const [update, setUpdate] = useState(false);
    const [onDelete, setOnDelete] = useState(false);
    const [transaction, setTransaction] = useState({
         type: "",
         amount: "" ,
         description: "" ,
         category: "" ,
    });
    const [error, setError] = useState({
        mensage: '',
          field : '',
          ready : false
    });
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    if(setActive){
     return setActive(false)
    }
    setActiveUpdate(false)
  };
    
  useEffect(() => {
        setShow(true)
        return () => {
            setShow(false)
           
                setTransaction({
                    type: "",
                    amount: "" ,
                    description: "" ,
                    category: "" ,
         
                }); 
                
            }
    }, [state]);

    useEffect(() => {
        
        if(data){
            setTransaction(data)
            setUpdate(true)
        }
        
    }, [data]);
    useEffect(() => {
      
        setError(validateTransaction(transaction))
        
    }, [transaction]);
   

  const handleOnSubmit = async () => {
    transaction.amount = parseFloat(transaction.amount).toFixed(2);
  
    if(update){
    
     try {
      const dataUpdate = {
        type : transaction.type,
        category : transaction.category,
        amount : transaction.amount,
        description : transaction.description,
        id : transaction.id,
        idUser : userId.id

      };
        
       await setRequest('put',option,`transaction/${transaction.id}`,dataUpdate);
       
       await getTransactions();
       return handleClose(); 
    } catch (error) {
        setError({
            mensage: error.response.data.message,
        });
        alert('reload the page and try again')
    }
    };

    try {
      let date = new Date();
      transaction.date = formatDate(date);
        const response = await setRequest('post',option,`transaction/${id}`,transaction);
        console.log(response.data.message)
        await getTransactions();
        handleClose(); 
    } catch (error) {
      
        setError({
            mensage: error.response.data.message,
        });
        alert('reload the page and try again')
    }
  
  };

  const handleOnDelete = ()=>{
      setOnDelete(true)
  };
  const handleOnclik = async (e)=>{
    try {
      if(e.target.name === 'yes'){
        await setRequest('delete',option,`transaction/${transaction.id}?id=${userId.id}`);
        await getTransactions();
          handleClose(); 
      }
      return setOnDelete(false)
    } catch (error) {
      alert('reload the page and try again')
    }
    
  }

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Register an expense or an income</Modal.Title>
          <span className="error">{error?.field}</span>
        </Modal.Header>
        <Modal.Body>
          <FormTransaction transaction = {transaction} setTransaction={setTransaction} update={update}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {!onDelete && <Button onClick={handleOnSubmit} variant="primary" disabled={error.field.length && true}>Submit</Button>}
          {data && !onDelete && <Button onClick={handleOnDelete}>Delete</Button>} 
          {onDelete && <><span>are you sure?</span><Button onClick={ (e)=>handleOnclik(e)}name='yes'>Yes</Button> <Button  onClick={ (e)=>handleOnclik(e)}>No</Button></>}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalTransaction;