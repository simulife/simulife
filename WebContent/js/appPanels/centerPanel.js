 
var renderer=null, scene, camera;  
var SCREEN_WIDTH, SCREEN_HEIGHT;	

var stats;
var controls, flyControls;
var axisObj;

var skyBox;
var skyBoxTopBottomMaterial, skyBoxFrontBackMaterial, skyBoxLeftRightMaterial;
var skyBoxMaterial;
var backgroundImage = 'Image1';
//var mouseX = 0, mouseY = 0;
//var windowHalfX = window.innerWidth / 2;
//var windowHalfY = window.innerHeight / 2;

var centerv;		

var tooltipSprite;
var fps;
var minFps = 1;  
var onHold=false;  

var modelData;
var modelLoaded=false;
var modelHandled=false;

var lastRetriveTime, currentTime; 
var date;

var uniqueId;
var runMode;		//'simulife' / 'simulateFile' / 'simulateJava'

var animationsArr = [];
var clock = new THREE.Clock();
var delta;

var numOfHandledObjects, totalNumOfObjects;
var modelElementToHandle;

var ambientLight, pointLight1, pointLight2;

var firstTime;	//charts var
var skyBoxSize = 10000; 

//goOn
function goOn()
{
/*	date = new Date();
	currentTime = date.getSeconds();
	if(lastRetriveTime == currentTime){
		return false;	//do not try to get objects more than once in the same second	
	}else{
		lastRetriveTime = currentTime;
	}
*/	
	fps = stats.getFps();
	if(onHold==false && fps>=minFps){
		return true;
	}
	return false;
}

//createCenterPanel
function createCenterPanel()
{
	init();
	animate();
}

