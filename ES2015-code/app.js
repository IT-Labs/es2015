// Promise example

const checkDocuments = (documents) => {
    return new Promise((resolve, reject) => {
        if (!documents) {
            reject(new Error('There is problem with the documents'))
        }
        if (documents.length === 0) {
            reject(new Error('There are no documents'))
        }

        resolve(documents);
    })
}

const showDocuments = (documents) => {
    documents.forEach(document => {
        console.log(`${document.name}.${document.type} (${document.size}mb)`)
    })
}

(function getDocuments() {
    fetch("https://raw.githubusercontent.com/ivokostovski/es2015/master/no-documents.json")
        .then(res => res.json())
        .then(data => checkDocuments(data))
        .then(data => showDocuments(data))
        .catch(error => console.error(`ERROR: ${error}`))
        .finally(() => console.log(`Everything is done at ${new Date()}`))
})();


// Async Await example

(async function getDocuments() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/ivokostovski/es2015/master/no-documents.json")
        const parsedData = await response.json();
        const checkedDocuments = await checkDocuments(parsedData);
        showDocuments(checkedDocuments);
    } catch (error) {
        console.error(`ERROR: ${error}`)
    }
    console.log(`Everything is done at ${new Date()}`)
})()

// Asynchronous Iteration

const promises = [
    new Promise(resolve => resolve(1)),
    new Promise(resolve => resolve(2)),
    new Promise(resolve => resolve(3)),
];

(() => {
    for (const promise of promises) {
        console.log(promise);
    }
})();

(async () => {
    for await (const promise of promises) {
        console.log(promise);
    }
})()

// flat()

let arr = [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, 12]]]];

console.log(
    arr.flat(),
    arr.flat().flat(),
    arr.flat().flat().flat(),
    arr.flat(3),
    arr.flat(Infinity),
)


// fLatMap()

let arr2 = [1, 2, 3, 4, 5, 6];

console.log(
    arr2.flatMap(x => [x, x * 2]),
    arr2.reduce((acc, x) => acc.concat([x, x * 2]), [])
);

// Object.fromEntries()

const entries = new Map([
    ['foo', 'bar'],
    ['baz', 42]
]);

const obj = Object.fromEntries(entries);

console.log(obj)

// Nullish coalescing operator

const basicValue = 'test';
const nullishValue = null;

const firstExample = basicValue ?? 'example';
const secondExample = nullishValue ?? 'example';

console.log(firstExample);
console.log(secondExample);

// Optional chaining operator

const object = {
    prop: {
        subProp: {
            value: 1
        }
    }
}

console.log(
    object.prop.subProp.value,
    object?.prop?.secondProp?.value,
)

// globalThis

const getGlobal = () => {
    if (typeof self !== "undefined") {
        return self;
    }
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof global !== "undefined") {
        return global;
    }
    throw new Error("Couldn't detect global");
};

class Dog {
    constructor(name, color) {
        this.name = name;
        this.color = color;

        console.log('THIS:', this)
        console.log('getGlobal:', getGlobal())
        console.log('globalThis:', globalThis)
    }
}

const bleki = new Dog('bleki', 'black');
