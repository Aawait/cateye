
// 城市列表

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

new Citys('.citys','./api/cities.json');


// 热映列表
class HotList {
    constructor(box, url) {
        this.box = document.querySelector(box);
        this.url = url;
        this.limit = 12;
        
        this.init();
        this.getData(this.limit);  // 默认请求12条数据
    }
    init() {
        this.content = document.querySelector('.content');
        // 定义一个标志，用于请求数据节流
        this.flag = true;

         // 定义一个content盒子-main盒子的高度，当滚动条的高度超过了这个高度，就是滚动到底部了，要请求数据了
         // 如果再外面赋值this.box.offsetHeight = 0 因为异步程序，必须等页面渲染完毕才能得到盒子的高度，滚动时已经渲染完成了
         // console.log(this.content.offsetHeight); == 0
        let pageY;

        this.box.onscroll = () => {

            pageY = this.content.offsetHeight - this.box.offsetHeight;

            // 滚动条判断 按需加载数据
            if(Math.ceil(this.box.scrollTop) >= pageY && this.flag){
                this.flag = false;
                this.limit += 12*1;
                if(this.limit > this.total) return;
                this.getData(this.limit);
            }
           
        }

        //事件委托绑定点击事件跳转详情页
        this.box.onclick = e =>{
            let target = e.target;
            let id,media;
            
            if(this.contains(target,'media')){
                media = target;
            }

            if(this.contains(target,'media-body')){
                media = target.parentNode;
            }

            if(this.contains(target,'media-object')){
                media  = target.parentNode.parentNode.parentNode;
            }
            
            if(this.contains(target,'media-body-son')){
                media = target.parentNode.parentNode;
            }
            
            if(this.contains(target,'bold')){
                media = target.parentNode.parentNode.parentNode;
            }

            if(!media) return;
            //获取每一个数据的id，跳转页面的时候拼接到地址栏上去
            id = media.getAttribute('movie_id');

            location.href = `./html/03.details.html?id=${id}`
        }
    }
    contains(ele,className){
         return ele.classList.contains(className);
    }
    async getData(limit) {
        let res = await new MyPromise({
            url: `${this.url}movie/v2/list/hot.json`,
            data: {
                limit,
                offset:0,
                ct: '广州'
            }
        });
        res = JSON.parse(res);
        this.total = res.data.total;
        this.render(res.data.hot);
        this.flag = true;
    }

    render(data) {
        let str = '';
        data.forEach(item => {
            str += `<div class="media" movie_id="${item.id}">
           <div class="media-left">
             <a href="#">
               <img class="media-object" src="${item.img.replace('/w.h','')}" alt="">
             </a>
           </div>
           <div class="media-body">
             <h4 class="media-heading media-body-son">${item.nm}</h4>
             <p class='movie-type media-body-son'>${item.cat}</p>
             <p class='movie-star media-body-son'>${item.desc}</p>
             <p class='movie-num media-body-son'>${item.showInfo}</p>   
             <span class='media-body-son'><b class='bold'>${item.sc}</b>分</span>
             <button class='buy media-body-son ${item.sc == 0?'advance':''}' style="border:none">${item.sc == 0?'预售':'购票'}</button>
           </div>
         </div>`;
        })
        this.content.innerHTML = str;
    }
}

new HotList('.main', '/maoyan');

// 热映和待映切换
class Tab {
    constructor(btns) {
        this.btns = document.querySelector(btns);
        this.init(this.btns);
    }
    init(btns) {
        btns.onclick = e => {
            if (e.target.classList.contains('hot-btn')) {
    
                location.href = './index.html';
            }

            if (e.target.classList.contains('stay-btn')) {
                
                location.href = './html/02.stay.html';
            }
        }
    }
}

new Tab('.title-btn');



