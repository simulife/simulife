
//setObjectsVisibility
function setObjectsVisibility(objectType,checked)
{
	for(var i=0; i<scene.__objects.length; i++){
	    sceneObj=scene.__objects[i];
	    if(sceneObj.type == objectType)
    	{
	    	if(checked==true){
				sceneObj.visibility = 'userSelectedAsVisible';
				if(sceneObj.sliceAction != 'invisibleDueToSlicing'){
					sceneObj.visible = true; 
				}
    		}else{
				sceneObj.visibility = 'userSelectedAsInvisible'; 
    			sceneObj.visible = false;
    		}
    	}
	}
	

}

//setObjectVisibility
function setObjectVisibility(object, isVisible)
{
	var i = scene.__objects.indexOf( object );
	var sceneObj=scene.__objects[i];
	
   	sceneObj.visible = isVisible;
}
