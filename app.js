const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
​
//const OUTPUT_DIR = path.resolve(__dirname, "output")
//const outputPath = path.join(OUTPUT_DIR, "team.html");
const outputPath = path.resolve(__dirname,"output", "team.html");
const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

function appMenue() {

    function createManager() {
        console.log("Please build your team");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your manager's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is your manager's id?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a positive number greater than zero.";
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is your manager's office number?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a positive number greater than zero.";
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            createTeam();
        });
    }

    function createTeam() {

        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "which type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I do not want to add anymore team members"
                ]
            }
        ]).then(userCoice => {
            switch (userCoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        });
    }


    function addEngineer() {
        inquirer.prompt([

            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer's Name?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "Please enter a valid name.";
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is your engineer's id?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        if (idArray.includes(answer)) {
                            return "this ID is already taken. Please enter another one"
                        } else {
                            return true;
                        }
                    }
                    return "Please enter a positive number greater than zero.";
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your engineer's Email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid Email.";
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is your engineer's Github username?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "Please enter a string.";
                }
            },
        ]).then(answers => {

            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            idArray.push(answers.engineerId);
            createTeam();
        });
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your intern's Name?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "Please enter a valid string.";
                }
            },
            {
                type: "input",
                name: "internId",
                message: "What is your intern's id?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/
                    );
                    if (pass) {
                        if (idArray.includes(answer)) {
                            return "this ID is already taken. Please enter another one"
                        } else {
                            return true;
                        }
                    }
                    return "Please enter a positive number greater than zero.";
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your intern's Email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid Email.";
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is your intern's School?",
                validate: answer => {
                    if (answer !== "") {
                        return true
                    }
                    return "Please enter a valid school name.";
                }
            },
        ]).then(answers => {

            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamMembers.push(intern);
            idArray.push(answers.internId);
            createTeam();
        });
    }

    function buildTeam() {
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }

    createManager();
}
appMenue();
​
​
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
​
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
​
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
​
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
​
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
