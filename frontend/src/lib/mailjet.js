import axios from "axios";

const mailjet = axios.create({
  baseURL: "https://api.mailjet.com/v3.1",
  auth: {
    username: process.env.MAILJET_KEY_PUBLIC,
    password: process.env.MAILJET_PRIVATE_PUBLIC,
  },
});

export default mailjet;
