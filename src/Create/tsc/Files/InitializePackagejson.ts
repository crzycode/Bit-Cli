import { exec } from "child_process";
import fs from 'fs'
export const InitializePackageJson = async(name:string) =>{
    try{
        return new Promise((resolve, reject) => {
            exec(`cd ${name} && npm init -y`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error: ${error.message}`);
                    reject(error.message)
                }
                if (stderr) {
                    console.error(`stderr: ${stderr}`);
                    reject(stderr)
                }
                console.log(`stdout: ${stdout}`);
                var data = fs.readFileSync(`${name}/package.json`,'utf8')
                var pack = JSON.parse(data);
                pack.scripts.dev = "nodemon ./app.ts"
                pack.scripts.build ="tsc"
                pack.scripts.start = "node app.js"
                pack.main = "app.js"
                const updatedJson = JSON.stringify(pack, null, 2);
                fs.writeFileSync(`${name}/package.json`, updatedJson, 'utf8');
                console.log('Package.json updated successfully.');
                resolve("Package.json updated successfully.');")
            });
          });
       
    }catch(err){
        console.error('Error updating package.json:', err);
    }
  

}
export const InitializeDebugger = async(name:string) =>{
        return new Promise((resolve,reject) =>{
            try{
                console.log("Debugger initilizing")
                var value = {
                    "version": "0.2.0",
                    "configurations": [
                        {
                            "type": "node",
                            "request": "launch",
                            "name": "Build Project",
                            "program": "${workspaceFolder}\\app.ts",
                            "preLaunchTask": "npm: build",
                            "sourceMaps": true,
                            "smartStep": true,
                            "internalConsoleOptions": "openOnSessionStart",
                            "outFiles": [
                                "${workspaceFolder}/bin/**/*.js"
                            ]
                        }
                    ]
                
                }
                const updatedJson = JSON.stringify(value, null, 2);
               fs.writeFile(`${name}/.vscode/launch.json`, updatedJson,(err) =>{
                if (err) {
                    console.error('Error creating file:', err);
                    reject(err)
                  }
                  console.log("Debugger Installed SuccessFully")
                  resolve("Debugger Installed SuccessFully")
                  
               });
            }catch(err){
                console.log(err)
                reject(err)
            }
      
        })

  
}