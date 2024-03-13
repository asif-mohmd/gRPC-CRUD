const PROTO_PATH = './customers.proto'

import { loadPackageDefinition, Server, status, ServerCredentials } from "@grpc/grpc-js"
import { loadSync } from "@grpc/proto-loader"

const packageDefinition = loadSync(PROTO_PATH,{
    keepCase: true,
    longs : String,
    enums: String,
    arrays: true

})

const customersProto = loadPackageDefinition(packageDefinition)

const server = new Server()


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
        let customer = customers.find(n=>n.id == call.request.id)

        if(customer){
            callback(null,customer);
        }else{
            callback({
                code : status.NOT_FOUND,
                details: "Not found"
            })
        }

    },
    insert: (call,callback) =>{
        let customer = call.request;

        customer.id = Math.random(); //uuidv4
        customers.push(customer);
        callback(null,customer)

    },
    update: (call,callback) =>{

    },
    remove: (call,callback) =>{

    },
})

server.bindAsync("0.0.0.0:1234", ServerCredentials.createInsecure(),(err,port)=>{
    if(err){
console.log("error happenened",err)
    }else{
    server.start();
    console.log("grpc working correctly")
    }
})
