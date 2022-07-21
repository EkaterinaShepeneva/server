const express= require("express")
const router=express.Router();

router.get('/tasks/5', function (req, res, next) {
    console.log('its router, params = ', req.query);
    const answer = `Кажется кто-то хочет вывести ${req.query.page} страницу
    массива, отсортированного ${(req.query.order=='asc')?('по нормальному'):('задом наперёд')} 
    и отфильтрованного по фильтру ${req.query.filterBy?((req.query.filterBy=='done')?('СДЕЛАННЫЕ'):("НЕ_СДЕЛАННЫЕ")):('ВСЕ')}?
    
    
    А больше ты ничего не хочешь ?!`
    res.send(answer)
    next()
})

module.exports = router;