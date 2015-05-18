
//density
//=======
//0 - empty
//1 - low
//2 - med
//3 - high

var oxygenGroupMap = {};
var vegfGroupMap = {};
var key;

//var SHAPE_SIZE = 8;
var SHAPE_SIZE = 10;

var groupCube;
var calculatedSize = SHAPE_SIZE*GUI_SIZE_MULTIPLIER;
var lowerLeftPointMovement = SHAPE_SIZE/2;	

var opac;
var prevInGroup;

var DENSITY_NONE = 0;
var DENSITY_LOW = 1;
var DENSITY_MED = 2;
var DENSITY_HIGH = 3;

var firsCalc, normalizedLowVal, normalizedMedVal, normalizedHighVal;

var lowOxyParticleCube, medOxyParticleCube, highOxyParticleCube; 
var lowVegfParticleCube, medVegfParticleCube, highVegfParticleCube;

//moleculesGroupsInit
function moleculesGroupsInit()
{
	firsCalc = SHAPE_SIZE*SHAPE_SIZE*SHAPE_SIZE;

	normalizedLowVal = 	firsCalc * lowVal;
	normalizedMedVal = 	firsCalc * medVal;
	normalizedHighVal = firsCalc * highVal;

	lowOxyParticleCube = createGroupRandomPoints(lowOxyParticleCube,normalizedLowVal,oxygenpMaterial,OXYGEN);
	medOxyParticleCube = createGroupRandomPoints(medOxyParticleCube,normalizedMedVal,oxygenpMaterial,OXYGEN);
	highOxyParticleCube = createGroupRandomPoints(highOxyParticleCube,normalizedHighVal,oxygenpMaterial,OXYGEN);	

	lowVegfParticleCube = createGroupRandomPoints(lowVegfParticleCube,normalizedLowVal,vegfpMaterial,VEGF);
	medVegfParticleCube = createGroupRandomPoints(medVegfParticleCube,normalizedMedVal,vegfpMaterial,VEGF);
	highVegfParticleCube = createGroupRandomPoints(highVegfParticleCube,normalizedHighVal,vegfpMaterial,VEGF);	
}

//createGroupRandomPoints
function createGroupRandomPoints(particleCube, numOfParticles, pMaterial)
{
	particles = new THREE.Geometry();
	
    for (var i=0; i<numOfParticles; i++){
    	//Math.random();	//Return a random number between 0 and 1
		var vertex = new THREE.Vector3();
		vertex.x = Math.random() * calculatedSize;
		vertex.y = Math.random() * calculatedSize;
		vertex.z = Math.random() * calculatedSize;  

		particles.vertices.push( vertex );
    }
    
    particleCube =
		  new THREE.ParticleSystem(
		    particles,
		    pMaterial);

	return particleCube;
}	

//initGroupsIfNeeded(size)
function initGroupsIfNeeded(size)
{
	if(shouldCreateInitGrous==true){
		
		SHAPE_SIZE = size;
		calculatedSize = SHAPE_SIZE*GUI_SIZE_MULTIPLIER;
		lowerLeftPointMovement = SHAPE_SIZE/2;	
		
		moleculesGroupsInit();
		shouldCreateInitGrous=false;
	}
}

//createOxygenGroup
function createOxygenGroup(groupingSize, density, x,y,z)
{
	initGroupsIfNeeded(groupingSize);
	
	createGroup(density,x,y,z, oxygenGroupMap, 
			lowOxyParticleCube, medOxyParticleCube, highOxyParticleCube, OXYGEN, groupingSize); 
}

//createVegfGroup
function createVegfGroup(groupingSize, density, x,y,z)
{
	initGroupsIfNeeded(groupingSize);
	
	createGroup(density, x,y,z, vegfGroupMap, 
			lowVegfParticleCube, medVegfParticleCube, highVegfParticleCube, VEGF, groupingSize);
}

//createGroup
function createGroup(density,x,y,z, groupMap, 
		lowParticleCube, medParticleCube, highParticleCube, type, size)
{ 
	if(density == DENSITY_NONE){
		return;
	}

	//remove previous 
	key = 1000000000 + (x+50)*1000000 + (y+50)*1000 +(z+50);	//+50 to make it positive
	prevInGroup = groupMap[key];
	if(prevInGroup!=undefined){
		if(prevInGroup.density == density){
			//console.log('same density: ' + density);
			return;
		}else{
			//console.log('density changed from ' + prevInGroup.density + ' to ' + density);
			scene.remove(prevInGroup);
		}
	}
	
	if(density == DENSITY_LOW){
		//opac = 0.1;
		//return;
		groupCube = new THREE.ParticleSystem(lowParticleCube.geometry,lowParticleCube.material);
		//groupCube = lowParticleCube.clone();
	}
	else if(density == DENSITY_MED){
		//opac = 0.3;
		groupCube = new THREE.ParticleSystem(medParticleCube.geometry,medParticleCube.material);
		//groupCube = medParticleCube.clone();
	}
	else if(density == DENSITY_HIGH){
		//opac = 0.5;
		groupCube = new THREE.ParticleSystem(highParticleCube.geometry,highParticleCube.material);
		//groupCube = highParticleCube.clone();
	}

	
/*	groupCube = new THREE.Mesh(
            new THREE.CubeGeometry( calculatedSize, calculatedSize, calculatedSize ),
            new THREE.MeshLambertMaterial( { color: 0x3333DD, transparent: true, opacity:opac} )
    );
*/	
	groupCube.position.set(
			x*GUI_SIZE_MULTIPLIER + lowerLeftPointMovement,
			y*GUI_SIZE_MULTIPLIER + lowerLeftPointMovement,
			z*GUI_SIZE_MULTIPLIER + lowerLeftPointMovement);

	groupCube.key=key;
	groupCube.x=x;
	groupCube.y=y;
	groupCube.z=z;
	groupCube.density=density;
	groupCube.opac=opac;
	groupCube.type = type;
	
	if(Ext.getCmp(type).checked==true){
		groupCube.visible = true;
	}else{
		groupCube.visible = false;
	}
	scene.add(groupCube);
	
	groupMap[key]=groupCube;
	
	//console.log('OxyGroup added. key: ' +key + ' x: '+x+ ' y: '+y+ ' z: '+z+ ' density: '+density + ' opac: ' + opac);
}

