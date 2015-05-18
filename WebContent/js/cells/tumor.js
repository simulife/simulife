
var tumorDaeFilename= './images/collada/tumorBrown26.dae';
var necroticTumorDaeFilename = './images/collada/necroticTumor.dae';

var tumorBumpFilename = './images/collada/RenderMap.png';

var tumorGeometry, tumorNecroticGeometry, tumorMesh;
var simpleTumorGeometry, simpleTumorMaterial;

var tumorObjectsArray, tumorNumberOfNewObjects;
var totalNumOfTumorObjects;

//invisible related vars
var maxNumOfVisibleCells = 500000;
var invisibleObjects;
var objToMakeInvisible;
var TUMOR = 1;

var tumorMaterial, tumorNecroticMaterial, tumorMoveMaterial; 
var tumorDae;
var bumpMaterial, bump;

var nonDaeMesh;
var bumpMap, bumpImageFile;
var tumorShaderMaterial, tumorShaderGeometry; 


//tumorInit
function tumorInit() 
{	
	tumorObjectsArray = new Array();
	invisibleObjects = new Array();

	tumorNumberOfNewObjects = 0;
	totalNumOfTumorObjects=0;

	//createShader();
	loadTumorColladaFile();
	
}

//loadTumorColladaFile
function loadTumorColladaFile()
{
	loader.load( tumorDaeFilename, function ( collada )
	{
		dae = collada.scene;
		bumpMap = THREE.ImageUtils.loadTexture(tumorBumpFilename);
		
		dae.children[0].material.bumpMap = bumpMap; 
		dae.updateMatrix();

		tumorGeometry = dae.children[0].geometry;	
		tumorMaterial = dae.children[0].material;
			
		createTumorGeometries();
		createTumorMaterials();
		
		setTumorColors();
		tumorLocalStorageInit();
		//resetTumorColors();
	} );
	
	loader2.load( necroticTumorDaeFilename, function ( collada )
	{
		var dae2 = collada.scene;
		
		var bumpMap2 = THREE.ImageUtils.loadTexture(tumorBumpFilename);
		
		dae2.children[0].material.bumpMap = bumpMap; 
		dae2.updateMatrix();

		tumorNecroticGeometry = dae2.children[0].geometry;
		tumorNecroticMaterial = dae2.children[0].material;
		
		
		setTumorNecroticColors();
		tumorNecroticLocalStorageInit();
		//resetTumorNecroticColors();
	} );
	
}

//setTumorNecroticColors()
function setTumorNecroticColors()
{
	var col = new THREE.Color();
	col.setRGB(0.2,0.4,1);

	var amb = new THREE.Color();
	amb.setRGB(1,1,1);

	var spec = new THREE.Color();
	//spec.setRGB(0.3,0.3,0.5);
	spec.setRGB(0.15,0.15,0.25);

	//tumorNecroticMaterial.color =  new THREE.Color( 0x321E5A );
	tumorNecroticMaterial.color =  col;
	tumorNecroticMaterial.ambient= amb;
	tumorNecroticMaterial.specular= spec; 

	//Save defaults
	defaultTumorNecroticColor = new THREE.Color();
	//defaultTumorNecroticColor.setRGB(tumorNecroticMaterial.color.r,tumorNecroticMaterial.color.g,tumorNecroticMaterial.color.b);
	defaultTumorNecroticColor.setRGB(0,1,1);
	
	defaultTumorNecroticAmbient = new THREE.Color();
	//defaultTumorNecroticAmbient.setRGB(tumorNecroticMaterial.ambient.r,tumorNecroticMaterial.ambient.g,tumorNecroticMaterial.ambient.b);
	defaultTumorNecroticAmbient.setRGB(0,0,0);
	
	defaultTumorNecroticSpecular = new THREE.Color();
	//defaultTumorNecroticSpecular.setRGB(tumorNecroticMaterial.specular.r,tumorNecroticMaterial.specular.g,tumorNecroticMaterial.specular.b);
	defaultTumorNecroticSpecular.setRGB(1,1,1);
	
	defaultTumorNecroticEmissive = new THREE.Color();
	//defaultTumorNecroticEmissive.setRGB(tumorNecroticMaterial.emissive.r,tumorNecroticMaterial.emissive.g,tumorNecroticMaterial.emissive.b);
	defaultTumorNecroticEmissive.setRGB(0,0,1);	
}

