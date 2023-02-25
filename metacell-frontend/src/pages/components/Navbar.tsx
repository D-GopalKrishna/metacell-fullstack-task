import React from 'react'
import MetacellImg from '../../assets/Metacell.png'
const screenWidth = window.innerWidth;

const Navbar = () => {
    return (
        <div style={styles.container}>
            <div className='flex flex-row  my-10 -ml-10'>
                <img src={MetacellImg} alt="Logo" className="w-100 h-20" />
            </div>
        </div>
    )
}

const styles = {
    container: {
        width: '100%',
        paddingLeft: screenWidth > 660 ? '8%' : '5%',
    }
}


export default Navbar