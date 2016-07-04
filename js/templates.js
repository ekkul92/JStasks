
module.exports = {
    applist: "<% for(var i = 0; i < items.length; i++) { %>\
                <div class='app'>\
                        <div class='app-title'>Заявка<%-(i+1)%></div>\
                        <div class='app-info'>\
                        Клиент: <%-items[i].client%><br/>\
                    Исполнитель: <%-items[i].contractor%><br/>\
                    Информация: <%-items[i].info%><br/>\
                    Приоритет: <%-items[i].priority%><br/>\
                    Ожидаемое время исполнения: <%-items[i].estimated%><br/>\
                    Крайние сроки: <%-items[i].deadline%><br/>\
                    Готовность: <%-items[i].ready%><br/>\
                    <button class='edit_status'>Редактировать статус заявки</button>\
                    </div>\
                    </div>\
                <% } %>"
};

