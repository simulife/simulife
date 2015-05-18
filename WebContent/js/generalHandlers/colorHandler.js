
//Tumor
var defaultTumorColor, defaultTumorAmbient, defaultTumorSpecular, defaultTumorEmissive;

function setTumorColorR(newVal){localStorage.tumorColorR = newVal; tumorMaterial.color.r = newVal/255;}
function setTumorColorG(newVal){localStorage.tumorColorG = newVal; tumorMaterial.color.g = newVal/255;}
function setTumorColorB(newVal){localStorage.tumorColorB = newVal; tumorMaterial.color.b = newVal/255;}

function setTumorAmbientR(newVal){localStorage.tumorAmbientR = newVal; tumorMaterial.ambient.r = newVal/255;}
function setTumorAmbientG(newVal){localStorage.tumorAmbientG = newVal; tumorMaterial.ambient.g = newVal/255;}
function setTumorAmbientB(newVal){localStorage.tumorAmbientB = newVal; tumorMaterial.ambient.b = newVal/255;}

function setTumorSpecularR(newVal){localStorage.tumorSpecularR = newVal; tumorMaterial.specular.r = newVal/255;}
function setTumorSpecularG(newVal){localStorage.tumorSpecularG = newVal; tumorMaterial.specular.g = newVal/255;}
function setTumorSpecularB(newVal){localStorage.tumorSpecularB = newVal; tumorMaterial.specular.b = newVal/255;}

function setTumorEmissiveR(newVal){localStorage.tumorEmissiveR = newVal; tumorMaterial.emissive.r = newVal/255;}
function setTumorEmissiveG(newVal){localStorage.tumorEmissiveG = newVal; tumorMaterial.emissive.g = newVal/255;}
function setTumorEmissiveB(newVal){localStorage.tumorEmissiveB = newVal; tumorMaterial.emissive.b = newVal/255;}

//TumorNecrotic
var defaultTumorNecroticColor, defaultTumorNecroticAmbient, defaultTumorNecroticSpecular, defaultTumorNecroticEmissive;

function setTumorNecroticColorR(newVal){localStorage.tumorNecroticColorR = newVal; tumorNecroticMaterial.color.r = newVal/255;}
function setTumorNecroticColorG(newVal){localStorage.tumorNecroticColorG = newVal; tumorNecroticMaterial.color.g = newVal/255;}
function setTumorNecroticColorB(newVal){localStorage.tumorNecroticColorB = newVal; tumorNecroticMaterial.color.b = newVal/255;}

function setTumorNecroticAmbientR(newVal){localStorage.tumorNecroticAmbientR = newVal; tumorNecroticMaterial.ambient.r = newVal/255;}
function setTumorNecroticAmbientG(newVal){localStorage.tumorNecroticAmbientG = newVal; tumorNecroticMaterial.ambient.g = newVal/255;}
function setTumorNecroticAmbientB(newVal){localStorage.tumorNecroticAmbientB = newVal; tumorNecroticMaterial.ambient.b = newVal/255;}

function setTumorNecroticSpecularR(newVal){localStorage.tumorNecroticSpecularR = newVal; tumorNecroticMaterial.specular.r = newVal/255;}
function setTumorNecroticSpecularG(newVal){localStorage.tumorNecroticSpecularG = newVal; tumorNecroticMaterial.specular.g = newVal/255;}
function setTumorNecroticSpecularB(newVal){localStorage.tumorNecroticSpecularB = newVal; tumorNecroticMaterial.specular.b = newVal/255;}

function setTumorNecroticEmissiveR(newVal){localStorage.tumorNecroticEmissiveR = newVal; tumorNecroticMaterial.emissive.r = newVal/255;}
function setTumorNecroticEmissiveG(newVal){localStorage.tumorNecroticEmissiveG = newVal; tumorNecroticMaterial.emissive.g = newVal/255;}
function setTumorNecroticEmissiveB(newVal){localStorage.tumorNecroticEmissiveB = newVal; tumorNecroticMaterial.emissive.b = newVal/255;}

//Fibro
var defaultFibroColor, defaultFibroAmbient, defaultFibroSpecular, defaultFibroEmissive;

