package simulife.server;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import simulife.server.model.ModelDataHandler;

public class Utils {

	private static final String PROPERTIES_FILENAME = "simulife.properties";
	private static final String WEBAPP_NAME = "SimuLifeWebApp";
	
	//ModelDataHandler
	public static ModelDataHandler getHandler() 
	{
		ModelDataHandler handler = null;
		String handlerClassName = Utils.getProperty("ModelDataHandler");
		try {
			handler = (ModelDataHandler) Class.forName(handlerClassName).newInstance();
		} catch (Exception e) {
			e.printStackTrace();
		}
		if(handler==null){	//use default handler
			try {
				handlerClassName = Utils.getProperty("defaultHandler");
				handler = (ModelDataHandler) Class.forName(handlerClassName).newInstance();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return handler;
	}

	//getProperty
	public static String getProperty(String propertyName) 
	{
		InputStream propertiesStream = null;
		try{
			Properties properties = new Properties();
			String deployDir = System.getProperty("wtp.deploy");
			if(deployDir==null || deployDir.equals("null")){
				deployDir = System.getProperty("catalina.home") + File.separator + "webapps";
			}
			File f = new File(deployDir + File.separator + WEBAPP_NAME + File.separator + PROPERTIES_FILENAME);
			propertiesStream = new FileInputStream(f);
			if (propertiesStream != null){
				properties.load(propertiesStream);
				return properties.getProperty(propertyName);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			if(propertiesStream!=null){
				try {
					propertiesStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}	
			}
		}
		return null;
	}

	//getFileProperty
	public static String getFileProperty(String fileNameProperty) 
	{
		String filename = getProperty(fileNameProperty);
		
		if(filename!=null && filename.contains(":")){	//full path
			return filename;		
		}else{											//get file from deployment dir
			String deployDir = System.getProperty("wtp.deploy");
			if(deployDir==null || deployDir.equals("null")){
				deployDir = System.getProperty("catalina.home") + File.separator + "webapps";
			}
			return deployDir + File.separator + Utils.WEBAPP_NAME + File.separator + filename;
		}
	}

}

