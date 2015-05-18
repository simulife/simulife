
//startJava
function startJava()
{
	runMode = 'simulateJava';
	clearPage();
	startJavaModelSimulator();
}

//DWR
function startJavaModelSimulator(){
	ModelInvoker.startModelTestSimulation();
}
