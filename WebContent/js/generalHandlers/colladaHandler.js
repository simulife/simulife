
//HandleCollada
function HandleCollada()
{
	var loader = new THREE.ColladaLoader();
	
	loader.load('images/Cancer_Cell.dae', function (collada) {
		
		// Fix materials
/*		0 && THREE.SceneUtils.traverseHierarchy(collada.scene, function (node) {
			var material;
			if ((material = node.material)) {
				node.material = new THREE.MeshBasicMaterial({
					map: material.map, morphTargets: material.morphTargets
				});
			}
		});*/
 
		// Set animations
		var animationHandler = THREE.AnimationHandler;
		collada.animations.forEach(function (animationData) 
		{		
			animationHandler.add(animationData);

			var animation = new THREE.KeyFrameAnimation(animationData.node, animationData.name);
			animation.timeScale = 0.35; 
			animation.play(true, 0); 
			animationsArr.push(animation);
			
		});

		scene.add(collada.scene);
	});	

}

//animateCollada
function animateCollada()
{
	delta = clock.getDelta();
	animationsArr.forEach(function (a) { 
		a.update(delta); 
	});	
}

