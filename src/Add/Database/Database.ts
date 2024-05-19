import { program } from "commander"
import inquirer from "inquirer";

export const SelectDatabase = async() =>{
    const availableTypes = ['Mongodb', 'Mssql', 'PgSql','Mysql'];


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
          
          PaymentGateway(type)
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
}