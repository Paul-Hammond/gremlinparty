import GremlinClient from './application/gremlinclient.js';
const gc = new GremlinClient();
gc.start();
//(3/10/22) the party bouncer has to get the user's name (or be told the user is anonymous)
const partyBouncer = document.getElementById('partybouncer');
const inpForm = document.getElementById('name-form');
const inpFormVal = document.getElementById('textbox');
const anonButton = document.getElementById('anon-button');
function submitGremlinName(e) {
    e.preventDefault();
    createGremlinCanvasHTML();
    gc.receiveIDFromUser(inpFormVal.value);
}
function goAnon(e) {
    e.preventDefault();
    createGremlinCanvasHTML();
    gc.receiveIDFromUser('anon');
}
function createGremlinCanvasHTML() {
    partyBouncer.remove();
    const canvas = document.createElement('canvas');
    canvas.id = 'gremlin-canvas';
    canvas.width = 1366;
    canvas.height = 768;
    document.body.append(canvas);
}
inpForm.onsubmit = submitGremlinName;
anonButton.onclick = goAnon;
//end of party bouncer code, GremlinClient takes control from here
