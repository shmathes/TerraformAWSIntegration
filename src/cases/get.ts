import { APIGatewayEvent, Handler, Context } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { CaseResponse } from './model/caseResponse';
import { Case } from './model/case';

//Create dynamoDb object
const dynamoDb = new DynamoDB.DocumentClient();

 module.exports.get = async (event: APIGatewayEvent, context: Context) => {
    const type = event.pathParameters!.type;

    //Return all case information
    if(type === 'all')
    {
        const employees =  await getAllEmployeeData();
        const response: CaseResponse = {
            statusCode: 200,
            body: JSON.stringify(employees)
        }
        return response;
    } 
    /*
    Pull single case
    Cases will be pulled in using multiple queryStringParameters => case_id, employee_id, employee_nam
    Grab case_id from query string parameter
    */
    else if(type === 'single')
    {
        const queryString = event.queryStringParameters;

        //TODO: Find better option to pull key from queryString object
        let key:string = '';
        for(let i in queryString)
        {
            key = i;
        }

        if(key === 'case_id')
        {
            let case_id: string = event.queryStringParameters!.case_id;

            const employee = await getEmployeeById(case_id);
            const response: CaseResponse = {
                statusCode: 200,
                body: JSON.stringify(employee)
            }

            return response;
        }
    }
};

//TODO: Implement environment variables
export function getAllEmployeeData()
{
    const params = {
        TableName: 'Covid_Management'
    };

    return dynamoDb
            .scan(params)
            .promise()
            .then(res => res.Items)
            .catch(err => err);
}

export function getEmployeeById(case_id: string){
    const params = {
        TableName: 'Covid_Management',
        Key: {
            case_id
        }
    };

    return dynamoDb
            .get(params)
            .promise()
            .then(res => ({
                case_id: res.Item?.case_id,
                date_submitted: res.Item?.date_submitted,
                employee_first_name: res.Item?.employee_first_name,
                employee_last_name: res.Item?.employee_last_name,
                employee_id: res.Item?.employee_id,
                employee_name: res.Item?.employee_name,
                location: res.Item?.location,
                risk_level: res.Item?.risk_level
            }as Case))
            .catch(err => err);
}