import {
  setRoundedValue,
  convertTimestampToTime,
  convertTimestampToDayName,
} from "./HelperFunction";

test("set value should be round", () => {
  expect(setRoundedValue(31.2)).toBe(31);
  expect(setRoundedValue(28.9324932439243)).toBe(28);
});

test("set timestamp to day name (shorthand)", () => {
  expect(convertTimestampToDayName(1617768000)).toBe("Wed");
  expect(convertTimestampToDayName(1617940800)).toBe("Fri");
});

test("set timestamp to time", () => {
  expect(convertTimestampToTime(1617749071)).toBe("5:44 AM");
  expect(convertTimestampToTime(1617792899)).toBe("5:54 PM");
});
