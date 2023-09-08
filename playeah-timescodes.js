String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};
$( document ).ready(function() {

    
    const inject_smarttext_css= function(){
        
        var f = document.getElementsByTagName("script")[0];

           var j3 = document.createElement("link");
           j3.rel = "stylesheet";
           j3.href = "https://assets.superpowerups.com/smart-text.css";
           f.parentNode.insertBefore(j3, f);
   }     
    
    // Course player
    if(typeof(CoursePlayerV2) !== 'undefined') {
      var w_video = null;      
      CoursePlayerV2.on('hooks:contentDidChange', function(data) {
        //console.log(data)
        //console.log("checking for timecodes");
        // need to delay for text part of video lesson
        setTimeout(function(){
            window._wq = window._wq || [];
            _wq.push({ id: "_all", onReady: function(video) {
              //console.log("Got Wistia handle", video);
               w_video = video;
            }});            
            //console.log($(".fr-view u"));
            $(".fr-view u").each(function(){
               var timecode_text = $(this).text();
               timecode_text = timecode_text.trim();
               console.log(timecode_text);
               if(timecode_text.search(/^(0?[0-9]|[0-9]):[0-5][0-9]:[0-5][0-9]$/)!=-1){
                   console.log("matched hh:mm:ss");
                   $(this).html("<chapter data-timecode='"+timecode_text+"'>"+timecode_text+"</chapter>")
               } else {
                 if(timecode_text.search(/^(0?[0-9]|[0-9]):[0-5][0-9]$/)!=-1){
                     console.log("matched mm:ss");
                     $(this).html("<chapter data-timecode='"+timecode_text+"'>"+timecode_text+"</chapter>")

                 }
                 if(timecode_text.search(/[0-5][0-9]:[0-5][0-9]$/)!=-1){
                     console.log("matched mm:ss");
                     $(this).html("<chapter data-timecode='"+timecode_text+"'>"+timecode_text+"</chapter>")

                 }              
                 
               }              
               
            });
                  
            $("chapter").click(function(){
               //get timecode
               var timecode = $(this).data("timecode");
               //console.log(timecode);
               var times = timecode.split(":");
               var seconds = 0;
               //convert to seconds               
               if(times.length==2){
                   //mm:ss
                   seconds = (parseInt(times[0])*60)+parseInt(times[1])
               }
               if(times.length==3){
                   //hh:mm:ss
                    seconds = (parseInt(times[0])*60*60)+(parseInt(times[1])*60)+parseInt(times[2])
               }
               console.log(seconds);
                //console.log(current_src);
                //console.log(new_src)
               // replace ifrme 
                if($("#content-inner iframe").length==0){
                    // wistia
                    if(w_video != null){
                      w_video.time(seconds);
                    }
                } else {
                    // proxy
                  var current_src = $("#content-inner iframe").attr("src");
                  var new_src = current_src.replace("time=","timereplaced=") + "&time=" + seconds;
                                  
                  $("#content-inner iframe").attr("src",new_src);
                }              
               
               $("#content-inner").scrollTop(0);
            });
            
            
        }, 500)        
        
        
      });
      inject_smarttext_css();
    } else {
        // not course player
        
    }

    
});  //comment 9/8
