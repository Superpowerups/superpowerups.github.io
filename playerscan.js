$(document).ready(function () {
    const storageKey = "kapow-playerscan";
    var firstlessondata = {};
    var currentlessondata = {};
    var results = [];
    var progressModal;
    var auto_advance = false; 
    var autoScanCtr = 0;
    var autoScanCompleted = false;
    var autoScanNumberofLessons = 0;
    var scans = [
      {
        "name":"Auto Scan (All Lessons)",
        "description":"We will automatically scan all of your lessons and indicate if there are any possible trouble spots. ",
        "id": "welcome-autoscan",
        "draft": false,
        "is_auto": true,
        "is_self_assess": false,
        "type": "welcome"
      },    
      {
        "name":"Guided Assessments",
        "description":"This set of scans contains quick guided guided assessments across a vareity of topics to help create a great course experience.",
        "id": "welcome-selfassess",
        "draft": false,
        "is_auto": true,
        "is_self_assess": false,
        "type": "welcome"
      }, 
      {
        "name":"XP Boosters",
        "description":"In this scan we will explore applications and tools to help you boost your course experience",
        "id": "welcome-apps",
        "draft": false,
        "is_auto": true,
        "is_self_assess": false,
        "type": "welcome"
      },     
      {
        "name":"Course Scan",
        "description":"In this set of scans I will best practices across many topics to help you create a killer course experience. ",
        "id": "welcome-course",
        "draft": false,
        "is_auto": false,
        "is_self_assess": false,
        "type": "welcome"
      },
      {
        "name":"Scan This Lesson",
        "description":"Each lesson type has it's own set of scans. Choose this to analyze the current lesson.",
        "id": "welcome-lesson",
        "draft": false,
        "is_auto": false,
        "is_self_assess": false,
        "type": "welcome"
      },
      
      {
        "name":"Course Audience",
        "description":"In this scan we will see if you are targeting the 'perfect' audience to take your course",
        "id": "course-audience",
        "draft": false,
        "is_auto": false,
        "is_self_assess": true,
        "type": "course"
      },
      {
        "name":"Course Onboarding",
        "description":"In this scan we see if you are setting your students up for success",
        "id": "course-onboarding",
        "draft": false,
        "is_auto": false,
        "is_self_assess": true,
        "type": "course"
      },    
      {
        "name":"Curriculum Structure",
        "description":"In this scan we will look at how your curriculum looks and let you know if we see any danger signs.",
        "id": "course-chapters-lessons",
        "draft": false,
        "is_auto": true,
        "is_self_assess": false,
        "type": "course"
      },
      {
        "name":"Free Preview",
        "description":"In this scan we will discuss the free preview feature and how to increase your conversions",
        "id": "course-freepreview",
        "draft": false,
        "is_auto": false,
        "is_self_assess": true,
        "type": "course"
      },
      {
        "name":"Blocking Progress",
        "description":"In this scan you we will look at drips and pre-requisite features and it's impact on progress",
        "id": "course-drip",
        "draft": false,
        "is_auto": false,
        "is_self_assess": true,
        "type": "course"
      },
      {
        "name":"Course Settings",
        "description":"In this scan we will take a look at some of the course settings that you may want to enable",
        "id": "course-settings",
        "draft": false,
        "is_auto": false,
        "is_self_assess": true,
        "type": "course"
      },
      {
        "name":"Course Experience",
        "description":"In this scan we will discuss how you can make your course more engaging and less boring",
        "id": "course-xp",
        "draft": true,
        "is_auto": false,
        "is_self_assess": true,
        "type": "course"
      },  
      {
        "name":"Cross & Upsells",
        "description":"In this scan we will take a look at how you can increase your sales to other products you have",
        "id": "course-upsells",
        "draft": true,
        "is_auto": false,
        "is_self_assess": true,
        "type": "course"
      },  
      {
        "name":"Community",
        "description":"In this scan we will review your use of community in your course experience and sales",
        "id": "course-community",
        "draft": true,
        "is_auto": false,
        "is_self_assess": true,
        "type": "course"
      },    
      
      {
        "name":"Course Emails",
        "description":"In this scan we will take a look at how you are using email automation to increase course engagement",
        "id": "course-email",
        "draft": true,
        "is_auto": false,
        "is_self_assess": true,
        "type": "course"
      },  
      {
        "name":"Content Length",
        "description":"In this scan we will look at how long your content is and give you some pro tips breaking up long content",
        "id": "text-length",
        "draft": false,
        "is_auto": true,
        "is_self_assess": false,
        "type": "text"
      },
      {
        "name":"Elements & Structure",
        "description":"In this scan we will make sure you are using the perfect mix of structure elements to make your lesson more engaging",
        "id": "text-elements",
        "draft": false,
        "is_auto": true,
        "is_self_assess": false,
        "type": "text"
      },  
      {
        "name":"Style & Design",
        "description":"In this scan we will see if you are using elements to style your lesson and make it more visually appealing",
        "id": "text-style",
        "draft": false,
        "is_auto": true,
        "is_self_assess": false,
        "type": "text"
      },    
     
      {
        "name":"Video Length",
        "description":"In this scan we will look at how long your video is and give you some pro tips on dealing with various lengths of video.",
        "id": "video-length",
        "draft": false,
        "is_auto": true,
        "is_self_assess": false,
        "type": "video"
      },     
      {
        "name":"Video Content",
        "description":"In this scan I want to discuss different types of video content and help you achieve the best engagement.",
        "id": "video-content",
        "draft": false,
        "is_auto": false,
        "is_self_assess": true,
        "type": "video"
      },
      {
        "name":"Video Options",
        "description":"In this scan we will explore using the built in settings for videos and see if you are using them the best way possible.",
        "id": "video-options",
        "draft": false,
        "is_auto": false,
        "is_self_assess": true,
        "type": "video"
      }, 
      {
        "name":"Video Extra's",
        "description":"In this scan we will explore extra content you can include with your video lessons to see if you are set up for success.",
        "id": "video-extras",
        "draft": false,
        "is_auto": true,
        "is_self_assess": false,
        "type": "video"
      }, 
      {
        "name":"Download Extra's",
        "description":"In this scan we will take a look at the text area that you can use to describe the download details",
        "id": "download-extras",
        "draft": false,
        "is_auto": true,
        "is_self_assess": false,
        "type": "download"
      },    
      {
        "name":"Download Files Names & Extensions",
        "description":"In this scan we will take a look at how you are naming your files and the types of files you are using",
        "id": "download-files",
        "draft": false,
        "is_auto": false,
        "is_self_assess": true,
        "type": "download"
      },   
      {
        "name":"Resource Library",
        "description":"In this scan we will talk about how to organize an entire resource library of many downloads and alternative ways to do this",
        "id": "download-resources",
        "draft": false,
        "is_auto": false,
        "is_self_assess": true,
        "type": "download"
      },  
      {
        "name":"Presentation Size",
        "description":"In this scan we will examine the size of your presentation to make sure you are not overwhelming your students",
        "id": "presentation-size",
        "draft": false,
        "is_auto": true,
        "is_self_assess": false,
        "type": "presentation"
      },   
      {
        "name":"Content and Design",
        "description":"In this scan we discuss best practices in presentation design and also some tools that will help you look like a pro designer",
        "id": "presentation-design",
        "draft": false,
        "is_auto": false,
        "is_self_assess": true,
        "type": "presentation"
      },     
      {
        "name":"Using Audio",
        "description":"In this scan we will examine if you are using audio along with your slides and review best practices for audio quality",
        "id": "presentation-audio",
        "draft": false,
        "is_auto": true,
        "is_self_assess": false,
        "type": "presentation"
      },    
      {
        "name":"Presentation Settings",
        "description":"In this scan we look at using settings like requiring your students to view all slides in order to mark the lesson complete",
        "id": "presentation-settings",
        "draft": false,
        "is_auto": false,
        "is_self_assess": true,
        "type": "presentation"
      }, 
      {
        "name":"Audio Length ",
        "description":"In this scan we if your audio lesson is hitting the 'sweet spot' when it comes to length",
        "id": "audio-length",
        "draft": false,
        "is_auto": false,
        "is_self_assess": true,
        "type": "audio"
      }, 
  
  
      {
        "name":"Audio Extra's",
        "description":"In this scan we will take a look at the text area that you can use to describe the audio details",
        "id": "audio-extras",
        "draft": false,
        "is_auto": true,
        "is_self_assess": false,
        "type": "audio"
      }, 
      {
        "name":"Audio Alternatives",
        "description":"In this scan we discuss other ways that you can present your audio in more engaging ways",
        "id": "audio-alternatives",
        "draft": false,
        "is_auto": false,
        "is_self_assess": true,
        "type": "audio"
      },     
      {
        "name":"Quiz Length",
        "description":"In this scan we examine how many and the type of questions you are asking in the quiz",
        "id": "quiz-length",
        "draft": false,
        "is_auto": true,
        "is_self_assess": false,
        "type": "quiz"
      },  
      {
        "name":"Quiz Settings",
        "description":"In this scan we see if you are using the quiz settings effectively",
        "id": "quiz-settings",
        "draft": false,
        "is_auto": false,
        "is_self_assess": true,
        "type": "quiz"
      },
      
      {
        "name":"Survey Length",
        "description":"In this scan we examine how many questions you are asking in the survey",
        "id": "survey-length",
        "draft": false,
        "is_auto": true,
        "is_self_assess": false,
        "type": "survey"
      },  
      {
        "name":"Survey Approach",
        "description":"In this scan we examine how you are using survey lessons in general",
        "id": "survey-settings",
        "draft": false,
        "is_auto": true,
        "is_self_assess": false,
        "type": "survey"
      },      
      {
        "name":"Survey Alternatives",
        "description":"In this scan we will discuss alternative survey tools and methods for collecting feedback",
        "id": "survey-alternatives",
        "draft": false,
        "is_auto": false,
        "is_self_assess": true,
        "type": "survey"
      },  
      {
        "name":"Content, Style and Design",
        "description":"In this scan we will examine how your PDF looks and discuss what you are including inside the PDF",
        "id": "pdf-style",
        "draft": false,
        "is_auto": false,
        "is_self_assess": true,
        "type": "pdf"
      },  
      {
        "name":"PDF Creation Tools",
        "description":"In this scan we will explore different tools to use for creating PDF's",
        "id": "pdf-tools",
        "draft": false,
        "is_auto": false,
        "is_self_assess": true,
        "type": "pdf"
      },    
      {
        "name":"Best Uses",
        "description":"In this scan we will discuss our favorite ways to use the multimedia lesson type",
        "id": "media-bestpractices",
        "draft": false,
        "is_auto": false,
        "is_self_assess": true,
        "type": "media"
      },   
      {
        "name":"Progress Impact",
        "description":"In this scan we will discuss how course progress is impacted from the use of Multimedia lessons",
        "id": "media-progress",
        "draft": false,
        "is_auto": false,
        "is_self_assess": true,
        "type": "media"
      },      
      {
        "name":"Best Practices",
        "description":"In this scan we will discuss best practices when it comes to assignment lesson types",
        "id": "assignment-bestpractices",
        "draft": false,
        "is_auto": false,
        "is_self_assess": true,
        "type": "assignment"
      },    
      {
        "name":"Assignment Description",
        "description":"In this scan we will exmaing your used of the description setting of your assignment lesson",
        "id": "assignment-extras",
        "draft": false,
        "is_auto": true,
        "is_self_assess": false,
        "type": "assignment"
      },    
  
      
    ]  
    //console.log(scans.length);
    
    const icon_alert_info = '<i class="fa-regular fa-circle-info"></i>';
    const icon_alert_success = '<i class="fa-regular fa-badge-check"></i>';
    const icon_alert_warning = '<i class="fa-regular fa-circle-exclamation"></i>';
    const icon_alert_danger = '<i class="fa-solid fa-triangle-exclamation"></i>';
    const inject_css = function () {
      var f = document.getElementsByTagName("script")[0];
      var playerbs_css = document.createElement("link");
      playerbs_css.rel = "stylesheet";
      playerbs_css.href =
        "https://cdn.jsdelivr.net/gh/robgalvinco/player-snippets@v1.0.28/css/kapow-playerbs.css";
      f.parentNode.insertBefore(playerbs_css, f);
  
      var snipps_css = document.createElement("link");
      snipps_css.rel = "stylesheet";
      snipps_css.href = "https://assets.superpowerups.com/playersnips.css";
      snipps_css.href =
        "https://cdn.jsdelivr.net/gh/robgalvinco/player-snippets@v1.0.32/css/text.css";
      f.parentNode.insertBefore(snipps_css, f);
  
      var animate_css = document.createElement("link");
      animate_css.rel = "stylesheet";
      animate_css.href =
        "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
      f.parentNode.insertBefore(animate_css, f);
    };
  
    const inject_confetijs = function () {
      var f = document.getElementsByTagName("script")[0],
        j = document.createElement("script");
      j.async = true;
      j.src = "https://assets.superpowerups.com/player-confetti-cannon.js";
      j.src =
        "https://cdn.jsdelivr.net/gh/robgalvinco/player-snippets@v1.0.28/js/player-confetti-cannon.js";
      f.parentNode.insertBefore(j, f);
    };
    const inject_fap = function () {
      var f = document.getElementsByTagName("script")[0];
      var playerbs_css = document.createElement("link");
      playerbs_css.rel = "stylesheet";
      playerbs_css.href =
        "https://cdn.jsdelivr.net/gh/robgalvinco/player-snippets@1.0.25/fap/css/all.min.css";
      f.parentNode.insertBefore(playerbs_css, f);
    };
    const inject_bsjs = function () {
      var f = document.getElementsByTagName("script")[0],
        j = document.createElement("script");
      j.async = true;
      j.src =
        "https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js";
      f.parentNode.insertBefore(j, f);
    };
    const inject_tallyjs = function () {
      var f = document.getElementsByTagName("script")[0],
        j = document.createElement("script");
      j.async = true;
      j.src =
        "https://tally.so/widgets/embed.js";
      f.parentNode.insertBefore(j, f);
    };  
    const inject_typeform = function () {
      var f = document.getElementsByTagName("script")[0],
        j = document.createElement("script");
      j.async = true;
      j.src = "https://embed.typeform.com/next/embed.js";
      f.parentNode.insertBefore(j, f);
      j2 = document.createElement("script");
      j2.async = true;
      j2.src =
        "https://cdn.jsdelivr.net/gh/robgalvinco/player-snippets@v1.0.28/js/playersnips-typeform.js";
      f.parentNode.insertBefore(j2, f);
      var _css_popup = document.createElement("link");
      _css_popup.rel = "stylesheet";
      _css_popup.href = "https://embed.typeform.com/next/css/popup.css";
      f.parentNode.insertBefore(_css_popup, f);
      var _css_slider = document.createElement("link");
      _css_slider.rel = "stylesheet";
      _css_slider.href = "https://embed.typeform.com/next/css/slider.css";
      f.parentNode.insertBefore(_css_slider, f);
      var _css_sidetab = document.createElement("link");
      _css_sidetab.rel = "stylesheet";
      _css_sidetab.href = "https://embed.typeform.com/next/css/sidetab.css";
      f.parentNode.insertBefore(_css_sidetab, f);
      var _css_popover = document.createElement("link");
      _css_popover.rel = "stylesheet";
      _css_popover.href = "https://embed.typeform.com/next/css/popover.css";
      f.parentNode.insertBefore(_css_popover, f);
    };
    const inject_lottie = function () {
      var f = document.getElementsByTagName("script")[0],
        j = document.createElement("script");
      j.async = true;
      j.src =
        "https://unpkg.com/@lottiefiles/lottie-player@1.6.0/dist/lottie-player.js";
      f.parentNode.insertBefore(j, f);
  
      j1 = document.createElement("script");
      j1.async = true;
      j1.src =
        "https://unpkg.com/@lottiefiles/lottie-interactivity@1.6.0/dist/lottie-interactivity.min.js";
      f.parentNode.insertBefore(j1, f);
  
      j2 = document.createElement("script");
      j2.async = true;
      j2.src =
        "https://cdn.jsdelivr.net/gh/robgalvinco/player-snippets@v1.0.28/js/playersnips-lottie.js";
      f.parentNode.insertBefore(j2, f);
    };
  
    const inject_sound = function () {
      var f = document.getElementsByTagName("script")[0],
        j = document.createElement("script");
      j.async = true;
      j.src = "https://assets.superpowerups.com/playersnips-sounds.js";
      j.src =
        "https://cdn.jsdelivr.net/gh/robgalvinco/player-snippets@v1.0.28/js/playersnips-sound.js";
  
      f.parentNode.insertBefore(j, f);
    };
  
    const inject_pspops = function () {
      var f = document.getElementsByTagName("script")[0],
        j = document.createElement("script");
      j.async = true;
      j.src = "https://assets.superpowerups.com/playersnips-popups.js";
      j.src =
        "https://cdn.jsdelivr.net/gh/robgalvinco/player-snippets@v1.0.36/js/playersnips-popups.js";
      f.parentNode.insertBefore(j, f);
    };
  
    const inject_psevents = function () {
      var f = document.getElementsByTagName("script")[0],
        j = document.createElement("script");
      j.async = true;
      j.src = "https://assets.superpowerups.com/playersnips-events.js";
      j.src =
        "https://cdn.jsdelivr.net/gh/robgalvinco/player-snippets@v1.0.30/js/playersnips-events.js";
      f.parentNode.insertBefore(j, f);
    };
  
    
    const inject_offcanvas_wrap = function(){
      var html = '<style>.take .kapow-player .progress-bar {background-color: #ff0089;}.scanResults a{color:#000000;font-weight:700;}.btn-back-to-welcome{display:none;}@-webkit-keyframes blinker {from {opacity: 1.0;}to {opacity: 0.0;}}.blink{text-decoration: blink;-webkit-animation-name: blinker;-webkit-animation-duration: 0.6s;-webkit-animation-iteration-count:infinite;-webkit-animation-timing-function:ease-in-out;-webkit-animation-direction: alternate;}.kapow-scan-status .badge{margin-right:3px;}#playerScan .text-primary,.playerScan .primary{color:#ff0089 !important;}.playerScan .btn-primary,#playerScan .btn-primary {color: #fff !important;background-color: #FF0089  !important;border-color: #FF0089  !important;}#playerScan .btn-primary:hover,.playerScan .btn-primary:hover {opacity:0.8;color: #fff !important;background-color: #FF0089  !important;border-color: #FF0089  !important;}</style><div class=""><div class="offcanvas offcanvas-end show kapow-player text-bg-light shadow" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="playerScan" >';
          html +='  <div class="offcanvas-header">';
          
      
          html +='    <h5 class="offcanvas-title heading d-flex" id="offcanvasRightLabel">';
          html +='<img src="https://import.cdn.thinkific.com/482002/courses/2209231/ScanLogo-230307-111047.png" style="max-height:32px">';
  
          //html +='<span  class="btn btn-light btn-restart" > <i class="fa-solid fa-rotate"></i></span>'
          /*
          html +='<div class="dropdown">'
          html +='  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">'
          html +='    <i class="fa-solid fa-bars"></i>'
          html +='  </button>'
          html +='  <ul class="dropdown-menu">'
          html +='    <li><span  class="btn btn-light btn-restart" > <i class="fa-solid fa-rotate"></i></span> Scan Course</li>'
          html +='  </ul>'
          html +='</div>  '
          */
          html +=' <span class="ps-1"> Scan - PowerUp by Rob Galvin</span></h5>';
          html +='    <button type="button" class="btn-close" aria-label="Close"></button>';
          html +='  </div><hr class="mt-0"/>';
          html +='  <div class="offcanvas-body ">';
          html +='    <div class="btn-back-to-welcome"><div class="d-flex justify-content-between mb-2">';
          html +='      <div><button class="btn btn-primary "><i class="fa-solid fa-arrow-left"></i> Back</button></div>';
          // html +='<div><button class="btn btn-primary btn-nextOnScanList" data-type="'+type+'">Next Scan<i class="fa-solid fa-arrow-right"></i></button></div>';
          html += '    </div></div>'    
          html += '  <div class="content"></div>'
      
          html +='  </div>';
          html +='</div></div>';
          html +='<div class="kapow-player playerScan">'
           html +='<div class="modal fade" id="scanProgressModal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">';
           html +='  <div class="modal-dialog">';
           html +='    <div class="modal-content">';
           html +='      <div class="modal-header">';
           html +='        <h1 class="modal-title fs-5" id="exampleModalLabel"><span class="badge text-bg-dark blink"><i class="fa-solid fa-barcode-read"></i> Scan In Progress</span></h1>';
           html +='      </div>';
           html +='      <div class="modal-body">';
          html +='<p>We are looking at each of your lessons and running different scans for each lesson type. You can stop the auto scan at any time and pick up where it left off. Results will be available for any lesson that was scanned. Click the lesson to see the scan results.</p>'
            html+='<div class="progress" role="progressbar" >';
            html+='  <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 0%"></div>';
            html+='</div>      ';
  
          html +="        <span class='kapow-player lesson_auto_scan_status'><span class='info'></span><span class='up-next-scan'></span></span>";
           html +='      </div>';
           html +='      <div class="modal-footer">';
           html +='        <button type="button" class="btn btn-primary btn-stopAutoScan" data-bs-dismiss="modal">Stop Auto Scan <i class="fa-solid fa-barcode-scan"></i> </button>';
           html +='      </div>';
           html +='    </div>';
           html +='  </div>';
           html +='</div>    ';
                  html +='</div>'
      $("#wrap").append(html);
      
      //$(".course-player__content-header__actions").prepend('<i class="fa-solid fa-barcode-scan playerScanToggle" data-bs-toggle="offcanvas" data-bs-target="#playerScan"></i>');
    
      html = '<div class="kapow-player playerScan ">';
      html +='<hr/>';   
      html +='<img src="https://import.cdn.thinkific.com/482002/courses/2209231/scanactivated-230307-105653.png">';
      html +='<p>Click the button below to get expert analysis of your course or choose a lesson to get detailed analysis of each lesson.</p>';
      html +='<button class="btn btn-primary btn-welcome scanmenu "  data-index="0" data-id="welcome-course" data-result="0"><i class="fa-solid fa-barcode-scan"></i> Scan</button>';
      html +='<button class="btn btn-danger btn-stopAutoScan d-none">Stop Auto Scan <i class="fa-solid fa-barcode-scan"></i> </button>';
      html +='<div class="form-check scanmenu">';
      html +='  <input class="form-check-input" type="checkbox" value="" id="autoScan" checked>';
      html +='  <label class="form-check-label" for="autoScan">';
      html +='    Automatically show lesson scans';
      html +='  </label>';
      html +='</div>      ';  
      html +='</div>    ';
     $(".course-progress__inner-container").append(html);
      
    }
    
    
    const generateTallyEmbed = function(scan){
      var tallyiframe = '<iframe data-tally-src="https://tally.so/embed/m6L76k?scanid='+scan.id+'&scantype='+scan.type+'&courseid='+currentlessondata.course.id+'&lessonid='+currentlessondata.lesson.id+'&domain='+currentlessondata.user.subdomain+'&email='+currentlessondata.user.email+'&alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1" loading="lazy" width="100%" height="337" frameborder="0" marginheight="0" marginwidth="0" title="null"></iframe>';    
      //console.log(tallyiframe);
      return tallyiframe
    }
    
    const generateLoomEmbed = function(loomid){
      
      var html = '<div class="my-3"><div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/'+loomid+'?t=0&hideEmbedTopBar=true&autoplay=false&mute=false" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div></div>';    
      if(loomid==""){
        html="";
      }
      return html;
    }
    
    const scrollListToTop = function(){
      $("#playerScan .offcanvas-body").scrollTop(0);;
    }
    const scanWelcome = function(){
      $('#playerScan').addClass("show");
      var firstimeever = true;
      var playerscans = {started:false,scans:0};
      
      if (typeof(Storage) !== "undefined") {
          // Code for localStorage
          if(window.localStorage.getItem(storageKey)!==null){
            playerscans = JSON.parse(window.localStorage.getItem(storageKey));
            //console.log("not first scan",playerscans);
            firstimeever = false;
          } else {
            window.localStorage.setItem(storageKey, JSON.stringify({started:true,scans:0}));          
            
          }
          
      } 
      var html = "";
      var num_text_lessons = $(".toga-icon-content-text").length;
      var num_video_lessons = $(".toga-icon-content-video").length;
      var num_audio_lessons = $(".toga-icon-content-audio").length;
      var num_quiz_lessons = $(".toga-icon-content-quiz").length;
      var num_survey_lessons = $(".toga-icon-content-survey").length;
      var num_pdf_lessons = $(".toga-icon-content-pdf").length;
      var num_download_lessons = $(".toga-icon-content-download").length;
      var num_presentation_lessons = $(".toga-icon-content-presentation").length;
      var num_multimedia_lessons = $(".toga-icon-content-multimedia").length;
      var num_assignment_lessons = $(".toga-icon-content-assignment").length;
      var total_lesson_types = num_text_lessons+num_video_lessons+num_audio_lessons+num_quiz_lessons+num_survey_lessons+num_pdf_lessons+num_download_lessons+num_presentation_lessons+num_multimedia_lessons+num_assignment_lessons;
      
      var startLoom = "42df427534a348ddbb032fb5566fd8d9";
      var mix = true;
      //console.log("total_lesson_types "+total_lesson_types+" num_text_lessons:"+num_text_lessons+" num_video_lessons:"+num_video_lessons)
      if(num_text_lessons>0 && num_text_lessons==total_lesson_types){
        // only text
        startLoom = "cf03272fcc064b5f99cd0ea69c1a33dd";
      }
      if(num_video_lessons>0 && num_video_lessons==total_lesson_types){
        // only video
        startLoom = "d8358b07fcaa42d08047c3174eae4a00";
      }  
      if(num_video_lessons>0 && num_text_lessons>0 && ((num_video_lessons+num_text_lessons)==total_lesson_types)){
        // only video & text
        startLoom = "1a2848c11c4c48b7a8575f232f89ea66";
      }    
      if(num_download_lessons>0 && num_download_lessons==total_lesson_types){
        // only download
      }    
      if(num_pdf_lessons>0 && num_pdf_lessons==total_lesson_types){
        // only PDF
      }    
      var downloadLink = "https://import.cdn.thinkific.com/482002/courses/2209231/ScanChecklist-230316-200516.pdf";
      var downloadHtml = "<br/><a href='"+downloadLink+"' target='_blank' style='text-decoration:none;font-weight:700;color:#FF0089;'><i class='fa-solid fa-file-arrow-down'></i> Download the Scan Checklist</a>"
      if(firstimeever){
        html += generate_scanlist("Welcome to Scan",startLoom,"Listen to the video above first before you get started to see how this will work."+downloadHtml,scans,"welcome")
      } else {
        var alert = "";
        if(playerscans.scans>5){
          // alert=generate_alert_html("🎉 Way to go!!!","You have used Scan "+playerscans.scans+" times and are on your way to an awesome course","alert-success");
        }
        html += generate_scanlist("Welcome Back to Scan",startLoom,alert+"Listen to the video above first before you get started to see how this will work."+downloadHtml,scans,"welcome")
      }
      $("#playerScan .content").html(html);
      scanListeners();    
    }
    
    const scanStart = function(data){
      //console.log("Lesson Data",data)    
      // check if first time ever or returning
      // kapow-playerscan
      firstlessondata = data;
      scanWelcome();
    }
    
    
    
    const generate_scanlist = function(heading, loom, summary, scans,type){
      var html ="";
      if(type=="self-assess"){
        html +="<style>.btn-back-to-welcome{display:block !important;}</style>"
      }
      if(type=="course" ){
        html +="<style>.btn-back-to-welcome{display:none !important;}</style>"
      }
          
      html +='<div class="scanInfo">';
      html +="<h3><span class='position-relative'>"+heading
      html +="</span></h3>"
      html +=generateLoomEmbed(loom);
      html +="<p>"+summary+"</p>";
      html += '</div>'
      html +='<p class="fw-lighter num-scans"></p>'
      html +='<div class="scanList">';
      html += generate_scanlist_items(scans,type);
      html += '</div>'
      html +='<div class="scanResults d-none">';
      html +='  <div class="d-flex justify-content-between mb-2 ">';
      html +='<div class="backToScanList"><button class="btn btn-primary btn-backToScanList" data-type="'+type+'"><i class="fa-solid fa-arrow-left"></i> Back</button></div>';
      // html +='<div><button class="btn btn-primary btn-nextOnScanList" data-type="'+type+'">Next Scan<i class="fa-solid fa-arrow-right"></i></button></div>';
      html += '  </div>'
      html +='  <div class="scanResultContent">';
      html +="<h3 class='scanHeading'></h3>"
      html +="<p class='scanSummary'></p>";
      html +="<div class='resultLoom' ></div>";
      html +="<div class='resultSummary' ></div>";
  
      html += '  </div>'
      html += '</div>'
      
      return html    
    }
    
    const getresults_for_lesson = function(lessonid,type){
      var lesson_results = {
        "success":0,
        "warning":0,
        "danger":0,
        "info":0
      }
      var num_items = 0;
      
      scans.forEach(function(item, index) {
        if (item.type==type){
          num_items +=1;
          var result = getResult(item.id,lessonid);
          //console.log("got result",result);
  
          if(result.status!=""){
            if(result.status=="success"){lesson_results.success+=1;}
            if(result.status=="warning"){lesson_results.warning+=1;}
            if(result.status=="danger"){lesson_results.danger+=1;}
            if(result.status=="info"){lesson_results.info+=1;}
          }
          
        }
      })
      
      if($("#playerScan .content").data("result-type")=="lesson" || auto_advance){
        // only show results if it was a lesson scan
        $('a[data-lesson-id='+lessonid+'] .kapow-scan-status .kapow-numscans').html('<span class="badge text-bg-dark"><i class="fa-solid fa-barcode-read"></i> '+num_items+'</span>');
        var results_html = "";
        if(lesson_results.success>0)results_html+='<span class="badge text-bg-success">'+icon_alert_success+' '+lesson_results.success+'</span>';
        if(lesson_results.warning>0)results_html+='<span class="badge text-bg-warning">'+icon_alert_warning+' '+lesson_results.warning+'</span>';
        if(lesson_results.danger>0)results_html+='<span class="badge text-bg-danger">'+icon_alert_danger+' '+lesson_results.danger+'</span>';
        if(lesson_results.info>0)results_html+='<span class="badge text-bg-info">'+icon_alert_info+' '+lesson_results.info+'</span>';
        $('a[data-lesson-id='+lessonid+'] .kapow-scan-status .kapow-results').html(results_html);
      }
      
    }
    
    
    const generate_linklist_items = function(links){
      // add number of scans to status
      var html = "";
      html +='<div class="accordion my-3" id="linkList">';
      links.forEach(function(item, index) {
          var result = getResult(item.id,currentlessondata.lesson.id);
          var extra_description = "";
          if(item.id=="welcome-autoscan"){
            var num_lessons =$('a.course-player__content-item__link').length;
            var time_per_lesson = 10;
            var total_time = parseInt((num_lessons*time_per_lesson)/60);
            if(total_time<1){
              extra_description = num_lessons*time_per_lesson + " seconds."
            } else {
              extra_description = total_time + " minutes."
            }
            extra_description = '<span class="text-muted ms-2"><i class="fa-light fa-clock"></i> '+extra_description+"</span>";
  
          }
          //console.log("got result",result);
          //console.log(item, index);
          html +='<div class="card shadow w-100 mb-3" >';
          html +='  <div class="row g-0">';
          html +='    <div class="col-12">';
          html +='      <div class="card-body">';
          html +='    <div class="row"><div class="col-2">';
          html +='    <img src="'+item.img+'"/>';
          html +='    </div>';
            
          html +='        <div class="col-10"><h5 class="card-title">'+item.heading+'</h5></div></div>';  
          html +='        <p class="card-text">'+item.description+'</p>';
          html +="        <div class='result-"+index+"'><a href='"+item.link+"' target='_blank' class='btn btn-primary ' >"+item.link_text+" <i class=\"fa-solid fa-arrow-right\"></i> </a></div>"
              
          html +='      </div>';
          html +='    </div>';
          html +='  </div>';
          html +='</div>    ';  
      });    
      html += '</div>';
      
      return html;
    }  
    
    const generate_scanlist_items = function(scans,type){
      // add number of scans to status
      var html = "";
      if(type=="self-assess"){
        html+="<style>.backToScanList{display:none;}</style>"
      }
      html +='<div class="accordion my-3" id="scanList">';
      var num_items = 0;
      var lesson_results = {
        "success":0,
        "warning":0,
        "danger":0,
        "info":0
      }
      scans.forEach(function(item, index) {
        var show = false;
        if(type=="self-assess" && item.is_self_assess){
          show=true
        } else {
          if (item.type==type)  {
            show=true
          }
        }
        if (show){
          num_items +=1;
          var result = getResult(item.id,currentlessondata.lesson.id);
          var extra_description = "";
          if(item.id=="welcome-autoscan"){
            var num_lessons =$('a.course-player__content-item__link').length;
            var time_per_lesson = 10;
            var total_time = parseInt((num_lessons*time_per_lesson)/60);
            if(total_time<1){
              extra_description = num_lessons*time_per_lesson + " seconds."
            } else {
              extra_description = total_time + " minutes."
            }
            extra_description = '<span class="text-muted ms-2"><i class="fa-light fa-clock"></i> '+extra_description+"</span>";
          }
          //console.log("got result",result);
          //console.log(item, index);
          html +='<div class="card shadow w-100 mb-3" >';
          html +='  <div class="row g-0">';
          html +='    <div class="col-12">';
          html +='      <div class="card-body">';
          if(result.status!=""){
            if(result.status=="success"){lesson_results.success+=1;}
            if(result.status=="warning"){lesson_results.warning+=1;}
            if(result.status=="danger"){lesson_results.danger+=1;}
            if(result.status=="info"){lesson_results.info+=1;}
            html +='        <h5 class="card-title '+result.class+' ">'+result.icon+' '+item.name+'</h5>';
            html +='<span class="badge text-bg-'+result.status+'">'+result.result_text+'</span>          ';
          }else{
          html +='        <h5 class="card-title">'+item.name+'</h5>';  
          }
          
          html +='        <p class="card-text">'+item.description+extra_description+'</p>';
          if(!item.draft){
            if(item.id=="welcome-autoscan" && autoScanCompleted){
                html +="        <div class='result-"+index+"'><button class='btn btn-primary btn-startScan' data-type='"+type+"'  data-index='"+index+"' data-id='"+item.id+"' data-result='"+index+"'>View Results <i class=\"fa-solid fa-arrow-right\"></i> </button></div>"
              
            } else {
              if(result.status!=""){
                html +="        <div class='result-"+index+"'><button class='btn btn-primary btn-startScan' data-type='"+type+"'  data-index='"+index+"' data-id='"+item.id+"' data-result='"+index+"'>View Results <i class=\"fa-solid fa-arrow-right\"></i> </button></div>"
  
              } else {
                html +="        <div class='result-"+index+"'><button class='btn btn-primary btn-startScan' data-type='"+type+"' data-index='"+index+"' data-id='"+item.id+"' data-result='"+index+"'>Run this scan <i class=\"fa-solid fa-arrow-right\"></i> </button></div>"
  
              }
              
            }
            
            
          } else {
          html +='        <p class="text-muted"><i>Coming soon.</i></p>';
            
          }
          html +='      </div>';
          html +='    </div>';
          html +='  </div>';
          html +='</div>    ';  
                
        }
  
      });    
      html += '</div>';
      if(num_items>0){            
        html = "<p class=\"fw-semibold\">Choose from one of the "+num_items+" scans below.</p>" + html
      }
      //console.log("Type:"+type);
      if(type!="self-assess" && type!="welcome"){
        /*
        $('a[data-lesson-id='+currentlessondata.lesson.id+'] .kapow-scan-status .kapow-numscans').html('<span class="badge text-bg-dark"><i class="fa-solid fa-barcode-read"></i> '+num_items+'</span>');
        var results_html = "";
        if(lesson_results.success>0)results_html+='<span class="badge text-bg-success">'+icon_alert_success+' '+lesson_results.success+'</span>';
        if(lesson_results.warning>0)results_html+='<span class="badge text-bg-warning">'+icon_alert_warning+' '+lesson_results.warning+'</span>';
        if(lesson_results.danger>0)results_html+='<span class="badge text-bg-danger">'+icon_alert_danger+' '+lesson_results.danger+'</span>';
        if(lesson_results.info>0)results_html+='<span class="badge text-bg-info">'+icon_alert_info+' '+lesson_results.info+'</span>';
        $('a[data-lesson-id='+currentlessondata.lesson.id+'] .kapow-scan-status .kapow-results').html(results_html);
        */
      }
      return html;
    }
    
    const generate_alert_html = function(heading, summary, type){
      var html = "";
      html +='<div class="alert '+type+'" role="alert">';
      html +='  <p"><b>'+heading+'</b><br/>'+summary+'</p>';
      //html +='  <p>'+summary+'</p>';
      html +='</div>    ';
      return html
    }
    
    const generate_checklist_items = function(items){
      var html = "";
      html +='<div class="accordion my-3" id="checklist">';
      items.forEach(function(item, index) {
          //console.log(item, index);
          html +='<div class="card shadow w-100 mb-3" >';
          html +='  <div class="row g-0">';
          html +='    <div class="col-12">';
          html +='      <div class="card-body">';
          html +='        <h6 class="card-title text-primary"><i class="fa-light fa-square-check"></i> '+item.heading+'</h6>';
          html +='        <p class="card-text">'+item.description+'</p>';
          html +='      </div>';
          html +='    </div>';
          html +='  </div>';
          html +='</div>    ';  
      });    
      html += '</div>';
      return html;
    }
      
    const getWordCount = function (str) {
       return str.split(' ')
         .filter(function(n) { return n != '' })
         .length;
    }
    
    const getResult = function(scanid,lessonid){
      //console.log("Checking Results",results);
      lessonid = lessonid.toString();
      //console.log(scanid);
      //console.log(lessonid);
      var found=false;
      var result = {
        "status":"",
        "result_text":"",
        "icon":"",
        "class":""
      };
      var result_text="";
      var result_icon = "";
      results.forEach(function(item,index){
        //console.log("result",item)
        if(item.scanid==scanid && item.id== lessonid){
          //console.log("Found it",item);
          found = true;
          status = results[index].status;
          result.status=status;
          if(status=="success"){
            result.result_text="Looks good!";
            result.icon = "<i class=\"fa-duotone fa-circle-check\"></i>";
            result.class="text-success";
          }
  
          if(status=="warning"){
            result.result_text="Has warnings";
            result.icon = "<i class=\"fa-duotone fa-triangle-exclamation\"></i>";
            result.class="text-warning ";
          }
          if(status=="danger"){
            result.result_text="Has major problems";
            result.icon = "<i class=\"fa-duotone fa-octagon-exclamation\"></i>";
            result.class="text-danger ";
          }
          if(status=="info"){
            result.result_text="Has pro tips";
            result.icon = "<i class=\"fa-duotone fa-circle-info\"></i>";
            result.class="text-info";
          }
  
          
          
        }
      })
      //console.log("did find? ",found);
      return result
    }
  
    const addResult = function(scanid,status){
      
      //console.log("adding results "+scanid+" status:"+status);
      var found=false;
      results.forEach(function(result,index){
        if(result.scanid===scanid && result.id=== currentlessondata.lesson.id){
          found = true;
          results[index].status=status;
        }
      })
      if(!found){
        results.push({scanid:scanid,id:currentlessondata.lesson.id, status:status, lesson:currentlessondata.lesson});
      }  
      //console.log("results",results)
    }
    
    /* start of scans */
    const coming_soon = function(){
      var html="";
      html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Coming Soon</strong></div>';
      html+='<p>This scan is not quite ready to be used. Be sure to check back later. We will send out an email alert and post to the SuperPowerUps Facebook group when we have new scans ready to use. When they are ready, they will just show up as being available for you to use.</p>'
      
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      }    
    }
    
    const scanvideo_length = function(){
      var duration_in_seconds = currentlessondata.lesson.meta_data.duration_in_seconds;
      var duration_in_minutes = duration_in_seconds/60;
      //console.log("duration_in_seconds:"+duration_in_seconds);
      var summary = "";
      var loom = "cb1b59175d87404da97faccadb2142d0";
      summary +=generateLoomEmbed(loom);
      if(duration_in_minutes <2){
        summary += generate_alert_html(icon_alert_warning+ " Hmm!","Looks like your video is quite short, we do like 'short and sweet' videos, but you may want to make this one a bit longer so that it communicates enough information", "alert-warning");
        addResult("video-length","warning");
      }
  
      if(duration_in_minutes >2 && duration_in_minutes <15){
        summary += generate_alert_html(icon_alert_success+" Your video length is looking great!","We all know that attention spans are getting shorter and shorter. Look for ways to communicate what you need to in the most efficient and timely way possible. Your students will thank you for not filling your course with fluff", "alert-success");
        addResult("video-length","success");
      }
  
      if(duration_in_minutes >15 && duration_in_minutes <31){
        summary += generate_alert_html(icon_alert_warning+ "Be Careful Here!","This video is at risk of not being watched fully because it requires a decent amount of time commitment. You may want to use our Timecodes PowerUp and create a nice summary of key points with a clickable timecode that will jump the video to that spot", "alert-warning");
        addResult("video-length","warning");
      }
  
      if(duration_in_minutes >31 ){
        summary += generate_alert_html(icon_alert_danger+ "Woah!","This video is pretty long. You may want to consider breaking it up into more digestable segments. Maybe into seperate lessons. ", "alert-warning. You may also want to use our Timecodes PowerUp and create a nice summary of key points with a clickabl timecode that will jump the video to that spot.", "alert-danger");
        addResult("video-length","danger");
      }
      
      if(summary!=""){
        $(".resultSummary").append(summary);
      } else {
        
      }
      
    }
    
  
      
    const scanvideo_content = function(){
      var html="";
      var loom = "fa05f93e260149098ad6235272b3e330";
      html +=generateLoomEmbed(loom);    
      html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      html+='<p>Watch the video above as we discuss some key elements to making engaging video content. We are unable to analyze your video from an automated way, so we will need you to do some self assessment.Key points from the video are summarized below.</p>'
      var checklist = [
        {
          "heading":'Are you mixing in video styles or just showing a talking head?',
          "description":'Even if you have the best camera and "Pro Quality" studio, your students may get tired of seeing the same visual throughout the entire video. Mix in some b-roll footage as you are talking and even consider showing a different camera angle. You can also mix in some imagery or animated graphic that emphasises the key points, just at the right time.'
        },
        {
          "heading":'Are you overlaying any text for key points?',
          "description":'If you are using a talking head style video, you should consider putting in text overlays as a lower-third animation to emphasis key points that are timed to show when you are discussing it.'
        },
        {
          "heading":'Are you assuming that your students know where they are?',
          "description":'Your student may be starting the video after a short or long break and may not recall what they just watched previously. Consider starting the video with a short summary "Ok we just did...". and then adding at the end add call to action about what they should now do as well as what is coming up next.'
        }
  
      ]    
      html+=generate_checklist_items(checklist);
      addResult("video-content","info");
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      } 
      addResult("video-content","info");
    }
    
    const scanvideo_extras = function(){
      var lesson = currentlessondata.lesson;
      var has_extra_text = false;
      var html = "";
      var loom = "2c7b158360344c508364c9792cb46732";
      html +=generateLoomEmbed(loom);
      if(typeof(lesson.html_text)!="undefined" && lesson.html_text!=""){
        has_extra_text = true;
      }
      
      if(has_extra_text){
        // check for blank
        var extra_text = $($.parseHTML(lesson.html_text)).text();
        if(extra_text==""){
        html += generate_alert_html(icon_alert_danger+" You are missing out..","Looks like you have not added some summary text below this video. It is highly recommended to put a short blurb and bullet points below the video so that your students can have more information about what is inside the video. This will increase watch time for the video", "alert-danger");
          addResult("video-extras","danger");
        } else {    
          var has_danger = false;
          var has_success = false;
          var has_warning = false;
          // html += generate_alert_html(icon_alert_success+" Summary Text Found","Looks like you have added some summary text below this video. It is highly recommended to put a short blurb and bullet points below the video so that your students can have more information about what is inside the video. This will increase watch time for the video", "alert-success");
  
          // TBD check for number of paragraphs and bullet list
          var _paragraphs = $($.parseHTML(lesson.html_text)).find("p");
          
          var _li = $($.parseHTML(lesson.html_text)).find("li");
          
          //console.log("Num p"+_paragraphs.length);
          
          var _words = getWordCount(extra_text);
          if(_words<15){
          html += generate_alert_html(icon_alert_warning+" Summary Text is a bit short","It looks like you only have "+_words+" words in your summary. You may want to provide a bit more detail so that it is worth reading.", "alert-warning");
            has_warning=true;
          } 
  
          if(_words>15 && _words<=90){
          html += generate_alert_html(icon_alert_success+" Summary Text Hit The Sweet Spot","It looks like you have found the perfect and consise way to summarize the video.", "alert-success");
            has_success = true;
          } 
          if(_words>90 ){
          html += generate_alert_html(icon_alert_danger+" Summary Text is a bit long","It looks like you have a lot of words ("+_words+") in your summary. You may want to trim it down to just a paragraph or two.", "alert-danger");
            has_danger = true;
          }         
          //console.log("Num li"+_li.length);
          if(_li.length==0){
          html += generate_alert_html(icon_alert_warning+" Summary List Not Found","Bullet lists are a great way too quickly see if the content is worth watching.You might want to consider using one along with a brief summary paragraph", "alert-warning");
            has_warning=true;
          } else {
          html += generate_alert_html(icon_alert_success+" Summary List Found","Nice job!! It looks like you have added a bullet list to help the student quickly see what is covered in the video.", "alert-success");
            has_success = true;
          }
          
          var _playersnips = $(".course-player__html-item").find(".kapow-player");
          if(_playersnips.length==0){
            html += generate_alert_html(icon_alert_warning+" Player Snips Not Found","It looks like you are not using our Player Snips Power Up that helps with making your lessons look amazing. <a href='http://playersnips.superpowerups.com/' target='_blank'> Learn more</a>", "alert-warning");
            has_warning=true;
          } else {
            html += generate_alert_html(icon_alert_success+" Player Snips Found","Nice job!! It looks like you are using our Player Snips for this lesson.", "alert-success");
            has_success = true;
          }
          
          if(has_danger){
            addResult("video-extras","danger");
          } 
          else {
            if(has_warning){
              addResult("video-extras","warning");
            } else{
              if(has_success) {
                addResult("video-extras","success");
              }
              
            }
          }
        }
      } else {
        html += generate_alert_html(icon_alert_danger+" You are missing out..","Looks like you have not added some summart text below this video. It is highly recommended to put a short blurb and bullet points below the video so that your students can have more information about what is inside the video. This will increase watch time for the video", "alert-danger");
        addResult("video-extras","danger");
      }
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      } 
    }
    
    const scantext_length = function(){
      var lesson = currentlessondata.lesson;
      var has_extra_text = false;
      var html = "";
      
      var loom = "bd02c0d1d90647a6be5701b30d42b173";
      html +=generateLoomEmbed(loom);
      
      if(typeof(lesson.html_text)!="undefined" && lesson.html_text!=""){
        has_extra_text = true;
      }
      
      if(has_extra_text){
        // check for blank
        var extra_text = $($.parseHTML(lesson.html_text)).text();
        if(extra_text==""){
        html += generate_alert_html(icon_alert_danger+" Could not find any text..","Looks like you have not added any text for this lesson", "alert-danger");
          addResult("text-length","danger");
        } else {    
          var has_danger = false;
          var has_warning = false;
          var has_success = false;
          // html += generate_alert_html(icon_alert_success+" Summary Text Found","Looks like you have added some summary text below this video. It is highly recommended to put a short blurb and bullet points below the video so that your students can have more information about what is inside the video. This will increase watch time for the video", "alert-success");
  
          // TBD check for number of paragraphs and bullet list
          var _paragraphs = $($.parseHTML(lesson.html_text)).find("p");
          var added_warning = false;
          _paragraphs.each(function(){
            var _words = getWordCount($(this).text());
            //console.log("words",_words);
            if(!added_warning && _words>0 && (_words <30 || _words>100)){
              html += generate_alert_html(icon_alert_warning+" Avg words per paragraph is not ideal","You have some paragraphs that do not have the ideal number of words (30-100). Although the length of each paragraph should be long enough to effectively convey the idea or topic, but not so long that it becomes difficult to follow or overwhelms the reader. ", "alert-warning");
              has_warning=true;
              added_warning = true;
              //console.log("added warning");
            }
          });
          var _li = $($.parseHTML(lesson.html_text)).find("li");
          
          //console.log("Num p"+_paragraphs.length);
          
          var _words = getWordCount(extra_text);
          if(_words<250){
          html += generate_alert_html(icon_alert_warning+" The number of words is a bit short","It looks like you only have "+_words+" words in your summary. You may want to provide a bit more detail so that it is worth reading. However, it's important to note that the word count is not as important as the quality and relevance of the content. The document should have a clear purpose, convey the intended message effectively, and be well-organized and structured to achieve the desired outcome.", "alert-warning");
            has_warning=true;
          } 
  
          if(_words>251 && _words<=1000){
          html += generate_alert_html(icon_alert_success+" You Hit The Sweet Spot","For text lessons we recommend a two-page document that would contain approximately 250-1000 words. However, it's important to note that the word count is not as important as the quality and relevance of the content. The document should have a clear purpose, convey the intended message effectively, and be well-organized and structured to achieve the desired outcome.", "alert-success");
            has_success = true;
          } 
          if(_words>1000 ){
          html += generate_alert_html(icon_alert_danger+" Your word count is a bit long","It looks like you have a lot of words ("+_words+") in your summary. You may want to trim it down to fit between 500-1000 words.", "alert-danger");
            has_danger = true;
          }         
  
          
          if(has_danger){
            addResult("text-length","danger");
          } 
          else {
            if(has_warning){
              addResult("text-length","warning");
            } else {
              if(has_success) {
                addResult("text-length","success");
              }
              
            }
            
          }
        }
      } else {
        html += generate_alert_html(icon_alert_danger+" Could not find any text..","Looks like you have not added any text for this lesson", "alert-danger");
        addResult("text-length","danger");
      }
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      } 
    }
  
    const scantext_elements  = function(){
      var lesson = currentlessondata.lesson;
      var has_extra_text = false;
      var html = "";
      var loom = "d29641c951ea418cb062c9ca1a04f6c9";
      html +=generateLoomEmbed(loom);    
      
      if(typeof(lesson.html_text)!="undefined" && lesson.html_text!=""){
        has_extra_text = true;
      }
      
      if(has_extra_text){
        // check for blank
        var extra_text = $($.parseHTML(lesson.html_text)).text();
        if(extra_text==""){
        html += generate_alert_html(icon_alert_danger+" Could not find any text..","Looks like you have not added any text for this lesson", "alert-danger");
          addResult("text-elements","danger");
        } else {    
          var has_danger = false;
          var has_warning = false;
          var has_success = false;
          var _h1 = $(".course-player__html-item").find("h1");
          var _h2 = $(".course-player__html-item").find("h2");
          var _h3 = $(".course-player__html-item").find("h3");
          var _h4 = $(".course-player__html-item").find("h4");
          var _h5 = $(".course-player__html-item").find("h5");
          //console.log("_h2"+_h2.length)
          if((_h1.length+_h2.length+_h3.length+_h4.length+_h5.length)==0){
          html += generate_alert_html(icon_alert_warning+" No Headings Found","Having headings are a great way to break up the text and call out specific sections of the document.", "alert-warning");
            has_warning=true;
          } else {
            html += generate_alert_html(icon_alert_success+" Headings Found","Nice job!! Having headings are a great way to break up the text and call out specific sections of the document.", "alert-success");
            has_success = true;
          }
  
          var _li = $(".course-player__html-item").find("li");
          if(_li.length==0){
          html += generate_alert_html(icon_alert_warning+" Bullet Lists Not Found","Bullet lists are a great way too quickly see read key points. You might want to consider using these throughout to slow down the scroll and make it easier to read", "alert-warning");
            has_warning=true;
          } else {
            html += generate_alert_html(icon_alert_success+" Bullet Lists Found","Nice job!! It looks like you have added a bullet list to help the student have an easier time reading the content.", "alert-success");
            has_success = true;
          }
  
          
          var _strong = $(".course-player__html-item").find("strong");
          var _em = $(".course-player__html-item").find("em");
          var _u = $(".course-player__html-item").find("u");
          if((_strong.length+_em.length+_u.length)==0){
            html += generate_alert_html(icon_alert_warning+" No Basic Formatting Found","It does not look like you are using any bold, italics or underlines. This can help with readbility.", "alert-warning");
            has_warning=true;
          } else {
            html += generate_alert_html(icon_alert_success+" Basic Formatting Found","Nice job! It looks like you are using some basic formatting. This really helps with readability.", "alert-success");
            has_success = true;
          }
  
          
          // Check for inline styles
          /*
          if(lesson.html_text.includes("style=")){
            html += generate_alert_html(icon_alert_warning+" Inline Styles Found","Not sure if you intended to markup some of your text with inlines styles like font family, size, color - but we did notice some. If you did not intend this, then yuou may have pasted from another document. try doing a 'clean paste' instead or manually typing the content.", "alert-warning");
            has_warning = true;     
          } */    
  
          
          if(has_danger){
            addResult("text-elements","danger");
          } 
          else {
            if(has_warning){
              addResult("text-elements","warning");
            } else {
              if(has_success) {
                addResult("text-elements","success");
              }
              
            }
            
          }
        }
      } else {
        html += generate_alert_html(icon_alert_danger+" Could not find any text..","Looks like you have not added any text for this lesson", "alert-danger");
        addResult("text-elements","danger");
      }
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      } 
    }
    
    const scantext_style  = function(){
      var lesson = currentlessondata.lesson;
      var has_extra_text = false;
      var html = "";
      var loom = "cd913710e0eb4c999cd98efc0770a0d0";
      html +=generateLoomEmbed(loom);    
      
      if(typeof(lesson.html_text)!="undefined" && lesson.html_text!=""){
        has_extra_text = true;
      }
      
      if(has_extra_text){
        // check for blank
        var extra_text = $($.parseHTML(lesson.html_text)).text();
        if(extra_text==""){
        html += generate_alert_html(icon_alert_danger+" Could not find any text..","Looks like you have not added any text for this lesson", "alert-danger");
          addResult("text-elements","danger");
        } else {    
          var has_danger = false;
          var has_warning = false;
          var has_success = false;
          
          var _playersnips = $(".course-player__html-item").find(".kapow-player");
          if(_playersnips.length==0){
            html += generate_alert_html(icon_alert_warning+" Player Snips Not Found","It looks like you are not using our Player Snips Power Up that helps with making your lessons look amazing. <a href='http://playersnips.superpowerups.com/' target='_blank'> Learn more</a>", "alert-warning");
            has_warning=true;
          } else {
            html += generate_alert_html(icon_alert_success+" Player Snips Found","Nice job!! It looks like you are using our Player Snips for this lesson.", "alert-success");
            has_success = true;
          }
  
          
          var _img = $(".course-player__html-item").find("img");
          if(_img.length==0){
            html += generate_alert_html(icon_alert_warning+" Images Not Found","Adding images to your text will really help with creating some visual style. It also breaks up the text nicely", "alert-warning");
            has_warning=true;
          } else {
            html += generate_alert_html(icon_alert_success+" Images Found","Nice job!! It looks like you have added a images. This will really help with creating some visual style. It also breaks up the text nicely.", "alert-success");
            has_success = true;
          }
  
          if(lesson.html_text.includes("span style=")){
            html += generate_alert_html(icon_alert_success+" Inlines Styles Found","Nice job!! It looks like you have added some inline styles like fonts, colors, font-sizes. This helps with readbility and discovering key points.", "alert-success");
            has_success = true;
          } else {
            html += generate_alert_html(icon_alert_warning+" Inline Styles Not Found","It looks like you have not added any inline styles like fonts, colors, font-sizes. This helps with readbility and discovering key points.", "alert-warning");
            has_warning=true;
            
          }
  
          
          if(has_danger){
            addResult("text-style","danger");
          } 
          else {
            if(has_warning){
              addResult("text-style","warning");
            } else {
              if(has_success) {
                addResult("text-style","success");
              }
              
            }
            
          }
        }
      } else {
        html += generate_alert_html(icon_alert_danger+" Could not find any text..","Looks like you have not added any text for this lesson", "alert-danger");
        addResult("text-style","danger");
      }
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      } 
    }
   
    /* end of scans */
    
    const scanvideo_options = function(){
      var html="";
      var loom = "4e99e023de684ace96fdc7f92161ba58";
      html +=generateLoomEmbed(loom);
      html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      html+='<p>Watch the video above as we walk through what video lesson features you should be using.</p>'
      var checklist = [
        {
          "heading":'Are you usng captions?',
          "description":'Captions - Not just for hearing impaired. Captions are also helpful when your student may not be able to play the video because they are in a quite space. Having the words come up on the screen as they are spoken also hits the visual senses which helps reinforce the learning. Either create your caption files manually or use an automated tool like Loom.com to generate them for you.'
        },
        {
          "heading":'Are you using video autoplay?',
          "description":'Having your videos selected for autoplay may be a good idea so your students do not have to click anything to get started. But if your lessons are super short and ytour student gets interrupted, then they may miss some content unknowingly. Thier progress completion will also be effected.'
        },
        {
          "heading":'Are you hiding the video playbar to prevent skipping ahead',
          "description":'In certain situations you may want to ensure the student watches all of the content. And for this case you may want to disable the playbar for each video.'
        },
        {
          "heading":'Are you reviewing your video analytics',
          "description":'Don\'t forget to monitor your engagement analytics for your videos. This will tell you how far your students have watched the video.'
        },      
        {
          "heading":'Are you using a custom video thumbnail?',
          "description":'If your video is set for auto-play, then the thumbnail really does not matter as it will not be shown. However if you have set it to not auto play, then be sure to upload a nice thumbnail, so you are not left with a random image of a not so flaterring image of yourself.'
        }      
  
      ]    
      html+=generate_checklist_items(checklist);
      addResult("video-options","info");
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      }    
      addResult("video-options","info");
      
    }
    
    
    const scancourse_onboarding = function(){
      var html="";
      var loom = "42c75ba198084fd199a99e3effd9a554";
      html +=generateLoomEmbed(loom);
      html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      html+='<p>Watch the video above to get some pro tips on how to get your students started in the right direction.</p>'
      var checklist = [
        {
          "heading":'Are you recommending the direction and pace?',
          "description":'Be sure to let your students know if you want them going in order or choosing their own adventure. Don\'t assume they know what to do next.'
        },
        {
          "heading":'Are you starting your courese with a video',
          "description":'Start off the course with a nice friendly welcoming video to keep the connection going'
        },
        {
          "heading":'Are you reminding students about your support and community options?',
          "description":'Let your students know you are there to help them if they get stuck. Remind them about the associated community that they may have available to them.'
        },
        {
          "heading":'Are you giving them a quick win to quickly build momentum?',
          "description":'Avoid refund requests by making sure they start off with something that is easily achievable. Don\'t overwhelm them with a deluge of information.'
        }      
  
      ]    
      html+=generate_checklist_items(checklist);
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      }    
      addResult("course-onboarding","info");
      
    }  
  
    const scancourse_freepreview = function(){
      var html="";
      var loom = "9a78078e05cc439b92d19fb40d984df6";
      html +=generateLoomEmbed(loom);
      html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      html+='<p>Watch the video above for your guided assessment coaching.</p>'
      var checklist = [
        {
          "heading":'Have you considered using a free mini course instead?',
          "description":'Kill the free lesson previews and create a mini course that will give your student a quick win where they will want more. At the end of the free mini course, create a pitch video that shows them how they can use their new skills to learn and do more.'
        }      
  
      ]    
      html+=generate_checklist_items(checklist);
      addResult("course-freepreview","info");
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      }    
      
    }   
    const scancourse_settings = function(){
        var html="";
        var loom = "247ece7681e2463a9b5de78281ae1079";
        html +=generateLoomEmbed(loom);
        html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
        html+='<p>Watch the video above for your guided assessment coaching.</p>'
        var checklist = [
          {
            "heading":'Have you considered using a free mini course instead?',
            "description":'Kill the free lesson previews and create a mini course that will give your student a quick win where they will want more. At the end of the free mini course, create a pitch video that shows them how they can use their new skills to learn and do more.'
          }      
    
        ]    
        html+=generate_checklist_items(checklist);
        addResult("course-settings","info");
        if(html!=""){
          $(".resultSummary").append(html);
        } else {
          
        }    
        
      }       
    
      const scancourse_audience = function(){
      var html="";
      var loom = "";
      html +=generateLoomEmbed(loom);
      html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      html+='<p>Watch the video above for your guided assessment coaching.</p>'
      var checklist = [
        {
          "heading":'What kind of skill gap are you attracting?',
          "description":'The "sweet spot" for your students is that they are just a few steps behind you. If you seem light years ahead of them or they seem way behind you, they may feel that the course is not for them and not be motivated to watch it.'
        },
        {
          "heading":'How niche are you targeting?',
          "description":'When you create a course for "everyone", then you are speaking to nobody because your messages and teachings will try to cover everything. The sweet spot is to niche down as far as you can (more than you think), so that they feel like you know exactly who they are'
        },      
        {
          "heading":'Is your style aligned with the audience?',
          "description":'The more authentic you are, the more you feel like a friend trying to help than a company who is selling a course. Inject some fun, foul language or whatever defines who you and your audience are and your engagement will increase.'
        },
        {
          "heading":'Are you enabling connection to you?',
          "description":'When your students feel personally connected to you, they are more likely to want to take courses from you. Be sure you have methods via social media to stay in touch. Having an online community is even better.'
        }        
        
  
      ]    
      html+=generate_checklist_items(checklist);
      addResult("course-audience","info");
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      }    
      
    } 
    const scancourse_chapters_lessons = function(){
      var html="";
      var loom = "";
      var has_danger = false;
      var has_warning = false;
      var has_success = false;
      
      html +=generateLoomEmbed(loom);
      //html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      //html+='<p>Watch the video above for your guided assessment coaching.</p>'
      
      var num_chapters = $(".course-player__chapter-item__container").length;
      var num_lessons = $(".course-player__chapter-item__contents li").length;
      
      if(num_chapters <=6){
      html += generate_alert_html(icon_alert_success+" # of Chapters Hit The Sweet Spot","It looks like you have a great number of chapters. The ideal target is between 1-5 chapters.", "alert-success");
        has_success = true;
        addResult("course-chapters-lessons","success");
      } 
      if(num_chapters >6 ){
      html += generate_alert_html(icon_alert_warning+" # of Chapters Are a Concern","It looks like you have a lot of chapters ("+num_chapters +") in your course. This may appear overwhelming to students.", "alert-warning");
        has_danger = true;
        addResult("course-chapters-lessons","danger");
        
      }         
      
      
      if(num_lessons<5){
        html += generate_alert_html(icon_alert_warning+" The Number of Lessons is Low","It looks like you only have "+num_lessons+" lessons. The ideal number of lessons is between 5-25.", "alert-warning");
        has_warning=true;
        addResult("course-chapters-lessons","warning");
      } 
  
      if(num_lessons>=5 && num_lessons<=30){
      html += generate_alert_html(icon_alert_success+" # of Lessons Hit The Sweet Spot","It looks like you have a great number of lessons. The ideal target is between 5-25 lessons.", "alert-success");
        has_success = true;
        addResult("course-chapters-lessons","success");
      } 
      if(num_lessons>30 ){
      html += generate_alert_html(icon_alert_danger+" # of Lessons Are a Concern","It looks like you have a lot of lessons ("+num_lessons+") in your course. This may appear overwhelming to students. You may want to break it up into multiple courses", "alert-danger");
        has_danger = true;
        addResult("course-chapters-lessons","danger");
        
      }         
      html += generate_alert_html(icon_alert_info+" Pro Tip","The number of lessons to include in an online course can vary depending on the course content and the learning objectives. There is no one-size-fits-all answer, however the goal should be to provide a comprehensive learning experience that helps learners achieve their desired outcomes while keeping them engaged and motivated throughout the course.", "alert-info");
  
  
      
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      }    
      
    }  
  
    const scancourse_drip = function(){
      var html="";
      var loom = "";
      var has_danger = false;
      var has_warning = false;
      var has_success = false;
      
      html +=generateLoomEmbed(loom);
      //html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      //html+='<p>Watch the video above for your guided assessment coaching.</p>'
      
      var num_prereqs = $(".content-item__prerequisite-label").length;
      
      if(num_prereqs >0){
      html += generate_alert_html(icon_alert_warning+" Prerequisite Detected","It looks like you are using prerequisite lessons. Be sure you really want to block progress as everyone learns at different paces", "alert-warning");
        has_success = true;
        addResult("course-drip","warning");
      } 
  
  
      
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      }    
      
    }  
  const scandownload_extras = function(){
      var lesson = currentlessondata.lesson;
      var has_extra_text = false;
      var html = "";
      var loom = "";
      html +=generateLoomEmbed(loom);
      if(typeof(lesson.html_description)!="undefined" && lesson.html_description!=""){
        has_extra_text = true;
      }
      
      if(has_extra_text){
        // check for blank
        var extra_text = $($.parseHTML(lesson.html_description)).text();
        if(extra_text==""){
        html += generate_alert_html(icon_alert_danger+" You are missing out..","Looks like you have not added some summary text. It is highly recommended to put a short blurb and bullet points so that your students can have more information about what the downloads actually are.", "alert-danger");
          addResult("video-extras","danger");
        } else {    
          var has_danger = false;
          var has_success = false;
          var has_warning = false;
          // html += generate_alert_html(icon_alert_success+" Summary Text Found","Looks like you have added some summary text below this video. It is highly recommended to put a short blurb and bullet points below the video so that your students can have more information about what is inside the video. This will increase watch time for the video", "alert-success");
  
          // TBD check for number of paragraphs and bullet list
          var _paragraphs = $($.parseHTML(lesson.html_description)).find("p");
          
          var _li = $($.parseHTML(lesson.html_description)).find("li");
          
          //console.log("Num p"+_paragraphs.length);
          
          var _words = getWordCount(extra_text);
          if(_words<15){
          html += generate_alert_html(icon_alert_warning+" Summary Text is a bit short","It looks like you only have "+_words+" words in your summary. You may want to provide a bit more detail so that it is worth reading.", "alert-warning");
            has_warning=true;
          } 
  
          if(_words>15 && _words<=90){
          html += generate_alert_html(icon_alert_success+" Summary Text Hit The Sweet Spot","It looks like you have found the perfect and consise way to describe the downloads that are available.", "alert-success");
            has_success = true;
          } 
          if(_words>90 ){
          html += generate_alert_html(icon_alert_danger+" Summary Text is a bit long","It looks like you have a lot of words ("+_words+") in your summary. You may want to trim it down to just a paragraph or two.", "alert-danger");
            has_danger = true;
          }         
          //console.log("Num li"+_li.length);
          if(_li.length==0){
          html += generate_alert_html(icon_alert_warning+" Summary List Not Found","Bullet lists are a great way too quickly summarize what is included in the downloads. You might want to consider using one along with a brief summary paragraph", "alert-warning");
            has_warning=true;
          } else {
          html += generate_alert_html(icon_alert_success+" Summary List Found","Nice job!! It looks like you have added a bullet list to help the student quickly see what is covered in the downloads.", "alert-success");
            has_success = true;
          }
          
          var _playersnips = $(".course-player__html-item").find(".kapow-player");
          if(_playersnips.length==0){
            html += generate_alert_html(icon_alert_warning+" Player Snips Not Found","It looks like you are not using our Player Snips Power Up that helps with making your lessons look amazing. <a href='http://playersnips.superpowerups.com/' target='_blank'> Learn more</a>", "alert-warning");
            has_warning=true;
          } else {
            html += generate_alert_html(icon_alert_success+" Player Snips Found","Nice job!! It looks like you are using our Player Snips for this lesson.", "alert-success");
            has_success = true;
          }
          
          if(has_danger){
            addResult("download-extras","danger");
          } 
          else {
            if(has_warning){
              addResult("download-extras","warning");
            } else{
              if(has_success) {
                addResult("download-extras","success");
              }
              
            }
          }
        }
      } else {
        html += generate_alert_html(icon_alert_danger+" You are missing out..","Looks like you have not added some summary text. It is highly recommended to put a short blurb and bullet points so that your students can have more information about what the downloads actually are.", "alert-danger");
        addResult("download-extras","danger");
      }
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      } 
    }
  
    const scandownload_files = function(){
      var html="";
      var loom = "";
      html +=generateLoomEmbed(loom);
      html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      html+='<p>Watch the video above to get some pro tips about naming your download files</p>'
      var checklist = [
        {
          "heading":'Are your file names recognizable?',
          "description":'Be sure to use names that are easily understandable, so your students can recall what they are and where they came from.'
        },
        {
          "heading":'Are you including links inside your downloads?',
          "description":'If the file can contain a link, it is recommended to include it so thet student knows where the file came from'
        },
        {
          "heading":'Did you include your branding?',
          "description":'Creating branded files with your logo, colors and fonts used inside will make you feel more professional and memorable'
        },
        {
          "heading":'Are you using known and familiar file extension types?',
          "description":'Be sure to use common file types that will work on all device types Mac, Windows, Apple, Android, etc. Otherwise they will be useless.'
        }      
  
      ]    
      html+=generate_checklist_items(checklist);
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      }    
      addResult("download-files","info");
      
    } 
    
    const scandownload_resources = function(){
      var html="";
      var loom = "";
      html +=generateLoomEmbed(loom);
      html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      html+='<p>Watch the video above to get some pro tips about naming your download files</p>'
      var checklist = [
        {
          "heading":'Have you "shown them around" your resource library?',
          "description":'If you are including a lot of downloads in a "resource library course", it would be a good idea to show them around with a video to start the course. '
        },
        {
          "heading":'Did you group your resource library into logical chapters?',
          "description":'Instead of having one big hairy list of downloads, you should consider grouping the download lessons into categories so that they are more discoverable.'
        },
        {
          "heading":'Did you add any visuals to promote downloading?',
          "description":'Often it is hard to know what the download really is just by the file name. Consider adding an image that shows what the download looks like and then add a link to the image to make it clickable.'
        },
        {
          "heading":'Did you consider how search works?',
          "description":'Once a student is inside a course, the search will only find lesson titles that match. So be sure to name your lessons with searching in mind.'
        }      
  
      ]    
      html+=generate_checklist_items(checklist);
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      }    
      addResult("download-resources","info");
      
    }   
    const scanpresentation_size  = function(){
      var html="";
      var loom = "";
      var has_danger = false;
      var has_warning = false;
      var has_success = false;
      
      html +=generateLoomEmbed(loom);
      //html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      //html+='<p>Watch the video above for your guided assessment coaching.</p>'
      
      var num_slide_text = $(".header__slides-controls").children().last().text();
      var num_slides = parseInt(num_slide_text.split("/")[1]);
      
      if(num_slides <7){
      html += generate_alert_html(icon_alert_warning+" Presentation too short","It looks like you only have ("+num_slides+") slides. This may be too short to get your point across. A good number to shoot for is 7-15 slides", "alert-warning");
        has_success = true;
        addResult("presentation-size","warning");
      } 
      if(num_slides >=7 && num_slides <=15){
      html += generate_alert_html(icon_alert_success+" Presentation is a good size","It looks like you have hit the sweet spot with ("+num_slides+") slides.  A good range to shoot for is 7-15 slides", "alert-success");
        has_success = true;
        addResult("presentation-size","success");
      } 
      if(num_slides >15){    
      html += generate_alert_html(icon_alert_warning+" Presentation too long","It looks like you  have ("+num_slides+") slides. This may be too short to get your point across. A good number to shoot for is 7-15 slides", "alert-warning");
        has_success = true;
        addResult("presentation-size","warning");
      } 
  
  
      
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      }    
      
    }   
    const scanpresentation_design = function(){
      var html="";
      var loom = "";
      html +=generateLoomEmbed(loom);
      html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      html+='<p>Watch the video above to get some pro tips about alternative ways to show audio</p>'
      var checklist = [
  
        {
          "heading":'How engaging is your static content?',
          "description":'Because Thinkific presentations do not run like traditional tools, they will not contain any animation or movement. You should aim to mix in graphics and images to make it more interesting.'
        },
        {
          "heading":'Are you using professionally designed templates?',
          "description":'Using tools like Canva, you can easily look more professional and interesting by using one of their pre-designed templates. Be sure to mix up the layout and styles to keep it engaging'
        },
        {
          "heading":'Are you mixing up the layout of each slide?',
          "description":'If you are using the same layout over and over again, your students will get bored and numb to what they are seeing. Try using various layouts and include interesting an relative images'
        },      
        {
          "heading":'Are you using legible font sizes?',
          "description":'Make sure your text is large enough so that it is readable on all devices. Be sure to view your lesson on a mobile device as that is what most students will be using to consume it.'
        }      
  
      ]    
      html+=generate_checklist_items(checklist);
      addResult("presentation-design","info");
      
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      }    
    }  
    
    const scanpresentation_settings = function(){
      var html="";
      var loom = "";
      html +=generateLoomEmbed(loom);
      html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      html+='<p>Watch the video above to get some pro tips about alternative ways to show audio</p>'
      var checklist = [
  
        {
          "heading":'Are you enabling the "Progress completion required" setting?',
          "description":'When you enble this setting, your students will be required to click through each slide. This could be a good or bad thing depending on your type of course and length of slides. However, the course player will remember what slide they last watched.'
        },
             
  
      ]    
      html+=generate_checklist_items(checklist);
      addResult("presentation-settings","info");
      
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      }    
    }  
  
  const scanpresentation_audio  = function(){
      var html="";
      var loom = "";
      var has_danger = false;
      var has_warning = false;
      var has_success = false;
      
      html +=generateLoomEmbed(loom);
      //html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      //html+='<p>Watch the video above for your guided assessment coaching.</p>'
      
      var num_audio = $(".course-player__presentation__header audio").length;
      if(num_audio ==0){
      html += generate_alert_html(icon_alert_warning+" Presentation has no audio","It looks like you have not included audio with your presentation. This will create more work for your student to get through the content", "alert-warning");
        has_success = true;
        addResult("presentation-audio","warning");
      } 
      if(num_audio >0){
      html += generate_alert_html(icon_alert_success+" Presentation audio detected","It looks like have included audio with your presentation. This is really helpful for your student. You may also want to convert this to a video lesson to make it even more helpful as it is easier and less work for your student to consume", "alert-success");
        has_success = true;
        addResult("presentation-audio","success");
      } 
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      }    
      
    }   
      
  const scanaudio_extras = function(){
      var lesson = currentlessondata.lesson;
      var has_extra_text = false;
      var html = "";
      var loom = "";
      html +=generateLoomEmbed(loom);
      if(typeof(lesson.html_description)!="undefined" && lesson.html_description!=""){
        has_extra_text = true;
      }
      
      if(has_extra_text){
        // check for blank
        var extra_text = $($.parseHTML(lesson.html_description)).text();
        if(extra_text==""){
        html += generate_alert_html(icon_alert_danger+" You are missing out..","Looks like you have not added some summary text. It is highly recommended to put a short blurb and bullet points so that your students can have more information about what the audio actually is.", "alert-danger");
          addResult("audio-extras","danger");
        } else {    
          var has_danger = false;
          var has_success = false;
          var has_warning = false;
          // html += generate_alert_html(icon_alert_success+" Summary Text Found","Looks like you have added some summary text below this video. It is highly recommended to put a short blurb and bullet points below the video so that your students can have more information about what is inside the video. This will increase watch time for the video", "alert-success");
  
          // TBD check for number of paragraphs and bullet list
          var _paragraphs = $($.parseHTML(lesson.html_description)).find("p");
          
          var _li = $($.parseHTML(lesson.html_description)).find("li");
          
          //console.log("Num p"+_paragraphs.length);
          
          var _words = getWordCount(extra_text);
          if(_words<15){
          html += generate_alert_html(icon_alert_warning+" Summary Text is a bit short","It looks like you only have "+_words+" words in your summary. You may want to provide a bit more detail so that it is worth reading.", "alert-warning");
            has_warning=true;
          } 
  
          if(_words>15 && _words<=90){
          html += generate_alert_html(icon_alert_success+" Summary Text Hit The Sweet Spot","It looks like you have found the perfect and consise way to describe the audio being played.", "alert-success");
            has_success = true;
          } 
          if(_words>90 ){
          html += generate_alert_html(icon_alert_danger+" Summary Text is a bit long","It looks like you have a lot of words ("+_words+") in your summary. You may want to trim it down to just a paragraph or two.", "alert-danger");
            has_danger = true;
          }         
          //console.log("Num li"+_li.length);
          if(_li.length==0){
          html += generate_alert_html(icon_alert_warning+" Summary List Not Found","Bullet lists are a great way too quickly summarize what the audio playing is about. You might want to consider using one along with a brief summary paragraph", "alert-warning");
            has_warning=true;
          } else {
          html += generate_alert_html(icon_alert_success+" Summary List Found","Nice job!! It looks like you have added a bullet list to help the student quickly see what is covered in the audio being played.", "alert-success");
            has_success = true;
          }
          
          var _playersnips = $(".course-player__html-item").find(".kapow-player");
          if(_playersnips.length==0){
            html += generate_alert_html(icon_alert_warning+" Player Snips Not Found","It looks like you are not using our Player Snips Power Up that helps with making your lessons look amazing. <a href='http://playersnips.superpowerups.com/' target='_blank'> Learn more</a>", "alert-warning");
            has_warning=true;
          } else {
            html += generate_alert_html(icon_alert_success+" Player Snips Found","Nice job!! It looks like you are using our Player Snips for this lesson.", "alert-success");
            has_success = true;
          }
          
          if(has_danger){
            addResult("audio-extras","danger");
          } 
          else {
            if(has_warning){
              addResult("audio-extras","warning");
            } else{
              if(has_success) {
                addResult("audio-extras","success");
              }
              
            }
          }
        }
      } else {
        html += generate_alert_html(icon_alert_danger+" You are missing out..","Looks like you have not added some summary text. It is highly recommended to put a short blurb and bullet points so that your students can have more information about what the audio actually is.", "alert-danger");
        addResult("audio-extras","danger");
      }
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      } 
    }
   
    const scanaudio_alternatives = function(){
      var html="";
      var loom = "";
      html +=generateLoomEmbed(loom);
      html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      html+='<p>Watch the video above to get some pro tips about alternative ways to show audio</p>'
      var checklist = [
  
        {
          "heading":'Have you considered using a video instead?',
          "description":'Create some simple graphics to use as a background and add the audio track. This may be more visually appealing and engaging to your students. '
        },
        {
          "heading":'If you switch to a Video be sure to add Timecodes.',
          "description":'If you convert your audio file to video, then you will be able to use our Timecodes PowerUp to add clickable time code links to jump to key moments in the audio..'
        },
        {
          "heading":'Have you looked into using a Descript Audio Grams instead?',
          "description":'Create audio visualizations that have nice graphics using Descript. This is additional software you would need to purchase to create embedable AudioGrams '
        }      
  
      ]    
      html+=generate_checklist_items(checklist);
      addResult("audio-alternatives","info");
      
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      }    
      
      
    } 
    
    const scanaudio_length = function(){
      var html="";
      var loom = "";
      html +=generateLoomEmbed(loom);
      html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      html+='<p>Watch the video above to get some pro tips about alternative ways to show audio</p>'
      var checklist = [
  
        {
          "heading":'Are you hitting the "Sweet Spot"?',
          "description":'Attention spans are growing shorter and shorter, just like video lessons, we are looking to produce an audio lesson as short as possible to get your point across. Aim for a length of 3-15 minutes. '
        }      
  
      ]    
      html+=generate_checklist_items(checklist);
      addResult("audio-length","info");
      
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      }    
      
      
    }   
    
    const scanquiz_length = function(){
      var number_questions = currentlessondata.lesson.meta_data.question_count;
      var summary = "";
      var loom = "";
      summary +=generateLoomEmbed(loom);
      if(number_questions <3){
        summary += generate_alert_html(icon_alert_warning+ " Hmm!","Looks like your quiz is quite short ("+number_questions+" questions), we do like 'short and sweet' quizzes, but you may want to consider adding a few more questions. The 'sweet spot' is between 3-7 questions", "alert-warning");
        addResult("quiz-length","warning");
      }
  
      if(number_questions >=3 && number_questions <=7){
        summary += generate_alert_html(icon_alert_success+" Your quiz length is looking great!","The swet spot for the number of questions to ask is between 3-7, looks like you are on track for that.", "alert-success");
        addResult("quiz-length","success");
      }
  
      if(number_questions >7){
        summary += generate_alert_html(icon_alert_warning+ "Be Careful Here!","It looks like the number of questions you have ("+number_questions+" questions) is outside the sweet spot of 3-7. Be sure the questions are relevant and required for your intention.", "alert-warning");
        addResult("quiz-length","warning");
      }
  
     
      
      if(summary!=""){
        $(".resultSummary").append(summary);
      } else {
        
      }
      
    }  
    
    const scanquiz_settings = function(){
      var requires_pass = currentlessondata.lesson.pass_fail;
      var passing_score = currentlessondata.lesson.passing_score;
      
      var summary = "";
      var loom = "";
      summary +=generateLoomEmbed(loom);
      var checklist = [];
      if(requires_pass){
        if(passing_score >90){
          summary += generate_alert_html(icon_alert_warning+ " Passing Score Seems High","It looks like you require your student to almost be perfect ("+passing_score+"%) in answering your quiz question. This could lead to student frustration - be careful", "alert-warning");
          addResult("quiz-settings","warning");
        }
        if(passing_score <70){
          summary += generate_alert_html(icon_alert_warning+ " Passing Score Seems Low","It looks like your required passing grade is on the low side ("+passing_score+"%) . Don't you want to make sure they have grasped the concept better?", "alert-warning");
          addResult("quiz-settings","warning");
        }      
        if(passing_score >70 && passing_score <=90){
          summary += generate_alert_html(icon_alert_warning+ " Passing Score Looks Ok","It looks like your required passing grade is in the sweet spot ("+passing_score+"%)", "alert-success");
          addResult("quiz-settings","success");
        }      
        checklist.push(
          {
            "heading":'Are you using the randomize setting?',
            "description":'It looks like you are requiring a passing grade. You may also want to randomize the question bank to help with quiz retakes.'
          }      
        )
  
  
        
      } else {
          summary += generate_alert_html(icon_alert_info+ " Passing Score Not Required?","It looks like you did not enable a passing score for this quiz. I just wanted to make sure you intended to set up your quiz this way.", "alert-info");
          addResult("quiz-settings","info");
        
      }
  
        checklist.push(
          {
            "heading":'Are you using providing explanation text?',
            "description":'For each question, you should consider using useful explanation text. This will be shown regardless of whether they got the question correct, so be sure to word it appropriately'
          }      
        )
  
      
      summary+=generate_checklist_items(checklist);
      addResult("quiz-settings","info");
  
      
      if(summary!=""){
        $(".resultSummary").append(summary);
      } else {
        
      }
      
    }   
    const scansurvey_length = function(){
      var number_questions = currentlessondata.lesson.meta_data.question_count;
      var summary = "";
      var loom = "";
      summary +=generateLoomEmbed(loom);
      if(number_questions <3){
        summary += generate_alert_html(icon_alert_warning+ " Hmm!","Looks like your survey is quite short ("+number_questions+" questions), we do like 'short and sweet' surveys, but you may want to consider adding a few more questions. The 'sweet spot' is between 3-7 questions", "alert-warning");
        addResult("survey-length","warning");
      }
  
      if(number_questions >=3 && number_questions <=7){
        summary += generate_alert_html(icon_alert_success+" Your survey length is looking great!","The swet spot for the number of questions to ask is between 3-7, looks like you are on track for that.", "alert-success");
        addResult("survey-length","success");
      }
  
      if(number_questions >7){
        summary += generate_alert_html(icon_alert_warning+ "Be Careful Here!","It looks like the number of survey questions you have ("+number_questions+" questions) is outside the sweet spot of 3-7. Be sure the questions are relevant and required for your intention.", "alert-warning");
        addResult("survey-length","warning");
      }
  
     
      
      if(summary!=""){
        $(".resultSummary").append(summary);
      } else {
        
      }
      
    }    
    
    const scansurvey_settings = function(){
      var html="";
      var loom = "";
      html +=generateLoomEmbed(loom);
      html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      html+='<p>Watch the video above to get some pro tips about alternative ways to show audio</p>'
      var checklist = [
  
        {
          "heading":'Are you asking for their feedback to often?',
          "description":'Your student is watching your course for their own benefit, not yours. If you are asking them to rate your lessons and course too often, you will end up with frustrated students.'
        },
        {
          "heading":'Are you asking at the "right" time?',
          "description":'If you plan on using a survey, it is recommended to only use one survey and have it at the end of the course. This way you are allowing your students to learn and achieve results first.'
        },      
        {
          "heading":'Are you getting qualitative and quantitative information?',
          "description":'Asking a rating or scale question is helpful in getting quantitative data about your course, but do no forget to have freeform questions so you can capture important thoughts and recommendations.'
        },      
        
  
      ]    
      html+=generate_checklist_items(checklist);
      addResult("survey-settings","info");
      
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      }    
          
    }  
  
    const scansurvey_alternatives = function(){
      var html="";
      var loom = "";
      html +=generateLoomEmbed(loom);
      html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      html+='<p>Watch the video above to get some pro tips about alternative ways to show audio</p>'
      var checklist = [
  
        {
          "heading":'Do you need branching logic for feedback?',
          "description":'You may want to consider using a Mueltimedia lesson instead with Typeform or Tally.so so you can provide a richer survey experience.'
        },
        {
          "heading":'Have you considered being more personal?',
          "description":'Using a video based method with either Loom or VideoAsk inside a multimedia lesson may make for a more personal connection and alternative ways of providing feedback'
        },      
        {
          "heading":'Are you using a community?',
          "description":'Having a community associated with a course is highly recommended, it allows your students to freely discuss their feedback and gives you an opportunity to be more interactive'
        },      
        
  
      ]    
      html+=generate_checklist_items(checklist);
      addResult("survey-alternatives","info");
      
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      }    
          
    }
    
    const scanassignment_bestpractices= function(){
      var html="";
      var loom = "";
      html +=generateLoomEmbed(loom);
      html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      html+='<p>Watch the video above to get some pro tips about alternative ways to show audio</p>'
      var checklist = [
  
        {
          "heading":'Are you explaining the process?',
          "description":'Make sure to use the text settings to explain what is being asked to submit as well as what to expect in terms of "what happens next". You do not want to confuse or frustrate your students'
        },
        {
          "heading":'Are you using this to gather feedback?',
          "description":'You may want to consider using a community approach instead. You will be able to demonstrate your authority at scale and the learning will be leveraged by other students'
        },      
        {
          "heading":'Are you provinding a template?',
          "description":'By giving your student a fill-in-the-blank template that they can use for the assignment will eliminate confusion and frustration on all sides. Make sure the instructions are clear to avoid resubmissions.'
        },      
        {
          "heading":'Are you aware of how it may impact progress?',
          "description":'The assignment lesson cannot be marked as complete until you approve of the assignment. Depending on how you have your course set up, this may block your student from making progress.'
        },      
        
        
        
  
      ]    
      html+=generate_checklist_items(checklist);
      addResult("assignment-bestpractices","info");
      
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      }    
    }
    
    const scanassignment_extras = function(){
      //assignment_content
      var lesson = currentlessondata.lesson;
      var has_extra_text = false;
      var html = "";
      var loom = "";
      html +=generateLoomEmbed(loom);
      if(typeof(lesson.assignment_content)!="undefined" && lesson.assignment_content!=""){
        has_extra_text = true;
      }
      
      if(has_extra_text){
        // check for blank
        var extra_text = $($.parseHTML(lesson.assignment_content)).text();
        if(extra_text==""){
        html += generate_alert_html(icon_alert_danger+" Missing assignment description","Looks like you have not added some descriptive text for this assignment. Make sure to use the text settings to explain what is being asked to submit as well as what to expect in terms of 'what happens next'. You do not want to confuse or frustrate your students", "alert-danger");
          addResult("assignment-extras","danger");
        } else {    
          var has_danger = false;
          var has_success = false;
          var has_warning = false;
          // html += generate_alert_html(icon_alert_success+" Summary Text Found","Looks like you have added some summary text below this video. It is highly recommended to put a short blurb and bullet points below the video so that your students can have more information about what is inside the video. This will increase watch time for the video", "alert-success");
  
          // TBD check for number of paragraphs and bullet list
          var _paragraphs = $($.parseHTML(lesson.assignment_content)).find("p");
          
          var _li = $($.parseHTML(lesson.assignment_content)).find("li");
          
          //console.log("Num p"+_paragraphs.length);
          
          var _words = getWordCount(extra_text);
          if(_words<15){
          html += generate_alert_html(icon_alert_warning+" Description text is a bit short","It looks like you only have "+_words+" words in your summary. You may want to provide a bit more detail so that it is worth reading.", "alert-warning");
            has_warning=true;
          } 
  
          if(_words>15 && _words<=90){
          html += generate_alert_html(icon_alert_success+" Description text Hit The Sweet Spot","It looks like you have found the perfect and consise way to summarize the assignment.", "alert-success");
            has_success = true;
          } 
          if(_words>90 ){
          html += generate_alert_html(icon_alert_danger+" Description text is a bit long","It looks like you have a lot of words ("+_words+") in your summary. You may want to trim it down to just a paragraph or two.", "alert-danger");
            has_danger = true;
          }         
          //console.log("Num li"+_li.length);
          if(_li.length==0){
          html += generate_alert_html(icon_alert_warning+" Bullet List Not Found","Bullet lists are a great way too quickly see what the assignment is about.You might want to consider using one along with a brief summary paragraph", "alert-warning");
            has_warning=true;
          } else {
          html += generate_alert_html(icon_alert_success+" Bullet List Found","Nice job!! It looks like you have added a bullet list to help the student quickly see what is covered in the assignment.", "alert-success");
            has_success = true;
          }
          
          var _playersnips = $(".course-player__assignment__description").find(".kapow-player");
          if(_playersnips.length==0){
            html += generate_alert_html(icon_alert_warning+" Player Snips Not Found","It looks like you are not using our Player Snips Power Up that helps with making your lessons look amazing. <a href='http://playersnips.superpowerups.com/' target='_blank'> Learn more</a>", "alert-warning");
            has_warning=true;
          } else {
            html += generate_alert_html(icon_alert_success+" Player Snips Found","Nice job!! It looks like you are using our Player Snips for this lesson.", "alert-success");
            has_success = true;
          }
          
          if(has_danger){
            addResult("assignment-extras","danger");
          } 
          else {
            if(has_warning){
              addResult("assignment-extras","warning");
            } else{
              if(has_success) {
                addResult("assignment-extras","success");
              }
              
            }
          }
        }
      } else {
        html += generate_alert_html(icon_alert_danger+" Missing assignment description","Looks like you have not added some descriptive text for this assignment. Make sure to use the text settings to explain what is being asked to submit as well as what to expect in terms of 'what happens next'. You do not want to confuse or frustrate your students", "alert-danger");
        addResult("assignment-extras","danger");
      }
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      } 
      
    }
    
    const scanApps = function(){
      var html="";
      var loom = "";
      html +="<style>.btn-back-to-welcome{display:block !important;}</style>"
      html +='<div class="scanInfo">';
      html +="<h3><span class='position-relative'>XP Boosters";
      html +="</span></h3>"
      
      html +=generateLoomEmbed(loom);
      //html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> XP Boosters</strong></div>';
      html+='<p>Watch the video above to get some pro tips about applications and tools we love to help you boost your course experience</p>'
      var linklist = [
  
        {
          "heading":'Player Snips',
          "description":'Make your course look amazing with easily customizable content blocks and increase engagement with effects & popups.',
          "img":"https://import.cdn.thinkific.com/1/app_store/vygFQTM7TRaqVunH9c1a_PlayerSnips.png",
          "link":"https://apps.thinkific.com/apps/player-snips",
          "link_text":"Learn More"
        },
        {
          "heading":'Time Codes',
          "description":'Instantly add clickable time codes to your video lessons so your students can quickly jump to what they are looking for',
          "img":"https://import.cdn.thinkific.com/1/app_store/1651601857_2272d9775f85eeabff8106d11a4cf23d.png",
          "link":"https://apps.thinkific.com/apps/timecodes",
          "link_text":"Learn More"
        },
        {
          "heading":'plaYEAH!',
          "description":'Create personalized tour guide and customize your course player to increase completion and engagement.',
          "img":"https://import.cdn.thinkific.com/1/app_store/1651601856_0c909f37bf45f6d6df4f799ae5aaa5ba.png",
          "link":"https://apps.thinkific.com/apps/playeah",
          "link_text":"Learn More"
  
        },   
        {
          "heading":'Wobo',
          "description":'Empower note-taking and allow students to retain their work in a custom digital workbook.',
          "img":"https://import.cdn.thinkific.com/1/app_store/1651602039_42c9798e80d2bfba191fc58b95ecf762.png",
          "link":"https://apps.thinkific.com/apps/wobo",
          "link_text":"Learn More"
  
        },
        {
          "heading":'Omnisearch',
          "description":'Make it easy for students to find the exact part of the lesson they’re looking for across videos, PDFs, presentations, and text.',
          "img":"https://import.cdn.thinkific.com/1/app_store/1651601891_83d100fcb9277289a08e150cbb7baba8.png",
          "link":"https://apps.thinkific.com/learning-experience/omnisearch",
          "link_text":"Learn More"
        },      
        {
          "heading":'WooNinja File Share',
          "description":'WooNinja File Share is the one click, no code solution you are looking for!',
          "img":"https://import.cdn.thinkific.com/1/app_store/ZdfEib9SaaHguBzaUYGp_wooninja-files.png",
          "link":"https://apps.thinkific.com/learning-experience/wooninja-file-share",
          "link_text":"Learn More"
        },            
        
        
  
      ]    
      html+=generate_linklist_items(linklist);
      
      if(html!=""){
        $("#playerScan .content").data("result-type","apps-list");
        $("#playerScan .content").html(html);
      } else {
        
      }    
      
      
    }   
    
    
    const scanpdf_style = function(){
      var html="";
      var loom = "";
      html +=generateLoomEmbed(loom);    
      html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      html+='<p>Watch the video above as we discuss some key elements to making engaging video content. We are unable to analyze your video from an automated way, so we will need you to do some self assessment.Key points from the video are summarized below.</p>'
      var checklist = [
        {
          "heading":'What do you want the student to do with this?',
          "description":'Since there is no way to "wrap" the PDF lesson with extra information, you should include instructions in the actual PDF to remind your student what you want them to do with it.'
        },
        {
          "heading":'Are you including links and branding inside the PDF?',
          "description":'Since the PDFs are usually meant for downloading, you will want to remind your student where they came from, so that they return to your site for more learning.'
        },
        {
          "heading":'Is your PDF "fillable"?',
          "description":'If your PDF is intended to be a fillable worksheet, your students may incorrectly assume that they can put in their information right in the lesson and that it will be there when they return'
        }
  
      ]    
      html+=generate_checklist_items(checklist);
      addResult("pdf-style","info");
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      } 
  
    }
    
    const scanpdf_tools = function(){
      var html="";
      var loom = "";
      html +=generateLoomEmbed(loom);    
      html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      html+='<p>Watch the video above as we discuss some key elements to making engaging video content. We are unable to analyze your video from an automated way, so we will need you to do some self assessment.Key points from the video are summarized below.</p>'
      var checklist = [
        {
          "heading":'What do you want the student to do with this?',
          "description":'PDFs have been around for a long time now and there are many online tools you can use to create beautifully designed worksheets. Some PDF creation apps we love are <a href="https://apps.thinkific.com/apps/wobo" target="_blank">Wobo</a>,  <a href="https://www.canva.com" target="_blank">Canva</a>, <a href="https://www.smallpdf.com" target="_blank">SmallPdf</a> to name a few '
        },
      ]    
      html+=generate_checklist_items(checklist);
      addResult("pdf-tools","info");
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      } 
  
    }
    
    const scanmedia_bestpractices = function(){
      var html="";
      var loom = "";
      html +=generateLoomEmbed(loom);
      html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      html+='<p>Watch the video above to get some pro tips about alternative ways to show audio</p>'
      var checklist = [
  
        {
          "heading":'Are you using Wobo?',
          "description":'Using Wobo allows you to easily embed fillable worksheets that will recall what your students filled in.'
        },
        {
          "heading":'Are you using Genially?',
          "description":'Genially has an awesome set of interactive components that will bring life into your lessons. It is also free!'
        },      
        {
          "heading":'Are you using Flip?',
          "description":'Flip is a free app from Microsoft where educators create safe, online groups for students to express their ideas asynchronously in short video, text, and audio messages.'
        },
        {
          "heading":'Are you using VideoAsk?',
          "description":'VideoAsk by Typeform is a great way to provide some branching video messages to either inform or collection information in a variety of ways'
        },
        {
          "heading":'Are you using Calendly or Book Like A Boss?',
          "description":'Increase your coaching call sales by embedding a booking application like Calendly or Book Like A Boss and make it easy for your students to get help at the right time'
        },    
        {
          "heading":'Are you using Communities?',
          "description":'Using a community link (Thinkific or Peerboard) as a media lesson will provide an easy way for your students to jump in on the conversation'
        },     
        {
          "heading":'Are you using Quizlet?',
          "description":'Quizlet offers a great way to present flashcards, practice tests and more to keep students engaged and motivated. Plus it is free.'
        },       
        
  
      ]    
      html+=generate_checklist_items(checklist);
      addResult("media-bestpractices","info");
      
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      }    
    }  
    
      const scanmedia_progress = function(){
      var html="";
      var loom = "";
      html +=generateLoomEmbed(loom);
      html+='<div class="alert alert-info" role="alert"><strong><i class="fa-regular fa-bell"></i> Guided Assessment Time</strong></div>';
      html+='<p>Watch the video above to get some pro tips about alternative ways to show audio</p>'
      var checklist = [
  
        {
          "heading":'Are you concerned about progress?',
          "description":'Since there is no built in method for interaction between the Thinkific course player and the multimedia content, the student can click the "Complete & Continue" button at any time.'
        },
        {
          "heading":'Are you using plaYEAH Magic Multimedia lesson?',
          "description":'For certain multimedia types, your content can control and hide the "Complete and Continue" button. This is an advanced topic and does require knowledge of coding. <a href="https://playeah-docs.robgalvin.co/instant-super-powers/magic-multimedia-lesson" target="_blank">Check out the plaYEAH! guide here.</a>'
        }      
  
      ]    
      html+=generate_checklist_items(checklist);
      addResult("media-progress","info");
      
      if(html!=""){
        $(".resultSummary").append(html);
      } else {
        
      }    
    }  
    
    
    
    const runFullAutoScan = function(){
      if(autoScanCompleted){
        showAutoScanResults();
      } else {
        // hide normal window
        $("#playerScan").removeClass("show");    
        $(".btn-stopAutoScan").removeClass("d-none"); 
        $(".scanmenu").addClass("d-none"); 
        // TBD SHow autoscan status
        auto_advance = true;
        // click a lesson
        //console.log("Opening progress modal");
        autoScanCtr = 0;
        autoScanNumberofLessons = $('a.course-player__content-item__link').length;
        progressModal = new bootstrap.Modal('#scanProgressModal', {
          keyboard: false
        })
        progressModal.show();
        scanLesson(currentlessondata);
  
        // run all scans for that lesson type
        // repeat until finished or the pause/stop button is pressed.      
      }
  
    }
    
    const runScan = function(index){
          var scan = scans[index];
          //console.log(scan);
          if(scan.type!="welcome"){
            $(".scanHeading").text(scan.name);
            $(".scanSummary").text(scan.description);
            $(".scanInfo").addClass("d-none");
            $(".scanList").addClass("d-none");
            $(".resultLoom").html("");
            $(".resultSummary").html("");
            $(".btn-backToScanList").data("index",index);
            $(".btn-nextOnScanList").data("index",index);
            
          }
          if(scan.draft){
            $(".scanSummary").append("<p class='text-muted'>Coming Soon</p>");
          } else {
            scrollListToTop();
             
            switch(scan.id) {
              case "welcome-autoscan":
                runFullAutoScan();
                break;
              case "welcome-selfassess":
                scanSelf();
                break;              
  
              case "welcome-course":
                scanCourse();
                break;
              case "welcome-lesson":
                scanLesson(currentlessondata);
                break;      
              case "welcome-apps":
                scanApps();
                break;
              case "text-length":
                scantext_length();
                break;
              case "text-elements":
                scantext_elements();
                break;
              case "text-style":
                scantext_style();
                break;  
  
              case "video-length":
                scanvideo_length();
                break;
              case "video-content":
                scanvideo_content();
                break;
              case "video-extras":
                scanvideo_extras();
                break;  
              case "video-options":
                scanvideo_options();
                break;  
              case "course-onboarding":
                scancourse_onboarding();
                break;                
              case "course-chapters-lessons":
                scancourse_chapters_lessons();
                break;               
  
              case "course-freepreview":
                scancourse_freepreview();
                break;    
             case "course-settings":
                scancourse_settings();
                break;
              case "course-audience":
                scancourse_audience();
                break;               
              case "course-drip":
                scancourse_drip();
                break;   
              case "download-extras":
                scandownload_extras();
                break;   
              case "download-files":
                scandownload_files();
                break;
              case "download-resources":
                scandownload_resources();
                break;              
              case "presentation-size":
                scanpresentation_size();
                break;  
              case "presentation-design":
                scanpresentation_design();
                break;   
              case "presentation-settings":
                scanpresentation_settings();
                break;               
             case "presentation-audio":
                scanpresentation_audio();
                break;                
              case "audio-extras":
                scanaudio_extras();
                break;   
              case "audio-alternatives":
                scanaudio_alternatives();
                break;   
              case "audio-length":
                scanaudio_length();
                break;                
              case "pdf-style":
                scanpdf_style();
                break;  
              case "pdf-tools":
                scanpdf_tools();
                break; 
              case "media-bestpractices":
                scanmedia_bestpractices();
                break;               
              case "media-progress":
                scanmedia_progress();
                break;                 
              case "quiz-length":
                scanquiz_length();
                break;  
              case "quiz-settings":
                scanquiz_settings();
                break;               
              case "survey-length":
                scansurvey_length();
                break;  
              case "survey-settings":
                scansurvey_settings();
                break;                
              case "survey-alternatives":
                scansurvey_alternatives();
                break;  
              case "assignment-bestpractices":
                scanassignment_bestpractices();
                break;  
              case "assignment-extras":
                scanassignment_extras();
                break;               
                
                
              default:
                coming_soon();
                break;
            }      
             scrollListToTop();
             if(scan.type!="welcome"){
                  
              if(window.localStorage.getItem(storageKey)!==null){
                var playerscans = JSON.parse(window.localStorage.getItem(storageKey));
                playerscans.scans +=1;
                window.localStorage.setItem(storageKey, JSON.stringify(playerscans)); 
              } else {
                window.localStorage.setItem(storageKey, JSON.stringify({started:true,scans:1}));          
  
              }    
              if(auto_advance){
                $(".btn-nextOnScanList").click();
              } else {
                $(".scanResults").removeClass("d-none");
                var tallyiframe = generateTallyEmbed(scan);
                $(".resultSummary").append(tallyiframe);
                Tally.loadEmbeds();
  
              }
  
             }          
          }
  
      
    }
    
    const scanListeners = function(){
      // remove previous handlers
      $(".btn-backToScanList").click(function(){
  
        $(".scanInfo").removeClass("d-none");
        $(".scanList").removeClass("d-none");
        $(".scanResults").addClass("d-none");
        if($(this).data("type")=="self-assess"){
          scanSelf(); //return to self assess menu if came from there        
        }else {
          var current_index = $(this).data("index");
          var scan = scans[current_index];
          if(scan.type=="course"){
            scanCourse();
          } else {
            scanLesson(currentlessondata);  
          }
          
        }
        
        //console.log("hiding results going back");
      }); 
  
      $(".btn-nextOnScanList").click(function(){
        var current_index = $(this).data("index");
        var scan = scans[current_index];
        var found_next = false;
        var found_index=0;
        scans.forEach(function(item, index) {
          if($(this).data("type")=="self-assess"){
            if (item.is_self_assess && index > current_index && !found_next){
              found_next=true;
              found_index=index;
            }
  
          } else {
            if (item.type==scan.type && index > current_index && !found_next){
              found_next=true;
              found_index=index;
            }
            
          }
  
        });
        if(found_next){
          //console.log("Running next scan: ",scans[found_index]);
          runScan(found_index)
        } else {
            // if(auto_advance){
            //   // go to next lesson
            //   var lessonid = currentlessondata.lesson.id;
            //   $('a[data-lesson-id="'+lessonid+'"]').addClass("auto-scanned");
            //   console.log("Go to next lesson");
            //   gotoNextUnscannedLesson();
            // } else {
              $(".scanInfo").removeClass("d-none");
              $(".scanList").removeClass("d-none");
              $(".scanResults").addClass("d-none");        
              
            //}
        }
      });    
      
      $('.btn-startScan').click(function(){
          var scanIndex = $(this).data("index");
          runScan(scanIndex);
          //show result
          getresults_for_lesson(currentlessondata.lesson.id,scans[scanIndex].type)
  
      });
     
    }
    
    const gotoNextUnscannedLesson = function(scantype){
      //console.log("finding next lesson");
      if(auto_advance){
        var all_scanned = true;
        var found_next = false;
        var found_href = "";
        $('a.course-player__content-item__link').each(function(){
          if(!$(this).attr("data-auto-scanned") && !found_next){
            found_href = $(this).attr("href");
            found_next = true;
            //console.log("Found",$(this).attr("href"));
            all_scanned = false;
          }
        });
  
        //console.log("Done checking. All scanned: "+all_scanned)
        if(found_next){
  
          var timeleft = 10;
          autoScanNumberofLessons = $('a.course-player__content-item__link').length;
          var numScanned = $('a.course-player__content-item__link[data-auto-scanned]').length; 
         
          var etop = $('a.course-player__content-item__link[href="'+found_href+'"]').offset().top;
          $(".course-player__left-drawer").scrollTop(etop);    
  
          var downloadTimer = setInterval(function(){
            if(timeleft <= 0){
              clearInterval(downloadTimer);
              if(auto_advance){
                $('a.course-player__content-item__link[href="'+found_href+'"]').click(); 
              }
            }
            if(auto_advance){
            getresults_for_lesson(currentlessondata.lesson.id,scantype)    
            //console.log("progress: "+numScanned+" "+autoScanNumberofLessons);
              var progress_percent = numScanned/autoScanNumberofLessons*100;
              $("#scanProgressModal .progress-bar").css("width",progress_percent+"%");
            $("#scanProgressModal .progress-bar").text(numScanned+" of "+autoScanNumberofLessons);
                  
            $(".lesson_auto_scan_status .up-next-scan").html(' '+currentlessondata.lesson.name+' <br/><span class="text-muted fst-italic"> Scanning next lesson in '+timeleft+' seconds</span>')
            //console.log("clicking next lesson in "+timeleft+" secs");        
              
            }
            //document.getElementById("progressBar").value = 10 - timeleft;
            timeleft -= 1;
          }, 1000);
  
  
    //       setTimeout(function(){
  
    //       }, 15000)      
  
          //$(found_item).click();
        }
        if (all_scanned){
          //console.log("******* ALL DONE ********", results)
          auto_advance = false;
          $(".scanmenu").removeClass("d-none"); 
          $(".btn-stopAutoScan").addClass("d-none");      
          $(".lesson_auto_scan_status .info").html("");
          $(".lesson_auto_scan_status .up-next-scan").html("");
          autoScanFinished();
          
          
        }
  
        
      }
  
    }
    const checkAutoScanList = function(){
    
      if(auto_advance){
        // kickoff first scan
        var scanIndex = $('.btn-startScan').first().data("index");
          runScan(scanIndex);      
      }     
    }
    const scanSelf = function(){
      scrollListToTop();
      var html ="";    
      html += generate_scanlist("Guided Self Assessments","","This set of scans contains quick guided self assessments across a vareity of topics to help create a great course experience.",scans,"self-assess")
      
      $("#playerScan .content").data("result-type","self");
      $("#playerScan .content").html(html);
      scanListeners();
      
    }  
    const scanCourse = function(){
      scrollListToTop();
      var html ="";   
      html +='<style>.btn-back-to-welcome{display:block !important;}</style>';
      html += generate_scanlist("Course Best Practices Scan","7c75893bb21a41958cad7f0635ca3a5e","In this set of scans I will guide you through a set of best practices to help you create an awesome course experience. Choose a scan below to get my analysis and feedback",scans,"course")
      
      $("#playerScan .content").data("result-type","course");
      $("#playerScan .content").html(html);
      scanListeners();
      
    }
    
    
    const runAllScans = function(scantype){
      scans.forEach(function(item, index) {
        if (item.type==scantype){
          runScan(index);
        }
      });
      $('a[data-lesson-id="'+currentlessondata.lesson.id+'"]').attr("data-auto-scanned","true");
      gotoNextUnscannedLesson(scantype)
    }
  
    const scanVideo = function(data){
      if(auto_advance){
        runAllScans("video")
      } else {
        var html ="";    
        html += generate_scanlist("Video Lesson Scans","71ace5e2baa34d6cbbb8e6b9ea20b530","Listen to the video above to hear my general guidance on video lessons and then select one of the scans below to get personalized recommendations for this specfic lesson<br/><div class='alert alert-warning'>Please stop the video from playing so that it does not automatically go to the next lesson</div>",scans,"video")
        
        $("#playerScan .content").data("result-type","lesson");
        $("#playerScan .content").html(html);
        scanListeners();
        
      }
      
    }
  
    const scanText = function(data){
      if(auto_advance){
        runAllScans("text")
      } else {
  
        var html ="";    
        html += generate_scanlist("Text Lesson Scans","30f02b3550174d0682bc70fa7537b57c","Listen to the video above to hear my general guidance on text lessons and then select one of the scans below to get personalized recommendations for this specfic lesson",scans,"text")
  
        $("#playerScan .content").data("result-type","lesson");      
        $("#playerScan .content").html(html);
        scanListeners();
      }    
    }
  
    const scanPDF = function(data){
      if(auto_advance){
        runAllScans("pdf")
      } else {
      
      var html ="";    
      html += generate_scanlist("PDF Lesson Scans","","Listen to the video above to hear my general guidance on pdf lessons and then select one of the scans below to get personalized recommendations for this specfic lesson",scans,"pdf")
  
      $("#playerScan .content").data("result-type","lesson");      
      $("#playerScan .content").html(html);
      scanListeners();
      }    
    }  
    const scanDownload = function(data){
      if(auto_advance){
        runAllScans("download")
      } else {
      
      var html ="";    
      html += generate_scanlist("Download Lesson Scans","","Listen to the video above to hear my general guidance on text lessons and then select one of the scans below to get personalized recommendations for this specfic lesson",scans,"download")
  
      $("#playerScan .content").data("result-type","lesson");      
      $("#playerScan .content").html(html);
      scanListeners();
      }    
  
    }  
    
    const scanAudio = function(data){
      if(auto_advance){
        runAllScans("audio")
      } else {    
      var html ="";    
      html += generate_scanlist("Audio Lesson Scans","","Listen to the video above to hear my general guidance on audio lessons and then select one of the scans below to get personalized recommendations for this specfic lesson",scans,"audio")
      
      $("#playerScan .content").data("result-type","lesson");      
      $("#playerScan .content").html(html);
      scanListeners();
      }
  
    }   
    
    const scanPresentation = function(data){
      if(auto_advance){
        runAllScans("presentation")
      } else {    
      // check if first time ever or returning
      var html ="";    
      html += generate_scanlist("Presentation Lesson Scans","","Listen to the video above to hear my general guidance on presentation lessons and then select one of the scans below to get personalized recommendations for this specfic lesson",scans,"presentation")
      
      $("#playerScan .content").data("result-type","lesson");      
      $("#playerScan .content").html(html);
      scanListeners();
      }
  
    }    
    
    const scanMedia = function(data){
      if(auto_advance){
        runAllScans("media")
      } else {    
  
        var html ="";    
        html += generate_scanlist("Multimedia Lesson Scans","","Listen to the video above to hear my general guidance on multimedia lessons and then select one of the scans below to get personalized recommendations for this specfic lesson",scans,"media")
  
        $("#playerScan .content").data("result-type","lesson");      
        $("#playerScan .content").html(html);
        scanListeners();
      }    
  
    }   
  
    const scanQuiz = function(data){
      if(auto_advance){
        runAllScans("quiz")
      } else {    
      
      var html ="";    
      html += generate_scanlist("Quiz Lesson Scans","","Listen to the video above to hear my general guidance on quiz lessons and then select one of the scans below to get personalized recommendations for this specfic lesson",scans,"quiz")
      
      $("#playerScan .content").data("result-type","lesson");      
      $("#playerScan .content").html(html);
      scanListeners();
      }    
    } 
    
    const scanSurvey = function(data){
      if(auto_advance){
        runAllScans("survey")
      } else {    
      
      var html ="";    
      html += generate_scanlist("Survey Lesson Scans","","Listen to the video above to hear my general guidance on survey lessons and then select one of the scans below to get personalized recommendations for this specfic lesson",scans,"survey")
      
      $("#playerScan .content").data("result-type","lesson");      
      $("#playerScan .content").html(html);
      scanListeners();
      }    
    }  
    
    const scanAssignment = function(data){
      if(auto_advance){
        runAllScans("assignment")
      } else {    
      
      var html ="";    
      html += generate_scanlist("Assignment Lesson Scans","","Listen to the video above to hear my general guidance on assignment lessons and then select one of the scans below to get personalized recommendations for this specfic lesson",scans,"assignment")
      
      $("#playerScan .content").data("result-type","lesson");      
      $("#playerScan .content").html(html);
      scanListeners();
      }    
    }   
    
    const scanUnknown = function(data){
      
      var html ="";    
      html += generate_scanlist("Sorry, no scans available for this lesson type","","It looks like you reached a lesson type that we do not have scans for yet. Please try another lesson",scans,"unknown")
      
      $("#playerScan .content").data("result-type","unknown");    
      $("#playerScan .content").html(html);
      scanListeners();
  
    }  
    
    const showAutoScanResults = function(){
      $("#playerScan").addClass("show");
      scrollListToTop();    
      var html ="";    
      var stats = {
        danger:0,
        warning:0,
        success:0,
        info:0
      }
      var red_flags = [];
      results.forEach(function(result){
        if(result.status=="danger"){stats.danger+=1;red_flags.push(result)}
        if(result.status=="warning"){stats.warning+=1;}
        if(result.status=="success"){stats.success+=1;}
        if(result.status=="info"){stats.info+=1;}
      })
      var stats_html = "<p> <strong>Results Summary</strong><ul class='list-group'>";
      stats_html+="<li class='list-group-item'> You have <span class='badge text-bg-danger'>"+icon_alert_danger+" "+stats.danger+"</span> red flags.";
      stats_html+="<li class='list-group-item'> You have <span class='badge text-bg-warning'>"+icon_alert_warning+" "+stats.warning+"</span>  warnings.";
      stats_html+="<li class='list-group-item'> You have <span class='badge text-bg-success'>"+icon_alert_success+" "+stats.success+"</span>  scans that hit the sweet spot.";
      stats_html+="<li class='list-group-item'> You have <span class='badge text-bg-info'>"+icon_alert_info+" "+stats.info+"</span>  pro tips available.";
      stats_html += "</ul></p>"
      
      if(stats.danger>0){
      stats_html += "<p> <strong>Lessons Needing Immediate Attention</strong><ul class='list-group'>";
        red_flags.forEach(function(result){
          stats_html+="<li class='list-group-item'> <a class='lessonClick' data-lesson-id='"+result.lesson.id+"'>"+result.lesson.name+"</a>.";
          
        });
      stats_html += "</ul></p>"
        
      }
      
      html += generate_scanlist("Auto Scan Complete","7c75893bb21a41958cad7f0635ca3a5e","I just finished looking at all of your lessons and put some indicators next to the lessons about what I found. <br/><br/><span class='text-primary fw-bolder mt-2'>Click each of your lessons to see the detailed results for each lesson.</span> <br/>Here is a quick summary of the scan: "+stats_html+" ",scans,"auto-scan-complete")
      
      console.log("Results",results);
      
      $("#playerScan .content").data("result-type","auto-scan-result");
      $("#playerScan .content").html(html); 
      if(stats.danger>0){
        $(".lessonClick").click(function(){
          var lessonid = $(this).data("lesson-id");
          console.log("clicking:"+lessonid);
          if(lessonid==currentlessondata.lesson.id){
             scanLesson(currentlessondata);
           } else {
            $('a[data-lesson-id="'+lessonid+'"]').click();
                                  
          }
        })
      }
    }
    const autoScanFinished = function(){
      //close progress modal
      //console.log("hiding progress modal");
      autoScanCompleted = true;
      progressModal.hide();    
                var emoji_options = {
                    emojis: [
                                    "💥","🦸",
                                    ]
                }
                const jsConfetti = new JSConfetti();
        
                jsConfetti.addConfetti(emoji_options);      
      showAutoScanResults();
      scanListeners();
      
    }  
  
    
    const scanLesson = function(data){
      //console.log("Lesson Data",data);
       scrollListToTop();
      // identify lesson type
      if(auto_advance){
        if($(".course-player__content-header__title .lesson_auto_scan_status").length==0){
        $(".course-player__content-header__title").append("<span class='kapow-player lesson_auto_scan_status'><span class='info'></span><span class='up-next-scan'></span></span>")  
        }
        //$(".lesson_auto_scan_status .info").html('')
      }
      var lesson_type = data.lesson.default_lesson_type_label;
      switch(lesson_type) {
        case "Video":
          scanVideo(data);
          break;
        case "Text":
          scanText(data);
          break;
        case "PDF":
          scanPDF(data);
          break;  
        case "Download":
          scanDownload(data);
          break;         
        case "Audio":
          scanAudio(data);
          break; 
        case "Presentation":
          scanPresentation(data);
          break;
        case "Multimedia":
          scanMedia(data);
          break;        
        case "Quiz":
          scanQuiz(data);
          break;
        case "Survey":
          scanSurvey(data);
          break; 
        case "Assignment":
          scanAssignment(data);
          break;          
        default:
          scanUnknown(data);
      }    
    }  
    // Course player
    if (typeof CoursePlayerV2 !== "undefined") {
        var loaded = false
        var JSConfetti=function(){"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function i(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}function n(t){return+t.replace(/px/,"")}function s(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,n=Math.random()*(e-t)+t;return Math.floor(n*Math.pow(10,i))/Math.pow(10,i)}function o(t){return t[s(0,t.length)]}var a=["#fcf403","#62fc03","#f4fc03","#03e7fc","#03fca5","#a503fc","#fc03ad","#fc03c2"];function r(t){return Math.log(t)/Math.log(1920)}var h=function(){function e(i){t(this,e);var n=i.initialPosition,a=i.direction,h=i.confettiRadius,c=i.confettiColors,u=i.emojis,l=i.emojiSize,d=i.canvasWidth,f=s(.9,1.7,3)*r(d);this.confettiSpeed={x:f,y:f},this.finalConfettiSpeedX=s(.2,.6,3),this.rotationSpeed=u.length?.01:s(.03,.07,3)*r(d),this.dragForceCoefficient=s(5e-4,9e-4,6),this.radius={x:h,y:h},this.initialRadius=h,this.rotationAngle="left"===a?s(0,.2,3):s(-.2,0,3),this.emojiSize=l,this.emojiRotationAngle=s(0,2*Math.PI),this.radiusYUpdateDirection="down";var m="left"===a?s(82,15)*Math.PI/180:s(-15,-82)*Math.PI/180;this.absCos=Math.abs(Math.cos(m)),this.absSin=Math.abs(Math.sin(m));var v=s(-150,0),p={x:n.x+("left"===a?-v:v)*this.absCos,y:n.y-v*this.absSin};this.currentPosition=Object.assign({},p),this.initialPosition=Object.assign({},p),this.color=u.length?null:o(c),this.emoji=u.length?o(u):null,this.createdAt=(new Date).getTime(),this.direction=a}return i(e,[{key:"draw",value:function(t){var e=this.currentPosition,i=this.radius,n=this.color,s=this.emoji,o=this.rotationAngle,a=this.emojiRotationAngle,r=this.emojiSize,h=window.devicePixelRatio;n?(t.fillStyle=n,t.beginPath(),t.ellipse(e.x*h,e.y*h,i.x*h,i.y*h,o,0,2*Math.PI),t.fill()):s&&(t.font="".concat(r,"px serif"),t.save(),t.translate(h*e.x,h*e.y),t.rotate(a),t.textAlign="center",t.fillText(s,0,0),t.restore())}},{key:"updatePosition",value:function(t,e){var i=this.confettiSpeed,n=this.dragForceCoefficient,s=this.finalConfettiSpeedX,o=this.radiusYUpdateDirection,a=this.rotationSpeed,r=this.createdAt,h=this.direction,c=e-r;i.x>s&&(this.confettiSpeed.x-=n*t),this.currentPosition.x+=i.x*("left"===h?-this.absCos:this.absCos)*t,this.currentPosition.y=this.initialPosition.y-i.y*this.absSin*c+.00125*Math.pow(c,2)/2,this.rotationSpeed-=this.emoji?1e-4:1e-5*t,this.rotationSpeed<0&&(this.rotationSpeed=0),this.emoji?this.emojiRotationAngle+=this.rotationSpeed*t%(2*Math.PI):"down"===o?(this.radius.y-=t*a,this.radius.y<=0&&(this.radius.y=0,this.radiusYUpdateDirection="up")):(this.radius.y+=t*a,this.radius.y>=this.initialRadius&&(this.radius.y=this.initialRadius,this.radiusYUpdateDirection="down"))}},{key:"getIsVisibleOnCanvas",value:function(t){return this.currentPosition.y<t+100}}]),e}();function c(){var t=document.createElement("canvas");return t.style.position="fixed",t.style.width="100%",t.style.height="100%",t.style.top="0",t.style.left="0",t.style.zIndex="1000",t.style.pointerEvents="none",document.body.appendChild(t),t}function u(t){var e=t.confettiRadius,i=void 0===e?6:e,n=t.confettiNumber,s=void 0===n?t.confettiesNumber||(t.emojis?40:250):n,o=t.confettiColors,r=void 0===o?a:o,h=t.emojis,c=void 0===h?t.emojies||[]:h,u=t.emojiSize,l=void 0===u?80:u;return t.emojies&&console.error("emojies argument is deprecated, please use emojis instead"),t.confettiesNumber&&console.error("confettiesNumber argument is deprecated, please use confettiNumber instead"),{confettiRadius:i,confettiNumber:s,confettiColors:r,emojis:c,emojiSize:l}}var l=function(){function e(i){var n=this;t(this,e),this.canvasContext=i,this.shapes=[],this.promise=new Promise((function(t){return n.resolvePromise=t}))}return i(e,[{key:"getBatchCompletePromise",value:function(){return this.promise}},{key:"addShapes",value:function(){var t;(t=this.shapes).push.apply(t,arguments)}},{key:"complete",value:function(){var t;return!this.shapes.length&&(null===(t=this.resolvePromise)||void 0===t||t.call(this),!0)}},{key:"processShapes",value:function(t,e,i){var n=this,s=t.timeDelta,o=t.currentTime;this.shapes=this.shapes.filter((function(t){return t.updatePosition(s,o),t.draw(n.canvasContext),!i||t.getIsVisibleOnCanvas(e)}))}}]),e}();return function(){function e(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t(this,e),this.activeConfettiBatches=[],this.canvas=i.canvas||c(),this.canvasContext=this.canvas.getContext("2d"),this.requestAnimationFrameRequested=!1,this.lastUpdated=(new Date).getTime(),this.iterationIndex=0,this.loop=this.loop.bind(this),requestAnimationFrame(this.loop)}return i(e,[{key:"loop",value:function(){var t,e,i,s,o;this.requestAnimationFrameRequested=!1,t=this.canvas,e=window.devicePixelRatio,i=getComputedStyle(t),s=n(i.getPropertyValue("width")),o=n(i.getPropertyValue("height")),t.setAttribute("width",(s*e).toString()),t.setAttribute("height",(o*e).toString());var a=(new Date).getTime(),r=a-this.lastUpdated,h=this.canvas.offsetHeight,c=this.iterationIndex%10==0;this.activeConfettiBatches=this.activeConfettiBatches.filter((function(t){return t.processShapes({timeDelta:r,currentTime:a},h,c),!c||!t.complete()})),this.iterationIndex++,this.queueAnimationFrameIfNeeded(a)}},{key:"queueAnimationFrameIfNeeded",value:function(t){this.requestAnimationFrameRequested||this.activeConfettiBatches.length<1||(this.requestAnimationFrameRequested=!0,this.lastUpdated=t||(new Date).getTime(),requestAnimationFrame(this.loop))}},{key:"addConfetti",value:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=u(t),i=e.confettiRadius,n=e.confettiNumber,s=e.confettiColors,o=e.emojis,a=e.emojiSize,r=this.canvas.getBoundingClientRect(),c=r.width,d=r.height,f=5*d/7,m={x:0,y:f},v={x:c,y:f},p=new l(this.canvasContext),g=0;g<n/2;g++){var y=new h({initialPosition:m,direction:"right",confettiRadius:i,confettiColors:s,confettiNumber:n,emojis:o,emojiSize:a,canvasWidth:c}),C=new h({initialPosition:v,direction:"left",confettiRadius:i,confettiColors:s,confettiNumber:n,emojis:o,emojiSize:a,canvasWidth:c});p.addShapes(y,C)}return this.activeConfettiBatches.push(p),this.queueAnimationFrameIfNeeded(),p.getBatchCompletePromise()}},{key:"clearCanvas",value:function(){this.activeConfettiBatches=[]}}]),e}()}();    
        const jsConfetti = new JSConfetti();
        CoursePlayerV2.on("hooks:contentDidChange", function (data) {
          currentlessondata = data;
          /*
          var slug = "/courses/take/"+data.course.slug+"/"+data.lesson.slug;
          console.log("slug:"+slug);
          $('.course-player__content-item .active').attr("data-lesson-id",data.lesson.id);
          $('.content-item__progress--active a').attr("data-lesson-id",data.lesson.id);
          
          if($('.course-player__content-item .active .kapow-scan-status').length==0){$('.course-player__content-item .active').append('<div class="kapow-player kapow-scan-status"><span class="kapow-numscans"></span><span class="kapow-results"></span></div>')};
          if($('.content-item__progress--active a .kapow-scan-status').length==0){$('.content-item__progress--active a').append('<div class="kapow-player kapow-scan-status"><span class="kapow-numscans"></span><span class="kapow-results"></span></div>')};
          */
          // add lesson-id att
          $("a[href*='"+data.lesson.id+"']").attr("data-lesson-id",data.lesson.id);
          //$("a[href*='"+data.lesson.id+"']").attr("data-auto-scanned","false");
          // add scan status container
          
          if($("a[href*='"+data.lesson.id+"'] .kapow-scan-status").length==0){$("a[href*='"+data.lesson.id+"']").append('<div class="kapow-player kapow-scan-status"><span class="kapow-numscans"></span><span class="kapow-results"></span></div>')};
          
          
         //console.log("Player PowerScan Checking if Admin: "+$(".course-player__preview-bar").length);
        
          
          if($(".course-player__preview-bar").length>0){
            //console.log("Player PowerScan Activating");
            if(!loaded){
              var firstimeever = true;
              var playerscans = {started:false,scans:0};
  
              if (typeof(Storage) !== "undefined") {
                  // Code for localStorage
                  if(window.localStorage.getItem(storageKey)!==null){
                    firstimeever = false;
                  } 
  
              } 
              if(firstimeever){
                var emoji_options = {
                    emojis: [
                                    "💥","🦸",
                                    ]
                }
                jsConfetti.addConfetti(emoji_options);              
                
              }
              
              
              //console.log("Player PowerScan Loading Code");
              inject_css();
              inject_confetijs();
              inject_bsjs();
              inject_fap();
              inject_lottie();
              inject_tallyjs();
              window.setTimeout(() => {
                  inject_offcanvas_wrap();
  
                  loaded=true;
  
                  scanStart(data);
                  $(".btn-close").click(function(){
                    $("#playerScan").removeClass("show");
                  });             
                  $(".btn-autoscan").click(function(){
                    $("#playerScan").removeClass("show");
                    runFullAutoScan();
                  });   
  
                  $(".btn-restart").click(function(){
                    $("#playerScan").addClass("show");
                    //scanCourse();
                    runFullAutoScan();
                  });   
                  $(".btn-stopAutoScan").click(function(){
                    auto_advance = false;
                    $(".lesson_auto_scan_status .info").html("");
                    $(".lesson_auto_scan_status .up-next-scan").html("");
                    $(".scanmenu").removeClass("d-none"); 
                    $(".btn-stopAutoScan").addClass("d-none");
                  })
  
                  $(".btn-welcome").click(function(){
                    scanWelcome();
                  });  
                  $(".btn-back-to-welcome").click(function(){
                    scanWelcome();
                  })
              }, 1000);            
     
              
              
            } else {
              if($('#autoScan').is(':checked')&& !auto_advance){
                $("#playerScan").addClass("show");
              }  
              scanLesson(data);
                
              
            }
          }
          window.setTimeout(() => {
            
          }, 1000);
        });
        
      
    } else {
      // not course player
    }
  });
  
