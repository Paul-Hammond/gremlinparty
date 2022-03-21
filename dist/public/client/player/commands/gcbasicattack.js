import gcCommand from './gccommand.js';
export default class gcBasicAttackCommand extends gcCommand {
    constructor(sender, title, mouseDir) {
        super(sender, title);
        this.mouseDir = mouseDir;
    }
}
