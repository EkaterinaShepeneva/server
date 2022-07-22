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
    postTask(req.body)
    res.send('Записал')
    next()
  });

const postTask = (task) => {

    const tasks = JSON.parse(fs.readFileSync('data.json', (err)=>{
        if (err) throw 'ERROR';
    }));

    tasks.push(task);
    fs.writeFileSync( 'data.json', JSON.stringify(tasks) );
}

module.exports = router;