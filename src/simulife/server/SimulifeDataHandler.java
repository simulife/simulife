package simulife.server;

import java.util.ArrayList;
import java.util.StringTokenizer;

import simulife.server.model.ModelDataHandler;

public class SimulifeDataHandler implements ModelDataHandler
{
	@Override
	public void handleReceivedData(String sessionId, String data) 
	{
		//TODO: replace string with xml
		if(data==null || data.trim().length()<5){
			return;
		}
		StringTokenizer st = new StringTokenizer(data,":");
		if(st.countTokens()<6){
			System.out.println("less than 6 tokens(id,x,y,z,func,type): " + data);
			return;
		}
		st.nextToken();	//skip first token
		
		//String sessionId = 		st.nextToken();
		
		String idStr = 			st.nextToken();
		String parentIdStr = 	st.nextToken();
		String xStr = 			st.nextToken();
		String yStr = 			st.nextToken();
		String zStr = 			st.nextToken();
		String funcStr = 		st.nextToken();
		String typeStr = 		st.nextToken();
		
		int id,parentId, x,y,z,type,func;
		try{
			id = Integer.valueOf(idStr);
			parentId = Integer.valueOf(parentIdStr);
			x = Integer.valueOf(xStr);
			y = Integer.valueOf(yStr);
			z = Integer.valueOf(zStr);
			func = Integer.valueOf(funcStr);
			type = Integer.valueOf(typeStr); 
			
			if(func!=9 &&
					type!=6 && type!=10)	//do not manipulate ids for Oxygen and Vegf groups
			{
				//in order to make the given id unique we add a left digit with the value of 'type'  
				//id = id + (type*10000000);
			}

		}catch (Exception e) {
			e.getMessage();
			return;
		}
		//printLineData(st, id, x, y, z, type, func);
		
		//if(funcStr.equals(CELL_CREATION) || funcStr.equals(FIBROBLAST_CREATION)){
			ArrayList<GuiObject> guiObjects = new ArrayList<GuiObject>();
			
			guiObjects.add(new GuiObject(id, parentId, x,y,z, func, type));
			//System.out.println("adding object x:"+x+" y:"+y+" z:"+z+" size: "+size+" type:"+type);

			//SocketHandler.sendObjectsToSimulife(guiObjects)
			GuiObjects.getInstance().addNewObjects(sessionId, guiObjects );
		//}
	}
}
