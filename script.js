export const wasmInstantiate
    = async (wasmModuleUrl, importObject) => {
    let response = undefined;
    if (!importObject) {
        importObject = {
            env: {
                abort: () => console.log("Error!")
            }
        };
    }
    const instantiateModule = async () => {
        const response = await fetch("./factorial.wasm");
        const buffer = await response.arrayBuffer();

        return await WebAssembly.instantiate(buffer, importObject);
    };
    response = await instantiateModule();
    //3.
    return response;
};

const executeWasmFactorial = async () => {
    const wasmModule = await wasmInstantiate("./factorial.wasm");
    const factorialResult = wasmModule.instance.exports.factorial(7);
    document.getElementById("factorialResultId").innerHTML = `The result is: <strong>${factorialResult}</strong>`;
};

executeWasmFactorial()