
//branching
function branching(id,x,y,z,type)
{
	//mark branched cell in darker color
	uniqueId = getUniqueId(id,type);
	
	var branchingObj = objectsArray[uniqueId];
	
	//Only endo cells can brunch
	if(type!=ENDO || branchingObj==undefined || branchingObj==null)
	{
		//console.log(">>> barnching object " + uniqueId + " was not found");
		return;
	}
	//branchingObj.material = endoBranchMaterial;
}