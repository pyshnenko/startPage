let globeExport: any;
let setStateG: (val: string)=>void;
let setGrowInG: (val: boolean)=>void;
let growInG: boolean;
let stateG: string;
let delayG: number;

export function setParams(setState: (val: string)=>void, state: string, delay: number, growIn: boolean, setGrowIn: (val: boolean)=>void) {
    setStateG = setState;
    delayG = delay;
    setGrowInG = setGrowIn;
    growInG = growIn;
    stateG = state;
    return stateSettings;
}

export function stateSettings(val: string) {
    setGrowInG(false);
    if (delayG) setTimeout(stateExp, delayG*(stateG==='old'?3:1) , val);
    else {
        setStateG(val);
        setGrowInG(true);
    }
}

function stateExp(value: string) {
    setStateG(value);
    setGrowInG(true);
}

export function getGrowIn() {
    return growInG;
}
/*
abstract class AbsMechanics {
    setState: (value: string)=>void;
    state: string = '';
    mode: boolean = true;
    delay: number = 0;
}

export class Mechanics extends AbsMechanics {

    constructor (public setState:(value: string)=>void, public state: string, public delay: number, public mode: boolean) {
        super();
    }

    selectMode(val: string) {
        if (this.delay) setTimeout(this.selectState, this.delay, val)
        else this.setState(val);
    }

    getStateIn() {
        return this.state;
    }

    private selectState(val: string) {
       this.setState(val);
    }
}

export function createMech(setState: (value: string)=>void, state: string, delay: number, mode: boolean) {
    globeExport = new Mechanics(setState, state, delay, mode);
    return globeExport;
}

export function getMech() {
    console.log(globeExport);
    return globeExport;
}*/