function setFibroColorR(newVal){localStorage.fibroColorR = newVal; fibroMaterial.color.r = newVal/255;}
function setFibroColorG(newVal){localStorage.fibroColorG = newVal; fibroMaterial.color.g = newVal/255;}
function setFibroColorB(newVal){localStorage.fibroColorB = newVal; fibroMaterial.color.b = newVal/255;}

function setFibroAmbientR(newVal){localStorage.fibroAmbientR = newVal; fibroMaterial.ambient.r = newVal/255;}
function setFibroAmbientG(newVal){localStorage.fibroAmbientG = newVal; fibroMaterial.ambient.g = newVal/255;}
function setFibroAmbientB(newVal){localStorage.fibroAmbientB = newVal; fibroMaterial.ambient.b = newVal/255;}

function setFibroSpecularR(newVal){localStorage.fibroSpecularR = newVal; fibroMaterial.specular.r = newVal/255;}
function setFibroSpecularG(newVal){localStorage.fibroSpecularG = newVal; fibroMaterial.specular.g = newVal/255;}
function setFibroSpecularB(newVal){localStorage.fibroSpecularB = newVal; fibroMaterial.specular.b = newVal/255;}

function setFibroEmissiveR(newVal){localStorage.fibroEmissiveR = newVal; fibroMaterial.emissive.r = newVal/255;}
function setFibroEmissiveG(newVal){localStorage.fibroEmissiveG = newVal; fibroMaterial.emissive.g = newVal/255;}
function setFibroEmissiveB(newVal){localStorage.fibroEmissiveB = newVal; fibroMaterial.emissive.b = newVal/255;}

//Endo
var defaultEndoColor, defaultEndoAmbient, defaultEndoEmissive;// defaultEndoSpecular

function setEndoColorR(newVal){localStorage.endoColorR = newVal;endoMaterial.color.r = newVal/255;}
function setEndoColorG(newVal){localStorage.endoColorG = newVal; endoMaterial.color.g = newVal/255;}
function setEndoColorB(newVal){localStorage.endoColorB = newVal; endoMaterial.color.b = newVal/255;}

function setEndoAmbientR(newVal){localStorage.endoAmbientR = newVal; endoMaterial.ambient.r = newVal/255;}
function setEndoAmbientG(newVal){localStorage.endoAmbientG = newVal; endoMaterial.ambient.g = newVal/255;}
function setEndoAmbientB(newVal){localStorage.endoAmbientB = newVal; endoMaterial.ambient.b = newVal/255;}

function setEndoSpecularR(newVal){localStorage.endoSpecularR = newVal; endoMaterial.specular.r = newVal/255;}
function setEndoSpecularG(newVal){localStorage.endoSpecularG = newVal; endoMaterial.specular.g = newVal/255;}
function setEndoSpecularB(newVal){localStorage.endoSpecularB = newVal; endoMaterial.specular.b = newVal/255;}

function setEndoEmissiveR(newVal){localStorage.endoEmissiveR = newVal; endoMaterial.emissive.r = newVal/255;}
function setEndoEmissiveG(newVal){localStorage.endoEmissiveG = newVal; endoMaterial.emissive.g = newVal/255;}
function setEndoEmissiveB(newVal){localStorage.endoEmissiveB = newVal; endoMaterial.emissive.b = newVal/255;}


