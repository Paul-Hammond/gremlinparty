import Vec2 from '../../math/gcVec2.js';
import gcCommand from './clientcommand.js';
export default class gcBasicAttackCommand extends gcCommand {
    readonly mouseDir: Vec2;
    constructor(sender: string, title: string, mouseDir: Vec2);
}
