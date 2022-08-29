import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { urlApi } from '../utils/config'

function Filters({handleFilter, transactions}) {
    
    const [categories, setCategories] = useState([]);
 

    useEffect(() => {
   
        const getCategories = async () => {
            try {
                const response = await axios.get(`${urlApi}/category/`);
               
                setCategories(response.data);

            } catch (error) {
                console.log(error);
            }
        };
        getCategories();
    }, [transactions]);
    

    
  return (
    <div>
       <Form onChange={(e)=> handleFilter(e.target.value)}>
       <Form.Select>
       <option value={'original'}>Filters Category</option>
        {categories?.map((category, index) => {
            return  <option 
            key={index}
          >{category.name}</option>
          
        })}
        <option disabled>Filters Transaction</option>
       <option value={'income'}>Income</option>
       <option value={'expense'}>Expense</option>
        </Form.Select>
       </Form>
       
    </div>
  );
}

export default Filters;