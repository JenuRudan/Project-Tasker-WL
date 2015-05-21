/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/************************************************************************
 * Implementation code for procedure - 'procedure1'
 *
 *
 @return - invocationResult
 */
 
var procedure1Statement = WL.Server.createSQLStatement("select * from members");
function procedure1() {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure1Statement
	});
}

/************************************************************************
 * Implementation code for procedure - 'procedure2'
 *
 *
 * @return - invocationResult
 */
 
function procedure2(param) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure : "storedProcedure2",
		parameters : [param]
	});
}
////////////////////////////////////////////////////////////////////////////////////
function Insert_Member(username,password,email) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure : "Insert_Member",
		parameters : [username,password,email]
	});
}
function Insert_Project(AdminID,ProjectName,ProjectDescription) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure : "Insert_Project",
		parameters : [AdminID,ProjectName,ProjectDescription]
	});
}
function Insert_Task(ProjectID,TaskName,Deadline) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure : "Insert_Task",
		parameters : [ProjectID,TaskName,Deadline]
	});
}
function Remove_Member_Project(Member_Name,ProjectID) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure : "Remove_Member_Project",
		parameters : [Member_Name,ProjectID]
	});
}
function Remove_Member_Task(param) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure : "Remove_Member_Task",
		parameters : [param]
	});
}
function Remove_Project(param) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure : "Remove_Project",
		parameters : [param]
	});
}
function Remove_Project_Task(param) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure : "Remove_Project_Task",
		parameters : [param]
	});
}
function Remove_Task(param) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure : "Remove_Task",
		parameters : [param]
	});
}
function Login(username,password) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure : "Login",
		parameters : [username,password]
	});
}
function GetProjects(userID) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure : "GetProjects",
		parameters : [userID]
	});
}
function GetTasks(ProjectID) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure : "GetTasks",
		parameters : [ProjectID]
	});
}

function GetMembers(ProjectID)
{return WL.Server.invokeSQLStoredProcedure({
	procedure : "GetProjectMembers",
	parameters : [ProjectID]
});
}
function GetTaskMembers(TaskID)
{return WL.Server.invokeSQLStoredProcedure({
	procedure : "GetTaskMembers",
	parameters : [TaskID]
});
}
function Insert_Member_Task(Member_Name,TaskID)
{return WL.Server.invokeSQLStoredProcedure({
	procedure : "Insert_Member_Task",
	parameters : [Member_Name,TaskID]
});
}


function Insert_Member_Project(Member_Name,ProjectID)
{
	return WL.Server.invokeSQLStoredProcedure({
	procedure : "Insert_Member_Project",
	parameters : [Member_Name,ProjectID]
});
}
function GetNotifications()
{
	return WL.Server.invokeSQLStoredProcedure({
	procedure : "GetNotifications",
	parameters : []
});
}

function FinishTask(TaskID)
{
	return WL.Server.invokeSQLStoredProcedure({
	procedure : "SetTaskFinished",
	parameters : [TaskID]
});
}

function GetTaskINFO(TaskID)
{
	return WL.Server.invokeSQLStoredProcedure({
	procedure : "GetTaskINFO",
	parameters : [TaskID]
});
}