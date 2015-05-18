
function createAmountVsTimeChart()
{
	var amountsVsTimeStore = Ext.create('Ext.data.JsonStore', {
        fields: ['time', 'Tumor', 'Endothelial', 'Fibroblast', 'Vegf'] 
	}); 

	Ext.create('Ext.chart.Chart', { 
	    //renderTo: Ext.getBody(),
	    renderTo :Ext.getCmp('footer1').body,
	    id: 'amountsVsTimeChart',
	    width: 600,
	    height: 200,
	    store: amountsVsTimeStore, 
	    animate: true,
	    shadow: true,
	    //saveDelay:5000,
	    theme: 'Category1',
	    legend: {
	        position: 'right'
	    }
	,
	    axes: [{
	    	//Num Of Cells
	        type: 'Numeric',
	        minimum: 0,
	        position: 'left',
	        fields: ['Tumor', 'Endothelial', 'Fibroblast', 'Vegf'],
	        title: 'Number of Cells',
	        //minorTickSteps: 1,
	        grid: {
	            odd: {
	                opacity: 1,
	                fill: '#ddd',
	                stroke: '#bbb',
	                'stroke-width': 0.5
	            }
	        }
	    }
	    , 
	    {
	    	//Clock Ticks
	        type: 'Numeric',
	        position: 'bottom',
	        fields: ['time'],
	        title: 'Time (Clock Ticks)'
	    }
	    
	    ]
	    ,
	    
	    //LINES
	    series: [{
	        type: 'line',
	        highlight: {
	            size: 7,
	            radius: 7
	        },
	        axis: 'left',
	        xField: 'time',
	        yField: 'Tumor',
	        style: {
	            stroke: '#A1A1A1',
	            fill: '#A1A1A1'
	        },
	        markerConfig: {
	            type: 'cross',
	            size: 4,
	            radius: 4,
	            'stroke-width': 0
	        }
	    }, {
	        type: 'line',
	        highlight: {
	            size: 7,
	            radius: 7
	        },
	        axis: 'left',
	        smooth: true,
	        xField: 'time',
	        yField: 'Endothelial',
	        style: {
	            stroke: '#ff0000',
	            fill: '#ff0000'
	        },
	        markerConfig: {
	            type: 'circle',
	            size: 4,
	            radius: 4,
	            'stroke-width': 0
	        }
	    }, {
	        type: 'line',
	        highlight: {
	            size: 7,
	            radius: 7
	        },
	        axis: 'left',
	        smooth: true,
	        xField: 'time',
	        yField: 'Fibroblast',
	        style: {
	            stroke: '#00ff00',
	            fill: '#00ff00'
	        },
	        markerConfig: {
	            type: 'circle',
	            size: 4,
	            radius: 4,
	            'stroke-width': 0
	        }
	    }, {
	        type: 'line',
	        highlight: {
	            size: 7,
	            radius: 7
	        },
	        axis: 'left',
	        smooth: true,
	        xField: 'time',
	        yField: 'Vegf',
	        style: {
	            stroke: '#0000ff',
	            fill: '#0000ff'
	        },
	        markerConfig: {
	            type: 'circle',
	            size: 4,
	            radius: 4,
	            'stroke-width': 0
	        }
	    }]
	    
	});
	
	var lineChartData = [
         	        [0, 0, 0, 0, 0]
   	];
   	amountsVsTimeStore.loadData(lineChartData);
	
}

