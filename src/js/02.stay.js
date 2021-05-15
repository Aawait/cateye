
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

new Citys('.citys','../api/cities.json');



// 近期最受欢迎列表
class Popular {
    constructor(box, url) {
        this.box = document.querySelector(box);
        this.url = url;
        this.getData();
    }
    async getData() {
        let res = await new MyPromise({
            url: `${this.url}movie/v1/list/wish/order/coming.json`,
            data: {
                ci: 20,
                limit: 30,
                offset: 0
            }
        });

        res = JSON.parse(res);
        this.render(res.data.coming);
    }

    render(data) {
        let str = '';
        data.forEach(item => {
            str += ` <div class='stay-list' movie_id="${item.id}">
           <a href="#">
               <img src="${item.img.replace('/w.h','')}" class='stay-img' alt="">
               <span class='glyphicon glyphicon-heart'></span>
           </a>
           <h6 class='stay-son'>${item.nm}</h6>
           <p class='stay-people stay-son'>${item.wish}人想看</p>
           <p class='stay-date stay-son'>${item.comingTitle}</p>
       </div>`
        })

        this.box.innerHTML = str;
    }
}

new Popular('.stay-content','/maoyan');


// 待映列表

class StayList {
    constructor(box, url) {
        this.box = document.querySelector(box);
        this.url = url;
        this.limit = 12;
        this.init();
        this.getData(this.limit);
    }
    init(){
         // 设置标题时间
         this.date = document.querySelector('.media-box h5');
         let month = new Date().getMonth()+1;
         let date = new Date().getDate();
         let day = new Date().getDay();
         this.date.innerText = `${month}月${date}日  周${day}`;

         this.main = document.querySelector('.main');
         this.content = document.querySelector('.media-content');

         this.flag = true;
         let pageY;
         // 按需加载数据
        //  this.main.onscroll = () =>{
            
        //      pageY = this.content.offsetHeight - this.main.offsetHeight;
            
        //      if(Math.floor(this.main.scrollTop) >= pageY && this.flag){
        //          this.flag = false;
        //           this.getData(20);
        //      }
        //  }

        // 事件委托绑定 点击获取id参数并跳转详情页

        this.main.onclick = e =>{
            let stay,id;

            if(e.target.classList.contains('stay-son')){
                stay = e.target.parentNode;

            }
            if(e.target.classList.contains('stay-img') || e.target.classList.contains('glyphicon-heart')){
                stay = e.target.parentNode.parentNode;
            }

            if(e.target.classList.contains('media-object')){
                stay = e.target.parentNode.parentNode.parentNode;
                
            }

            if(e.target.classList.contains('media-body-son')){
                stay = e.target.parentNode.parentNode;
                
            }
            if(e.target.classList.contains('media-body')){
                stay = e.target.parentNode;
            }
             
            // 如果stay不存在直接返回
            if(!stay)  return;
            
            // 获取stay标签上的id属性，然后跳转详情页
            id = stay.getAttribute('movie_id');
            location.href = `../html/03.details.html?id=${id}`;
        }
     }
    async getData(limit) {
        let res = await new MyPromise({
            url: `${this.url}movie/v2/list/rt/order/coming.json`,
            data: {
                ci: 20,
                limit,
            }
        });
        res = JSON.parse(res);
        this.render(res.data.coming);
        this.flag = true;
    }

    render(data) {
        let str = '';
        data.forEach(item => {
            str += `
            <div class="media" movie_id="${item.id}">
                <div class="media-left">
                    <a href="#">
                        <img class="media-object"
                            src="${item.img.replace('/w.h','')}" alt="...">
                    </a>
                </div>
                <div class="media-body">
                    <h4 class="media-heading media-body-son">${item.nm}</h4>
                    <p class='movie-type media-body-son'>${item.cat}</p>
                    <p class='movie-star media-body-son'>${item.desc}</p>
                    <p class='movie-num media-body-son'>${item.pubDesc}</p>
                    <span class='media-body-son'><b>${item.wish}</b>人想看</span>
                    <button class='want-see media-body-son'><i class='glyphicon glyphicon-heart'></i>想看</button>
                </div>
            </div>`
        });

        this.box.innerHTML = str;
    }
}

new StayList('.media-content','/maoyan');


// 热映和待映切换
class Tab {
    constructor(btns) {
        this.btns = document.querySelector(btns);
        this.init(this.btns);
    }
    init(btns) {
        btns.onclick = e => {
            if (e.target.classList.contains('hot-btn')) {
                
                location.href = '../index.html';
            }

            if (e.target.classList.contains('stay-btn')) {
               
                location.href = '../html/02.stay.html';
            }
        }
    }
}

new Tab('.title-btn');