import { exec } from "child_process";
import fs from "fs";


var count = 0;
var Name = ''
export const PackageInstaller = (name: string) => {
  Name = name
  count = 0
  return new Promise((resolve,reject) =>{
    try{
      PackageInstall(name).then(res =>{
        Tsconfig(name).then(res =>{
          resolve(res)
        }).catch(err =>{
          reject(err.message)
        })
      }).catch(err =>{
        console.log(err)
      })
   
    }catch(err){
      console.error("Error updating package.json:", err);
      reject("rejected")
    }
  })
};
const PackageInstall = async(name:string) =>{
    var command:any = ['--save express','@types/express','typescript', '@types/node','ts-node','nodemon'];
for await(let i of command){
  if(count != command.length-1){
   await installer(name,i).then(res =>{
      count++
    }).catch(err =>{
      count++
    })
  }else{
   return await installer(name,i).then(res =>{
    console.log('Packages installed Successfully !')
      return'Packages installed Successfully !'
    })
   
  }
}
   

}
const installer = (name:string,Command:string) =>{
  return new Promise((resolve,rejects) =>{
    exec(`cd ${name} && npm i ${Command}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        rejects(error.message)
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        rejects(stderr)
    }
    console.log("Package Intall Successfully:"+Command,stdout);
    resolve("done")
    })
  })
}
const Tsconfig = (name:string) =>{
  var UpdateFile: any;
  var Value: any[] = [
    `// "outDir": "./"`,
    `// "rootDir": "./"`,
    `// "experimentalDecorators": true`,
    `// "emitDecoratorMetadata": true`,
    `// "moduleResolution": "node10"`,
    `// "resolveJsonModule": true`,
    `// "sourceMap": true`,
  ];
  var Replace: any[] = [
    `"outDir": "./bin"`,
    `"rootDir": "./"`,
    `"experimentalDecorators": true`,
    `"emitDecoratorMetadata": true`,
    `"moduleResolution": "node10"`,
    `"resolveJsonModule": true`,
    `"sourceMap": true`
  ];
  return new Promise((resolve,rejects) =>{
    try{
      exec(`cd ${name} && tsc --init`, (err, out, stde) => {
        if (err) {
          console.error(`Error: ${err.message}`);
          rejects(err.message)
        }
        if (stde) {
          console.error(`stderr: ${stde}`);
          rejects(stde)
        }
        console.log(`stdout: ${out}`);
        UpdateFile = fs.readFileSync(`${name}/tsconfig.json`, "utf8");
        for (let i = 0; i < Value.length; i++) {
          let regex = new RegExp(Value[i], "g");
          UpdateFile = UpdateFile.replace(regex, Replace[i]);
        }
        fs.writeFileSync(`${name}/tsconfig.json`, UpdateFile, "utf8");
        resolve("tsconfig Generated Successfully !")
      });
    }catch(err){
      rejects(err)
    }

  })

}
