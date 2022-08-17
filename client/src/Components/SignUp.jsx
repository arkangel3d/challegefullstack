import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { validate } from '../utils/validateData';
import { setLocalStore } from '../utils/localStorage';
import { urlApi } from '../utils/config'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const navigate = useNavigate();
    const url = `${urlApi}/auth/register`;
    const [data, setData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        password2: ''  
    });
    
    const [error, setError] = useState({
        field: '',
        passwordError: '',
        ready : false,
        message: ''
    });
    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    };
    const onSumit = async (e,data)=>{
        e.preventDefault();
        delete data.password2;
       
        try{
          const respons = await axios.post(url, data);
          console.log(respons.data)
          await setLocalStore(respons.data)
          return navigate(`../user/${respons.data.user.id}`,{ replace: true })
        }catch(err){
            setError({message: err.response.data.message})
        }
       ;
    }
    useEffect(() => {
      setError(validate(data))
    },[data]);
    return(
        <>
    <Form className='signup'>
        <p>{error.field}</p>
    <Form.Group className="mb-3" controlId="text">
        <Form.Label>Name</Form.Label>
        <Form.Control name='name' type="text" placeholder="Enter name" onChange={(e)=> handleInputChange(e)} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="text">
        <Form.Label>Lastname</Form.Label>
        <Form.Control name='lastName' type="text" placeholder="Enter lastname" onChange={(e)=> handleInputChange(e)} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name='email' type="email" placeholder="Enter email" onChange={(e)=> handleInputChange(e)} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e)=> handleInputChange(e)}>
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' type="password" placeholder="Password" onChange={(e)=> handleInputChange(e)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label> Repeat Password</Form.Label>
        <Form.Control name='password2' type="password" placeholder="Password" onChange={(e)=> handleInputChange(e)} />
        <p>{ error.passwordError &&'password incorrect'}</p>
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!error.ready} onClick={(e)=> onSumit(e, data)} >
        Submit
      </Button>
    </Form>
        </>
    )
}

export default SignUp