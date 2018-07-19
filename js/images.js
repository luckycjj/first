(function($){  
            $.fn.extend({  
                aiiUpload:function(obj)  
                {  
                    if(typeof obj !="object")  
                    {  
                        alert('参数错误');  
                        return;  
                    }  
                    var imageWidth,imageHeight;  
                    var base64;  
                    var file_num=0;  
                    var fileInput=$(this);  
                    var fileInputId=fileInput.attr('id');  
                    var randID = Math.floor(Math.random()*1000); //随机ID  
                    createDoc('#'+fileInputId,obj.method,obj.action,obj.subText,randID,obj.formIdName);  
                    $('#h5u_file_'+ randID).change(function(){  
                        if(test(this.value)==false)  
                        {  
                            alert('格式错误');  
                            return;  
                        }  
                        var objUrl = getObjectURL(this.files[0]);  
                        if (objUrl)   
                        {  
                            //imgBefore(objUrl,file_num);  
                            render(objUrl,obj.max_w,obj.max_h,file_num,randID,obj.action);  
                            file_num++;  
                        }  
                    });  
                }  
            });  
            //创建form表单  
            function createDoc(objID,form_method,form_action,sub_txt,rand_id,form_id_name)  
            {                  
                var element=$(objID);  
                //element.append('<ul class="viewList"></ul>').append('<div class="fileBox"><input type="file"  id="aii_file" /><div class="file_bg"></div></div>').append('<form id="aii_upload_form" method="'+form_method+'" action="'+form_action+'"></form>').append('<canvas id="canvas"></canvas>');  
                var str = '<div class="upbox">'+
                               '<canvas id="canvas_'+ rand_id +'" style="display:none;"></canvas>'+
                               '<div class="options hide" id="h5u_options_'+ rand_id +'"></div>'+
                               '<img src="" id="h5u_preview_'+ rand_id +'"/>'+
                               '<div class="js-upbtn" id="h5u_upbtn_'+ rand_id +'">'+
                                  '<a href="javascript:;" class="h5u_file">'+
                                     '<input type="file" class="up_file3" id="h5u_file_'+ rand_id +'" accept="image/*">'+
                                  '</a>'+
                               '</div>'+
                               '<input type="hidden" name="'+ form_id_name +'" id="h5u_form_hidden_'+ rand_id +'" >'+
                           '</div>';  
                element.append(str);  
                $(".upbox").css({"width":"100px","height":"100px","position":"relative","background":"red"});
                $(".upbox input").css({"width":"auto","height":"auto","opacity":"0","position":"absolute","left":"0","right":"0","top":"0","bottom":"0"});
                $(".upbox img").css({"width":"100%","height":"100%"});
            }  
            //检查文件类是否是图片格式  
            function test(value)  
            {  
                var regexp=new RegExp("(.JPEG|.jpeg|.JPG|.jpg|.GIF|.gif|.BMP|.bmp|.PNG|.png)$",'g');  
                return regexp.test(value);  
            }  
            function render(src,MaximgW,MaximgH,idnum,rand_id,action)  
            {                   
                var image=new Image();  
                image.onload=function()  
                {  
                    //如果图片的尺寸小于定义的最大宽和高，则以图片原始尺寸为准  
                    var canvas=document.getElementById('canvas_'+ rand_id);  
                    var previewIMG = document.getElementById('h5u_preview_'+ rand_id);                     
                    //预览图片                      
                    previewIMG.src = src;  
                      
                    if(image.width < MaximgW && image.height < MaximgH){  
                        imageWidth = image.width;  
                        imageHeight = image.height;  
                    }else{  
                        if(image.width>image.height)  
                        {  
                            imageWidth=MaximgW;  
                            imageHeight=MaximgW*(image.height/image.width);  
                        }  
                        else if(image.width<image.height)  
                        {  
                            imageHeight=MaximgH;  
                            imageWidth=MaximgH*(image.width/image.height);  
                        }  
                        else  
                        {  
                            imageWidth=MaximgW;  
                            imageHeight=MaximgH;  
                        }  
                    }                      
                     
                    canvas.width=imageWidth;  
                    canvas.height=imageHeight;  
                    var con=canvas.getContext('2d');  
                    con.clearRect(0,0,canvas.width,canvas.height);  
                    con.drawImage(image,0,0,imageWidth,imageHeight);  
                    base64=canvas.toDataURL('image/jpeg',0.5).substr(22);  
                    //add_doc(base64,idnum);  
                    //上传图片  
                    upload_base(base64,action,rand_id);  
                }  
                image.src=src;                  
            };  
            //建立一個可存取到該file的url  
            function getObjectURL(file) {  
                var url = null ;   
                if (window.createObjectURL!=undefined) { // basic  
                    url = window.createObjectURL(file) ;  
                } else if (window.URL!=undefined) { // mozilla(firefox)  
                    url = window.URL.createObjectURL(file) ;  
                } else if (window.webkitURL!=undefined) { // webkit or chrome  
                    url = window.webkitURL.createObjectURL(file) ;  
                }  
                return url ;   
            }  
            //预览  
            function imgBefore(objUrl,idnum)   
            {  
                var li='<li class="view"><img src="'+objUrl+'" id="aiiImg_'+idnum+'" idnum="'+idnum+'" /><div class="close" onclick="img_remove(this);"></div></li>'  
                $('.viewList').append(li);  
                var img=$('#aiiImg_'+idnum);  
                //预览图片居中 填满 代码  
                //console.log('asdfasdfasdf');  
  
                img.load(function(){  
                    var imgw=img.width(),  
                        imgh=img.height();  
                        console.log(imgw);  
                        console.log(imgh);  
                    if(imgw>imgh)  
                    {  
                        img.css('height','100%');  
                        img.css('width','auto');  
                        img.css('marginLeft',-(img.width()-img.height())/2+'px');  
                    }  
                    else if(imgw<imgh)  
                    {  
                        img.css('width','100%');  
                        img.css('height','auto');  
                        img.css('marginTop',-(img.height()-img.width())/2+'px');  
                    }  
                });  
            }  
            //上传图片  
            function upload_base(base,action,rand_id){  
                //隐藏上传控件按钮  
                 
                $.post(action,{image:base},function(json){  
                    console.log(json);  
                    if(json.status == 1){  
                    }else{  
                    }  
                },'json');  
            }  
            function add_doc (base,idnum)  
            {  
                $('#aii_upload_form').append('<input type="hidden" name="img[]" id="f_'+idnum+'" value="'+base+'"/>');  
            }  
        })(jQuery);  
  
    