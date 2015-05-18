
var endoGeometry, endoMesh;
var totalNumOfEndoObjects;
var endoObjectsArray, endoNumberOfNewObjects;
var ENDO = 2;

var endoMaterial, endoBranchMaterial, endoMoveMaterial;

var endoCylinderGeometry, endoCylinderEdgeGeometry;

//endothelialInit
function endothelialInit()
{
	endoObjectsArray = new Array();
	endoNumberOfNewObjects = 0;
	totalNumOfEndoObjects = 0;
	
	createEndoMaterials();
	createEndoGeometries();

	setEndoColors();
	
	//endoMesh = new THREE.Mesh( endoGeometry, endoMaterial );
	
	endothelialLocalStorageInit(); 
	//resetEndoColors();

}

//setEndoColors
function setEndoColors()
{
	//Save defaults
	defaultEndoColor = new THREE.Color();
	//defaultEndoColor.setRGB(endoMaterial.color.r,endoMaterial.color.g,endoMaterial.color.b);
	defaultEndoColor.setRGB(1, 0.75, 0.8);
	
	defaultEndoAmbient = new THREE.Color();
	//defaultEndoAmbient.setRGB(endoMaterial.ambient.r,endoMaterial.ambient.g,endoMaterial.ambient.b);
	defaultEndoAmbient.setRGB(0,0,0);
	
/*	defaultEndoSpecular = new THREE.Color();
	defaultEndoSpecular.setRGB(endoMaterial.specular.r,endoMaterial.specular.g,endoMaterial.specular.b);
*/	
	defaultEndoEmissive = new THREE.Color();
	//defaultEndoEmissive.setRGB(endoMaterial.emissive.r,endoMaterial.emissive.g,endoMaterial.emissive.b);
	defaultEndoEmissive.setRGB(0,0,0);
}

//createEndoMaterials
function createEndoMaterials()
{
	endoMaterial =	new THREE.MeshLambertMaterial({color: 0xDD0000});
	endoBranchMaterial = new THREE.MeshLambertMaterial({color: 0xD2691E});
	endoMoveMaterial = new THREE.MeshLambertMaterial({color: 0xD43D1A});
}

//createEndoGeometries
function createEndoGeometries()
{
	//endoGeometry 	= new THREE.SphereGeometry( CELL_RADIUS, 10, 10 );	//radius,segments,rings
	endoGeometry 	= new THREE.SphereGeometry( 2, 10, 10 );	//radius,segments,rings
	endoGeometry .computeVertexNormals();
	endoGeometry.computeBoundingSphere();
	
	endoCylinderGeometry = new THREE.CylinderGeometry( 
    		5, 						//topRad, 
    		5, 						//botRad, 
    		20, 					//direction.length(), 
    		10,						//radSegs, 
    		4);						//heightSegs );
	
	endoCylinderEdgeGeometry = new THREE.SphereGeometry( 5, 10, 4 );	//radius,segments,rings 
 
}

//createEndoCell
function createEndoCell(id,parentId, x,y,z, type)
{
	totalNumOfEndoObjects++;
	
	//createEndoWithMerging(id,x,y,z,type);
	return createEndoWithoutMerging(id,x,y,z,type, parentId);
}	
	
//createEndoWithMerging
/*function createEndoWithMerging(id,x,y,z,type)
{
	//var name="Endo"+id;
	
	totalNumOfEndoObjects++;
	endoNumberOfNewObjects = createTypeAndMergeIfNeeded(
			endoMesh, endoGeometry, endoMaterial
		,endoObjectsArray, endoNumberOfNewObjects,x,y,z);
}
*/

