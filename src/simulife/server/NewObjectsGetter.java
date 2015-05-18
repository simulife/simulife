package simulife.server;

import java.util.List;

public class NewObjectsGetter 
{
//	private long lastGetTimeSeconds=0;
//	private long currentTimeSeconds=0;
//	private final int timeBetweenCalls = 2;
	
	public void start(){
		//lastGetTimeSeconds = System.currentTimeMillis()/1000;
	}
	
	public int getNumberOfNewObjects(String sessionId)
	{
		List<GuiObject> objects = GuiObjects.getInstance().getNewlyAddedGuiObjects(sessionId, false);
		int numOfObjects = 0;
		if(objects!=null && objects.size()>0){
			numOfObjects = objects.size();
		}
		return numOfObjects;
	}
	
	public List<GuiObject> getNewObjects(String sessionId)
	{
		//do not execute get call if at least x seconds elapsed
/*		currentTimeSeconds = System.currentTimeMillis()/1000;		
		if(currentTimeSeconds - lastGetTimeSeconds < timeBetweenCalls){
			return null;
		}
		lastGetTimeSeconds = currentTimeSeconds;
*/		
		List<GuiObject> res = GuiObjects.getInstance().getNewlyAddedGuiObjects(sessionId, true);
/*		if(res!=null && res.size()>0){
			for(GuiObject o:res){
				System.out.println("new obj: " + o.toString());
			}
		}
*/		return res; 
	}
	
	public boolean newObjectsExist(String sessionId)
	{
		List<GuiObject> objects = GuiObjects.getInstance().getNewlyAddedGuiObjects(sessionId, false);
		if(objects!=null && objects.size()>0){
			return true;
		}
		return false;
	}
	
}

