
//createNewElement
function createNewElement(id,parentId, x,y,z, type)
{
	//Cells
	//=====
	if(type==1){			//tumor cell
		createTumorCell(id, x,y,z, type);
	}
	else if(type==2){		//endotherial cell
		createEndoCell(id,parentId, x,y,z, type);
	}
	else if(type==3){		//fibroblast cell
		createFibroCell(id, x,y,z, type);
	}
	
	//Molecules
	//=========
	else if(type==4){		//Vegf molecule
		alert("Vegf molecule"); 
	}
	else if(type==5){		//Oxygen molecule
		alert("Oxygen molecule");
	}
	
	else if(type==6){		//Vegf group
		if(moleculesDisplayType=='Display By Cubes'){
			//id=groupingSize, parentId=level
			createVegfGroup(id, parentId, x,y,z);
		}
	}
	
	else if(type==7){		//Vegf radius
		if(moleculesDisplayType=='Display By Radiuses'){
			//parentId=radius, x=amount, type
			createVegfRadius(parentId, z);
		}
	}
	else if(type==8){		//Oxygen radius
		if(moleculesDisplayType=='Display By Radiuses'){
			//parentId=radius, x=amount, type

			//createOxygenRadius(parentId, (z+50));
			createOxygenRadius(parentId, z); 
		}
	}

	else if(type==10){		//Oxygen group
		if(moleculesDisplayType=='Display By Cubes'){
			//id=groupingSize, parentId=level
			createOxygenGroup(id, parentId, x,y,z);
		}
	}
	
/*		if(type<7){		//do not count radiuses 
			numberOfNewObjects++;
		}
*/ 
/*		document.getElementById("generationMsg").innerHTML	= 
			numberOfNewObjects + " objects added so far. Total objects: -merged and non merged: " 
			//+ scene.objects.length;
			+ scene.children.length;
*/			

}

