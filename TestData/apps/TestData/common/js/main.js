function wlCommonInit() {
	/*
	 * Use of WL.Client.connect() API before any connectivity to a MobileFirst
	 * Server is required. This API should be called only once, before any other
	 * WL.Client methods that communicate with the MobileFirst Server. Don't
	 * forget to specify and implement onSuccess and onFailure callback
	 * functions for WL.Client.connect(), e.g:
	 */
	WL.Client.connect({
		onSuccess : onConnectSuccess,
		onFailure : onConnectFailure
	});

	// tryconnect();
	angular.element(document).ready(function() {
	angular.bootstrap(document, [ 'starter' ]);
	});
}
function onConnectSuccess() {
};
function onConnectFailure() {
};
function tryconnect() {
	var invocationData = {
		adapter : 'TestDatabase',
		procedure : 'procedure1',
		parameters : []
	};
	// document.getElementById("testa").innerHTML="Testing9";
	WL.Client.invokeProcedure(invocationData, {
		onSuccess : loadsFeedsSuccess,
		onFailure : loadFeedsFailure
	});
	// document.getElementById("testa").innerHTML="Testing3";
}

function loadsFeedsSuccess(result) {
	// document.getElementById("testa").innerHTML="success wiki";
}
function loadFeedsFailure(result) {
	// document.getElementById("testa").innerHTML="Failure";
}

function isPushSupported() {
	var isSupported = false;
	if (WL.Client.Push) {
		isSupported = WL.Client.Push.isPushSupported();
	}
	//alert(isSupported);
}

function isPushSubscribed() {
	var isSubscribed = false;
	if (WL.Client.Push) {
		isSubscribed = WL.Client.Push.isSubscribed('myPush');
	}
	//alert(isSubscribed);
}

function doSubscribe() {
	//alert("Trying to sub");
	window.plugins.toast.showLongBottom('Subscribing', function(a) {
		console.log('toast success: ' + a)
	}, function(b) {
		//alert('toast error: ' + b)
	})
	WL.Client.Push.subscribe("myPush", {
		onSuccess : doSubscribeSuccess,
		onFailure : doSubscribeFailure
	});
}

function doSubscribeSuccess() {
	//alert("doSubscribeSuccess");
	window.plugins.toast.showLongBottom('Subscribed Successfuly', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)})
}

function doSubscribeFailure() {
	//alert("doSubscribeFailure");
	window.plugins.toast.showLongBottom('Subscribed Failed', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)})
}

// ------------------------------- Unsubscribe
// ---------------------------------------
function doUnsubscribe() {
	WL.Client.Push.unsubscribe("myPush", {
		onSuccess : doUnsubscribeSuccess,
		onFailure : doUnsubscribeFailure
	});
}

function doUnsubscribeSuccess() {
	//alert("doUnsubscribeSuccess");
	window.plugins.toast.showLongBottom('Unsubscribed Successfuly', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)})
}

function doUnsubscribeFailure() {
	//alert("doUnsubscribeFailure");
	window.plugins.toast.showLongBottom('Unsubscribed Failed', function(a){console.log('toast success: ' + a)}, function(b){alert('toast error: ' + b)})
}

// ------------------------------- Handle received notification
// ---------------------------------------
function pushNotificationReceived(props, payload) {
//	alert("pushNotificationReceived invoked");
//	alert("props :: " + JSON.stringify(props));
//	alert("payload :: " + JSON.stringify(payload));
}