import Table from "../components/Table";
import Dialog from "../components/Dialog";
import { useState } from "react";
import "../css/LineItemTable.css"

const lineItemTableHeaders = [{ id: "checkbox", headerName: "", type: "checkbox" }, { id: "slNo", headerName: "Sl. no.", type: "slNo" }, { id: "hsn", headerName: "HSN", type: "textfield" }, { id: "description", headerName: "Description", type: "textfield" }, { id: "qty", headerName: "Quantity", type: "textfield" }, { id: "unitPrice", headerName: "Unit price", type: "textfield" }, { id: "amount", headerName: "Amount", type: "textfield" }]

const LineItemTable = (props) => {

    const [isAddLineItems, setIsAddLineItems] = useState(false)
    const [isCopyValues, setIsCopyValues] = useState(false)
    const [isDeleteLineItems, setIsDeleteLineItems] = useState(false)
    const [tableData, setTableData] = useState([])
    const [noOfAddLineItems, setNoOfAddLineItems] = useState("")

    const { ws, jobId, isWebSocketAlive, userId } = props

    const tableProps = { ws, jobId, isWebSocketAlive, userId }

    const dialogAddLineItems = () => {
        let tempTableData = JSON.parse(JSON.stringify(tableData))
        const newTableData = {
            hsn: "1311",
            description: "111",
            qty: "434",
            unitPrice: "234",
            amount: "2341"
        }
        for (let i = 0; i < noOfAddLineItems; i++) {
            tempTableData.push(newTableData)
        }
        setTableData(tempTableData)
        setIsAddLineItems(false)
    }

    return (
        <div className="line-item-section">

            <Dialog isDialogBoxOpen={isAddLineItems} setIsDialogBoxOpen={setIsAddLineItems} headerName="Add line items" buttonContainedHandler={dialogAddLineItems}>
                <div className="add-line-item-dialog-body">
                    <label>No. of line items</label>
                    <input className="add-line-item-input" value={noOfAddLineItems} onChange={(e) => setNoOfAddLineItems(e.target.value)}></input>
                </div>
            </Dialog>

            <Dialog isDialogBoxOpen={isCopyValues} setIsDialogBoxOpen={setIsCopyValues} headerName="Copy values to rows">
                <div className="copy-values-all-rows-dialog-body">
                    {lineItemTableHeaders.map((header) => {
                        if (header.headerName !== "" && header.headerName !== "Sl. no.")
                            return (
                                <div>
                                    <input type="checkbox" className="copy-values-all-rows-checkbox"></input>
                                    <label for={header.id}>{header.headerName}</label>
                                    <input type="text" id={header.id} className="copy-values-all-rows-input"></input>
                                </div>
                            )
                    })}
                </div>
            </Dialog>
            <Dialog isDialogBoxOpen={isDeleteLineItems} setIsDialogBoxOpen={setIsDeleteLineItems} headerName="Delete line items" />
            <div className="line-item-actions">
                <button onClick={() => setIsCopyValues(true)}>Copy values to rows</button>
                <button onClick={() => setIsAddLineItems(true)}>Add line items</button>
                <button onClick={() => setIsDeleteLineItems(true)}>Delete line items</button>
            </div>
            <div className="line-item-table">
                <Table headers={lineItemTableHeaders} bodyData={tableData} propsData={tableProps} />
            </div>
        </div>

    )
}

export default LineItemTable