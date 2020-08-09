"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCaseById = void 0;
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
module.exports.delete = async (event, context) => {
    //Read case_id from queryStringParameters
    let case_id = event.queryStringParameters.case_id;
    await deleteCaseById(case_id);
    const response = {
        statusCode: 204,
        body: undefined
    };
    return response;
};
function deleteCaseById(case_id) {
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
        .catch(err => err);
}
exports.deleteCaseById = deleteCaseById;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Nhc2VzL2RlbGV0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBbUM7QUFHbkMsTUFBTSxRQUFRLEdBQUcsSUFBSSxrQkFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBRS9DLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBRSxLQUFzQixFQUFFLE9BQWdCLEVBQUUsRUFBRTtJQUN2RSx5Q0FBeUM7SUFDekMsSUFBSSxPQUFPLEdBQVcsS0FBSyxDQUFDLHFCQUFzQixDQUFDLE9BQU8sQ0FBQztJQUUzRCxNQUFNLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixNQUFNLFFBQVEsR0FBaUI7UUFDM0IsVUFBVSxFQUFFLEdBQUc7UUFDZixJQUFJLEVBQUUsU0FBUztLQUNsQixDQUFBO0lBRUQsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRUYsU0FBZ0IsY0FBYyxDQUFDLE9BQWU7SUFDMUMsTUFBTSxNQUFNLEdBQUc7UUFDWCxTQUFTLEVBQUUsa0JBQWtCO1FBQzdCLEdBQUcsRUFBRTtZQUNELE9BQU87U0FDVjtLQUNKLENBQUM7SUFFRixPQUFPLFFBQVE7U0FDTixNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ2QsT0FBTyxFQUFFO1NBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDO1NBQ2hCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzlCLENBQUM7QUFiRCx3Q0FhQyJ9