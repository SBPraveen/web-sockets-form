
import '../css/Layout.css'

const Layout = (props) => {

    return (
        <div>
            <header className='header'><h3>{props.header}</h3></header>
            <div className='body'>
                {props.children}
            </div>
            <footer className='footer'>
                <p>Developed with ❤️ by yesBeee</p>
                <p>
                    {props.isJobDetails && props.isWebSocketAlive ? "🟢Connected to the server " + props.serverId :
                        <span style={{ color: "red" }}>🤯 Websocket connection lost</span>}
                </p>

            </footer>
        </div>
    )
}
export default Layout
