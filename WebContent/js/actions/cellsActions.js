

function killCell(cellType, cellId)
{
	var msg = "killCell:" + cellType + ":" + cellId + ":1";		//amount = 1
	SocketHandler.sendMessage(msg);
}

function getCellDetails(cellType, cellId)
{
	var msg = "cellDetails:" + cellType + ":" + cellId;		
	SocketHandler.sendMessage(msg);
}

function createNewCell(type, x, y, z, amount)
{
	var msg = "newCell:" + type + ":" + x + ":" + y + ":" + z + ":" + amount;
	SocketHandler.sendMessage(msg);
}

function killCells(type, amount)
{
	var msg = "killCell:" + type + ":-1:" + amount;
	SocketHandler.sendMessage(msg);
}

function generateEvent(cellType, cellId, event)
{
	var msg = "generateEvent:" + cellType + ":" + cellId + ":" + event;
	SocketHandler.sendMessage(msg);
}

function changeParameters(cellType, cellId, paramName, paramValue)
{
	var msg = "cellParameter:" + cellType + ":" + cellId + ":" + paramName + ":" + paramValue;
	SocketHandler.sendMessage(msg);
}

