import { useParams } from "react-router-dom"
import Layout from "./Layout"
import { useState, useEffect, useRef } from 'react'
import TextField from '../components/TextField';
import Dropdown from "../components/Dropdown";
import Table from "../components/Table";
//  import formFields  from './data/formFieldsLoadTest'
import formFields from "../data/formFields"
import initiateWebSockets from '../utilityFunctions/initiateWebSockets'
import "../css/JobDetails.css"

const lineItemTableHeaders = [{ id: "slNo", headerName: "Sl. no." }, { id: "hsn", headerName: "HSN", type: "textfield" }, { id: "description", headerName: "Description", type: "textfield" }, { id: "qty", headerName: "Quantity", type: "textfield" }, { id: "unitPrice", headerName: "Unit price", type: "textfield" }, { id: "amount", headerName: "Amount", type: "textfield" }]

const JobDetails = () => {

    const { jobId } = useParams()
    const [isWebSocketAlive, setIsWebSocketAlive] = useState(false)
    const [serverId, setServerId] = useState("")

    const USER_ID = "User-1"


    let ws = useRef(null);
    useEffect(() => {
        if (!ws.current) {
            initiateWebSockets(ws, jobId, setIsWebSocketAlive, setServerId, USER_ID)
        }
        //!NOTE return a callback function that closes the websocket and also the event bus listeners
    }, [])

    return (
        <Layout header={jobId} isWebSocketAlive={isWebSocketAlive} isJobDetails={true} serverId={serverId}>
            <div>

                {formFields.map((section) => {
                    return (
                        <div className="section" key={section.id}>
                            <h4 key={section.id + "header"}>{section.sectionName}</h4>
                            <div key={section.id + "section-body"} className="section-body">
                                {
                                    section.fields.map((field, index) => {

                                        const propData = { ws, jobId, isWebSocketAlive, fieldKey: field.fieldKey, userId: USER_ID }

                                        return (
                                            <div key={index + section.sectionName} className="labelAndInput">
                                                <label key={field.fieldKey + "label"}>{field.fieldName}</label>
                                                {field.type === "textfield" && <TextField key={field.fieldKey} propData={propData} />}
                                                {field.type === "dropdown" && <Dropdown key={field.fieldKey} propData={propData} options={field.options} />}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })}
                {/* <div>
                    <div>
                        <button>Copy values to all rows</button>
                        <button>Add line items</button>
                    </div>
                    <Table headers={lineItemTableHeaders} bodyData={[]} />
                </div> */}
            </div>
        </Layout>

    )
}
export default JobDetails

