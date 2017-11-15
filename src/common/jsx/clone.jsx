/*  对象clone
*/


class clone {
  constructor() {
    this.json = this.json.bind(this);
  }
  json(json) {
    var txt = JSON.stringify(json);
    return JSON.parse(txt);
  }

}

export default new clone();

