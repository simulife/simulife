
var rotWorldMatrix;
//Rotate an object around an arbitrary axis in world space

function rotateAroundWorldAxis(object, axis, radians) 
{
	rotWorldMatrix = new THREE.Matrix4();
	rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);
	rotWorldMatrix.multiply(object.matrix);        // pre-multiply
	object.matrix = rotWorldMatrix;

	// new code for Three.js v50+
	object.rotation.setEulerFromRotationMatrix(object.matrix);
}

