import { APIGatewayEvent, Context } from "aws-lambda";
import { Case } from "./model/case";
import { DynamoDB } from "aws-sdk";
import { CaseResponse } from "./model/caseResponse";

const dynamoDb = new DynamoDB.DocumentClient();

module.exports.update = async (event: APIGatewayEvent, context: Context) => {
    //Grab case_id from queryStringParameters
    //Retrieve updated information from the body

    let case_id = event.queryStringParameters!.case_id;
    const empData = JSON.parse(event.body || '') as Case

    const updatedCase = await updateCaseById(case_id, empData);

    const response: CaseResponse = {
        statusCode: 200,
        body: updatedCase
    }

    return response;
};

export function updateCaseById(case_id: string, empdata: Case){
    const params = {
        TableName: 'Covid_Management',
        Key: {
            case_id
        },
        UpdateExpression: "set #risk_level = :risk_level, #date_submitted = :date_submitted",
        ExpressionAttributeNames: {'#risk_level': 'risk_level', '#date_submitted': 'date_submitted'},
        ExpressionAttributeValues: {
            ":risk_level": empdata.risk_level,
            ":date_submitted": empdata.date_submitted
        }
    };

    return dynamoDb
            .update(params)
            .promise()
            .then(res => res)
            .catch(err => err)
};