//init
function init() 
{
    scene = new THREE.Scene();
    //scene.fog = new THREE.Fog( 0xffffff, 1, 10000 );

	//LIGHT
    //=====
    pointLight1 =  new THREE.DirectionalLight(0xFFFFFF, 1); 
	pointLight1.position.set(1000,1000,1000);
	scene.add(pointLight1);

    pointLight2 =  new THREE.DirectionalLight(0xFFFFFF, 1);
	pointLight2.position.set(-1000,-1000,-1000);
	scene.add(pointLight2); 

	ambientLight = new THREE.AmbientLight( 0x111111 ); 
	scene.add( ambientLight );

	initVariables();
	tumorInit();
	endothelialInit();
	fibroInit();
	
	if(moleculesDisplayType=='Display By Radiuses'){
		if(oxygenLowRadiuses==undefined || oxygenLowRadiuses.length==undefined || oxygenLowRadiuses.length<1){
			moleculesRadiusInit();
		}
	}
	//moleculesGroupsInit();
	globalAmountsInit();
	
	//testInit();
	
	firstTime=true;
	
	var date = new Date();
	lastRetriveTime = date.getSeconds();
	
	centerv = Ext.getCmp('center1'); 

	SCREEN_WIDTH = centerv.body.dom.clientWidth;
	SCREEN_HEIGHT = centerv.body.dom.clientHeight;	
	
	setHeights();
	
	//make it square
	if(SCREEN_WIDTH < SCREEN_HEIGHT){
		SCREEN_HEIGHT = SCREEN_WIDTH; 
	}else{
		SCREEN_WIDTH = SCREEN_HEIGHT;
	}
	
	//RENDERER
	//========
	if(renderer==null){
		renderer = new THREE.WebGLRenderer( { antialias: false } );
		renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
		//renderer.setViewport(0,0,SCREEN_WIDTH/2,SCREEN_HEIGHT);	//x,y,width,height
		//renderer.setScissor(0,0,SCREEN_WIDTH/2,SCREEN_HEIGHT);	//x,y,width,height
		//renderer.enableScissorTest(true);
		renderer.sortObjects = false;
		centerv.body.appendChild(renderer.domElement);
	}else{ 
		renderer.clear();
	}
		 
    //CAMERA
    //======
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 100000;
	//camera = new THREE.Camera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	
	// the camera defaults to position (0,0,0)
	// 	so pull it back (z = 400) and up (y = 100) and set the angle towards the scene origin
	
	camera.position.set(0,150,2000);	//x,y,z
	//camera.updateProjectionMatrix();

    scene.add( camera );  

	axisObj = new THREE.AxisHelper( 1000 );
	axisObj.position.set( 0, 0, 0 );
	axisObj.visible=false;
	scene.add( axisObj );
				
	//IMAGES
	
    var cube = new THREE.Mesh(
            new THREE.CubeGeometry( 5, 5, 5 ),
            new THREE.MeshLambertMaterial( { color: 0xFF0000 } )
        );

	cube.type = "Cube";
	cube.objId = "123";
//	scene.add( cube ); 
	
	createSkyBox();
	
	//HandleCollada();

	controls = new THREE.TrackballControls( camera );
	controls.maxDistance = skyBoxSize;
	
	flyControls = new THREE.FlyControls( camera );
	
	flyControls.movementSpeed = 1000;
	flyControls.domElement = centerv.body.dom;
	flyControls.rollSpeed = Math.PI / 24;
	flyControls.autoForward = false;
	flyControls.dragToLook = false;	
	
    //TOOLTIP
    //=======
    tooltipCanvass = document.createElement('canvas');
    tooltipCanvass.width = 200;
    tooltipCanvass.height = 100;
    tooltipContext = tooltipCanvass.getContext('2d');
    tooltipContext.font = "Bold 20px Arial"; 
	tooltipContext.fillStyle = '#00F';

    //tooltipContext.fillStyle = "rgba(1,0,0,0.95)";
    //tooltipContext.fillStyle = 'blue';
    //tooltipContext.fillText('Hello, world!', 0, 20);

    // canvas contents will be used for a texture
    tooltipTexture = new THREE.Texture(tooltipCanvass); 
    tooltipTexture.needsUpdate = true;

    tooltipSprite = new THREE.Sprite( 
    		new THREE.SpriteMaterial( { 
    			//color: 0xff0000, 
    			map: tooltipTexture, 
    			alphaTest: 0.5 
    			} ) );
    
/*    tooltipSprite = new THREE.Sprite( { 
    	map: tooltipTexture, 
    	useScreenCoordinates: false,
    	transparent: true
    	//alignment: THREE.SpriteAlignment.topLeft 
    } );
*/    
    tooltipSprite.scale.set( 200, 100, 1.0 );
    tooltipSprite.position.set( 0, 0, 0 );
    
    scene.add( tooltipSprite );	
    
	//STATS
    //=====
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	stats.domElement.style.zIndex = 100;

	centerv.body.appendChild(stats.domElement);

	modelElementToHandle=0;
	
	Ext.getCmp('createCellTypeCombo').setValue('tumor');	//default value
	Ext.getCmp('createMultiCellTypeCombo').setValue('tumor');	//default value
	Ext.getCmp('killCellsTypeCombo').setValue('tumor');	//default value
	
	render();
}

