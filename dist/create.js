"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveItemToDb = void 0;
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
module.exports.create = async (event, context) => {
    console.log(event);
    const empData = JSON.parse(event.body || '');
    console.log(empData);
    let insertResponse = await saveItemToDb(empData);
    const response = {
        statusCode: 200,
        body: JSON.stringify(insertResponse)
    };
    return response;
};
function saveItemToDb(empdata) {
    const params = {
        TableName: 'Covid_Management',
        Item: {
            case_id: "" + Math.floor(Math.random() * (1000 - 7 + 1) + 7),
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
        .catch(err => err);
}
exports.saveItemToDb = saveItemToDb;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Nhc2VzL2NyZWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBbUM7QUFJbkMsTUFBTSxRQUFRLEdBQUcsSUFBSSxrQkFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBRS9DLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBRSxLQUFzQixFQUFFLE9BQWdCLEVBQUUsRUFBRTtJQUV2RSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQVMsQ0FBQTtJQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXJCLElBQUksY0FBYyxHQUFHLE1BQU0sWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRWpELE1BQU0sUUFBUSxHQUFpQjtRQUMzQixVQUFVLEVBQUUsR0FBRztRQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztLQUN2QyxDQUFBO0lBRUQsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRUYsU0FBZ0IsWUFBWSxDQUFDLE9BQWE7SUFDdEMsTUFBTSxNQUFNLEdBQUc7UUFDWCxTQUFTLEVBQUUsa0JBQWtCO1FBQzdCLElBQUksRUFBRTtZQUNGLE9BQU8sRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztZQUN0RCwwQkFBMEI7WUFDMUIsY0FBYyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxjQUFjLEVBQUU7WUFDM0MsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLG1CQUFtQjtZQUNoRCxrQkFBa0IsRUFBRSxPQUFPLENBQUMsa0JBQWtCO1lBQzlDLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVztZQUNoQyxhQUFhLEVBQUUsT0FBTyxDQUFDLGFBQWE7WUFDcEMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1lBQzFCLFVBQVUsRUFBRSxPQUFPLENBQUMsVUFBVTtTQUNqQztLQUNKLENBQUM7SUFFRixPQUFPLFFBQVE7U0FDTixHQUFHLENBQUMsTUFBTSxDQUFDO1NBQ1gsT0FBTyxFQUFFO1NBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDO1NBQ2hCLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzlCLENBQUM7QUFyQkQsb0NBcUJDO0FBQUEsQ0FBQyJ9