function calc(){	
	
	var years = parseInt(document.getElementById("years").value);
	var corpus = parseInt(document.getElementById("corpus").value);	
	var cagr = parseInt(document.getElementById("cagr").value);
	if (isNaN(corpus) || isNaN(years) || isNaN(cagr)){
		alert("Corpus and Expense amount are required for calculation.");
		return (false);
	}
		
	//alert(inflation);
	var table = document.getElementById("myTableData");
	table.style.visibility = 'visible';
	clearTable(table);
	
	for (var i=0; i < years; i++){
		var year = (1 + i);
				
		appreciation = (corpus)* (cagr/100)
		row = table.insertRow((1+i));
		row.insertCell(0).innerHTML = '<td align="left">'+year+'</td>';
		row.insertCell(1).innerHTML = '<td align="left">'+Math.round(appreciation).toLocaleString()+'</td>';
		corpus = (corpus + appreciation);
		row.insertCell(2).innerHTML = '<td align="left">'+Math.round(corpus).toLocaleString()+'</td>';		
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