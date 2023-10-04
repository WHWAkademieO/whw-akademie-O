import React, { useEffect, useMemo, forwardRef, useState, useRef } from "react";
import parse from "html-react-parser";
import { BsXCircle } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { generateJsonString } from "@/utils/helpers";
import { getEmailSetting } from "@/functions/prevBuildUtilities";
import { EMAIL_EVENT_TYPE } from "@/constant";
const EventModal = forwardRef(function(
  { date, title, content, openKey, itemKey, setOpenKey, eventItem },
  ref
) {
  const isOpen = useMemo(() => !!openKey, [openKey]);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [emailSetting, setEmailSetting] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onFormSubmit = async data => {
    setIsFormLoading(true);
    await fetch("/api/contact", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        ...emailSetting,
        type: EMAIL_EVENT_TYPE,
      }),
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setFormSuccess(true);
        reset();
      })
      .catch(err => console.log("Form Error: " + err))
      .finally(() => {
        setIsFormLoading(false);
      });
  };

  useEffect(() => {
    getEmailSetting().then(res => setEmailSetting(res));
  }, []);

  const generateFullOption = eventItem => {
    switch (eventItem.acf?.full_option) {
      case "Registration":
        return (
          <h6 className="my-10 text-center">
            {parse(`${eventItem.acf?.registration_info}`)}
          </h6>
        );
      case "full":
        return (
          <h6 className="my-10 text-center">{eventItem.acf?.full_text}</h6>
        );
      default:
        return (
          <form
            onSubmit={handleSubmit(onFormSubmit)}
            action=""
            className="flex flex-col w-full items-center"
          >
            <input
              {...register("name", {
                required: "Dieses Feld ist erforderlich",
              })}
              id="name"
              type="text"
              aria-label="name"
              className="w-full border-b-[3px] bg-transparent mt-5 md:mt-10 text-center focus:outline-none border-black"
            />
            <label htmlFor="name" className="mt-2 inline-block">
              Ihr Name
            </label>
            <p className="mt-2 text-sm text-red-400">{errors.name?.message}</p>
            <input
              {...register("email", {
                required: "Dieses Feld ist erforderlich",
                pattern: /^\S+@\S+$/i,
              })}
              id="email"
              aria-label="email"
              type="text"
              className="w-full mt-3 md:mt-6 border-b-[3px] bg-inherit text-center focus:outline-none border-black"
            />
            <label htmlFor="email" className="mt-2 inline-block">
              Ihre E-Mail-Adresse
            </label>
            <p className="mt-2 text-sm text-red-400">{errors.email?.message}</p>
            <input
              {...register("phone", {
                required: "Dieses Feld ist erforderlich",
              })}
              id="phone"
              type="number"
              aria-label="phone"
              className="w-full bg-inherit mt-10 border-b-[3px] text-center focus:outline-none border-black"
            />
            <label htmlFor="phone" className="mt-2 inline-block">
              Ihre Telefonnummer
            </label>
            <p className="mt-2 text-sm text-red-400">{errors.phone?.message}</p>
            <textarea
              // {...register("message")}
              rows={3}
              id="news"
              type="text"
              aria-label="message"
              className="w-full mt-20 lg:mt-[50px] border-b-[3px] bg-inherit text-center focus:outline-none border-black"
            />
            <label htmlFor="news" className="mt-2 inline-block">
              Ihre Nachricht
            </label>
            <button
              className="py-3 px-4 my-2 bg-black font-semibold transition-all mt-8 text-white hover:bg-white hover:text-black border border-black"
              type="submit"
              aria-label="submit"
            >
              {!isFormLoading ? "verbindlich buchen" : "Lädt..."}
            </button>
          </form>
        );
    }
  };

  return (
    <div
      onClick={() => {
        setOpenKey("");
      }}
      data-modal={itemKey}
      className={`fixed inset-0 flex w-screen pt- h-screen  flex-col justify-center p-10 px-5 md:px-10 md:pt-20 items-center transition delay-500 duration-1000 ${
        isOpen ? "z-50" : "-z-10"
      }`}
    >
      <div
        onClick={e => e.stopPropagation()}
        ref={ref}
        className={`modal-container transition duration-500 overflow-x-hidden z-[100] relative bg-white bg-opacity-90 mx-auto flex flex-col items-center w-[90%] lg:w-3/5 px-5 py-5 ${
          !openKey ? "opacity-0 -z-10 bg-opacity-0" : "opacity-100 z-[50]"
        }`}
      >
        <div
          onClick={() => {
            setOpenKey("");
            setFormSuccess(false);
            reset();
          }}
          className="absolute top-3 hove right-3 text-2xl cursor-pointer"
        >
          <BsXCircle className="hover:fill-black" />
        </div>
        {openKey && (
          <div className="flex flex-col items-center w-[90%] md:px-5 py-5">
            <h2 className="text-lg md:text-xl font-bold lg:text-2xl  md:max-w-[500px] text-center">
              {eventItem?.title?.rendered}
            </h2>
            {!formSuccess && eventItem?.content?.rendered && (
              <div className="text-center mt-5 md:mt-8">
                {parse(eventItem?.content?.rendered || "")}
              </div>
            )}
            {!formSuccess ? (
              generateFullOption(eventItem)
            ) : (
              <span className="text-main_green text-center mt-4">
                Herzlichen Dank für Ihre Anfrage. Wir werden uns in Kürze bei
                Ihnen zurückmelden.
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
});
EventModal.displayName = "EventModal";
EventModal.defaultProps = {
  date: "26.02.2023 I 16 UHR PROBLEMLÖSUNGSTECHNIKEN IN DER QS",
  content: `<p>cae alibero et inis alitem evendit etusanda quas modite mi, odipsaestis exeratio quam quatquasitio molorere ipsae cum quia por sinciaerspit fugita dolut eum voluptaeris ut et dol dite mi, odipsaestis ROB exeratio quam quatquasitio molorere ipsae cum quia por sinciaerspit fugita dolut eum voluptaeris UN IN ut edite mi, odipsaestis exeratio 
    <strong>quam quatquasitio molorere ipsae cum quia por sinciaerspits</strong>
    </p>`,
};
export default EventModal;
