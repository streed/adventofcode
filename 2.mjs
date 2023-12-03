import * as fs from 'fs';
import * as read from 'readline';

function parse(line) {
  const matches = line.match(/^Game (\d+)/);

  const matchId = matches[1];
  line = line.replace(/^Game \d+:/, '');

  const games = line
    .split(';')
    .map(game => game.split(',')
      .map((g) => {
        const m = g.match(/\s(\d+)\s(\w+)/)
        return {
          color: m[2],
          count: parseInt(m[1])
        };
      }));

  return {
    id: parseInt(matchId),
    games: games
  };
}


const RED = 12;
const GREEN = 13;
const BLUE = 14;
const COUNTS = {
  'red': RED,
  'green': GREEN,
  'blue': BLUE
}

function partOne(game) {

  const valids = game.games.filter((game) => {
    const valid = game.map((cur) => {
      if (COUNTS[cur.color] >= cur.count) {
        return true;
      }

      return false;
    });

    return valid.every((cur) => cur === true);
  });

  if (valids.length === game.games.length) {
    return game.id;
  } else {
    return 0;
  }
}

function partTwo(game) {
  const maxCount = game.games.reduce((maxCount, game) => {

    game.forEach((cur) => {
      maxCount[cur.color] = Math.max(maxCount[cur.color] || 0, cur.count);
    });

    return maxCount;
  }, {});

  console.log(maxCount);

  return Object.values(maxCount).reduce((acc, cur) => acc * cur, 1);
}

async function run() {
  const filestream = fs.createReadStream('./data/input_2');
  const rl = read.createInterface({
    input: filestream,
    crlfDelay: Infinity
  });
  let total = 0;
  for await (let rawline of rl) {
    const parsed = parse(rawline);
    total += partTwo(parsed);
  }
  console.log(total);
}

run();
