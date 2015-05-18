
var fibroDaeFilename= './images/collada/fibro7.dae';
var fibroBumpFilename = './images/collada/fiber_bump.png';

var fibroGeometry, fibroMesh;
var simpleFibroGeometry, simpleFibroMaterial;

var fibroObjectsArray, fibroNumberOfNewObjects;
var totalNumOfFibroObjects;

//invisible related vars
//var maxNumOfVisibleCells = 500000;
var invisibleObjects;
var objToMakeInvisible;
var FIBRO = 3;
var fibroDae;

var fibroMaterial, fibroMoveMaterial; 

//fibroInit
function fibroInit()
{
	fibroObjectsArray = new Array();
	invisibleObjects = new Array();

	fibroNumberOfNewObjects = 0;
	totalNumOfFibroObjects = 0;

	loadFibroColladaFile();
}

//loadFibroColladaFile
function loadFibroColladaFile()
{
	loader.load(fibroDaeFilename, function ( collada )
	{
		dae = collada.scene;
		bumpMap = THREE.ImageUtils.loadTexture(fibroBumpFilename);
		
		dae.children[0].material.bumpMap = bumpMap;
		dae.updateMatrix();

		fibroGeometry = dae.children[0].geometry;	
		fibroMaterial = dae.children[0].material;
		
		createFibroGeometries();
		createFibroMaterials();
		
		setFibroColors();
		fibroblastLocalStorageInit();
		//resetFibroColors();

	} );
}

//setFibroColors
function setFibroColors()
{
	//Save defaults
	defaultFibroColor = new THREE.Color();
	//defaultFibroColor.setRGB(fibroMaterial.color.r,fibroMaterial.color.g,fibroMaterial.color.b);
	defaultFibroColor.setRGB(0, 0.98, 0.6);
	
	defaultFibroAmbient = new THREE.Color();
	//defaultFibroAmbient.setRGB(fibroMaterial.ambient.r,fibroMaterial.ambient.g,fibroMaterial.ambient.b);
	defaultFibroAmbient.setRGB(0,0,0);
	
	defaultFibroSpecular = new THREE.Color();
	//defaultFibroSpecular.setRGB(fibroMaterial.specular.r,fibroMaterial.specular.g,fibroMaterial.specular.b);
	defaultFibroSpecular.setRGB(0,0,0);
	
	defaultFibroEmissive = new THREE.Color();
	//defaultFibroEmissive.setRGB(fibroMaterial.emissive.r,fibroMaterial.emissive.g,fibroMaterial.emissive.b);
	defaultFibroEmissive.setRGB(0,0,0);
}

//createFibroMaterials
function createFibroMaterials()
{
	simpleFibroMaterial =	new THREE.MeshLambertMaterial({color: 0x00DD00});
	simpleFibroMoveMaterial = new THREE.MeshLambertMaterial({color: 0x86C67C});
}

//createFibroGeometries
function createFibroGeometries()
{
	simpleFibroGeometry	= new THREE.SphereGeometry( CELL_RADIUS, 10, 10 );	//radius,segments,rings
	simpleFibroGeometry.computeBoundingSphere();
	simpleFibroGeometry .computeVertexNormals();
}

//createFibroCell
function createFibroCell(id,x,y,z,type)
{
	totalNumOfFibroObjects++;
	
	//createFibroWithMerging(id,x,y,z,type);
	createFibroWithoutMerging(id,x,y,z,type);
}	
	
//createFibroWithMerging
function createFibroWithMerging(id,x,y,z,type)
{
	var name="Fibro"+id;
	
	fibroNumberOfNewObjects = createTypeAndMergeIfNeeded(
			fibroMesh, fibroGeometry, fibroMaterial
		,fibroObjectsArray, fibroNumberOfNewObjects,x,y,z,id,type,name);
	
	if(mergedObject!=false)
	{
		fibroObjectsArray = new Array();
		fibroObjectsArray[0] = mergedObject;
		fibroNumberOfNewObjects = 1;
	}
	
}

//createFibroWithoutMerging
function createFibroWithoutMerging(id,x,y,z,type)
{
	var mesh = createFibroMesh();
	
	mesh.position.x = x * GUI_SIZE_MULTIPLIER;
	mesh.position.y = y * GUI_SIZE_MULTIPLIER;
	mesh.position.z = z * GUI_SIZE_MULTIPLIER;
	mesh.objId=id;
	//mesh.origId = id - (type*10000000);

	//mesh.type="Fibro";
	mesh.type="fibroblast";
	mesh.generalType="cell";
	mesh.visibility = 'visible';
	mesh.sliceAction = 'unsliced';
	mesh.intType=type;
	
	uniqueId = getUniqueId(id,type);
	objectsArray[uniqueId]=mesh;
	//objectsArray[id];
	
	//handleFibroVisibility(mesh);
	if(Ext.getCmp('fibroVisibleCheckBox').checked==true){
		if(mesh.sliceAction != 'invisibleDueToSlicing'){
			mesh.visible = true;
		}
	}else{
		mesh.visible = false;
	}

	randomlyRotateMesh(mesh);

	scene.add( mesh );
	
	return mesh;
}

//createFibroMesh
function createFibroMesh()
{
	var mesh;
	if(cellsAppearance=='Realistic Cells')
	{
		mesh = new THREE.Mesh( fibroGeometry, fibroMaterial );
		mesh.scale.x = mesh.scale.y = mesh.scale.z = fibroScale; 

		//mesh.material.bumpScale = fibroScale;
		mesh.material.bumpScale = fibroBumpScale;
		
		mesh.isRealistic='true'; 
	}
	else
	{
		mesh = new THREE.Mesh( simpleFibroGeometry, simpleFibroMaterial );
		mesh.isRealistic='false'; 
	}
	
	return mesh;
}

