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
    let [value, line1] = arrLog(v);
    r = templateArray(value, line1);
    // r = unflodLogArray(v);
  } else if (isObject(v)) {
    let [value, line1] = objLog(v);
    r = templateObject(value, line1);
  } else {
    r = unflodLogElse(v);
  }
  return r;
};

const renderConsole = () => {
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
  let v = {
    name: "g-console",
    num: 123,
    bool: false,
    obj: {
      number: 1234,
      str: "gl",
      objinner: {
        key: 90,
        str: "1223",
      },
    },
    arr: [
      1,
      3,
      "str",
      {
        gramy: "oscar",
        name: "g-console",
        task: "codeing",
        tasks: ["playing", true],
      },
    ],
  };
  // let v = [12, 3456, "grammy"];
  const ctn = e(".g-log-container");
  const r = unflodLog(v);
  appendHtml(ctn, r);
};

const bindEventFold = () => {
  bindAll(".g-log-unfold", "click", (event) => {
    let target = event.target;
    log("target", target);
    if (!target.classList.contains("g-log-unfold")) {
      return;
    }
    let parent = target.closest(".g-item");
    let n = parent.dataset.n;
    let type = parent.dataset.type;
    let i = parent.dataset.i;
    let sel = `.g-log-backup-${type}-${n}-${i}`;
    e(sel).classList.toggle("g-hide")
    let sel2 = `.g-log-${type}-${n}-${i}`;
    e(sel2).classList.toggle("g-hide");
    target.classList.toggle("g-rotate-90");
  });
};

const bindEvents = () => {
  bindEventFold();
};

const __main = () => {
  renderConsole();
  bindEvents();
};

__main();
