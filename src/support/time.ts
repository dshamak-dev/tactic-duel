export const waitForMS = (ms: number): Promise<any> => {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
};

export const waitForMap = async (
  arr: any[],
  delay: number,
  onItem: (item: any, index: number) => void
): Promise<any> => {
  return new Promise(async (res) => {
    let _arr = arr.slice();
    let index = -1;

    const makeStep = async () => {
      if (_arr.length === 0) {
        res(null);
        return;
      }

      index += 1;
      const item = _arr.splice(0, 1)[0];
      onItem(item, index);

      await waitForMS(delay);

      makeStep();
    };

    makeStep();
  });
};
