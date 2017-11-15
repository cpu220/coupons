/* 
  Image 的通用处理方法
*/
class  ImageTools{
  constructor() {

  }
  getWH(url) {
    const result={
      width:'0px',
      height:'0px'
    }
    if(!!url){
      const img = new Image();
      img.src = url;
      result.width = `${img.width}px`;
      result.height = `${img.height}px`;
    } 
    return result;
  }

  getWHPromiseByUrl(url) {
    return new Promise((resolve, reject) => {
      const result = {
        width: '0px',
        height: '0px',
      };
      if (!!url) {
        const image = new Image();
        image.addEventListener('load', () => {
          result.width = image.width;
          result.height = image.height;
          resolve(result);
        });
        image.addEventListener('error', () => {
          reject(new Error('image load failed'));
        });
        image.src = url;
      } else {
        reject(new Error('Could not load image without url'));
      }
    });
  }
}

export default new ImageTools();
