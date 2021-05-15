

// 城市列表数据
class Citys{
    constructor(boxName,url){
      this.box = document.querySelector(boxName);
      this.url = url;
      this.init();
      this.getData(this.url);
    }
    init(){
      this.key = document.querySelector('.title-adress');
      this.span = this.key.querySelector('span');
      this.i = this.key.querySelector('i');
     
      // 点击标题城市交互
      this.key.onclick = () =>{

          this.box.classList.toggle('citys-show');
          this.i.classList.toggle('glyphicon-triangle-top');
      }
     
      // 点击盒子内容 把点击的内容获取放到标题上，并隐藏
      this.box.onclick = (e) =>{
          if(e.target.classList.contains('citys-txt')){
              this.span.innerText = e.target.innerText;
              this.box.classList.remove('citys-show');
              this.i.classList.toggle('glyphicon-triangle-top');
          }
      }
    }

    async getData(url){
        let res = await new MyPromise({
            url,
        });
        res = JSON.parse(res);
        this.render(res.cts);
    }

    render(data){
      data = data.filter((item,index)=>{
          return index < 300;
      });

      let str = '';
      data.forEach(item=>{
          str += `<span class='citys-txt'>${item.nm}</span>`;
      })

      this.box.innerHTML = str;
    }
}

new Citys('.citys','../api/cities.json');


 // 渲染影院数据

  class Cinema{
      constructor(className){

          this.box = document.querySelector(className);
          this.api = 1;
          this.init();
          this.getData(`../api/cinemas-${this.api}.json`);
      }
      init(){
          let main = document.querySelector('.main');
          // 定义一个标志，用来请求数据节流
          this.flag = true;
          // 定义一个content盒子-main盒子的高度，当滚动条的高度超过了这个高度，就是滚动到底部了，要请求数据了
          let pageY;
          
        main.onscroll = e =>{
           // 如果再外面赋值this.box.offsetHeight = 0 因为异步程序，必须等页面渲染完毕才能得到盒子的高度，滚动时已经渲染完成了
            pageY = this.box.offsetHeight -main.offsetHeight; 

             if(Math.ceil(main.scrollTop) >= pageY && this.flag){
                 this.flag = false;
                 this.api ++;
                 if(this.api >= 8) return;
                 this.getData(`../api/cinemas-${this.api}.json`);
             }
             
         }
      }

      async getData(url){
          let res = await new MyPromise({
              url,
          });

          res = JSON.parse(res);
          this.render(res.data.cinemas);
          this.flag = true;
      }

      render(data){
        let str = '';
         data.forEach(item=>{
             str += `<div class='cinema'>
             <div class='cinema-title'>
                 <h4>${item.nm}</h4>
                 <p class='cinema-price'><b>${item.sellPrice?item.sellPrice:0}</b><span>元起</span></p>
             </div>
             <p class='cinema-adress'><span>${item.addr}</span> <span>${item.distance}</span></p>`;

             item.labels.forEach(value=>{
                //  let span = document.createElement('span');
                //  span.innerText = value.name;
                //  span.style.color = value.color;
                //  console.log(span);
              str += `<p class='cinema-serve'><span style='border-color:${value.color};color:${value.color};'>${value.name}</span></p>`
             })


            str += `<p class='cinema-cheap'><span class='cheap'>惠</span><span class='cheap-txt'>${item.promotion.platformActivityTag}</span></p>
         </div>`;
             
             
         });
          
         this.box.innerHTML += str;
         
      }

  }

  new Cinema('.cinema-content');