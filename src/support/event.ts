export const triggerCustomEvent = (event: string, data: any) => {
  const _ev = new CustomEvent(event, { detail: {data} });

  document.dispatchEvent(_ev);
};

export const addCustomEvent = (event: string, callback) => {
  document.addEventListener(event, callback);
};

export const removeCustomEvent = (event: string, callback) => {
  document.removeEventListener(event, callback);
};