//resetTumorColors
function resetTumorColors()
{
	setTumorColorR(defaultTumorColor.r*255);	Ext.getCmp('tumorColorR').setValue(defaultTumorColor.r*255);
	setTumorColorG(defaultTumorColor.g*255);	Ext.getCmp('tumorColorG').setValue(defaultTumorColor.g*255);
	setTumorColorB(defaultTumorColor.b*255);	Ext.getCmp('tumorColorB').setValue(defaultTumorColor.b*255);

	setTumorAmbientR(defaultTumorAmbient.r*255);	Ext.getCmp('tumorAmbientR').setValue(defaultTumorAmbient.r*255);
	setTumorAmbientG(defaultTumorAmbient.g*255);	Ext.getCmp('tumorAmbientG').setValue(defaultTumorAmbient.g*255);
	setTumorAmbientB(defaultTumorAmbient.b*255);	Ext.getCmp('tumorAmbientB').setValue(defaultTumorAmbient.b*255);

	setTumorSpecularR(defaultTumorSpecular.r*255);	Ext.getCmp('tumorSpecularR').setValue(defaultTumorSpecular.r*255);
	setTumorSpecularG(defaultTumorSpecular.g*255);	Ext.getCmp('tumorSpecularG').setValue(defaultTumorSpecular.g*255);
	setTumorSpecularB(defaultTumorSpecular.b*255);	Ext.getCmp('tumorSpecularB').setValue(defaultTumorSpecular.b*255);

	setTumorEmissiveR(defaultTumorEmissive.r*255);	Ext.getCmp('tumorEmissiveR').setValue(defaultTumorEmissive.r*255);
	setTumorEmissiveG(defaultTumorEmissive.g*255);	Ext.getCmp('tumorEmissiveG').setValue(defaultTumorEmissive.g*255);
	setTumorEmissiveB(defaultTumorEmissive.b*255);	Ext.getCmp('tumorEmissiveB').setValue(defaultTumorEmissive.b*255);
}

//resetTumorNecroticColors
function resetTumorNecroticColors()
{
	setTumorNecroticColorR(defaultTumorNecroticColor.r*255);	Ext.getCmp('tumorNecroticColorR').setValue(defaultTumorNecroticColor.r*255);
	setTumorNecroticColorG(defaultTumorNecroticColor.g*255);	Ext.getCmp('tumorNecroticColorG').setValue(defaultTumorNecroticColor.g*255);
	setTumorNecroticColorB(defaultTumorNecroticColor.b*255);	Ext.getCmp('tumorNecroticColorB').setValue(defaultTumorNecroticColor.b*255);

	setTumorNecroticAmbientR(defaultTumorNecroticAmbient.r*255);	Ext.getCmp('tumorNecroticAmbientR').setValue(defaultTumorNecroticAmbient.r*255);
	setTumorNecroticAmbientG(defaultTumorNecroticAmbient.g*255);	Ext.getCmp('tumorNecroticAmbientG').setValue(defaultTumorNecroticAmbient.g*255);
	setTumorNecroticAmbientB(defaultTumorNecroticAmbient.b*255);	Ext.getCmp('tumorNecroticAmbientB').setValue(defaultTumorNecroticAmbient.b*255);

	setTumorNecroticSpecularR(defaultTumorNecroticSpecular.r*255);	Ext.getCmp('tumorNecroticSpecularR').setValue(defaultTumorNecroticSpecular.r*255);
	setTumorNecroticSpecularG(defaultTumorNecroticSpecular.g*255);	Ext.getCmp('tumorNecroticSpecularG').setValue(defaultTumorNecroticSpecular.g*255);
	setTumorNecroticSpecularB(defaultTumorNecroticSpecular.b*255);	Ext.getCmp('tumorNecroticSpecularB').setValue(defaultTumorNecroticSpecular.b*255);

	setTumorNecroticEmissiveR(defaultTumorNecroticEmissive.r*255);	Ext.getCmp('tumorNecroticEmissiveR').setValue(defaultTumorNecroticEmissive.r*255);
	setTumorNecroticEmissiveG(defaultTumorNecroticEmissive.g*255);	Ext.getCmp('tumorNecroticEmissiveG').setValue(defaultTumorNecroticEmissive.g*255);
	setTumorNecroticEmissiveB(defaultTumorNecroticEmissive.b*255);	Ext.getCmp('tumorNecroticEmissiveB').setValue(defaultTumorNecroticEmissive.b*255);
}

