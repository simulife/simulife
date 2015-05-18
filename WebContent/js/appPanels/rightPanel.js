
function createRightPanel()
{
	var controlsStore = Ext.create('Ext.data.Store', {
	    fields: ['value', 'name'],
	    data : [
	        {"value":"TrackBall", "name":"TrackBall"},
	        {"value":"Fly", "name":"Fly"}
	    ]
	});

	var compareStore = Ext.create('Ext.data.Store', {
	    fields: ['value', 'name'],
	    data : [
	        {"value":"1", "name":"<"},
	        {"value":"2", "name":">"}
	        //{"value":"3", "name":" "}
	    ]
	});


	var tabs = new Ext.TabPanel({
        	renderTo: Ext.getCmp('east1').body,
        	activeTab: 0,
        	region: 'center',
        	//title: 'User Interface',
        	//iconCls: 'nav',
        	items: [
        	    {
		        	id:'controls1',
		        	autoHeight:true,
					title: 'General',
		        	border:false,
		    		//height: 100,  
		    		autoScroll: true,
		    	    layout: {
		    	        type: 'vbox',       // Arrange child items vertically
		    	        align: 'stretch',    // Each takes up full width
		    	        padding: 5
		    	    },
		    		items: [
		    		{	
						xtype:'fieldset',
						defaultType: 'textfield',
						collapsed: false, // fieldset initially collapsed
						layout: {
							type: 'vbox',       // Arrange child items vertically
							align: 'stretch'    // Each takes up full width
						},
		    			items :[
	    			        {
								xtype: 'checkboxfield',
								id:'updateGraphsId',
								boxLabel: 'Update Graphs',
								checked   : false,
								handler: function(checkbox ,checked) {
									if(checked==true){
										updateGraphs=true;
									}else{
										updateGraphs=false; 
									}
								}	    						
	    			        },
							{
								xtype: 'combobox',
								fieldLabel: 'Controls',
								id: 'controls2', 
								store: controlsStore,
								editable: false,
								queryMode: 'local',
								displayField: 'name',
								labelWidth: 50,
								width:150,
								emptyText: 'TrackBall', 
								valueField: 'value',
								listeners: {
								    select: function(v) {
								    	selectedControls = v.value;
								    }
								}								
							}] 
	    			},

		    		{	//VISIBLE OBJECTS PANEL
	    				xtype : 'fieldset',
	    				border:true,
	    				title: 'Objects Visibility',
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
    						{
			    	            xtype: 'checkboxfield',
			    	            id:'tumorVisibleCheckBox',
				    			boxLabel: 'Live Tumor Cells',
			    	            checked   : true,
			    	            handler: function(checkbox ,checked) {
		    	                	setObjectsVisibility('tumor',checked);
			    	            }	    						
    						},
    						{
			    	            xtype: 'checkboxfield',
			    	            id:'necroticTumorVisibleCheckBox',
				    			boxLabel: 'Necrotic Tumor Cells',
			    	            checked   : true,
			    	            handler: function(checkbox ,checked) {
		    	                	setObjectsVisibility('necrotic',checked);
			    	            }	    						
    						},
    						{
			    	            xtype: 'checkboxfield',
			    	            id:'endoVisibleCheckBox',
				    			boxLabel: 'Blood Vessels',
			    	            checked   : true,
			    	            handler: function(checkbox ,checked) {
		    	                	setObjectsVisibility('endothelial',checked);
			    	            }	    						
    						},
    						{
			    	            xtype: 'checkboxfield',
			    	            id:'fibroVisibleCheckBox',
				    			boxLabel: 'Fibroblasts',
			    	            checked   : true,
			    	            handler: function(checkbox ,checked) {
		    	                	setObjectsVisibility('fibroblast',checked);
			    	            }	    						
    						},
    						{
			    	            xtype: 'checkboxfield',
			    	            id: OXYGEN,
				    			boxLabel: 'Oxygen',
			    	            checked   : true,
			    	            handler: function(checkbox ,checked) {
		    	                	setObjectsVisibility(OXYGEN,checked);
			    	            }	    						
    						},
    						{
			    	            xtype: 'checkboxfield',
			    	            id: VEGF,
				    			boxLabel: 'Vegf',
			    	            checked   : true,
			    	            handler: function(checkbox ,checked) {
		    	                	setObjectsVisibility(VEGF,checked);
			    	            }	    						
    						}
    						
    						] 
	    				},
	    			
					{
			    			xtype:'fieldset',
			    			title: 'Slice',
			    	        defaultType: 'textfield',
			    			collapsed: false, // fieldset initially collapsed
				    	    layout: {
				    	        type: 'vbox',       // Arrange child items vertically
				    	        align: 'stretch'    // Each takes up full width
				    	    },
			    			items :[
		    			        {
									xtype: 'checkboxfield',
									id:'showAxes',
									boxLabel: 'Show Axes',
									checked   : false,
									handler: function(checkbox ,checked) {
										if(checked==true){
											axisObj.visible=true;
										}else{
											axisObj.visible=false;
										}
									}	    						
			    			    },
					    		{	
				    				xtype : 'panel',
				    				border:false,
				    				height:20,
				    			    layout: {type: 'vbox',padding: 5}
			    				},
	    						{
		    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
		    						//bodyStyle: 'padding:5px 5px 0',
		    						items :[
									{
										xtype: 'checkboxfield',
										id:'compareXCheckbox',
										boxLabel: 'X (Red)',
										checked   : true,
										handler: function(checkbox ,checked) {
											//setObjectsVisibility('Tumor',checked);
										}	    						
									},
		    						{
		    							xtype: 'combobox',
	    								id: 'compareXCombo',
	    								fieldLabel: ' ',
	    							    store: compareStore,
	    							    queryMode: 'local',
	    							    displayField: 'name',
	    							    emptyText: '<',
										disabled: true,
	    							    valueField: 'value',
	    							    labelWidth:10, width: 50
		    						},
		    				        {
					    				id: 'sliceX',
					    				name: 'sliceX',
					    	            xtype: 'numberfield',
	    							    editable: false,
					    	            value: 0,
					    	            //height:20,
					    	            labelWidth:10, width: 40
		    					    }] 
	    						},		
	    						{
		    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
		    						//bodyStyle: 'padding:5px 5px 0',
		    						items :[
									{
										xtype: 'checkboxfield',
										id:'compareYCheckbox',
										boxLabel: 'Y (Green)',
										checked   : false,
										handler: function(checkbox ,checked) {
											//setObjectsVisibility('Tumor',checked);
										}	    						
									},
		    						{
		    							xtype: 'combobox',
	    								id: 'compareYCombo',
					    				fieldLabel: ' ',
	    							    store: compareStore,
	    							    queryMode: 'local',
	    							    displayField: 'name',
	    							    emptyText: '<',
										disabled: true,
	    							    valueField: 'value',
	    							    labelWidth:10, width: 50
		    						},
		    						{
					    				id: 'sliceY',
					    				name: 'sliceY',
					    	            xtype: 'numberfield',
	    							    editable: false,
					    	            value: 0,
					    	            height:20,
					    	            labelWidth:10, width: 40
		    					    }
		    					    ] 
	    						},		
								{
		    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
		    						//bodyStyle: 'padding:5px 5px 0',
		    						items :[
									{
										xtype: 'checkboxfield',
										id:'compareZCheckbox',
										boxLabel: 'Z (Blue)',
										checked   : false,
										handler: function(checkbox ,checked) {
											//setObjectsVisibility('Tumor',checked);
										}	    						
									},
									{
					    				fieldLabel: ' ',
		    							xtype: 'combobox',
	    								id: 'compareZCombo', 
	    							    store: compareStore,
	    							    queryMode: 'local',
	    							    displayField: 'name',
	    							    emptyText: '<',
										disabled: true,
	    							    valueField: 'value',
	    							    labelWidth:10, width: 50
		    						},
		    						{
					    				id: 'sliceZ',
					    				name: 'sliceZ',
					    	            xtype: 'numberfield',
	    							    editable: false,
					    	            value: 0,
					    	            height:20,
					    	            labelWidth:10, width: 40
		    					    }
		    					    ] 
	    						},		
/*	    						{
				    				fieldLabel: 'X',
				    				id: 'xSlice',
				    				name: 'xSlice',
				    	            xtype: 'numberfield',
				    	            value: 0,
				    	            height:20,
				    				width: 50
	    					    },
*/	    					    
	    						//compareCombo,
		    			        {
		    			        	xtype: 'button',
		    		                text: 'Reset Camera',
	    					        height:20,
		    		                enableToggle: false,
		    		                handler: function(button){
		    		                	resetCamera();
		    		                }
		    			        },
			    				//spacer panel
					    		{	
				    				xtype : 'panel',
				    				border:false,
				    				height:20,
				    			    layout: {type: 'vbox',padding: 5}
			    				},
		    			        {
		    			        	xtype: 'button',
		    		                text: 'Slice',
	    					        height:20,
		    		                enableToggle: false,
		    		                handler: function(button){
		    		                	slice();
		    		                }
		    			        },
			    				//spacer panel
					    		{	
				    				xtype : 'panel',
				    				border:false,
				    				height:20,
				    			    layout: {type: 'vbox',padding: 5}
			    				},
		    			        {
		    			        	xtype: 'button',
		    		                text: 'UnSlice All',
	    					        height:20,
		    		                enableToggle: false,
		    		                handler: function(button){
		    		                	unSlice();
		    		                }
		    			        }
	    					    
			    			]
		    	        }
		    		]        		
        		},
        	    {
		        	id:'advancedTab',
		        	autoHeight:true,
					title: 'Colors',
		        	border:false,
		    		height: Ext.getCmp('center1').body.dom.clientHeight,  
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
			    				height:20,
			    			    layout: {type: 'vbox',padding: 5}
		    				},
	    			        {
	    			        	xtype: 'button',
	    		                text: 'Reset Colors',
    					        height:20,
	    		                enableToggle: false,
	    		                handler: function(button){
	    		                	resetColors();
	    		                }
	    			        },
		    				//spacer panel
				    		{	
			    				xtype : 'panel',
			    				border:false,
			    				height:20,
			    			    layout: {type: 'vbox',padding: 5}
		    				},
			    	        { 
				    			xtype:'fieldset',
				    			title: 'Tumor Cell Colors',
				    	        defaults: {anchor: '100%'},
				    	        layout: 'anchor',
				    	        //columnWidth: 0.5,
				    	        defaultType: 'textfield',
				    			collapsed: false, // fieldset initially collapsed
				    			//margin: "10 0 0 0",  // Same as CSS ordering (top, right, bottom, left)
								//hideEmptyLabel : false,
/*					    	    layout: {
					    	        type: 'vbox',       // Arrange child items vertically
					    	        align: 'stretch'    // Each takes up full width
					    	        //padding: 10
					    	    },
*/				    			items :[
		    						{
			    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    						//bodyStyle: 'padding:5px 5px 0',
			    						title: 'Color (R G B)',
			    						items :[
			    				        {
						    				//fieldLabel: 'Color',
						    				id: 'tumorColorR',
						    				name: 'tumorColorR',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:30, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorColorR(newVal);
						    	                }
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Y',
						    				id: 'tumorColorG',
						    				name: 'tumorColorG',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorColorG(newVal);						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Z',
						    				id: 'tumorColorB',
						    				name: 'tumorColorB',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorColorB(newVal);						    	            	}
						    	            }
			    					    }
			    					    ] 
		    						}
		    						,
		    						{
			    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    						//bodyStyle: 'padding:5px 5px 0',
			    						title: 'Ambient (R G B)',
			    						items :[
			    				        {
						    				//fieldLabel: 'Ambient',
						    				id: 'tumorAmbientR',
						    				name: 'tumorAmbientR',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:30, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorAmbientR(newVal);
						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Y',
						    				id: 'tumorAmbientG',
						    				name: 'tumorAmbientG',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorAmbientG(newVal);
						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Z',
						    				id: 'tumorAmbientB',
						    				name: 'tumorAmbientB',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorAmbientB(newVal);
						    	            	}
						    	            }	
			    					    }
			    					    ] 
		    						}
		    					    ,
		    						{
			    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    						//bodyStyle: 'padding:5px 5px 0',
			    						title: 'Specular (R G B)',
			    						items :[
			    				        {
						    				//fieldLabel: 'Specular',
						    				id: 'tumorSpecularR',
						    				name: 'tumorSpecularR',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:30, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorSpecularR(newVal);
						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Y',
						    				id: 'tumorSpecularG',
						    				name: 'tumorSpecularG',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorSpecularG(newVal);
						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Z',
						    				id: 'tumorSpecularB',
						    				name: 'tumorSpecularB',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorSpecularB(newVal);						    	            	
						    	            	}
						    	            }	
			    					    }
			    					    ] 
		    						}	
		    					    ,
		    						{
			    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    						//bodyStyle: 'padding:5px 5px 0',
			    						title: 'Emissive (R G B)',
			    						items :[
			    				        {
						    				//fieldLabel: 'Emissive',
						    				id: 'tumorEmissiveR',
						    				name: 'tumorEmissiveR',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:30, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorEmissiveR(newVal);
						    	            	}						    	            		
						    	            }						    	            
			    					    },
			    						{
						    				//fieldLabel: 'Y',
						    				id: 'tumorEmissiveG',
						    				name: 'tumorEmissiveG',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorEmissiveG(newVal);						    	            	
						    	            	}
						    	            }						    	            
			    					    },
			    						{
						    				//fieldLabel: 'Z',
						    				id: 'tumorEmissiveB',
						    				name: 'tumorEmissiveB',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
//						    	            change: function(field, newVal, oldVal) {
//					    	                	alert('a');
//						    	            }	    						
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorEmissiveB(newVal);						    	            	
						    	            	}
						    	            }						    	            
			    					    }
			    					    ] 
		    						}
		    					    
				    			]
			    	        }		   
			    	        ,
			    	        //{
			    	        { 
				    			xtype:'fieldset',
				    			title: 'Tumor Necrotic Cell Colors',
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
			    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    						//bodyStyle: 'padding:5px 5px 0',
			    						title: 'Color (R G B)',
			    						items :[
			    				        {
						    				//fieldLabel: 'Color',
						    				id: 'tumorNecroticColorR',
						    				name: 'tumorNecroticColorR',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:30, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorNecroticColorR(newVal);
						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Y',
						    				id: 'tumorNecroticColorG',
						    				name: 'tumorNecroticColorG',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorNecroticColorG(newVal);
						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Z',
						    				id: 'tumorNecroticColorB',
						    				name: 'tumorNecroticColorB',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorNecroticColorB(newVal);
						    	            	}
						    	            }	
			    					    }
			    					    ] 
		    						}
		    						,
		    						{
			    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    						//bodyStyle: 'padding:5px 5px 0',
			    						title: 'Ambient (R G B)',
			    						items :[
			    				        {
						    				//fieldLabel: 'Ambient',
						    				id: 'tumorNecroticAmbientR',
						    				name: 'tumorNecroticAmbientR',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:30, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorNecroticAmbientR(newVal);
						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Y',
						    				id: 'tumorNecroticAmbientG',
						    				name: 'tumorNecroticAmbientG',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorNecroticAmbientG(newVal);
						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Z',
						    				id: 'tumorNecroticAmbientB',
						    				name: 'tumorNecroticAmbientB',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorNecroticAmbientB(newVal);
						    	            	}
						    	            }	
			    					    }
			    					    ] 
		    						}
		    					    ,
		    						{
			    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    						//bodyStyle: 'padding:5px 5px 0',
			    						title: 'Specular (R G B)',
			    						items :[
			    				        {
						    				//fieldLabel: 'Specular',
						    				id: 'tumorNecroticSpecularR',
						    				name: 'tumorNecroticSpecularR',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:30, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorNecroticSpecularR(newVal);
						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Y',
						    				id: 'tumorNecroticSpecularG',
						    				name: 'tumorNecroticSpecularG',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorNecroticSpecularG(newVal);
						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Z',
						    				id: 'tumorNecroticSpecularB',
						    				name: 'tumorNecroticSpecularB',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorNecroticSpecularB(newVal);
						    	            	}
						    	            }	
			    					    }
			    					    ] 
		    						}	
		    					    ,
		    						{
			    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    						//bodyStyle: 'padding:5px 5px 0',
			    						title: 'Emissive (R G B)',
			    						items :[
			    				        {
						    				//fieldLabel: 'Emissive',
						    				id: 'tumorNecroticEmissiveR',
						    				name: 'tumorNecroticEmissiveR',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:30, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorNecroticEmissiveR(newVal);
						    	            	}
						    	            }						    	            
			    					    },
			    						{
						    				//fieldLabel: 'Y',
						    				id: 'tumorNecroticEmissiveG',
						    				name: 'tumorNecroticEmissiveG',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorNecroticEmissiveG(newVal);
						    	            	}
						    	            }						    	            
			    					    },
			    						{
						    				//fieldLabel: 'Z',
						    				id: 'tumorNecroticEmissiveB',
						    				name: 'tumorNecroticEmissiveB',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
//						    	            change: function(field, newVal, oldVal) {
//					    	                	alert('a');
//						    	            }	    						
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setTumorNecroticEmissiveB(newVal);
						    	            	}
						    	            }						    	            
			    					    }
			    					    ] 
		    						}
		    					    
				    			]
			    	        },		   			    	        
			    	        //}
			    	        //{
			    	        { 
				    			xtype:'fieldset',
				    			title: 'Fibroblast Cell Colors',
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
			    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    						//bodyStyle: 'padding:5px 5px 0',
			    						title: 'Color (R G B)',
			    						items :[
			    				        {
						    				//fieldLabel: 'Color',
						    				id: 'fibroColorR',
						    				name: 'fibroblastColorR',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:30, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setFibroColorR(newVal);
						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Y',
						    				id: 'fibroColorG',
						    				name: 'fibroblastColorG',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setFibroColorG(newVal);
						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Z',
						    				id: 'fibroColorB',
						    				name: 'fibroblastColorB',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setFibroColorB(newVal);
						    	            	}
						    	            }	
			    					    }
			    					    ] 
		    						}
		    						,
		    						{
			    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    						//bodyStyle: 'padding:5px 5px 0',
			    						title: 'Ambient (R G B)',
			    						items :[
			    				        {
						    				//fieldLabel: 'Ambient',
						    				id: 'fibroAmbientR',
						    				name: 'fibroblastAmbientR',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:30, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setFibroAmbientR(newVal);
						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Y',
						    				id: 'fibroAmbientG',
						    				name: 'fibroblastAmbientG',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setFibroAmbientG(newVal);
						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Z',
						    				id: 'fibroAmbientB',
						    				name: 'fibroblastAmbientB',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setFibroAmbientB(newVal);
						    	            	}
						    	            }	
			    					    }
			    					    ] 
		    						}
		    					    ,
		    						{
			    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    						//bodyStyle: 'padding:5px 5px 0',
			    						title: 'Specular (R G B)',
			    						items :[
			    				        {
						    				//fieldLabel: 'Specular',
						    				id: 'fibroSpecularR',
						    				name: 'fibroblastSpecularR',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:30, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setFibroSpecularR(newVal);
						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Y',
						    				id: 'fibroSpecularG',
						    				name: 'fibroblastSpecularG',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setFibroSpecularG(newVal);
						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Z',
						    				id: 'fibroSpecularB',
						    				name: 'fibroblastSpecularB',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setFibroSpecularB(newVal);
						    	            	}
						    	            }	
			    					    }
			    					    ] 
		    						}	
		    					    ,
		    						{
			    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    						//bodyStyle: 'padding:5px 5px 0',
			    						title: 'Emissive (R G B)',
			    						items :[
			    				        {
						    				//fieldLabel: 'Emissive',
						    				id: 'fibroEmissiveR',
						    				name: 'fibroblastEmissiveR',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:30, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setFibroEmissiveR(newVal);
						    	            	}
						    	            }						    	            
			    					    },
			    						{
						    				//fieldLabel: 'Y',
						    				id: 'fibroEmissiveG',
						    				name: 'fibroblastEmissiveG',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setFibroEmissiveG(newVal);
						    	            	}
						    	            }						    	            
			    					    },
			    						{
						    				//fieldLabel: 'Z',
						    				id: 'fibroEmissiveB',
						    				name: 'fibroblastEmissiveB',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
//						    	            change: function(field, newVal, oldVal) {
//					    	                	alert('a');
//						    	            }	    						
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setFibroEmissiveB(newVal);
						    	            	}
						    	            }						    	            
			    					    }
			    					    ] 
		    						}
		    					    
				    			]
			    	        },		   			    	        
			    	        //}
			    	        { 
				    			xtype:'fieldset',
				    			title: 'Endothelial Cell Colors',
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
			    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    						//bodyStyle: 'padding:5px 5px 0',
			    						title: 'Color (R G B)',
			    						items :[
			    				        {
						    				//fieldLabel: 'Color',
						    				id: 'endoColorR',
						    				name: 'endothelialColorR',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:30, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setEndoColorR(newVal);						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Y',
						    				id: 'endoColorG',
						    				name: 'endothelialColorG',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setEndoColorG(newVal);
						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Z',
						    				id: 'endoColorB',
						    				name: 'endothelialColorB',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setEndoColorB(newVal);
						    	            	}
						    	            }	
			    					    }
			    					    ] 
		    						}
		    						,
		    						{
			    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    						//bodyStyle: 'padding:5px 5px 0',
			    						title: 'Ambient (R G B)',
			    						items :[
			    				        {
						    				//fieldLabel: 'Ambient',
						    				id: 'endoAmbientR',
						    				name: 'endothelialAmbientR',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:30, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setEndoAmbientR(newVal);
						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Y',
						    				id: 'endoAmbientG',
						    				name: 'endothelialAmbientG',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setEndoAmbientG(newVal);
						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Z',
						    				id: 'endoAmbientB',
						    				name: 'endothelialAmbientB',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setEndoAmbientB(newVal);
						    	            	}
						    	            }	
			    					    }
			    					    ] 
		    						}
		    					    ,
