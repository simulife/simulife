
var oxygenLowRadiuses, oxygenMedRadiuses, oxygenHighRadiuses;
var vegfLowRadiuses, vegfMedRadiuses, vegfHighRadiuses;
//var NUM_OF_RADIUSES = 100;
var NUM_OF_RADIUSES = 88;

//var lowRadiusVal =  0.1;
//var medRadiusVal =  0.3;
//var highRadiusVal = 0.6; 

var firsCalc, normalizedLowVal, normalizedMedVal, normalizedHighVal; 

var sceneOxygenRaiuses, sceneVegfRaiuses;

var vegfpMaterial =
	new THREE.ParticleBasicMaterial({
		color: 0xFFFF00,	//Yellow
		size: vegfSize, 
		 map: THREE.ImageUtils.loadTexture(
			 "images/oxygen.png"
		 ),
		 blending: THREE.AdditiveBlending,
		 //transparent: true
		 transparent: true, opacity:vegfOpacity
});

var oxygenpMaterial =
	new THREE.ParticleBasicMaterial({
		color: 0x0088FF,	//blue
		size: oxygenSize,
	 	map: THREE.ImageUtils.loadTexture(
			 "images/oxygen.png"
	 	),
	 	blending: THREE.AdditiveBlending,
	 	//transparent: true
		transparent: true, opacity:oxygenOpacity
});
	
var particle, particles, point, i; 

//createOxygenRadius
function createOxygenRadius(radius, density)
{
	if(density <- 40){
		density = density + 50;
	}
	console.log('Oxygen Radius:' + radius + ' Level:' + density);
	
	var currentRad = sceneOxygenRaiuses[radius];
	var newRad;
	
	if(currentRad!=undefined){
		if(currentRad.density == density){
			return;
		}else{
			scene.remove(currentRad);
		}
	}
	
	if(density == DENSITY_NONE){
		return;
	}
	else if(density == DENSITY_LOW){
		newRad = new THREE.ParticleSystem(
			oxygenLowRadiuses[radius].geometry,oxygenLowRadiuses[radius].material);
	}
	else if(density == DENSITY_MED){
		newRad = new THREE.ParticleSystem(
			oxygenMedRadiuses[radius].geometry,oxygenMedRadiuses[radius].material);
	}
	else if(density == DENSITY_HIGH){
		newRad = new THREE.ParticleSystem(
			oxygenHighRadiuses[radius].geometry,oxygenHighRadiuses[radius].material);
	}

	newRad.density=density;
	
	if(Ext.getCmp(OXYGEN).checked==true){
		newRad.visible = true;
	}else{
		newRad.visible = false;
	}
	
	newRad.type = OXYGEN;
	//newRad.moleculeRadiusId='type:Oxygen_radius:'+radius+'_density:'+density;
	
	scene.add(newRad);
	
	sceneOxygenRaiuses[radius]=newRad;
}

//createVegfRadius
function createVegfRadius(radius, density)
{
	var currentRad = sceneVegfRaiuses[radius];
	var newRad;
	
	if(currentRad!=undefined){
		if(currentRad.density == density){
			return;
		}else{
			scene.remove(currentRad);
		}
	}
	
	if(density == DENSITY_NONE){
		return;
	}
	else if(density == DENSITY_LOW){
		newRad = new THREE.ParticleSystem(
			vegfLowRadiuses[radius].geometry,vegfLowRadiuses[radius].material);
	}
	else if(density == DENSITY_MED){
		newRad = new THREE.ParticleSystem(
			vegfMedRadiuses[radius].geometry,vegfMedRadiuses[radius].material);
	}
	else if(density == DENSITY_HIGH){
		newRad = new THREE.ParticleSystem(
			vegfHighRadiuses[radius].geometry,vegfHighRadiuses[radius].material);
	}

	newRad.density=density;
	
	if(Ext.getCmp(VEGF).checked==true){
		newRad.visible = true;
	}else{
		newRad.visible = false;
	}
	newRad.type=VEGF;
	//newRad.moleculeRadiusId='type:Vegf_radius:'+radius+'_density:'+density;

	scene.add(newRad);
	
	sceneVegfRaiuses[radius]=newRad;
}

//moleculesRadiusInit
function moleculesRadiusInit()
{
	oxygenLowRadiuses = new Array();
	oxygenMedRadiuses = new Array();
	oxygenHighRadiuses = new Array();
	vegfLowRadiuses = new Array();
	vegfMedRadiuses = new Array();
	vegfHighRadiuses = new Array();
	
	sceneOxygenRaiuses = new Array();
	sceneVegfRaiuses = new Array();
	
	for(var i=0; i<NUM_OF_RADIUSES; i++)
	{
		//	4/3*pi*(R^3-(R-1)^3)*med=
		firsCalc = (4 / 3) * 3.14 *((i*i*i) -((i-1)*(i-1)*(i-1)));
		
		normalizedLowVal = 	firsCalc * lowVal;
		normalizedMedVal = 	firsCalc * medVal;
		normalizedHighVal = firsCalc * highVal;

		oxygenLowRadiuses[i]  = createRandomPoints(i, normalizedLowVal,  oxygenpMaterial, "Oxygen");
		oxygenMedRadiuses[i]  = createRandomPoints(i, normalizedMedVal,  oxygenpMaterial, "Oxygen");
		oxygenHighRadiuses[i] = createRandomPoints(i, normalizedHighVal, oxygenpMaterial, "Oxygen");

		vegfLowRadiuses[i]  = createRandomPoints(i, normalizedLowVal,  vegfpMaterial, "Vegf");
		vegfMedRadiuses[i]  = createRandomPoints(i, normalizedMedVal,  vegfpMaterial, "Vegf");
		vegfHighRadiuses[i] = createRandomPoints(i, normalizedHighVal, vegfpMaterial, "Vegf");
	}
}

//createRandomPoints
function createRandomPoints(radius, numOfPoints, pMaterial)
{
	particles = new THREE.Geometry();
	
    for (var i=0; i<numOfPoints; i++)
    {
    	point = randomPoint();
    
		var vertex = new THREE.Vector3();
		vertex.x = point.x*radius*GUI_SIZE_MULTIPLIER;
		vertex.y = point.y*radius*GUI_SIZE_MULTIPLIER;
		vertex.z = point.z*radius*GUI_SIZE_MULTIPLIER; 

		particles.vertices.push( vertex );
    }
    
	particleSystem =
		  new THREE.ParticleSystem(
		    particles,
		    pMaterial);

	return particleSystem;
}	

//randomPoint - returns a value between -1 and 1
function randomPoint()
{
    var x = Math.random() - 0.5, y = Math.random() - 0.5, z = Math.random() - 0.5;
    var k = Math.sqrt(x*x + y*y + z*z);
    while (k < 0.2 || k > 0.3)
    {
        x = Math.random() - 0.5;
        y = Math.random() - 0.5;
        z = Math.random() - 0.5;
        k = Math.sqrt(x*x + y*y + z*z);
    }
    return {x:x/k, y:y/k, z:z/k};
}


