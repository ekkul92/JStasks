function ucFirst(str){
    if (!str) return str;

    var t = str[0].toUpperCase();
    return t + str.slice(1);
}