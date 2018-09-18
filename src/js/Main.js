/****************************************
 * 各アイコン
 ****************************************/
class IconItem {
  constructor(obj) {
    this.elm = obj.elm;

    this.offsetX = this.elm.offset().left;
    this.offsetY = this.elm.offset().top;

    this.width = this.elm.width();
    this.height = this.elm.height();

    this.centerX = this.offsetX + this.width / 2;
    this.centerY = this.offsetY + this.height / 2;

    this.range = 200;

    this.updateX = 0;
    this.updateScale = 1;
  }

  /**
   * 2点間の距離を計算する式（ネットから引用）
   * @param {*} x1 
   * @param {*} y1 
   * @param {*} x2 
   * @param {*} y2 
   */
  getDistanceFromTwoPoint(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  /**
   * どの位置に移動すればよいか計算
   */
  calc() {

    const res = this.getDistanceFromTwoPoint(this.centerX, this.centerY, cursor.x, cursor.y);

    if (this.range > res) {
      this.updateScale = 1 + (this.range - res) * 0.01;
      this.updateX = this.offsetX + this.range - res;
    } else {
      this.updateScale = 1;
      this.updateX = 0;
    }
  }

  /**
   * 移動する
   */
  update() {
    this.elm.css({
      'transform': `matrix3d(
        ` + this.updateScale + `, 0, 0, 0,
        0, ` + this.updateScale + `, 0, 0,
        0, 0,` + this.updateScale + `, 0,
        ` + this.updateX + `, 0, 0, 1
        )`
    })
  }
}

/****************************************
 * アイコン全体
 ****************************************/
class Icon {
  constructor() {
    this.instances = []; // 各アイコンのインスタンスを格納

    const icons = $('#js-icon-list>li>img');
    for (let i = 0; i < icons.length; i++) {
      this.instances.push(
        new IconItem({
          elm: icons.eq(i)
        })
      );
    }
  }

  calc() {
    for (let i = 0; i < this.instances.length; i++) {
      this.instances[i].calc();
    }
  }

  update() {
    for (let i = 0; i < this.instances.length; i++) {
      this.instances[i].update();
    }
  }
}

/****************************************
 * イベント伝播
 ****************************************/
class Dispather {
  constructor() {
    this.eventType = {
      mousemove: 'mousemove'
    }
  }

  request(obj) {

    switch (obj.type) {
      case this.eventType.mousemove:
        cursor.move(obj.event);
        icon.calc();
        icon.update();
        break;
      default:
        break;
    }
  }
}

/****************************************
 * カーソルの位置
 ****************************************/
class Cursor {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  init() {
    window.addEventListener("mousemove", (e) => {
      const obj = {
        type: dispather.eventType.mousemove,
        event: e
      }
      dispather.request(obj);
    });
  }

  move(e) {
    this.x = e.pageX; //X座標
    this.y = e.pageY; //Y座標
    // console.log('mouseX: ' + this.x);
    // console.log('mouseY: ' + this.y);
  }
}

const dispather = new Dispather;
const cursor = new Cursor;
const icon = new Icon;

const start = () => {
  cursor.init();
}

start();