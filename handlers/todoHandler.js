// external imports
const { v4 } = require('uuid');

const {
    DynamoDBClient,
    GetItemCommand,
    PutItemCommand,
    DeleteItemCommand,
    UpdateItemCommand
} = require("@aws-sdk/client-dynamodb");
const {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    ScanCommand
} = require("@aws-sdk/lib-dynamodb");
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');


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





const createTodo = async (event) => {

    console.log(event.body);



    try {

        var request = JSON.parse(event.body);
        request = { todoId: "sdfsdfsdfsdf", ...request };

        const response = await ddbDocClient.send(new PutCommand({
            TableName: TODO_TABLE,
            Item: marshall(request || {}),
        }));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Successfully Created", response })
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message, event: event, request: request })
        }
    }


}

const listTodo = async (event) => {

    try {

        const response = await ddbDocClient.send(new ScanCommand({ TableName: TODO_TABLE }));


        console.log(response);

        return {
            statusCode: 200,
            body: JSON.stringify({ response })
        }

    } catch (error) {
        console.log("what error: ", error)
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }



}

const getTodo = async (event) => {

    try {

        const response = await ddbDocClient.send(new GetCommand,
            ({ TableName: TODO_TABLE, Key: marshall({ postId: event.pathParameters.postId }) }));


        console.log(response);

        return {
            statusCode: 200,
            body: JSON.stringify({ response })
        }

    } catch (error) {
        console.log("what error: ", error)
        return {
            statusCode: 500,
            body: JSON.stringify(error)
        }
    }



}

const deleteTodo = async (event) => {

    console.log(event.body);



    try {

        const response = await ddbDocClient.send(new PutCommand({
            TableName: TODO_TABLE,
            Key: marshall({ todoId: event.pathParameters.todoId }),
        }));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Successfully deleted", response })
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message, event: event })
        }
    }


}

const updateTodo = async (event) => {

    console.log(event.body);



    try {

        var request = JSON.parse(event.body);
        request = { todoId: "sdfsdfsdfsdf", ...request };

        const response = await ddbDocClient.send(new PutCommand({
            TableName: TODO_TABLE,
            Key: marshall({ todoId: event.pathParameters.todoId }),
        }));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Successfully Updated", response })
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message, event: event, request: request })
        }
    }


}

module.exports = { createTodo, listTodo, deleteTodo,updateTodo,getTodo }