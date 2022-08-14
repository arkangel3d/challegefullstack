import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Navb = ({user})=>{
  return (
<div className='navb'>
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">hola {user ||'Inicia Sesion'}</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">{user}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
</div>
  );
}

export default Navb;