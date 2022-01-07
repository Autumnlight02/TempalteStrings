const { performance } = require("perf_hooks");

function randomName(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function testFunction1(name) {
  const string = `hello, ${name} how was your day?`;
  return string;
}

function testFunction2(name) {
  const string = "hello, " + name + " how was your day?";
  return string;
}

function testFunction3(name1, name2, name3) {
  const string = `hello, ${name1} ${name2} ${name3} how are you guys?`;
  return string;
}

function testFunction4(name1, name2, name3) {
  const string = "hello, " + name1 + name2 + name3 + " how are you guys?";
  return string;
}

// utility await
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// waiting 250 miliseconds so its not an cold start

(async () => {
  await delay(500);

  console.log("-------------------------- Testing one variable --------------------------");

  test1(1);
  test1(1000);
  test1(1000000);

  console.log("-------------------------- Testing three variables --------------------------");

  test2(1);
  test2(1000);
  test2(1000000);
})();

async function test1(cases) {
  const name = randomName(20);

  const temp = [];
  const performanceTest1 = [];
  const performanceTest2 = [];

  for (let i = 0; i < cases; i++) {
    // testing the performance of function 1
    let start, end;

    start = performance.now();
    temp.push(testFunction1(name));
    end = performance.now();

    performanceTest1.push(end - start);

    // testing the performance of function 2
    start = performance.now();
    temp.push(testFunction2(name));
    end = performance.now();

    performanceTest2.push(end - start);
  }

  // console logging it so its being used

  const performanceResult1 = averageAndTotalTime(performanceTest1);
  const performanceResult2 = averageAndTotalTime(performanceTest2);

  console.log("----- testCases: " + cases + " -----");
  console.log(`Template String: averageTime: ${performanceResult1[0]}ms and totalTime: ${performanceResult1[1]}ms`);
  console.log(
    "Concat String: averageTime  : " + performanceResult2[0] + "ms and totalTime: " + performanceResult2[1] + "ms"
  );
  return true;
}

async function test2(cases) {
  const name1 = randomName(20);
  const name2 = randomName(20);
  const name3 = randomName(20);

  const temp = [];
  const performanceTest1 = [];
  const performanceTest2 = [];

  for (let i = 0; i < cases; i++) {
    // testing the performance of function 1
    let start, end;

    start = performance.now();
    temp.push(testFunction3(name1, name2, name3));
    end = performance.now();

    performanceTest1.push(end - start);

    // testing the performance of function 2
    start = performance.now();
    temp.push(testFunction4(name1, name2, name3));
    end = performance.now();

    performanceTest2.push(end - start);
  }

  // console logging it so its being used

  const performanceResult1 = averageAndTotalTime(performanceTest1);
  const performanceResult2 = averageAndTotalTime(performanceTest2);

  console.log("----- testCases: " + cases + " -----");
  console.log(`Template String: averageTime: ${performanceResult1[0]}ms and totalTime: ${performanceResult1[1]}ms`);
  console.log(
    "Concat String: averageTime  : " + performanceResult2[0] + "ms and totalTime: " + performanceResult2[1] + "ms"
  );
  return true;
}

/**
 * renders the average time
 */
function averageAndTotalTime(array) {
  let total = 0;
  for (let i = 0; i < array.length; i++) {
    total += array[i];
  }
  return [total / array.length, total];
}