//resetFibroColors
function resetFibroColors()
{
	setFibroColorR(defaultFibroColor.r*255);	Ext.getCmp('fibroColorR').setValue(defaultFibroColor.r*255);
	setFibroColorG(defaultFibroColor.g*255);	Ext.getCmp('fibroColorG').setValue(defaultFibroColor.g*255);
	setFibroColorB(defaultFibroColor.b*255);	Ext.getCmp('fibroColorB').setValue(defaultFibroColor.b*255);

	setFibroAmbientR(defaultFibroAmbient.r*255);	Ext.getCmp('fibroAmbientR').setValue(defaultFibroAmbient.r*255);
	setFibroAmbientG(defaultFibroAmbient.g*255);	Ext.getCmp('fibroAmbientG').setValue(defaultFibroAmbient.g*255);
	setFibroAmbientB(defaultFibroAmbient.b*255);	Ext.getCmp('fibroAmbientB').setValue(defaultFibroAmbient.b*255);

	setFibroSpecularR(defaultFibroSpecular.r*255);	Ext.getCmp('fibroSpecularR').setValue(defaultFibroSpecular.r*255);
	setFibroSpecularG(defaultFibroSpecular.g*255);	Ext.getCmp('fibroSpecularG').setValue(defaultFibroSpecular.g*255);
	setFibroSpecularB(defaultFibroSpecular.b*255);	Ext.getCmp('fibroSpecularB').setValue(defaultFibroSpecular.b*255);

	setFibroEmissiveR(defaultFibroEmissive.r*255);	Ext.getCmp('fibroEmissiveR').setValue(defaultFibroEmissive.r*255);
	setFibroEmissiveG(defaultFibroEmissive.g*255);	Ext.getCmp('fibroEmissiveG').setValue(defaultFibroEmissive.g*255);
	setFibroEmissiveB(defaultFibroEmissive.b*255);	Ext.getCmp('fibroEmissiveB').setValue(defaultFibroEmissive.b*255);
}

//resetEndoColors
function resetEndoColors()
{
	setEndoColorR(defaultEndoColor.r*255);	Ext.getCmp('endoColorR').setValue(defaultEndoColor.r*255);
	setEndoColorG(defaultEndoColor.g*255);	Ext.getCmp('endoColorG').setValue(defaultEndoColor.g*255);
	setEndoColorB(defaultEndoColor.b*255);	Ext.getCmp('endoColorB').setValue(defaultEndoColor.b*255);

	setEndoAmbientR(defaultEndoAmbient.r*255);	Ext.getCmp('endoAmbientR').setValue(defaultEndoAmbient.r*255);
	setEndoAmbientG(defaultEndoAmbient.g*255);	Ext.getCmp('endoAmbientG').setValue(defaultEndoAmbient.g*255);
	setEndoAmbientB(defaultEndoAmbient.b*255);	Ext.getCmp('endoAmbientB').setValue(defaultEndoAmbient.b*255);

/*	setEndoSpecularR(defaultEndoSpecular.r*255);	Ext.getCmp('endoSpecularR').setValue(defaultEndoSpecular.r*255);
	setEndoSpecularG(defaultEndoSpecular.g*255);	Ext.getCmp('endoSpecularG').setValue(defaultEndoSpecular.g*255);
	setEndoSpecularB(defaultEndoSpecular.b*255);	Ext.getCmp('endoSpecularB').setValue(defaultEndoSpecular.b*255);
*/
	setEndoEmissiveR(defaultEndoEmissive.r*255);	Ext.getCmp('endoEmissiveR').setValue(defaultEndoEmissive.r*255);
	setEndoEmissiveG(defaultEndoEmissive.g*255);	Ext.getCmp('endoEmissiveG').setValue(defaultEndoEmissive.g*255);
	setEndoEmissiveB(defaultEndoEmissive.b*255);	Ext.getCmp('endoEmissiveB').setValue(defaultEndoEmissive.b*255);
}


//resetColors
function resetColors()
{
	window.localStorage.clear();
	
	resetTumorColors();
	resetTumorNecroticColors();
	resetFibroColors();
	resetEndoColors();

	window.localStorage.clear();
}

