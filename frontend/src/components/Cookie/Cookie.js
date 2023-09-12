import React, { useState } from "react";
import CookieBot from "react-cookiebot";
const Cookie = () => {
  const domainIdGroup = "4c2f26c9-cd33-4e30-8da7-306b194e2b66";
  const [hasCookieBot, setHasCookieBot] = useState(undefined);
  return (
    <div>
      <CookieBot domainGroupId={domainIdGroup} language="DE" />
      {/* <h2>Click to test Cookiebot</h2>
      <button
        onClick={() => setHasCookieBot(!!document.querySelector("#CookieBot"))}
      >
        test
      </button>
      <h3 style={{ color: "red", marginVertical: 10 }}>
        {hasCookieBot && `Has CookieBot: ${JSON.stringify(hasCookieBot)}`}
      </h3> */}
    </div>
  );
};

export default Cookie;