/*		    						{
			    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    						//bodyStyle: 'padding:5px 5px 0',
			    						title: 'Specular (R G B)',
			    						items :[
			    				        {
						    				//fieldLabel: 'Specular',
						    				id: 'endoSpecularR',
						    				name: 'endothelialSpecularR',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:30, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		var val = (newVal+1)/256;
						    	            		localStorage.endothelialSpecularR = newVal
						    	            		endoMaterial.specular.r = val;
						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Y',
						    				id: 'endoSpecularG',
						    				name: 'endothelialSpecularG',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		var val = (newVal+1)/256;
						    	            		localStorage.endothelialSpecularG = newVal
						    	            		endoMaterial.specular.g = val;
						    	            	}
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Z',
						    				id: 'endoSpecularB',
						    				name: 'endothelialSpecularB',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		var val = (newVal+1)/256;
						    	            		localStorage.endothelialSpecularB = newVal
						    	            		endoMaterial.specular.b = val;
						    	            	}
						    	            }	
			    					    }
			    					    ] 
		    						}	
		    					    ,
*/		    						{
			    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    						//bodyStyle: 'padding:5px 5px 0',
			    						title: 'Emissive (R G B)',
			    						items :[
			    				        {
						    				//fieldLabel: 'Emissive',
						    				id: 'endoEmissiveR',
						    				name: 'endothelialEmissiveR',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:30, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setEndoEmissiveR(newVal);
						    	            	}
						    	            }						    	            
			    					    },
			    						{
						    				//fieldLabel: 'Y',
						    				id: 'endoEmissiveG',
						    				name: 'endothelialEmissiveG',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setEndoEmissiveG(newVal);
						    	            	}
						    	            }						    	            
			    					    },
			    						{
						    				//fieldLabel: 'Z',
						    				id: 'endoEmissiveB',
						    				name: 'endothelialEmissiveB',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
//						    	            change: function(field, newVal, oldVal) {
//					    	                	alert('a');
//						    	            }	    						
						    	            listeners: {
						    	            	'change': function(field, newVal, oldVal){
						    	            		setEndoEmissiveB(newVal);
						    	            	}
						    	            }						    	            
			    					    }
			    					    ] 
		    						}
		    					    
				    			]
			    	        }
			    	        /*
			    	        aaaa
			    	        ,		   			    	        
			    	        //}
			    	        { 
				    			xtype:'fieldset',
				    			title: 'Background Image Colors',
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
			    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    						//bodyStyle: 'padding:5px 5px 0',
			    						title: 'Color (R G B)',
			    						items :[
			    				        {
						    				//fieldLabel: 'Color',
						    				id: 'backgroundColorR',
						    				name: 'backgroundColorR',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:30, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(){
						    	                	changeBackgroundColor();
						    	                }
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Y',
						    				id: 'backgroundColorG',
						    				name: 'backgroundColorG',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(){
						    	                	changeBackgroundColor();
						    	                }
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Z',
						    				id: 'backgroundColorB',
						    				name: 'backgroundColorB',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(){
						    	                	changeBackgroundColor();
						    	                }
						    	            }	
			    					    }
			    					    ] 
		    						}
		    						,
		    						{
			    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    						//bodyStyle: 'padding:5px 5px 0',
			    						title: 'Ambient (R G B)',
			    						items :[
			    				        {
						    				//fieldLabel: 'Ambient',
						    				id: 'backgroundAmbientR',
						    				name: 'backgroundAmbientR',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:30, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(){
						    	                	changeBackgroundAmbient();
						    	                }
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Y',
						    				id: 'backgroundAmbientG',
						    				name: 'backgroundAmbientG',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(){
						    	                	changeBackgroundAmbient();
						    	                }
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Z',
						    				id: 'backgroundAmbientB',
						    				name: 'backgroundAmbientB',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(){
						    	                	changeBackgroundAmbient();
						    	                }
						    	            }	
			    					    }
			    					    ] 
		    						}
		    					    ,
		    						{
			    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    						//bodyStyle: 'padding:5px 5px 0',
			    						title: 'Specular (R G B)',
			    						items :[
			    				        {
						    				//fieldLabel: 'Specular',
						    				id: 'backgroundSpecularR',
						    				name: 'backgroundSpecularR',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:30, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(){
						    	                	changeBackgroundSpecular();
						    	                }
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Y',
						    				id: 'backgroundSpecularG',
						    				name: 'backgroundSpecularG',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(){
						    	                	changeBackgroundSpecular();
						    	                }
						    	            }	
			    					    },
			    						{
						    				//fieldLabel: 'Z',
						    				id: 'backgroundSpecularB',
						    				name: 'backgroundSpecularB',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(){
						    	                	changeBackgroundSpecular();
						    	                }
						    	            }	
			    					    }
			    					    ] 
		    						}	
		    					    ,
		    						{
			    						xtype:'fieldset', border:false, padding: 0, layout: 'column',
			    						//bodyStyle: 'padding:5px 5px 0',
			    						title: 'Emissive (R G B)',
			    						items :[
			    				        {
						    				//fieldLabel: 'Emissive',
						    				id: 'backgroundEmissiveR',
						    				name: 'backgroundEmissiveR',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:30, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(){
						    	                	changeBackgroundEmissive();
						    	                }
						    	            }						    	            
			    					    },
			    						{
						    				//fieldLabel: 'Y',
						    				id: 'backgroundEmissiveG',
						    				name: 'backgroundEmissiveG',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
						    	            listeners: {
						    	            	'change': function(){
						    	                	changeBackgroundEmissive();
						    	                }
						    	            }						    	            
			    					    },
			    						{
						    				//fieldLabel: 'Z',
						    				id: 'backgroundEmissiveB',
						    				name: 'backgroundEmissiveB',
						    	            xtype: 'numberfield',
						    	            minValue: -10, step:1, maxValue:255, value:-1,
						    	            height:20,
						    	            //labelWidth:10, 
						    	            width: 50,
//						    	            change: function(field, newVal, oldVal) {
//					    	                	alert('a');
//						    	            }	    						
						    	            listeners: {
						    	                //'change': function(field, newVal, oldVal){
						    	            		var val = (newVal+1)/256;
						    	            	'change': function(){
						    	                	changeBackgroundEmissive();
						    	                }
						    	            }						    	            
			    					    }
			    					    ] 
		    						}
		    					    
				    			]
			    	        }	*/	   			    	        
			    	        //}

		    		]
        		
        	    } 
	    	  ]
        });
}
