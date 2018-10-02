$(function () {

    const state = {
        todoList: [],
        baseUrl: 'https://devin-todolist.herokuapp.com'
    };

    const render = function () {

        $.ajax({
            url: state.baseUrl + '/api/data',
            type: 'GET',
            success: function (data) {
                state.todoList = data;

                $('#list').empty();

                state.todoList.forEach((li, i) =>
                    $('#list').append(
                        $('<li>').attr('id', 'item' + i).append([
                            //Adding the label to the id, so that upon click the item,to be checked, can be identified
                            $('<input>').attr({ type: 'checkbox', id: i + li.label, class: 'check', checked: (li.checked === 'true') }),
                            $('<label>').attr({ for: 'li' + i, class: 'lbl' }).append(li.label),
                            //Adding the label to the id, so that upon click the item,to be deleted, can be identified
                            $('<button>').attr({ id: li.label + i, class: 'delete' }).append(
                                $('<i>').attr('class', 'fas fa-times')
                            )
                        ])
                    )
                );
            }
        });
    };


    $('#addbutton').on('click', function () {

        const newItem = {
            label: $('#input').val().trim(),
            checked: false
        };

        $.ajax({
            url: state.baseUrl + '/api/data',
            type: 'POST',
            data: { item: newItem },
            success: function (done) {
                if (done)
                    render();
            }
        });
    });


    $('#list').on('click', '.delete', function () {
        //Extracting label from the id
        let lbl = $(this).attr('id');
        lbl = lbl.slice(0, lbl.length - 1);

        $.ajax({
            url: state.baseUrl + '/api/data',
            type: 'DELETE',
            data: { label: lbl },
            success: function (done) {
                if (done)
                    render();
            }
        });
    });


    $('#list').on('click', '.check', function () {
        //Extracting label from the id
        let lbl = $(this).attr('id');
        lbl = lbl.slice(1, lbl.length);

        $.ajax({
            url: state.baseUrl + '/api/data',
            type: 'PUT',
            data: { label: lbl, checked: $(this).is(':checked') },
            success: function (done) {
                if (done)
                    render();
            }
        });
    });

});