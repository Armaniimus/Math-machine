//data storage
var previous_clc = []; //	used to store previous i inputs when using  +-* or /
var lastline = []; // used for the C function
var lastchar = [];	// used to store characters
var full_num_mem = [];	// used to stor completed characters
var previoustype = []; // used to store previous type
var lastlinebool = [];
var txt = ""; // currently shown

//counters
var clc = 0; // counter last character
var cpt = 0;	// counter previous type
var cll = 0; // counter last line
var cfnm = 0; // counter full number memory

//function data
var type = 0; // used to store divide multiply add and subtraction
var userfunc = 0;
var usernumber = 0; // defines number for the add number functions
var bool = 2; // 3=after_math   2=start   1=function  0=number
var buff_one = 0;
var buff_two = 0;
var temp = "A";
var i = 0;
var topline = "";
var test = "";

// character storage
var comma = ".";
var addition = "+";
var subtract = "-";
var multiply = "*";
var divide = "/";

//////////////////////////////////////////////////////////////////////////////////////

function reset() {

	//Data reset
	previous_clc.splice(0,previous_clc.length);
	lastchar.splice(0,lastchar.length);
	lastline.splice(0,lastline.length);
	previoustype.splice(0,previoustype.length);
	full_num_mem.splice(0,full_num_mem.length);
	lastlinebool.splice(0,lastlinebool.length);

	// counter reset
	cfnm = 0;
	cpt = 0;
	cll = 0;	
	clc = 0;

	//funtion data reset
	type = 0;
	temp = "A";
	topline = "";
	test = "";


	if (bool < 4) {
		reset_two();
	}
}
function reset_two() {

	//clear display
	txt = "";
	document.getElementById("display").innerHTML = txt;

	//function data reset
	bool = 2;

}

function deletelastline() {
	if (cll > 0) {
		cll --;

		if (! lastline[cll]*1 > 0 || ! lastline[cll]*1 < 2) {
			cfnm = cfnm - 1;
			full_num_mem.splice(cfnm,1);
		}
		// remove last dataslot
		clc = previous_clc[cll];
		cpt --;
		type = previoustype[cpt];
		txt = lastline[cll];
		bool = lastlinebool[cll];
		document.getElementById("display").innerHTML = txt;
	}
}

function deletelastcharacter() {
	if (bool == 3 || bool == 1) {
		//do nothing
	}
	else if (clc > 0) {
		clc --;
		txt = lastchar[clc];
		document.getElementById("display").innerHTML = txt;
	}
}

//////////////////////////////////////////////////////////////////////
function add_number() {
	if (bool == 3) {
		//do nothing
	}
	else {
		//checks for a function
		if (bool == 1) {
			//saves data for math or error correction
			lastline[cll] = txt;
			lastlinebool[cll] = bool;
			cll ++;
			previoustype[cpt] = type;
			cpt ++;
			type = 0;

			// clears user ui
			txt = "";
			document.getElementById("display").innerHTML = txt;

		}

		// saves data for error correction
		lastchar[clc] = txt;
		clc ++;

		//returns to ui
		txt += usernumber;
		document.getElementById("display").innerHTML = txt;


		bool = 0; // bool on 0 is a number
	}	
}

function input_one() {
	usernumber = 1;
	add_number();
}
function input_two() {
	usernumber = 2;
	add_number();
}
function input_three() {
	usernumber = 3;
	add_number();
}
function input_four() {
	usernumber = 4;
	add_number();
}
function input_five() {
	usernumber = 5;
	add_number();
}
function input_six() {
	usernumber = 6;
	add_number();
}
function input_seven() {
	usernumber = 7;
	add_number();
}
function input_eight() {
	usernumber = 8;
	add_number();
}
function input_nine() {
	usernumber = 9;
	add_number();
}
function input_zero() {
	usernumber = 0;
	add_number();
}
function input_comma() {
	//saves data
	lastchar[clc] = txt;
	clc ++;

	//add comma and return to ui
	txt += comma;
	document.getElementById("display").innerHTML = txt;

}

//////////////////////////////////////////////////////////////

function add_a_function() {
	//checks for a number or a recent math
	if (bool == 0 || bool == 3) {
		full_num_mem[cfnm] = txt;
		cfnm ++;
	}

	//prevents double function storage
	if ( bool == 1 ) {
		//returnes to the UI
		txt = userfunc;
		document.getElementById("display").innerHTML = txt;
		bool = 1; // bool defines a function

	}
	//checks for number or recent math
	else if (bool == 0 || bool == 3) {

		//Saves data for math or error correction
		previous_clc[cll] = clc;
		clc = 0;
		lastline[cll] = txt;
		lastlinebool[cll] = bool;
		cll ++;

		//returnes to the UI
		txt = userfunc;
		document.getElementById("display").innerHTML = txt;
		bool = 1; // bool is a string
	}
}
// translate type to userfunc
function mathchar() {
	if (type == 1) {
		userfunc = addition;
		}
		else if (type == 2) {
			userfunc = subtract;
		}
		else if (type == 3) {
			userfunc = divide;
		}
		else if (type == 4) {
			userfunc = multiply;
		}
	}

function input_add() {
	type = 1;
	mathchar();
	add_a_function();

}
function input_subtract() {
	type = 2;
	mathchar();
	add_a_function();

}
function input_divide() {
	type = 3;
	mathchar();
	add_a_function();

}
function input_multiply() {
	type = 4;
	mathchar();
	add_a_function();

}

///////////////////////////////////////////////////////////////////////

function input_showmath() {

	//prevents errors due to lack of numbers for the calculation.
	if (bool == 3 || cfnm <= 0 ) {
		//do nothing
	}	
	// new math core
	else if (bool < 3 && ! bool == 1) {
		if (bool == 0) {
			full_num_mem[cfnm] = txt;
			cfnm ++;
		}
		//prepare for loop
		bool = cfnm;
		cfnm = 0;
		cpt = 0;		

		//runs the math for multible numbers
		for (i = bool; 1<i; i--) {

			//decides how to run the numbers
			type = previoustype[cpt];

			// converts array data to numbers
			if (temp == "A") {
				buff_one = parseFloat(full_num_mem[cfnm]);
				topline = (full_num_mem[cfnm]);
			}
			else {
				buff_one = temp;
			}	
			buff_two = parseFloat(full_num_mem[cfnm+1]);

			//this does the actual math
			if (type == 1) {
				txt = buff_one + buff_two;
			}
			else if (type == 2) {
				txt = buff_one - buff_two;
			}
			else if (type == 3) {
				txt = buff_one / buff_two;
			}
			else if (type = 4) {
				txt = buff_one * buff_two;
			}
			mathchar();
			topline += userfunc + buff_two;


			//prepare or next math
			temp = txt;
			cpt ++;
			cfnm ++;
		}
		//txt = txt.toFixed(0);
		topline += "=" +  txt;

		//return to gui
		document.getElementById("display").innerHTML = topline + "<br />";

		document.getElementById("display").innerHTML += "<h3>"+txt+ "</h3>";

		// reset error correction and indentify as after math
		bool = 4;
		reset();
		bool = 3;
	}
}