//createEndoWithoutMerging
function createEndoWithoutMerging(id,x,y,z,type, parentId)
{
/*	var mesh = new THREE.Mesh(endoGeometry, endoMaterial);
	mesh.position.x = x * GUI_SIZE_MULTIPLIER;
	mesh.position.y = y * GUI_SIZE_MULTIPLIER;
	mesh.position.z = z * GUI_SIZE_MULTIPLIER;
*/	
	var curPos = new THREE.Vector3(x * GUI_SIZE_MULTIPLIER ,y * GUI_SIZE_MULTIPLIER ,z * GUI_SIZE_MULTIPLIER);
	var parentMesh = objectsArray[type*10000000 + parentId];
	var parentMeshPos;
	
	
	if(parentMesh!=undefined){
		parentMeshPos = parentMesh.spherePos;
	}else{
		parentMeshPos = curPos;
	}
	
	var meshEdge = new THREE.Mesh( endoCylinderEdgeGeometry, endoMaterial );
	meshEdge.position = curPos;
	
	meshEdge.type="endothelial";
	meshEdge.generalType="cell";
	meshEdge.visibility = 'visible';
	meshEdge.sliceAction = 'unsliced';
	meshEdge.intType=type;
	meshEdge.isRealistic='false';
	
	meshEdge.spherePos = curPos;
	uniqueId = type*11000000 + id;
	objectsArray[uniqueId]=meshEdge;
	
	if(Ext.getCmp('endoVisibleCheckBox').checked==true){
		if(meshEdge.sliceAction != 'invisibleDueToSlicing'){
			meshEdge.visible = true;
		}
	}else{
		meshEdge.visible = false;
	}
	meshEdge.objId=id;
	scene.add( meshEdge );
	
	var mesh = createCylinderMesh(
			parentMeshPos, 
			curPos,
			endoMaterial, 5, 5, 6, 4);
	
	mesh.objId=id;
	//mesh.origId = id - (type*10000000);

	//mesh.type="Endo";
	mesh.type="endothelial";
	mesh.generalType="cell";
	mesh.visibility = 'visible';
	mesh.sliceAction = 'unsliced';
	mesh.intType=type;
	mesh.isRealistic='false';
	
	mesh.spherePos = curPos;
	uniqueId = getUniqueId(id,type);
	objectsArray[uniqueId]=mesh;
	
	if(Ext.getCmp('endoVisibleCheckBox').checked==true){
		if(mesh.sliceAction != 'invisibleDueToSlicing'){
			mesh.visible = true;
		}
	}else{
		mesh.visible = false;
	}
	scene.add( mesh );
	return mesh;
}

var createCylinderMeshV58 = function(point1, point2, material)
{
    var direction = new THREE.Vector3().subVectors(point2, point1);
    var arrow = new THREE.ArrowHelper(direction.clone().normalize(), point1);

    var rotation = new THREE.Vector3().setEulerFromQuaternion(arrow.quaternion);

    var edgeGeometry = new THREE.CylinderGeometry( 2, 2, direction.length(), 10, 4 );

    var edge = new THREE.Mesh(edgeGeometry, material);
    edge.rotation = rotation.clone();
    edge.position = new THREE.Vector3().addVectors(point1, direction.multiplyScalar(0.5));

    return edge;
}

var createCylinderMesh = function( pointX, pointY, material,
		topRad, botRad, radSegs, heightSegs)
{
    // edge from X to Y
    var direction = new THREE.Vector3().subVectors( pointY, pointX );
    var arrow = new THREE.ArrowHelper( direction, pointX );

    // cylinder: radiusAtTop, radiusAtBottom, 
    //     height, radiusSegments, heightSegments
    var edgeGeometry = new THREE.CylinderGeometry( 
    		topRad, 
    		botRad, 
    		direction.length(), 
    		radSegs, 
    		heightSegs );

    //console.log('cylinder length:' + direction.length());
    
    var edge = new THREE.Mesh( edgeGeometry, material );
    
//    var edge = new THREE.Mesh( endoCylinderGeometry, material );
    edge.rotation = arrow.rotation.clone();
    edge.position = new THREE.Vector3().addVectors( pointX, direction.multiplyScalar(0.5) );
    return edge;
}
