package simulife.server.socket;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.HashMap;

import simulife.server.Utils;
import simulife.server.model.ExeModel;

public class SocketHandler
{
    private static SocketHandler instance = null;
    
    private HashMap<String, ExeModel> exeModels = null;

    private ServerSocket providerSocket;
    private boolean started = false;
	private Thread waitForConnectionsThread;

	private ArrayList<String> sessionsWaitingForConnection; 
	private boolean goOn = true;
	
	//CTOR
	public SocketHandler(){
		exeModels = new HashMap<String, ExeModel>();
		sessionsWaitingForConnection = new ArrayList<String>();
	}
	
	//getInstance
	public static SocketHandler getInstance(){
		if(instance==null){
			instance = new SocketHandler();
		}
		return instance;
	}

	//stopExe
	public void stopExe(String sessionId)
	{
		if( ! started){
			return;
		}
		ExeModel existingExe = exeModels.get(sessionId);
		if(existingExe!=null){
			existingExe.stop();
			exeModels.remove(sessionId);
		}
	}

	//startExe
	public void startExe(String sessionId, String args)
	{
		goOn = true;
		stopExe(sessionId);		//remove existing exe with the same sessionId if exists..
		if( ! started){
			if(waitForConnectionsThread==null){
				waitForNewConnections();
				started = true;
			}
		}
		ExeModel newExe = new ExeModel(sessionId);
		sessionsWaitingForConnection.add(sessionId);
		newExe.start(args);
		exeModels.put(sessionId, newExe);
	}

	//send message on socket
	public void sendMessage(String sessionId, String message)
	{
		ExeModel exeModel = exeModels.get(sessionId);
		if(exeModel!=null){
			exeModel.sendMessage(message);
		}
	}

	//waitForNewConnections
	private void waitForNewConnections()
	{
		try {
			//1. create a server socket
			String port = Utils.getProperty("port");
			String backlog = Utils.getProperty("backlog");
			providerSocket = new ServerSocket(Integer.parseInt(port), Integer.parseInt(backlog));
						
			Runnable waitRunnable = new Runnable() 
			{
				@Override
				public void run() 
				{
					Socket connection;
					String sessionId;
					ExeModel exeModel;
					
					//infinite loop
					while(goOn)
					{
						try{
							//2. Wait for connection
							//System.out.println("Waiting for connection");
							connection = providerSocket.accept();
							
							InputStreamReader isr = new InputStreamReader(connection.getInputStream());
							BufferedReader br = new BufferedReader(isr);
							String lineStr = br.readLine();
							
							//System.out.println("Connection received from " + connection.getInetAddress().getHostName());
							if(sessionsWaitingForConnection.size()>0){	//should always be true since the session request comes before the exe is created and the connection is made
								sessionId = sessionsWaitingForConnection.remove(0);
								exeModel = exeModels.get(sessionId);
								if(exeModel!=null){
									exeModel.setConnection(connection);
								}
							}
						}catch(Exception ex){
							ex.printStackTrace();
						}						
					}
				}
			};
			waitForConnectionsThread = new Thread(waitRunnable);
			waitForConnectionsThread.run();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	//stopSocketGetter
	public void stopSocketGetter()
	{
		goOn = false;
		
		if(exeModels!=null && exeModels.size()>0){
			for(ExeModel exe:exeModels.values()){
				try{
					exe.stop();
				}catch(Exception ex){
					ex.printStackTrace();
				}
			}
			exeModels.clear();
		}
	}
	
}
