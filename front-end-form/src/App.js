import { useState, useEffect, useRef } from 'react'
import TextField from './components/TextField';
//  import formFields  from './data/formFieldsLoadTest'
 import initiateWebsocket from './utilityFunctions/initiateWebsocket';

const formFields = [{ fieldKey: "invoiceValue", type: "textfield", fieldName: "Invoice value" }, { fieldKey: "freightValue", type: "textfield", fieldName: "Freight value" }, { fieldKey: "insuranceValue", type: "textfield", fieldName: "Insurance value" }]

const page_style = {
  width: "100vw",
  height: "100vh",
  overFlowY:"scroll",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position:"relative"
}

const form_component_style = {
  display: "flex",
  marginTop: "1.5em"
}

const label_component_style = {
  marginRight: "1.5em"
}

const footer_component_style = {
  position:"absolute",
  width:"100%",
  bottom:0,
  height:"2vh",
  display:"flex",
  justifyContent:"center"
}
const header_component_style = {
  position:"absolute",
  width:"100%",
  top:0,
  height:"2vh",
  display:"flex",
  justifyContent:"center",
  marginTop: "1vh"
}


function App() {
  
  //!Check disable is working when websocket connection is lost
  const [isWebSocketAlive, setIsWebSocketAlive] = useState(false)
  const [serverId, setServerId] = useState("")

  const jobId = "1234ASDF1234"
  const invoiceId = "1111"

  let ws = useRef(null);
  useEffect(() => {
    if(!ws.current){
      initiateWebsocket(ws, jobId, invoiceId, setIsWebSocketAlive, setServerId)
    }
    //!NOTE return a callback function that closes the websocket
  }, [])
  

  return (
    <div className="App" style={page_style}>
      <header style={header_component_style}>This form is connected to the server : {serverId}</header>
      {formFields.map((field, index) => {
        if (field.type === "textfield") {
          return (
            <div style={form_component_style} key={index}>
              <label style={label_component_style} key={field.fieldKey + "label"}>{field.fieldName}</label>
              <TextField  key={field.fieldKey} id={field.fieldKey} ws={ws} jobId={jobId} invoiceId={invoiceId} isWebSocketAlive={isWebSocketAlive} fieldKey={field.fieldKey}></TextField>
            </div>
          )
        }
      })}
      <footer style={footer_component_style}>Developed with ❤️ by yesBeee</footer>
    </div>
    
  );
}

export default App;
