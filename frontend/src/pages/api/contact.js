import { decodeEmail } from "@/utils/helpers";
import Mailjet from "node-mailjet";
import thankyouText from "../../../src/data/thankyou.json";
import moment from "moment";
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
          <div style="margin-top:10px;"> </div>
        Vielen Dank für Ihre Anfrage für eine Raumreservierung / Anmeldung für unser bevorstehendes Event. Wir schätzen Ihr Interesse an unserem Angebot und möchten Ihnen versichern, dass Ihre Anfrage in Bearbeitung ist.<br/>
        <div style="margin-top:10px;"> </div>
        Unsere Mitarbeiter arbeiten daran, Ihre Anfrage zu prüfen und sicherzustellen, dass wir Ihre Bedürfnisse bestmöglich erfüllen können. Wir werden uns in Kürze wieder bei Ihnen melden, 
        um die Details Ihrer Reservierung / Anmeldung zu bestätigen oder gegebenenfalls weitere Informationen anzufordern.<br/>
        <div style="margin-top:10px;"> </div>
        Wir sind bestrebt, Ihnen so schnell wie möglich eine Rückmeldung zu geben und sicherzustellen, dass alles reibungslos verläuft.<br/>
        <div style="margin-top:10px;"> </div>
        In der Zwischenzeit, falls Sie Fragen oder besondere Wünsche haben, zögern Sie bitte nicht, sich mit uns in Verbindung zu setzen. Wir stehen Ihnen gerne zur Verfügung, um Ihre Anliegen zu klären.<br/>
        <div style="margin-top:10px;"> </div>
        Vielen Dank für Ihr Verständnis und Ihre Geduld während dieses Prozesses. Wir freuen uns darauf, mit Ihnen zusammenzuarbeiten und Sie bei Ihrer Veranstaltung / Reservierung willkommen zu heißen.<br/>
        <div style="margin-top:10px;"> </div>
        Mit freundlichen Grüßen,</p> 
        ${thankyouText}
        </div>
        `,
      },
      {
        From: {
          Email: "kathrin.risse@whw.de",
          name: "WHW CD",
        },
        To: [
          {
            Email: "akademie@whw.de",
            Name: "WHW CD",
          },
        ],
        Subject: `Neue Formular-Einreichung eingegangen`,
        TextPart: ``,
        HTMLPart: ` 
          <div style="max-width:600px;">
          <p>Hallo WHW-Team, <br/>
          <div style="margin-top:8px;"> </div>
        Ein neues Formular wurde eingereicht. <br/>
        <div style="margin-top:8px;"> </div>
        <strong> Hier sind die Details der eingegangenen Formular-Einreichung: </strong>
        <br/>
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
