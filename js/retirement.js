function calc(){	
	var age = parseInt(document.getElementById("age").value);
	var year = parseInt(document.getElementById("year").value);
	var corpus = parseInt(document.getElementById("corpus").value);	
	var expense = parseInt(document.getElementById("expense").value);
	if (isNaN(corpus) || isNaN(expense)){
		alert("Corpus and Expense amount are required for calculation.");
		return (false);
	}
	var inflation = parseInt(document.getElementById("inflation").value);
	var cagr = parseInt(document.getElementById("cagr").value);
	//alert(inflation);
	var table = document.getElementById("myTableData");
	table.style.visibility = 'visible';
	clearTable(table);
	var newAge;
	var newYear;
	
	for (var i=0; corpus > 0; i++){
		newAge = (age + i);
		newYear = (year + i);
		
		appreciation = (corpus - expense)* (cagr/100)
		row = table.insertRow((1+i));
		row.insertCell(0).innerHTML = '<td align="left">'+newAge+'</td>';
		row.insertCell(1).innerHTML = '<td align="left">'+newYear+'</td>';
		row.insertCell(2).innerHTML = '<td align="left">'+Math.round(corpus).toLocaleString()+'</td>';
		row.insertCell(3).innerHTML = '<td align="left">'+Math.round(expense).toLocaleString()+'</td>';
		row.insertCell(4).innerHTML = '<td align="left">'+Math.round(appreciation).toLocaleString()+'</td>';
			
		corpus = (corpus - expense) + appreciation;
		expense = expense * (1 + (inflation/100))
		if( newAge > 199){
			alert("Voila!! you have more than you would ever need. Cheers!!");
			break;
		}
	}
	document.getElementById("tableDataDiv").hidden.value = "false" ;
}

function clearTable(table){
	//alert("inside clear table?");
	var rowcount = table.rows.length;	
	for (var i= rowcount; i > 1; i--){
		//alert(rowcount);
		//alert("i: "+i);
		table.deleteRow((i-1));
	}
	//alert("cleared?");
	
}