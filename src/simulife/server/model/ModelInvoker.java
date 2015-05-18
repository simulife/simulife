package simulife.server.model;

import java.util.List;

import simulife.server.GuiObject;
import simulife.server.socket.SocketHandler;

public class ModelInvoker 
{
	//startModel
	public void startModel(String sessionId, String args)
	{
		SocketHandler.getInstance().startExe(sessionId, args);
	}

	//stopModel
	public void stopModel(String sessionId)
	{
		SocketHandler.getInstance().stopExe(sessionId);		
	}

	//startFileModel
	public List<GuiObject> startFileModel(String sessionId) 
	{ 
		return FileModel.getInstance(sessionId).start(); 
	}

	//startModelTestSimulation
//	public void startModelTestSimulation()
//	{
//		SimulationModel.startSimulation();
//	}
	
	//main for testing
	public static void main(String[] args) {
/*		ModelInvoker instance = new ModelInvoker();
		instance.startModel("");
		System.out.println("rhap is up");
*/	}


}
