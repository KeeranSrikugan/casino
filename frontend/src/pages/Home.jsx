import { useNavigate } from 'react-router-dom';
import './style/Home.css';


function Home() {

    const navigate = useNavigate();

    
return (
    <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta name="theme-color" content="#0b0b0b" />
  <title>Xennial's Casino Event</title>
    <div className="HomeContainer">
        <div className="HomeContent">

            <h1>♠ Xennial's Casino Event ♦</h1>
            <h2>Welcome to Xennial's In-House Casino Event</h2>
            <p>Login or register to keep track of your points!</p>

            <div className="HomeButtons">
                <button onClick={() => navigate('/login')}>
                    Login
                </button>
                <button onClick={() => navigate('/register')}>
                    Register
                </button>
            </div>
            
        </div>
    </div>
    </head>
);

}

export default Home;