//setTumorColors
function setTumorColors()
{
	var col1 = new THREE.Color();
	col1.setRGB(0.3,0.8,0.8);

	var amb1 = new THREE.Color();
	amb1.setRGB(0.3,0.5,0.5);

	var spec1 = new THREE.Color();
	spec1.setRGB(0.3,0.3,0.5);

	var emiss1 = new THREE.Color();
	emiss1.setRGB(0.5,0.5,0.6);
	
	tumorMaterial.color =  col1;
	tumorMaterial.ambient= amb1;
	//tumorMaterial.specular= spec1; 
	tumorMaterial.emissive= emiss1;

	//Save defaults
	defaultTumorColor = new THREE.Color();
	//defaultTumorColor.setRGB(tumorMaterial.color.r,tumorMaterial.color.g,tumorMaterial.color.b);
	defaultTumorColor.setRGB(0.8,0.79,0);
	
	defaultTumorAmbient = new THREE.Color();
	//defaultTumorAmbient.setRGB(tumorMaterial.ambient.r,tumorMaterial.ambient.g,tumorMaterial.ambient.b);
	defaultTumorAmbient.setRGB(0,0,0);
	
	defaultTumorSpecular = new THREE.Color();
	//defaultTumorSpecular.setRGB(tumorMaterial.specular.r,tumorMaterial.specular.g,tumorMaterial.specular.b);
	defaultTumorSpecular.setRGB(0.94,0.97,1);
	
	defaultTumorEmissive = new THREE.Color();
	//defaultTumorEmissive.setRGB(tumorMaterial.emissive.r,tumorMaterial.emissive.g,tumorMaterial.emissive.b);
	defaultTumorEmissive.setRGB(0,0.97,1);
	
	//necrotic
/*	defaultTumorNecroticColor = new THREE.Color();
	defaultTumorNecroticColor.setRGB(tumorNecroticMaterial.color.r,tumorNecroticMaterial.color.g,tumorNecroticMaterial.color.b);
	
	defaultTumorNecroticAmbient = new THREE.Color();
	defaultTumorNecroticAmbient.setRGB(tumorNecroticMaterial.ambient.r,tumorNecroticMaterial.ambient.g,tumorNecroticMaterial.ambient.b);
	
	defaultTumorNecroticSpecular = new THREE.Color();
	defaultTumorNecroticSpecular.setRGB(tumorNecroticMaterial.specular.r,tumorNecroticMaterial.specular.g,tumorNecroticMaterial.specular.b);
	
	defaultTumorNecroticEmissive = new THREE.Color();
	defaultTumorNecroticEmissive.setRGB(tumorNecroticMaterial.emissive.r,tumorNecroticMaterial.emissive.g,tumorNecroticMaterial.emissive.b);	
*/	
}

//createTumorMaterials
function createTumorMaterials()
{
	//tumorMaterial = new THREE.MeshBasicMaterial({map: texture}),
	//tumorMaterial =	new THREE.MeshLambertMaterial({color: 0x555555, transparent: true, opacity:0.3 }); 
	
	simpleTumorMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});

	simpleTumorNecroticMaterial = new THREE.MeshLambertMaterial({color: 0x2E0854});	//dark purple - indigo
	//tumorNecroticMaterial = tumorMaterial.clone();
	//tumorNecroticMaterial = tumorMaterial.clone();
	//tumorNecroticMaterial.color = 0x2E0854;
	
	simpleTumorMoveMaterial = new THREE.MeshLambertMaterial({color: 0x0BB5FF});
	tumorMoveMaterial = tumorMaterial;
	//tumorMoveMaterial = tumorMaterial.clone();
	//tumorMoveMaterial.color = 0x0BB5FF;
	
}

