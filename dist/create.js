"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveItemToDb = void 0;
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
module.exports.create = async (event, context) => {
    console.log(context);
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
    let today = new Date();
    let dd = String(today.getDate());
    let mm = String(today.getMonth() + 1);
    let yyy = today.getFullYear();
    let date = dd + '/' + mm + '/' + yyy;
    const params = {
        TableName: 'Covid_Management',
        Item: {
            case_id: "" + Math.floor(Math.random() * (1000 - 7 + 1) + 7),
            //TODO: Fix date submitted
            date_submitted: date,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Nhc2VzL2NyZWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBbUM7QUFJbkMsTUFBTSxRQUFRLEdBQUcsSUFBSSxrQkFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBRS9DLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEtBQUssRUFBRSxLQUFzQixFQUFFLE9BQVksRUFBeUIsRUFBRTtJQUUxRixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQVMsQ0FBQTtJQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXJCLElBQUksY0FBYyxHQUFHLE1BQU0sWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRWpELE1BQU0sUUFBUSxHQUFpQjtRQUMzQixVQUFVLEVBQUUsR0FBRztRQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztLQUN2QyxDQUFBO0lBRUQsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBRUYsU0FBZ0IsWUFBWSxDQUFDLE9BQWE7SUFDdEMsSUFBSSxLQUFLLEdBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUM3QixJQUFJLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDakMsSUFBSSxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN0QyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDOUIsSUFBSSxJQUFJLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNyQyxNQUFNLE1BQU0sR0FBRztRQUNYLFNBQVMsRUFBRSxrQkFBa0I7UUFDN0IsSUFBSSxFQUFFO1lBQ0YsT0FBTyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLElBQUksR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO1lBQ3RELDBCQUEwQjtZQUMxQixjQUFjLEVBQUUsSUFBSTtZQUNwQixtQkFBbUIsRUFBRSxPQUFPLENBQUMsbUJBQW1CO1lBQ2hELGtCQUFrQixFQUFFLE9BQU8sQ0FBQyxrQkFBa0I7WUFDOUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO1lBQ2hDLGFBQWEsRUFBRSxPQUFPLENBQUMsYUFBYTtZQUNwQyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7WUFDMUIsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVO1NBQ2pDO0tBQ0osQ0FBQztJQUVGLE9BQU8sUUFBUTtTQUNOLEdBQUcsQ0FBQyxNQUFNLENBQUM7U0FDWCxPQUFPLEVBQUU7U0FDVCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7U0FDaEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDOUIsQ0FBQztBQTFCRCxvQ0EwQkM7QUFBQSxDQUFDIn0=