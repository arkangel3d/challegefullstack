import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect,useState } from 'react';
import {validateCategory} from '../utils/validateData';
const FormCategory = ({handleInputChange,createCategory,data})=>{
      
    const [category, setCategory] = useState(data);

    const [errorCategory, setErrorCategory] = useState({     
        field : '',
        ready : false
    }
    );
    useEffect(() => {
        setCategory(data)
      },[data]);

    useEffect(() => {
        setErrorCategory(validateCategory(category))
      },[category]);
     
    return(
        <>
            <Form.Group className="mb-3" controlId="text">
                <Form.Label>Name</Form.Label>
                <Form.Control name='name' type="text" placeholder="Category name" onChange={(e)=> handleInputChange(e,'categoryType')} />
                <Form.Text className="text-muted">
                <span>{errorCategory.field}</span>
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="text">
            <Form.Label>Type</Form.Label>
               <Form.Select name='type' onBlur={(e)=> handleInputChange(e,'categoryType')}>
                    <option>income</option>
                    <option>expense</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={(e)=>createCategory(e)} disabled={!errorCategory.ready}>Create</Button>
        </>
     
    )
  }

export default FormCategory;