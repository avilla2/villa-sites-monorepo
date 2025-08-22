// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'Name of the website in kebab case (my-website-example)'
  },
  {
    type: 'input',
    name: 'fullName',
    message: 'Full Business name of website (My Website Example)'
  },
  {
    type: 'input',
    name: 'shortName',
    message: 'Short Business name (MWE)'
  }
]
