import "../css/Table.css"
import { Link } from "react-router-dom"

const Table = ({ headers, bodyData }) => {
    console.log("bodyData",bodyData)
    return (
        <table>
            <tr>
                {
                    headers.map((header) => (
                        <th key={header.id}>{header.headerName}</th>
                    )
                    )
                }
            </tr>
            {
                bodyData.map((body, rowIndex) => {
                    return (
                        <tr key={rowIndex}>
                            {
                                headers.map((header, columnIndex) => (
                                    <th key={`${rowIndex}${columnIndex}`}>{header.type === "link" ? 
                                    <Link to={`/jobDetails/${body[header.id]}`}>{body[header.id]}</Link> 
                                    : body[header.id]}</th>
                                ))
                            }
                        </tr>
                    )
                })
            }



        </table>
    )
}
export default Table