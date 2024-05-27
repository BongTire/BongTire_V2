import { Request } from 'express';

interface Status {
    code: number;
    message: string;
}

function getStatus(statusCode: number): Status {
    let message: string;
    switch (statusCode) {
        case 1000:
            message = 'Continue';
            break;
        case 1010:
            message = 'Switching Protocols';
            break;
        case 2000:
            message = 'OK';
            break;
        case 2001:
            message = 'Created';
            break;
        case 2002:
            message = 'Accepted';
            break;
        case 2003:
            message = 'Non-Authoritative Information';
            break;
        case 2004:
            message = 'No Content';
            break;
        case 2005:
            message = 'Reset Content';
            break;
        case 2006:
            message = 'Partial Content';
            break;
        case 2100:
            message = '';
            break;
        case 2200:
            message = '';
            break;
        case 2300:
            message = '';
            break;
        case 3000:
            message = 'Multiple Choices';
            break;
        case 3001:
            message = 'Moved Permanently';
            break;
        case 3002:
            message = 'Found';
            break;
        case 3003:
            message = 'See Other';
            break;
        case 3004:
            message = 'Not Modified';
            break;
        case 3005:
            message = 'Use Proxy';
            break;
        case 3007:
            message = 'Temporary Redirect';
            break;
        case 4000:
            message = 'Bad Request';
            break;
        case 4001:
            message = 'Unauthorized';
            break;
        case 4002:
            message = 'Payment Required';
            break;
        case 4003:
            message = 'Forbidden';
            break;
        case 4004:
            message = 'Not Found';
            break;
        case 4005:
            message = 'Method Not Allowed';
            break;
        case 4006:
            message = 'Not Acceptable';
            break;
        case 4007:
            message = 'Proxy Authentication Required';
            break;
        case 4008:
            message = 'Request Timeout';
            break;
        case 4009:
            message = 'Conflict';
            break;
        case 4010:
            message = 'Gone';
            break;
        case 4011:
            message = 'Length Required';
            break;
        case 4012:
            message = 'Precondition Failed';
            break;
        case 4013:
            message = 'Payload Too Large';
            break;
        case 4014:
            message = 'URI Too Long';
            break;
        case 4015:
            message = 'Unsupported Media Type';
            break;
        case 4016:
            message = 'Range Not Satisfiable';
            break;
        case 4017:
            message = 'Expectation Failed';
            break;
        case 4100:
            message = '';
            break;
        case 4200:
            message = '';
            break;
        case 4300:
            message = '';
            break;
        case 4400:
            message = '';
            break;
        case 4500:
            message = '';
            break;
        case 5000:
            message = 'Internal Server Error';
            break;
        case 5001:
            message = 'Not Implemented';
            break;
        case 5002:
            message = 'Bad Gateway';
            break;
        case 5003:
            message = 'Service Unavailable';
            break;
        case 5004:
            message = 'Gateway Timeout';
            break;
        case 5005:
            message = 'HTTP Version Not Supported';
            break;
        case 5100:
            message = "Failed to save the data to the database.";
            break;
        case 5101:
            message = "Failed to save the reservation data to the database.";
            break;
        case 5102:
            message = "Failed to save the data to the database.";
            break;
        default:
            message = 'Unknown Status';
            break;
    }
    return {
        code: statusCode,
        message: message
    };
}

export { getStatus };
