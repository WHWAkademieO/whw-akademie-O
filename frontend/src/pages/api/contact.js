import { decodeEmail } from "@/utils/helpers";
import Mailjet from "node-mailjet";
import thankyouText from "../../../src/data/thankyou.json";
import moment from "moment";
import { getEmailSetting } from "@/functions/prevBuildUtilities";
export default async function handler(req, res) {
  const publicKey = process.env.MAILJET_KEY_PUBLIC;
  const privateKey = process.env.MAILJET_KEY_PRIVATE;

  if (!publicKey || !privateKey) {
    return res.status(500).json({ error: "Could not obtain Mailjet keys. " });
  }
  const mailjet = Mailjet.apiConnect(publicKey, privateKey);
  const {
    name,
    email,
    message,
    phone,
    adminMail,
    userMail,
    adminUsers,
  } = req.body;
  const mailjetTemplateID = 3466776;
  const subject = "Website Contact Form Submission ";
  const recipient = email;

  const userConfig = adminUsers.map(ele => ({
    Name: ele.name,
    Email: ele.email,
  }));

  const date = moment()
    .local("de")
    .format("MMMM Do YY");
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
        Subject: `WHW-Akademie O! - Eingangsbestätigung Ihrer Anfrage für eine Raumreservierung / Anmeldung für unser Event`,
        TextPart: "",
        HTMLPart: `<div style="max-width:600px;">
          <p>Sehr geehrte/r <strong> ${name},</strong> <br/>
         ${userMail}
        </div>
        `,
      },
      {
        From: {
          Email: "kathrin.risse@whw.de",
          name: "WHW CD",
        },
        To: [...userConfig],
        Subject: `Neue Formular-Einreichung eingegangen`,
        TextPart: ``,
        HTMLPart: ` 
          <div style="max-width:600px;">
          ${adminMail}
        <div style="margin-top:8px;"> </div>
        <strong> Formular-Einreichungsdatum: </strong> ${date}<br/>
        <div style="margin-top:8px;"> </div>
        <strong> Absender:</strong>  ${name} <br/>
        <div style="margin-top:8px;"> </div>
        <strong> Kontaktinformationen des Absenders:</strong>  ${email} / ${phone} <br/>
        <div style="margin-top:8px;"> </div>
        <strong>Betreff des Formulars:</strong> ${message}  </p>
        <div style="margin-top:8px;"> </div>
        </div>

        `,
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
