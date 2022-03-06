const arrayProtoype = (n) => {
  const b = "&nbsp";
  // 两个空格
  const bn = b.repeat((n - 1) * 2);
  const funcNames = Object.getOwnPropertyNames(Array.prototype).sort((a, b) =>
    a.localeCompare(b)
  );
  const b2 = "&nbsp".repeat(2);
  // at: ƒ at()
  const triangle = '<div class="g-log-unfold">▶</div>';
  return funcNames
    .map((f) => `${bn}${b2}${triangle}${f}: f ${f}()`)
    .join("</br>");
};

// 第一行
const arrayLine1 = (v) => {
  const b = "&nbsp";
  let left = `(${v.length})` + b + "[";
  let right = "]";
  let eles = [];
  for (let i = 0; i < v.length; i++) {
    let ele = "";
    let value = v[i];
    if (isArray(value)) {
      // Array(2)
      ele = `Array(${v[i].length})`;
    } else if (isObject(value)) {
      ele = "{…}";
      // TODO 代码需要优化
    } else if (typeof value === "string") {
      ele = `'${value}'`;
    } else {
      ele = value;
    }
    eles.push(ele);
  }
  let center = eles.join("," + b);
  let r = left + center + right;
  return r;
};

const arrayLine2 = (v, n) => {
  n += 1;
  const b = "&nbsp";
  // 两个空格
  const b2 = b.repeat(2);
  const bn = b.repeat((n - 1) * 2);
  const triangle = '<div class="g-log-unfold">▶</div>';
  const lines = [];
  for (let i = 0; i < v.length; i++) {
    let line = "";
    let value = v[i];
    if (isArray(value)) {
      line = bn + triangle + i + ":" + b2 + arrLog(value, n);
    } else if (isObject(value)) {
      line = bn + triangle + i + ":" + b2 + objLog(value, n);
      // TODO 代码需要优化
    } else if (isString(value)) {
      line = bn + i + ":" + b2 + "'" + value + "'";
    } else {
      line = bn + i + ":" + b2 + value;
    }
    lines.push(line);
  }
  const r = lines.join("</br>");
  return r;
};

const arrayLine3 = (v, n) => {
  const b = "&nbsp";
  // 两个空格
  const bn = b.repeat((n - 1) * 2);
  return bn + `length: ${v.length}`;
};

const arrayLine4 = (v, n) => {
  const b = "&nbsp";
  // 两个空格
  const bn = b.repeat(n - 1);
  const t = ` <div class="g-log-unfold">▶</div>`;
  return bn + t + "[[Prototype]]: Array(0)";
};

const arrLog = (v, n = 1) => {
  // (5) [1, 2, 3, Array(2), Array(4)]
  const l1 = arrayLine1(v);
  // content
  const l2 = arrayLine2(v, n);
  // length: 3
  const l3 = arrayLine3(v, n);
  // [[Prototype]]: Array(0)
  const l4 = arrayLine4(v, n);
  const l5 = arrayProtoype(n);
  const lines = [l1, l2, l3, l4, l5];
  let r = lines.join("</br>");
  return r;
};

const templateArray = (value) => {
  return `
  <div class="g-log-item">
    <div class="g-log-unfold">▶</div>
    <span class="g-log-number">
      ${value}
    </span>
  </div>
  `;
};

const templateObject = (value) => {
  return `
  <div class="g-log-item">
    <div class="g-log-unfold">▶</div>
    <span class="g-log-number">
      ${value}
    </span>
  </div>
  `;
};

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

const unflodLogElse = (v) => {
  let r = `
  <div class="g-log-item">
    <div class="g-output"></div>
    <span class="g-log-number">${v}</span>
  </div>
  `;
  return r;
};

const unflodLog = (v) => {
  let r = "";
  // 判断类型
  // (3) [1, 2, 3]
  if (isArray(v)) {
    let value = arrLog(v);
    r = templateArray(value);
    // r = unflodLogArray(v);
  } else if (isObject(v)) {
    let value = objLog(v);
    r = templateObject(value);
  } else {
    r = unflodLogElse(v);
  }
  return r;
};

const grammyConsole = () => {
  // let v = [1, 2, 3, [1, 2], [1, 3, 4, [1, 2]]];
  // let v = {
  //   name: "grammyli",
  //   name1: "grammy",
  //   name3: "g",
  // };
  // let v = {
  //   name: 'g-console',
  //   num: 15,
  //   obj: {
  //     objName: '123',
  //     number: 123
  //   }
  // }
  // let v = {
  //   name: "g-console",
  //   num: 123,
  //   bool: false,
  //   obj: {
  //     number: 1234,
  //     str: "gl",
  //     objinner: {
  //       key: 90,
  //       str: '1223'
  //     }
  //   },
  //   arr: [1, 3, "str"],
  // };
  let v = [
    12,
    {
      name: "g-console",
      time: "2022",
      num: 123,
    },
    3456,
    "grammy",
  ];
  const ctn = e(".g-log-container");
  const r = unflodLog(v);
  appendHtml(ctn, r);
};

const __main = () => {
  grammyConsole();
};

__main();
