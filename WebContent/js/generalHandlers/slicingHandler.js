
var tempSlicedObjects = new Array();
var tempSlicedObjectId = 0;

//cube				
var cube_geo = new THREE.CubeGeometry( skyBoxSize, skyBoxSize, skyBoxSize );
var cube_mesh = new THREE.Mesh( cube_geo, new THREE.MeshLambertMaterial({color: 0x888888}) );
//cube_mesh.position.x = -(skyBoxSize/2);
var cube_bsp;

var sceneObj_bsp;
var subtract_bsp;
var subtract_bsp_mesh;

var sceneObj;

//slice
function slice()
{
	unSlice();
	
	if(Ext.getCmp('compareXCheckbox').checked==true){
		sliceScene('x');
	}
	if(Ext.getCmp('compareYCheckbox').checked==true){
		sliceScene('y');
	}
	if(Ext.getCmp('compareZCheckbox').checked==true){
		sliceScene('z');
	}
}

//sliceScene
function sliceScene(axis)
{
	for(var i=0; i<scene.__objects.length; i++)
	{
	    sceneObj=scene.__objects[i];
		if(sceneObj.generalType != "cell" || sceneObj.sliceAction == 'invisibleDueToSlicing' ){
			continue;
		}
		handleSlicing(axis);
	}		

	//add tempSlicedObjects to the scene
	for(var i=0; i<tempSlicedObjects.length; i++)
	{
		scene.add(tempSlicedObjects[i]);
	}
	tempSlicedObjects = new Array();
	tempSlicedObjectId = 0;
}

//handleSlicing
function handleSlicing(axis)
{
	if(sceneObj.visible == false)	{ 
		return;
	}
	var radius = sceneObj.geometry.boundingSphere.radius;
	if(sceneObj.isRealistic=='true'){
		if(sceneObj.type=="tumor" || sceneObj.type=='necrotic'){
			radius = radius*tumorScale;
		}
		else if(sceneObj.type=="fibroblast"){
			radius = radius*fibroScale;
		}
	}
	var position;
	var tmpVal, compareValue;

	if(axis=='x'){
		tmpVal = Ext.getCmp('sliceX').value;
		if(tmpVal < -1000 || tmpVal > 1000){
			compareValue=0;
		}else{
			compareValue = tmpVal * GUI_SIZE_MULTIPLIER;
		}
		position = sceneObj.position.x;
		cube_mesh.position.set(-(skyBoxSize/2)+compareValue, 0 , 0);
		cube_bsp = new ThreeBSP( cube_mesh );		
	}
	else if(axis=='y'){
		tmpVal = Ext.getCmp('sliceY').value;
		if(tmpVal < -1000 || tmpVal > 1000){
			compareValue=0;
		}else{
			compareValue = tmpVal * GUI_SIZE_MULTIPLIER;
		}
		position = sceneObj.position.y;
		cube_mesh.position.set(0, -(skyBoxSize/2)+compareValue, 0);
		cube_bsp = new ThreeBSP( cube_mesh );		
	}
	else if(axis=='z'){
		tmpVal = Ext.getCmp('sliceZ').value;
		if(tmpVal < -1000 || tmpVal > 1000){
			compareValue=0;
		}else{
			compareValue = tmpVal * GUI_SIZE_MULTIPLIER;
		}
		position = sceneObj.position.z;
		cube_mesh.position.set(0, 0, -(skyBoxSize/2)+compareValue );
		cube_bsp = new ThreeBSP( cube_mesh );		
	}

	if(position + radius < compareValue)
	{
		sceneObj.visible = false;
		sceneObj.sliceAction = 'invisibleDueToSlicing';
	}
	else	
	{
		if(position - radius < compareValue)
		{
			sceneObj.sliceAction = 'invisibleDueToSlicing';
			
			sceneObj_bsp = new ThreeBSP( sceneObj );
			subtract_bsp = sceneObj_bsp.subtract( cube_bsp );
			
			subtract_bsp_mesh = subtract_bsp.toMesh( sceneObj.material );

			if(sceneObj.isRealistic=='true'){
				if(sceneObj.type=="tumor"  || sceneObj.type=='necrotic'){
					subtract_bsp_mesh.scale.x = subtract_bsp_mesh.scale.y = subtract_bsp_mesh.scale.z = tumorScale;
					subtract_bsp_mesh.material.bumpScale = tumorBumpScale;
				}
				else if(sceneObj.type=="fibroblast"){
					subtract_bsp_mesh.scale.x = subtract_bsp_mesh.scale.y = subtract_bsp_mesh.scale.z = fibroScale;
					subtract_bsp_mesh.material.bumpScale = fibroBumpScale;
				}
				subtract_bsp_mesh.rotation.x = sceneObj.rotation.x; 
				subtract_bsp_mesh.rotation.y = sceneObj.rotation.y;
				subtract_bsp_mesh.rotation.z = sceneObj.rotation.z;
				
				subtract_bsp_mesh.isRealistic='true'
			}
			subtract_bsp_mesh.geometry.computeVertexNormals();
			
			subtract_bsp_mesh.type = sceneObj.type;
			subtract_bsp_mesh.sliced = "true";
			
			subtract_bsp_mesh.generalType = "cell";
			subtract_bsp_mesh.visible = sceneObj.visible;
			sceneObj.visible = false;
			
			//scene.add( subtract_bsp_mesh );
			tempSlicedObjects[tempSlicedObjectId++] = subtract_bsp_mesh;
		}
	}	

}

//unSlice
function unSlice()
{
	var forRemoval = new Array();
	var forRemovalIndex=0;
	var obj;
	
	for(var i=0; i<scene.__objects.length; i++)
	{
	    obj=scene.__objects[i];
		
		if(obj.sliceAction == 'invisibleDueToSlicing'){
			if(obj.visibility != 'userSelectedAsInvisible'){
				obj.visible = true;	//back to be visible
			}
		}
		if(obj.sliced == "true"){
			forRemoval[forRemovalIndex++] = obj;
		}

		obj.sliceAction = 'unsliced';
	}		

	for(var i=0; i<forRemoval.length; i++)
	{
		scene.remove(forRemoval[i]);
	}

	tempSlicedObjects = new Array();
	tempSlicedObjectId = 0;
}

//resetCamera
function resetCamera()
{
	//THREE.TrackballControls.resetCamera();
	controls.reset();
}