//createSkyBox
function createSkyBox()
{
	//SKY BOX
	//=======	
    var topBottomImage, frontBackImage, leftRightImage;  
    
	if(backgroundImage=="Image1")
	{
		topBottomImage = THREE.ImageUtils.loadTexture('./images/background/backgroundImage1tops.png');
		skyBoxTopBottomMaterial = new THREE.MeshPhongMaterial( {map: topBottomImage} );

		frontBackImage = THREE.ImageUtils.loadTexture('./images/background/backgroundImage1.png');
		skyBoxFrontBackMaterial = new THREE.MeshPhongMaterial( {map: frontBackImage} );

		leftRightImage = THREE.ImageUtils.loadTexture('./images/background/backgroundImage1tops.png');
		skyBoxLeftRightMaterial = new THREE.MeshPhongMaterial( {map: leftRightImage} );
	}
	else if(backgroundImage=="Image2")
	{
		topBottomImage = THREE.ImageUtils.loadTexture('./images/background/backgroundImage2tops.png');
		skyBoxTopBottomMaterial = new THREE.MeshPhongMaterial( {map: topBottomImage} );

		frontBackImage = THREE.ImageUtils.loadTexture('./images/background/backgroundImage2.png');
		skyBoxFrontBackMaterial = new THREE.MeshPhongMaterial( {map: frontBackImage} );

		leftRightImage = THREE.ImageUtils.loadTexture('./images/background/backgroundImage2tops.png');
		skyBoxLeftRightMaterial = new THREE.MeshPhongMaterial( {map: leftRightImage} );
	}
	else if(backgroundImage=="Image3")
	{
		var image3Texture = 
			THREE.ImageUtils.loadTexture('./images/background/humanTissue.jpg');

		skyBoxTopBottomMaterial = new THREE.MeshPhongMaterial( {map: image3Texture} ); 
		skyBoxFrontBackMaterial = skyBoxTopBottomMaterial; 
		skyBoxLeftRightMaterial = skyBoxTopBottomMaterial;
	}
	else		//no image
	{
		var backgroundColorMaterial = new THREE.MeshPhongMaterial( {color: 0x995555} ); 
		skyBoxTopBottomMaterial = backgroundColorMaterial;
		skyBoxFrontBackMaterial = backgroundColorMaterial;
		skyBoxLeftRightMaterial = backgroundColorMaterial;
	}
	
	//Top Bottom
	//==========
	var skyboxTopBottomPlane = new THREE.PlaneGeometry( 64900, 64900, 10, 10);	//width, height, widthSegments, heightSegments
	
	skyBoxTopBottomMaterial.side = THREE.DoubleSide;
	
	var skyboxTopMesh = new THREE.Mesh( skyboxTopBottomPlane, skyBoxTopBottomMaterial );
	skyboxTopMesh.name = "skyboxTop";
	skyboxTopMesh.position.set(0,36100/2,0);
	rotateAroundWorldAxis(skyboxTopMesh, new THREE.Vector3(1,0,0), 90 * Math.PI/180);
	skyboxTopMesh.name = "sky";
	
	scene.add(skyboxTopMesh);   

	var skyboxBottomMesh = new THREE.Mesh( skyboxTopBottomPlane, skyBoxTopBottomMaterial );
	rotateAroundWorldAxis(skyboxBottomMesh, new THREE.Vector3(1,0,0), 90 * Math.PI/180);
	skyboxBottomMesh.name = "skyboxBottom";
	skyboxBottomMesh.position.set(0,-1*(36100/2),0);
	skyboxBottomMesh.name = "sky";
	
	scene.add(skyboxBottomMesh);   

	//Front Back
	//==========
	var skyboxFrontBackPlane = new THREE.PlaneGeometry( 64900, 36100, 10, 10);
	skyBoxFrontBackMaterial.side = THREE.DoubleSide;
	
	var skyboxFrontMesh = new THREE.Mesh( skyboxFrontBackPlane, skyBoxFrontBackMaterial );
	skyboxFrontMesh.name = "skyboxFront";
	skyboxFrontMesh.position.set(0,0,-1*(64900/2));
	skyboxFrontMesh.name = "sky";
	
	scene.add(skyboxFrontMesh);   

	var skyboxBackMesh = new THREE.Mesh( skyboxFrontBackPlane, skyBoxFrontBackMaterial );
	skyboxBackMesh.name = "skyboxBack";
	skyboxBackMesh.position.set(0,0,64900/2);
	skyboxBackMesh.name = "sky";
	
	scene.add(skyboxBackMesh);   
	
	//Left Right
	//==========
	var skyboxLeftRightPlane = new THREE.PlaneGeometry( 64900, 36100, 10, 10);
	skyBoxLeftRightMaterial.side = THREE.DoubleSide;
	
	var skyboxLeftMesh = new THREE.Mesh( skyboxLeftRightPlane, skyBoxLeftRightMaterial );
	rotateAroundWorldAxis(skyboxLeftMesh, new THREE.Vector3(0,1,0), 90 * Math.PI/180);
	skyboxLeftMesh.name = "skyboxLeft";
	skyboxLeftMesh.position.set(-1*(64900/2),0,0);
	
	skyboxLeftMesh.name = "sky";
	scene.add(skyboxLeftMesh);   

	var skyboxRightMesh = new THREE.Mesh( skyboxLeftRightPlane, skyBoxLeftRightMaterial );
	rotateAroundWorldAxis(skyboxRightMesh, new THREE.Vector3(0,1,0), 90 * Math.PI/180);
	skyboxRightMesh.name = "skyboxRight";
	skyboxRightMesh.position.set(64900/2,0,0);
	
	skyboxRightMesh.name = "sky";
	scene.add(skyboxRightMesh);
		
	//}
/*	else
	{	//use background color instead of an image
		var tissue = THREE.ImageUtils.loadTexture('images/tissue.jpg'); 
		
		var skyBoxGeometry = new THREE.CubeGeometry( skyBoxSize, skyBoxSize, skyBoxSize );
		//var skyBoxGeometry = new THREE.PlaneGeometry( 10000, 10000, 10, 10);
		
		
		var skyBoxMaterial = new THREE.MeshBasicMaterial( {map: tissue} );
		//skyBoxMaterial = new THREE.MeshBasicMaterial( {color: 0x995555} );
		
		skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
		skyBox.name = "sky";
		skyBoxMaterial.side = THREE.DoubleSide;
		
		skyBox.position.set(0,0,-2000);
		scene.add(skyBox);
	}
*/
	
}

