const express = require('express'),
fs = require('fs'),
url = require('url');
const router=express.Router();

router.get('/tasks/5', function (req, res, next) {
    console.log('its router, params = ', req.query);
    const answer = `Кажется кто-то хочет вывести ${req.query.page} страницу
    массива, отсортированного ${(req.query.order=='asc')?('по нормальному'):('задом наперёд')} 
    и отфильтрованного по фильтру ${req.query.filterBy?((req.query.filterBy=='done')?('СДЕЛАННЫЕ'):("НЕ_СДЕЛАННЫЕ")):('ВСЕ')}?
    
    
    А больше ты ничего не хочешь ?!`
    
    //
    //res.sendFile(__dirname + '/tasks.json') ;
    res.send(answer)
    next()
})


router.post('/tasks/5', function (req, res, next) {
    writeTask(req.body)
    res.send('Записал')
    next()
  });

const writeTask = (newTask) => {




// читаем файл
    //const text = fs.readFileSync('data.json', 'utf8');

    const data = [{
        id: 1,
        text: 'text'
    }, {
        id: 2,
        text: 't2'
    }];
    
    // создаём файл
    fs.writeFileSync('data.json', JSON.stringify(data));

    // берём старые данные
const dbData = JSON.parse(fs.readFileSync('data.json', (err, data) => (data)))

// сливает данные
fs.writeFileSync('data.json', JSON.stringify([...dbData, newTask]));



    // const filePath = __dirname + 'text.json';

    // let arrayTask = JSON.parse(fs.readFileSync(filePath, (err, data) => (data) ))

    // //console.log(arrayTask);
    // fs.writeFileSync(filePath, JSON.stringify([ ...arrayTask, ...newTask]))
}

module.exports = router;