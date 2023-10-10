import { decodeEmail } from "@/utils/helpers";
import Mailjet from "node-mailjet";
import thankyouText from "../../../src/data/thankyou.json";
import moment from "moment";
import { getEmailSetting } from "@/functions/prevBuildUtilities";
import { EMAIL_EVENT_TYPE, EMAIL_ROOM_BOOKING_TYPE } from "@/constant";
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
    senderMail,
    userMail,
    adminUsers,
    type,
  } = req.body;
  const mailjetTemplateID = 3466776;
  const subject = "Website Contact Form Submission ";
  const recipient = email;
  let currentSender = {};
  const userConfig =
    adminUsers.length > 0
      ? adminUsers?.map(ele => ({
          Name: ele.name,
          Email: ele.email,
        }))
      : [];

  // call sender
  let senders = [];
  const request = mailjet.get("sender", { version: "v3" }).request();

  senders = await request
    .then(result => {
      const { Data } = result.body;
      return Data;
    })
    .catch(e => console.log(err));

  // console.log(senders);
  const idx = senders.findIndex(ele => {
    const { Email } = ele;
    const { email } = senderMail;
    return Email === email && ele.Status === "Active";
  });
  // console.log(senderMail);
  // console.log(idx);

  if (idx === -1) {
    const qualifiedSender = senders.find(ele => {
      const { IsDefaultSender } = ele;
      return IsDefaultSender === true;
    });
    currentSender.email = qualifiedSender.Email;
    currentSender.name = "WHW Akademie O!";
  } else {
    currentSender.email = senders[idx].Email;
    currentSender.name = senderMail.name;
  }

  let title = "WHW-Akademie O! - Eingangsbestätigung Ihrer ";

  if (type === EMAIL_EVENT_TYPE) {
    title += "Anmeldung für unser Event";
  } else if (type === EMAIL_ROOM_BOOKING_TYPE) {
    title += "Anfrage für eine Raumreservierung";
  }

  const date = moment()
    .local("de")
    .format("MMMM Do YY");
  const config = {
    Messages: [
      {
        From: {
          Email: currentSender.email,
          name: currentSender.name,
        },
        To: [
          {
            Email: recipient,
            Name: name,
          },
        ],
        Subject: title,
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
        <strong>Nachricht:</strong> ${message}  </p>
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
