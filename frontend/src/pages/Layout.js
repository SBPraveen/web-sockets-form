
import '../css/Layout.css'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Link } from 'react-router-dom';

const Layout = (props) => {

    return (
        <div>
            <header className='header'>{props.header !== "Job list" && <Link to={"/"}><ArrowLeftIcon /></Link>} <h3>{props.header}</h3></header>
            <div className='body'>
                {props.children}
            </div>
            <footer className='footer'>
                <p>Developed with ❤️ by yesBeee</p>
                <p>
                    {props.header !== "Job list" && (props.isJobDetails && props.isWebSocketAlive ? "🟢 Connected to the server " + props.serverId :
                        <span style={{ color: "red" }}>🤯 Websocket connection lost</span>)
                    }
                </p>

            </footer>
        </div>
    )
}
export default Layout
