
var INTERSECTED;

var _mouse = new THREE.Vector3();
var _projector = new THREE.Projector();

document.addEventListener('contextmenu', onDocumentMouseDown, false);
document.addEventListener('mousemove', onDocumentMouseMove, false);
document.addEventListener( 'keydown', onKeyDown1, false );

var selectedMaterial = new THREE.MeshLambertMaterial({color: 0x00FFFF});
var currentMaterial; 
var selectedCellType, selectedCellId; 

var ray, intersects, visibleIntersects;

var addingNewCell = false;
var newCellGeometry = new THREE.SphereGeometry( CELL_RADIUS*1.1, 10, 10 );	//radius, widthSegments, heightSegments
var newCellMaterial = new THREE.MeshLambertMaterial({color: 0xFF00FF});
var newCellO = null;

var posLowerLimit = -50;
var posUpperLimit = 50;

//onKeyDown1
function onKeyDown1(event)
{
	//console.log(event.keyCode);
	if(addingNewCell==true){
		Ext.getCmp('cellCreation').focus();
	}
	switch ( event.keyCode ) 
	{
		case 104:	//up arrow
		case 38:	//up arrow
			if(addingNewCell==true){
				if(newCellO.position.y/GUI_SIZE_MULTIPLIER==posUpperLimit){
					return;	//limit reached 
				}
				newCellO.position.y = newCellO.position.y+(GUI_SIZE_MULTIPLIER);
				Ext.getCmp('createCellY').setValue(newCellO.position.y/GUI_SIZE_MULTIPLIER);
			}
			break
		case 98:	//down arrow
		case 40:	//down arrow			
			if(addingNewCell==true){
				if(newCellO.position.y/GUI_SIZE_MULTIPLIER==posLowerLimit){
					return;	//limit reached
				}
				newCellO.position.y = newCellO.position.y-(GUI_SIZE_MULTIPLIER);
				Ext.getCmp('createCellY').setValue(newCellO.position.y/GUI_SIZE_MULTIPLIER);
			}
			break
		case 102:	//right arrow
		case 39:	//right arrow
			if(addingNewCell==true){
				if(newCellO.position.x/GUI_SIZE_MULTIPLIER==posUpperLimit){
					return;	//limit reached
				}
				newCellO.position.x = newCellO.position.x+(GUI_SIZE_MULTIPLIER);
				Ext.getCmp('createCellX').setValue(newCellO.position.x/GUI_SIZE_MULTIPLIER);
			}
			break
		case 100:	//left arrow
		case 37:	//left arrow			
			if(addingNewCell==true){
				if(newCellO.position.x/GUI_SIZE_MULTIPLIER==posLowerLimit){
					return;	//limit reached
				}
				newCellO.position.x = newCellO.position.x-(GUI_SIZE_MULTIPLIER);
				Ext.getCmp('createCellX').setValue(newCellO.position.x/GUI_SIZE_MULTIPLIER);
			}
			break
		case 99:	//pageDown
		case 34:	//pageDown
			if(addingNewCell==true){
				if(newCellO.position.z/GUI_SIZE_MULTIPLIER==posUpperLimit){
					return;	//limit reached
				}
				newCellO.position.z = newCellO.position.z+(GUI_SIZE_MULTIPLIER);
				Ext.getCmp('createCellZ').setValue(newCellO.position.z/GUI_SIZE_MULTIPLIER);
			}
			break
		case 105:	//pageUp
		case 33:	//pageUp
			if(addingNewCell==true){
				if(newCellO.position.z/GUI_SIZE_MULTIPLIER==posLowerLimit){
					return;	//limit reached
				}
				newCellO.position.z = newCellO.position.z-(GUI_SIZE_MULTIPLIER);
				Ext.getCmp('createCellZ').setValue(newCellO.position.z/GUI_SIZE_MULTIPLIER);
			}
			break
/*		case 78:	//n
			if(addingNewCell==false){
				handleCellCreationDummy(true);
			}
			else{
				handleCellCreationDummy(false);
			}
			break
*/			
	}			
}

//handleCellCreationDummy
function handleCellCreationDummy(start)
{
	if(start==true)
	{
		addingNewCell=true;
		
		resetCamera();
		Ext.getCmp('showAxes').setValue(true);
		
		newCellO = new THREE.Mesh( newCellGeometry, newCellMaterial );
		newCellO.position.set(0,0,GUI_SIZE_MULTIPLIER*50);
		newCellO.name = 'dummyCreationCell';
		
		Ext.getCmp('createCellX').setValue(0);
		Ext.getCmp('createCellY').setValue(0);
		Ext.getCmp('createCellZ').setValue(50);
		
		scene.add( newCellO );
	}
	else	//stop
	{
		addingNewCell=false;
		Ext.getCmp('showAxes').setValue(false);
		scene.remove( newCellO );
	}
}

