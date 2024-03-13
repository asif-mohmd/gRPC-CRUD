const PROTO_PATH = require("../server/index");

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const CustomerService = grpc.loadPackageDefinition(packageDefinition).CustomerService;

const client = new CustomerService(
    "0.0.0.0:50051",
    grpc.credentials.createInsecure()
);

module.exports = client;
