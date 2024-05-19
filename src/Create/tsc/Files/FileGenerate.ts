import fs from 'fs'
export const Filegenerate = async(name:string) =>{
  var AppContent = `
    import express from 'express'
    import RootRouter from './src/RootRouter'
    const app = express()
    app.use(express.json())
    const PORT = 3001
    app.use('/',RootRouter)
    app.listen(PORT,() =>{
        console.log("Listing on "+ ' ' +PORT)

    })`
    var RootRouter = `
    import express from 'express'
    import HomeRouter from './Routes/Home.route'
    const RootRouter = express.Router()
    
    RootRouter.use('/',HomeRouter)
    export default RootRouter
    `
var Router = `
import express from 'express'
import { HomeController } from '../Modules/HomeModule/Controllers/HomeController'

const HomeRouter = express.Router()
HomeRouter.get("/",HomeController.Home)
export default HomeRouter
`
var HomeController = `
import { Request, Response } from "express";

export class HomeController{
    static Home = async(req:Request,res:Response) =>{
      res.send("Hello Shupple")
    }
}
`
    await fs.writeFile(`${name}/app.ts`,AppContent,(err) =>{
        if(err){
            console.log(err.message)
        }else{
            console.log("Success")
       
        }
    })
    await fs.writeFile(`${name}/src/RootRouter.ts`,RootRouter,(err) =>{
        if(err){
            console.log(err.message)
        }else{
            console.log("Success")
          
        }
    })
    await fs.writeFile(`${name}/src/Routes/Home.route.ts`,Router,(err) =>{
        if(err){
            console.log(err.message)
        }else{
            console.log("Success")
           
        }
    })

    await fs.writeFile(`${name}/src/Modules/HomeModule/Controllers/HomeController.ts`,HomeController,(err) =>{
        if(err){
            console.log(err.message)
        }else{
            console.log("Success")
            return "Success"
           
        }
    })
}