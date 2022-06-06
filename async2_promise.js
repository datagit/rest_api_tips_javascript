const promise = function asyncOperation(name) {
  return new Promise((resolve, reject) => {
    resolve(name);
  });
}

promise('Dat').then(result => {
  console.log(`run at promise.then ${result}`);
})