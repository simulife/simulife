
//removeGraphicObject
function removeGraphicObject(id,x,y,z,type)
{
	uniqueId = getUniqueId(id,type);

	if(type==TUMOR)	//when tumor cell dies, its color changes to dark blue
	{
		var tumorObj = objectsArray[uniqueId];
		
		if(tumorObj==undefined || tumorObj==null){
			return;
		}
		if(Ext.getCmp('necroticTumorVisibleCheckBox').checked==true){
			if(tumorObj.sliceAction != 'invisibleDueToSlicing'){
				setObjectVisibility(tumorObj,true);
			}
		}else{
			setObjectVisibility(tumorObj,false);
		}

		tumorObj.type='necrotic';
		if(cellsAppearance=='Realistic Cells'){
			setTumorToBeNecrotic(tumorObj);
		}else{
			tumorObj.material = simpleTumorNecroticMaterial;	//change color
		}

	}
	else if(type==ENDO)	 
	{
		var objectToRemove = objectsArray[uniqueId];

		if(objectToRemove==undefined || objectToRemove==null){
			return;
		}
		scene.remove(objectToRemove);
		
		totalNumOfEndoObjects--;

		uniqueId = uniqueId + type*1000000;
		objectToRemove = objectsArray[uniqueId];
		if(objectToRemove==undefined || objectToRemove==null){
			return;
		}
		scene.remove(objectToRemove);
	}
	else //FIBRO	 
	{
		var objectToRemove = objectsArray[uniqueId];

		if(objectToRemove==undefined || objectToRemove==null){
			return;
		}
		scene.remove(objectToRemove);
		totalNumOfFibroObjects--;
	}
	
}