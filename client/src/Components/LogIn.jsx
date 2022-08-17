import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { urlApi } from '../utils/config'
import { setLocalStore } from '../utils/localStorage';

const Login = () => {
    const url = `${urlApi}/auth/login`;
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: ''   
    });
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })

    };
    const onSumit = async (e,data)=>{
        e.preventDefault();
        try{
          const respons = await axios.post(url, data);
          await setLocalStore(respons.data)
          return navigate(`../user/${respons.data.user.id}`,{ replace: true })
        }catch(err){
            setError(err.response.data.message)
        }
       ;
    }
  
    return(
        <>
    <Form className='signup'>
      <p>{error}</p>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name='email' type="email" placeholder="Enter email" onChange={(e)=> handleInputChange(e)} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' type="password" placeholder="Password" onChange={(e)=> handleInputChange(e)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        
      </Form.Group>
      <Button variant="primary" type="submit" onClick={(e)=> onSumit(e,data)} >
        Submit
      </Button>
    </Form>
        </>
    )
}

export default Login