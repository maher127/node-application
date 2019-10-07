var fs = require('fs');

function help() {
    console.log('node main.js --help \t\t\t\t\t for help')
    console.log('node main.js list \t\t\t\t\t to show the list of todos')
    console.log('node main.js add --title your_title --body your_body \t to add a todo note')
    console.log('node main.js read --title your_title \t\t\t to read a todo note')
    console.log('node main.js remove --title your_title \t\t\t to remove a todo note')
}

function list() {
    let fd = fs.readFileSync('todos.json').toString() // convert to string
    let todos = JSON.parse(fd) //data recieved become a JavaScript Object {'exemple'}
    console.log('printing', todos.length, 'notes')

    for (const todo of todos) {
        console.log('- Title:', todo.Title, '\t- Body:', todo.Body)
    }
}

function add() {
    let newtodo ={} // {Title: 'Eat', Body: 'Spagettti'}

    let indexTitle = process.argv.findIndex(el => el === '--title') // bech yverifi ken user kteb '--title' fel blasa el lezma, eli hiya win process.argv[3]... findIndex: ki tabda lement eli tlawej 3lih mawjoud yrajja3lek LINDEX mte3ou, w ken mech mawjoud yraja3lek '-1'
    if (indexTitle === -1 || typeof process.argv[indexTitle + 1] === 'undefined'){ // node app.js add --title Eat
        console.log('Missing required argument: --title')
        return
    }
    else newtodo['Title'] = process.argv[indexTitle + 1]

    let indexBody = process.argv.findIndex(el => el === '--body')
    if (indexBody === -1 || typeof process.argv[indexBody + 1] === 'undefined'){ // node app.js add --title Eat --body Spagettti
        console.log('Missing required argument: --body')
        return
    }
    else newtodo['Body'] = process.argv[indexBody + 1]

    let todos = JSON.parse(fs.readFileSync('todos.json').toString()) // Type Buffer => String // {Title: "Hamza"} => [{"Title": "Hamza"}]

    fs.writeFileSync('todos.json', JSON.stringify(todos.concat([newtodo]))) // [{"Title": "Hamza"}] => {Title: "Hamza"}
}

function read() {
    let title = ''

    let indexTitle = process.argv.findIndex(el => el === '--title')
    if (indexTitle === -1 || typeof process.argv[indexTitle + 1] === 'undefined'){
        console.log('Missing required argument: --title')
        return
    }
    else title = process.argv[indexTitle + 1]

    let todos = JSON.parse(fs.readFileSync('todos.json').toString())
    let todo = todos.find(x => x.Title === title)
    if (todo) console.log('- Title:', todo.Title, '\t- Body:', todo.Body)
    else console.log('Todo not found')
}

function remove() {
    let title=''

    let indexTitle = process.argv.findIndex(el => el === '--title') // node app.js remove --title Hamza
    if (indexTitle === -1 || typeof process.argv[indexTitle + 1] === 'undefined'){
        console.log('Missing required argument: --title')
        return
    }
    else title = process.argv[indexTitle + 1]
    let todos = JSON.parse(fs.readFileSync('todos.json').toString())
    let todo = todos.find(el => el.Title === title) //  => Objet
    todos.splice(todos.indexOf(todos.find(x => x.Title === title)), 1);

    fs.writeFileSync('todos.json', JSON.stringify(todos))
    console.log('Todo: - Title:', todo.Title, ', - Body:', todo.Body, 'removed successfully')
}

switch (process.argv[2]) {
    case '--help': help(); break;
    case 'list': list(); break;
    case 'add': add(); break;
    case 'read': read(); break;
    case 'remove': remove(); break;
    default: help(); break;
}
 
if (process.argv.length < 3) help();