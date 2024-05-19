import fs from 'fs'
export const FolderGenerate = async(name:string) =>{
  return new Promise((resolve,reject) =>{
    var Root = `${name}/src`;

    var Debugger = `${name}/.vscode`;
    var Folder: any[] = [
        "Config",
        "Models",
        "Common",
        "Modules",
        "Routes",
      ];
      if (!fs.existsSync(Root)) {
        fs.mkdir(Root, () => {});
      }
      if (!fs.existsSync(Debugger)) {
         fs.mkdir(Debugger, () => {});
       }
      for (let i =0; i < Folder.length; i++) {
        if (!fs.existsSync(`${Root}/${Folder[i]}`)) {
          if(Folder[i] == "Modules"){
            fs.mkdir(`${Root}/${Folder[i]}`, (err) => {
              if (err) {
                console.log(err?.message);
                reject("failed")
              }else{
                console.log("Folder Created SuccessFully");
              }
            });

            fs.mkdir(`${Root}/${Folder[i]}/HomeModule`, (err) => {
              if (err) {
                console.log(err?.message);
                reject("failed")
              }else{
                console.log("Folder Created SuccessFully");
              }
            });
            fs.mkdir(`${Root}/${Folder[i]}/HomeModule/Controllers`, (err) => {
              if (err) {
                console.log(err?.message);
                reject("failed")
              }else{
                console.log("Folder Created SuccessFully");
              }
            });fs.mkdir(`${Root}/${Folder[i]}/HomeModule/Services`, (err) => {
              if (err) {
                console.log(err?.message);
                reject("failed")
              }else{
                console.log("Folder Created SuccessFully");
              }
            });

          }else{
            fs.mkdir(`${Root}/${Folder[i]}`, (err) => {
              if (err) {
                console.log(err?.message);
                reject("failed")
              }else{
                console.log("Folder Created SuccessFully");
              }
            });
          }
        
        }
        if(i == Folder.length-1){
          resolve("Done")
        }
      }
  })

}
