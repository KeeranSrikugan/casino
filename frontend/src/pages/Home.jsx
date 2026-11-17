import { useNavigate } from 'react-router-dom';
import './style/Home.css';


function Home() {

    const navigate = useNavigate();

    
return (
    <div className="home-container">

        <div className="home-content">

            <h1>♠ Xennial's Casino ♦</h1>

            <h2>Welcome to Xennial's In-House Casino Event</h2>

            <p>Login or register to keep track of your points!</p>

            <div className="home-buttons">

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