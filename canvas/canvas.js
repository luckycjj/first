(function(){
	var drawClock = function(array){
		var _this = this;
		var canvas = document.createElement("canvas");
		var canvasBody = document.getElementById(array.canvas);
		canvas.id = array.canvas + "cjjCanvasClock";
		if(array.width == undefined){
			canvas.width = 500;
		}else{
			canvas.width = array.width;
		}
		if(array.hourColor == undefined){
			_this.hourColor = "#333";
		}else{
			_this.hourColor = array.hourColor;
		}
		if(array.minColor == undefined){
			_this.minColor = "#666";
		}else{
			_this.minColor = array.minColor;
		}
		if(array.secColor == undefined){
			_this.secColor = "#999";
		}else{
			_this.secColor = array.secColor;
		}
	    if(array.height == undefined){
			canvas.height = 500;
		}else{
			canvas.height = array.height;
		}
		canvasBody.appendChild(canvas);
		_this.canvas = canvas;
	    var ctx = canvas.getContext("2d");
	 	_this.clockRadius = _this.canvas.width / 2;

	 	_this.ctx = ctx;

	 	_this.drawImage();

	 	var setTime = setInterval(function(){
	 	  _this.ctx.translate(-1/2*_this.ctx.canvas.width,-1/2 * _this.ctx.canvas.height);
	      _this.drawImage();
			},1000)
	 	
	}
	drawClock.prototype = {
		clearCanvas : function(){
			this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
		},
		drawImage : function() {
			this.clearCanvas();
            var _this = this;
			var ctx = _this.ctx;
			var date = new Date();
			var hours = date.getHours();
			var min = date.getMinutes();
			var sec = date.getSeconds();
			var hour = hours > 12 ? hours - 12 : hours;

			var minute = min + sec/60;
	        hour = hour + minute/60;

			ctx.save();

			ctx.translate(_this.canvas.width/2,_this.canvas.height/2); // 重新设置中心点

			ctx.beginPath();
	     

		     //绘制黑色圆圈
		     ctx.save();
		     for(var i = 1 ; i < 61 ; i++){
		     	var theta = (i - 15) * (2 * Math.PI) / 60; 
		     	var x = _this.clockRadius*0.9 * Math.cos(theta);
		        var y = _this.clockRadius*0.9 * Math.sin(theta);
		        ctx.beginPath();
		        ctx.arc(x,y,5,0,2*Math.PI,false);
		        if( i % 5 == 0){
		        	ctx.fillStyle = "#000"
		        }else{
		        	ctx.fillStyle = "#dcdcdc"
		        }
		        ctx.fill();  
		      }
             
		      ctx.restore();

				//画数字
				ctx.save();
				ctx.font = "36px Arial";
				ctx.fillStyle = "#000";
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				for (var n = 1; n <= 12; n++) {
		        var theta = (n - 3) * (Math.PI * 2) / 360 *30; //算弧度
		        var x = _this.clockRadius * 0.7 * Math.cos(theta);
		        var y = _this.clockRadius * 0.7 * Math.sin(theta);
		        ctx.fillText(n, x, y);
		    }


			ctx.save();

			var theta = (hour - 3) * (2 * Math.PI) / 12;
			ctx.rotate(theta);
		    ctx.beginPath();
		    ctx.moveTo(-15, -5);
		    ctx.lineTo(-15, 5);
		    ctx.lineTo(_this.clockRadius * 0.5, 1);
		    ctx.lineTo(_this.clockRadius * 0.5, 1);
		    ctx.fillStyle = _this.hourColor;
		    ctx.fill();
		    ctx.restore();

		     // draw minute
		    ctx.save();
		    var theta = (minute - 15) * (2 * Math.PI) / 60;
		    ctx.rotate(theta);
		    ctx.beginPath();
		    ctx.moveTo(-15, -4);
		    ctx.lineTo(-15, 4);
		    ctx.lineTo(_this.clockRadius * 0.8, 1);
		    ctx.lineTo(_this.clockRadius * 0.8, -1);
		    ctx.fillStyle = _this.minColor;
		    ctx.fill();
		    ctx.restore();

		    // draw second
		    ctx.save();
		    var theta = (sec - 15) * (2 * Math.PI) / 60;
		    ctx.rotate(theta);
		    ctx.beginPath();
		    ctx.moveTo(-15, -3);
		    ctx.lineTo(-15, 3);
		    ctx.lineTo(_this.clockRadius * 0.9, 1);
		    ctx.lineTo(_this.clockRadius * 0.9, -1);
		    ctx.fillStyle = _this.secColor;
		    ctx.fill();
		    ctx.restore();
		    
		    //
		    ctx.save();
		    ctx.beginPath();
		    ctx.arc(0,0,10,0,2*Math.PI);
		    ctx.fillStyle = "#ff3838"
		    ctx.fill();
		    ctx.restore();

		    ctx.restore();
		}
	}
	window.drawClock = drawClock;
}())