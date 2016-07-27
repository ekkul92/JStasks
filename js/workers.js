'use strict';

class Worker {

    constructor (id, name) {

        this.id = id;
        this.name = name;


    }

    salary () {

        return 0;

    }
}

class HourlyPay extends Worker {
    constructor (id, name, hours) {

        super(id, name);
        this.hours = hours;

    }
    salary () {

        return 20.8 * 8 * this.hours;

    }
}

class FixedPayment extends Worker {
    constructor (id, name, money) {

        super(id, name);
        this.money = money;

    }
    salary () {

        return this.money;

    }
}

let obj1 = new HourlyPay(1, "Kate", 5);
let obj2 = new HourlyPay(2, "Serg", 3);
let obj3 = new FixedPayment(3, "Masha", 5000);
let obj4 = new FixedPayment(4, "Sasha", 8000);
let obj5 = new FixedPayment(5, "Pasha", 8000);
let obj6 = new FixedPayment(6, "Dasha", 4000);

let map = new Map();

map.set('Worker', [obj1, obj2, obj3, obj4, obj5, obj6]);

let arr = map.get("Worker");

arr.sort((a, b) => {

    if (a.salary() - b.salary() === 0) {

        if (a.name > b.name) {

            return 1;

        }

        return -1;

    }

    return b.salary() - a.salary();

});

console.log('Пункт а: все работники');
let workers = [];

for (let i = 0; i < arr.length; i += 1) {

    console.log(`${arr[i].id} ${arr[i].name} ${arr[i].salary()}`);
    workers[i] = {

        "id": arr[i].id,
        "name": arr[i].name,
        "salary": arr[i].salary().toFixed(2)

    };

}

console.log('Пункт б: 5 работников');
for (let i = 0; i < Math.min(arr.length, 5); i += 1) {

    console.log(`${arr[i].id} ${arr[i].name} ${arr[i].salary()}`);

}

console.log('Пункт в: последние 3 идентификатора работников');
for (let i = 0; i < Math.min(arr.length, 3); i += 1) {

    console.log(arr[arr.length - 1 - i].id);

}

export default {workers};
