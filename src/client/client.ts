
//@ts-ignore
import { io } from "https://cdn.socket.io/4.3.0/socket.io.esm.min.js";

import GremlinClient from "./application/gremlinclient.js";


//(3/10/22) the party bouncer has to get the user's name (or be told the user is anonymous)
const inpForm: HTMLFormElement = <HTMLFormElement>document.getElementById('name-form');
const inpFormVal: HTMLInputElement = <HTMLInputElement>document.getElementById('textbox');
const anonButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById('anon-button');

function submitGremlinName(e: SubmitEvent) {
    e.preventDefault();
    console.log(inpFormVal.value);
}

function goAnon(e: MouseEvent) {
    e.preventDefault();
    console.log('anon');
}

inpForm.onsubmit = submitGremlinName;
anonButton.onclick = goAnon;

//end of party bouncer code, GremlinClient takes control from here

const gc: GremlinClient = new GremlinClient();
gc.start();