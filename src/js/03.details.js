

// 获取跳转时传过来的id，发送ajax请求数据渲染结构

class Details{
    constructor(url){
       this.box = document.querySelector('.details');
       this.text = document.querySelector('.introduce-txt');
       this.key = document.querySelector('.flag span');
       this.url = url;
       this.init();
       this.getData(this.url);
    }
    init(){
       this.id = location.search.substr(4)*1;

       this.key.onclick  = () =>{
           this.text.classList.toggle('introduce-show');
           this.key.classList.toggle('glyphicon-menu-up');
       }
    }

    async getData(url){
        let res = await new MyPromise({
            url:`${url}movie/v5/${this.id}.json?ci=20`,
        });
        res = JSON.parse(res);
       
        this.render(res.data.movie);
    }

    render(obj){ 
        // 影片详情数据渲染
            this.box.innerHTML = `<div class='movie-content'>
            <div class='movie-img'>
                <a href=""><img
                        src="${obj.img.replace('/w.h','')}"
                        alt=""></a>
            </div>
            <div class='movie-title'>
                <h4>${obj.nm}</h4>
                <div class='want-see'>${obj.wish}人想看</div>
                <p>${obj.cat}</p>
                <p>${obj.src} / ${obj.episodeDur}分钟</p>
                <p>${obj.pubDesc}</p>
            </div>
        </div>
        <div class='btns'>
            <button><i class='glyphicon glyphicon-heart'></i>想看</button>
            <button><i class='glyphicon glyphicon-star'></i>评分</button>
        </div>`;
        // 设置背景颜色
        this.box.style.backgroundColor = obj.backgroundColor;
        // this.box.style.backgroundImage = `url(${obj.img.replace('/w.h','')})`;
        // 设置电影简介文本
        this.text.innerText = obj.dra;
    }


}
new Details('/maoyan');



// 演职人员列表渲染
class Star{
    constructor(url){
      this.url = url;
      
      this.init();
      this.getData();
    }
    init(){
        this.id = location.search.substr(4)*1;
        this.direct = document.querySelector('.direct');
        this.actor = document.querySelector('.actor');
    }

    async getData(){
        let res = await new MyPromise({
            url:`${this.url}v7/movie/${this.id}/celebrities.json`
        });

        res = JSON.parse(res);
        
        this.render(res.data);
    }

    render(data){

       // 渲染导演组
        data[0].forEach(item=>{
           this.direct.innerHTML += `<div class='star-item'>
           <a href=""><img src="${item.avatar.replace('/w.h','')}"
                   alt=""></a>
           <h5>${item.cnm}</h5>
           <p>${item.desc}</p>
       </div>`
        });

       // 渲染演员组
       data[1].forEach(item=>{
        this.actor.innerHTML += `<div class='star-item'>
           <a href=""><img src="${item.avatar.replace('/w.h','')}"
                   alt=""></a>
           <h5>${item.cnm}</h5>
           <p>${item.desc}</p>
       </div>`
       });
       
      
    }

}

new Star('/maoyan');


// 渲染视频和剧照

 class Still{
     constructor(box,url){
         this.box = document.querySelector(box);
         this.url = url;
         this.init();
         this.getData();
     }
     init(){
         this.id = location.search.substr(4)*1;
         this.length = document.querySelector('.length');
     }

     async getData(){
        let res = await new MyPromise({
            url:`${this.url}movie/photos/${this.id}/list.json`
        });
        res = JSON.parse(res);
        this.length.innerText = res.data.photos.length;
        this.render(res.data.photos);
        
     }

     render(data){
         data.forEach(item=>{
             this.box.innerHTML += `<div>
             <img src="${item.tlink.replace('/w.h','')}"
                 alt="">
         </div>`
         });
     }

 }
 new Still('.still-content','/maoyan');


 // 观众评论列表

  class Comment{
      constructor(box,url){
          this.box = document.querySelector(box);
          this.url = url;
          this.init();
          this.getData();
      }
      init(){
          this.id = location.search.substr(4)*1;
      }

      async getData(){
          let res = await new MyPromise({
              url:`${this.url}comments/movie/v2/${this.id}.json`,
              data:{
                limit:50,
                offset:0,
                uuid:'1A6E888B4A4B29B16FBA1299108DBE9C25451D87F2A6D22D0F67C5092D7994D0',
                ci:20,
                clientType:'wechat_small_program',
                channelld:40000
              }
          });

          res = JSON.parse(res);
          this.render(res.cmts);
      }

      render(data){
          let str = '';
          data.forEach(item=>{
              str += `<div class='comment-list'>
              <div class='user-head'><img
                      src="${item.avatarurl}" alt="">
              </div>
              <div class='user-content'>
                  <p class='user-name'><span>${item.nickName}</span><span class='comment-time'>${item.startTime}</span></p>
                  <p class='van-rate'>
                      <svg fill="#fec225" viewBox="0 0 32 32" style="width: 12px;">
                          <path
                              d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z">
                          </path>
                      </svg>
                      <svg fill="#fec225" viewBox="0 0 32 32" style="width: 12px;">
                          <path
                              d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z">
                          </path>
                      </svg>
                      <svg fill="#fec225" viewBox="0 0 32 32" style="width: 12px;">
                          <path
                              d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z">
                          </path>
                      </svg>
                      <svg fill="#fec225" viewBox="0 0 32 32" style="width: 12px;">
                          <path
                              d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z">
                          </path>
                      </svg>
                      <svg fill="#fec225" viewBox="0 0 32 32" style="width: 12px;">
                          <path
                              d="M32 12.408l-11.056-1.607-4.944-10.018-4.944 10.018-11.056 1.607 8 7.798-1.889 11.011 9.889-5.199 9.889 5.199-1.889-11.011 8-7.798z">
                          </path>
                      </svg>
                      
                  </p>
                  <p class='comment-text'>${item.content}</p>
              </div>
          </div>`
          });

          this.box.innerHTML = str;
      }



  }

  new Comment('.comment-content','/maoyan');