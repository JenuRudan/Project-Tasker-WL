
/* JavaScript content from js/main.js in folder common */
function wlCommonInit(){
	/*
	 * Use of WL.Client.connect() API before any connectivity to a MobileFirst Server is required. 
	 * This API should be called only once, before any other WL.Client methods that communicate with the MobileFirst Server.
	 * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	//tryconnect();
	  angular.element(document).ready(function() {
		    angular.bootstrap(document, ['starter']);
		  });
	// Common initialization code goes here
	
}
function tryconnect()
{
var invocationData = {
		adapter : 'TestDatabase',
		procedure : 'procedure1',
		parameters : []
	};
//document.getElementById("testa").innerHTML="Testing9";
WL.Client.invokeProcedure(invocationData,{
	onSuccess : loadsFeedsSuccess,
	onFailure : loadFeedsFailure
});
//document.getElementById("testa").innerHTML="Testing3";
	}
function loadsFeedsSuccess(result)
{
	//document.getElementById("testa").innerHTML="success wiki";
}
function loadFeedsFailure(result)
{
	//document.getElementById("testa").innerHTML="Failure";
}

/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the Worklight runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}