import client from ".";

export function getTest() {
    return client.get('/user')
}