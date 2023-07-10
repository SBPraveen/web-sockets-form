const jobDetails = { sectionName: "Job data", id: 1, fields: [{ fieldKey: "supplierDetails", type: "textfield", fieldName: "Supplier details" }, { fieldKey: "exchangeRates", type: "textfield", fieldName: "Exchange rates" }, { fieldKey: "jobtotalDuty", type: "textfield", fieldName: "Job total duty" }] }

const invoiceDetails = { sectionName: "Invoice data", id: 2, fields: [{ fieldKey: "invoiceNo", type: "textfield", fieldName: "Invoice no" }, { fieldKey: "invoiceValue", type: "textfield", fieldName: "Invoice value" }, { fieldKey: "invoiceCurrency", type: "dropdown", fieldName: "Invoice currency", options: ["USD", "EUR", "INR", "JPY"] }, { fieldKey: "freightValue", type: "textfield", fieldName: "Freight value" }, { fieldKey: "freightCurrency", type: "dropdown", fieldName: "Freight currency", options: ["USD", "EUR", "INR", "JPY"] }] }

const formFields = [jobDetails, invoiceDetails]
export default formFields