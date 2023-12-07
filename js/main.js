const currentDate = new Date();
$(document).ready(function(){
    $("#Year").attr("max", currentDate.getFullYear())
    getQuery();
})


$(".main-card").submit(function(event){
    let bDay = $("#Day").val();
    let bMonth = $("#Month").val();
    let bYear = $("#Year").val();
    let dateString = bYear.toString() + "-" + bMonth.toString() + "-" + bDay.toString();
    let birthday = new Date(dateString);
    let year = currentDate.getFullYear();
    let month = 1 + currentDate.getMonth();
    let day = currentDate.getDate();
    console.log(currentDate);
    console.log(birthday);
    event.preventDefault();
    if (this.checkValidity() === false){
      event.stopPropagation();
      
       $(".form-control").toArray().forEach(input =>{
         if($(input).is(":invalid")){
             $(input).parent().find(".form-label").css("color", "hsl(0, 100%, 67%)");
             changeInputLabelColorOnKey(input, birthday);
            
         }
         else{
           $(input).parent().find(".form-label").css("color", "black");
           changeInputLabelColorOnKey(input, birthday);
         }
       })
    }else if(currentDate < birthday){
        console.log(true)
        $(".form-control").toArray().forEach(input =>{
            $(input).addClass("is-invalid");
            
        })
        
    }
    else{
        event.stopPropagation();
       
        
        let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let getDays
        let getYears
        let getMonths

        if (bDay > day){
            day = day + months[month -1];
            month = month - 1;
        }
        if (bMonth > month){
            month = month + 12;
            year = year - 1
        }
        getDays = day - bDay;
        getMonths = month - bMonth;
        getYears = year - bYear;
        if(getYears === 1){
            $("#year-heading").text("year")
        }else{
             $("#year-heading").text("years");
        }if (getMonths === 1) {
          $("#month-heading").text("month");
        } else {
          $("#month-heading").text("months");
        }if (getDays === 1) {
          $("#day-heading").text("day");
        } else {
          $("#day-heading").text("days");
        }
         $("#year-value").attr("data-target",getYears);
         $("#month-value").attr("data-target",getMonths);
         $("#day-value").attr("data-target",getDays);
         countUpAnim();
         $(".invalid-feedback").toArray().forEach((feedback) => {
             $(feedback).hide();
           });
    }
    $(this).addClass("was-validated");
})
getQuery = () =>{
    let buttonQuery = window.matchMedia("(max-width : 576px)");
    if (buttonQuery.matches) {
        $(".calculate-button svg").attr("width", "32");
         $(".calculate-button svg").attr("height", "32");
    }
    else{
      $(".calculate-button svg").attr("width", "40");
      $(".calculate-button svg").attr("height", "40");  
    }
}

countUpAnim = () =>{
    
    let interval = 200;
    $(".date-values").toArray().forEach((valueDisplay) => {
        let startValue = 0;
        let endValue = parseInt($(valueDisplay).attr("data-target"));
        let duration = Math.floor(interval / endValue);
        let counter = setInterval(function () {
            if(endValue === 0){
                clearInterval(counter);
                $(valueDisplay).text(startValue);
            }else{
                startValue += 1;
                $(valueDisplay).text(startValue);
                if (startValue == endValue) {
                  clearInterval(counter);
                }
            }
          
        }, duration);
      });
  
}

changeInputLabelColorOnKey = (input, birthday) =>{
     $(input).keyup(function () {
       if ($(input).is(":invalid")) {
         $(input).parent().find(".form-label").css("color", "hsl(0, 100%, 67%)");
         
       } 
       else if($(input).is(":valid")) {
         $(input).parent().find(".form-label").css("color", "black");
         $(input).removeClass("is-invalid");
         
       }

     });
   
}
