
//moveGraphicObject
function moveGraphicObject(id,x,y,z,type)
{
	uniqueId = getUniqueId(id,type);

	var objectToMove = objectsArray[uniqueId];
	
	if(objectToMove==null || objectToMove==undefined){
		//console.log('trying to move an unfound object: ' + uniqueId);
		return;
	}

	if(objectToMove==undefined || objectToMove==null)
	{
		//console.log(">>> objectToMove " + uniqueId + " was not found");
		return;
	}

	objectToMove.position.set( 
		x*GUI_SIZE_MULTIPLIER, y*GUI_SIZE_MULTIPLIER, z*GUI_SIZE_MULTIPLIER );

	//change color 
/*	if(type==TUMOR)	
	{
		if(cellsAppearance=='Realistic Cells'){
			objectToMove.material = tumorMoveMaterial;
		}else{
			objectToMove.material = simpleTumorMoveMaterial;
		}
	}
	else if(type==FIBRO)	
	{
		//objectToMove.material = fibroMoveMaterial;
	}
	else if(type==ENDO)	
	{
		objectToMove.material = endoMoveMaterial;
	}*/
	
	//console.log('object moved ' + uniqueId);
}
 