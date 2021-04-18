const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");



// Write code to use inquirer to gather information about the development team members,
function addManager () {
   inquirer.prompt([
       {
        type:"input",
        name: "managerName",
        message: "What is your manager's name?"
       },
       {
        type: "input",
        name: "managerId",
        message: "What is your manager's employee ID?"
       },
       {
        type: "input",
        name: "managerEmail",           
        message: "What is your manager's email address?",
       },
       {
        type: "input",
        name: "managerNumber",
        message: "What is your manager's number?",
       }
       
   ])
    .then((response)=> { 
        const manager = new Manager(response.managerName, response.managerId, response.managerEmail, response.managerNumber);
        teamMembers.push(manager);
        idArray.push(response.managerId);
        buildTeam();
    });   
}

function buildTeam () {
    inquirer.prompt([
        {
         type:"list",
         name: "memberType",
         message: "Do you want to add an Engineer or Intern?",
         choices: ["Engineer", "Intern", "Done Building Team"],
        }
    ]) .then (response => {
        if (response.memberType === "Engineer") {
            createEngineer();
        } else if (response.memberType === "Intern") {
            createIntern();
        } else {
            console.log("app", teamMembers);
            fs.writeFileSync(OUTPUT_DIR, render(teamMembers), "utf-8");
            };
     }  
)};

function createEngineer () {
    inquirer.prompt([
        {
         type:"input",
         name: "engineerName",
         message: "What is your engineer's name?"
        },
        {
         type: "input",
         name: "engineerId",
         message: "What is your engineer's employee ID?"
        },
        {
         type: "input",
         name: "engineerEmail",           
         message: "What is your engineer's email address?",
        },
        {
         type: "input",
         name: "engineerGithub",
         message: "What is your engineer's github username?",
        }
        
    ])
     .then((response)=> { 
         const engineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.engineerGithub);
         teamMembers.push(engineer);
         idArray.push(response.engineerId);
         buildTeam();
     });   
 };

 function createIntern () {
    inquirer.prompt([
        {
         type:"input",
         name: "internName",
         message: "What is your intern's name?"
        },
        {
         type: "input",
         name: "internId",
         message: "What is your intern's employee ID?"
        },
        {
         type: "input",
         name: "internEmail",           
         message: "What is your intern's email address?",
        },
        {
         type: "input",
         name: "internSchool",
         message: "What school is your intern from?",
        }
        
    ])
     .then((response)=> { 
         const intern = new Intern(response.internName, response.internId, response.internEmail, response.internSchool);
         teamMembers.push(intern);
         idArray.push(response.internId);
         buildTeam();
     });   
 }

// function renderTeam on htmlRenderer.js (required here)

addManager();
// module.exports=app
    

// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
