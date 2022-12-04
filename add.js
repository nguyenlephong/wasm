let add;
const loadWebAssembly = fileName => fetch(fileName)
    .then(response => response.arrayBuffer())
    .then(bits => WebAssembly.compile(bits))
    .then(module => {
        return new WebAssembly.Instance(module)
    });

loadWebAssembly("add.wasm")
    .then(instance => {
        add = instance.exports.add;
        console.log('Ready!');
    });

document.getElementById("addBtn").addEventListener("click", () => {
    let numA = document.getElementById("numA").value;
    let numB = document.getElementById("numB").value;
    document.getElementById("result").innerText = add(numA, numB);
});