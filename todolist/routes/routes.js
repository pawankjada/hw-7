const todoList = [];

module.exports = function(app){

    app.get('/api/data', function(req, res) {
        return res.send(todoList);
    });

    app.post('/api/data', function(req, res) {
        todoList.push(req.body.item);
        return res.send(true);
    });

    app.delete('/api/data', function (req, res) {
        todoList.splice(todoList.findIndex(i => i.label === req.body.label),1);
        return res.send(true);
    });

    app.put('/api/data', function (req, res) {
        todoList[todoList.findIndex(i => i.label === req.body.label)].checked = req.body.checked;
        return res.send(true);
    });
};