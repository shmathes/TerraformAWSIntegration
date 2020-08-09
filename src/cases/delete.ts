import { APIGatewayEvent, Context } from "aws-lambda";
import { DynamoDB } from 'aws-sdk';
import { CaseResponse } from './model/caseResponse'

const dynamoDb = new DynamoDB.DocumentClient();

module.exports.delete = async (event: APIGatewayEvent, context: Context) => {
    //Read case_id from queryStringParameters
    let case_id: string = event.queryStringParameters!.case_id;

    await deleteCaseById(case_id);
    const response: CaseResponse = {
        statusCode: 204,
        body: undefined
    }

    return response;
};

export function deleteCaseById(case_id: string) {
    const params = {
        TableName: 'Covid_Management',
        Key: {
            case_id
        }
    };

    return dynamoDb
            .delete(params)
            .promise()
            .then(res => res)
            .catch(err => err)
}