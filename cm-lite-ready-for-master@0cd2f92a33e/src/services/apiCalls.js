import axios from "axios";
import { REACT_NATIVE_APP_BASE_URL } from "@env";
import { apiHeaderProvider } from "../util/url";

let baseUrl = REACT_NATIVE_APP_BASE_URL;
//let baseUrl = "http://10.4.11.32:80/";
let subrl = "creditfile/api";
let AppendedbaseUrl = baseUrl + subrl;

async function getMethodWithParams(type, params) {
  let fetchedurlType = apiHeaderProvider[type];
  let url = `${AppendedbaseUrl}/` + fetchedurlType;

  try {
    const response = await axios.get(url, {
      params: params,
    });
    return response;
  } catch (error) {
    if (error.toJSON().message === "Network Error") {
      throw new Error("NoInternet");
    }
  }
}

async function PostAlternative(type, params) {
  let fetchedurlType = apiHeaderProvider[type];
  let url = `${AppendedbaseUrl}/` + fetchedurlType;
  let data = params;
  try {
    console.log("i m coming here");
    const response = await axios({
      method: "POST",
      url: url,
      headers: { "Content-Type": "text/json" },
      data: data,
    });
    return response;
  } catch (error) {
    if (error.toJSON().message === "Network Error") {
      throw new Error("NoInternet");
    }
  }
  return result;
}

export { getMethodWithParams, PostAlternative };
