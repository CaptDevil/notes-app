import React from 'react';
import Header from './Components/Header';
import MainSection from './Components/MainSection';

function App() {
    const [user, setUser] = React.useState('');

    React.useEffect(() => {
        setUser(localStorage.getItem('user'))
    }, [])

    return (
        <div>
            <Header user={user} setUser={setUser} />
            <MainSection user={user} />
        </div>
    );
}

export default App;