//tumorLocalStorageInit
function tumorLocalStorageInit()
{
	//tumorMaterial.color.copy(defaultTumorColor);
	
	var val = localStorage.tumorColorR;
	if(val!=undefined && val!=-1){
		tumorMaterial.color.r = val/255;
	}else{
		tumorMaterial.color.r = defaultTumorColor.r;
	}
	Ext.getCmp('tumorColorR').setValue(tumorMaterial.color.r*255);

	val = localStorage.tumorColorG;
	if(val!=undefined && val!=-1){
		tumorMaterial.color.g = val/255; 
	}else{
		tumorMaterial.color.g = defaultTumorColor.g;
	}
	Ext.getCmp('tumorColorG').setValue(tumorMaterial.color.g*255);

	val = localStorage.tumorColorB;
	if(val!=undefined && val!=-1){
		tumorMaterial.color.b = val/255;
	}else{
		tumorMaterial.color.b = defaultTumorColor.b;
	}
	Ext.getCmp('tumorColorB').setValue(tumorMaterial.color.b*255);

	val = localStorage.tumorAmbientR;
	if(val!=undefined && val!=-1){
		tumorMaterial.ambient.r = val/255;
	}else{
		tumorMaterial.ambient.r = defaultTumorAmbient.r;
	}
	Ext.getCmp('tumorAmbientR').setValue(tumorMaterial.ambient.r*255);

	val = localStorage.tumorAmbientG;
	if(val!=undefined && val!=-1){
		tumorMaterial.ambient.g = val/255;
	}else{
		tumorMaterial.ambient.g = defaultTumorAmbient.g;
	}
	Ext.getCmp('tumorAmbientG').setValue(tumorMaterial.ambient.g*255);

	val = localStorage.tumorAmbientB;
	if(val!=undefined && val!=-1){
		tumorMaterial.ambient.b = val/255;
	}else{
		tumorMaterial.ambient.b = defaultTumorAmbient.b;
	}
	Ext.getCmp('tumorAmbientB').setValue(tumorMaterial.ambient.b*255);

	val = localStorage.tumorSpecularR;
	if(val!=undefined && val!=-1){
		tumorMaterial.specular.r = val/255;
	}else{
		tumorMaterial.specular.r = defaultTumorSpecular.r;
		Ext.getCmp('tumorSpecularR').setValue(defaultTumorSpecular.r*255);
	}
	Ext.getCmp('tumorSpecularR').setValue(tumorMaterial.specular.r*255);

	val = localStorage.tumorSpecularG;
	if(val!=undefined && val!=-1){
		tumorMaterial.specular.g = val/255;
	}else{
		tumorMaterial.specular.g = defaultTumorSpecular.g;
	}
	Ext.getCmp('tumorSpecularG').setValue(tumorMaterial.specular.g*255);

	val = localStorage.tumorSpecularB;
	if(val!=undefined && val!=-1){
		tumorMaterial.specular.b = val/255;
	}else{
		tumorMaterial.specular.b = defaultTumorSpecular.b;
	}
	Ext.getCmp('tumorSpecularB').setValue(tumorMaterial.specular.b*255);

	val = localStorage.tumorEmissiveR;
	if(val!=undefined && val!=-1){
		tumorMaterial.emissive.r = val/255;
	}else{
		tumorMaterial.emissive.r = defaultTumorEmissive.r;
	}
	Ext.getCmp('tumorEmissiveR').setValue(tumorMaterial.emissive.r*255);

	val = localStorage.tumorEmissiveG;
	if(val!=undefined && val!=-1){
		tumorMaterial.emissive.g = val/255;
	}else{
		tumorMaterial.emissive.g = defaultTumorEmissive.g;
	}
	Ext.getCmp('tumorEmissiveG').setValue(tumorMaterial.emissive.g*255);

	val = localStorage.tumorEmissiveB;
	if(val!=undefined && val!=-1){
		tumorMaterial.emissive.b = val/255; 
	}else{
		tumorMaterial.emissive.b = defaultTumorEmissive.b;
	}
	Ext.getCmp('tumorEmissiveB').setValue(tumorMaterial.emissive.b*255);
}

