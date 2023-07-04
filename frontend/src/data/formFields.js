const jobDetails = {sectionName:"Job data", id:1, fields:[{ fieldKey: "supplierDetails", type: "textfield", fieldName: "Supplier details" }, { fieldKey: "jobtotalDuty", type: "textfield", fieldName: "Job total duty" }]}

const invoiceDetails = {sectionName:"Invoice data", id:2, fields:[{ fieldKey: "invoiceValue", type: "textfield", fieldName: "Invoice value" }, { fieldKey: "freightValue", type: "textfield", fieldName: "Freight value" }, { fieldKey: "insuranceValue", type: "textfield", fieldName: "Insurance value" }]}

const formFields = [jobDetails, invoiceDetails]
export default formFields