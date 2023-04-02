const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export const baseUrl = isDev
  ? "http://localhost:5001/omnissiah-6ac8a/us-central1/api"
  : "https://us-central1-omnissiah-6ac8a.cloudfunctions.net/api";
