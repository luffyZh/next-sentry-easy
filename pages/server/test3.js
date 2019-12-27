const Test3 = () => <h1>Client Test 3</h1>;

Test3.getInitialProps = () => {
  const doAsyncWork = () => Promise.reject(new Error('Server Test 3'));

  doAsyncWork();

  return {};
}

export default Test3;