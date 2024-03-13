const PROTO_PATH = './customers.proto'

const grpc = require("@grpc/grpc-js")
const protoLoader = require("@grpc/proto-loader")

const packageDefinition = protoLoader.loadSync(PROTO_PATH,{
    keepCase: true,
    longs : String,
    enums: String,
    arrays: true

})

const customersProto = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()



server.addService(customersProto.CustomerService.service,{
    getAll: (call,callback) =>{

    },
    get: (call,callback) =>{

    },
    insert: (call,callback) =>{

    },
    update: (call,callback) =>{

    },
    remove: (call,callback) =>{

    },
})

server.bind("0.0.0.0:1234", grpc.ServerCredentials.createInsecure())
server.start();