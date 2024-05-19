import { program } from "commander"
import inquirer from "inquirer";
import fs from 'fs'
import { exec } from "child_process";

export const SelectPayment = async() =>{
    const availableTypes = ['Razorpay', 'Paypal', 'Phonepay'];
    program
  .option('-t, --type <type>', 'Specify the type')
  .option('-v, --verbose', 'Enable verbose mode')
  .parse(process.argv);
  const options = program.opts();
  if (options.verbose) console.log(options);
  if (!options.type) {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'type',
          message: 'Choose the type:',
          choices: availableTypes,
          when: !options.type,          
        }
      ])
      .then(answers => {
        const type = options.type || answers.type;  
        if (type) {
          InitializeShupple().then(res =>{
            console.log(res)
            PaymentGateway(type).then(data =>{
              console.log(data)
            }).catch(errr =>{
              console.log(errr)
            })
          }).catch(err =>{
            console.log(err)
           
          })
         
        } else {
          console.error('Error: Payment type required.');
        }
      });
  } else {
    console.log(`Type: ${options.type}`);
  }
}
const PaymentGateway = async(type:any) =>{
    console.log(`Type: ${type}`);
   var Ispayment:Boolean = false
   var IsAddshupple:Boolean = false
    fs.readFile('./app.ts', 'utf8', (error, data) => {
      var lines = data.split('\n')

      for(let i =0; i < lines.length; i++){
        console.log( lines[i].includes("import"))
        if(Ispayment == false){
        if(lines[i].length > 4){
          if((lines[i].includes("import")) == false){
            console.log(lines[i])
            lines[i-1] += "\nimport { Shupple } from '@bitbeast/shupplelibrary'"
            Ispayment = true
          }
        }
        if(IsAddshupple == false){
          if(lines[i].includes("express()")){
            lines[i] += `\nShupple.SetShupplePayment({"Id":"YOUR_KEY_ID","Api":"API_KEY","IsLive":true,"Key":"SECRETE_KEY","Type":"${type}"})`
            IsAddshupple = true
          }
        }
        }
      }
      const modifiedContent =  lines.join('\n');

   
      setTimeout(() => {
        fs.writeFile('./app.ts',modifiedContent , (error) => {
          if (error) {
              console.error('Error writing file:', error);
          } else {
              console.log('app.ts Updated Successfully', 'in file:', 'app.ts');
          }
      });
      }, 2000);
 
      console.log(modifiedContent)
    })
    
}
const InitializeShupple = async() =>{
  return new Promise((resolve,rejects) =>{
    try{
      exec(`npm i @bitbeast/shupplelibrary`, (err, out, stde) => {
        if (err) {
          console.error(`Error: ${err.message}`);
          rejects(err.message)
        }
        if (stde) {
          console.error(`stderr: ${stde}`);
          rejects(stde)
        }
        console.log(`stdout: ${out}`);
        resolve("Shupple Installed Successfully !")
      });
    }catch(err){
      rejects(err)
    }

  })
}