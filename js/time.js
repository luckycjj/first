;(function($, window, document,undefined) {
  var cjjTime = function(ele,opt){
        this.$element = ele,
        this.defaults ={
              mintime:"",
              maxtime:"",
              defaultdate:"",
              timeClick:function(time){

              }
        }
        this.options = $.extend({},this.defaults,opt)
  }
  var nowyear="";
  var nowmonth="";
  var nowdate="";
  var minTime = "";
  var maxTime = "";
  var date = [{
            date:"星期日"
        },{
            date:"星期一"
        },{
            date:"星期二"
        },{
            date:"星期三"
        },{
            date:"星期四"
        },{
            date:"星期五"
        },{
            date:"星期六"
    }]
  cjjTime.prototype = {
        start:function(){
            var _this = this;
            minTime = _this.options.mintime;
            maxTime = _this.options.maxtime;
            _this.options.mintime = _this.options.mintime.replace(/-/g,'/');
            _this.options.maxtime = _this.options.maxtime.replace(/-/g,'/');
            _this.options.defaultdate = _this.options.defaultdate.replace(/\//g,'-');
            var timesmall ='<div class="generate" style="display:none;">'+
                  '<div class="time">'+
                      '<button class="last">上一个月</button>'+
                      '<p></p>'+                      
                      '<button class="next">下一个月</button>'+
                      '<div class="clearBoth"></div>'+
                  '</div>'+
                  '<ul class="date"></ul>'+
                  '<ul class="timeList"></ul>'+
                  '<button class="nowtime">当前日期</button>'+
                  '<button class="cleardate">清空日期</button>'+
                  '<p class="mintime" style="display:none;">'+_this.options.mintime+'</p>'+
                  '<p class="maxtime" style="display:none;">'+_this.options.maxtime+'</p>'+
                  '<div class="clearBoth"></div>'+
            '</div>';
            var  timeBody  = '<div class="textbody"><input type="text" readonly><div class="backgroundImg"></div>'+timesmall+'</div>';
            _this.$element.html(timeBody);
            var defaultdatetime = _this.options.defaultdate == "" ? _this.today().year + '-' + _this.today().month + '-' + _this.today().day : _this.options.defaultdate;
            $(_this.$element.selector+ ' input').val(_this.ten(defaultdatetime.split("-")[0]) + "-" + _this.ten(defaultdatetime.split("-")[1]) + "-" + _this.ten(defaultdatetime.split("-")[2]));
            for(var i =0 ;i<date.length;i++){
                var dateli = '<li>'+date[i].date+'</li>';
                $(_this.$element.selector+ ' .date').append(dateli);
            }
            $(_this.$element.selector+ ' .date').append('<div class="clearBoth"></div>');
             var year,month,day;
            $(_this.$element.selector+ ' .last').unbind('click').click(function(){
                 _this.last();
            });
            $(_this.$element.selector+ ' .next').unbind('click').click(function(){
                 _this.next();
            });
            $(_this.$element.selector+ ' .nowtime').unbind('click').click(function(){
                 _this.nowTime();
            });
            $(_this.$element.selector+ ' .cleardate').unbind('click').click(function(){
                $(_this.$element.selector+ ' input').val("");
            });
            $(_this.$element.selector+ ' .backgroundImg').unbind('click').click(function(){
                 if($(_this.$element.selector+ ' .generate').css("display")=="none"){
                    $(_this.$element.selector+ ' .generate').css("display","block");
                    if($(_this.$element.selector+' .mintime').text().indexOf('/') == -1 && _this.options.mintime!=""){
                       _this.options.mintime = $('#'+$(_this.$element.selector+' .mintime').text()).find("input").val().replace(/-/g,'/');
                    }
                    if($(_this.$element.selector+' .maxtime').text().indexOf('/') == -1 && _this.options.maxtime!=""){
                       _this.options.maxtime = $('#'+$(_this.$element.selector+' .maxtime').text()).find("input").val().replace(/-/g,'/');
                    }
                    if((new Date(_this.options.mintime)).getTime()<(new Date()).getTime()){
                       year = _this.today().year;
                       month = _this.today().month;
                       day = _this.today().day;
                    }else{
                        year = _this.options.mintime.split("/")[0];
                        month = _this.options.mintime.split("/")[1];
                        day = _this.options.mintime.split("/")[2];
                    }  
                    if($(_this.$element.selector+ ' input').val()!=""){
                        year = $(_this.$element.selector+ ' input').val().split("-")[0];
                        month = $(_this.$element.selector+ ' input').val().split("-")[1];
                        day = $(_this.$element.selector+ ' input').val().split("-")[2];
                    }
                    nowyear = year;
                    nowmonth = month;
                    nowdate = day;
                    _this.goli(year,month,day);
                 }else{
                    $(_this.$element.selector+ ' .generate').css("display","none");
                 }
            });
        },
        last:function(){
            var _this = this;
            var month = nowmonth;
            var year = nowyear; 
            var lastyear = month ==1? year-1:year;
            var lastnomth = month ==1?12:month-1;
            var lastday = nowdate - (new Date(lastyear,lastnomth,0)).getDate()>0?(new Date(lastyear,lastnomth,0)).getDate():nowdate;
            _this.goli(lastyear,lastnomth,lastday);
        },
        next:function(){
            var _this = this;
            var month =nowmonth;
            var year = nowyear; 
            var nextnomth = month ==12?1:month*1+1;
            var nextyear = month ==12?year*1+1:year;
            var nextday = nowdate - (new Date(nextyear,nextnomth,0)).getDate()>0?(new Date(nextyear,nextnomth,0)).getDate():nowdate;
            _this.goli(nextyear,nextnomth,nextday);
        },
        nowTime:function(){
           var _this = this;
           $(_this.$element.selector+ ' input').val(_this.ten(_this.today().year)+"-"+_this.ten(_this.today().month)+"-"+_this.ten(_this.today().day));
           _this.goli(_this.today().year,_this.today().month,_this.today().day);
        },
        clickList:function(number){
           var _this = this;
           var color = $(_this.$element.selector+ ' .timeList li').eq(number).attr("data-color");
           if(color!="3"){
                for(var i=0;i<$(_this.$element.selector+ ' .timeList li').length;i++){
                    if($(_this.$element.selector+ ' .timeList li').eq(i).attr("data-color")!="3"){
                        $(_this.$element.selector+ ' .timeList li').eq(i).removeClass("datecolor");
                    }
                }
               $(_this.$element.selector+ ' .timeList li').eq(number).addClass("datecolor");
               nowdate = $(_this.$element.selector+ ' .timeList li').eq(number).html();
               $(_this.$element.selector+ ' .generate .time p').text(_this.ten(nowyear) + "-" + _this.ten(nowmonth) + "-" + _this.ten(nowdate));
               $(_this.$element.selector+ ' input').val(_this.ten(nowyear) + "-" + _this.ten(nowmonth) + "-" + _this.ten(nowdate));
               _this.options.timeClick(nowyear+'/'+nowmonth+'/'+nowdate);
           }
        },
        goli:function(year,month,day){
            var _this = this;
            nowyear = year;
            nowmonth = month;
            nowdate = day;
            $(_this.$element.selector+ ' .generate .time p').text(_this.ten(nowyear)+"-"+_this.ten(nowmonth)+"-"+_this.ten(nowdate));
            var dayNumber =new Date(year,month,0).getDate();
            var list = [];
            var xingqi = new Date(year + "/" + month + "/" + 1).getDay();
            for(var i = xingqi;i > 0 ;i--){

                var json = {
                     number :new Date(new Date(year + "/" + month + "/" + 1).getTime() - 1000*60*60*24*i).getDate(),
                     color:3,
                }
                list.push(json);
            }
            for(var i=0;i<dayNumber;i++){
                var json = {
                     number :i+1,
                     color:1
                }
                if(_this.options.mintime!=""){
                    if((new Date(nowyear+'/'+nowmonth+'/'+nowdate)).getTime()-(new Date(year+'/'+month+'/'+(i+1))).getTime()==0&&(new Date(_this.options.mintime)).getTime()-(new Date(year+'/'+month+'/'+(i+1))).getTime()<=0){
                        json.color = 2;
                    }
                }else{
                   if((new Date(nowyear+'/'+nowmonth+'/'+nowdate)).getTime()-(new Date(year+'/'+month+'/'+(i+1))).getTime()==0){
                        json.color = 2;
                    }
                }
                if((new Date(_this.options.mintime)).getTime()-(new Date(year+'/'+month+'/'+(i+1))).getTime()>0){
                    json.color = 3;
                }
                if((new Date(_this.options.maxtime)).getTime()-(new Date(year+'/'+month+'/'+(i+1))).getTime()<0){
                    json.color = 3;
                }
                list.push(json);
            }
            var xingqi2 = new Date(year + "/" + month + "/" + dayNumber).getDay();
            for(var i = xingqi2 ; i < 6 ; i++){
               var json = {
                     number :new Date(new Date(year + "/" + month + "/" + dayNumber).getTime() + 1000*60*60*24*(i+1-xingqi2)).getDate(),
                     color:3,
                }
                list.push(json);
            }
            var timeList="";
            for(var i=0;i<list.length;i++){
                var classname;
                if(list[i].color==2){ 
                    timeList += "<li class='datecolor datecolorPrimary'  data-color="+list[i].color+">"+list[i].number+"</li>";
                }else if(list[i].color==3){
                    classname ="datecolorend"; 
                    timeList += "<li class="+classname+"  data-color="+list[i].color+">"+list[i].number+"</li>";
                }else{
                    classname ='datecolorPrimary'; 
                    timeList += "<li class="+classname+"  data-color="+list[i].color+">"+list[i].number+"</li>";
                }
            }
            $(_this.$element.selector+ ' .timeList').html(timeList + '<div class="clearBoth"></div>');
            $(_this.$element.selector+ ' .timeList li').unbind('click').click(function(){
                var number = $(this).index(_this.$element.selector+ ' .timeList li');
                _this.clickList(number);
            });
        },
        today:function(){
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var day = date.getDate();
            return {year:year,month:month,day:day}
        },
        ten:function(number){
            number = number * 1 < 10  ? "0" + number*1 : number*1 ; 
            return number ; 
        }
    

  }
  $.fn.CJJTime = function(options){
        var cjj = new cjjTime(this,options);
        return cjj.start();
  }

})(jQuery, window, document);