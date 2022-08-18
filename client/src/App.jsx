import React from 'react';
import Header from './Components/Header';
import MainSection from './Components/MainSection';
import axios from 'axios';

function App() {
    const [token, setToken] = React.useState(localStorage.getItem('token'));
    const [darkMode, setDarkMode] = React.useState(false);
    const [user, setUser] = React.useState('');

    React.useEffect(() => {
        if(token !== null && token !== '') {
            axios.get(`/loginuser/${token}`)
                .then((res) => {
                    setUser(res.data.user)
                    setToken(res.data.token)
                    localStorage.setItem('token',res.data.token);
                })
        }
        else {
            setToken('')
            localStorage.removeItem('token')
        }
    }, [token])

    React.useEffect(() => {
        localStorage.setItem('dark-mode', darkMode)
    }, [darkMode])

    return (
        <div style={{ backgroundColor: (darkMode) ? '#191A1A' : '', color: (darkMode) ? 'white' : '', margin: 0, height: '100vh' }}>
            <Header user={user} setUser={setUser} token={token} setToken={setToken} darkMode={darkMode} />
            <MainSection token={token} darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
    );
}

export default App;