import { useParams } from "react-router-dom"
import Layout from "./Layout"
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import TextField from '../components/TextField';
//  import formFields  from './data/formFieldsLoadTest'
import formFields from "../data/formFields"
import initiateWebSockets from '../utilityFunctions/initiateWebSockets'
import "../css/JobDetails.css"

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
            <div className="body">

                {formFields.map((section, index) => {
                    return (
                        <div>
                            <h4 key={section.id}>{section.sectionName}</h4>
                            {
                                section.fields.map((field) => {
                                    if (field.type === "textfield") {
                                        return (
                                            <div key={index} className={labelAndInput}>
                                                <label key={field.fieldKey + "label"}>{field.fieldName}</label>
                                                <TextField key={field.fieldKey} id={field.fieldKey} ws={ws} jobId={jobId} isWebSocketAlive={isWebSocketAlive} fieldKey={field.fieldKey} userId={USER_ID}></TextField>
                                            </div>
                                        )
                                    }
                                    return null
                                })
                            }
                        </div>
                    )
                })}
            </div>
        </Layout>

    )
}
export default JobDetails

