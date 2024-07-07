#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import {differenceInSeconds} from "date-fns";

console.log(chalk.bold.magenta("\n\t Countdown Timer by Sara Atif\n"));
console.log("=".repeat(60));

let res =await inquirer.prompt({
    name:"userinput",
    type:"number",
    message: "Please Enter the amount of second: ",
    validate:(input)=>{
        if (isNaN(input)){
            return "Please Enter valid number."
        }else if(input > 60){
            return "Second must be in 60."
        }else{
            return true
        }
    }
});
let input = res.userinput;

function startTime (num: number){
    const iniTime = new Date().setSeconds(new Date().getSeconds() +num)
    const intervalTime = new Date(iniTime)
    setInterval(()=>{
        const currentTime = new Date()
        const timeDiff = differenceInSeconds(intervalTime,currentTime);
        if (timeDiff <= 0){
            console.log(chalk.red.italic("Timer has Expired."))
            process.exit()
        }
        const min = Math.floor((timeDiff % (3600 *24)) / 3600)
        const sec = Math.floor(timeDiff % 60)
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`)
    }, 1000);
}

startTime(input);