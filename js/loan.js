function rightclickdis() {
	am = "Sorry...Right Click Is Disabled";
	bV = parseInt(navigator.appVersion)
	bNS = navigator.appname == "Netscape"
	bIE = navigator.appname == "Microsoft Internet Explorer"
	function nrc(e) {
		if (bNS && e.which > 1) {
			alert(am)
			return false

		} else if (bIE && (event.button > 1)) {
			alert(am)
			return false;
		}
	}
	document.onmousedown = nrc;
	if (document.layers)
		window.captureEvents(Event.MOUSEDOWN);
	if (bNS && bV < 5)
		window.onmousedown = nrc;
}

function RoundNumber(number) {
	with (Math) {
		//var result = (round(number * 100)) / 100;
		return round(number);
	}
}

function FormatNumber(number) {
	with (Math) {
		var fmt = "";
		var add = 9;
		fmt += number;
		for ( var i = 0; i < fmt.length; i++) {
			if (fmt.charAt(i) == ".") {
				add = i + 3;
				i = fmt.length;
			} else {
				fmt = fmt & "."
			}
		}
		fmt = fmt.substring(0, add);
		return fmt;
	}
}
function validateInputs(form) {
	a = form;
	if (a.loan_amount.value == "") {
		alert("Enter  the Amount");
		a.loan_amount.focus();
		a.loan_amount.select();
		return (false);
	}
	if (a.loan_amount.value) {
		s = a.loan_amount.value;
		if (parseFloat(s) == 0) {
			alert("Zeros are not allowed in Loan Amount ");
			a.loan_amount.value = '';
			a.loan_amount.focus();
			a.loan_amount.select();
			return (false);
		}
		if ((s.match(/[a-z A-Z]/)) != null) {
			alert("Enter Amount in numeric");
			a.loan_amount.value = '';
			a.loan_amount.focus();
			a.loan_amount.select();
			return (false);
		}
	}
	if (a.loan_rate.value == "") {
		alert("Enter Rate of Interest");
		a.loan_rate.focus();
		a.loan_rate.select();
		return (false);
	}
	if (a.loan_rate.value) {
		s = a.loan_rate.value;
		if ((s.match(/[a-z A-Z \- `  ! @ # $ % ^ & * ]/)) != null) {
			alert("Enter only  positive numerals for Interest Rate");
			a.loan_rate.value = '';
			a.loan_rate.focus();
			a.loan_rate.select();
			return (false);
		}
		if (parseFloat(s) == 0 || parseFloat(s) >= 100) {
			alert("Enter a valid interest rate - Range between 0.01 to 99.99");
			a.loan_rate.value = '';
			a.loan_rate.focus();
			a.loan_rate.select();
			return (false);
		}

		if ((s.indexOf(".", 0)) != (-1)) {
			s = s.substring(s.indexOf(".") + 1, s.length);
			if (s.length > 2) {
				alert("Only two decimal places are allowed in Interest Rate");
				a.loan_rate.value = '';
				a.loan_rate.focus();
				a.loan_rate.select();
				return (false);
			}
		}
	}
	if (a.loan_time.value == "") {
		alert("Enter the period");
		a.loan_time.focus();
		a.loan_time.select();
		return (false);
	}
	if (a.loan_time.value) {
		s = a.loan_time.value;
		if (parseFloat(s) == 0) {
			alert("Zeros are not allowed in No.of Installments");
			a.loan_time.value = '';
			a.loan_time.focus();
			a.loan_time.select();
			return (false);
		}
		if ((s.match(/[. a-z A-Z]/)) != null) {
			alert("Enter Period in numeric");
			a.loan_time.value = '';
			a.loan_time.focus();
			a.loan_time.select();
			return (false);
		}
	}
	return true;
}


function calculateEMI(form) {
	if (validateInputs(form)){
		var roi = form.loan_rate.value;
		var outstandingAmt = form.loan_amount.value;
		roi = roi/ 100.00	
		roi /= 12;	
		var pow = 1;
		for ( var j = 0; j < form.loan_time.value; j++){
			pow = pow * (1 + roi);			
		}				
		form.loan_emi.value = RoundNumber((outstandingAmt * pow * roi)/(pow - 1));			
		form.total_int.value = RoundNumber((form.loan_emi.value * form.loan_time.value)- outstandingAmt);		
	}
	// form.loan_emi.value=Math.ceil(form.loan_emi.value);
	// //form.total_int.value=Math.ceil(form.total_int.value);
}

function showAmortization(form){
	if (validateInputs(form)){
		var roi = form.loan_rate.value;
		roi = roi/ 100.00	
		roi /= 12;	
		var pow = 1;
		for ( var j = 0; j < form.loan_time.value; j++){
			pow = pow * (1 + roi);
		}
		var emi = RoundNumber((form.loan_amount.value * pow * roi)/(pow - 1));
		var table = document.getElementById("myTableData");
		var div = document.getElementById("divTable");
		div.style.visibility = 'visible';
		clearTable(table);
		var outstandingAmt = form.loan_amount.value;
		//alert(outstandingAmt);
		var intComponent = 0;
		var interestTotal = 0;
		var emiTotal = 0;
		var emiTextBoxId;
		var roiTextBoxId;
		var row;
		for ( var i = 1; i <= form.loan_time.value; i++){
			row = table.insertRow(i);			
	    	row.insertCell(0).innerHTML= outstandingAmt;
	    	emiTextBoxId = "emi"+i;
	    	roiTextBoxId = "roi"+i;	    	
	    	row.insertCell(1).innerHTML= '<input type="text" id='+emiTextBoxId+' value='+emi+'>'; 
	    	row.insertCell(2).innerHTML= '<input type="text" id='+roiTextBoxId+' value='+form.loan_rate.value+'>';	    	
	    	intComponent = RoundNumber(outstandingAmt*roi);
	    	row.insertCell(3).innerHTML= intComponent;
	        row.insertCell(4).innerHTML= (emi - intComponent);
	        outstandingAmt = (outstandingAmt - (emi - intComponent));
	        interestTotal = interestTotal + intComponent;
	        emiTotal = emiTotal + emi;
		}
		document.getElementById("emi_total").value = emiTotal;
		document.getElementById("interest_total").value = interestTotal;
	}
}

function recalculate(form){
	var table = document.getElementById("myTableData");	
	var rowcount = table.rows.length;
	var outstandingAmt = 1;
	var emiTextBoxId;
	var roiTextBoxId;
	var roi = 0;
	var emi = 0;
	var interestTotal = 0;
	var intComponent = 0;
	var emiTotal = 0;
	var row;	
	var i=1;
	for(; i <= rowcount &&  0 < outstandingAmt; i++ ){
        //alert("outstandingAmt: "+outstandingAmt);
		if (i == rowcount){
			break;
		}
		row = table.rows[i];		
		emiTextBoxId = "emi"+i;
    	roiTextBoxId = "roi"+i;    	
    	if (i == 1){
    		outstandingAmt = parseInt(row.cells[0].innerHTML); // read first value of principal amount
    	} else{
    		row.cells[0].innerHTML = outstandingAmt;// calculated value
    	}
		emi = document.getElementById(emiTextBoxId).value;    	
    	roi = document.getElementById(roiTextBoxId).value;    	
    	intComponent = RoundNumber(outstandingAmt*((roi/100)/12));    	    	
    	row.cells[3].innerHTML = intComponent;
    	row.cells[4].innerHTML = (emi - intComponent);
        outstandingAmt = (outstandingAmt - (emi - intComponent));// new principle
        interestTotal = interestTotal + intComponent;
        emiTotal = emiTotal + parseInt(emi);
	}	
	if (i < rowcount){
		//delete extra rows from the bottom
		for (var j = rowcount; (j > i); j--){
			table.deleteRow((j-1));
		}
	} else if (i == rowcount && outstandingAmt > 0){
		for ( ; outstandingAmt > 0 ; i++){
			row = table.insertRow(i);			
	    	row.insertCell(0).innerHTML= outstandingAmt;
	    	emiTextBoxId = "emi"+i;
	    	roiTextBoxId = "roi"+i;
	    	row.insertCell(1).innerHTML= '<input type="text" id='+emiTextBoxId+' value='+emi+'>'; 
	    	row.insertCell(2).innerHTML= '<input type="text" id='+roiTextBoxId+' value='+roi+'>';	    	
	    	intComponent = RoundNumber(outstandingAmt*((roi/100)/12));
	    	row.insertCell(3).innerHTML= intComponent;
	        row.insertCell(4).innerHTML= (emi - intComponent);
	        outstandingAmt = (outstandingAmt - (emi - intComponent));
	        interestTotal = interestTotal + intComponent;
	        emiTotal = emiTotal + parseInt(emi);
		}
	}
	//alert("emiTotal: "+ emiTotal + " emi: "+ emi +" outstandingAmt " + outstandingAmt+ " intComponent " +intComponent);
	var lastemi = (parseInt(emi) + outstandingAmt) ;
	//alert(lastemi);
	row.cells[1].innerHTML= '<input type="text" id='+emiTextBoxId+' value='+lastemi+'>';
	row.cells[4].innerHTML= (lastemi - intComponent);
	emiTotal = (emiTotal - emi + lastemi);
	document.getElementById("emi_total").value = emiTotal;
	document.getElementById("interest_total").value = interestTotal;
}

function clearTable(table){	
	var rowcount = table.rows.length;	
	for (var i= rowcount; i > 1; i--){		
		table.deleteRow((i-1));
	}	
}