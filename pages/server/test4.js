const doAsyncWork = () => Promise.reject(new Error('Server Test 4'));
doAsyncWork();

const Test4 = () => <h1>Client Test 4</h1>;

export default Test4;