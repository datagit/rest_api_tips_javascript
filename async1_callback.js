const funcCallback = (name) => {
  console.log(`run at funcCallback ${name}`);
};

function asyncOperation(name, callback) {
  console.log(`run at asyncOperation ${name}`);
  callback(name);
}

asyncOperation('Dat', funcCallback);