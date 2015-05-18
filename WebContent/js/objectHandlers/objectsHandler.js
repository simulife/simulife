
	//var numOfObjectsInGroup = 50;
	
/*	func:
	1 - creation
	2 - death
	3 - movement
	4 - change
	5 - branching
*/	
	
	//handleElement	
	function handleElement(elementData)
	{
		var id = 		elementData.id;
		var parentId = 	elementData.parentId;
		var x = 		elementData.x;
		var y = 		elementData.y;
		var z = 		elementData.z;
		var func = 		elementData.func;
		var type = 		elementData.type;
		
		//Creation
		if(func==1)					
		{
			createNewElement(id,parentId, x,y,z, type);
		}
		
		//Cell Death
		else if(func==2)			
		{	
			//when tumor cell dies, its color changes to dark blue.
			//all other cell types are being removed when killed (implemented in removeGraphicObject) 
			removeGraphicObject(id,x,y,z,type);
		}
		
		//Movement
		else if(func==3)			
		{
			//TODO - for testing only, marked move object in lighter color
			//moveElement
			moveGraphicObject(id,x,y,z,type);	
		}

		//Change
		else if(func==4)			
		{
			//updateElement
			//change(id,x,y,z,type);
			alert("Func == 4 , Change");
		}

		//Branching
		else if(func==5)
		{			
			branching(id,x,y,z,type); //- mark branched cell in darker color
		}

		//Cell Details
		else if(func==6)
		{			
			detailsReceived(id,parentId,x,y,z,type); 
		}

		//Amounts
		else if(func==9)			
		{
			//alert("func==9");
			//id=TimeStep, parentId=TumorCellNum, x=EndoNum, y=FibroblastNum, z=VesselsNum type=numOfVegf
			handleReceivedAmounts(id,parentId,x,y,type);	
		}
	}	

/*	type:
	1 - tumor cell
	2 - endothelial cell
	3 - fibroblast cell
	4 - Vegf molecule
	5 - Oxygen molecule
	6 - Vegf group
	7 - Vegf radius
		
	
	//createNewElement
	function createTypeAndMergeIfNeeded(meshP, geoP, matP
				,objectsArrP, numOfNewObjsP,x,y,z) 
	{
		meshP = new THREE.Mesh(geoP, matP);
		meshP.position.x = x * GUI_SIZE_MULTIPLIER;
		meshP.position.y = y * GUI_SIZE_MULTIPLIER;
		meshP.position.z = z * GUI_SIZE_MULTIPLIER;

		scene.add( meshP );
		//scene.addObject( meshP );
		
		objectsArrP[numOfNewObjsP]=meshP;
		numOfNewObjsP++;
		
		merged = mergeObjectsIfNeeded(geoP, matP, 
			numOfNewObjsP, objectsArrP);
		if(merged==true){
			numOfNewObjsP = 0;
			objectsArrP = new Array();
			merged=false;
		}
		return numOfNewObjsP;
	}

	//mergeObjectsIfNeeded
	function mergeObjectsIfNeeded(geometryV, materialV, numOfObjects, objectsArr)
	{
		//Merge Objects			 	
		if(numOfObjects >= numOfObjectsInGroup)
		{
			mergedGeo	= new THREE.Geometry();
		
			for(var i=0;i<numOfObjects;i++){
				obj = objectsArr[i];
				scene.remove(obj);
		
				THREE.GeometryUtils.merge(mergedGeo, obj);
			}
			
			mergedGeo.computeFaceNormals();
			group	= new THREE.Mesh( mergedGeo, materialV );
			group.matrixAutoUpdate = false;
			group.updateMatrix();

			scene.add( group );
			//scene.addObject( group );

			return true; 
		}
		return false;
	}					
	
*/
