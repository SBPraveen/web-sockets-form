import io from 'socket.io-client';
import { useState, useEffect, useRef } from 'react'
import TextField from './TextField';
import formFields  from './formFields'

// const formFields = [{ fieldKey: "invoiceValue", type: "textfield", fieldName: "Invoice value" }, { fieldKey: "freightValue", type: "textfield", fieldName: "Freight value" }, { fieldKey: "insuranceValue", type: "textfield", fieldName: "Insurance value" }]

const page_style = {
  width: "100vw",
  height: "100vh",
  overFlowY:"scroll",
  // display: "flex",
  // flexDirection: "column",
  // alignItems: "center",
  // justifyContent: "center"
}

const form_component_style = {
  display: "flex",
}

const label_component_style = {
  marginRight: "1.5em"
}


function App() {
  
  //!Check disable is working when websocket connection is lost
  const [disableFields, setDisableFields] = useState(true)

  const jobId = "1234ASDF1234"
  const invoiceId = "1111"

  let socket = useRef(null);
  useEffect(() => {
    socket.current = io("ws://0.0.0.0:8081", {
      transports: ["websocket"],
      autoConnect: false
    });
    socket.current.connect()
    socket.current.on("connect", () => {
      socket.current.emit('join', `${jobId}#${invoiceId}`);
      setDisableFields(false)
      
    })
    //!NOTE return a callback function that closes the websocket
  }, [])
  

  return (
    <div className="App" style={page_style}>

      {formFields.map((field, index) => {
        if (field.type === "textfield") {
          return (
            <div style={form_component_style} key={index}>
              <label style={label_component_style} key={field.fieldKey + "label"}>{field.fieldName}</label>
              <TextField  key={field.fieldKey} id={field.fieldKey} socket={socket} jobId={jobId} invoiceId={invoiceId} disableFields={disableFields} fieldKey={field.fieldKey}></TextField>
            </div>
          )
        }
      })}

    </div>
  );
}

export default App;
