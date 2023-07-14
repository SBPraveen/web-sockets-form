import "../css/Dialog.css"
import CloseIcon from '@mui/icons-material/Close';

const Dialog = (props) => {
    const {buttonContainedHandler, headerName, isDialogBoxOpen, setIsDialogBoxOpen} = props 

    const handleClose = () => {
        setIsDialogBoxOpen(false)
    }
    return(
        <dialog open={isDialogBoxOpen} className="dialog-box">
             <div className="header-dialog-box">
                <h2>{headerName}</h2>
                <CloseIcon className="dialog-close" onClick={handleClose} />
             </div>
             {props.children}
             <div className="dialog-footer">
                <button onClick={buttonContainedHandler}>Ok</button>
             </div>
        </dialog>
    )
}

export default Dialog