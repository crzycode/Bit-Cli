#!/usr/bin/env node

import { Add } from "./src/Add/Add";
import { Create } from "./src/Create/Create";

const CPath = process.cwd();
const args = process.argv.slice(2);
switch (args[0]) {
  case "create":
    var sliced = args.slice(1);
    Create.createProject(sliced);
    break;
  case "add":
    var sliced = args.slice(1);
    Add.AddPackage(sliced);
    break;
  default:
    break;
}
