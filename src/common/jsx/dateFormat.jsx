/* 
  日期格式相关工具
*/
class dateTools {
  constructor() {
    this.dateFormat = this.dateFormat.bind(this);
    this.getDate = this.getDate.bind(this);
    this.getAfterDate = this.getAfterDate.bind(this);
  }

  /**
   * 
   * 格式化日期，考虑到格式转化太麻烦，后期用momentjs代替
   * @param {any} str 
   * @returns 
   * @memberof dateTools
   */
  dateFormat(str) {
    let date;
    if (Object.prototype.toString.call(str) === "[object String]") {
      date = new Date(str);
    } else {
      date = new Date();
    }

    const arr = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
    const D = date.getDate(),
      M = date.getMonth() + 1,
      Y = date.getFullYear(),
      h = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds();
    const dateStr = `${Y}-${arr[M] || M}-${arr[D] || D}`;
    const timeStr = `${arr[h] || h}:${arr[m] || m}:${arr[s] || s}`
    return {
      fullDate: `${dateStr} ${timeStr}`,
      Date: dateStr,
      time: timeStr
    };

  }
  // 获取未来某段时间
  getAfterDate(obj) {
    const start = new Date();
    let defaults = {
      year: 0,
      month: 0,
      day: 0,
      hour: 0,
      minutes: 1,
      second: 0,
      rate: 'second'
    };
    let newDefault = Object.assign({}, defaults, obj);

    start.setFullYear(start.getFullYear() + newDefault.year); // 未来时间-年
    start.setMonth(start.getMonth() + newDefault.month); // 未来时间-月
    start.setDate(start.getDate() + newDefault.day); // 未来时间- 日

    start.setHours(start.getHours() + newDefault.hour); // 未来时间-时
    start.setMinutes(start.getMinutes() + newDefault.minutes); // 未来时间-分 
    start.setSeconds(start.getSeconds() + newDefault.second); // 未来时间-秒
    return start;
  }
  getDate(obj) {

    let timer = null;
    const _this = this;

    let defaults = {
      rate: 'second'
    };
    let _rate = 1000;

    let newDefault = Object.assign({}, defaults, obj);

    switch (newDefault.rate) {
      case 'second':
        _rate = 1000;
        break;
      case 'minutes':
        _rate = 1000 * 60;
        break;
      case 'hour':
        _rate = 1000 * 60 * 24;
        break;
      default:
        _rate = 1000;
        break;
    }

    const end = this.getAfterDate(obj);

    return new Promise((resolve, reject) => {
      timer = setInterval(function () {
        const _now = new Date(); // 当前时间 
        if (_now > end) {
          clearInterval(timer);
        } else {
          let leftTime = end - Date.parse(_now); // 毫秒
          let leftsecond = parseInt(leftTime / 1000); // 秒

          let day = Math.floor(leftsecond / (60 * 60 * 24));// 日
          let hour = Math.floor((leftsecond - day * 24 * 60 * 60) / 3600);// 时
          let minute = Math.floor((leftsecond - day * 24 * 60 * 60 - hour * 3600) / 60);// 分
          let second = Math.floor(leftsecond - day * 24 * 60 * 60 - hour * 3600 - minute * 60);// 秒

          resolve({
            day, hour, minute, second,
          });

        }
      }, _rate);
    });



  }

}
export default new dateTools() 