//setHeights
function setHeights()
{
	var westPanel = Ext.getCmp('west1');
	
	var westHeight = westPanel.body.dom.clientHeight;
	
	var initialTab = Ext.getCmp('Initial');
	initialTab.setHeight(westHeight-50);

	var runtimeTab = Ext.getCmp('Runtime');
	runtimeTab.setHeight(westHeight-50);
}

/*
//Background image colors

//changeBackgroundColor
function changeBackgroundColor()
{
	var R = Ext.getCmp('backgroundColorR').value;
	var G = Ext.getCmp('backgroundColorG').value;
	var B = Ext.getCmp('backgroundColorB').value;
	
	var color = new THREE.Color();
	color.setRGB((R+1)/256,(G+1)/256,(B+1)/256);
	
	skyBoxTopBottomMaterial.color= color;
	skyBoxFrontBackMaterial.color= color;

}
//changeBackgroundAmbient
function changeBackgroundAmbient()
{
	var R = Ext.getCmp('backgroundAmbientR').value;
	var G = Ext.getCmp('backgroundAmbientG').value;
	var B = Ext.getCmp('backgroundAmbientB').value;
	
	var color = new THREE.Color();
	color.setRGB((R+1)/256,(G+1)/256,(B+1)/256);
	
	skyBoxTopBottomMaterial.ambient= color;
	skyBoxFrontBackMaterial.ambient= color;
}

//changeBackgroundSpecular
function changeBackgroundSpecular()
{
	var R = Ext.getCmp('backgroundSpecularR').value;
	var G = Ext.getCmp('backgroundSpecularG').value;
	var B = Ext.getCmp('backgroundSpecularB').value;
	
	var color = new THREE.Color();
	color.setRGB((R+1)/256,(G+1)/256,(B+1)/256);
	
	skyBoxTopBottomMaterial.specular= color;
	skyBoxFrontBackMaterial.specular= color;

}

//changeBackgroundEmissive
function changeBackgroundEmissive()
{
	var R = Ext.getCmp('backgroundEmissiveR').value;
	var G = Ext.getCmp('backgroundEmissiveG').value;
	var B = Ext.getCmp('backgroundEmissiveB').value;
	
	var color = new THREE.Color();
	color.setRGB((R+1)/256,(G+1)/256,(B+1)/256);
	
	skyBoxTopBottomMaterial.emissive= color;
	skyBoxFrontBackMaterial.emissive= color;
}
*/
