const e = (sel) => document.querySelector(sel);

const es = sel => document.querySelectorAll(sel)

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

const bindEvent = (el, name, cb) => {
  el.addEventListener(name, cb)
}

const bindAll = (sel, name, cb) => {
  es(sel).forEach(ele => {
    bindEvent(ele, name, cb)
  })
}