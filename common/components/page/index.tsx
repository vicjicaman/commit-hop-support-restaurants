import React from "react";

import { IntlProvider, FormattedMessage } from "react-intl";
import fr from "common/messages/fr.json";
import pl from "common/messages/pl.json";
import en from "common/messages/en.json";
import uk from "common/messages/uk.json";
import ro from "common/messages/ro.json";
import hu from "common/messages/hu.json";
import sk from "common/messages/sk.json";
import es from "common/messages/es.json";
import de from "common/messages/de.json";

const messages = {
  fr,
  en,
  pl,
  uk,
  ro,
  hu,
  sk,
  es,
  de,
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
