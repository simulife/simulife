
//detailsReceived
function detailsReceived(id,parentId,x,y,z,type)
{
	var typeStr;
	
	if(type==TUMOR){
		typeStr="Tumor";
	}
	else if(type==FIBRO){
		typeStr="Fibroblast";
	}
	else if(type==ENDO){
		typeStr="Endothelial";
	}
	else{
		typeStr="type";
	}
		
	Ext.getCmp('selectedCellDetailsId').setValue(id);
	Ext.getCmp('selectedCellDetailsParentId').setValue(parentId);
	Ext.getCmp('selectedCellDetailsPos').setValue("x:"+x+" y:"+y+" z:"+z);
	Ext.getCmp('selectedCellDetailsType').setValue(typeStr);
}
