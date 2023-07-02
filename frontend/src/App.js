import { useState, useEffect, useRef } from 'react'
import TextField from './components/TextField';
//  import formFields  from './data/formFieldsLoadTest'
 import initiateWebSockets from './utilityFunctions/initiateWebSockets';

const formFields = [{ fieldKey: "invoiceValue", type: "textfield", fieldName: "Invoice value" }, { fieldKey: "freightValue", type: "textfield", fieldName: "Freight value" }, { fieldKey: "insuranceValue", type: "textfield", fieldName: "Insurance value" }]

const page_style = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}

const form_component_style = {
  display: "flex",
  marginTop: "1.5em"
}

const label_component_style = {
  marginRight: "1.5em"
}

const footer_component_style = {
  width:"100%",
  height:"2vh",
  display:"flex",
  justifyContent:"center"
}
const header_component_style = {
  width:"100%",
  height:"10vh",
  display:"flex",
  alignItems:"center",
  justifyContent:"space-across",
  marginTop: "0vh",
  flexDirection:"column",
}
const body_component_style = {
  width:"100%",
  height:"88vh",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  marginTop: "0vh",
  flexDirection:"column",
}

const p_tag = {
  margin: 0
}




function App() {
  
  //!Check disable is working when websocket connection is lost
  const [isWebSocketAlive, setIsWebSocketAlive] = useState(false)
  const [serverId, setServerId] = useState("")

  const jobId = "1234ASDF1234"
  const invoiceId = "1111"
  const USER_ID = "User-1"

  let ws = useRef(null);
  useEffect(() => {
    if(!ws.current){
      initiateWebSockets(ws, jobId, invoiceId, setIsWebSocketAlive, setServerId, USER_ID)
    }
    //!NOTE return a callback function that closes the websocket and also the event bus listeners
  }, [])
  

  return (
    <div className="App" style={page_style}>
      <div style={header_component_style}>
      <p style={{fontWeight: "600", margin:0}}>{USER_ID}</p>
      <p style={p_tag}>This form is connected to the server : {isWebSocketAlive && serverId}</p>
      {!isWebSocketAlive && <p style={p_tag}><span style={{color: "red"}}>Websocket connection lost</span></p>}
      </div>
      <div style={body_component_style}>
      {formFields.map((field, index) => {
        if (field.type === "textfield") {
          return (
            <div style={form_component_style} key={index}>
              <label style={label_component_style} key={field.fieldKey + "label"}>{field.fieldName}</label>
              <TextField  key={field.fieldKey} id={field.fieldKey} ws={ws} jobId={jobId} invoiceId={invoiceId} isWebSocketAlive={isWebSocketAlive} fieldKey={field.fieldKey} userId={USER_ID}></TextField>
            </div>
          )
        }
        return null
      })}
      </div>
      <footer style={footer_component_style}>Developed with ❤️ by yesBeee</footer>
    </div>
    
  );
}

export default App;
