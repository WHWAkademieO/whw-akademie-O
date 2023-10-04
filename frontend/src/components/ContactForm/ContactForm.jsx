import { gql } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./contactForm.module.scss";
import parse from "html-react-parser";
import { getEmailSetting } from "@/functions/prevBuildUtilities";
const ContactForm = props => {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const {
    attributes: { title, content },
  } = props;
  const [check, setCheck] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [emailSetting, setEmailSetting] = useState();

  const onSubmitForm = async data => {
    // get email setting
    // console.log(emailSetting);
    const response = await fetch("/api/contact", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, ...emailSetting, type: "room-booking" }),
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        setFormSuccess(false);
        throw new Error("something went wrong");
      })
      .then(data => {
        setFormSuccess(true);
        reset();
      })
      .catch(err => console.log("Form Error: " + err));
  };
  useEffect(() => {
    if (!formSuccess) return;
    setTimeout(() => {
      setFormSuccess(false);
    }, [5000]);
  }, [formSuccess]);

  useEffect(() => {
    getEmailSetting().then(res => {
      setEmailSetting(res);
    });
  }, []);
  return (
    <div className="container flex flex-col gap-8 mb-20 text-center items-center  py-10 md:py-16 lg:py-20 ">
      <h2 className="max-w-[800px] leading-[1.2] uppercase">{parse(title)}</h2>
      <div className="w-5 h-5 rounded-full bg-[#007138]"></div>
      {content && <p>{parse(content)}</p>}
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className={`flex flex-col w-full items-center text-center ${styles.form}`}
      >
        <input
          {...register("name", { required: "Dieses Feld ist erforderlich" })}
          id="name"
          aria-invalid={errors.name ? true : false}
          aria-label="name"
          type="text"
          className="w-full border-b-[3px] mt-10 text-center focus:outline-none border-black"
        />
        <p className="mt-2 text-sm text-red-400">{errors.name?.message}</p>
        <label htmlFor="name" className="mt-2 inline-block">
          Ihr Name
        </label>
        <input
          {...register("email", {
            required: "Dieses Feld ist erforderlich",
            pattern: /^\S+@\S+$/i,
          })}
          id="email"
          aria-label="email"
          type="text"
          className="w-full mt-10 border-b-[3px] text-center focus:outline-none border-black"
        />
        <p className="mt-2 text-sm text-red-400">{errors.email?.message}</p>
        <label htmlFor="email" className="mt-2 inline-block">
          Ihre E-Mail-Adresse
        </label>
        <input
          {...register("phone", { required: "Dieses Feld ist erforderlich" })}
          id="phone"
          type="number"
          aria-label="phone"
          className="w-full mt-10 border-b-[3px] text-center focus:outline-none border-black"
        />
        <p className="mt-2 text-sm text-red-400">{errors.phone?.message}</p>
        <label htmlFor="phone" className="mt-2 inline-block">
          Ihre Telefonnummer
        </label>

        <textarea
          {...register("message")}
          rows={3}
          id="news"
          type="text"
          aria-label="message"
          className="w-full mt-20 lg:mt-[150px] border-b-[3px] text-center focus:outline-none border-black"
        />
        <label htmlFor="news" className="mt-2 inline-block">
          Ihre Nachricht
        </label>
        <p className="mt-10 text-left">
          <input
            {...register("policy", {
              required: "Dieses Feld ist erforderlich",
            })}
            value={check}
            onChange={e => setCheck(e.target.value)}
            type="checkbox"
            id="policy"
          />{" "}
          <label htmlFor="policy">
            Ich bin damit einverstanden, dass die abgesendeten Daten zum Zweck
            der Bearbeitung meines Anliegens verarbeitet werden. Mir ist
            bewusst, dass die Kommunikation über Formulare und E-Mails nicht zur
            Übermittlung vertraulicher Daten dient. Weitere Informationen finde
            ich in der{" "}
            <span
              className="font-bold cursor-pointer"
              onClick={() => window.open("/datenschutz")}
            >
              Datenschutzerklärung
            </span>
            .
          </label>
          <span className="mt-2 text-sm block text-left text-red-400">
            {errors.policy?.message}
          </span>
        </p>
        <button
          type="submit"
          aria-label="submit"
          className="px-5 border border-black text-white mt-10 hover:bg-white hover:text-black py-3 bg-black"
        >
          absenden
        </button>
        {formSuccess && (
          <span className="text-main_green mt-4">
            Herzlichen Dank für Ihre Anfrage. Wir werden uns in Kürze bei Ihnen
            zurückmelden.
          </span>
        )}
      </form>
    </div>
  );
};

ContactForm.defaultProps = {
  attributes: {
    title: "NEHMEN SIE DOCH EINFACH KONTAKT ZU UNS AUF",
    content: ` Ich bin damit einverstanden, dass die abgesendeten Daten zum Zweck der
    Bearbeitung meines Anliegens verarbeitet werden. Mir ist bewusst, dass
    die Kommunikation über Formulare und E-Mails nicht zur Übermittlung
    vertraulicher Daten dient. Weitere Informationen finde ich in der
    Datenschutzerklärung.`,
  },
};

ContactForm.displayName = `CreateBlockFormBlock`;

ContactForm.fragments = {
  key: `formBlockFragment`,
  entry: gql`
    fragment formBlockFragment on CreateBlockFormBlock {
      attributes {
        title
        content
      }
    }
  `,
};

export default ContactForm;
