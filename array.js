const arrayProtoype = (n) => {
  const funcNames = Object.getOwnPropertyNames(Array.prototype).sort((a, b) =>
    a.localeCompare(b)
  );
  const triangle = '<div class="g-log-unfold">▶</div>';
  return funcNames
    .map((f) => {
      const purple = spanColor('purple', f)
      const blue = spanColor('blue', 'f')
      return `${triangle}${purple}: ${blue} ${f}()`
    })
    .join("</br>");
};

// 第一行
const arrayLine1 = (v, n) => {
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
      ele = `<span class="g-red">'${value}'</span>`;
    } else if (isNumber(value) || isBool(value)) {
      const blue = `<span class="g-blue">${value}</span>`
      ele = blue
    } else {
      ele = `<span class="g-gray">${value}</span>`;
    }
    eles.push(ele);
  }
  let center = eles.join("," + b);
  let r = left + center + right;
  return r;
};

const arrayLine2 = (v, n, index) => {
  n += 1;
  const b = "&nbsp";
  // 两个空格
  const b2 = b.repeat(2);
  const bn = b.repeat((n - 1) * 2);
  const type = 'array'
  const lines = [];
  for (let i = 0; i < v.length; i++) {
    let redKey =  spanColor('red', i)
    let line = "";
    let value = v[i];
    if (isArray(value)) {
      let [r, l1] = arrLog(value, n, i + 1);  
      let frontContent = redKey + ":" + b2 + l1
      let endContent =  redKey + ":" + b2 + r
      line = templateItem(type, n, i + 1, frontContent, endContent)
    } else if (isObject(value)) {
      let [r, l1] = objLog(value, n, i + 1);
      let frontContent = redKey + ":" + b2 + l1
      let endContent =  redKey + ":" + b2 + r
      line = templateItem(type, n, i + 1, frontContent, endContent)
    } else if (isString(value)) {
      let red = spanColor('red', value)
      line = bn + redKey + ":" + b2 + "'" + red + "'" + '</br>';
    } else if (isNumber(value) || isBool(value)) {
      const blue = spanColor('blue', value)
      line = bn + redKey + ":" + b2 + blue + '</br>';
    } else {
      line = bn + redKey + ":" + b2 + value + '</br>';
    }
    lines.push(line);
  }
  const r = lines.join("");
  return r;
};

const arrayLine3 = (v, n) => {
  const b = "&nbsp";
  // 两个空格
  const bn = b.repeat((n - 1) * 2);
  const purple = spanColor('light-purple', 'length')
  const blue = spanColor('blue', v.length)
  return b.repeat(2) + bn + `${purple}: ${blue}`;
};

const arrayLine4 = (v, n) => {
  const index = v.length + 1
  n = n + 1
  // 两个空格
  const type = 'array'
  const l5 = arrayProtoype(n);
  let gray = spanColor('gray', '[[Prototype]]')
  let frontContent =  gray + ": Array(0)"
  const endContent =  ` ${frontContent}</br>${l5}`
  const r = templateItem(type, n, index, frontContent, endContent)
  return r
};

const arrLog = (v, n = 1, i = 0) => {
  // (5) [1, 2, 3, Array(2), Array(4)]
  const l1 = arrayLine1(v, n) + '</br>';
  // content
  const l2 = arrayLine2(v, n, i);
  // length: 3
  const l3 = arrayLine3(v, n);
  // [[Prototype]]: Array(0)
  const l4 = arrayLine4(v, n);
  // const l5 = arrayProtoype(n);
  const lines = [l1, l2, l3, l4,];
  let r = lines.join("");
  return [r, l1];
};

const templateArray = (value, line1) => {
  const n = 1
  const type = 'array'
  const index = 0
  const r = templateItem(type, n, index, line1, value)
  return r
};