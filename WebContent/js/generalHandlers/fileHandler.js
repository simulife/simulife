
var filePaused=false;

var func, type;
var bunch=1;	//default
var speed=10;	//default

var maxTumor = 1000000;

var waitCounter;

//handleModelFromFile
function handleModelFromFile()
{
	if(modelHandled==true || modelLoaded==false || filePaused==true){
		return;
	}
	if(totalNumOfTumorObjects >= maxTumor){
		modelHandled=true;		
		alert('done1');
		return;
	}
	var i = modelElementToHandle;
	if(i==modelData.length){
		modelHandled=true;
		alert('done2');
		return;
	}

	if(shouldWait()==true){	//wait due to slow speed
		return;
	}
	handleSpeedProperty();

	//when lots of cells exist - handle bunch cells each time
	for (var j=0;j<bunch;)
	{
		do{
			if(i==modelData.length)
			{
				modelHandled=true;
				alert('done3');
				return;
			}
			type = modelData[i].type;
			func = modelData[i].func;
			
			handleElement(modelData[i]);
			
			i=i+1;
			modelElementToHandle=i;

			if(type==1 || type==2 || type==3){
				j++;	//bunch of cells
			}
		}
		//handle molecules radiuses/groups at once
		while(func==1 && (type==6 || type==7 || type==8 || type==10));	

	}//bunch end
	
}

//shouldWait
function shouldWait()
{
	if(waitCounter>0){
		waitCounter--;
		return true;
	}
	else{
		return false;
	}
}

//handleSpeed
function handleSpeedProperty()
{
	speed=Ext.getCmp('fileSpeed').value;
	if(speed==undefined || speed==null){
		bunch=1;
		speed=10;
		waitCounter=0;
		return;
	}

	if(speed>=10){
		bunch=speed-9;
		waitCounter=0;
		return;
	}
	if(speed==0){
		bunch=0;
		return;
	}
	//speed < 10
	bunch=1;
	waitCounter = (10-speed)*5; 
}
