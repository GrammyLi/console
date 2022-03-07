const objectLine1 = (v) => {
  // return JSON.stringify(v)
  // {name: 'grammyli', name1: 'grammy', name3: 'g'}
  // {name: 'g-console', num: 15, obj: {…}}
  // {name: 'g-console', num: 123, bool: false, obj: {…}, arr: Array(3)}
  let ks = Object.keys(v);
  const b = "&nbsp";
  let left = b + "{";
  let right = "}";
  let eles = [];
  for (let i = 0; i < ks.length; i++) {
    let k = ks[i];
    let value = v[k];
    let ele = "";
    if (isObject(value)) {
      ele = k + ": {…}";
    } else if (isArray(value)) {
      ele = `${k}: Array(${value.length})`;
    } else if (isString(value)) {
      ele = `${k}: '${value}'`;
    } else {
      ele = `${k}: ${value}`;
    }
    eles.push(ele);
  }
  let center = eles.join("," + b);
  let r = left + center + right;
  return r;
};

/**
name: "grammyli"
name1: "grammy"
name3: "g"
 */
const objectLine2 = (v, n) => {
  n += 1;
  const b = "&nbsp";
  // 两个空格
  const b2 = b.repeat(2);
  const bn = b.repeat((n - 1) * 2);
  const triangle = '<div class="g-log-unfold">▶</div>';
  const lines = [];
  const ks = Object.keys(v);
  for (let i = 0; i < ks.length; i++) {
    let line = "";
    let k = ks[i];
    let value = v[k];
    if (isObject(value)) {
      line = bn + triangle + k + ":" + b2 + objLog(value, n);
    } else if (isArray(value)) {
      // arr: (3) [1, 3, 'str']
      line = bn + triangle + k + ":" + b2 + arrLog(value, n);
    } else if (isString(value)) {
      line = bn + k + ":" + b2 + '"' + value + '"';
    } else {
      line = bn + k + ":" + b2 + value;
    }
    lines.push(line);
  }
  const r = lines.join("</br>");
  return r;
};

const objectLine3 = (v, n) => {
  const b = "&nbsp";
  // 两个空格
  const bn = b.repeat(n - 1);
  const t = ` <div class="g-log-unfold">▶</div>`;
  return bn + t + "[[Prototype]]: Object";
};

const objectProtoype = (v, n) => {
  const b = "&nbsp";
  // 两个空格
  const bn = b.repeat((n - 1) * 2);
  const funcNames = Object.getOwnPropertyNames(Object.prototype).sort((a, b) =>
    a.localeCompare(b)
  );
  const b2 = "&nbsp".repeat(2);
  const triangle = '<div class="g-log-unfold">▶</div>';
  // constructor: ƒ Object()
  // TODO 需要优化代码
  return funcNames
    .map((f) => {
      const name = f === "constructor" ? "Object" : f;
      return `${bn}${b2}${triangle}${f}: f ${name}()`;
    })
    .join("</br>");
};

const objLog = (v, n = 1) => {
  // {name: 'grammyli', name1: 'grammy', name3: 'g'}
  const l1 = objectLine1(v);
  const l2 = objectLine2(v, n);
  const l3 = objectLine3(v, n);
  const l4 = objectProtoype(v, n);
  const lines = [l1, l2, l3, l4];
  const r = lines.join("</br>");
  return r;
};

const templateObject = (value) => {
  return `
  <div class="g-log-item g-item" data-n="1">
    <div class="g-log-unfold">▶</div>
    <span class="g-log-number g-log-number-1">
      ${value}
    </span>
  </div>
  `;
};