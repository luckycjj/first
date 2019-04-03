(function(){
    var webappScroll = function(array){
    	const _this = this;
        if(!array.dom){
            return false
        }
        array.pageSize = array.pageSize || 10 ;
        array.pageNum = array.pageNum || 1 ;
        array.scrollType = array.scrollType || 1 ;
        array.contenttype = array.contenttype || "application/x-www-form-urlencoded"
        if(!array.data || (array.scrollType === 1 && typeof array.data !== "object")){
            return false
        }
        _this.array = array;
        _this.total = 0;
        _this.windowScroll = true;
    	_this.init(); 
        _this.clearInit = function(json){
            const dom = document.getElementById(_this.array.dom);
            if(dom){
                dom.innerHTML = "";
            }
            if(_this.array.scrollType === 1){
                _this.array.pageNum = 1 ; 
            }else{
                for(var i in json){
                    _this.array.data[i] = json[i];
                }
            }
             _this.checkFrontEnd();
        } 
    }
    webappScroll.prototype = {
    	 init(){
             const _this = this;
             _this.checkFrontEnd();
             const body = document.getElementsByTagName("body")[0];
             body.onscroll = function () {
                 let height = _this.returnBodyHeight().height;
                 let fatherHeight = _this.returnBodyHeight().fatherHeight;
                 let scrollTop = document.documentElement.scrollTop || window.pageYOffset  || document.body.scrollTop
                 if(height - (scrollTop + fatherHeight) < 30 && _this.windowScroll){
                     _this.checkFrontEnd();
                 }
             }
    	 },
        checkFrontEnd(){
            const _this = this;
            if(_this.array.scrollType === 1){
                _this.front();
            }else{
                _this.end();
            }
        },
         front(){
            const _this = this;
            _this.windowScroll = false;
            _this.total = _this.array.data.length;
            if(_this.array.pageSize * _this.array.pageNum > _this.total && _this.array.pageSize * (_this.array.pageNum - 1) > _this.total){
                return false;
            }
            let list =_this.array.pageSize * _this.array.pageNum > _this.total ? _this.array.data.slice(_this.array.pageSize * (_this.array.pageNum - 1) , _this.total) : _this.array.data.slice(_this.array.pageSize * (_this.array.pageNum - 1) , _this.array.pageSize * _this.array.pageNum);
            _this.array.pushDom(list);
            _this.array.pageNum ++ ;
            _this.windowScroll = true;
            _this.checkBodyHeight(_this.array.scrollType);
         },
         end(){
            const _this = this;
            _this.windowScroll = false;
            if(_this.array.data[_this.array.pageSize] * (_this.array.data[_this.array.pageNum] - 1) > _this.total){
                    return false;
            }
            _this.ajax_method(_this.array.url,_this.array.contenttype.indexOf("json") !== -1 ? JSON.stringify(_this.array.data) : _this.array.data,_this.array.requestType,function(data){
                data = JSON.parse(data);
                _this.total = data.total*1 || 0;
                _this.array.pushDom(data);
                _this.array.data[_this.array.pageNum] ++ ;
                _this.windowScroll = true;
                _this.checkBodyHeight(_this.array.scrollType);
            });
         },
         checkBodyHeight(type){
            const _this = this;
            let height = _this.returnBodyHeight().height;
            let fatherHeight = _this.returnBodyHeight().fatherHeight;
            if(height < fatherHeight){
               if(type === 1){
                   _this.front();
               }else{
                   _this.end();
               }
            }else{
                return false
            }

         },
        returnBodyHeight(){
            const _this = this;
            const body = document.getElementsByTagName("body")[0];
            const dom = document.getElementById(_this.array.dom);
            let height =dom.offsetTop + dom.offsetHeight;
            let fatherHeight = document.documentElement.clientHeight || document.body.clientHeight;
            return {
                height : height ,
                fatherHeight : fatherHeight
            }
        },
        ajax_method(url,data,method,success) {
            var ajax = new XMLHttpRequest();
            if (method=='get') {
                // get请求
                if (data) {
                    // 如果有值
                    url+='?';
                    var list = [];
                    for(var i in data){
                      list.push( i + "=" + data[i]);
                    }
                    url += list.join("&")
                }else{
        
                }
                // 设置 方法 以及 url
                ajax.open(method,url);
                // send即可
                ajax.send();
            }else{
                // post请求
                // post请求 url 是不需要改变
                ajax.open(method,url);
                // 需要设置请求报文
                ajax.setRequestHeader("Content-type",this.array.contenttype || "application/x-www-form-urlencoded");
                // 判断data send发送数据
                if (data) {
                    // 如果有值 从send发送
                    ajax.send(data);
                }else{
                    // 木有值 直接发送即可
                    ajax.send();
                }
            }
            // 注册事件
            ajax.onreadystatechange = function () {
                // 在事件中 获取数据 并修改界面显示
                if (ajax.readyState==4&&ajax.status==200) {
                    // console.log(ajax.responseText);
        
                    // 将 数据 让 外面可以使用
                    // return ajax.responseText;
        
                    // 当 onreadystatechange 调用时 说明 数据回来了
                    // ajax.responseText;
        
                    // 如果说 外面可以传入一个 function 作为参数 success
                    success(ajax.responseText);
                }
            }
        
        }
    }
    window.webappScroll = webappScroll;
}())