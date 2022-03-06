const e = (sel) => document.querySelector(sel);

const log = console.log.bind(console);

const isArray = function (o) {
  return Array.isArray(o);
};

const isObject = function (o) {
  return Object.prototype.toString.call(o) === "[object Object]";
};

const isString = value => typeof value === "string"

const appendHtml = (element, html) => {
  element.insertAdjacentHTML("beforeend", html);
};