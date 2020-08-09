import { APIGatewayEvent, Handler, Context } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { CaseResponse } from './model/caseResponse';
import { Case } from './model/case';

const dynamoDb = new DynamoDB.DocumentClient();

module.exports.create = async (event: APIGatewayEvent, context: Context) => {

    console.log(event);
    const empData = JSON.parse(event.body || '') as Case
    console.log(empData);

    let insertResponse = await saveItemToDb(empData);

    const response: CaseResponse = {
        statusCode: 200,
        body: JSON.stringify(insertResponse)
    }

    return response;
};

export function saveItemToDb(empdata: Case){
    const params = {
        TableName: 'Covid_Management',
        Item: {
            case_id: "" + Math.floor(Math.random() * (1000-7+1)+7),
            //TODO: Fix date submitted
            date_submitted: Date.now().toLocaleString(),
            employee_first_name: empdata.employee_first_name,
            employee_last_name: empdata.employee_last_name,
            employee_id: empdata.employee_id,
            employee_name: empdata.employee_name,
            location: empdata.location,
            risk_level: empdata.risk_level
        }
    };

    return dynamoDb
            .put(params)
            .promise()
            .then(res => res)
            .catch(err => err)
};