# SimuLife

This is an interactive animation tool used for visualizing the occurrences of a computerized biological model that it is connected to. Currently it is connected to a model of a cancerous tumor and its surrounding.

An interactive animation tool used for visualizing the occurrences of a computerized biological model that it is connected to. Currently it is connected to a model of a cancerous tumor and its surrounding.  
Simulife can receive input from a model, as well as send information to the model (both sent as XML files) and draw the graphics based on the changes, making it possible to see the ongoing events of the entire model on the screen in real time. It is based on WebGL (Web Graphics Library), a JavaScript API (THREE.js framework in our case) for rendering interactive 3D graphics within any compatible web browser without the use of plug-ins. The client side is Chrome and the communication with external engines is done via sockets. 

# Setting up a development environment

- Download simulife source files
- Pack it as a war file
  - Can be done by importing it to Eclipse IDE for Java EE Developers and then choose Export -> WAR file
- Deploy it on a web server
  - Can be deployed on Tomcat7 by placing the war file in tomcat webapps folder
