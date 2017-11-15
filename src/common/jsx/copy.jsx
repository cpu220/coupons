/* 
  基于H5的复制组件
*/
class  copyTools{
  constructor() {

  }
  copyTextToClipboard(text) {

    
    return new Promise((resolve,reject)=>{
      let textArea = document.createElement("textarea");

        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;

        document.body.appendChild(textArea);

        textArea.select();

        try {
          let msg = document.execCommand('copy') ? true : false
          // console.log('复制内容 ' + msg)
          resolve(msg);
        } catch (err) {
          console.log('不能使用这种方法复制内容')
          reject(err);
        }
        document.body.removeChild(textArea)
        
    });

  }
}

export default new copyTools() ;

 