package simulife.server.xml;

import java.io.StringWriter;
import java.util.StringTokenizer;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

public class XmlMessageCreator {

	private static final String VARIABLES = "variables";
	private static final String NEW_CELL = "newCell";
	private static final String KILL_CELL = "killCell";
	private static final String CELL_DETAILS = "cellDetails";
	private static final String CELL_PARAMETER = "cellParameter";
	private static final String GENERATE_EVENT = "generateEvent";
	
	//createXml
	public static String createXml(String message)
	{
		if(message==null || message.indexOf(':')<1){
			System.out.println(">>> message from JS to JAVA should include : <<<");
			return null;
		}
		try{
			StringTokenizer st = new StringTokenizer(message,":");
			String messageKind = st.nextToken();
	
			DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
			Document doc = docBuilder.newDocument();
			
			//VARIABLES
			if(messageKind.equals(VARIABLES)){
				createVariablesXml(new StringTokenizer(st.nextToken()," "), doc);
			}
			//NEW_CELL
			else if(messageKind.equals(NEW_CELL)){
				createNewCellXml(st, doc);
			}
			//KILL_CELL
			else if(messageKind.equals(KILL_CELL)){
				createKillCellXml(st, doc);
			}
			//CELL_DETAILS
			else if(messageKind.equals(CELL_DETAILS)){
				createCellDetailsXml(st, doc);
			}
			//CELL_PARAMETER
			else if(messageKind.equals(CELL_PARAMETER)){
				createCellParameterXml(st, doc);
			}
			//GENERATE_EVENT
			else if(messageKind.equals(GENERATE_EVENT)){
				createGenerateEventXml(st, doc);
			}
			
			// write the content into xml file - FOR TESTING
			TransformerFactory transformerFactory = TransformerFactory.newInstance();
			Transformer transformer = transformerFactory.newTransformer();
			DOMSource source = new DOMSource(doc);

			//StreamResult result = new StreamResult(new File("C:\\file.xml"));
			//StreamResult result = new StreamResult(System.out);

			StreamResult result = new StreamResult(new StringWriter());
			transformer.transform(source, result);
			String xmlString = result.getWriter().toString();
			
			return xmlString;
			
		}
		catch(Exception ex){
			System.out.println(">>> message from JS to JAVA has invalid structure <<<");
			ex.printStackTrace();
		}
		return null;
	}

	//createGenerateEventXml
	private static void createGenerateEventXml(
			StringTokenizer st, Document doc) 
	{
		Element child;
		Element rootElement = doc.createElement("function");
		rootElement.setAttribute("name", "generateEvent");
		doc.appendChild(rootElement);

		String type = st.nextToken();
		String id = st.nextToken();
		String eventName = st.nextToken();

		child = doc.createElement("type");
		child.setAttribute("value", type);
		rootElement.appendChild(child);

		child = doc.createElement("id");
		child.setAttribute("value", id);
		rootElement.appendChild(child);

		child = doc.createElement("eventName");
		child.setAttribute("value", eventName);
		rootElement.appendChild(child);
	}

	//createCellParameterXml
	private static void createCellParameterXml(
			StringTokenizer st, Document doc) 
	{
		Element child;
		Element rootElement = doc.createElement("function");
		rootElement.setAttribute("name", "cellParameter");
		doc.appendChild(rootElement);

		String type = st.nextToken();
		String id = st.nextToken();
		String paramName = st.nextToken();
		String paramValue = st.nextToken();

		child = doc.createElement("type");
		child.setAttribute("value", type);
		rootElement.appendChild(child);

		child = doc.createElement("id");
		child.setAttribute("value", id);
		rootElement.appendChild(child);

		child = doc.createElement("paramName");
		child.setAttribute("value", paramName);
		rootElement.appendChild(child);
		
		child = doc.createElement("paramValue");
		child.setAttribute("value", paramValue);
		rootElement.appendChild(child);
	}

	//createCellDetailsXml
	private static void createCellDetailsXml(
			StringTokenizer st, Document doc) 
	{
		Element child;
		Element rootElement = doc.createElement("function");
		rootElement.setAttribute("name", "cellDetails");
		doc.appendChild(rootElement);

		String type = st.nextToken();
		String id = st.nextToken();

		child = doc.createElement("type");
		child.setAttribute("value", type);
		rootElement.appendChild(child);

		child = doc.createElement("id");
		child.setAttribute("value", id);
		rootElement.appendChild(child);
	}

	//createKillCellXml
	private static void createKillCellXml(
			StringTokenizer st,Document doc) 
	{
		Element child;
		Element rootElement = doc.createElement("function");
		rootElement.setAttribute("name", "killCell");
		doc.appendChild(rootElement);

		String type = st.nextToken();
		String id = st.nextToken();
		String amount = st.nextToken();

		child = doc.createElement("type");
		child.setAttribute("value", type);
		rootElement.appendChild(child);

		child = doc.createElement("id");
		child.setAttribute("value", id);
		rootElement.appendChild(child);

		child = doc.createElement("amount");
		child.setAttribute("value", amount);
		rootElement.appendChild(child);
	}

	//createNewCellXml
	private static void createNewCellXml(
			StringTokenizer st, Document doc) 
	{		
		Element child;
		Element rootElement = doc.createElement("function");
		rootElement.setAttribute("name", "newCell");
		doc.appendChild(rootElement);

		String type = st.nextToken();
		String x = st.nextToken();
		String y = st.nextToken();
		String z = st.nextToken();
		String amount = st.nextToken();

		child = doc.createElement("type");
		child.setAttribute("value", type);
		rootElement.appendChild(child);

		child = doc.createElement("x");
		child.setAttribute("value", x);
		rootElement.appendChild(child);

		child = doc.createElement("y");
		child.setAttribute("value", y);
		rootElement.appendChild(child);

		child = doc.createElement("z");
		child.setAttribute("value", z);
		rootElement.appendChild(child);

		child = doc.createElement("amount");
		child.setAttribute("value", amount);
		rootElement.appendChild(child);
	}

	//createVariablesXml
	private static void createVariablesXml(
			StringTokenizer st,Document doc) 
	{
		//Variables as Child Elemets
/*		Element child;
		Element rootElement = doc.createElement("function");
		rootElement.setAttribute("name", "variables");
		doc.appendChild(rootElement);

		String key,value;
		while(st.hasMoreTokens()){
			key = st.nextToken();
			value = st.nextToken();
			
			child = doc.createElement(key);
			child.setAttribute("value", value); 
			rootElement.appendChild(child);
		}
*/
		//Variables as attributes
		Element rootElement = doc.createElement("function");
		rootElement.setAttribute("name", "variables");
		doc.appendChild(rootElement);

		Element variables = doc.createElement("variables");

		String key,value;
		while(st.hasMoreTokens()){
			key = st.nextToken();
			value = st.nextToken();
			
			variables.setAttribute(key, value); 
		}
		rootElement.appendChild(variables);

		
	}
	
	
}
