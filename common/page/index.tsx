import React from "react";

import { IntlProvider, FormattedMessage } from "react-intl";
import French from "common/messages/fr.json";
import Polish from "common/messages/pl.json";
import English from "common/messages/en.json";
import Ukranian from "common/messages/ua.json";
import Romanian from "common/messages/ro.json";

const messages = {
  fr: French,
  en: English,
  pl: Polish,
  ua: Ukranian,
  ro: Romanian,
};

export default ({ lang, children }: any) => {
  return (
    <IntlProvider
      locale={lang}
      messages={messages[lang as keyof typeof messages]}
    >
      {children}
    </IntlProvider>
  );
};
