---
layout: '../layouts/Base.astro'
---

```html
<script>
    // This will hide the C&C button for any Multimedia Lesson that 
    // has 'Quiz' in the name
$(document).ready(function(){
    if(typeof(CoursePlayerV2) !== 'undefined') {
      CoursePlayerV2.on('hooks:contentDidChange', function(data) {
            // hide C&C button when multimedia and lesson name contains Quiz
            if (data.lesson.contentable_type == "Iframe" && data.lesson.name.indexOf("Quiz") !== -1) {
                $('#course-player-footer button').hide();
            } else {
                $('#course-player-footer button').show();
            }            
      });
    }    
})    
</script>
```
