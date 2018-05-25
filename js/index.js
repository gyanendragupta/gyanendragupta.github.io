function calcCAGR(){
var indate = new Date(document.getElementById("inDate").value);
var outdate = new Date(document.getElementById("outDate").value);
var days = (outdate - indate)/86400000;
var inval = document.getElementById("inVal").value;
var outval = document.getElementById("outVal").value;

var cagr = (Math.pow(outval/inval,366/days)-1)*100;
document.getElementById("cagr").value=cagr;
}

function clear(obj){

}
