import { GenerateStructure } from "./tsc/GenerateStructure";

export class Create{
    static createProject = (data:Array<string>) =>{
        switch(data[0]){
            case "tsc":
                var sliced = data.slice(1)
                GenerateStructure.Generate(sliced)
                break;
            default: break;
        }

    }
}

// #!/usr/bin/env node

// import { Add } from "./src/Add/Add";
// import { Create } from "./src/Create/Create";

// const CPath = process.cwd();
// const args = process.argv.slice(2);
// switch (args[0]) {
//   case "create":
//     var sliced = args.slice(1);
//     Create.createProject(sliced);
//     break;
//   case "add":
//     var sliced = args.slice(1);
//     Add.AddPackage(sliced);
//     break;
//   default:
//     break;
// }
