package simulife.server.socket;



public class SimulationModel 
{
/*	private static SimulationModel instance = null;
	
	private static Timer timer; 
	private static TimerTask sendMessagesTask;

 	
	//startSimulation
	public static void startSimulation()
	{
		instance = new SimulationModel();

		timer = new Timer();
		sendMessagesTask = new TimerTask() 
		{
			@Override
			public void run() {
				try{
					instance.sendMessages();
				}catch(Exception ex){
					ex.printStackTrace();
				}
			}
		};

		timer.schedule(sendMessagesTask,100);
	}
	
	//stopJavaModelSimulator
	public static void stopJavaModelSimulator()
	{
		timer.cancel();
		sendMessagesTask.cancel();
	}
	
	//sendMessage
	void sendMessages()
	{
		//(id,x,y,z,func,type) 
		
		//:4:2:-1:1:1:1
		int id=0, x=-100, y=-50, z=-50, func=1, type=1;
		
		//ArrayList<String> msgArr = new ArrayList<String>(); 
		List<GuiObject> newGuiObjects = new ArrayList<GuiObject>();
		
		
		for(z=-1;z<2;z+=2)
		{
			for(y=-1;y<2;y+=2)
			{
				for(x=-1;x<2;x+=2)
				{
/*					if(z!=-20 && z!=20 && y!=-20 && y!=20 && x!=-20 && x!=20){
						continue;
					}
*/
/*					newGuiObjects.add(new GuiObject(id++, id, x, y, z, func, type)); 

					GuiObjects.getInstance().addNewObjects(newGuiObjects);
					newGuiObjects.clear();
					try {
						Thread.sleep(10);
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}
		}
		GuiObjects.getInstance().addNewObjects(newGuiObjects);
		//sendSomeMessages(msgArr);
	}
*/
}