//tumorNecroticLocalStorageInit
function tumorNecroticLocalStorageInit()
{
	var val = localStorage.tumorNecroticColorR;
	if(val!=undefined && val!=-1){
		tumorNecroticMaterial.color.r = val/255;
	}else{
		tumorNecroticMaterial.color.r = defaultTumorNecroticColor.r;
	}
	Ext.getCmp('tumorNecroticColorR').setValue(tumorNecroticMaterial.color.r*255);

	val = localStorage.tumorNecroticColorG;
	if(val!=undefined && val!=-1){
		tumorNecroticMaterial.color.g = val/255; 
	}else{
		tumorNecroticMaterial.color.g = defaultTumorNecroticColor.g;
	}
	Ext.getCmp('tumorNecroticColorG').setValue(tumorNecroticMaterial.color.g*255);

	val = localStorage.tumorNecroticColorB;
	if(val!=undefined && val!=-1){
		tumorNecroticMaterial.color.b = val/255;
	}else{
		tumorNecroticMaterial.color.b = defaultTumorNecroticColor.b;
	}
	Ext.getCmp('tumorNecroticColorB').setValue(tumorNecroticMaterial.color.b*255);

	val = localStorage.tumorNecroticAmbientR;
	if(val!=undefined && val!=-1){
		tumorNecroticMaterial.ambient.r = val/255;
	}else{
		tumorNecroticMaterial.ambient.r = defaultTumorNecroticAmbient.r;
	}
	Ext.getCmp('tumorNecroticAmbientR').setValue(tumorNecroticMaterial.ambient.r*255);

	val = localStorage.tumorNecroticAmbientG;
	if(val!=undefined && val!=-1){
		tumorNecroticMaterial.ambient.g = val/255;
	}else{
		tumorNecroticMaterial.ambient.g = defaultTumorNecroticAmbient.g;
	}
	Ext.getCmp('tumorNecroticAmbientG').setValue(tumorNecroticMaterial.ambient.g*255);

	val = localStorage.tumorNecroticAmbientB;
	if(val!=undefined && val!=-1){
		tumorNecroticMaterial.ambient.b = val/255;
	}else{
		tumorNecroticMaterial.ambient.b = defaultTumorNecroticAmbient.b;
	}
	Ext.getCmp('tumorNecroticAmbientB').setValue(tumorNecroticMaterial.ambient.b*255);

	val = localStorage.tumorNecroticSpecularR;
	if(val!=undefined && val!=-1){
		tumorNecroticMaterial.specular.r = val/255;
	}else{
		tumorNecroticMaterial.specular.r = defaultTumorNecroticSpecular.r;
		Ext.getCmp('tumorNecroticSpecularR').setValue(defaultTumorNecroticSpecular.r*255);
	}
	Ext.getCmp('tumorNecroticSpecularR').setValue(tumorNecroticMaterial.specular.r*255);

	val = localStorage.tumorNecroticSpecularG;
	if(val!=undefined && val!=-1){
		tumorNecroticMaterial.specular.g = val/255;
	}else{
		tumorNecroticMaterial.specular.g = defaultTumorNecroticSpecular.g;
	}
	Ext.getCmp('tumorNecroticSpecularG').setValue(tumorNecroticMaterial.specular.g*255);

	val = localStorage.tumorNecroticSpecularB;
	if(val!=undefined && val!=-1){
		tumorNecroticMaterial.specular.b = val/255;
	}else{
		tumorNecroticMaterial.specular.b = defaultTumorNecroticSpecular.b;
	}
	Ext.getCmp('tumorNecroticSpecularB').setValue(tumorNecroticMaterial.specular.b*255);

	val = localStorage.tumorNecroticEmissiveR;
	if(val!=undefined && val!=-1){
		tumorNecroticMaterial.emissive.r = val/255;
	}else{
		tumorNecroticMaterial.emissive.r = defaultTumorNecroticEmissive.r;
	}
	Ext.getCmp('tumorNecroticEmissiveR').setValue(tumorNecroticMaterial.emissive.r*255);

	val = localStorage.tumorNecroticEmissiveG;
	if(val!=undefined && val!=-1){
		tumorNecroticMaterial.emissive.g = val/255;
	}else{
		tumorNecroticMaterial.emissive.g = defaultTumorNecroticEmissive.g;
	}
	Ext.getCmp('tumorNecroticEmissiveG').setValue(tumorNecroticMaterial.emissive.g*255);

	val = localStorage.tumorNecroticEmissiveB;
	if(val!=undefined && val!=-1){
		tumorNecroticMaterial.emissive.b = val/255; 
	}else{
		tumorNecroticMaterial.emissive.b = defaultTumorNecroticEmissive.b;
	}
	Ext.getCmp('tumorNecroticEmissiveB').setValue(tumorNecroticMaterial.emissive.b*255);
}

