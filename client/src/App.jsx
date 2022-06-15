import React from 'react';
import Header from './Components/Header';
import MainSection from './Components/MainSection';

function App() {
    const [user, setUser] = React.useState('');
    const [darkMode, setDarkMode] = React.useState(false);

    React.useEffect(() => {
        setUser(localStorage.getItem('user'))
    }, [])

    React.useEffect(() => {
        console.log(darkMode)
    }, [darkMode])

    return (
        <div style={{ backgroundColor: (darkMode) ? '#191A1A' : '', color: (darkMode) ? 'white' : '', margin: 0, height: '100vh' }}>
            <Header user={user} setUser={setUser} darkMode={darkMode} />
            <MainSection user={user} darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>
    );
}

export default App;