class FontsizeTools {
  static rem2px = 100;
  static pxToRem(html) {
    const array = html.match(/font-size:\S*px;/g);
    let ret = html || '';
    const e = new Set(array);
    [...e].forEach((item) => {
      let rem = parseInt(item.match(/\d+/g)) / FontsizeTools.rem2px;
      rem = `font-size:${rem.toFixed(2)}rem;`;
      let reg = new RegExp(item, 'g');
      ret = ret.replace(reg, rem);
    });
    return ret;
  }
  static remToPxAll(html) {
    // must has this px
    const array = html.match(/:([1-9]\d*|0)(\.\d*)?rem/g)
    let ret = html || '';
    const e = new Set(array);
    [...e].forEach((item) => {
      let px = parseFloat(item.match(/\d+(\.\d+)?/g)) * 100;
      px = `:${px.toFixed(0)}px`;
      let reg = new RegExp(item, 'g');
      ret = ret.replace(reg, px);
    });
    return ret;
  } 
  static remToPx(html) {
    // must has this px
    const array = html.match(/font-size:\S*rem;/g);
    let ret = html || '';
    const e = new Set(array);
    [...e].forEach((item) => {
      let px = parseFloat(item.match(/\d+(\.\d+)?/g)) * FontsizeTools.rem2px;
      px = `font-size:${px.toFixed(0)}px;`;
      let reg = new RegExp(item, 'g');
      ret = ret.replace(reg, px);
    });
    return ret;
  }
  static fontSizeIsRem(html) {
    return /font-size:\d+(\.\d+)?rem/.test(html);
  }
  static fontSizeIsPx(html) {
    return /font-size:\d+px/.test(html);
  }
}

export default FontsizeTools;
