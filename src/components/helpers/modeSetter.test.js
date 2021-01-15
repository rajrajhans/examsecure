const fn = require("./modeSetter");

// Checks that mode = 1. This test is to make sure that I don't deploy dev config to prod
// TODO: change mode to fetch from env var so that this is unnecessary

function testIsModeOne() {
  expect(fn.mode).toBe(1);
}

test("Checks that mode is 1", testIsModeOne);
