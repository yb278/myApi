const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json()); //Adding middleware 

const courses = [
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course3'},
];

//GET
app.get('/', (req, res) =>{
    res.send('Hello World');
});
//GET
app.get('/api/courses', (req, res) => {
    res.send(courses);
});
//GET
app.get('/api/courses/:id', (req,res) =>{
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('Course not found');
    res.send(course);
});

//POST
app.post('/api/courses' , (req, res)=>{
    const result = validateCourse(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1, 
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//PUT
app.put('/api/courses/:id' , (req, res)=>{
    //Find course with id, validate id, then update
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('Course not found'); 

    
    const result = validateCourse(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    
    course.name = req.body.name;
    res.send(course);

});

//DELETE
app.delete('/api/courses/:id' , (req, res)=>{
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('Course not found'); 

    const index = courses.indexOf(course);
    courses.splice(index,1);
    
    res.send(course);
});



//Validation Function
function validateCourse(course){
    const schema = Joi.object({name: Joi.string().min(3).required()});
    return schema.validate(course);
};


const port = process.env.PORT || 3030;
app.listen(port, () => console.log(`Listening on port ${port}`));