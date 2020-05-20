const server = require("./api/server");

const Port = process.env.PORT || 7000;

server.listen(Port, () => {
    console.log(`\nRunning on port ${Port}\n`)
})