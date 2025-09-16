/* eslint-disable @typescript-eslint/no-explicit-any */
import { base } from "./fetch";
import { asyncRunSafe } from "@/utils";

export type IOnDataMoreInfo = {
  conversationId?: string;
  taskId?: string;
  messageId: string;
  errorMessage?: string;
  errorCode?: string;
};

export type IOtherOptions = {
  isPublicAPI?: boolean;
  isMarketplaceAPI?: boolean;
  bodyStringify?: boolean;
  needAllResponseContent?: boolean;
  deleteContentType?: boolean;
  silent?: boolean;
};

export function format(text: string) {
  let res = text.trim();
  if (res.startsWith("\n")) res = res.replace("\n", "");

  return res.replaceAll("\n", "<br/>").replaceAll("```", "");
}

const baseFetch = base;

// base request
export const request = async <T>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  try {
    const otherOptionsForBaseFetch = otherOptions || {};
    const [err, resp] = await asyncRunSafe<T>(
      baseFetch(url, options, otherOptionsForBaseFetch)
    );
    if (err === null) return resp;
    else {
      const errResp: Response = err as any;
      return Promise.reject(errResp);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

// request methods
export const get = <T>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  return request<T>(
    url,
    Object.assign({}, options, { method: "GET" }),
    otherOptions
  );
};

// For public API
export const getPublic = <T>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  return get<T>(url, options, { ...otherOptions, isPublicAPI: true });
};

export const post = <T>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  return request<T>(
    url,
    Object.assign({}, options, { method: "POST" }),
    otherOptions
  );
};

export const postPublic = <T>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  return post<T>(url, options, { ...otherOptions, isPublicAPI: true });
};

export const put = <T>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  return request<T>(
    url,
    Object.assign({}, options, { method: "PUT" }),
    otherOptions
  );
};

export const putPublic = <T>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  return put<T>(url, options, { ...otherOptions, isPublicAPI: true });
};

export const del = <T>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  return request<T>(
    url,
    Object.assign({}, options, { method: "DELETE" }),
    otherOptions
  );
};

export const delPublic = <T>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  return del<T>(url, options, { ...otherOptions, isPublicAPI: true });
};

export const patch = <T>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  return request<T>(
    url,
    Object.assign({}, options, { method: "PATCH" }),
    otherOptions
  );
};

export const patchPublic = <T>(
  url: string,
  options = {},
  otherOptions?: IOtherOptions
) => {
  return patch<T>(url, options, { ...otherOptions, isPublicAPI: true });
};
