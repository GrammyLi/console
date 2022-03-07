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
const objectLine2 = (v, n, index) => {
  n += 1;
  const b = "&nbsp";
  const type = 'object'
  // 两个空格
  const b2 = b.repeat(2);
  const bn = b.repeat((n - 1) * 2);
  const lines = [];
  const ks = Object.keys(v);
  for (let i = 0; i < ks.length; i++) {
    let line = "";
    let k = ks[i];
    let value = v[k];
    // TODO 代码待优化
    if (isObject(value)) {
      let [r, l1] = objLog(value, n, i + 1);
      let frontContent = k + ":"  + l1
      let endContent = k + ':' + r
      line = templateItem(type, n, i + 1, frontContent, endContent)
    } else if (isArray(value)) {
      let [r, l1] = arrLog(value, n, i + 1);
      let frontContent = k + ":"  + l1
      let endContent =  k + ':' + r
      line = templateItem(type, n, i + 1, frontContent, endContent)
    } else if (isString(value)) {
      line = bn + k + ":" + b2 + '"' + value + '"' + '</br>';
    } else {
      line = bn + k + ":" + b2 + value + '</br>';
    }
    lines.push(line);
  }
  const r = lines.join("");
  return r;
};

const objectLine3 = (v, n) => {
  n = n + 1
  const index = Object.keys(v).length + 1
  const type = 'object'
  const l4 = objectProtoype(v, n)
  let frontContent =  "[[Prototype]]: Object"
  let endContent = `${frontContent}</br>${l4}`
  let r =  templateItem(type, n, index, frontContent, endContent)
  return r
};

const objectProtoype = (v, n) => {
  // 两个空格
  const funcNames = Object.getOwnPropertyNames(Object.prototype).sort((a, b) =>
    a.localeCompare(b)
  );
  const triangle = '<div class="g-log-unfold">▶</div>';
  return funcNames
    .map((f) => {
      const name = f === "constructor" ? "Object" : f;
      return `${triangle}${f}: f ${name}()`;
    })
    .join("</br>");
};

const objLog = (v, n = 1, i = 0) => {
  const l1 = objectLine1(v) + '</br>';
  const l2 = objectLine2(v, n, i);
  const l3 = objectLine3(v, n);
  const lines = [l1, l2, l3,  ];
  const r = lines.join("");
  return [r, l1];
};

const templateObject = (value, line1) => {
  const n = 1
  const type = 'object'
  const i = 0
  let r =  templateItem(type, n, i, line1, value)
  return r
};