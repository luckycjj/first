;(function($, window, document,undefined) {
  var cjjProvince = function(ele,opt){
        this.$element = ele,
        this.defaults ={
            jsonUrl:null,
            type:1,
            label:null
        }
        this.options = $.extend({},this.defaults,opt)
  }
  cjjProvince.prototype = {
        start:function(){
            var _this = this;
            if(_this.options.type==1){
                $( _this.$element.selector).html("<div class='Cjj-ProvinceBox'>"+
                                               "<input type='text' placeholder='请选择省'/>"+
                                            "</div>"+
                                            "<div class='Cjj-CityBox'>"+
                                               "<input type='text' placeholder='请选择市'/>"+
                                            "</div>"+
                                            "<div class='Cjj-AreaBox'>"+
                                               "<input type='text' placeholder='请选择区'/>"+
                                            "</div>"+
                                            "<div class='Cjj-clearfix'></div>");
                $(_this.$element.selector+" .Cjj-ProvinceBox input").unbind('click').click(function(){
                    $(_this.$element.selector+" .Cjj-CityBox ul").remove();
                    $(_this.$element.selector+" .Cjj-AreaBox ul").remove();
                    _this.province(_this);
                });
                $(_this.$element.selector+" .Cjj-ProvinceBox input").unbind('input propertychange').bind('input propertychange',function(){
                    _this.provinceKeyup(_this,$(this));
                })
                $(_this.$element.selector+" .Cjj-CityBox input").unbind('click').click(function(){
                    $(_this.$element.selector+" .Cjj-ProvinceBox ul").remove();
                    $(_this.$element.selector+" .Cjj-AreaBox ul").remove();
                    if($(_this.$element.selector+" .Cjj-ProvinceBox input").attr("data-code")!=undefined){
                        _this.city(_this,$(_this.$element.selector+" .Cjj-ProvinceBox input").attr("data-code"));
                    }   
                });
                $(_this.$element.selector+" .Cjj-CityBox input").unbind('input propertychange').bind('input propertychange',function(){
                    if($(_this.$element.selector+" .Cjj-ProvinceBox input").attr("data-code")!=undefined){
                        _this.cityKeyup(_this,$(this),$(_this.$element.selector+" .Cjj-ProvinceBox input").attr("data-code"));
                    }   
                });
                $(_this.$element.selector+" .Cjj-AreaBox input").unbind('click').click(function(){
                    $(_this.$element.selector+" .Cjj-ProvinceBox ul").remove();
                    $(_this.$element.selector+" .Cjj-CityBox ul").remove();
                    if($(_this.$element.selector+" .Cjj-ProvinceBox input").attr("data-code")!=undefined&&$(_this.$element.selector+" .Cjj-CityBox input").attr("data-code")!=undefined){
                        _this.area(_this,$(_this.$element.selector+" .Cjj-ProvinceBox input").attr("data-code"),$(_this.$element.selector+" .Cjj-CityBox input").attr("data-code"));
                    }   
                });
                $(_this.$element.selector+" .Cjj-AreaBox input").unbind('input propertychange').bind('input propertychange',function(){
                    if($(_this.$element.selector+" .Cjj-ProvinceBox input").attr("data-code")!=undefined&&$(_this.$element.selector+" .Cjj-CityBox input").attr("data-code")!=undefined){
                        _this.areaKeyup(_this,$(this),$(_this.$element.selector+" .Cjj-ProvinceBox input").attr("data-code"),$(_this.$element.selector+" .Cjj-CityBox input").attr("data-code"));
                    }   
                });
                $("body,html").bind("click",function(evt){
                    if($(evt.target).parents(_this.$element.selector).length==0){
                        $(_this.$element.selector+" ul").remove();
                    }
                })
            }else if(_this.options.type==2){
                _this.options.label =["ABCDEF","GHIJ","KLMN","PORSTUVW","XYZ"];
                $( _this.$element.selector).html("<div class='Cjj-ProvinceCityAreaBox'>"+
                                                     "<input type='text' placeholder='请选择地区' readonly='readonly'/>"+
                                                     "<div class='Cjj-clearfix'></div>"+
                                                   "</div>");
                $(_this.$element.selector+" .Cjj-ProvinceCityAreaBox input").unbind('click').click(function(){
                    _this.provinceCityArea(_this);
                })
                $("body,html").bind("click",function(evt){
                    if($(evt.target).parents(_this.$element.selector).length==0&&$(evt.target).hasClass('Cjj-toArea')==false&&$(evt.target).hasClass('Cjj-close')==false){
                        $(_this.$element.selector+" .Cjj-ProvinceCityArea").remove();
                    }
                })
            }
        
        },
        province:function(e){
            var display = $(e.$element.selector+" .Cjj-ProvinceBox ul");
            if(display.length==0){
                $(e.$element.selector+" .Cjj-ProvinceBox").append("<ul></ul>");
                var proBox="";
                var pro ="";
                for(var i=0;i<e.options.jsonUrl.length;i++){
                    pro+="<li data-code="+i+">"+e.options.jsonUrl[i].region+"</li>";
                    proBox = pro;
                }
                $(e.$element.selector+" .Cjj-ProvinceBox ul").html(proBox);
                var dataCode = $(e.$element.selector+" .Cjj-ProvinceBox input").attr('data-code');
                if(dataCode!=undefined){
                    $(e.$element.selector+" .Cjj-ProvinceBox ul li").eq(dataCode).css({"background":"#fc727f","color":"white"});
                    var height = $(e.$element.selector+" .Cjj-ProvinceBox ul li").eq(0).outerHeight(true);
                    $(e.$element.selector+" .Cjj-ProvinceBox ul").animate({scrollTop: height*dataCode}, 0);
                };
                $(e.$element.selector+" .Cjj-ProvinceBox ul li").unbind("click").click(function(){
                      e.provinceChoose(e,$(this));
                });
            }
        },
        provinceKeyup:function(e,that){
            var val = that.val();
            $(e.$element.selector+" .Cjj-ProvinceBox input").removeAttr("data-code");
            $(e.$element.selector+" .Cjj-CityBox input").val("");
            $(e.$element.selector+" .Cjj-CityBox input").removeAttr("data-code");
            $(e.$element.selector+" .Cjj-AreaBox input").val("");
            $(e.$element.selector+" .Cjj-AreaBox input").removeAttr("data-code");
            var proBox="";
            var pro ="";
            for(var i=0;i<e.options.jsonUrl.length;i++){
                if(e.options.jsonUrl[i].region.indexOf(val)!=-1){
                   pro+="<li data-code="+i+">"+e.options.jsonUrl[i].region+"</li>"; 
                }
                proBox = pro;
            }
            $(e.$element.selector+" .Cjj-ProvinceBox ul").html(proBox);
            $(e.$element.selector+" .Cjj-ProvinceBox ul li").unbind("click").click(function(){
                  e.provinceChoose(e,$(this));
            });
        },
        provinceChoose:function(e,that){
            $(e.$element.selector+" .Cjj-ProvinceBox input").val(that.html());
            $(e.$element.selector+" .Cjj-ProvinceBox input").attr("data-code",that.attr("data-code"));
            $(e.$element.selector+" .Cjj-CityBox input").val("");
            $(e.$element.selector+" .Cjj-CityBox input").removeAttr("data-code");
            $(e.$element.selector+" .Cjj-AreaBox input").val("");
            $(e.$element.selector+" .Cjj-AreaBox input").removeAttr("data-code");
            $(e.$element.selector+" .Cjj-ProvinceBox ul").remove();
        },
        city:function(e,Pronumber){
            var display = $(e.$element.selector+" .Cjj-CityBox ul");
            if(display.length==0){
                $(e.$element.selector+" .Cjj-CityBox").append("<ul></ul>");
                var cityBox="";
                var city ="";
                for(var i=0;i<e.options.jsonUrl[Pronumber].child.length;i++){
                    city+="<li data-code="+i+">"+e.options.jsonUrl[Pronumber].child[i].region+"</li>";
                    cityBox = city;
                }
                $(e.$element.selector+" .Cjj-CityBox ul").html(cityBox);
                var dataCode = $(e.$element.selector+" .Cjj-CityBox input").attr('data-code');
                if(dataCode!=undefined){
                    $(e.$element.selector+" .Cjj-CityBox ul li").eq(dataCode).css({"background":"#fc727f","color":"white"});
                    var height = $(e.$element.selector+" .Cjj-CityBox ul li").eq(0).outerHeight(true);
                     $(e.$element.selector+" .Cjj-CityBox ul").animate({scrollTop: height*dataCode}, 0);
                }
                $(e.$element.selector+" .Cjj-CityBox ul li").unbind("click").click(function(){
                      e.cityChoose(e,$(this));
                })
            }
        },
        cityKeyup:function(e,that,Pronumber){
            var val = that.val();
            $(e.$element.selector+" .Cjj-CityBox input").removeAttr("data-code");
            $(e.$element.selector+" .Cjj-AreaBox input").val("");
            $(e.$element.selector+" .Cjj-AreaBox input").removeAttr("data-code");
            var cityBox="";
            var city ="";
            for(var i=0;i<e.options.jsonUrl[Pronumber].child.length;i++){
                if(e.options.jsonUrl[Pronumber].child[i].region.indexOf(val)!=-1){
                   city+="<li data-code="+i+">"+e.options.jsonUrl[Pronumber].child[i].region+"</li>"; 
                }
                cityBox = city;
            }
            $(e.$element.selector+" .Cjj-CityBox ul").html(cityBox);
            $(e.$element.selector+" .Cjj-CityBox ul li").unbind("click").click(function(){
                  e.cityChoose(e,$(this));
            });
        },
        cityChoose:function(e,that){
            $(e.$element.selector+" .Cjj-CityBox input").val(that.html());
            $(e.$element.selector+" .Cjj-CityBox input").attr("data-code",that.attr("data-code"));
            $(e.$element.selector+" .Cjj-AreaBox input").val("");
            $(e.$element.selector+" .Cjj-AreaBox input").removeAttr("data-code");
            $(e.$element.selector+" .Cjj-CityBox ul").remove();
        },
        area:function(e,Pronumber,Citnumber){
            var display = $(e.$element.selector+" .Cjj-AreaBox ul");
            if(display.length==0){
                $(e.$element.selector+" .Cjj-AreaBox").append("<ul></ul>");
                var areaBox="";
                var area ="";
                for(var i=0;i<e.options.jsonUrl[Pronumber].child[Citnumber].child.length;i++){
                    area+="<li data-code="+i+">"+e.options.jsonUrl[Pronumber].child[Citnumber].child[i].region+"</li>";
                    areaBox = area;
                }
                $(e.$element.selector+" .Cjj-AreaBox ul").html(areaBox);
                var dataCode = $(e.$element.selector+" .Cjj-AreaBox input").attr('data-code');
                if(dataCode!=undefined){
                    $(e.$element.selector+" .Cjj-AreaBox ul li").eq(dataCode).css({"background":"#fc727f","color":"white"});
                    var height = $(e.$element.selector+" .Cjj-AreaBox ul li").eq(0).outerHeight(true);
                     $(e.$element.selector+" .Cjj-AreaBox ul").animate({scrollTop: height*dataCode}, 0);
                }
                $(e.$element.selector+" .Cjj-AreaBox ul li").unbind("click").click(function(){
                      e.areaChoose(e,$(this));
                })
            }
        },
        areaKeyup:function(e,that,Pronumber,Citnumber){
            var val = that.val();
            $(e.$element.selector+" .Cjj-AreaBox input").removeAttr("data-code");
            var areaBox="";
            var area ="";
            for(var i=0;i<e.options.jsonUrl[Pronumber].child[Citnumber].child.length;i++){
                if(e.options.jsonUrl[Pronumber].child[Citnumber].child[i].region.indexOf(val)!=-1){
                   area+="<li data-code="+i+">"+e.options.jsonUrl[Pronumber].child[Citnumber].child[i].region+"</li>"; 
                }
                areaBox = area;
            }
            $(e.$element.selector+" .Cjj-AreaBox ul").html(areaBox);
            $(e.$element.selector+" .Cjj-AreaBox ul li").unbind("click").click(function(){
                  e.areaChoose(e,$(this));
            });
        },
        areaChoose:function(e,that){
            $(e.$element.selector+" .Cjj-AreaBox input").val(that.html());
            $(e.$element.selector+" .Cjj-AreaBox input").attr("data-code",that.attr("data-code"));
            $(e.$element.selector+" .Cjj-AreaBox ul").remove();
        },
        provinceCityArea:function(e){
            var display = $(e.$element.selector+" .Cjj-ProvinceCityAreaBox .Cjj-ProvinceCityArea");
            if(display.length==0){
                var labelLi = "";
                    for(var i=0;i<e.options.label.length;i++){
                        labelLi+="<li>"+e.options.label[i]+"</li>";
                    }
                    $(e.$element.selector+" .Cjj-ProvinceCityAreaBox").append("<div class='Cjj-ProvinceCityArea'><ul class='Cjj-ProvinceCityAreaTitle'>"+labelLi+"<div class='Cjj-clearfix'></div></ul><ul class='Cjj-ProvinceCityAreaBody'></ul></div>");
                if($(e.$element.selector+" .Cjj-ProvinceCityAreaBox input").val()==""){
                    $(e.$element.selector+" .Cjj-ProvinceCityAreaTitle li").eq(0).addClass("Cjj-lableColor");
                    e.citySort(e,e.options.label[0]);
                }else{
                    for(var i=0;i<e.options.label.length;i++){
                        if(e.options.label[i].indexOf($(e.$element.selector+" .Cjj-ProvinceCityAreaBox input").attr("data-type"))!=-1){
                            $(e.$element.selector+" .Cjj-ProvinceCityAreaTitle li").eq(i).addClass("Cjj-lableColor");
                        }
                    }
                    e.areaSort(e,$(e.$element.selector+" .Cjj-ProvinceCityAreaBox input").val().split("-")[0],$(e.$element.selector+" .Cjj-ProvinceCityAreaBox input").attr("data-code").split("-")[0],$(e.$element.selector+" .Cjj-ProvinceCityAreaBox input").attr("data-type"));
                }
                $(e.$element.selector+" .Cjj-ProvinceCityAreaTitle li").unbind('click').click(function(){
                    $(e.$element.selector+" .Cjj-ProvinceCityAreaTitle li").removeClass("Cjj-lableColor");
                    $(this).addClass("Cjj-lableColor");
                    e.citySort(e,$(this).html());
                })
                
            }
        },
        citySort:function(e,html){
            $(e.$element.selector).find('.Cjj-ProvinceCityAreaBody').html("");
            var cityABCDEF = new Array();
            for(var i =0;i<e.options.jsonUrl.length;i++){
                for(var x = 0;x<html.length;x++){
                    if(e.options.jsonUrl[i].initial==html[x]){
                        cityABCDEF.push(e.options.jsonUrl[i])
                    }
                }
            }
            for(var i=0;i<html.length;i++){
                var number = html[i];
                $(e.$element.selector).find('.Cjj-ProvinceCityAreaBody').append('<ul><li class="Cjj-toAreaTitle" style="color:#fc727f">'+html[i]+'</li></ul>')
                for(var x=0;x<cityABCDEF.length;x++){
                    var cityNumber = cityABCDEF[x].initial;
                    var citymaxBox = "";
                    var cityMax = "";
                    if(number==cityNumber){
                        cityMax+="<li class='Cjj-toArea' data-code="
                            +cityABCDEF[x].code+">"
                            +cityABCDEF[x].city_name+"</li>";
                        cityMaxBox = cityMax;
                        $(e.$element.selector).find('.Cjj-ProvinceCityAreaBody ul').eq(i).append(cityMaxBox);
                    }
                }
            }
            $(e.$element.selector).find('.Cjj-ProvinceCityAreaBody ul li').unbind('click').click(function(){
                e.areaSort(e,$(this).html(),$(this).attr("data-code"),$(this).parents(".Cjj-ProvinceCityAreaBody ul").find(".Cjj-toAreaTitle").html());
            })
        },
        areaSort:function(e,html,code,type){
            $(e.$element.selector).find('.Cjj-ProvinceCityAreaBody').html("");
            $(e.$element.selector).find('.Cjj-ProvinceCityAreaBody').append("<span class='Cjj-labelBox'><span class='Cjj-label' data-type='"+type+"' data-code='"+code+"'>"+html+"</span><span class='Cjj-close'>X</span></span>");
            $(e.$element.selector).find('.Cjj-ProvinceCityAreaBody').append("<ul></ul>"); 
            var jsonCode = new Array();
            for(var i=0;i<e.options.jsonUrl.length;i++){
                 if(code==e.options.jsonUrl[i].code){
                    jsonCode.push(e.options.jsonUrl[i].area)
                 }
            }
            var area="";
            for(var i=0;i<jsonCode[0].length;i++){
                if($(e.$element.selector).find('.Cjj-ProvinceCityAreaBox input').attr("data-code")!=undefined&&jsonCode[0][i].code==$(e.$element.selector).find('.Cjj-ProvinceCityAreaBox input').attr("data-code").split("-")[1]){
                    area+="<li class='Cjj-toArea Cjj-fense' data-code="
                        +jsonCode[0][i].code+">"
                        +jsonCode[0][i].area_name+"</li>";
                }else{
                    area+="<li class='Cjj-toArea' data-code="
                    +jsonCode[0][i].code+">"
                    +jsonCode[0][i].area_name+"</li>";
                }
                
            }
            $(e.$element.selector).find('.Cjj-ProvinceCityAreaBody ul').append(area);
            $(e.$element.selector).find('.Cjj-ProvinceCityAreaBody ul li').unbind('click').click(function(){
                e.cityAreaSort(e,$(e.$element.selector).find(".Cjj-label").html()+"-"+$(this).html(),$(e.$element.selector).find(".Cjj-label").attr("data-code")+"-"+$(this).attr("data-code"),$(e.$element.selector).find(".Cjj-label").attr("data-type"));
            });
            $(e.$element.selector).find('.Cjj-close').unbind('click').click(function(){
                $(e.$element.selector+" .Cjj-ProvinceCityAreaTitle li").removeClass("Cjj-lableColor");
                $(e.$element.selector+" .Cjj-ProvinceCityAreaTitle li").eq(0).addClass("Cjj-lableColor");
                $(e.$element.selector).find('.Cjj-ProvinceCityAreaBox input').val("");
                $(e.$element.selector).find('.Cjj-ProvinceCityAreaBox input').removeAttr("data-code");
                $(e.$element.selector).find('.Cjj-ProvinceCityAreaBox input').removeAttr("data-type");
                for(var i=0;i<e.options.label.length;i++){
                    if($(e.$element.selector+" .Cjj-ProvinceCityAreaTitle li").eq(i).hasClass("Cjj-lableColor")){
                        e.citySort(e,$(e.$element.selector+" .Cjj-ProvinceCityAreaTitle li").eq(i).html());
                    }
                }
            });
        },
        cityAreaSort:function(e,html,code,type){
            $(e.$element.selector).find('.Cjj-ProvinceCityAreaBox input').val(html);
            $(e.$element.selector).find('.Cjj-ProvinceCityAreaBox input').attr("data-code",code);
            $(e.$element.selector).find('.Cjj-ProvinceCityAreaBox input').attr("data-type",type);
            $(e.$element.selector+" .Cjj-ProvinceCityAreaBox .Cjj-ProvinceCityArea").remove();
        } 

  }
  $.fn.cjjProvince = function(options){
         var cjj = new cjjProvince(this,options);
         return cjj.start();
  }
})(jQuery, window, document);