
var cellsStore = Ext.create('Ext.data.Store', {
    fields: ['value', 'name'],
    data : [
        {"value":"Realistic Cells", "name":"Realistic Cells"},
        {"value":"Simple Cells", "name":"Simple Cells"}
    ]
});

var moleculesStore = Ext.create('Ext.data.Store', {
    fields: ['value', 'name'],
    data : [
        {"value":"Display By Radiuses", "name":"Display By Radiuses"},
        {"value":"Display By Cubes", "name":"Display By Cubes"}
    ]
});

var backgroundImageStore = Ext.create('Ext.data.Store', {
    fields: ['value', 'name'],
    data : [
        {"value":"Image1", 	"name":"Image1"},
        {"value":"Image2", 	"name":"Image2"},
        {"value":"Image3", 	"name":"Image3"},
        {"value":"No Image", "name":"No Image"}
    ]
});


//handlePreLaunchParametersEnablement
function handlePreLaunchParametersEnablement(enabled)
{
	if(enabled){
		Ext.getCmp('cellsAppearanceId').enable();
		Ext.getCmp('moleculesAppearanceId').enable();
		Ext.getCmp('bkImage').enable();
	}else{
		Ext.getCmp('cellsAppearanceId').disable();
		Ext.getCmp('moleculesAppearanceId').disable();
		Ext.getCmp('bkImage').disable();
	}
}

function clearPage()
{
	//Clear charts
	var data = [
           ['Tumor', 0],
           ['Endothelial',0], 
           ['Fibroblast',0],
           ['Empty',1]
	];
	var pieChart = Ext.getCmp('cellsPieChart');
	pieChart.store.loadData(data);
	
/*	var lineChartData = [ [0, 0, 0, 0, 0] ];
  	var lineChart = Ext.getCmp('amountsVsTimeChart');
	lineChart.store.loadData(lineChartData);
*/	
	init();		//init center
}

