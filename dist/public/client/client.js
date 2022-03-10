import GremlinClient from "./application/gremlinclient.js";
const inpForm = document.getElementById('name-form');
const inpFormVal = document.getElementById('textbox');
const anonButton = document.getElementById('anon-button');
function handleSubmit(e) {
    e.preventDefault();
    console.log(inpFormVal.value);
}
function goAnon(e) {
    e.preventDefault();
    console.log('anon');
}
inpForm.onsubmit = handleSubmit;
anonButton.onclick = goAnon;
const gc = new GremlinClient();
gc.start();
