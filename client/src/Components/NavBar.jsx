import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { urlApi } from '../utils/config'
const Navb = ()=>{
const [user, setUser] = useState({});
const navigate = useNavigate();
useEffect(() => {
    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
  
    if(userLocalStorage && token){
      const userActive = async () => {
        const option = {
          headers: {authorization: `Bearer ${token}`}
        }
        try {
          const response = await axios.get(`${urlApi}/user/${userLocalStorage.id}`,option);

          return response.data
        } catch (error) {
          console.log(error)
          setUser(false)
        }
      };

      userActive()
      .then(res => {
       
        setUser(res);
        navigate(`../user/${res.id}`,{ replace: true })
      })
      .catch(err => {
        console.log(err)
        navigate(`../signin`,{ replace: true })
      })
    }
   else{
      navigate(`../`,{ replace: true })
   }
    
},[]);

  return (
<div className='navb'>
    <Navbar>
      <Container>
        <Navbar.Brand> Financial App </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {user ? user.name : <Link to={'/signin'}>Sign in </Link>}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
</div>
  );
}

export default Navb;