//fibroblastLocalStorageInit
function fibroblastLocalStorageInit()
{
	var val = localStorage.fibroColorR;
	if(val!=undefined && val!=-1){
		fibroMaterial.color.r = val/255;
	}else{
		fibroMaterial.color.r = defaultFibroColor.r;
	}
	Ext.getCmp('fibroColorR').setValue(fibroMaterial.color.r*255);

	val = localStorage.fibroColorG;
	if(val!=undefined && val!=-1){
		fibroMaterial.color.g = val/255; 
	}else{
		fibroMaterial.color.g = defaultFibroColor.g;
	}
	Ext.getCmp('fibroColorG').setValue(fibroMaterial.color.g*255);

	val = localStorage.fibroColorB;
	if(val!=undefined && val!=-1){
		fibroMaterial.color.b = val/255;
	}else{
		fibroMaterial.color.b = defaultFibroColor.b;
	}
	Ext.getCmp('fibroColorB').setValue(fibroMaterial.color.b*255);

	val = localStorage.fibroAmbientR;
	if(val!=undefined && val!=-1){
		fibroMaterial.ambient.r = val/255;
	}else{
		fibroMaterial.ambient.r = defaultFibroAmbient.r;
	}
	Ext.getCmp('fibroAmbientR').setValue(fibroMaterial.ambient.r*255);

	val = localStorage.fibroAmbientG;
	if(val!=undefined && val!=-1){
		fibroMaterial.ambient.g = val/255;
	}else{
		fibroMaterial.ambient.g = defaultFibroAmbient.g;
	}
	Ext.getCmp('fibroAmbientG').setValue(fibroMaterial.ambient.g*255);

	val = localStorage.fibroAmbientB;
	if(val!=undefined && val!=-1){
		fibroMaterial.ambient.b = val/255;
	}else{
		fibroMaterial.ambient.b = defaultFibroAmbient.b;
	}
	Ext.getCmp('fibroAmbientB').setValue(fibroMaterial.ambient.b*255);

	val = localStorage.fibroSpecularR;
	if(val!=undefined && val!=-1){
		fibroMaterial.specular.r = val/255;
	}else{
		fibroMaterial.specular.r = defaultFibroSpecular.r;
		Ext.getCmp('fibroSpecularR').setValue(defaultFibroSpecular.r*255);
	}
	Ext.getCmp('fibroSpecularR').setValue(fibroMaterial.specular.r*255);

	val = localStorage.fibroSpecularG;
	if(val!=undefined && val!=-1){
		fibroMaterial.specular.g = val/255;
	}else{
		fibroMaterial.specular.g = defaultFibroSpecular.g;
	}
	Ext.getCmp('fibroSpecularG').setValue(fibroMaterial.specular.g*255);

	val = localStorage.fibroSpecularB;
	if(val!=undefined && val!=-1){
		fibroMaterial.specular.b = val/255;
	}else{
		fibroMaterial.specular.b = defaultFibroSpecular.b;
	}
	Ext.getCmp('fibroSpecularB').setValue(fibroMaterial.specular.b*255);

	val = localStorage.fibroEmissiveR;
	if(val!=undefined && val!=-1){
		fibroMaterial.emissive.r = val/255;
	}else{
		fibroMaterial.emissive.r = defaultFibroEmissive.r;
	}
	Ext.getCmp('fibroEmissiveR').setValue(fibroMaterial.emissive.r*255);

	val = localStorage.fibroEmissiveG;
	if(val!=undefined && val!=-1){
		fibroMaterial.emissive.g = val/255;
	}else{
		fibroMaterial.emissive.g = defaultFibroEmissive.g;
	}
	Ext.getCmp('fibroEmissiveG').setValue(fibroMaterial.emissive.g*255);

	val = localStorage.fibroEmissiveB;
	if(val!=undefined && val!=-1){
		fibroMaterial.emissive.b = val/255; 
	}else{
		fibroMaterial.emissive.b = defaultFibroEmissive.b;
	}
	Ext.getCmp('fibroEmissiveB').setValue(fibroMaterial.emissive.b*255);
}

