import fs from "fs";
import { InitializeDebugger, InitializePackageJson } from "./Files/InitializePackagejson";
import { PackageInstaller } from "./Files/PackageInstaller";
import { FolderGenerate } from "./Folders/FolderGenerate";
import { Filegenerate } from "./Files/FileGenerate";
export class GenerateStructure {
  static Generate = async (data: any) => {
    if(!fs.existsSync(data[0])){
     
      fs.mkdir(data[0],(err) =>{
        if(err){
          console.log("Project not able to create ")
        }else{
          console.log("Project is creating")
           InitializePackageJson(data[0]).then(res =>{
            FolderGenerate(data[0]).then(res =>{
              PackageInstaller(data[0]).then(res =>{
                InitializeDebugger(data[0]).then(res =>{
                  Filegenerate(data[0]).then(res =>{
                    
                  })
                }).catch(err =>{
                  console.log(err)
                })
              }).catch(err =>{
                console.log(err)
              })
            }).catch(err =>{
              console.log(err)
            })
         }).catch(err =>{
          console.log(err)
         })
        }
      })
    }
  
   
  };
}


