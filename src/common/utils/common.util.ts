function fromDaysToMilliseconds(days: number): number {
  return days * 24 * 60 * 60 * 1000;
}

function fromMinutesToMilliseconds(minutes: number): number {
  return minutes * 60 * 1000;
}

export const CommonUtil = {
  fromDaysToMilliseconds,
  fromMinutesToMilliseconds,
};
