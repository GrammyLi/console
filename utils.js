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

const isNumber = value => typeof value === "number"

const isBool = value => typeof value === "boolean"

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

const templateItem = (type, layer, index, frontContent, endContent) => {
  const l = index
  const n = layer
  const bn = '&nbsp'.repeat((n - 1))
  return `
      <div class="g-log-item g-item" data-n="${n}" data-type="${type}" data-i="${l}">
        <div class="g-log-unfold">▶</div>
        <div class="g-log-number g-log-${type}-${n}-${l}">
          ${frontContent}
        </div>
        <div class="g-log-number g-log-backup-${type}-${n}-${l} g-hide">
        ${endContent}
        </div>
      </div>
      `
}

const spanColor = (color, value) => {
  return `<span class="g-${color}">${value}</span>`
}