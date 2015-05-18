
//DWR 
function getNewGuiObjects()
{
	var sessionId = getSessionId();
	
	if(goOn()==true){
		//NewObjectsGetter.getNewObjects(addNewCells);
		NewObjectsGetter.getNewObjects(sessionId, addNewCells);
	}
}
		
//addNewCells
function addNewCells(newCells)
{
	if(newCells==null || newCells.length<=0){
		return;
	}
	for (var i=0;i<newCells.length;i++)
	{
		handleElement(newCells[i]);
	}
}

//getSessionId
function getSessionId()
{
	var cky = document.cookie;
	if(cky==null || cky=='undefined'){
		return null;
	}
	var sessionIDindex = cky.indexOf("DWRSESSIONID=");
	var ckyAfterSessionId = cky.substring(sessionIDindex + "DWRSESSIONID=".length);
	var smicIndex = ckyAfterSessionId.indexOf(";");
	var sessionID = ckyAfterSessionId.substring(0, smicIndex);
	
	//alert(sessionID);
	return sessionID;
}

