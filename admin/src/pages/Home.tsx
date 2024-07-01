import React from 'react';



    const Home: React.FC = () => {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px', backgroundColor:'rosybrown' }}>
            <h1 style={{ fontSize: '3rem' }}>Welcome to the Study Library App!</h1>
            <p>Start exploring our vast collection of study materials.</p>



            <a href="/register">Register</a>
            <a href="/login">Sign In</a>
            </div>
        );
    };


    export default Home;
 