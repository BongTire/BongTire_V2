export function returnFormat(code: number, message: string, data: any | null, total?: number | string) {
    const result: { status: { code: number, message: string }, data: any, total?: number | string } = {
        status: {
            code: code,
            message: message
        },
        data: data
    };

    // total이 제공된 경우에만 result 객체에 추가
    if (total !== undefined) {
        result.total = total;
    }

    return result;
}
