
//startSimulife
function startSimulife()
{
	clearPage();
	
	runMode = 'simulife';

	//startSocketHandler();
	startModel(createStartingArgs());
}

//creates arguments for Model exe
function createStartingArgs()
{
	var args = "";
	if(Ext.getCmp('TimeToExitCheckBox').checked==true){
		args = args + " GeneralRuntime " + Ext.getCmp('TimeToExit').value;
	}
	if(Ext.getCmp('AreaSizeCheckBox').checked==true){
		args = args + " AreaSize " + Ext.getCmp('AreaSize').value;
	}
	if(Ext.getCmp('InitialOxygenLevelCheckBox').checked==true){
		args = args + " AreaOxygen " + Ext.getCmp('InitialOxygenLevel').value;
	}
	if(Ext.getCmp('NumOfInitVesselsCheckBox').checked==true){
		args = args + " AreaBloodVessels " + Ext.getCmp('NumOfInitVessels').value;
	}
	if(Ext.getCmp('InitialFibroblastsCheckBox').checked==true){
		args = args + " AreaFibroblasts " + Ext.getCmp('InitialFibroblasts').value;
	}
	if(Ext.getCmp('OxygenDiffDistCheckBox').checked==true){
		args = args + " AreaOxygenDiffusion " + Ext.getCmp('OxygenDiffDist').value;
	}
	if(Ext.getCmp('ProlDurationCheckBox').checked==true){
		args = args + " AreaProliferationDuraion " + Ext.getCmp('ProlDuration').value;
	}
	if(Ext.getCmp('VegfDiffDistCheckBox').checked==true){
		args = args + " AreaVEGFDiffusion " + Ext.getCmp('VegfDiffDist').value;
	}
	if(Ext.getCmp('rateOfMoveOxygenCheckBox').checked==true){
		args = args + " AreaOxygenMoveRate " + Ext.getCmp('rateOfMoveOxygen').value;
	}
	if(Ext.getCmp('rateOfMoveVEGFCheckBox').checked==true){
		args = args + " AreaVEGFMoveRate " + Ext.getCmp('rateOfMoveVEGF').value;
	}
	if(Ext.getCmp('SecretionRateCheckBox').checked==true){
		args = args + " AreaSecretionRate " + Ext.getCmp('SecretionRate').value;
	}
	if(Ext.getCmp('VegfCountingDurationCheckBox').checked==true){
		args = args + " BloodVesselVEGFSummingDuration " + Ext.getCmp('VegfCountingDuration').value;
	}
	if(Ext.getCmp('AngioSwitchThresholdCheckBox').checked==true){
		args = args + " BloodVesselVEGFAngioThreshold " + Ext.getCmp('AngioSwitchThreshold').value;
	}
	if(Ext.getCmp('EndoCheckingRadiusCheckBox').checked==true){
		args = args + " BloodVesselEndoSensingRadius " + Ext.getCmp('EndoCheckingRadius').value;
	}
	if(Ext.getCmp('VegfMin4SurvCheckBox').checked==true){
		args = args + " BloodVesselMinimalVEGF4Survival " + Ext.getCmp('VegfMin4Surv').value;
	}
	if(Ext.getCmp('CellResolutionCheckBox').checked==true){
		args = args + " TumorSize " + Ext.getCmp('CellResolution').value;
	}
	if(Ext.getCmp('HypoxiaLevelCheckBox').checked==true){
		args = args + " TumorHypoxiaLevel " + Ext.getCmp('HypoxiaLevel').value;
	}
	if(Ext.getCmp('AnoxiaLevelCheckBox').checked==true){
		args = args + " TumorAnoxiaLevel " + Ext.getCmp('AnoxiaLevel').value;
	}
	if(Ext.getCmp('CellOxygenUptakeCheckBox').checked==true){
		args = args + " TumorOxygenUptake " + Ext.getCmp('CellOxygenUptake').value;
	}
	if(Ext.getCmp('NumSecretedVEGFCheckBox').checked==true){
		args = args + " TumorVEGFSecretion " + Ext.getCmp('NumSecretedVEGF').value;
	}
	if(Ext.getCmp('NumSecretedFGFCheckBox').checked==true){
		args = args + " NumSecretedFGF " + Ext.getCmp('NumSecretedFGF').value;
	}
	if(Ext.getCmp('HgfCountingDurationCheckBox').checked==true){
		args = args + " HgfCountingDuration " + Ext.getCmp('HgfCountingDuration').value;
	}
	if(Ext.getCmp('VesselsGrowthCheckBox').checked==true){
		args = args + " VesselsGrowth " + Ext.getCmp('VesselsGrowth').value;
	}
	if(Ext.getCmp('FgfCountingDurationCheckBox').checked==true){
		args = args + " FgfCountingDuration " + Ext.getCmp('FgfCountingDuration').value;
	}
	if(Ext.getCmp('NumSecretedHGFCheckBox').checked==true){
		args = args + " NumSecretedHGF " + Ext.getCmp('NumSecretedHGF').value;
	}
	if(Ext.getCmp('FibRadiusCheckBox').checked==true){
		args = args + " FibRadius " + Ext.getCmp('FibRadius').value;
	}
	if(Ext.getCmp('ProbToCAFCheckBox').checked==true){
		args = args + " ProbToCAF " + Ext.getCmp('ProbToCAF').value;
	}
	if(Ext.getCmp('FGFDiffDistCheckBox').checked==true){
		args = args + " FGFDiffDist " + Ext.getCmp('FGFDiffDist').value;
	}
	if(Ext.getCmp('HgfDiffDistCheckBox').checked==true){
		args = args + " HGFDiffDist " + Ext.getCmp('HgfDiffDist').value;
	}
	if(Ext.getCmp('rateOfMoveFGFCheckBox').checked==true){
		args = args + " rateOfMoveFGF " + Ext.getCmp('rateOfMoveFGF').value;
	}
	if(Ext.getCmp('rateOfMoveHGFCheckBox').checked==true){
		args = args + " rateOfMoveHGF " + Ext.getCmp('rateOfMoveHGF').value;
	}
	if(Ext.getCmp('InitProbMutateCheckBox').checked==true){
		args = args + " InitProbMutate " + Ext.getCmp('InitProbMutate').value;
	}
	if(Ext.getCmp('InitProbProliferateCheckBox').checked==true){
		args = args + " InitProbProliferate " + Ext.getCmp('InitProbProliferate').value;
	}
	if(Ext.getCmp('InitProbBindCheckBox').checked==true){
		args = args + " InitProbBind " + Ext.getCmp('InitProbBind').value;
	}
	
	//args = args + "~";		//end message sign
	
	return args;
}

//DWR
function startModel(args){
	ModelInvoker.startModel(getSessionId(), args); 
}

//function startSocketHandler(){
//	SocketHandler.startSocketGetter(); 
//} 

