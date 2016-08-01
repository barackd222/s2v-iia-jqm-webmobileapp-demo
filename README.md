# s2v-iia-jqm-webmobileapp-demo
JQM Web Mobile App to send messages to Facebook, Google Calendar, LinkedIn and SFDC via ICS and ACCS (NodeJS)

Follow these steps to get it working:

1. Git clone or download the zip file
2. Run: npm install
3. Open file public/lib/shared-properties.js and set the following variables, depending on your environment:

              var globalIPAddressNode = 
              var globalIPAddressNode =
              
              var globalIPAddressICS = 
              var globalIPAddressICS = 

  This UI integrates with ACCS (NodeJS) to integrate into Facebook and Google Calendar, as well as into LinkedIn and SFDC via ICS - So you have to set the IP address and Port for these APIs.

4. Run it as: node app.js
5. Open a browser to http://IP:3002  - This is Mobile friendly, try to do it from your mobile. Just ensure it is in accessible in the network.

6. Send a Message and click Post - Then go to the configured account for the various social media nd confirm that the integration was done.
7. Also this App integrates with Sphero (see my other repository s2v-iia-nodejs-sphero-apis for more information), for this click on either of the arrows at the top:

      "<" - This will open the set Colour API
      ">" - This will open the make shape and set colour API

Enjoy!

Any question , drop me an email at barack.dorman@gmail.com
