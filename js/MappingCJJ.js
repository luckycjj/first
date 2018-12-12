(function() {
	var mappingCJJ = function(array){
		var _this = this;
		_this.array = array;
		_this.array.width = Number(_this.array.width).toString() == "NaN" ? 100 :  _this.array.width;
		_this.array.height =Number(_this.array.height).toString() == "NaN" ? 100 :  _this.array.height;
		var listType = ["jpeg","png"];
        if(listType.indexOf(_this.array.type) == -1  &&  _this.array.type != undefined){
            _this.array.type = undefined ; 
        }
        _this.array.type = _this.array.type == undefined ? "jpeg" : _this.array.type.toLowerCase() ; 
		_this.array.getImg = _this.array.getImg == undefined ? function(base64){
          
        } : _this.array.getImg;
		if( _this.array.dom != "" && _this.array.dom != undefined && _this.array.img != "" && _this.array.img != ""){
            _this.init();
		}
	}
	mappingCJJ.prototype = {
		init:function(){
			var _this = this;
			_this.canvas = document.createElement("canvas");
			_this.array.dom.style.position = "fixed";
            _this.array.dom.style.width = "100%";
            _this.array.dom.style.height = "100%";
            _this.array.dom.style.top = "0";
            _this.array.dom.style.left = "0";
            _this.array.dom.style.background = "rgba(0,0,0,0.2)";
            var dom = _this.array.dom;
            _this.canvas.height = dom.offsetHeight;
            _this.canvas.width = dom.offsetWidth;
            dom.appendChild(_this.canvas);
            _this.ctx = _this.canvas.getContext("2d");
            _this.ctx.fillStyle = "#000";
            _this.ctx.fillRect(0,0,_this.canvas.width,_this.canvas.height);
            var img = document.getElementById("img33");
            var imgObj = new Image();
            imgObj.src = _this.array.img;
         
            imgObj.onload = function(){
                  _this.heightImg = this.height;
                  _this.widthImg = this.width; 
                  var proportion = _this.widthImg / _this.heightImg;
                  _this.canvas.height =  _this.canvas.width / proportion - _this.canvas.height > 0 ? _this.canvas.height : _this.canvas.width / proportion;
                  _this.ctx.drawImage(this,0,0, _this.canvas.width, _this.canvas.height);
                  _this.canvas.style.position = "absolute";
                  _this.canvas.style.top = ( dom.offsetHeight - _this.canvas.height) / 2 + "px";
                  _this.canvas.style.left = "50%";
                  _this.canvas.style.marginLeft = - _this.canvas.width / 2 + "px"
                  //最外层
                  var tailoring = document.createElement("div");
                  tailoring.style.position = "absolute";
                  tailoring.style.width = "100%";
                  tailoring.style.height = "100%";
                  tailoring.style.top = "0";
                  tailoring.style.left = "0";
                  //截图框
                  var tailoringDiv = document.createElement("div");
                  tailoringDiv.style.width = _this.array.width + "px";
                  tailoringDiv.style.height = _this.array.height + "px";
                  tailoringDiv.style.position = "absolute";
                  tailoringDiv.style.top = "50%";
                  tailoringDiv.style.left = "50%";
                  tailoringDiv.style.borderRadius = "0%";
                  tailoringDiv.style.background = "transparent";
                  tailoringDiv.style.marginTop =  - tailoringDiv.style.height.replace("px","") / 2 + "px";
                  tailoringDiv.style.marginLeft =  - tailoringDiv.style.width.replace("px","") / 2 + "px";
                  tailoringDiv.style.zIndex = 10;
                  //上方黑色遮罩
                  var topDiv = document.createElement("div"); 
                  topDiv.style.position = "absolute";
                  topDiv.style.top = "0";
                  topDiv.style.left = "0";
                  topDiv.style.width = "100%";
                  topDiv.style.background = "rgba(0,0,0,0.5)";
                  //下方黑色遮罩
                  var bottomDiv = document.createElement("div"); 
                  bottomDiv.style.position = "absolute";
                  bottomDiv.style.bottom = "0";
                  bottomDiv.style.left = "0";
                  bottomDiv.style.height = "auto";
                  bottomDiv.style.width = "100%";
                  bottomDiv.style.background = "rgba(0,0,0,0.5)";
                  //左边黑色遮罩
                  var leftDiv = document.createElement("div"); 
                  leftDiv.style.position = "absolute";
                  leftDiv.style.left = "0";
                  leftDiv.style.height = tailoringDiv.style.height;
                  leftDiv.style.background = "rgba(0,0,0,0.5)";
                  //右边黑色遮罩
                  var rightDiv = document.createElement("div"); 
                  rightDiv.style.position = "absolute";
                  rightDiv.style.right = "0";
                  rightDiv.style.height = tailoringDiv.style.height;
                  rightDiv.style.width = "auto";
                  rightDiv.style.background = "rgba(0,0,0,0.5)";

                  tailoring.appendChild(tailoringDiv);
                  tailoring.appendChild(topDiv);
                  tailoring.appendChild(bottomDiv);
                  tailoring.appendChild(leftDiv);
                  tailoring.appendChild(rightDiv);

                  dom.appendChild(tailoring);
                  //上下左右遮罩位置
                  _this.topHeight(topDiv,tailoringDiv);
                  _this.bottomHeight(bottomDiv,tailoringDiv);
                  _this.leftHeight(leftDiv,tailoringDiv);
                  _this.rightHeight(rightDiv,tailoringDiv);

                  _this.startX = 0,_this.startY = 0,_this.endX = 0,_this.endY = 0,_this.offsetTop = 0,_this.offsetLeft = 0;

                  tailoringDiv.addEventListener('touchstart',function(event){
                      _this.touchstart(event,tailoringDiv,tailoring);
                  }, false);

                  tailoringDiv.addEventListener('touchmove',function(event){
                      _this.touchmove(event,tailoringDiv,tailoring);
                      _this.topHeight(topDiv,tailoringDiv);
                      _this.bottomHeight(bottomDiv,tailoringDiv);
                      _this.leftHeight(leftDiv,tailoringDiv);
                      _this.rightHeight(rightDiv,tailoringDiv);
                  }, false);

                  tailoringDiv.addEventListener('touchend',function(event){
                     _this.touchend(event,tailoringDiv,tailoring);
                  }, false);
            }
		},
		topHeight:function(topDiv,tailoringDiv){
            var _this = this;
            topDiv.style.height = _this.getTop(tailoringDiv) + "px";
		},
		bottomHeight:function(bottomDiv,tailoringDiv){
			var _this = this;
            bottomDiv.style.top = _this.getTop(tailoringDiv) + tailoringDiv.style.height.replace("px","")*1 + "px";
		},
		leftHeight:function(leftDiv,tailoringDiv){
            var _this = this;
            leftDiv.style.top = _this.getTop(tailoringDiv) + "px"; 
            leftDiv.style.width = _this.getLeft(tailoringDiv) + "px"; 
		},
		rightHeight:function(rightDiv,tailoringDiv){
            var _this = this;
            rightDiv.style.top = _this.getTop(tailoringDiv) + "px"; 
            rightDiv.style.left = _this.getLeft(tailoringDiv) + tailoringDiv.style.width.replace("px","")*1 + "px"; 
		},
		getTop:function(tailoringDiv){
             var top = tailoringDiv.offsetTop;
             return top;
		},
		getLeft:function(tailoringDiv){
             var left = tailoringDiv.offsetLeft;
             return left;
		},
		touchstart:function(event,tailoringDiv,tailoring){
			var _this = this;
			var touch = event.targetTouches[0];
            _this.startX = touch.pageX;
            _this.startY = touch.pageY;
            _this.offsetTop = tailoringDiv.offsetTop;
            _this.offsetLeft = tailoringDiv.offsetLeft; 
		},
		touchmove:function(event,tailoringDiv,tailoring){
			var _this = this;
			var touch = event.targetTouches[0];
            _this.endX = touch.pageX;
            _this.endY = touch.pageY;
            var bodyHeight = tailoring.offsetHeight;
            var bodyWidth = tailoring.offsetWidth; 
            var startX =  _this.startX ;
            var startY = _this.startY ;
            var endX = _this.endX ;
            var endY = _this.endY ;
            var offsetTop = _this.offsetTop ;
            var offsetLeft = _this.offsetLeft;
            var canvas = _this.canvas;

            if(offsetTop - (startY - endY) >= canvas.style.top.replace("px","") && offsetTop - (startY - endY) - (canvas.height - tailoringDiv.style.height.replace("px","")) - canvas.style.top.replace("px","")  <= 0){
              tailoringDiv.style.top =offsetTop - (startY - endY) + tailoringDiv.style.height.replace("px","") / 2  + "px";
            }else if(offsetTop - (startY - endY) < canvas.style.top.replace("px","")){
              tailoringDiv.style.top = tailoringDiv.style.height.replace("px","") / 2 + canvas.style.top.replace("px","")*1 + "px";
            }else if(offsetTop - (startY - endY) - (canvas.height - tailoringDiv.style.height.replace("px","")) - canvas.style.top.replace("px","")  > 0 ){
              tailoringDiv.style.top =  canvas.style.top.replace("px","")*1 + (canvas.height - 1/2 * tailoringDiv.style.height.replace("px","")) + "px";
            }
            if(offsetLeft - (startX - endX)  >= 0 && bodyWidth  - offsetLeft + (startX - endX) - tailoringDiv.style.width.replace("px","")  >=  0){
              tailoringDiv.style.left =offsetLeft - (startX - endX) + tailoringDiv.style.width.replace("px","") / 2  + "px";
            }else if(offsetLeft - (startX - endX)  < 0){
              tailoringDiv.style.left = tailoringDiv.style.width.replace("px","") / 2 + "px";
            }else if( bodyWidth  - offsetLeft + (startX - endX) - tailoringDiv.style.width.replace("px","")  <  0){
              tailoringDiv.style.left = bodyWidth - tailoringDiv.style.width.replace("px","")/2 + "px";
            }
		},
		touchend:function(event,tailoringDiv,tailoring){
            var _this = this;
            var imgData=_this.ctx.getImageData(tailoringDiv.offsetLeft,tailoringDiv.offsetTop - _this.canvas.style.top.replace("px","")*1,tailoringDiv.style.width.replace("px",""),tailoringDiv.style.height.replace("px","")); 
            _this.ctx.clearRect(0, 0,_this.canvas.width, _this.canvas.height);
            _this.canvas.height = tailoringDiv.style.height.replace("px","");
            _this.canvas.width = tailoringDiv.style.width.replace("px","");
            _this.canvas.style.marginLeft = - _this.canvas.width / 2 + "px";
            _this.canvas.style.top = "50%";
            _this.canvas.style.marginTop = - _this.canvas.height / 2 + "px";
            _this.ctx.putImageData(imgData,0,0); 
            _this.array.dom.removeChild(tailoring);
            var button1 = document.createElement("button");
            var button2 = document.createElement("button");
            button1.value = "取消";
            button1.innerHTML = "取消";
            button2.value = "确定";
            button2.innerHTML = "确定";
            _this.array.dom.appendChild(button1);
            _this.array.dom.appendChild(button2);
            button1.style.width = "50%";
            button1.style.lineHeight = "1.3rem";
            button1.style.background = "#56b0ff";
            button1.style.color = "#fff";
            button1.style.fontSize = "0.4rem";
            button1.style.position = "absolute";
            button1.style.bottom = "0px";
            button1.style.left = "0px";

            button2.style.width = "50%";
            button2.style.lineHeight = "1.3rem";
            button2.style.background = "#2d9cff";
            button2.style.color = "#fff";
            button2.style.fontSize = "0.4rem";
            button2.style.position = "absolute";
            button2.style.bottom = "0px";
            button2.style.right = "0px";
            button1.onclick = function(){
            	_this.array.dom.removeChild(_this.canvas);
            	_this.array.dom.removeChild(button1);
            	_this.array.dom.removeChild(button2);
            	_this.init();
            }
            button2.onclick = function(){
            	var base64 =  _this.canvas.toDataURL('image/' +  _this.array.type, 1);
            	 _this.array.getImg(base64);
            }
            /**/
		}
	}
	window.mappingCJJ = mappingCJJ;
	  
}())