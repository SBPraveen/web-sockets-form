import { useState, useEffect } from 'react'
import Table from "../components/Table"
import "../css/JobList.css"
import { v4 as uuidv4 } from 'uuid';
import Layout from './Layout';

const fetchTableData = async (setTableData) => {
    const currentTime = new Date()
    const tableData = [{ jobId: "1111", createdBy: "yesBeee", createdOn: currentTime.toString() }, { jobId: "2222", createdBy: "yesBeee", createdOn: currentTime.toString() }, { jobId: "3333", createdBy: "yesBeee", createdOn: currentTime.toString() }]
    setTableData(tableData)
}
const tableHeaders = [{ id: "jobId", headerName: "Job ID", type: "link" }, { id: "createdBy", headerName: "Created By" }, { id: "createdOn", headerName: "Created On" }]

const JobList = () => {
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetchTableData(setTableData)
    }, [])

    const handleCreateJob = () => {
        const currentTime = new Date()
        let tempTableData = JSON.parse(JSON.stringify(tableData))
        tempTableData.unshift({ jobId: "Job-" + uuidv4(), createdBy: "yesBeee", createdOn: currentTime.toString() })
        setTableData(tempTableData)
    }
    return (
        <Layout header={"Job list"}>
            <div className="job-list-page">
                <div className="section-1">
                    <button className="create-job-button" onClick={handleCreateJob}>Create job</button>
                </div>
                <div className="section-2">
                    <Table headers={tableHeaders} bodyData={tableData} />
                </div>
            </div>
        </Layout>

    )
}
export default JobList