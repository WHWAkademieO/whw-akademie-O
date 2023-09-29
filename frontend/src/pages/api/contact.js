import { decodeEmail } from "@/utils/helpers";
import Mailjet from "node-mailjet";
import thankyouText from "../../../src/data/thankyou.json";

export default async function handler(req, res) {
  const publicKey = process.env.MAILJET_KEY_PUBLIC;
  const privateKey = process.env.MAILJET_KEY_PRIVATE;

  if (!publicKey || !privateKey) {
    return res.status(500).json({ error: "Could not obtain Mailjet keys. " });
  }
  const mailjet = Mailjet.apiConnect(publicKey, privateKey);
  const { name, email, message, phone } = req.body;
  const mailjetTemplateID = 3466776;
  const subject = "Website Contact Form Submission ";
  const recipient = email;

  const config = {
    Messages: [
      {
        From: {
          Email: "kathrin.risse@whw.de",
          name: "WHW CD",
        },
        To: [
          {
            Email: recipient,
            Name: name,
          },
        ],
        Subject: subject,
        TextPart:
          "Thank you for getting in touch! We appreciate you contacting us. One of our colleagues will get back in touch with you soon!Have a great day!",
        HTMLPart: thankyouText,
      },
    ],
  };
  try {
    const request = mailjet.post("send", { version: "v3.1" }).request(config);

    request
      .then(result => {
        return res.status(200).json({ success: true, data: result.body });
      })
      .catch(err => {
        return res.status(500).json({ error: err.message });
      });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}
