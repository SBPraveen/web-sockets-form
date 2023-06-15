const health = {
    method: "GET",
    path: '/health',
    handler: (request,h) => {
        return h.response('Ok').code(200)
    }
}
export default health