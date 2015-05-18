
var loader, loader2;

function initVariables()
{
	loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;

	loader2 = new THREE.ColladaLoader();
	loader2.options.convertUpAxis = true;

}
