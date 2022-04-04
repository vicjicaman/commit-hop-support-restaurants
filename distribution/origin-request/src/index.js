"use strict";

export const handler = async (event) => {
  const request = event.Records[0].cf.request;
  const requestUri = request.uri;

  const host =
    request.headers["x-forwarded-host"][0]
      .value;

  if (!host) {
    return request;
  }

  const pathEnd = /(\/[\w\-]+)(\/+)$/;
  try {

    if (pathEnd.test(requestUri) || requestUri === "/" ) {
      request.uri = "/index.html";
      return request;
    }

  } catch (_error) {
    console.log(_error.toString());
  }

  return request;
};
