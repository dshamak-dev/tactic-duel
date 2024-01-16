export const navigateTo = (address: string, props) => {
  const { redirect } = props || { redirect: false };
  let pathname = address;

  if (redirect) {
    pathname += `?redirect=${location.pathname}`;
  }

  location.href = pathname;
};
