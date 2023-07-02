const health = {
    method: "GET",
    path: '/health',
    handler: (request,h) => {
        console.log("health check route called", new Date())
        return h.response('Ok').code(200)
    }
}
export default health