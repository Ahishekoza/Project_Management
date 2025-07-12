import { dbConnect } from "@/lib/mongoose";
import { ProjectSchema } from "@/models/Project";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  try {
   const {projectName,projectType,clientId,designerId,workers,dateRange} =  await req.json()

  const isProjectPresent =  await ProjectSchema.findOne({projectName})
  
  if(isProjectPresent){
    return NextResponse.json({
        success:false,
        message:`Project is already registered with name ${projectName}`
    },{
        status:404
    })
  }

  const newProject = new ProjectSchema({
    projectName,
    projectType,
    clientId,
    designerId,
    workers,
    dateRange
  })

  if(!newProject){
    return NextResponse.json({
        success:false,
        message:"Fail to create new project."
    },{
        status:404,
    })
  }

  return NextResponse.json({
    success:true,
    message:"Project created successfully and Email sent to client successfully"
  })

  } catch (error) { 
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server error" || error.message,
      },
      {
        status: 500,
      }
    );
  }
}
