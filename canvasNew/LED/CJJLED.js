(function(){
    var LEDCJJ = function(array){
    	var _this = this;
    	//数字渲染源
    	_this.numberList = [{
    		  number : 0 ,
    		  showColor : [0,1,2,3,4,5]
    	},{
    		  number : 1 ,
    		  showColor : [1,2]
    	},{
    		  number : 2 ,
    		  showColor : [0,1,6,4,3]
    	},{
    		  number : 3 ,
    		  showColor : [0,1,6,2,3]
    	},{
    		  number : 4 ,
    		  showColor : [5,6,1,2]
    	},{
    		  number : 5 ,
    		  showColor : [0,5,6,2,3]
    	},{
    		  number : 6 ,
    		  showColor : [0,5,6,4,3,2]
    	},{
    		  number : 7 ,
    		  showColor : [0,1,2]
    	},{
    		  number : 8 ,
    		  showColor : [0,1,2,3,4,5,6]
    	},{
    		  number : 9 ,
    		  showColor : [0,1,2,3,5,6]
    	}]
    	array.number = array.number || 0 ;
    	array.notGet = array.notGet || "transparent" ;
    	array.getColor = array.getColor || "#000" ;
    
    	array.size = array.size || 20;
    	_this.arr = array;
    	_this.random = Math.random();
        _this.init();
        _this.setVal = function(number){
             _this.arr.number = number;
    		 _this.init();
    	}   
    }
    LEDCJJ.prototype = {
    	 init : function(){
             var _this = this;
             if(typeof _this.arr.number === "number"){
    
	            _this.arr.number = _this.arr.number.toString()
	    	}
             var len = (_this.arr.number).length;
             var dom = document.getElementById(_this.arr.dom);
             dom.innerHTML = "";
             var childdom = "";
             var re = /^[0-9]+.?[0-9]*$/;
             for(var i = 0 ; i < len ; i++){
             	 if(re.test(_this.arr.number[i])){
                   childdom += _this.domList();
             	 }else{
                   childdom += _this.notNumber();
             	 }
             	 
             }
             dom.innerHTML = "<div id='CJJLED" + _this.random + "'>" + childdom + "<div style='clear:both;'></div></div>";
             _this.pushColor();
    	 },
         domList : function(){
              var _this = this;
              var width = _this.arr.size;
         	  var str = "";
         	  for(var i = 0  ; i < 7 ; i ++){
         	  	  var smallWidth = i ==0 || i ==3 || i == 6 ?   0.8 * width : 0.1*width ;
         	  	  var smallHeight = i ==0 || i ==3 || i == 6 ?   0.1 * width : 0.8*width ;
         	  	  var left = i == 0 || i == 6 || i == 3? 0.1* width : i == 1 || i == 2 ? 0.9 * width : 0 * width ;
         	  	  var top = i == 0 ? 0 * width : i == 1 || i ==5 ?  0.1*width : i == 4 || i ==2 ? width : i == 3 ? 1.8*width : 0.9 * width; 
         	  	  str += "<div class='LEDLine' style='position: absolute;background : " + _this.arr.notGet +";width:" + smallWidth +"px ;height : " + smallHeight +"px;left : " + left+ "px;top : " + top+"px;'></div>";
         	  }
         	  var domBox = "<div class='LEDLineBox'  style='position: relative;float: left;width:" + width +"px ;height: " + width*1.9 +"px; margin: 0 " + width / 10+ "px;'>" + str + "</div>";
         	  return domBox ;
         },
         notNumber : function(){
              var _this = this;
              var width = _this.arr.size;
         	  var str = "";
         	  for(var i = 0  ; i < 1 ; i ++){
         	  	  var smallWidth =   0.16 * width  ;
         	  	  var smallHeight =  0.16 * width  ;
         	  	  str += "<div class='nonumber' style='position: absolute; bottom:0;left:50%;background : " + _this.arr.getColor +";width:" + smallWidth +"px ;height : " + smallHeight +"px;margin-left : -" + 0.5*smallWidth + "px;'></div>";
         	  }
         	  var domBox = "<div class='LEDLineBox' style='position: relative;float: left;width:" + width +"px ;height: " + width*1.9 +"px; margin: 0 " + width / 10+ "px;' >" + str + "</div>"
         	  return domBox ;
         },
         pushColor:function(){
         	var _this = this;
            var len = (_this.arr.number).length; 
            var dom = document.getElementById(_this.arr.dom);
            var domBox = dom.getElementsByClassName("LEDLineBox");
            for(var i = 0 ; i < len ; i++){
                var number = (_this.arr.number)[i];
                for(var x = 0 ; x < _this.numberList.length ; x ++){
                	  if(number == _this.numberList[x].number){
                	  	 for(var z = 0 ; z < _this.numberList[x].showColor.length ; z++){
                	  	 	 domBox[i].getElementsByClassName("LEDLine")[_this.numberList[x].showColor[z]].style.background = _this.arr.getColor;
                	  	 }
                	  }
                }
            }
         },
    }
    window.LEDCJJ = LEDCJJ;
}())