import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
const Home = () => {
    return(
        <div className='home'>
            <div className='homebutton'>
            <Link to='/signup'><Button>SignUp</Button></Link>
            </div>
            <div className='homebutton'>
            <Link to={'/signin'}><Button>SignIn</Button></Link>
            </div>
        
        </div>
    )

}

export default Home;