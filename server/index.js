const path = require("path")

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(path.join(__dirname,"../proto/customers.proto"), {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
})

const customersProto = grpc.loadPackageDefinition(packageDefinition)



const customers = [{
    id: "111",
    name: "asif",
    age: 22,
    address: "hsr",
}, {
    id: "222",
    name: "jacky",
    age: 23,
    address: "kerala"
}];


function main(){

const server = new grpc.Server();

server.addService(customersProto.CustomerService.service, {
    getAll: (call, callback) => {
        callback(null, { customers });
    },
    get: (call, callback) => {
        let customer = customers.find(n => n.id == call.request.id);

        if (customer) {
            callback(null, customer);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Not found"
            });
        }
    },
    insert: (call, callback) => {
        let customer = call.request;

        customer.id = Math.random(); //uuidv4
        customers.push(customer);
        callback(null, customer);
    },
    update: (call, callback) => {
        // Implement update logic here
    },
    remove: (call, callback) => {
        // Implement remove logic here
    },
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.log("error happened", err);
    } else {
        server.start();
        console.log("grpc working correctly");
    }
});
}

main()