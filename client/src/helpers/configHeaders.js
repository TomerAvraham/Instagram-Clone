export const configHeaders = () => {
  const config = {
    "Content-Type": "application/json",
    "x-access-token":
      localStorage.accessToken && JSON.parse(localStorage.accessToken),
  };

  return config;
};
