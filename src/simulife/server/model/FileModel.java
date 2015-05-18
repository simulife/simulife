package simulife.server.model;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.List;
import java.util.StringTokenizer;

import simulife.server.GuiObject;
import simulife.server.GuiObjects;
import simulife.server.Utils;

public class FileModel
{
	private static HashMap<String, FileModel> instances = null;
	
	private String sessionId;
	private ModelDataHandler dataHandler = null;
	
	//CTOR
	private FileModel(String sessionId){
		this.sessionId = sessionId;
	}
	
	//getInstance
	public static FileModel getInstance(String sessionId)
	{
		if(instances==null){
			instances = new HashMap<String, FileModel>();
		}
		FileModel sessionFileModel = instances.get(sessionId);
		if(sessionFileModel==null){
			sessionFileModel = new FileModel(sessionId);
			instances.put(sessionId, sessionFileModel);
		}
		return sessionFileModel;
	}

	//start
	public List<GuiObject> start()  
	{
		GuiObjects.getInstance().clean(sessionId);
		
		dataHandler = Utils.getHandler();
		try{
			//read file
			String filename = Utils.getFileProperty("modelFile");
			
			File f = new File(filename);
			if(!f.exists()){
				System.out.println("File does not exist!");
				return null;
			}
			BufferedReader rd = new BufferedReader(new InputStreamReader(
					new FileInputStream(f))); 
			
			StringTokenizer st; 
			String line;
			String lineStr;
			
			while ((line = rd.readLine()) != null)
			{
				st = new StringTokenizer(line," ");
				
				while(st.hasMoreTokens())
				{
					//(id,parent, x,y,z,func,type)
					lineStr = "skip:" + 
							st.nextToken()+":"+
							st.nextToken()+":"+
							st.nextToken()+":"+
							st.nextToken()+":"+
							st.nextToken()+":"+
							st.nextToken()+":"+
							st.nextToken();
					
					dataHandler.handleReceivedData(sessionId, lineStr);		
				}
			}
			rd.close();
					
		}catch(Exception ex){
			ex.printStackTrace();
		}
		return GuiObjects.getInstance().getNewlyAddedGuiObjects(sessionId, true);			
	}

	//stop
	public void stop() 
	{
		
	}

}