function createLeftPanel()
{
	var growthStore = Ext.create('Ext.data.Store', {
	    fields: ['value', 'name'],
	    data : [
	        {"value":"1", "name":"Straight"},
	        {"value":"2", "name":"Diagonal"},
	        {"value":"3", "name":"Random"}
	    ]
	});

	var typesStore = Ext.create('Ext.data.Store', {
	    fields: ['value', 'name'],
	    data : [
	        {"value":"tumor", "name":"Tumor"},
	        {"value":"endothelial", "name":"Endothelial"},
	        {"value":"fibroblast", "name":"Fibroblast"}
	    ]
	});
	
	var compareStore = Ext.create('Ext.data.Store', {
	    fields: ['value', 'name'],
	    data : [
	        {"value":"1", "name":"<"},
	        {"value":"2", "name":">"},
	        {"value":"3", "name":" "}
	    ]
	});

	var eventsStore = Ext.create('Ext.data.Store', {
	    fields: ['value', 'name'],
	    data : [
	        {"value":"Proliferate", "name":"Proliferate"},
	        {"value":"Activate", "name":"Activate"},
	        {"value":"Branch", "name":"Branch"},
	        {"value":"Die", "name":"Die"},
	        {"value":"SecreteMolecules", "name":"Secrete Molecules"},
	        {"value":"Move", "name":"Move"}
	    ]
	});
	
	// Create the combo box, attached to the states data store
	var growthCombo = Ext.create('Ext.form.ComboBox', {
		fieldLabel: 'Initial Vessels Growth',
		id: 'VesselsGrowth',
	    store: growthStore,
	    queryMode: 'local',
	    displayField: 'name',
	    emptyText: 'Straight', 
	    width: 180,
	    valueField: 'value'
	});

	  var tabs = new Ext.TabPanel({
        	renderTo: Ext.getCmp('west1').body,
        	activeTab: 0,
        	autoScroll: true,
        	region: 'center',
        	title: 'Parameters',
        	iconCls: 'nav',
        	items: [{
        		
        			//========================================
        			// GENERAL TAB
        			//========================================
		        	id:'general',
		        	autoHeight:true,
		        	title: 'Launch',
		        	border:false,
		        	minSize: 600, maxSize: 600,
		    		height: 700,
		        	anchor: '100%',
		    		autoScroll: true,
		    		autoHeight: true,
		    	    layout: {
		    	        type: 'vbox',       // Arrange child items vertically
		    	        align: 'stretch',    // Each takes up full width
		    	        padding: 5
		    	    },
		    		items: [
		    		{	
						xtype:'fieldset',
						title: 'Pre Launch Parameters',
	    		        height:130, 
						defaultType: 'textfield',
						collapsed: false, // fieldset initially collapsed
						layout: {
							type: 'vbox',       // Arrange child items vertically
							align: 'stretch'    // Each takes up full width
						},
		    			items :[
							{
								xtype: 'combobox',
								fieldLabel: 'Cells',
								id: 'cellsAppearanceId', 
								store: cellsStore,
								editable: false,
								queryMode: 'local',
								displayField: 'name',
								labelWidth: 70,
								width:130,
								emptyText: 'Realistic Cells', 
								valueField: 'value',
								listeners: {
								    select: function(v) {
								    	handleObjectsAppearance(v.value);							    	
								    }
								}								
							},
							{
								xtype: 'combobox',
								fieldLabel: 'Molecules',
								id: 'moleculesAppearanceId', 
								store: moleculesStore,
								editable: false,
								queryMode: 'local',
								displayField: 'name',
								labelWidth: 70,
								width:130,
								emptyText: 'Display By Cubes', 
								valueField: 'value',
								listeners: {
								    select: function(v) {
								    	moleculesDisplayType = v.value;
								    }
								}								
							},
							{
								xtype: 'combobox',
								fieldLabel: 'Background Image',
								id: 'bkImage', 
								store: backgroundImageStore,
								editable: false,
								queryMode: 'local',
								displayField: 'name',
								labelWidth: 70,
								width:130,
								emptyText: 'Image1', 
								valueField: 'value',
								listeners: {
								    select: function(v) {
								    	backgroundImage = v.value;
								    	init();
								    }
								}								
							}] 							
	    			},		    		        
		    		{   			
		    			//ACTIONS PANEL
	    				xtype : 'fieldset',
	    				//renderTo :Ext.getCmp('general').body,
	    				border:true,
	    				title: 'Launchers',
	    		        height:200, 
	    			    layout: {
	    			        type: 'vbox',       // Arrange child items vertically
	    			        align: 'stretch',    // Each takes up full width
	    			        padding: 5
	    			    },		
	    		        fieldDefaults: {
	    		            msgTarget: 'side'
	    		            //labelWidth: 60
	    		        },
	    		        defaultType: 'textfield',
	    		        defaults: {
	    		            anchor: '100%',
	    		            //labelWidth: 150,
	    		            margin: '5 5 5 5 '
	    		        },
	    				items: [ 
	    			        //BUTTONS
	    			        {
	    			        	xtype: 'button',
	    		                text: 'Start Simulife',
	    		                enableToggle: true,
	    		                handler: function(button){
	    		                	if(button.getText()=='Start Simulife')
	    		                	{
	    		                		startSimulife();
	    		                		handlePreLaunchParametersEnablement(false);
	    		                		button.setText('Stop Simulife');
	    		                	}else{
	    		                		stopSimulife();
	    		                		handlePreLaunchParametersEnablement(true);
	    		        				button.setText('Start Simulife');
	    		                	}
	    		        			
	    		                }
	    			        },
	    					{
	    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
	    						items :[
	    				        {
	    				        	xtype: 'button',
	    			                //text: 'Start Simulife From File',
	    				        	text: 'Start (File)',
	    			                enableToggle: true,
	    			                handler: function(button)
	    			                {
	    			                	if(button.getText()=='Start (File)')
	    			                	{
		    			                	startFile();
		    			                	handlePreLaunchParametersEnablement(false);
		    			                	button.setText('Stop (File)');
	    			                	}else{
		    			                	stopFile();
		    			                	handlePreLaunchParametersEnablement(true);
		    			                	button.setText('Start (File)');
	    			                	}
	    			                }
	    				        },	    				        
	    						{
	    							fieldLabel: '&nbspSpeed', 
	    							id: 'fileSpeed',
	    							name: 'fileSpeed',
	    					        xtype: 'numberfield',
	    					        labelWidth: 40,
	    							width: 90,
	    							minValue: 0, step:1, maxValue:1000, value:10
	    						},
/*	    						{
	    							xtype: 'label',
	    					        text: ', ',
	    					        width: 10
	    					    },
*/	    				        {
	    				        	xtype: 'button',
	    				        	text: 'Pause',
	    				        	width: 40,
	    			                enableToggle: true,
	    			                handler: function(button)
	    			                {
	    			                	if(button.getText()=='Pause')
	    			                	{
	    			                		pauseFile();
		    			                	button.setText('Continue');
	    			                	}else{
	    			                		continueFile();
		    			                	button.setText('Pause');
	    			                	}
	    			                }
	    				        }
	    				        ]
	    					},
/*	    					{
	    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
	    						items :[
	    				        {
	    				        	xtype: 'button',
	    				        	text: 'Start (Java)',
	    			                handler: function(button)
	    			                { 
	    			                	startJava();
	    			                }
	    				        },			        
	    						{
	    							fieldLabel: '&nbsp&nbspSpeed',
	    							id: 'javaModelSpeed', 
	    							name: 'javaModelSpeed',
	    					        xtype: 'numberfield',
	    					        labelWidth: 60,
	    							width: 120,
	    							minValue: 0, step:1, maxValue:1000, value:10
	    						}]
	    					},				        
*/	    			        {
	    			        	xtype: 'button',
	    		                text: 'Test Cell Creation',
	    		                handler: function(){
	    		                	testCellCreation();
	    		                }
	    			        },
	    			        {
	    			        	xtype: 'button',
	    		                text: 'Testing Action',
	    		                handler: function(){
	    		                	testingAction();
	    		                }
	    			        }
	    			        
	    			       ] 
	    				},
	    				
				    		{	//AMOUNTS PANEL
			    				xtype : 'fieldset',
			    				border:true,
			    				title: 'Statistics',
			    		        height:200, 
			    			    layout: {
			    			        type: 'vbox',       // Arrange child items vertically
			    			        align: 'stretch',    // Each takes up full width
			    			        padding: 2
			    			    },		
			    		        fieldDefaults: {
			    		            msgTarget: 'side'
			    		            //labelWidth: 60
			    		        },
			    		        defaultType: 'textfield',
			    		        defaults: {
			    		            anchor: '100%',
			    		            //labelWidth: 150,
			    		            margin: '5 5 5 5 '
			    		        },
			    				items: [ 
		    						{
		    							xtype: 'numberfield',
		    							id:'timeStepLabel',
		    							fieldLabel: 'Time Step:',
		    							minValue: 0, step:1, value:0,
		    							readOnly:true,
		    							labelWidth: 100,
		    					        width: 50
		    					    },
		    						{
		    					    	xtype: 'numberfield',
		    							id:'tumorAmountsLabel',
		    							fieldLabel: 'Tumor Cells:',
		    							minValue: 0, step:1, value:0,
		    							readOnly:true,
		    							labelWidth: 100,
		    					        width: 50
		    					    },
		    						{
		    					    	xtype: 'numberfield',
		    							id:'endoAmountsLabel',
		    							fieldLabel: 'Endothelial Cells:',
		    							minValue: 0, step:1, value:0,
		    							readOnly:true,
		    							labelWidth: 100,
		    					        width: 50
		    					    },
		    						{
		    					    	xtype: 'numberfield',
		    							id:'fibroAmountsLabel',
		    							fieldLabel: 'Fibroblast Cells:',
		    							minValue: 0, step:1, value:0,
		    							readOnly:true,
		    							labelWidth: 100,
		    					        width: 50
		    					    },
		    						{
		    					    	xtype: 'numberfield',
		    							id:'vegfAmountsLabel',
		    							//fieldLabel: 'Vegf Molecules:',
		    							fieldLabel: 'Necrotic  Cells:', 
		    							minValue: 0, step:1, value:0,
		    							readOnly:true,
		    							labelWidth: 100,
		    					        width: 50
		    					    }
		    						
		    						] 
			    				}
	    				
		    		]        		
        		},
        		
        		//========================================
        		// INITIAL TAB
        		//========================================
        		{
		        	id:'Initial',
		        	autoHeight:true,
		        	title: 'Initial',
		        	border:false,
		    		height: 250,  
		    		autoScroll: true,
		    	    layout: {
		    	        type: 'vbox',       // Arrange child items vertically
		    	        align: 'stretch',    // Each takes up full width
		    	        padding: 5
		    	    },
		    		items: [
	    		    { 
		    			//Tumor Cells
		    			//=============
		    			xtype:'fieldset',
		    			title: 'Tumor Cells',
		    	        //columnWidth: 0.5,
		    	        defaultType: 'textfield',
		    	        defaults: {anchor: '100%'},
		    	        layout: 'anchor',
		    			//checkboxToggle: true,
		    			collapsed: false, // fieldset initially collapsed
		    			
		    			items :[{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'HypoxiaLevelCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('HypoxiaLevel').setValue(25);
				    	                }else{
				    	                	Ext.getCmp('HypoxiaLevel').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//Number of time steps that the cell does not have sufficient oxygen and starts secreting VEGF
			    				fieldLabel: 'Hypoxia Level',
			    				id: 'HypoxiaLevel',
			    				name: 'HypoxiaLevel',
			    	            xtype: 'numberfield',
			    				width: 180,
			    				minValue: 10, step:10, maxValue:150, value:25
			    			}]
				        },
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'AnoxiaLevelCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('AnoxiaLevel').setValue(1000);
				    	                }else{
				    	                	Ext.getCmp('AnoxiaLevel').setValue(null);
				    	                }
				    	            }
			    			},{
					        	//Number of time steps that the cell does not have sufficient oxygen and dies
			    				fieldLabel: 'Anoxia Level',
			    				id: 'AnoxiaLevel',
			    				name: 'AnoxiaLevel',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 100, step:100, maxValue:1500, value:1000
			    			}]
		    			}, 
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'CellOxygenUptakeCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('CellOxygenUptake').setValue(80);
				    	                }else{
				    	                	Ext.getCmp('CellOxygenUptake').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//The amount of oxygen a cell consumes every time step
			    				fieldLabel: 'Oxygen Consumption',
			    				id: 'CellOxygenUptake',
			    				name: 'CellOxygenUptake',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 10, step:20, maxValue:300, value:80	//parameter values are dependent on other parameters
			    			}]
		    			},
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'CellResolutionCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('CellResolution').setValue(2);
				    	                }else{
				    	                	Ext.getCmp('CellResolution').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//The number of pixles to the power of 3 that each cell occupies
			    				fieldLabel: 'Cell Size',
			    				id: 'CellResolution',
			    				name: 'CellResolution',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:4, value:2
			    			}]
		    			},
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'NumSecretedVEGFCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('NumSecretedVEGF').setValue(25);
				    	                }else{
				    	                	Ext.getCmp('NumSecretedVEGF').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//Number of VEGF’s secreted in each pulse
			    				fieldLabel: 'VEGF Secretion Amount',
			    				id: 'NumSecretedVEGF',
			    				name: 'NumSecretedVEGF',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 5, step:10, maxValue:150, value:25
			    			}]
		    			},
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'NumSecretedFGFCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('NumSecretedFGF').setValue(100);
				    	                }else{
				    	                	Ext.getCmp('NumSecretedFGF').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//Number of FGF’s secreted in each pulse
			    				fieldLabel: 'FGF Secretion Amount',
			    				id: 'NumSecretedFGF',
			    				name: 'NumSecretedFGF',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 25, step:25, maxValue:250, value:100
			    			}]
		    			},		    			
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'HgfCountingDurationCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('HgfCountingDuration').setValue(8);
				    	                }else{
				    	                	Ext.getCmp('HgfCountingDuration').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//The number of time steps back that sum up HGF amount 
			    				fieldLabel: 'Duration For Summing HGF’s',
			    				id: 'HgfCountingDuration',
			    				name: 'HgfCountingDuration',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 2, step:2, maxValue:20, value:8
			    			}]
		    			} 			
		    		]},
	    			
	    			//Blood Vessels
	    			//=============
	    	        { 
		    			xtype:'fieldset',
		    			title: 'Blood Vessels',
		    	        //columnWidth: 0.5,
		    	        defaultType: 'textfield',
		    	        defaults: {anchor: '100%'},
		    	        layout: 'anchor',
		    			//checkboxToggle: true,
		    			collapsed: false, // fieldset initially collapsed
		    			
		    			items :[{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'AngioSwitchThresholdCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('AngioSwitchThreshold').setValue(13);
				    	                }else{
				    	                	Ext.getCmp('AngioSwitchThreshold').setValue(null); 
				    	                }
				    	            }
			    			},{
			    				//Minimum VEGF level to initiate angiogenesis
			    				fieldLabel: 'VEGF Level For Angiogenesis',
			    				id: 'AngioSwitchThreshold',
			    				name: 'AngioSwitchThreshold',
			    	            xtype: 'numberfield',
			    				width: 180,
			    				minValue: 2, step:2, maxValue:20, value:13
			    			}]
		    			},
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id: 'EndoCheckingRadiusCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('EndoCheckingRadius').setValue(3);
				    	                }else{
				    	                	Ext.getCmp('EndoCheckingRadius').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//The radius that the cell checks around it for VEGF’s
			    				fieldLabel: 'Endothelial Sensing Radius',
			    				id: 'EndoCheckingRadius',
			    				name: 'EndoCheckingRadius',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:6, value:3	//parameter values are dependent on other parameters
			    			}]
		    			}, 	
		    			 {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'VegfMin4SurvCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('VegfMin4Surv').setValue(1);
				    	                }else{
				    	                	Ext.getCmp('VegfMin4Surv').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//The minimum amount of VEGF needed for survival of the 
			    				fieldLabel: 'Min VEGF For Survival',
			    				id: 'VegfMin4Surv',
			    				name: 'VegfMin4Surv',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:10, value:1
			    			}]
		    			},		    			
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'VegfCountingDurationCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('VegfCountingDuration').setValue(8);
				    	                }else{
				    	                	Ext.getCmp('VegfCountingDuration').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//The number of time steps back that sum up VEGF amount 
			    				fieldLabel: 'VEGF Summing Duration',
			    				id: 'VegfCountingDuration',
			    				name: 'VegfCountingDuration',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 2, step:2, maxValue:20, value:8
			    			}]
		    			},
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'VesselsGrowthCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('VesselsGrowth').setValue(value);
				    	                }else{
				    	                	Ext.getCmp('VesselsGrowth').setValue(null);
				    	                }
				    	            }
			    			},
			    				growthCombo
			    			]
		    			}
		    			
				    ]},
				    
	    			//Fibroblasts
	    			//=============
	    	        { 
		    			xtype:'fieldset',
		    			title: 'Fibroblasts',
		    	        //columnWidth: 0.5,
		    	        defaultType: 'textfield',
		    	        defaults: {anchor: '100%'},
		    	        layout: 'anchor',
		    			//checkboxToggle: true,
		    			collapsed: false, // fieldset initially collapsed
		    			
		    			items :[{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'FgfCountingDurationCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('FgfCountingDuration').setValue(8);
				    	                }else{
				    	                	Ext.getCmp('FgfCountingDuration').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//The number of time steps back that sum up FGF amount
			    				fieldLabel: 'Duration For Summing FGF’s',
			    				id: 'FgfCountingDuration',
			    				name: 'FgfCountingDuration',
			    	            xtype: 'numberfield',
			    				width: 180,
			    				minValue: 2, step:2, maxValue:20, value:8
			    			}]
		    			},
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'NumSecretedHGFCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('NumSecretedHGF').setValue(10);
				    	                }else{
				    	                	Ext.getCmp('NumSecretedHGF').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//Number of HGF’s secreted in each pulse
			    				fieldLabel: 'Amount HGF Secreted',
			    				id: 'NumSecretedHGF',
			    				name: 'NumSecretedHGF',
			    	            xtype: 'numberfield',
			    				width: 180,
			    				minValue: 1, step:5, maxValue:100, value:10
			    			}]
		    			},		    			        
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'FibRadiusCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('FibRadius').setValue(5);
				    	                }else{
				    	                	Ext.getCmp('FibRadius').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//The radius that the cell checks around it for tumor cells
			    				fieldLabel: 'Fibroblast Sensing Radius',
			    				id: 'FibRadius',
			    				name: 'FibRadius',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:10, value:5
			    			}]
		    			},		    			        
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'ProbToCAFCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('ProbToCAF').setValue(0.02);
				    	                }else{
				    	                	Ext.getCmp('ProbToCAF').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//The probability for a normal fibroblast to become a cancer associated fibroblast 
			    				fieldLabel: 'Probability To Become a CAF',
			    				id: 'ProbToCAF',
			    				name: 'ProbToCAF',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 0, step:0.01, maxValue:1, value:0.02
			    			}]
		    			}	    			        
				    
				    ]},

	    			//Area
	    			//=============
	    	        { 
		    			xtype:'fieldset',
		    			title: 'Area',
		    	        //columnWidth: 0.5,
		    	        defaultType: 'textfield',
		    	        defaults: {anchor: '100%'},
		    	        layout: 'anchor',
		    			//checkboxToggle: true,
		    			collapsed: false, // fieldset initially collapsed
		    			
		    			items :[{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'AreaSizeCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('AreaSize').setValue(100);
				    	                }else{
				    	                	Ext.getCmp('AreaSize').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//Pixles to the power of 3 that determine the full size of the world modeled
			    	            fieldLabel: 'Model World Size',
			    	            id: 'AreaSize',
			    	            name: 'AreaSize',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 10, step:10, maxValue:200, value:100
			    			}]
		    	        },
		    	        {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'InitialOxygenLevelCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('InitialOxygenLevel').setValue(10);
				    	                }else{
				    	                	Ext.getCmp('InitialOxygenLevel').setValue(null);
				    	                }
				    	            }
			    			},{
			    	        	//The initial amount of oxygen in each pixel
			    	            fieldLabel: 'Initial Oxygen Level',
			    	            id: 'InitialOxygenLevel',
			    	            name: 'InitialOxygenLevel',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:10, maxValue:50, value:10
			    			}]
		    	        },
		    	        {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'NumOfInitVesselsCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('NumOfInitVessels').setValue(4);
				    	                }else{
				    	                	Ext.getCmp('NumOfInitVessels').setValue(null);
				    	                }
				    	            }
			    			},{
			    	        	//The number of initial vessels
			    	            fieldLabel: 'Initial Vessels',
			    	            id: 'NumOfInitVessels',
			    	            name: 'NumOfInitVessels',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:2, maxValue:15, value:4
			    			}]
		    	        },
		    	        {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'OxygenDiffDistCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('OxygenDiffDist').setValue(1);
				    	                }else{
				    	                	Ext.getCmp('OxygenDiffDist').setValue(null);
				    	                }
				    	            }
			    			},{
			    	        	//The number of pixles the oxygen will move every step
			    		        fieldLabel: 'Oxygen Moving Distance',
			    		        id: 'OxygenDiffDist',
			    		        name: 'OxygenDiffDist',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:5, value:1
			    			}]
		    		    },		    	        
		    		    {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'ProlDurationCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('ProlDuration').setValue(15);
				    	                }else{
				    	                	Ext.getCmp('ProlDuration').setValue(null);
				    	                }
				    	            }
			    			},{
			    		    	//Time it takes for cell to proliferate
			    		        fieldLabel: 'Proliferation Duraion',
			    		        id: 'ProlDuration',
			    		        name: 'ProlDuration',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 5, step:10, maxValue:50, value:15
			    			}]
		    		    },
		    		    {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'VegfDiffDistCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('VegfDiffDist').setValue(2);
				    	                }else{
				    	                	Ext.getCmp('VegfDiffDist').setValue(null);
				    	                }
				    	            }
			    			},{
			    		    	//The number of pixles the vegf will move every step
			    		        fieldLabel: 'VEGF Moving Distance',
			    		        id: 'VegfDiffDist',
			    		        name: 'VegfDiffDist',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:5, value:2
			    			}]
		    		    },
		    		    {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'FGFDiffDistCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('FGFDiffDist').setValue(1);
				    	                }else{
				    	                	Ext.getCmp('FGFDiffDist').setValue(null);
				    	                }
				    	            }
			    			},{
			    		    	//The number of pixles the fgf will move every step
			    		        fieldLabel: 'FGF Moving Distance',
			    		        id: 'FGFDiffDist',
			    		        name: 'FGFDiffDist',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:5, value:1
			    			}]
		    		    },
		    		    {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'HgfDiffDistCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('HgfDiffDist').setValue(1);
				    	                }else{
				    	                	Ext.getCmp('HgfDiffDist').setValue(null);
				    	                }
				    	            }
			    			},{
			    		    	//The number of pixles the hgf will move every step
			    		        fieldLabel: 'HGF Moving Distance',
			    		        id: 'HgfDiffDist',
			    		        name: 'HgfDiffDist',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:5, value:1
			    			}]
		    		    },
		    		    {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'rateOfMoveOxygenCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('rateOfMoveOxygen').setValue(3);
				    	                }else{
				    	                	Ext.getCmp('rateOfMoveOxygen').setValue(null);
				    	                }
				    	            }
			    			},{
			    		    	//The time in which the oxygen makes one move
			    		        fieldLabel: 'Oxygen Move Rate',
			    		        id: 'rateOfMoveOxygen',
			    		        name: 'rateOfMoveOxygen',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:5, value:3
			    			}]
		    		    },	
		    		    {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'rateOfMoveVEGFCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('rateOfMoveVEGF').setValue(2);
				    	                }else{
				    	                	Ext.getCmp('rateOfMoveVEGF').setValue(null);
				    	                }
				    	            }
			    			},{
			    		    	//The time in which the Vegf makes one move
			    		    	fieldLabel: 'VEGF Move Rate',
			    		    	id: 'rateOfMoveVEGF',
			    		    	name: 'rateOfMoveVEGF',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:5, value:2
			    			}]
		    			}, 		    		    
		    		    {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'rateOfMoveFGFCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('rateOfMoveFGF').setValue(2);
				    	                }else{
				    	                	Ext.getCmp('rateOfMoveFGF').setValue(null);
				    	                }
				    	            }
			    			},{
			    		    	//The time in which the FGF makes one move
			    		    	fieldLabel: 'FGF Move Rate',
			    		    	id: 'rateOfMoveFGF',
			    		    	name: 'rateOfMoveFGF',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:5, value:2
			    			}]
		    			}, 		    		    
		    		    {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'rateOfMoveHGFCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('rateOfMoveHGF').setValue(2);
				    	                }else{
				    	                	Ext.getCmp('rateOfMoveHGF').setValue(null);
				    	                }
				    	            }
			    			},{
			    		    	//The time in which the HGF makes one move
			    		    	fieldLabel: 'HGF Move Rate',
			    		    	id: 'rateOfMoveHGF',
			    		    	name: 'rateOfMoveHGF',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:5, value:2
			    			}]
		    			}, 
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id: 'SecretionRateCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('SecretionRate').setValue(10);
				    	                }else{
				    	                	Ext.getCmp('SecretionRate').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//The time for one pulse of VEGF/oxygen to be secreted
			    				fieldLabel: 'Secretion Rate',
			    				id: 'SecretionRate',
			    				name: 'SecretionRate',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:10, maxValue:50, value:10
			    			}]
		    			},		    			
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'InitialFibroblastsCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('InitialFibroblasts').setValue(50);
				    	                }else{
				    	                	Ext.getCmp('InitialFibroblasts').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//Number of initial fibroblasts
			    		        fieldLabel: 'Num Of Initial Fibroblasts',
			    		        id: 'InitialFibroblasts',
			    		        name: 'InitialFibroblasts',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 50, step:50, maxValue:500, value:50		//parameter values are dependent on other parameters
			    			}]
		    		    },
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'InitProbMutateCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('InitProbMutate').setValue(0.2);
				    	                }else{
				    	                	Ext.getCmp('InitProbMutate').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//Initial Probability for a normal cell to become cancerous
			    		        fieldLabel: 'Probability To Become Cancerous',
			    		        id: 'InitProbMutate',
			    		        name: 'InitProbMutate',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 0, step:0.1, maxValue:1, value:0.2
			    			}]
		    		    },
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'InitProbProliferateCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('InitProbProliferate').setValue(0.8);
				    	                }else{
				    	                	Ext.getCmp('InitProbProliferate').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//Initial Probability for a cell to proliferate at a given moment
			    		        fieldLabel: 'Probability To Proliferate',
			    		        id: 'InitProbProliferate',
			    		        name: 'InitProbProliferate',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 0, step:0.1, maxValue:1, value:0.8
			    			}]
		    		    },
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id:'InitProbBindCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('InitProbBind').setValue(0.8);
				    	                }else{
				    	                	Ext.getCmp('InitProbBind').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//Initial Probability for a cell to bind a molecule
			    		        fieldLabel: 'Probability To Bind',
			    		        id: 'InitProbBind',
			    		        name: 'InitProbBind',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 0, step:0.1, maxValue:1, value:0.8
			    			}]
		    		    },
		    		    {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
				    	            id: 'TimeToExitCheckBox',
					    			boxLabel: '  ',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('TimeToExit').setValue(2000);
				    	                }else{
				    	                	Ext.getCmp('TimeToExit').setValue(null);
				    	                }
				    	            }
			    			},{
			    		    	//Duration of simulation run
				    			fieldLabel: 'Simulation Time',
			    	            id: 'TimeToExit',
			    	            name: 'TimeToExit',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            value: 1500,	minValue: 0, //	maxValue: 10000	            
			    	            minValue: 0, step:1
			    	            //allowBlank:false
			    			}]
			    	    }     
		    		]},
	    		]
        	},
        	{
	        	id:'Runtime',
	        	autoHeight:true,
	        	title: 'Runtime',
	        	border:false,
	    		height: 250,  
	    		autoScroll: true,
	    	    layout: {
	    	        type: 'vbox',       // Arrange child items vertically
	    	        align: 'stretch',    // Each takes up full width
	    	        padding: 5
	    	    },
	    		items: [
    				//spacer panel
		    		{	
	    				xtype : 'panel',
	    				border:false,
	    				height:10,
	    			    layout: {type: 'vbox',padding: 5}
    				},
			        {
			        	xtype: 'button',
		                text: 'Send Runtime Parameters',
		                handler: function(){
		                	sendRuntimeParameters();
		                }
			        },
    				//spacer panel
		    		{	
	    				xtype : 'panel',
	    				border:false,
	    				height:10,
	    			    layout: {type: 'vbox',padding: 5}
    				},
   	    		    { 
		    			//Tumor Cells
		    			//=============
		    			xtype:'fieldset',
		    			title: 'Tumor Cells',
		    	        //columnWidth: 0.5,
		    	        defaultType: 'textfield',
		    	        defaults: {anchor: '100%'},
		    	        layout: 'anchor',
		    			//checkboxToggle: true,
		    			collapsed: false, // fieldset initially collapsed
		    			
		    			items :[{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'HypoxiaLevelRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('HypoxiaLevelRuntime').setValue(25);
				    	                }else{
				    	                	Ext.getCmp('HypoxiaLevelRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//Number of time steps that the cell does not have sufficient oxygen and starts secreting VEGF
			    				fieldLabel: 'Hypoxia Level',
			    				id: 'HypoxiaLevelRuntime',
			    				name: 'HypoxiaLevel',
			    	            xtype: 'numberfield',
			    				width: 180,
			    				minValue: 10, step:10, maxValue:150, value:25
			    			}]
				        },
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'AnoxiaLevelRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('AnoxiaLevelRuntime').setValue(1000);
				    	                }else{
				    	                	Ext.getCmp('AnoxiaLevelRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
					        	//Number of time steps that the cell does not have sufficient oxygen and dies
			    				fieldLabel: 'Anoxia Level',
			    				id: 'AnoxiaLevelRuntime',
			    				name: 'AnoxiaLevel',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 100, step:100, maxValue:1500, value:1000
			    			}]
		    			}, 
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'CellOxygenUptakeRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('CellOxygenUptakeRuntime').setValue(80);
				    	                }else{
				    	                	Ext.getCmp('CellOxygenUptakeRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//The amount of oxygen a cell consumes every time step
			    				fieldLabel: 'Oxygen Consumption',
			    				id: 'CellOxygenUptakeRuntime',
			    				name: 'CellOxygenUptake',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 10, step:20, maxValue:300, value:80	//parameter values are dependent on other parameters
			    			}]
		    			},
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'NumSecretedVEGFRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('NumSecretedVEGFRuntime').setValue(25);
				    	                }else{
				    	                	Ext.getCmp('NumSecretedVEGFRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//Number of VEGF’s secreted in each pulse
			    				fieldLabel: 'VEGF Secretion Amount',
			    				id: 'NumSecretedVEGFRuntime',
			    				name: 'NumSecretedVEGF',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 5, step:10, maxValue:150, value:25
			    			}]
		    			},
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'NumSecretedFGFRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('NumSecretedFGFRuntime').setValue(100);
				    	                }else{
				    	                	Ext.getCmp('NumSecretedFGFRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//Number of FGF’s secreted in each pulse
			    				fieldLabel: 'FGF Secretion Amount',
			    				id: 'NumSecretedFGFRuntime',
			    				name: 'NumSecretedFGF',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 25, step:25, maxValue:250, value:100
			    			}]
		    			} 			
		    		]},
	    			
	    			//Blood Vessels
	    			//=============
	    	        { 
		    			xtype:'fieldset',
		    			title: 'Blood Vessels',
		    	        //columnWidth: 0.5,
		    	        defaultType: 'textfield',
		    	        defaults: {anchor: '100%'},
		    	        layout: 'anchor',
		    			//checkboxToggle: true,
		    			collapsed: false, // fieldset initially collapsed
		    			
		    			items :[{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'AngioSwitchThresholdRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('AngioSwitchThresholdRuntime').setValue(13);
				    	                }else{
				    	                	Ext.getCmp('AngioSwitchThresholdRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//Minimum VEGF level to initiate angiogenesis
			    				fieldLabel: 'VEGF Level For Angiogenesis',
			    				id: 'AngioSwitchThresholdRuntime',
			    				name: 'AngioSwitchThreshold',
			    	            xtype: 'numberfield',
			    				width: 180,
			    				minValue: 2, step:2, maxValue:20, value:13
			    			}]
		    			},
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'EndoCheckingRadiusRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('EndoCheckingRadiusRuntime').setValue(3);
				    	                }else{
				    	                	Ext.getCmp('EndoCheckingRadiusRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//The radius that the cell checks around it for VEGF’s
			    				fieldLabel: 'Endothelial Sensing Radius',
			    				id: 'EndoCheckingRadiusRuntime',
			    				name: 'EndoCheckingRadius',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:6, value:3	//parameter values are dependent on other parameters
			    			}]
		    			}, 	
		    			 {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'VegfMin4SurvRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('VegfMin4SurvRuntime').setValue(1);
				    	                }else{
				    	                	Ext.getCmp('VegfMin4SurvRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//The minimum amount of VEGF needed for survival of the 
			    				fieldLabel: 'Min VEGF For Survival',
			    				id: 'VegfMin4SurvRuntime',
			    				name: 'VegfMin4Surv',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:10, value:1
			    			}]
		    			}		    			
				    ]},
				    
	    			//Fibroblasts
	    			//=============
	    	        { 
		    			xtype:'fieldset',
		    			title: 'Fibroblasts',
		    	        //columnWidth: 0.5,
		    	        defaultType: 'textfield',
		    	        defaults: {anchor: '100%'},
		    	        layout: 'anchor',
		    			//checkboxToggle: true,
		    			collapsed: false, // fieldset initially collapsed
		    			
		    			items :[{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'NumSecretedHGFRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('NumSecretedHGFRuntime').setValue(10);
				    	                }else{
				    	                	Ext.getCmp('NumSecretedHGFRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//Number of HGF’s secreted in each pulse
			    				fieldLabel: 'Amount HGF Secreted',
			    				id: 'NumSecretedHGFRuntime',
			    				name: 'NumSecretedHGF',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:5, maxValue:100, value:10
			    			}]
		    			},		    			        
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'FibRadiusRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('FibRadiusRuntime').setValue(5);
				    	                }else{
				    	                	Ext.getCmp('FibRadiusRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//The radius that the cell checks around it for tumor cells
			    				fieldLabel: 'Fibroblast Sensing Radius',
			    				id: 'FibRadiusRuntime',
			    				name: 'FibRadius',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:10, value:5
			    			}]
		    			},		    			        
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'ProbToCAFRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('ProbToCAFRuntime').setValue(0.02);
				    	                }else{
				    	                	Ext.getCmp('ProbToCAFRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//The probability for a normal fibroblast to become a cancer associated fibroblast 
			    				fieldLabel: 'Probability To Become a CAF',
			    				id: 'ProbToCAFRuntime',
			    				name: 'ProbToCAF',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 0, step:0.01, maxValue:1, value:0.02
			    			}]
		    			}	    			        
				    
				    ]},
	
	    			//Area
	    			//=============
	    	        { 
		    			xtype:'fieldset',
		    			title: 'Area',
		    	        //columnWidth: 0.5,
		    	        defaultType: 'textfield',
		    	        defaults: {anchor: '100%'},
		    	        layout: 'anchor',
		    			//checkboxToggle: true,
		    			collapsed: false, // fieldset initially collapsed
		    			
		    			items :[{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'OxygenDiffDistRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('OxygenDiffDistRuntime').setValue(1);
				    	                }else{
				    	                	Ext.getCmp('OxygenDiffDistRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    	        	//The number of pixles the oxygen will move every step
			    		        fieldLabel: 'Oxygen Moving Distance',
			    		        id: 'OxygenDiffDistRuntime',
			    		        name: 'OxygenDiffDist',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:5, value:1
			    			}]
		    		    },		    	        
		    		    {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'ProlDurationRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('ProlDurationRuntime').setValue(15);
				    	                }else{
				    	                	Ext.getCmp('ProlDurationRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    		    	//Time it takes for cell to proliferate
			    		        fieldLabel: 'Proliferation Duraion',
			    		        id: 'ProlDurationRuntime',
			    		        name: 'ProlDuration',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 5, step:10, maxValue:50, value:15
			    			}]
		    		    },
		    		    {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'VegfDiffDistRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('VegfDiffDistRuntime').setValue(2);
				    	                }else{
				    	                	Ext.getCmp('VegfDiffDistRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    		    	//The number of pixles the vegf will move every step
			    		        fieldLabel: 'VEGF Moving Distance',
			    		        id: 'VegfDiffDistRuntime',
			    		        name: 'VegfDiffDist',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:5, value:2
			    			}]
		    		    },
		    		    {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'FGFDiffDistRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('FGFDiffDistRuntime').setValue(1);
				    	                }else{
				    	                	Ext.getCmp('FGFDiffDistRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    		    	//The number of pixles the fgf will move every step
			    		        fieldLabel: 'FGF Moving Distance',
			    		        id: 'FGFDiffDistRuntime',
			    		        name: 'FGFDiffDist',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:5, value:1
			    			}]
		    		    },
		    		    {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'HgfDiffDistRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('HgfDiffDistRuntime').setValue(1);
				    	                }else{
				    	                	Ext.getCmp('HgfDiffDistRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    		    	//The number of pixles the hgf will move every step
			    		        fieldLabel: 'HGF Moving Distance',
			    		        id: 'HgfDiffDistRuntime',
			    		        name: 'HgfDiffDist',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:5, value:1
			    			}]
		    		    },
		    		    {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'rateOfMoveOxygenRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('rateOfMoveOxygenRuntime').setValue(3);
				    	                }else{
				    	                	Ext.getCmp('rateOfMoveOxygenRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    		    	//The time in which the oxygen makes one move
			    		        fieldLabel: 'Oxygen Move Rate',
			    		        id: 'rateOfMoveOxygenRuntime',
			    		        name: 'rateOfMoveOxygen',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:5, value:3
			    			}]
		    		    },	
		    		    {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'rateOfMoveVEGFRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('rateOfMoveVEGFRuntime').setValue(2);
				    	                }else{
				    	                	Ext.getCmp('rateOfMoveVEGFRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    		    	//The time in which the Vegf makes one move
			    		    	fieldLabel: 'VEGF Move Rate',
			    		    	id: 'rateOfMoveVEGFRuntime',
			    		    	name: 'rateOfMoveVEGF',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:5, value:2
			    			}]
		    			}, 		    		    
		    		    {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'rateOfMoveFGFRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('rateOfMoveFGFRuntime').setValue(2);
				    	                }else{
				    	                	Ext.getCmp('rateOfMoveFGFRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    		    	//The time in which the FGF makes one move
			    		    	fieldLabel: 'FGF Move Rate',
			    		    	id: 'rateOfMoveFGFRuntime',
			    		    	name: 'rateOfMoveFGF',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:5, value:2
			    			}]
		    			}, 		    		    
		    		    {
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'rateOfMoveHGFRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('rateOfMoveHGFRuntime').setValue(2);
				    	                }else{
				    	                	Ext.getCmp('rateOfMoveHGFRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    		    	//The time in which the HGF makes one move
			    		    	fieldLabel: 'HGF Move Rate',
			    		    	id: 'rateOfMoveHGFRuntime',
			    		    	name: 'rateOfMoveHGF',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:1, maxValue:5, value:2
			    			}]
		    			}, 
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'SecretionRateRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('SecretionRateRuntime').setValue(10);
				    	                }else{
				    	                	Ext.getCmp('SecretionRateRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//The time for one pulse of VEGF/oxygen to be secreted
			    				fieldLabel: 'Secretion Rate',
			    				id: 'SecretionRateRuntime',
			    				name: 'SecretionRate',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 1, step:10, maxValue:50, value:10
			    			}]
		    			},		    			
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'InitProbProliferateRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('InitProbProliferateRuntime').setValue(0.8);
				    	                }else{
				    	                	Ext.getCmp('InitProbProliferateRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//Initial Probability for a cell to proliferate at a given moment
			    		        fieldLabel: 'Probability To Proliferate',
			    		        id: 'InitProbProliferateRuntime',
			    		        name: 'InitProbProliferate',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 0, step:0.1, maxValue:1, value:0.8
			    			}]
		    		    },
		    			{
			    			xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    			items :[{
				    	            xtype: 'checkboxfield',
					    			boxLabel: '  ',
					    			id:'InitProbBindRuntimeCheckBox',
				    	            checked   : false,
				    	            handler: function(checkbox ,checked) {
				    	                if(checked==true){
				    	                	Ext.getCmp('InitProbBindRuntime').setValue(0.8);
				    	                }else{
				    	                	Ext.getCmp('InitProbBindRuntime').setValue(null);
				    	                }
				    	            }
			    			},{
			    				//Initial Probability for a cell to bind a molecule
			    		        fieldLabel: 'Probability To Bind',
			    		        id: 'InitProbBindRuntime',
			    		        name: 'InitProbBind',
			    	            xtype: 'numberfield',
			    				width: 180,
			    	            minValue: 0, step:0.1, maxValue:1, value:0.8
			    			}]
		    		    }     
		    		]},
	    		]
	    	}
        	, 
        	{
	        	id:'selectedCellActionsTab',
	        	autoHeight:true,
	    		autoScroll: true,
	        	title: 'Selected Cell Actions',
	        	border:false,
	    		height: Ext.getCmp('center1').body.dom.clientHeight,  
	    	    layout: {
	    	        type: 'vbox',       // Arrange child items vertically
	    	        align: 'stretch',    // Each takes up full width
	    	        padding: 5
	    	    },
				items: [ 
		    	        { 
			    			xtype:'fieldset',
			    			title: 'Selected Cell',
			    	        //columnWidth: 0.5,
			    	        defaultType: 'textfield',
			    			collapsed: false, // fieldset initially collapsed
				    	    layout: {
				    	        type: 'vbox',       // Arrange child items vertically
				    	        align: 'stretch'//,    // Each takes up full width
				    	        //padding: 10
				    	    },
			    			items :[
	    						{
	    							xtype: 'label',
	    							id:'selectedCellType',
	    					        text: 'Cell Type:',
	    					        height:20
	    					    },
	    						{
	    							xtype: 'label',
	    							id:'selectedCellId',
	    					        text: 'Cell ID:',
	    					        height:20
	    					    },
		    			        {
		    			        	xtype: 'button',
		    		                text: 'Clear Selection',
	    					        height:20, 
		    		                enableToggle: false,
		    		                handler: function(button){
		    		                	Ext.getCmp('selectedCellType').setText('Cell Type:');
		    		                	Ext.getCmp('selectedCellId').setText('Cell ID:');
		    		            		if(INTERSECTED!=undefined && INTERSECTED!=null){
		    		                		INTERSECTED.material = currentMaterial;		//Restore
		    		            			INTERSECTED = null;
		    		                	}
		    		                }
		    			        }
			    			]
		    	        },
		    	        { 
			    			xtype:'fieldset',
			    			title: 'Select Cell',
			    	        //columnWidth: 0.5,
			    	        defaultType: 'textfield',
			    			collapsed: false, // fieldset initially collapsed
				    	    layout: {
				    	        type: 'vbox',       // Arrange child items vertically
				    	        align: 'stretch'//,    // Each takes up full width
				    	        //padding: 10
				    	    },
			    			items :[
		    						{
		    							//xtype: 'label',
		    							xtype: 'combobox',
	    								fieldLabel: 'Type',
	    								id: 'selectCellTypeCombo',
	    							    store: typesStore,
	    							    queryMode: 'local',
	    							    displayField: 'name',
	    							    emptyText: ' ', 
	    							    valueField: 'value'
		    						},
		    						{
					    				fieldLabel: 'ID',
					    				id: 'selectCellDetailsId',
					    				name: 'cellDetailsId',
					    	            xtype: 'numberfield',
					    	            value: 0
		    					    },
		    					    {
			    			        	xtype: 'button',
			    		                text: 'Select',
		    					        height:20, 
			    		                enableToggle: false,
			    		                handler: function(button){
			    		                	setSelectedCell(
			    		                		Ext.getCmp('selectCellDetailsId').value,
			    		                		Ext.getCmp('selectCellTypeCombo').value);
			    		                }
		    					    }
			    			]
		    	        },		    	        
	    				//spacer panel
			    		{	
		    				xtype : 'panel',
		    				border:false,
		    				height:50,
		    			    layout: {type: 'vbox',padding: 5}
	    				},
    			        {
    			        	xtype: 'button',
    		                text: 'Get Cell Details',
					        height:20,
    		                enableToggle: false,
    		                handler: function(button){
    		                	getCellDetails(selectedCellType,selectedCellId);
    		                }
    			        },
	    				//spacer panel
			    		{	
		    				xtype : 'panel',
		    				border:false,
		    				height:10,
		    			    layout: {type: 'vbox',padding: 5}
	    				},
    			        { 
			    			xtype:'fieldset',
			    			title: 'Cell Details',
			    	        defaultType: 'textfield',
			    	        collapsible: true,
			    			collapsed: true, // fieldset initially collapsed
				    	    layout: {
				    	        type: 'vbox',       // Arrange child items vertically
				    	        align: 'stretch'//,    // Each takes up full width
				    	        //padding: 10
				    	    },
			    			items :[    			        
							{
    					        xtype: 'textfield',  					        
								id:'selectedCellDetailsType',
    							fieldLabel: 'Type:',
    							readOnly:true,
    							labelWidth: 100,
    					        width: 50
						    },
							{
						    	xtype: 'textfield',
								id:'selectedCellDetailsId',
								fieldLabel: 'ID:',
    							readOnly:true,
    							labelWidth: 100,
    					        width: 50
						    },
							{
						    	xtype: 'textfield',
								id:'selectedCellDetailsParentId',
								fieldLabel: 'Parent Cell ID:',
    							readOnly:true,
    							labelWidth: 100,
    					        width: 50
						    },
							{
						    	xtype: 'textfield',
								id:'selectedCellDetailsPos',
								fieldLabel: 'Position:   X:,Y:,Z:',
    							readOnly:true,
    							labelWidth: 100,
    					        width: 50
						    },
							{
								xtype: 'label',
								id:'selectedCellDetailsState',
						        text: 'State:',
						        height:20
						    },
							{
								xtype: 'label',
								id:'selectedCellDetailsOxygen',
						        text: 'Oxygen Level:',
						        height:20
						    },
							{
								xtype: 'label',
								id:'selectedCellDetailsVegf',
						        text: 'Vegf Level:',
						        height:20
						    },
							{
								xtype: 'label',
								id:'selectedCellDetailsFgf',
						        text: 'Fgf Level:',
						        height:20
						    }
						]},
    			        {
    			        	xtype: 'button',
    		                text: 'Kill Cell',
					        height:20,
    		                enableToggle: false,
    		                handler: function(button){
    		                	killCell(selectedCellType,selectedCellId);
    		                }
    			        },
	    				//spacer panel
			    		{	
		    				xtype : 'panel',
		    				border:false,
		    				height:10,
		    			    layout: {type: 'vbox',padding: 5}
	    				},
		    	        { 
			    			xtype:'fieldset',
			    			title: 'Generate Event',
			    	        //columnWidth: 0.5,
			    	        defaultType: 'textfield',
			    			collapsed: false, // fieldset initially collapsed
				    	    layout: {
				    	        type: 'vbox',       // Arrange child items vertically
				    	        align: 'stretch'//,    // Each takes up full width
				    	        //padding: 10
				    	    },
			    			items :[
		    						{
		    							xtype: 'combobox',
	    								fieldLabel: 'Event',
	    								id: 'eventsCombo',
	    							    store: eventsStore,
	    							    queryMode: 'local',
	    							    displayField: 'name',
	    							    emptyText: ' ',
	    							    height:20,
	    							    valueField: 'value'
		    						},
		    					    {
			    			        	xtype: 'button',
			    		                text: 'Generate Event',
		    					        height:20, 
			    		                enableToggle: false,
			    		                handler: function(button)
			    		                {
			    		                	generateEvent(selectedCellType,selectedCellId,
				    		                		Ext.getCmp('eventsCombo').getValue()
			    		                	);
			    		                }
		    					    }
			    			]
		    	        },
		    	        { 
			    			xtype:'fieldset',
			    			title: 'Change Parameters',
			    	        //columnWidth: 0.5,
			    	        defaultType: 'textfield',
			    	        height:250, 
			    			collapsed: false, // fieldset initially collapsed
				    	    layout: {
				    	        type: 'vbox',       // Arrange child items vertically
				    	        align: 'stretch'//,    // Each takes up full width
				    	        //padding: 10
				    	    },
			    			items :[
			    			        {
		    	                        xtype: 'radiogroup',
		    	                        //fieldLabel: 'Choose your favorite',
		    	                        id: 'changeParamsRadioGroup',
		    	                        columns: 2,
/*		    				    	    layout: {
		    				    	        type: 'vbox',       // Arrange child items vertically
		    				    	        align: 'stretch'//,    // Each takes up full width
		    				    	        //padding: 10
		    				    	    },
*/		    	                        items: [			    		
  		    	                            //Secretion Rate    
		    	                            {
							    	            xtype: 'radiofield',
							    				name: 'ChangeParametersRadioGroup',
							    	            boxLabel: 'Secretion Rate',
							    				id: 'secretionRateParamRadio',
							    				inputValue: 'secretionRate',
							    				checked: true,
							    	            width: 130,
							    				height:25
				    					    },
		    	                            {
							    				//fieldLabel: 'Secretion Rate',
							    				id: 'secretionRateParam',
							    				name: 'secretionRateParam',
							    	            xtype: 'numberfield',
							    	            value: 0,
							    	            width: 60,
							    	            height:25
				    					    },
				    					    
				    					    //Secretion Amount
		    	                            {
							    	            xtype: 'radiofield',
							    				name: 'ChangeParametersRadioGroup',
							    	            boxLabel: 'Oxygen Absence Duration',
							    				id: 'secretionAmountParamRadio',
							    				inputValue: 'secretionAmount',
							    				width: 130,
							    				height:25
				    					    },
											{
							    				//fieldLabel: 'Secretion Amount',
							    				id: 'secretionAmountParam',
							    				name: 'secretionAmountParam',
							    	            xtype: 'numberfield',
							    	            value: 0,
							    	            width: 60,
							    	            height:25
				    					    },
				    					    
				    					    //Molecules Amount
		    	                            {
							    	            xtype: 'radiofield',
							    				name: 'ChangeParametersRadioGroup',
							    	            boxLabel: 'Molecules Amount',
							    				id: 'moleculesAmountParamRadio',
							    				inputValue: 'moleculesAmount',
							    				width: 130,
							    				height:25
				    					    },
				    						{
							    				//fieldLabel: 'Molecules Amount',
							    				id: 'moleculesAmountParam',
							    				name: 'moleculesAmountParam',
							    	            xtype: 'numberfield',
							    	            value: 0,
							    	            width: 60,
							    	            height:25
				    					    },
				    					    
				    					    //Deactivating Signal
				    						{
							    	            xtype: 'radiofield',
							    				name: 'ChangeParametersRadioGroup',
							    	            boxLabel: 'Deactivating Signal',
							    				id: 'deactivatingSignalAmountRadio',
							    				inputValue: 'deactivatingSignalAmount',
							    				width: 130,
							    				height:25
				    					    },
				    						{
							    				//fieldLabel: 'Deactivating Signal',
							    				id: 'deactivatingSignalAmount',
							    				name: 'deactivatingSignalAmount',
							    	            xtype: 'numberfield',
							    	            value: 0,
							    	            width: 60,
							    	            height:25
				    					    }
				    					    ]
			    			        },
		    					    {
			    			        	xtype: 'button',
			    		                text: 'Change Parameters',
		    					        height:20, 
			    		                enableToggle: false,
			    		                handler: function(button)
			    		                {
			    		                	var checkedItem = Ext.getCmp('changeParamsRadioGroup').getChecked()[0];
			    		                	var paramName, paramVal;
			    		                	
			    		                	//alert(checkedItem.inputValue);
			    		                	if(checkedItem.inputValue=='secretionRate'){
			    		                		paramName = 'secretionRate';
			    		                		paramVal =  Ext.getCmp('secretionRateParam').value;
			    		                	}
			    		                	else if(checkedItem.inputValue=='secretionAmount'){
			    		                		paramName = 'secretionAmount';
			    		                		paramVal =  Ext.getCmp('secretionAmountParam').value;
			    		                	}
			    		                	else if(checkedItem.inputValue=='moleculesAmount'){
			    		                		paramName = 'moleculesAmount';
			    		                		paramVal =  Ext.getCmp('moleculesAmountParam').value;
			    		                	}
			    		                	else if(checkedItem.inputValue=='deactivatingSignalAmount'){
			    		                		paramName = 'deactivatingSignal';
			    		                		paramVal =  Ext.getCmp('deactivatingSignalAmount').value;	
			    		                	}
			    		                	changeParameters(selectedCellType,selectedCellId,
			    		                			paramName, paramVal);
			    		                }
		    					    }
			    			       ]
		    	        }		  		    	        
		    	        
		    	  ]
        	},
        	{
	        	id:'generalActionsTab',
	        	autoHeight:true,
	    		autoScroll: true,
	        	title: 'General Actions',
	        	border:false,
	    		//height: 600,  
	    	    layout: {
	    	        type: 'vbox',       // Arrange child items vertically
	    	        align: 'stretch',    // Each takes up full width
	    	        padding: 5
	    	    },
				items: [
				        //==================================================
		    	        { 
			    			xtype:'fieldset',
			    			title: 'Create a Single Cell',
			    	        defaultType: 'textfield',
			    			collapsed: false, // fieldset initially collapsed
				    	    layout: {
				    	        type: 'vbox',       // Arrange child items vertically
				    	        align: 'stretch'   // Each takes up full width
				    	    },
			    			items :[
	    						{
	    							xtype: 'combobox',
    								fieldLabel: 'Type',
    								id: 'createCellTypeCombo',
    							    store: typesStore,
    							    queryMode: 'local',
    							    editable: false,
    							    enableKeyEvents: false,
    							    displayField: 'name',
    							    emptyText: 'Tumor',
    							    height:20,
    							    valueField: 'value'
	    						},
		        				//spacer panel
		    		    		{	
		    	    				xtype : 'panel',
		    	    				border:false,
		    	    				height:10,
		    	    			    layout: {type: 'vbox',padding: 5}
		        				},
		    			        {
		    			        	xtype: 'button',
		    		                text: 'Start Cell Creation',
		    		                id: 'startCellCreation',
	    					        height:20,
		    		                enableToggle: false,
		    		                handler: function(button){
		    		                	handleCellCreationDummy(true);
		    		                	
		    		                	Ext.getCmp('startCellCreation').setDisabled(true);
		    		                	Ext.getCmp('cancelCellCreation').setDisabled(false);
		    		                	Ext.getCmp('cellCreation').setDisabled(false);
		    		                	
		    		                	Ext.getCmp('cellCreation').focus();
		    		                }
		    			        },	 
		        				//spacer panel
		    		    		{	
		    	    				xtype : 'panel',
		    	    				border:false,
		    	    				height:10,
		    	    			    layout: {type: 'vbox',padding: 5}
		        				},
	    						{
		    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
		    						//bodyStyle: 'padding:5px 5px 0',
		    						items :[
		    				        {
					    				fieldLabel: 'X',
					    				id: 'createCellX',
					    				name: 'createCellX',
					    	            xtype: 'numberfield',
					    	            //hideTrigger: true,
					    	            editable: false,
					    	            keyNavEnabled: false,
					    	            mouseWheelEnabled: false,
					    	            minValue: posLowerLimit, step:1, maxValue:posUpperLimit, value:0,
					    	            height:20,
					    	            labelWidth:10, width: 60,
					    	            listeners: {
					    	                change: function(field, value) {
					    	                	if(addingNewCell==true){
					    	                		newCellO.position.x = value*GUI_SIZE_MULTIPLIER;
					    	                	}
					    	                }
					    	            }
		    					    },
		    						{
		    							xtype: 'label',
		    					        text: ',',
		    					        height:20,
		    					        width: 10
		    					    },
		    						{
					    				fieldLabel: 'Y',
					    				id: 'createCellY',
					    				name: 'createCellY',
					    	            xtype: 'numberfield',
					    	            //hideTrigger: true,
					    	            editable: false,
					    	            keyNavEnabled: false,
					    	            mouseWheelEnabled: false,
					    	            minValue: posLowerLimit, step:1, maxValue:posUpperLimit, value:0,
					    	            height:20,
					    	            labelWidth:10, width: 60,
					    	            listeners: {
					    	                change: function(field, value) {
					    	                	if(addingNewCell==true){
					    	                		newCellO.position.y = value*GUI_SIZE_MULTIPLIER;
					    	                	}
					    	                }
					    	            }
		    					    },
		    						{
		    							xtype: 'label',
		    					        text: ',',
		    					        height:20,
		    					        width: 10
		    					    },
		    						{
					    				fieldLabel: 'Z',
					    				id: 'createCellZ',
					    				name: 'createCellZ',
					    	            xtype: 'numberfield',
					    	            //hideTrigger: true,
					    	            editable: false,
					    	            keyNavEnabled: false,
					    	            mouseWheelEnabled: false,
					    	            minValue: posLowerLimit, step:1, maxValue:posUpperLimit, value:0,
					    	            height:20,
					    	            labelWidth:10, width: 60,
					    	            listeners: {
					    	                change: function(field, value) {
					    	                	if(addingNewCell==true){
					    	                		newCellO.position.z = value*GUI_SIZE_MULTIPLIER;
					    	                	}
					    	                }
					    	            }
		    					    }
		    					    ] 
	    						},
		    		    		{	
		    			            xtype: 'label',
		    			            height: 70,
		    			            text: 'Use the arrow keys to set the location of the new cell on the x,y axes and the PgUp and PgDn keys to set the location of the new cell on the z axis',
		    			            margins: '0 10 10 10'
		    			        },
		    			        {
		    			        	xtype: 'button',
		    		                text: 'Cancel Cell Creation',
		    		                id: 'cancelCellCreation',
	    					        height:20,
	    					        disabled: true,
		    		                enableToggle: false,
		    		                handler: function(button){
		    		                	handleCellCreationDummy(false);
		    		                	
		    		                	Ext.getCmp('startCellCreation').setDisabled(false);
		    		                	Ext.getCmp('cancelCellCreation').setDisabled(true);
		    		                	Ext.getCmp('cellCreation').setDisabled(true);
		    		                }
		    			        },
		        				//spacer panel
		    		    		{	
		    	    				xtype : 'panel',
		    	    				border:false,
		    	    				height:10,
		    	    			    layout: {type: 'vbox',padding: 5}
		        				},
		    			        {
		    			        	xtype: 'button',
		    		                text: 'Create Cell',
		    		                id: 'cellCreation',
		    		                disabled: true,
	    					        height:20,
		    		                enableToggle: false,
		    		                handler: function(button){
		    		                	//alert("Creating cell/s...");
		    		    				
		    		                	createNewCell(
		    		                			Ext.getCmp('createCellTypeCombo').getValue(),
		    		                			newCellO.position.x/GUI_SIZE_MULTIPLIER,
		    		                			newCellO.position.y/GUI_SIZE_MULTIPLIER,
		    		                			newCellO.position.z/GUI_SIZE_MULTIPLIER,
		    		                			1	//amount
		    		                	);
		    		                	handleCellCreationDummy(false);
		    		                	
		    		                	Ext.getCmp('startCellCreation').setDisabled(false);
		    		                	Ext.getCmp('cancelCellCreation').setDisabled(true);
		    		                	Ext.getCmp('cellCreation').setDisabled(true);
		    		                }
		    			        }
	    					    
			    			]
		    	        },
				        //==================================================
		    	        { 
			    			xtype:'fieldset',
			    			title: 'Create Multiple Cells',
			    	        //columnWidth: 0.5,
			    	        defaultType: 'textfield',
			    			collapsed: false, // fieldset initially collapsed
			    			//margin: "10 0 0 0",  // Same as CSS ordering (top, right, bottom, left)
							//hideEmptyLabel : false,
				    	    layout: {
				    	        type: 'vbox',       // Arrange child items vertically
				    	        align: 'stretch'    // Each takes up full width
				    	        //padding: 10
				    	    },
			    			items :[
	    						{
	    							xtype: 'combobox',
    								fieldLabel: 'Type',
    								id: 'createMultiCellTypeCombo',
    							    store: typesStore,
    							    editable: false,
    							    queryMode: 'local',
    							    displayField: 'name',
    							    emptyText: 'Tumor',
    							    height:20,
    							    valueField: 'value'
	    						},
	    						{
				    				fieldLabel: 'Amount',
				    				id: 'createCellAmount',
				    				name: 'createMultiCellAmount',
				    	            xtype: 'numberfield',
    							    editable: false,
				    	            value: 1,
				    	            height:20,
				    				width: 50
	    					    },
		    			        {
		    			        	xtype: 'button',
		    		                text: 'Create',
	    					        height:20,
		    		                enableToggle: false,
		    		                handler: function(button){
		    		                	//alert("Creating cell/s...");
		    		                	createNewCell(
		    		                			Ext.getCmp('createMultiCellTypeCombo').getValue(),
		    		                			-99,-99,-99,
		    		                			Ext.getCmp('createCellAmount').getValue()
		    		                	);
		    		                	handleCellCreationDummy(false);
		    		                }
		    			        }
	    					    
			    			]
		    	        }
		    	        ,
		    	        { 
			    			xtype:'fieldset',
			    			title: 'Kill Cells',
			    	        defaultType: 'textfield',
			    			collapsed: false, // fieldset initially collapsed
				    	    layout: {
				    	        type: 'vbox',       // Arrange child items vertically
				    	        align: 'stretch'    // Each takes up full width
				    	    },
			    			items :[
	    						{
	    							xtype: 'combobox',
    								fieldLabel: 'Type',
    								id: 'killCellsTypeCombo',
    							    store: typesStore,
    							    editable: false,
    							    queryMode: 'local',
    							    displayField: 'name',
    							    emptyText: ' ',
    							    height:20,
    							    valueField: 'value'
	    						},
	    						{
				    				fieldLabel: 'Amount',
				    				id: 'killCellAmount',
				    				name: 'killCellAmount',
				    	            xtype: 'numberfield',
    							    editable: false,
				    	            value: 1,
				    	            height:20,
				    				width: 50
	    					    },
		    			        {
		    			        	xtype: 'button',
		    		                text: 'Kill Cells',
	    					        height:20,
		    		                enableToggle: false,
		    		                handler: function(button){
		    		                	//alert("Killing cell/s...");
		    		                	killCells( 
		    		                		Ext.getCmp('killCellsTypeCombo').getValue(),
		    		                		Ext.getCmp('killCellAmount').getValue()
		    		                	);
		    		                	//killCell(selectedCellType,selectedCellId);
		    		                }
		    			        }
	    					    
			    			]
		    	        }
		    	  ]
        	}        	        	
        	]
	 });
}

