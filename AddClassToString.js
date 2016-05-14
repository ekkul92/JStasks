function addClass(obj, cls){
    var arr = obj.className ? obj.className.split(" ") : [] ;
    for (var i = 0 ; i < arr.length; i++) {
        if (arr[i] == cls) return;
    }
        arr.push(cls);
        obj.className = arr.join(" ") ;
}

var obj = {
    className: 'open menu'
}

//addClass(obj, 'new');
addClass(obj, 'open');
//addClass(obj, 'me');

alert( obj.className );