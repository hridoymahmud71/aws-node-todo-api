// external imports
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    ScanCommand
} = require("@aws-sdk/lib-dynamodb");


const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: false, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
};

const translateConfig = { marshallOptions, unmarshallOptions };



const TODO_TABLE = process.env.TODO_TABLE;
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client, translateConfig);





const createTodo = async (event, context) => {

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello world" })
    }

}

const listTodo = async (event, context, callback) => {

    try {

        const response = await ddbDocClient.send(new ScanCommand({ TableName: TODO_TABLE }));


        console.log(response);

        return {
            statusCode: 200,
            body: JSON.stringify({ response })
        }

    } catch (error) {
        console.log("what error: ",error)
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }



}

module.exports = { createTodo, listTodo }