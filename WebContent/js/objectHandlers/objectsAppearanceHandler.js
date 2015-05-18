
var cellsAppearance='Realistic Cells'; 
 
//handleObjectsAppearance
function handleObjectsAppearance(newVal)
{
	if(cellsAppearance == newVal){
		return;		//nothing changed
	}
	cellsAppearance = newVal;
	
/*	for(var i=0; i<scene.__objects.length; i++){ 
	    sceneObj=scene.__objects[i];
	    if(sceneObj.type == 'tumor')
    	{
	    	if(cellsAppearance=='Realistic Cells'){
				sceneObj.geometry = tumorGeometry;
				sceneObj.material = tumorMaterial;
    		}else{
				sceneObj.geometry = simpleTumorGeometry;
				sceneObj.material = simpleTumorMaterial;
    		}
    	}
	}
*/	

}