//endothelialLocalStorageInit
function endothelialLocalStorageInit()
{
	var val = localStorage.endoColorR;
	if(val!=undefined && val!=-1){
		endoMaterial.color.r = val/255;
	}else{
		endoMaterial.color.r = defaultEndoColor.r;
	}
	Ext.getCmp('endoColorR').setValue(endoMaterial.color.r*255);

	val = localStorage.endoColorG;
	if(val!=undefined && val!=-1){
		endoMaterial.color.g = val/255; 
	}else{
		endoMaterial.color.g = defaultEndoColor.g;
	}
	Ext.getCmp('endoColorG').setValue(endoMaterial.color.g*255);

	val = localStorage.endoColorB;
	if(val!=undefined && val!=-1){
		endoMaterial.color.b = val/255;
	}else{
		endoMaterial.color.b = defaultEndoColor.b;
	}
	Ext.getCmp('endoColorB').setValue(endoMaterial.color.b*255);

	val = localStorage.endoAmbientR;
	if(val!=undefined && val!=-1){
		endoMaterial.ambient.r = val/255;
	}else{
		endoMaterial.ambient.r = defaultEndoAmbient.r;
	}
	Ext.getCmp('endoAmbientR').setValue(endoMaterial.ambient.r*255);

	val = localStorage.endoAmbientG;
	if(val!=undefined && val!=-1){
		endoMaterial.ambient.g = val/255;
	}else{
		endoMaterial.ambient.g = defaultEndoAmbient.g;
	}
	Ext.getCmp('endoAmbientG').setValue(endoMaterial.ambient.g*255);

	val = localStorage.endoAmbientB;
	if(val!=undefined && val!=-1){
		endoMaterial.ambient.b = val/255;
	}else{
		endoMaterial.ambient.b = defaultEndoAmbient.b;
	}
	Ext.getCmp('endoAmbientB').setValue(endoMaterial.ambient.b*255);

/*	val = localStorage.endoSpecularR;
	if(val!=undefined && val!=-1){
		endoMaterial.specular.r = val/255;
	}else{
		endoMaterial.specular.r = defaultEndoSpecular.r;
		Ext.getCmp('endoSpecularR').setValue(defaultEndoSpecular.r*255);
	}
	Ext.getCmp('endoSpecularR').setValue(endoMaterial.specular.r*255);

	val = localStorage.endoSpecularG;
	if(val!=undefined && val!=-1){
		endoMaterial.specular.g = val/255;
	}else{
		endoMaterial.specular.g = defaultEndoSpecular.g;
	}
	Ext.getCmp('endoSpecularG').setValue(endoMaterial.specular.g*255);

	val = localStorage.endoSpecularB;
	if(val!=undefined && val!=-1){
		endoMaterial.specular.b = val/255;
	}else{
		endoMaterial.specular.b = defaultEndoSpecular.b;
	}
	Ext.getCmp('endoSpecularB').setValue(endoMaterial.specular.b*255);
*/
	val = localStorage.endoEmissiveR;
	if(val!=undefined && val!=-1){
		endoMaterial.emissive.r = val/255;
	}else{
		endoMaterial.emissive.r = defaultEndoEmissive.r;
	}
	Ext.getCmp('endoEmissiveR').setValue(endoMaterial.emissive.r*255);

	val = localStorage.endoEmissiveG;
	if(val!=undefined && val!=-1){
		endoMaterial.emissive.g = val/255;
	}else{
		endoMaterial.emissive.g = defaultEndoEmissive.g;
	}
	Ext.getCmp('endoEmissiveG').setValue(endoMaterial.emissive.g*255);

	val = localStorage.endoEmissiveB;
	if(val!=undefined && val!=-1){
		endoMaterial.emissive.b = val/255; 
	}else{
		endoMaterial.emissive.b = defaultEndoEmissive.b;
	}
	Ext.getCmp('endoEmissiveB').setValue(endoMaterial.emissive.b*255);

}

