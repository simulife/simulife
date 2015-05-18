
//Constants
var OXYGEN = 'Oxygen';
var VEGF = 'Vegf';

var CELL_SIZE = 2;							//comes from rhaqpsody
var GUI_SIZE_MULTIPLIER = 10;	
//var CELL_RADIUS = 8.66 * CELL_SIZE * 1.05;
var CELL_RADIUS = GUI_SIZE_MULTIPLIER * Math.sqrt(3) / 2 * CELL_SIZE * 1.05;
var moleculesDisplayType='Display By Cubes';
//Global variables
var updateGraphs=false;
var shouldCreateInitGrous=true;