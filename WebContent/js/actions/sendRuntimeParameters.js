
//sendRuntimeParameters
function sendRuntimeParameters()
{
	//alert('Send Parameters');
	sendMessage("variables:"+createUpdatedArgs());
}

//DWR
function sendMessage(msg)
{
	if(msg=="variables:"){
		return;
	}
	//alert('Mes:   ' + msg);
	SocketHandler.sendMessage(msg);
}

function createUpdatedArgs()
{
	var args = "";
	
	if(Ext.getCmp('HypoxiaLevelRuntimeCheckBox').checked==true){
		args = args + " TumorHypoxiaLevel " + Ext.getCmp('HypoxiaLevelRuntime').value;
	}
	if(Ext.getCmp('AnoxiaLevelRuntimeCheckBox').checked==true){
		args = args + " TumorAnoxiaLevel " + Ext.getCmp('AnoxiaLevelRuntime').value;
	}
	if(Ext.getCmp('CellOxygenUptakeRuntimeCheckBox').checked==true){
		args = args + " TumorOxygenUptake " + Ext.getCmp('CellOxygenUptakeRuntime').value;
	}
	if(Ext.getCmp('NumSecretedVEGFRuntimeCheckBox').checked==true){
		args = args + " TumorVEGFSecretion " + Ext.getCmp('NumSecretedVEGFRuntime').value;		
	}
	if(Ext.getCmp('NumSecretedFGFRuntimeCheckBox').checked==true){
		args = args + " NumSecretedFGF " + Ext.getCmp('NumSecretedFGFRuntime').value;		
	}
	if(Ext.getCmp('AngioSwitchThresholdRuntimeCheckBox').checked==true){
		args = args + " BloodVesselVEGFAngioThreshold " + Ext.getCmp('AngioSwitchThresholdRuntime').value;		
	}
	if(Ext.getCmp('EndoCheckingRadiusRuntimeCheckBox').checked==true){
		args = args + " BloodVesselEndoSensingRadius " + Ext.getCmp('EndoCheckingRadiusRuntime').value;		
	}
	if(Ext.getCmp('VegfMin4SurvRuntimeCheckBox').checked==true){
		args = args + " BloodVesselMinimalVEGF4Survival " + Ext.getCmp('VegfMin4SurvRuntime').value;		
	}
	if(Ext.getCmp('NumSecretedHGFRuntimeCheckBox').checked==true){
		args = args + " NumSecretedHGF " + Ext.getCmp('NumSecretedHGFRuntime').value;		
	}
	if(Ext.getCmp('FibRadiusRuntimeCheckBox').checked==true){
		args = args + " FibRadius " + Ext.getCmp('FibRadiusRuntime').value;		
	}
	if(Ext.getCmp('ProbToCAFRuntimeCheckBox').checked==true){
		args = args + " ProbToCAF " + Ext.getCmp('ProbToCAFRuntime').value;		
	}
	if(Ext.getCmp('OxygenDiffDistRuntimeCheckBox').checked==true){
		args = args + " AreaOxygenDiffusion " + Ext.getCmp('OxygenDiffDistRuntime').value;		
	}
	if(Ext.getCmp('ProlDurationRuntimeCheckBox').checked==true){
		args = args + " AreaProliferationDuraion " + Ext.getCmp('ProlDurationRuntime').value;		
	}
	if(Ext.getCmp('VegfDiffDistRuntimeCheckBox').checked==true){
		args = args + " AreaVEGFDiffusion " + Ext.getCmp('VegfDiffDistRuntime').value;		
	}
	if(Ext.getCmp('FGFDiffDistRuntimeCheckBox').checked==true){
		args = args + " FGFDiffDist " + Ext.getCmp('FGFDiffDistRuntime').value;		
	}
	if(Ext.getCmp('HgfDiffDistRuntimeCheckBox').checked==true){
		args = args + " HGFDiffDist " + Ext.getCmp('HgfDiffDistRuntime').value;	 	
	}
	if(Ext.getCmp('rateOfMoveOxygenRuntimeCheckBox').checked==true){
		args = args + " AreaOxygenMoveRate " + Ext.getCmp('rateOfMoveOxygenRuntime').value;		
	}
	if(Ext.getCmp('rateOfMoveVEGFRuntimeCheckBox').checked==true){
		args = args + " AreaVEGFMoveRate " + Ext.getCmp('rateOfMoveVEGFRuntime').value;		
	}
	if(Ext.getCmp('rateOfMoveFGFRuntimeCheckBox').checked==true){
		args = args + " rateOfMoveFGF " + Ext.getCmp('rateOfMoveFGFRuntime').value;		
	}
	if(Ext.getCmp('rateOfMoveHGFRuntimeCheckBox').checked==true){
		args = args + " rateOfMoveHGF " + Ext.getCmp('rateOfMoveHGFRuntime').value;
	}
	if(Ext.getCmp('SecretionRateRuntimeCheckBox').checked==true){
		args = args + " AreaSecretionRate " + Ext.getCmp('SecretionRateRuntime').value;		
	}
	if(Ext.getCmp('InitProbProliferateRuntimeCheckBox').checked==true){
		args = args + " InitProbProliferate " + Ext.getCmp('InitProbProliferateRuntime').value;	
	}
	if(Ext.getCmp('InitProbBindRuntimeCheckBox').checked==true){
		args = args + " InitProbBind " + Ext.getCmp('InitProbBindRuntime').value;		
	}
	
	//args = args + "~";		//end message sign
	
	return args;
}
