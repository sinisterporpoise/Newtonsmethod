// This will get the relevant values
// from the HTMl page, convert the
// expressions into equations and
// then reiterate Netwon's method until
// four of the results are the same.

var calculate = document.getElementById('calculate');

//---------------------------------------------------------
//
// We only heed to conver the strings into their intial values
// here

function calc( fivalue, feqvalue, fdvalue) {	
	console.log(fivalue);
	console.log(feqvalue);
	console.log (fdvalue);
    var answer = eval(fivalue) - (eval(feqvalue)/eval(fdvalue));			// This is the starting value
	console.log('First answer is: ', answer);

	var  z = 1;
	

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
		  var answer = eval(answer) - (eval(feqvalue)/eval(fdvalue));

		  console.log ('Debugging information')
		  console.log('New Equation Value is: ', feqvalue);
		  console.log('New Derivative Value is: ',fdvalue);
		  console.log('Answer is', answer);

		  outputstr = "<p>Iteration " + z + " is : " + answer + "</p>";
		  document.getElementById("answer").innerHTML = outputstr;
		  z++;
  }

	
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
	eqvalue = eqvalue.replace(/[Xx]/g, ivalue);
	dvalue = dvalue.replace(/Xx/g, ivalue);
	
    calc (ivalue, eqvalue, dvalue)
}

if (addEventListener) {
  calculate.addEventListener("click", Newtons_Method, false);
} else {
  // They're using IE for some reason
  calculate.attachEvent("onclick", Newtons_Method);
}
