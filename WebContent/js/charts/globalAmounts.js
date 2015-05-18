
var numOfTumorCells=0;
var numOfEndoCells=0;
var numOfFibroCells=0;
var numOfVegfCells=0;
var numOfEmptyEmptyPositions=0;
var areaSize=0;
var worldSize=0;

var tsLabel;
var tumorAmtLbl; 
var endoAmtLbl;
var fibroAmtLbl;
var vegfAmtLbl;

//globalAmountsInit
function globalAmountsInit()
{
	tsLabel = Ext.getCmp('timeStepLabel');
	tsLabel.setValue(0);	
	
	tumorAmtLbl = Ext.getCmp('tumorAmountsLabel');
	tumorAmtLbl.setValue(0);

	endoAmtLbl = Ext.getCmp('endoAmountsLabel');
	endoAmtLbl.setValue(0);

	fibroAmtLbl = Ext.getCmp('fibroAmountsLabel');
	fibroAmtLbl.setValue(0);

	vegfAmtLbl = Ext.getCmp('vegfAmountsLabel');
	vegfAmtLbl.setValue(0);
}

//handleReceivedAmounts
function handleReceivedAmounts(timeStep,numOfTumor,numOfEndo,numOfFibro,numOfVegf)
{
	if(numOfTumor<0){
		numOfTumor=0;
	}
	if(numOfEndo<0){
		numOfEndo=0;
	}
	if(numOfFibro<0){
		numOfFibro=0;
	}
	if(numOfVegf<0){
		numOfVegf=0;
	}
	numOfTumorCells=numOfTumor;
	numOfEndoCells=numOfEndo;
	numOfFibroCells=numOfFibro;
	numOfVegfCells=numOfVegf;
	//numOfVegfCells=0;
	
	/*	if(goOn()!=true){		//skip updating the charts if system is currently busy  
		return;			
	}
	*/

	if(updateGraphs==true)
	{
		updatePieChart(numOfTumor, numOfEndo, numOfFibro);
		updateTimeChart(timeStep, numOfTumorCells, numOfEndoCells, numOfFibroCells, numOfVegfCells);
	}
	
	updateAmountsLabels(timeStep, numOfTumorCells, numOfEndoCells, numOfFibroCells, numOfVegfCells);
}

//updatePieChart
function updatePieChart(numOfTumor, numOfEndo, numOfFibro)
{
	if(areaSize==0){
		areaSize = Ext.getCmp('AreaSize').value;
		if(areaSize==undefined){
			areaSize=100;
		}
		//worldSize = areaSize*areaSize*areaSize;
		worldSize = areaSize*areaSize*areaSize / 8;  
	}
	
	numOfEmptyEmptyPositions = worldSize - numOfTumor - numOfEndo - numOfFibro;  
	//numOfEmptyEmptyPositions = numOfEmptyEmptyPositions / 20;	//for the demo
	
	//console.log("pieChartData: " + numOfTumor + " " + numOfEndo + " " + numOfFibro + " " + numOfEmptyEmptyPositions);
	
	var pieChartData = [
           ['Tumor', numOfTumor],
           ['Endothelial',numOfEndo],
           ['Fibroblast',numOfFibro],
           ['Empty',numOfEmptyEmptyPositions]
	];
	
	var pieChart = Ext.getCmp('cellsPieChart');
	pieChart.store.loadData(pieChartData);
}

//updateTimeChart
function updateTimeChart(timeStep, numOfTumorCells, numOfEndoCells, numOfFibroCells, numOfVegfCells)
{
/*	if(timeStep%10 != 0){
		return;
	}
*/	
	//amountsVsTimeChart

/*	console.log("lineChart: " + timeStep + " " + numOfTumorCells + " " + numOfEndoCells + " " 
			+ numOfFibroCells + " " + numOfVegfCells);
*/	
	//fields: ['time', 'Tumor', 'Endothelial', 'Fibroblast', 'Vegf']
	var lineChartData = [
	          	    [timeStep, numOfTumorCells, numOfEndoCells, numOfFibroCells, numOfVegfCells] 
   	];

 	var lineChart = Ext.getCmp('amountsVsTimeChart');
 	if(firstTime==true){
 		firstTime=false;
 		lineChart.store.loadData(lineChartData);	
	}else{
		lineChart.store.loadData(lineChartData,true);	//append
	}
 	//lineChart.refresh();
}
	
//updateAmountsLabels
function updateAmountsLabels(timeStep, numOfTumorCells, numOfEndoCells, numOfFibroCells, numOfVegfCells)
{
	tsLabel.setValue(timeStep);
	tumorAmtLbl.setValue(numOfTumorCells);
	endoAmtLbl.setValue(numOfEndoCells);
	fibroAmtLbl.setValue(numOfFibroCells);
	vegfAmtLbl.setValue(numOfVegfCells);
}

