package simulife.server;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class GuiObjects 
{
	private static GuiObjects instance = null;
	private HashMap<String, List<GuiObject>> guiObjects = null;
	//private final int MAX_OBJECTS_IN_ONE_CALL = 100;
	
	//CTOR
	private GuiObjects(){
		guiObjects = new HashMap<String, List<GuiObject>>();
	}
	
	public static GuiObjects getInstance(){
		if(instance==null){
			instance = new GuiObjects();
		}
		return instance;
	}
	
	public synchronized void clean(String sessionId)
	{
		if(instance!=null)
		{
			if(instance.guiObjects!=null){
				List<GuiObject> sessionObjects = guiObjects.get(sessionId);
				if(sessionObjects!=null){
					sessionObjects.clear();
				}
			}
		}
	}
	
	//SYNCHRONIZED
	public synchronized void addNewObjects(String sessionId, List<GuiObject> newGuiObjects) {
		if(guiObjects==null){
			guiObjects = new HashMap<String, List<GuiObject>>();
		}
	    //guiObjects.addAll(newGuiObjects);
		List<GuiObject> sessionObjects = guiObjects.remove(sessionId);
		if(sessionObjects==null){
			sessionObjects = new ArrayList<GuiObject>();
		}
		sessionObjects.addAll(newGuiObjects);
		guiObjects.put(sessionId, sessionObjects);		
	}

	//SYNCHRONIZED
//	public synchronized void clearObjectsList(){
//		guiObjects.clear();
//	}
	
	//SYNCHRONIZED
	public synchronized List<GuiObject> getNewlyAddedGuiObjects(String sessionId, boolean remove)
	{
		if(guiObjects==null || guiObjects.size()<1){
			return null;
		}
		List<GuiObject> sessionObjects = guiObjects.remove(sessionId);
		if(sessionObjects==null){
			return null;
		}
		if( ! remove)
		{
			guiObjects.put(sessionId, sessionObjects);
		}
		return sessionObjects;
	}

}
