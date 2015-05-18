
//getUniqueId
function getUniqueId(id, type)
{
	return type*10000000 + id;
}

//randomlyRotateMesh
function randomlyRotateMesh(mesh)
{
	mesh.rotation.x += Math.random() * 360 * Math.PI / 180  
	mesh.rotation.y += Math.random() * 360 * Math.PI / 180
	mesh.rotation.z += Math.random() * 360 * Math.PI / 180
}

