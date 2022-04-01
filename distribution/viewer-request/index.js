// See https://medium.com/@chrispointon/default-files-in-s3-subdirectories-using-cloudfront-and-lambda-edge-941100a3c629
// Register this as the viewer-request trigger handler
"use strict";

function objectToQueryString(obj) {
  var str = [];
  for (var param in obj)
    if (obj[param].multiValue)
      str.push(param + "=" + obj[param].multiValue.map((item) => item.value).join(','));
    else if (obj[param].value == '')
      str.push(param);
    else
      str.push(param + "=" + obj[param].value);

  return str.join("&");
}

function handler(event) {
  // Extract the request from the CloudFront event that is sent to Lambda@Edge
  var request = event.request;

  var host = request.headers.host.value;

  request.headers["x-forwarded-host"] = { value: host };

  // Extract the URI and params from the request
  var olduri = request.uri;
  //console.log(olduri)

  // Match any uri that ends with some combination of
  // [0-9][a-z][A-Z]_- and append a slash
  var endslashuri = olduri.replace(/(\/[\w\-]+)$/, "$1/");

  //console.log("Old URI: " + olduri);
  //console.log("End slash URI: " + endslashuri);

  if (endslashuri != olduri) {
    // If we changed the uri, 301 to the version with a slash, appending querystring
    /*var params = "";
    console.log(request.querystring)
    if ("querystring" in request && request.querystring.length > 0) {
      params = "?" + request.querystring;
    }
    var newuri = endslashuri + params;*/

    var newuri = endslashuri

    if (Object.keys(request.querystring).length) {
      newuri = `${endslashuri}?${objectToQueryString(request.querystring)}`
    }

    //console.log("Params: " + params);
    //console.log("New URI: " + newuri);
    //console.log(newuri)

    var response = {
      statusCode: 301,
      statusDescription: "Permanently moved",
      headers: {
        location: {
          value: newuri
        }

      }
    };

    //console.log("redirect")
    return response;
  } else {
    //console.log("bypass")
    // Return to CloudFront
    return request;
  }
};
