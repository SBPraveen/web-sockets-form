import "../css/NotFound404.css"
import { Link } from "react-router-dom"

const NotFound404 = () => {
    return(
        <div className="main">
            <h1 className="heading">😶‍🌫️ Page not found</h1>
            <p>Return to<Link to="/"> Job List</Link> Page</p>
        </div>
    )
} 
export default NotFound404