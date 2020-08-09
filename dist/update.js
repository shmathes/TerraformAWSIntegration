"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCaseById = void 0;
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
module.exports.update = async (event, context) => {
    //Grab case_id from queryStringParameters
    //Retrieve updated information from the body
    let case_id = event.queryStringParameters.case_id;
    const empData = JSON.parse(event.body || '');
    const updatedCase = await updateCaseById(case_id, empData);
    const response = {
        statusCode: 200,
        body: updatedCase
    };
    return response;
};
function updateCaseById(case_id, empdata) {
    const params = {
        TableName: 'Covid_Management',
        Key: {
            case_id
        },
        UpdateExpression: "set #risk_level = :risk_level, #date_submitted = :date_submitted",
        ExpressionAttributeNames: { '#risk_level': 'risk_level', '#date_submitted': 'date_submitted' },
        ExpressionAttributeValues: {
            ":risk_level": empdata.risk_level,
            ":date_submitted": empdata.date_submitted
        }
    };
    return dynamoDb
        .update(params)
        .promise()
        .then(res => res)
        .catch(err => err);
}
exports.updateCaseById = updateCaseById;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Nhc2VzL3VwZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxxQ0FBbUM7QUFHbkMsTUFBTSxRQUFRLEdBQUcsSUFBSSxrQkFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBRS9DLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBRSxLQUFzQixFQUFFLE9BQWdCLEVBQUUsRUFBRTtJQUN2RSx5Q0FBeUM7SUFDekMsNENBQTRDO0lBRTVDLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxxQkFBc0IsQ0FBQyxPQUFPLENBQUM7SUFDbkQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBUyxDQUFBO0lBRXBELE1BQU0sV0FBVyxHQUFHLE1BQU0sY0FBYyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUUzRCxNQUFNLFFBQVEsR0FBaUI7UUFDM0IsVUFBVSxFQUFFLEdBQUc7UUFDZixJQUFJLEVBQUUsV0FBVztLQUNwQixDQUFBO0lBRUQsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRUYsU0FBZ0IsY0FBYyxDQUFDLE9BQWUsRUFBRSxPQUFhO0lBQ3pELE1BQU0sTUFBTSxHQUFHO1FBQ1gsU0FBUyxFQUFFLGtCQUFrQjtRQUM3QixHQUFHLEVBQUU7WUFDRCxPQUFPO1NBQ1Y7UUFDRCxnQkFBZ0IsRUFBRSxrRUFBa0U7UUFDcEYsd0JBQXdCLEVBQUUsRUFBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFDO1FBQzVGLHlCQUF5QixFQUFFO1lBQ3ZCLGFBQWEsRUFBRSxPQUFPLENBQUMsVUFBVTtZQUNqQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsY0FBYztTQUM1QztLQUNKLENBQUM7SUFFRixPQUFPLFFBQVE7U0FDTixNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ2QsT0FBTyxFQUFFO1NBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDO1NBQ2hCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzlCLENBQUM7QUFuQkQsd0NBbUJDO0FBQUEsQ0FBQyJ9