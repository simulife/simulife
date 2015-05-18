package simulife.server.model;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;
import java.util.Timer;
import java.util.TimerTask;

import simulife.server.GuiObjects;
import simulife.server.Utils;
import simulife.server.xml.XmlMessageCreator;

public class ExeModel
{
	private Process modelProc = null;
	private String sessionId;
	
	private PrintWriter out;		//output stream
	private BufferedReader br;		//input stream
	
	private Timer timer; 
	private TimerTask getterTask;
	boolean shouldStop = false;
	boolean firstLine = true;

	private ModelDataHandler dataHandler;
	
	//CTOR
	public ExeModel(String sessionId){
		this.sessionId = sessionId;
	}
	
	//start
	public void start(String args) 
	{
		try {
			stop();
			
			String modelExecutable = Utils.getFileProperty("modelExe");
			
			List<String> command = new ArrayList<String>(); 
		    command.add(modelExecutable);
		    command.add(sessionId);
		    
		    StringTokenizer st = new StringTokenizer(args," ");
		    while(st.hasMoreTokens()){
			    command.add(st.nextToken());
		    }
		    System.out.println("Starting Model for session " + sessionId);
		    
		    ProcessBuilder builder = new ProcessBuilder(command);
		    builder.redirectErrorStream(true);

		    modelProc = builder.start();

		    startSocketGetter();
		    
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	//startSocketGetter
	public void startSocketGetter()
	{
		firstLine=true;
		shouldStop=false;
		dataHandler = Utils.getHandler();
		
		timer = new Timer();
		if(getterTask==null){
			createGetterTask();
		}
		timer.schedule(getterTask,100, 100);
	}
	
	//createGetterTask
	private void createGetterTask()
	{
		getterTask = new TimerTask(){
			@Override
			public void run() {
				try{
					String lineStr;
					if(shouldStop){
						br.close();
						return;
					}
					if(br==null){
						return;
					}
					lineStr = br.readLine();
					while(lineStr != null)
					{
				    	//System.out.println(">>> received line: " + lineStr);
				    	if(firstLine){
				    		firstLine=false;
				    	}
				    	else if(!lineStr.startsWith(":")){	//skip init line
			    			dataHandler.handleReceivedData(sessionId, lineStr);  
			    		}
				    	lineStr = br.readLine();
				    }
				}catch(Exception ex){
					stop();
				}
			}
		};
	}
	
	//setConnection
	public void setConnection(Socket connection) 
	{
		System.out.println("Connection received from " + connection.getInetAddress().getHostName());
		try{
			//get Output stream
			out = new PrintWriter(connection.getOutputStream(), true);
			out.flush();
			
			//get Input stream
			InputStreamReader isr = new InputStreamReader(connection.getInputStream());
			br = new BufferedReader(isr);
		    
		}catch(Exception ex){
			ex.printStackTrace();
		}
	}

	//sendMessage
	public void sendMessage(String message) 
	{
		System.out.println("Sending message to session "+sessionId+" >>> " + message);
		
		String messageXml = XmlMessageCreator.createXml(message);
		
		//out.print(message + "~");
		out.print(messageXml);
		out.flush(); 
	}

	//stop
	public void stop() 
	{
		try {
			shouldStop=true;

			GuiObjects.getInstance().clean(sessionId);
			if(modelProc!=null){
				modelProc.destroy();
			}
			if(getterTask!=null){
				getterTask.cancel();
				getterTask=null;
			}
			if(timer!=null){
				timer.cancel();
				timer=null;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("RHAP (session " +sessionId+"): "  + " stopped");
	}

}
