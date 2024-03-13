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


const customers = [{
    id: "111",
    name: "asif",
    age: 22,
    address: "hsr",
}, {
    id:"222",
    name: "jacky",
    age: 23,
    address: "kerala"
}
]


server.addService(customersProto.CustomerService.service,{
    getAll: (call,callback) =>{
        callback(null,{customers})

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