
import GremlinClient from "./application/gremlinclient.js";


const gc: GremlinClient = new GremlinClient();
gc.start();

//(3/10/22) the party bouncer has to get the user's name (or be told the user is anonymous)
const partyBouncer: HTMLDivElement = <HTMLDivElement>document.getElementById('partybouncer');
const inpForm: HTMLFormElement = <HTMLFormElement>document.getElementById('name-form');
const inpFormVal: HTMLInputElement = <HTMLInputElement>document.getElementById('textbox');
const anonButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('anon-button');

function submitGremlinName(e: SubmitEvent) {
    e.preventDefault();
    gc.receiveIDFromUser(inpFormVal.value)
    createGremlinCanvasHTML();
}

function goAnon(e: MouseEvent) {
    e.preventDefault();
    gc.receiveIDFromUser('anon');
    createGremlinCanvasHTML();
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
