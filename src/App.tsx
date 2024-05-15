import './App.css';
import HeaderMenu from './pages/headerMenu';
import Content from './pages/content';
import { useLocation } from 'react-router';


function App() {
    const location = useLocation();
    return (
        <div className="App">
            {
                location.pathname === '/login' ? null : <div className='title-container'>
                <span style={{ lineHeight: '50px', paddingLeft: '20px', fontSize: '20px'}}>上岸站</span>
            </div>
            }
            <div className='content-container'>
                <HeaderMenu></HeaderMenu>
                <Content></Content>
            </div>

        </div>
    );
}

export default App;
