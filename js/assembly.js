$(function(){
    var assembly = {
       addClass:function(obj,cls){//增加class
          var id =  document.getElementById(obj);
          var idJson = id.className.split(" ");
          for(var i=0;i<idJson.length;i++){
            if(idJson[i]==cls){
               return false;
            }
          }
          idJson.push(cls);
          id.className = idJson.join(" ");
          return true;
        },
        removeClass:function(obj,cls){//删除class
          var id =  document.getElementById(obj);
          var idJson = id.className.split(" ");
          for(var i=0;i<idJson.length;i++){
            if(idJson[i]==cls){
                idJson.splice(i,1)
            }
          }
          id.className = idJson.join(" ");
        },
        hasClass:function(obj,cls){//判断是不是有这个class
          var idJson = document.getElementById(obj).className.split(" ");
          for(var i=0;i<idJson.length;i++){
            if(idJson[i]==cls){
              return true;
            }
          }
          return false;
        },
        GetQueryString:function(name){//获取链接带的参数
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null){
              return  unescape(r[2]);
            }else{
              return null;
            }
        },
        getFirstOrEndDay:function(index){//index==0为本月最后一天，1为本月第一天
            var newDay = new Date();
            var year = newDay.getFullYear();
            var month="";
            var day;
            if(index==0){
              month = newDay.getMonth()+1;
              day = new Date(year,month,index);
            }else if(index==1){
              month = newDay.getMonth()+1;
              day = new Date(year+"/"+month+"/"+index);
            }
            return assembly.ten(day.getFullYear())+"-"+assembly.ten(day.getMonth()+1)+"-"+assembly.ten(day.getDate());
        },
        ten:function(number){//小于10的加0
           return number<10?"0"+number:number;
        },
        fn:function(mi,ma){
           if(mi>ma){
              var m = ma;
              ma = mi;
              mi =m;
           }
           var number = new Array();
           for(var i=0;i<(ma-mi+1);i++){
              var num = assembly.randow(mi,ma); 
              if(assembly.check(num,number)){
                 i--;
              }else{
                  number.push(num);
              }
           }
           return number;
        },
        randow:function(min,max){
           if(min>max){
              var n = max;
              max=min;
              min = n;
           }
           return Math.floor(Math.random()*(max-min+1))+min;
        },
        check:function(num,arr){
           for(var i=0;i<arr.length;i++){
              if(num==arr[i]){
                return true;
              }
           }
           return false;
        }
    }
})