
function createCellsPercentageChart()
{
	var cellsPieStore = Ext.create('Ext.data.JsonStore', {
	    fields: ['name', 'numOfCells']
	}); 

	//Pie Chart
	//=========
	Ext.create('Ext.chart.Chart', {
	    renderTo :Ext.getCmp('footer1').body,
	    id: 'cellsPieChart',
	    width: 300,
	    height: 200,
	    animate: true,
	    store: cellsPieStore,
	    theme: 'Base:gradients',
	    series: [{
	        type: 'pie',
	        field: 'numOfCells',
	        showInLegend: true,
	        colorSet: ["#A1A1A1", "#ff0000", "#00ff00", "#D2691E"],
	        tips: {
	          trackMouse: true,
	          width: 100,
	          height: 35,
	          renderer: function(storeItem, item) {
	            //calculate and display percentage on hover
	            var total = 0;
	            cellsPieStore.each(function(rec) {
	                total += rec.get('numOfCells');
	            });
	            this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('numOfCells') / total * 100) + '%');
	          }
	        },
	        highlight: {
	          segment: {
	            margin: 20
	          }
	        },
	        label: {
	            field: 'name',
	            display: 'rotate',
	            contrast: true,
	            font: '18px Arial'
	        }
	    }]    
	});	

	var pieData = [
	               ['Tumor', 0],
	               ['Endothelial',0], 
	               ['Fibroblast',0],
	               ['Empty',1]
	];
	cellsPieStore.loadData(pieData);

}
