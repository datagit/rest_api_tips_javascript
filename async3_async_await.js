function increaseSalary(base, increase) {
  const newSalary = base + increase;
  console.log(`run at increaseSalary: new salary ${newSalary}`);
  return newSalary;
}

// increaseSalary(1000, 100);

function promiseFromBoss(base, increase) {
  return new Promise((resolve, reject) => {
    // setTimeout(() => resolve(base + increase), 3000); //                     -> get by .then(r)
    setTimeout(() => reject(new Error('my error from Boss')), 3000); //   -> get by .catch(e)
  });
}

async function increaseSalaryV2(base, increase) {
  const newSalary = await promiseFromBoss(base, increase);
  console.log(`run at increaseSalaryV2 in FUNCTION: new salary ${newSalary}`);
  return newSalary;
}

// get catch from out my logic
increaseSalaryV2(1000, 100)
  .then((r) => {
    console.log(`run at increaseSalaryV2.then ${r}`);
  })
  .catch((e) => {
    console.log(`run at increaseSalaryV2.catch ${e.message}`);
  });

  // get catch in my logic
async function increaseSalaryV3(base, increase) {
  let newSalary;
  try {
    newSalary = await promiseFromBoss(base, increase);
    console.log(`run at increaseSalaryV3 in FUNCTION: new salary from .then() ${newSalary}`);
  } catch (error) {
    console.error(`run at increaseSalaryV3: error from .catch() ${error.message}`);
    console.log(`run at increaseSalaryV3: error from .catch() ${newSalary}`);
  }
  return newSalary;
}

increaseSalaryV3(1000, 100)
  .then((r) => {
    console.log(`run at increaseSalaryV3.then ${r}`);
  })
  .catch((e) => {
    console.log(`run at increaseSalaryV3.catch ${e.message}`);
  });
