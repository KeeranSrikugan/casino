import { useNavigate } from 'react-router-dom';
import './style/Home.css';


function Home() {

    const navigate = useNavigate();

    
return (
    <div className="home_container">
        <div className="home_content">

            <h1>♠ Xennial's Casino Event ♦</h1>
            <h2>Welcome to Xennial's In-House Casino Event</h2>
            <p>Login or register to keep track of your points!</p>

            <div className="home_buttons">
                <button onClick={() => navigate('/login')}>
                    Login
                </button>
                <button onClick={() => navigate('/register')}>
                    Register
                </button>
            </div>
            
        </div>
    </div>
);

}

export default Home;