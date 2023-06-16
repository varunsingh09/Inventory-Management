import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ToggleContext } from '../context/ToggleContext'

const Navbar = () => {
    const {toggleReceive, setToggleReceive} = useContext(ToggleContext)
    const {toggleAdd, setToggleAdd} = useContext(ToggleContext)

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Inventory Management</h1>
                </Link>
                <div className='nav-buttons'>
                    <div onClick={() => setToggleReceive(!toggleReceive)}>
                        <p>Receive</p>
                    </div>
                    <div onClick={() => setToggleAdd(!toggleAdd)}>
                        <p>Add</p>
                    </div>
                    <Link to="new-count">
                        <p>New Count</p>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Navbar