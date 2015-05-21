/*
*  Licensed Materials - Property of IBM
*  5725-G92 (C) Copyright IBM Corp. 2006, 2013. All Rights Reserved.
*  US Government Users Restricted Rights - Use, duplication or
*  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
*/

WL.Server.createEventSource({
	name: 'PushEventSource',
	onDeviceSubscribe: 'deviceSubscribeFunc',
	onDeviceUnsubscribe: 'deviceUnsubscribeFunc',
	securityTest:'PushApplication-strong-mobile-securityTest',
	poll: {
		interval: 5,
		onPoll : 'GetNotifications'
	}
});



function GetNotifications()
{


	var invocationData = {
	        adapter : 'TestDatabase',
	        procedure : 'GetNotifications',
	        parameters : []
	    };
	
	var notifications = WL.Server.invokeProcedure({
        adapter : 'TestDatabase',
        procedure : 'GetNotifications',
        parameters : []
    });
	for(var i=0; i<notifications.resultSet.length;i++)
	{submitNotification(notifications.resultSet[i].UserName, notifications.resultSet[i].TaskName+' Deadline due is tomorrrow !');}

}

function deviceSubscribeFunc(userSubscription, deviceSubscription){
	WL.Logger.debug(">> deviceSubscribeFunc");
	WL.Logger.debug(userSubscription);
	WL.Logger.debug(deviceSubscription);
}

function deviceUnsubscribeFunc(userSubscription, deviceSubscription){
	WL.Logger.debug(">> deviceUnsubscribeFunc");
	WL.Logger.debug(userSubscription);
	WL.Logger.debug(deviceSubscription);
}

function submitNotification(userId, notificationText){
	//Logger.WL.warn(userId+ notificationText);
	var userSubscription = WL.Server.getUserNotificationSubscription('PushAdapter.PushEventSource', userId);
	
	if (userSubscription==null){
		return { result: "No subscription found for user :: " + userId };
	}

	var badgeDigit = 1;
	
	var notification = WL.Server.createDefaultNotification(notificationText, badgeDigit, {custom:"data"});
	
	WL.Logger.debug("submitNotification >> userId :: " + userId + ", text :: " + notificationText);
	
	WL.Server.notifyAllDevices(userSubscription, notification);
	
	return { 
		result: "Notification sent to user :: " + userId 
	};
}

