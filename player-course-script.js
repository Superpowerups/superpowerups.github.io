/* 
<script>
const course_scripts = [
    {
      course_name: "abc",
      script_src: "https://www.domain.com/abc.js"
    },
    {
      course_name: "abc",
      script_src: "https://www.domain.com/style.css"
    },    
    {
      course_name: "xyz", 
      script_src: "https://www.domain.com/xyz.js"
    }
  ];
</script>
*/

$(document).ready(function() {
    if (!course_scripts) {
        // don;t do anything if the course_scripts does not exist
        console.log("Warning: course_scripts not found")
        return; 
    }    
    let did_load = false;


      function injectScripts(courseName) {
        console.log("Looking for scripts "+courseName);
        const matches = course_scripts.filter(c => c.course_name === courseName);
      
        matches.forEach(course => {
            
          const url = new URL(course.script_src);
          const extension = url.pathname.split('.').pop();
          console.log("Match: "+url);
          if (extension === 'js') {
            const script = document.createElement('script');
            script.src = course.script_src;
            document.body.appendChild(script);
          } else if (extension === 'css') {  
            const link = document.createElement('link');
            link.href = course.script_src;
            link.rel = 'stylesheet'; 
            document.head.appendChild(link);
          }
      
        });
      
      }     

    // Only execCourse player
    if(typeof(CoursePlayerV2) !== 'undefined') {
              
        CoursePlayerV2.on('hooks:contentDidChange', function(data) {
            // this triggers on each lesson 
            // we need this to get the course name
            // but only load script once
            console.log(data)
            if(!did_load){
                injectScripts(data.course.name)
            }
            did_load = true;
        });
    }
});