//intersectionInit
function intersectionInit(event)
{
	if(renderer==null || renderer.domElement==null){
		return false;
	}
    event.preventDefault(); 

    _mouse.x = ( (event.clientX-leftPanelWidht) / renderer.domElement.width) * 2 - 1; 
    _mouse.y = -( (event.clientY-30) / renderer.domElement.height) * 2 + 1;

    ray = _projector.pickingRay(_mouse, camera);
	intersects = ray.intersectObjects( scene.children );

	visibleIntersects=null;
	if ( intersects!=undefined && intersects.length > 0)
	{
		for(var i=0;i<intersects.length;i++){
			if(intersects[i].object.visible==true){
				visibleIntersects=intersects[i].object;
				return true;
			}
		}
	}
	return true;
}

//onDocumentMouseMove
function onDocumentMouseMove(event) 
{
	if (! INTERSECTED ){	//previously intersected
		return false;
	}
	if(intersectionInit(event)==false){
		return;
	}
	//CURRENTLY INTERSECTS
	if ( visibleIntersects!=null)	 
	{
		if ( INTERSECTED != visibleIntersects ) 
		{
			clearTooltip();

			//INTERSECTED.material = currentMaterial;		//Restore
			//INTERSECTED = null;
		}
	} 
	//DOES NOT INTERSECT CURRENTLY
	else 						
	{
		clearTooltip();
		
		//INTERSECTED.material = currentMaterial;		//Restore
		//INTERSECTED = null;
	}

}

//onDocumentMouseDown
function onDocumentMouseDown(event) 
{
	if(intersectionInit(event)==false){
		return;
	}
    // update sprite position
    //tooltipSprite.position.set( event.clientX-leftPanelWidht-50, event.clientY-90, 0 ); 
    tooltipSprite.position.set( event.clientX-leftPanelWidht, event.clientY, 0 );

	//CURRENTLY INTERSECTS
	if ( visibleIntersects!=null
			&& visibleIntersects.name != "sky" 
			&& visibleIntersects.name != "dummyCreationCell" )
	{
		if ( INTERSECTED != visibleIntersects ) 
		{
			if ( INTERSECTED ){		//previously intersected
				INTERSECTED.material = currentMaterial;		//Restore
			}
			INTERSECTED = visibleIntersects;
			currentMaterial = INTERSECTED.material;
			INTERSECTED.material = selectedMaterial;
			
			// update text, if it has a "name" field.
			if ( INTERSECTED.type ){
				showTooltip();
			}
			if(addingNewCell==true && newCellO!=null){
				newCellO.position.set(
						INTERSECTED.position.x,
						INTERSECTED.position.y,
						INTERSECTED.position.z);
				
				Ext.getCmp('createCellX').setValue(newCellO.position.x/GUI_SIZE_MULTIPLIER);
				Ext.getCmp('createCellY').setValue(newCellO.position.y/GUI_SIZE_MULTIPLIER);
				Ext.getCmp('createCellZ').setValue(newCellO.position.z/GUI_SIZE_MULTIPLIER);
			}
			
		}
	} 
	//DOES NOT INTERSECT CURRENTLY
	else 						
	{
		clearTooltip();
		
		if ( INTERSECTED ) {
			INTERSECTED.material = currentMaterial;		//Restore
		}
		INTERSECTED = null;
	}
    
}


// ================== tooltip ================================

var message, id, type;
var metrics, metWidth;

//showTooltip
function showTooltip()
{
	tooltipContext.clearRect(0,0,640,480);
	id = INTERSECTED.objId;
	type = INTERSECTED.type;
	
	message = createTooltipMessage(id,type);	//"ID: " + id + "\nType: " + type;
	
	//setSelectedCell(id,type,INTERSECTED.intType);
	setSelectedCell(id,type);
	
	metrics = tooltipContext.measureText(message);
	metWidth = metrics.width;
	tooltipContext.fillStyle = "rgba(0,0,0,0.95)"; // black border
	tooltipContext.fillRect( 0,0, metWidth+8,20+8);
	tooltipContext.fillStyle = "rgba(255,255,255,0.95)"; // white filler
	tooltipContext.fillRect( 2,2, metWidth+4,20+4 );
	tooltipContext.fillStyle = "rgba(0,0,255,1)"; // text color

	tooltipContext.fillText( message, 4,20 );
	
	tooltipTexture.needsUpdate = true;	

}

//createTooltipMessage
function createTooltipMessage(id,type)
{
	var idStr = id.toString();
	var temp,res;
	
	if(idStr.length<7){
		res = "ID: " + id + "\nType: " + type;
		return res;
	}
	temp = idStr.substr(1);	//remove leading char
	res = +temp;
	
	return "ID: " + res + "\nType: " + type; 
}

//clearTooltip
function clearTooltip()
{
	tooltipContext.clearRect(0,0,300,300);
	tooltipTexture.needsUpdate = true;	
}

//setSelectedCell
//function setSelectedCell(id,type,intType)
function setSelectedCell(id,type)
{
	Ext.getCmp('selectedCellType').setText('Cell Type: ' + type);
	Ext.getCmp('selectedCellId').setText('Cell ID: ' + id);
	selectedCellType = type;
	//selectedCellId = id - (intType*10000000);
	selectedCellId = id;
}

