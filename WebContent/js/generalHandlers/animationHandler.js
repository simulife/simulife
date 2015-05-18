
var selectedControls = 'none';
var prevSelectedControls = 'none1';

var start = Date.now();
var delta;

//animate
function animate()
{
	if(runMode == 'simulife' || runMode == 'simulateJava')			//'simulife' / 'simulateFile' / 'simulateJava'
	{
		getNewGuiObjects();
	}
	if(runMode == 'simulateFile')		//'simulife' / 'simulateFile' / 'simulateJava'
	{
		handleModelFromFile();
	}
	
	
//	if(particleSystem!=null){
//		particleSystem.rotation.y += 0.01;
//	}

	//handleObjectPicking();
	
	//fibroMaterial.uniforms[ 'time' ].value = .00025 * ( Date.now() - start ); 
	
	stats.update();
	render(); 

	if(selectedControls != prevSelectedControls){
		resetCamera();
		prevSelectedControls = selectedControls;
	}
	if(selectedControls=="Fly"){
		delta = clock.getDelta();
		flyControls.update(delta); 
	}
	else{
		controls.update(delta);
	}
	//animateCollada();
	
	requestAnimationFrame( animate );
	//setInterval(animate, 100);  
}

//render
var renderCounter=1;

function render() 
{
	//renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

	renderCounter--;
	if(renderCounter==0){
		if(totalNumOfTumorObjects<100){
			renderCounter=1;
		}else if(totalNumOfTumorObjects<500){
			renderCounter=2;
		}else if(totalNumOfTumorObjects<1000){
			renderCounter=3;
		}else if(totalNumOfTumorObjects<5000){
			renderCounter=5;
		}else if(totalNumOfTumorObjects<1000){
			renderCounter=8;
		}else{
			renderCounter=10;
		}
		renderer.render( scene, camera );
	}
}
