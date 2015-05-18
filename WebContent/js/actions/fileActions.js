
//startFile
function startFile()
{
	runMode = 'simulateFile'; 
	modelHandled=false;
	shouldCreateInitGrous=true;
	
	modelFromFileSpeed=Ext.getCmp('fileSpeed').value;
	if(modelFromFileSpeed==undefined || modelFromFileSpeed==null){
		modelFromFileSpeed=10;
	}else{
		modelFromFileDelay=modelFromFileSpeed;
	}
	
	clearPage();
	startFileSimulator(); 
}

//startFileSimulator
function startFileSimulator(){
	ModelInvoker.startFileModel(getSessionId(), handleModelData);
}

function handleModelData(res) 
{	
	modelData = res;
	modelLoaded = true;
}

//stopFile
function stopFile()
{
	modelHandled=true;
	alert('done');
}

//pauseFile
function pauseFile()
{
	filePaused=true;
}

//continueFile
function continueFile()
{
	filePaused=false;
}
