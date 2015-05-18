
//stopSimulife
function stopSimulife()
{
	stopSocketHandler();
	stopModel();
}

//DWR
function stopSocketHandler(){
	SocketHandler.stopSocketGetter();
}

function stopModel(){
	ModelInvoker.stopModel();
}
