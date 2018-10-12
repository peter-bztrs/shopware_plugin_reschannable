# Shopware Plugin Channable Connector

## System requirements

-	Shopware 5.2.27 or above

## Installation

### Installation via FTP 

1.	Download the plugin here:
https://github.com/RESPONSEGmbH/shopware_plugin_reschannable/archive/master.zip
2.	Unpack the resChannable Zip archive.
3.	Log in via FTP to your shop server, e.g. with the FileZilla software, and navigate to the Shopware root directory, where the shopware.php is located.
4.	Now upload the plugin to the Shopware directory custom/plugins/.
5.	Install and activate the plugin via Plugin Manager in your Shopware backend.

## Configuration

### Assign articles 
1.	In the navigation, click on „Marketing > Channable > Article“.
2.	Move all items to be exported to Channable from left to right.

### Make plugin settings
1.	Open the Plugin Manager and click on the pin icon of the Channable Connector
2.	In the Configuration tab, you can now make the following settings:

##### Only transfer active articles:
Decide here if also inactive articles should be transferred.
Default: no

##### Only transfer items with image:
Decide here whether articles without images should be transferred.
Default: no

##### Only transfer items with EAN:
Decide here whether articles without EAN should be transferred. 
Default: no

##### Performance: API record limit per call 
This means that Channable is only allowed to read out the number of articles entered per call. Should your shop server cancel on call, you can reduce this number.
Default: 250
 
### Connect to Channable
1.	Open the Channable Configuration via the Plugin Manager.
2.	Click the "Auto Connect" button. You will now be redirected to Channable, where you can connect your shop with Channable.
3.	For more information about configuring in Channable, see the Channable Help Center:
https://support.channable.com/hc/en-us


