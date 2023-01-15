
// This will get the relevant values
// from the HTMl page, convert the
// expressions into equations and
// then reiterate Netwon's method until
// four of the results are the same.

var calculate = document.getElementById('calculate');

//-------------------------------------------------------------
//
// We only heed to conver the strings into their intial values
// here
//
//---------------------------------------------------------------

function calc( fivalue, feqvalue, fdvalue) {	
	
	let fivalue2 =  parseInt(fivalue);
	let feqvalue2 = Function("return " + feqvalue)();
	let fdvalue2 = Function("return " + fdvalue)();
	let answers = []
	
	
    	var answer = fivalue2 - (feqvalue2 / fdvalue2)		// This is the starting value
    
	
	var  z = 1;
	
	// Store the result in an array and subtract z by one for the index value
	answers[z-1] = answer;
	

	// Let's start this whole thing

	while (z <= 10) {

		  // Get the initial naswer for the Newton's method process
		  // We will need this to calculate the next answer.
		  // We need to replace it with the new value before doing the calcuations

		  feqvalue = "";
		  fdvalue = "";
		  feqvalue = document.getElementById('eqvalue').value;
		  fdvalue = document.getElementById('dvalue').value;
		  
		  
		  // Make sure that we replace it for polynomials that take the form of 5x**2
		  feqvalue = feqvalue.replace(/(-?[0-9]*)[Xx]/g, "$1*" + '(' + answer + ')');
		  feqvalue = feqvalue.replace(/\+\s*\*/g, "+");
		  fdvalue = fdvalue.replace(/(-?[0-9]*)[Xx]/g, "$1*" + '(' + answer + ')');
		  fdvalue = fdvalue.replace(/\+\s*\*/g, "+");
	

	
		  // Now do the same for naked polynoials like x^2 + x + 3
		  feqvalue = feqvalue.replace(/[Xx]/g, answer);
		  fdvalue = fdvalue.replace(/[Xx]/g, answer);	

			
		  // Do the calculation
		  feqvalue2 = Function("return " + feqvalue)();
		  fdvalue2 = Function("return " + fdvalue)();
		  answer = answer - (feqvalue2 / fdvalue2);
		  answers[z-1] = answer;
		  console.log(answer);
		  
		  feqvalue2 = 0;
		  fdvalue2 = 0;

		 
		  z++;
		  
		  
		
  }

	  // Now let's write everyting out
	  	   newstr = "<br><br><br><table>";
	  	  
	  	  
	  	   for (z = 1; z <= 10; z++) {
		      newstr += "<tr><td>Iteration " + z + " is :</td><td> " + answers[z-1] + "</td></tr>";
		   	
		   }
		  outputstr = newstr;
		  document.getElementById("answer").innerHTML = outputstr + "</table>";
} // End Calc function
  
  
  
function Newtons_Method(e) {
	
	e.preventDefault();
	
	try { 
		var ivalue = document.getElementById("ivalue").value;
		var eqvalue = document.getElementById("eqvalue").value;
		var dvalue = document.getElementById("dvalue").value;

	} catch {
		var innerAnswer = document.getElementById('inneranswer');
		inneranswer.innerHTML = '<p style = "color:red">Error interpreting values</p>';
	}
	
	// Evaluate 5x style expressions and replace with * ivalue.
	eqvalue = eqvalue.replace(/(-?[0-9]*)[Xx]/g, "$1*" + ivalue);
	eqvalue = eqvalue.replace(/\+\s*\*/g, "+");
	dvalue = dvalue.replace(/(-?[0-9]*)[Xx]/g, "$1*" + ivalue);
	dvalue = dvalue.replace(/\+\s*\*/g, "+");
	
	// Now do the same for naked polynoials like x^2 + x + 3
	eqvalue = eqvalue.replace(/^[Xx]/g, ivalue);
	dvalue = dvalue.replace(/^[Xx]/g, ivalue);
	
    calc (ivalue, eqvalue, dvalue)
}

if (addEventListener) {
  calculate.addEventListener("click", Newtons_Method, false);
} else {
  // They're using IE for some reason
  calculate.attachEvent("onclick", Newtons_Method);
}
