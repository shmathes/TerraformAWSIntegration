"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeeById = exports.getAllEmployeeData = exports.get = void 0;
const aws_sdk_1 = require("aws-sdk");
//Create dynamoDb object
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
exports.get = async (event, context) => {
    const type = event.pathParameters.type;
    if (type === 'all') {
        const employees = await getAllEmployeeData();
        const response = {
            statusCode: 200,
            body: JSON.stringify(employees)
        };
        return response;
    }
    else if (type === 'single') {
        const queryString = event.queryStringParameters;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Nhc2VzL2dldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBbUM7QUFJbkMsd0JBQXdCO0FBQ3hCLE1BQU0sUUFBUSxHQUFHLElBQUksa0JBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUVsQyxRQUFBLEdBQUcsR0FBWSxLQUFLLEVBQUUsS0FBc0IsRUFBRSxPQUFnQixFQUFFLEVBQUU7SUFDM0UsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLGNBQWUsQ0FBQyxJQUFJLENBQUM7SUFDeEMsSUFBRyxJQUFJLEtBQUssS0FBSyxFQUNqQjtRQUNJLE1BQU0sU0FBUyxHQUFJLE1BQU0sa0JBQWtCLEVBQUUsQ0FBQztRQUM5QyxNQUFNLFFBQVEsR0FBaUI7WUFDM0IsVUFBVSxFQUFFLEdBQUc7WUFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7U0FDbEMsQ0FBQTtRQUNELE9BQU8sUUFBUSxDQUFDO0tBQ25CO1NBQU0sSUFBRyxJQUFJLEtBQUssUUFBUSxFQUMzQjtRQUNJLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQztRQUNoRCxJQUFJLEdBQUcsR0FBVSxFQUFFLENBQUM7UUFDcEIsS0FBSSxJQUFJLENBQUMsSUFBSSxXQUFXLEVBQ3hCO1lBQ0ksR0FBRyxHQUFHLENBQUMsQ0FBQztTQUNYO1FBQ0QsSUFBRyxHQUFHLEtBQUssU0FBUyxFQUNwQjtZQUNJLElBQUksT0FBTyxHQUFXLEtBQUssQ0FBQyxxQkFBc0IsQ0FBQyxPQUFPLENBQUM7WUFFM0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEQsTUFBTSxRQUFRLEdBQWlCO2dCQUMzQixVQUFVLEVBQUUsR0FBRztnQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7YUFDakMsQ0FBQTtZQUVELE9BQU8sUUFBUSxDQUFDO1NBQ25CO0tBQ0o7QUFDTCxDQUFDLENBQUM7QUFFRixTQUFnQixrQkFBa0I7SUFFOUIsTUFBTSxNQUFNLEdBQUc7UUFDWCxTQUFTLEVBQUUsa0JBQWtCO0tBQ2hDLENBQUM7SUFFRixPQUFPLFFBQVE7U0FDTixJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ1osT0FBTyxFQUFFO1NBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztTQUN0QixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBWEQsZ0RBV0M7QUFFRCxTQUFnQixlQUFlLENBQUMsT0FBZTtJQUMzQyxNQUFNLE1BQU0sR0FBRztRQUNYLFNBQVMsRUFBRSxrQkFBa0I7UUFDN0IsR0FBRyxFQUFFO1lBQ0QsT0FBTztTQUNWO0tBQ0osQ0FBQztJQUVGLE9BQU8sUUFBUTtTQUNOLEdBQUcsQ0FBQyxNQUFNLENBQUM7U0FDWCxPQUFPLEVBQUU7U0FDVCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7O1FBQUMsT0FBQSxDQUFDO1lBQ1YsT0FBTyxRQUFFLEdBQUcsQ0FBQyxJQUFJLDBDQUFFLE9BQU87WUFDMUIsY0FBYyxRQUFFLEdBQUcsQ0FBQyxJQUFJLDBDQUFFLGNBQWM7WUFDeEMsbUJBQW1CLFFBQUUsR0FBRyxDQUFDLElBQUksMENBQUUsbUJBQW1CO1lBQ2xELGtCQUFrQixRQUFFLEdBQUcsQ0FBQyxJQUFJLDBDQUFFLGtCQUFrQjtZQUNoRCxXQUFXLFFBQUUsR0FBRyxDQUFDLElBQUksMENBQUUsV0FBVztZQUNsQyxhQUFhLFFBQUUsR0FBRyxDQUFDLElBQUksMENBQUUsYUFBYTtZQUN0QyxRQUFRLFFBQUUsR0FBRyxDQUFDLElBQUksMENBQUUsUUFBUTtZQUM1QixVQUFVLFFBQUUsR0FBRyxDQUFDLElBQUksMENBQUUsVUFBVTtTQUMzQixDQUFBLENBQUE7S0FBQSxDQUFDO1NBQ1QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQXRCRCwwQ0FzQkMifQ==