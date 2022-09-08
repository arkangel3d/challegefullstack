import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { urlApi } from "../utils/config";
import axios from "axios";
import FormCategory from './FormCategory';
import { validateTransaction } from '../utils/validateData';

function FormTransaction({transaction, setTransaction,update}) {

    const [newCategory, setNewCategory] = useState({
        name: "",
        type: "income",
    });
    const [active, setActive] = useState(false);
    const [category, setCategory] = useState([]);
    const [renderFormCategory, setRenderFormCategory] = useState(false);
    const [responseCategory, setResponseCaegory] = useState('');
    const [error, setError] = useState({
        field: '',
        passwordError: '',
        ready : false,
        message: ''
    });
    useEffect(() => {
       if(update){
        setTransaction({
          ...transaction,
          category : transaction.category,
      });
          setActive(true)
       }
        const getCategories = async () => {
            const response = await axios.get(`${urlApi}/category`);
            setCategory(response.data);
        };
        getCategories();
        
    }, []);

    const handleInputChange = (event,action) => {
        if(action === "categoryType"){
            setNewCategory({
                ...newCategory,
                [event.target.name]: event.target.value,
            })
           
        }
       
        setTransaction({
            ...transaction,
            [event.target.name]: event.target.value,
        });
    };
    useEffect(() => {
        validateTransaction(setError(transaction))
    }, [transaction]);
   
  const createCategory  = async (e) =>{
    e.preventDefault();
    const categorys = await axios.post(`${urlApi}/category/create`, newCategory);
    setCategory(categorys.data);
    setResponseCaegory('Category created');
    
    setNewCategory({
        name: "",
        type: "income",
    })
    setRenderFormCategory(false);

    
  }; 
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Type</Form.Label>
        <Form.Select name='type' defaultValue={transaction?.type} onBlur={(e)=> handleInputChange(e)} disabled={active}>
          <option>choose a type</option>
          <option>income</option>
          <option>expense</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label><Button onClick={()=> setRenderFormCategory(true)} variant="primary" size="sm">+</Button><span>{responseCategory}</span>
        <div>
               {renderFormCategory && <FormCategory handleInputChange={handleInputChange} createCategory={createCategory} data={newCategory}/>}
        </div>
         <Form.Select name='category' onBlur={(e)=> handleInputChange(e)}>
           <option>choose a category</option>
          {category[0] && transaction.type && category.map((category) => { 
          
             if(category.type === transaction?.type.toLowerCase()){
              return <option selected={category.name === transaction.category} key={category.id}>{category.name}</option>
            }
        })}
        </Form.Select> 
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control name='amount' type="number" placeholder="Enter amount" value={transaction?.amount} onChange={(e)=> handleInputChange(e)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control name='description' type="text" placeholder="Enter description" value={transaction?.description} onChange={(e)=> handleInputChange(e)} />
      </Form.Group>

    
      
    </Form>
  );
}

export default FormTransaction;