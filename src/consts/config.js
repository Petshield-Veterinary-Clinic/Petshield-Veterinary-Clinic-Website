const prod = {
  API_BASE_URL: "https://petshield-veterinary-api-dev.herokuapp.com",
  WS_BASE_URL: `wss://petshield-veterinary-api-dev.herokuapp.com`,
  WS_TIMEOUT: 25000,
};

const dev = {
  API_BASE_URL: "https://petshield-veterinary-api-dev.herokuapp.com",
  WS_BASE_URL: `wss://petshield-veterinary-api-dev.herokuapp.com`,
  WS_TIMEOUT: 25000,
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
