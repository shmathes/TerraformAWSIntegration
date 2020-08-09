"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeeById = exports.getAllEmployeeData = void 0;
const aws_sdk_1 = require("aws-sdk");
//Create dynamoDb object
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
module.exports.get = async (event, context) => {
    const type = event.pathParameters.type;
    //Return all case information
    if (type === 'all') {
        const employees = await getAllEmployeeData();
        const response = {
            statusCode: 200,
            body: JSON.stringify(employees)
        };
        return response;
    }
    /*
    Pull single case
    Cases will be pulled in using multiple queryStringParameters => case_id, employee_id, employee_nam
    Grab case_id from query string parameter
    */
    else if (type === 'single') {
        const queryString = event.queryStringParameters;
        //TODO: Find better option to pull key from queryString object
        let key = '';
        for (let i in queryString) {
            key = i;
        }
        if (key === 'case_id') {
            let case_id = event.queryStringParameters.case_id;
            const employee = await getEmployeeById(case_id);
            const response = {
                statusCode: 200,
                body: JSON.stringify(employee)
            };
            return response;
        }
    }
};
//TODO: Implement environment variables
function getAllEmployeeData() {
    const params = {
        TableName: 'Covid_Management'
    };
    return dynamoDb
        .scan(params)
        .promise()
        .then(res => res.Items)
        .catch(err => err);
}
exports.getAllEmployeeData = getAllEmployeeData;
function getEmployeeById(case_id) {
    const params = {
        TableName: 'Covid_Management',
        Key: {
            case_id
        }
    };
    return dynamoDb
        .get(params)
        .promise()
        .then(res => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return ({
            case_id: (_a = res.Item) === null || _a === void 0 ? void 0 : _a.case_id,
            date_submitted: (_b = res.Item) === null || _b === void 0 ? void 0 : _b.date_submitted,
            employee_first_name: (_c = res.Item) === null || _c === void 0 ? void 0 : _c.employee_first_name,
            employee_last_name: (_d = res.Item) === null || _d === void 0 ? void 0 : _d.employee_last_name,
            employee_id: (_e = res.Item) === null || _e === void 0 ? void 0 : _e.employee_id,
            employee_name: (_f = res.Item) === null || _f === void 0 ? void 0 : _f.employee_name,
            location: (_g = res.Item) === null || _g === void 0 ? void 0 : _g.location,
            risk_level: (_h = res.Item) === null || _h === void 0 ? void 0 : _h.risk_level
        });
    })
        .catch(err => err);
}
exports.getEmployeeById = getEmployeeById;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Nhc2VzL2dldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBbUM7QUFJbkMsd0JBQXdCO0FBQ3hCLE1BQU0sUUFBUSxHQUFHLElBQUksa0JBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUU5QyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxLQUFLLEVBQUUsS0FBc0IsRUFBRSxPQUFnQixFQUFFLEVBQUU7SUFDckUsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLGNBQWUsQ0FBQyxJQUFJLENBQUM7SUFFeEMsNkJBQTZCO0lBQzdCLElBQUcsSUFBSSxLQUFLLEtBQUssRUFDakI7UUFDSSxNQUFNLFNBQVMsR0FBSSxNQUFNLGtCQUFrQixFQUFFLENBQUM7UUFDOUMsTUFBTSxRQUFRLEdBQWlCO1lBQzNCLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1NBQ2xDLENBQUE7UUFDRCxPQUFPLFFBQVEsQ0FBQztLQUNuQjtJQUNEOzs7O01BSUU7U0FDRyxJQUFHLElBQUksS0FBSyxRQUFRLEVBQ3pCO1FBQ0ksTUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLHFCQUFxQixDQUFDO1FBRWhELDhEQUE4RDtRQUM5RCxJQUFJLEdBQUcsR0FBVSxFQUFFLENBQUM7UUFDcEIsS0FBSSxJQUFJLENBQUMsSUFBSSxXQUFXLEVBQ3hCO1lBQ0ksR0FBRyxHQUFHLENBQUMsQ0FBQztTQUNYO1FBRUQsSUFBRyxHQUFHLEtBQUssU0FBUyxFQUNwQjtZQUNJLElBQUksT0FBTyxHQUFXLEtBQUssQ0FBQyxxQkFBc0IsQ0FBQyxPQUFPLENBQUM7WUFFM0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEQsTUFBTSxRQUFRLEdBQWlCO2dCQUMzQixVQUFVLEVBQUUsR0FBRztnQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7YUFDakMsQ0FBQTtZQUVELE9BQU8sUUFBUSxDQUFDO1NBQ25CO0tBQ0o7QUFDTCxDQUFDLENBQUM7QUFFRix1Q0FBdUM7QUFDdkMsU0FBZ0Isa0JBQWtCO0lBRTlCLE1BQU0sTUFBTSxHQUFHO1FBQ1gsU0FBUyxFQUFFLGtCQUFrQjtLQUNoQyxDQUFDO0lBRUYsT0FBTyxRQUFRO1NBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUNaLE9BQU8sRUFBRTtTQUNULElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7U0FDdEIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQVhELGdEQVdDO0FBRUQsU0FBZ0IsZUFBZSxDQUFDLE9BQWU7SUFDM0MsTUFBTSxNQUFNLEdBQUc7UUFDWCxTQUFTLEVBQUUsa0JBQWtCO1FBQzdCLEdBQUcsRUFBRTtZQUNELE9BQU87U0FDVjtLQUNKLENBQUM7SUFFRixPQUFPLFFBQVE7U0FDTixHQUFHLENBQUMsTUFBTSxDQUFDO1NBQ1gsT0FBTyxFQUFFO1NBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFOztRQUFDLE9BQUEsQ0FBQztZQUNWLE9BQU8sUUFBRSxHQUFHLENBQUMsSUFBSSwwQ0FBRSxPQUFPO1lBQzFCLGNBQWMsUUFBRSxHQUFHLENBQUMsSUFBSSwwQ0FBRSxjQUFjO1lBQ3hDLG1CQUFtQixRQUFFLEdBQUcsQ0FBQyxJQUFJLDBDQUFFLG1CQUFtQjtZQUNsRCxrQkFBa0IsUUFBRSxHQUFHLENBQUMsSUFBSSwwQ0FBRSxrQkFBa0I7WUFDaEQsV0FBVyxRQUFFLEdBQUcsQ0FBQyxJQUFJLDBDQUFFLFdBQVc7WUFDbEMsYUFBYSxRQUFFLEdBQUcsQ0FBQyxJQUFJLDBDQUFFLGFBQWE7WUFDdEMsUUFBUSxRQUFFLEdBQUcsQ0FBQyxJQUFJLDBDQUFFLFFBQVE7WUFDNUIsVUFBVSxRQUFFLEdBQUcsQ0FBQyxJQUFJLDBDQUFFLFVBQVU7U0FDM0IsQ0FBQSxDQUFBO0tBQUEsQ0FBQztTQUNULEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUF0QkQsMENBc0JDIn0=