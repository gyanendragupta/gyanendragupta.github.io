function calcCAGR(){
	var table = document.getElementById("myTableData");
	var rowCount = table.rows.length;
	var outdate = new Date(document.getElementById("asOnDate").value);
	var cagr = document.getElementById("cagr").value	
	var total=0;
	var investment = 0;
	for (var i=1; i < rowCount; i++){
		var indateId = "inDate"+i;		
		var invalId = "inVal"+i;
		var indate = new Date(document.getElementById(indateId).value);		
		var principle = document.getElementById(invalId).value;
		var days = (outdate - indate)/86400000;
		//alert(days);
		//alert(Math.pow((1+(cagr/100)),days/365));
		var compoundVal = ((Math.pow(1+(cagr/100),days/365))* principle);
		total = total+compoundVal;
		//alert("investment before: "+investment);
		investment = investment + parseInt(principle);
		//alert("investment after: "+investment);
		//alert("i is "+i);	
	}
	document.getElementById("totalVal").value=(Math.round(total)).toLocaleString();
	document.getElementById("totalInv").value=investment.toLocaleString();
}

function clear(obj){

}

function addRow() {		 
	var table = document.getElementById("myTableData");
    var rowCount = table.rows.length;
    //alert("row count in table"+rowCount);
    var row;    
    var numOfRows = document.getElementById("numOfRows").value;
    var inDateId;
    var prevInDate;
    var inValId;
    var dateToSet;
    var defaultInVal = 1000;
    var prevValId;
    if(rowCount >= 2){
    	prevDateId = "inDate"+(rowCount-1);
    	prevValId = "inVal"+(rowCount-1);
    	//alert("prevDateId :"+prevDateId);
    	//alert("prevInDate before :"+prevInDate);
    	//alert(document.getElementById(prevDateId));
    	prevInDate = document.getElementById(prevDateId).value;
    	defaultInVal = document.getElementById(prevValId).value;
    	//alert("prevInDate after :"+prevInDate);
    }
    for (var i=0; i<numOfRows; i++){
    	inDateId = "inDate"+(rowCount+i);
    	//alert("inDateId: "+inDateId);
    	inValId = "inVal"+(rowCount+i);
    	row = table.insertRow((rowCount+i));
    	row.insertCell(0).innerHTML= '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
    	dateToSet = getDate(prevInDate, rowCount+i);//if first row set today's date, else based on selected frequency 
    	row.insertCell(1).innerHTML= '<input id='+inDateId+' type="text" value='+dateToSet+'>';
        row.insertCell(2).innerHTML= '<input id='+inValId+' type="text" value='+defaultInVal+'>';
        prevInDate = dateToSet;
    }    
}

function deleteRow(obj) {
	 
	var index = obj.parentNode.parentNode.rowIndex;
	var table = document.getElementById("myTableData");
	table.deleteRow(index);
	
}
function getDate(prevInDate, count){
	var dateToReturn;
	var freq = document.getElementById("frequency").value;
	//alert(freq);
	if (count == 1){
		dateToReturn = getDateToday();//first row created on page load will have today's date
	} else{		
		switch(freq) {
	    case "ann":
	    	dateToReturn = changeDate(prevInDate, 1, 0);
	        break;
	    case "hfy":
	    	dateToReturn = changeDate(prevInDate, 0, 6);
	        break;
	    case "qtr":
	    	dateToReturn = changeDate(prevInDate, 0, 3);
	        break;
	    case "mth":
	    	dateToReturn = changeDate(prevInDate, 0, 1);
	        break;
	    default:
	    	dateToReturn = getDateToday();
		}		
	}	
	return dateToReturn;
}

function getDateToday(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	today = yyyy+'-'+mm+'-'+dd;
	return today;	
}

function changeDate(prevInDate, yearToAdd, monthToAdd){
	var previousDate = new Date(prevInDate);
	//alert("previousDate :"+previousDate);
	if (yearToAdd != 0){
		//alert("previousDate.getFullYear():"+previousDate.getFullYear());
		previousDate.setFullYear((previousDate.getFullYear() + 1));
		//alert("previousDate.getFullYear() after year change:"+previousDate.getFullYear());
	} else {
		var monthCount = previousDate.getMonth() + monthToAdd;
		if (monthCount <= 11){
			previousDate.setMonth (monthCount);
		} else {
			previousDate.setMonth (monthCount-12);
			previousDate.setFullYear (previousDate.getFullYear() + 1);
		}		
	}
	
	var dd = previousDate.getDate();
	var mm = previousDate.getMonth()+1; //January is 0!
	var yyyy = previousDate.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	} 

	if(mm<10) {
	    mm='0'+mm
	} 

	previousDate = yyyy+'-'+mm+'-'+dd;
	return previousDate;	
}

function setCurrentDate(id){
	var field = document.getElementById(id);
	field.value = getDateToday();
}