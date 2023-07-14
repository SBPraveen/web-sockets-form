import "../css/Table.css"
import { Link } from "react-router-dom"
import Checkbox from "./Checkbox"
import TextField from "./TextField"

const Table = ({ headers, bodyData, propsData }) => {

    return (
        <table className="table-main">
            <thead>
                <tr>
                    {
                        headers.map((header) => (
                            <th key={header.id}>{header.headerName}</th>
                        )
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {

                    bodyData.map((body, rowIndex) => {

                        return (
                            <tr key={rowIndex}>
                                {
                                    headers.map((header, columnIndex) => {
                                        let tableElement
                                        if (header.type === "link") {
                                            tableElement = <Link to={`/jobDetails/${body[header.id]}`}>{body[header.id]}</Link>
                                        }
                                        else if (header.type === "checkbox") {
                                            tableElement = <Checkbox />
                                        }
                                        else if (header.type === "textfield") {
                                            tableElement = <TextField propData={{...propsData,fieldKey: header.id + rowIndex + columnIndex}}/>
                                        }
                                        else if (header.type === "slNo") {
                                            tableElement = rowIndex + 1
                                        }
                                        else {
                                            tableElement = body[header.id]
                                        }
                                        return (
                                            <th key={`${rowIndex}${columnIndex}`}>{tableElement}</th>
                                        )
                                    }

                                    )
                                }
                            </tr>
                        )
                    })

                }
            </tbody>




        </table>
    )
}
export default Table