const fs = require('fs');
const readline = require('readline');

const NUMS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

function proc(line) {
  let nums = [];
  let num = '';

  NUMS.forEach((val) => {
    let startIndex = 0;
    while ((index = line.indexOf(val, startIndex)) > -1) {
      nums.push([NUMS.indexOf(val), index]);
      startIndex = index + val.length;
    }
  });

  for (let i = 0; i < line.length; i++) {
    if (line[i] >= '0' && line[i] <= '9') {
      const c = line[i] - '0';
      nums.push([c, i]);
    }
  }

  nums = nums.filter((v) => v[1] != -1).sort((a, b) => a[1] - b[1]);

  return nums[0][0] * 10 + nums[nums.length - 1][0];
}

async function run() {
  const filestream = fs.createReadStream('./data/input_1');
  const rl = readline.createInterface({
    input: filestream,
    crlfDelay: Infinity
  });

  let first = true;
  let total = 0;

  for await (let rawline of rl) {
    total += proc(rawline);
  }

  console.log(total);
}

run();
