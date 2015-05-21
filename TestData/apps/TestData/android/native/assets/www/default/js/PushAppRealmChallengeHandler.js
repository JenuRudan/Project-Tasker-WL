
/* JavaScript content from js/PushAppRealmChallengeHandler.js in folder common */
/*
 *  Licensed Materials - Property of IBM
 *  5725-G92 (C) Copyright IBM Corp. 2006, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

var pushAppRealmChallengeHandler = WL.Client
		.createChallengeHandler("PushAppRealm");

pushAppRealmChallengeHandler.isCustomResponse = function(response) {
	if (!response || response.responseText === null) {
		return false;
	}
	var indicatorIdx = response.responseText.search('j_security_check');

	if (indicatorIdx >= 0) {
		return true;
	}
	return false;
};

pushAppRealmChallengeHandler.handleChallenge = function(response) {
	// alert("Awel 7aga removed");
	WL.App.hideSplashScreen();
	angular.element(document).ready(function() {
		angular.bootstrap(document, [ 'starter' ]);
	});
};

pushAppRealmChallengeHandler.submitLoginFormCallback = function(response) {
	// alert("Awel 7aga removed2");
	var isLoginFormResponse = pushAppRealmChallengeHandler
			.isCustomResponse(response);
	if (isLoginFormResponse) {
		pushAppRealmChallengeHandler.handleChallenge(response);
	} else {

		pushAppRealmChallengeHandler.submitSuccess();
	}
};

function pushsec(username, password) {
	var reqURL = '/j_security_check';
	var options = {};
	options.parameters = {
		j_username : username,
		j_password : password
	};
	options.headers = {};
	pushAppRealmChallengeHandler.submitLoginForm(reqURL, options,
			pushAppRealmChallengeHandler.submitLoginFormCallback);
};