//createTumorGeometries
function createTumorGeometries()
{
	simpleTumorGeometry = new THREE.SphereGeometry( CELL_RADIUS, 10, 10 );	//radius, widthSegments, heightSegments
	simpleTumorGeometry.computeBoundingSphere();
	simpleTumorGeometry .computeVertexNormals();

	//tumorShaderGeometry = new THREE.SphereGeometry( 400, 32, 32); 
	//tumorShaderGeometry.computeTangents();
	//tumorGeometry.computeBoundingSphere();
}

//createTumorCell
function createTumorCell(id,x,y,z,type)
{
	totalNumOfTumorObjects++;
	
	return createTumorWithoutMerging(id,x,y,z,type);

	//createTumorWithMerging(id,x,y,z,type);
	//createTest(id,x,y,z,type);
}	
	
//createTumorWithoutMerging
function createTumorWithoutMerging(id,x,y,z,type)
{
	//var mesh = new THREE.Mesh(tumorGeometry, tumorMaterial);
	//var mesh = new THREE.Mesh(shaderGeometry, shaderMaterial);
	//mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.1;
	
	var mesh = createMesh();
	
	//var mesh = new THREE.Mesh(tumorDae.children[0].geometry, tumorDae.children[0].material);
/*	var mesh = new THREE.Mesh(tumorDae.children[0].geometry, bumpMaterial);
	mesh.scale.x = mesh.scale.y = mesh.scale.z = 6;
*/	
	mesh.position.x = x * GUI_SIZE_MULTIPLIER;
	mesh.position.y = y * GUI_SIZE_MULTIPLIER;
	mesh.position.z = z * GUI_SIZE_MULTIPLIER;
	mesh.objId=id;
	//mesh.origId = id - (type*10000000);
	
	//mesh.type="Tumor";
	mesh.type="tumor";
	mesh.generalType="cell";
	mesh.visibility = 'visible';
	mesh.sliceAction = 'unsliced';
	mesh.intType=type;
	
	uniqueId = getUniqueId(id,type);
	objectsArray[uniqueId]=mesh;
	//objectsArray[id];
	
	//handleTumorVisibility(mesh);
	if(Ext.getCmp('tumorVisibleCheckBox').checked==true){
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

//setTumorToBeNecrotic
function setTumorToBeNecrotic(tumorObj)
{
	scene.remove(tumorObj);
	
	var necrotic = new THREE.Mesh( tumorNecroticGeometry, tumorNecroticMaterial );
	necrotic.scale.x = tumorObj.scale.x;
	necrotic.scale.y = tumorObj.scale.y;
	necrotic.scale.z = tumorObj.scale.z;
	
	necrotic.material.bumpScale = tumorObj.material.bumpScale;
	necrotic.isRealistic  = tumorObj.isRealistic;
	
	necrotic.position.x = 	tumorObj.position.x; 
	necrotic.position.y = 	tumorObj.position.y;
	necrotic.position.z = 	tumorObj.position.z;
	necrotic.objId = 		tumorObj.objId; 

	necrotic.type = 		tumorObj.type; 
	necrotic.generalType = 	tumorObj.generalType; 
	necrotic.visibility = 	tumorObj.visibility;
	necrotic.sliceAction = 	tumorObj.sliceAction;
	necrotic.intType = 		tumorObj.intType;
	necrotic.visible = 		tumorObj.visible;
	
	uniqueId = getUniqueId(id,type);
	
	objectsArray[uniqueId]=necrotic;

	scene.add(necrotic);
}

//createMesh
function createMesh()
{
	var mesh;
	if(cellsAppearance=='Realistic Cells')
	{
		mesh = new THREE.Mesh( tumorGeometry, tumorMaterial );
		mesh.scale.x = mesh.scale.y = mesh.scale.z = tumorScale; 
		mesh.material.bumpScale = tumorBumpScale;  
		mesh.isRealistic='true'; 
	}
	else
	{
		mesh = new THREE.Mesh( simpleTumorGeometry, simpleTumorMaterial );
		mesh.isRealistic='false'; 
	}
	return mesh;
}

/*
//createShader
function createShader()
{
	//var ambient = 0x050505;
	var ambient = 0x555555;
	var diffuse = 0x331100, specular = 0xffffff, shininess = 10, scale = 23;
	
	var shader = THREE.ShaderLib[ "normalmap" ];
	var uniforms = THREE.UniformsUtils.clone( shader.uniforms );

	//Displacement - changes geometry shape by using an image
	//============
	uniforms[ "uDisplacementBias" ].value = - 0.428408;
	uniforms[ "uDisplacementScale" ].value = 64;
	
	// Ambient Occlusion = soft shadows from indirect light sources
	//==================

	// Diffuse = the way the material absorbs light (wood vs glass for example - wood=high diffuse value)
	//======== (==color)
	
	//Specular = "shininess", that is, the tendancy of a material to re-emit light *in a particular direction* based on the angle of incidence of the light ray
	//========
/*	uniforms[ "enableSpecular" ].value = false;
	uniforms[ "uSpecularColor" ].value.setHex( specular );
	uniforms[ "uSpecularColor" ].value.convertGammaToLinear();
*/
	//Normal Mapping - Is one possible implementation of a technique known as bump mapping. While bump mapping perturbs the existing normal (the direction the surface is facing) of a model, normal mapping replaces the normal in its entirety. 				
	//==============
/*
	var parameters = { 
			fragmentShader: shader.fragmentShader, 
			vertexShader: shader.vertexShader, 
			uniforms: uniforms, 
			lights: true, 
			fog: false }; 
	
	tumorShaderMaterial = new THREE.ShaderMaterial( parameters );
	//tumorShaderGeometry = new THREE.SphereGeometry( 400, 24, 24);
	tumorShaderGeometry = new THREE.SphereGeometry( 400, 32, 32);
	tumorShaderGeometry.computeTangents();
}
*/

/*
//createTumorWithMerging
function createTumorWithMerging(id,x,y,z,type)
{
	var name="Tumor"+id;
	tumorNumberOfNewObjects = createTypeAndMergeIfNeeded(
			tumorMesh, tumorGeometry, tumorMaterial
		,tumorObjectsArray, tumorNumberOfNewObjects,x,y,z,id,type,name);

	if(mergedObject!=false)
	{
		tumorObjectsArray = new Array();
		tumorObjectsArray[0] = mergedObject;
		tumorNumberOfNewObjects = 1;
	}

}
*/

/*
//createTest
function createTest(id,x,y,z,type)
{
	//for testing
	tumorObjectsArray[tumorNumberOfNewObjects]=mesh;
	tumorNumberOfNewObjects = tumorNumberOfNewObjects+1;
	if(tumorNumberOfNewObjects==1000)
	{
		var mergedGeo = new THREE.Geometry();
		var obj;
		for( var c=0;c<1000;c++)
		{
			obj = tumorObjectsArray[c];
			scene.remove(obj);

			THREE.GeometryUtils.merge(mergedGeo, obj);
		}
		mergedGeo.computeFaceNormals();
		group	= new THREE.Mesh( mergedGeo, tumorMaterial );
		group.matrixAutoUpdate = false;
		group.updateMatrix();

		scene.add( group );
		
		tumorObjectsArray = new Array();
		tumorNumberOfNewObjects = 0;
	}
	
}

//handleTumorVisibility
function handleTumorVisibility(mesh)
{
	if(totalNumOfTumorObjects > maxNumOfVisibleCells)
	{
		objToMakeInvisible = tumorObjectsArray.pop();	//pop last element
		if(objToMakeInvisible!=null)
		{
		    var sceneObj;
			for(var i=0; i<scene.__objects.length; i++){
			    sceneObj=scene.__objects[i];
			    if(sceneObj == objToMakeInvisible)
		    	{
			    	//sceneObj.visible = false;
			    	scene.remove(sceneObj);
			    	
			    	invisibleObjects.push(sceneObj);
			    	break;
		    	}
			}
		}
	}
	tumorObjectsArray.unshift(mesh);	//insert to the beginning of the array
	scene.add( mesh );		
}

*/

/*//HandleCollada
function HandleCollada()
{
	var loader = new THREE.ColladaLoader();
	
	loader.load('images/Cancer_Cell.dae', function (collada) {
		tumorDae = collada.scene;
	});	

}
*/
