const MAX_RETRIES = 2;
const RETRY_START = 1000;

export const retryWrapper = (p, timeout, retryN) =>
  new Promise((resolve, reject) =>
    p()
      .then(resolve)
      .catch((e) => {
        if (retryN === MAX_RETRIES) {
          alert("Please ensure that your internet connection is working fine.");
          window.location.reload();
          return reject(e);
        }
        const t = (timeout || RETRY_START / 2) * 2;
        const r = (retryN || 0) + 1;
        console.log(`Retry n. ${r} in ${t / 1000}s...`);
        setTimeout(() => retryWrapper(p, t, r).then(resolve).catch(reject), t);
      })
  );

export const isUndefined = (x) => typeof x === "undefined";

export const isEmpty = (x) =>
  x === null ||
  isUndefined(x) ||
  (Array.isArray(x)
    ? x.length === 0
    : typeof x === "string"
    ? x.trim() === ""
    : false);
