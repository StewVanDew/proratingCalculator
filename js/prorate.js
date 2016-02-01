
//this function will run on page load

//jquery function to return the user data and add a event listener for an onclick function.
function calcProrating(currentPlan, billDate){

    //Variables
    var months = {
    january:{
        days: 31
    },
    february:{
        days: 29
    },
    march:{
        days: 31
    },
    april: {
        days:30
    },
    may: {
        days:31
    },
    june: {
        days:30
    },
    july: {
        days:31
    },
    august: {
        days:31
    },
    september: {
        days:30
    },
    october: {
        days:31
    },
    november: {
        days:30
    },
    december: {
        days:31
    }
}

    var monthdays = 0;
    var currentMonth = "";
    var totalPlanData = 0;
    var d = new Date();
    var currentDay = d.getDate();
    //Function to get the current month and return the amount of days in the monht
    //to be used to calculate the data per day
    (function(){
        var month = d.getMonth();
        if(month === 0){
            currentMonth = "january";
            monthdays = months.january.days;
        }else if(month === 1){
            currentMonth = "february";
            monthdays = months.february.days;
        }else if(month === 2){
            currentMonth = "march";
            monthdays = months.march.days;
        }else if(month === 3){
            currentMonth = "april";
            monthdays = months.april.days;
        }else if(month === 4){
            currentMonth = "may";
            monthdays = months.may.days;
        }else if(month === 5){
            currentMonth = "june";
            monthdays = months.june.days;
        }else if(month === 6){
            currentMonth = "july";
            monthdays = months.july.days;
        }else if(month === 7){
            currentMonth = "august";
            monthdays = months.august.days;
        }else if(month === 8){
            currentMonth = "september";
            monthdays = months.september.days;
        }else if(month === 9){
            currentMonth = "october";
            monthdays = months.october.days;
        }else if(month === 10){
            currentMonth = "november";
            monthdays = months.november.days;
        }else if(month === 11){
            currentMonth = "december";
            monthdays = months.december.days;
        }else{
            return;
        }

    })();

    (function(){
        if(currentPlan === "ult65"){
            totalPlanData = 1000;
            currentDisplayPlan = "Ultimate 65";
        }else if(currentPlan === "ult75"){
            totalPlanData = 10000;
            currentDisplayPlan = "Ultimate 75";
        }else if(currentPlan === "ult90"){
            totalPlanData = 13000;
            currentDisplayPlan = "Ultimate 90";

        }else{
            totalPlanData = 15000;
            currentDisplayPlan = "Ultimate 105";

        }
    })();



        var dataPerDay = totalPlanData / monthdays;

        if(currentDay < billDate){
                    var daysTillBill = (billDate - currentDay).toFixed(0);
            }else{
                    var daysTillBill = ((monthdays - currentDay) + billDate).toFixed(0);

            }

    var dataLeft = (daysTillBill * dataPerDay).toFixed(0);


    var dataLeftOver = totalPlanData - dataLeft;
   document.getElementById("disPlan").innerHTML = currentDisplayPlan;
   document.getElementById("disBillDate").innerHTML = billDate;
   document.getElementById("disDataLeft").innerHTML = dataLeft.toString();


                    (function(){

						var doughnutChartData = [
							{
								value: dataLeft,
								color : "#46BFBD",
                                label: 'Data till next bill date'
							},
							{
								value : dataLeftOver,
                                color:"#F7464A",
                                label: 'Lost prorated data'

							}
						];

						var globalGraphSettings = {


                        animation : Modernizr.canvas


                        };


						function showDoughnutChart(){
							var ctx = document.getElementById("doughnutChartCanvas").getContext("2d");
							new Chart(ctx).Doughnut(doughnutChartData,globalGraphSettings);

						}

						$('#doughnutChart').appear( function(){ $(this).css({ opacity: 1 }); setTimeout(showDoughnutChart,300); },{accX: 0, accY: -155},'easeInCubic');
                        $('#results').css({'display': 'block', 'visibility': 'visible'});
					})();

}


$(function(){
    $("#submit").click(function(){

        //Get current plan from user
       var currentPlan = $('#plan:checked').val();
        //get bill date from user
       var userDate = $('#billDate:checked').val();
       var billDate = parseInt(userDate);
        calcProrating(currentPlan,billDate);

        $('#modal').hide();
    });
});
