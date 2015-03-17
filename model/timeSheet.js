/**
 * Created by a3logics on 10/3/15.
 */
function TimeSheet(Date,ProjectName,Feature,Assigned_By,Effort,Start_Date,End_Date,userId){
    this.Date=Date;
    this.ProjectName=ProjectName;
    this.Feature=Feature;
    this.Assigned_By=Assigned_By;
    this.Effort=Effort;
    this.Start_Date=Start_Date;
    this.End_Date=End_Date;
    this.userId=userId;

}

exports.create_timesheet=function createUser(Date,ProjectName,Feature,Assigned_By,Effort,Start_Date,End_Date,userId){
    console.log(Date+" "+ProjectName);
    return new TimeSheet(Date,ProjectName,Feature,Assigned_By,Effort,Start_Date,End_Date,userId);
}