import React from 'react'
import styled from "styled-components";
import Navbar from './Navbar';

const Notfound404 = () => {
    return (
        <div style={styles.container}>
            <Navbar />
            <Doke >
                <div className='flex flex-col'>
                    <h2 className="text-center text-5xl text-zinc-500 font-semibold mb-6">404 </h2>
                    <p className="text-center font-semibold text-2xl">Page Not Found</p>
                </div>
            </Doke>
        </div>
    )
}

const styles = {
    container: {
        width: '100%',
    }
}

const Doke = styled.div`
    padding-top:30vh;
    width: 100%;
    @media (max-width: 660px) {
        padding-top:30vh;
    }
`;

export default Notfound404