/* 
  生成随机编码
  已去除容易混淆的 0o  lI 2z 9g
*/
class randomTools {
  constructor() { 
    this.randomString=this.randomString.bind(this);
     
  }
  randomString(len) {
    let str = len || 32;
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxy345678';
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < str; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }
}

export default new randomTools();

