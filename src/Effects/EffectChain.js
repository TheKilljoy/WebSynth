
//the effect chain class contains all effects
//effects that should not be applied are filtered with the attribute this.activated
//it provides methods to get a single effect or an effect by type
//and a method to switch an effect on or off
export default class EffectChain{
    constructor(effects){
        this.effects = effects;
        this.activated = []; // for activating / deactivating effects
        for(var i = 0; i < this.effects.length; i++){
            this.activated.push(true);
        }
    }

    //loop through all effects and apply if they're activated
    applyEffects(audioContext){
        var gainNode;
        for(var i = 0; i < this.effects.length; i++){
            console.log(this.effects)
            if(this.activated[i]){
                gainNode = this.effects[i].apply(gainNode);
            }
        }
        gainNode.connect(audioContext.destination);
    }

    getEffect(index){
        return this.effects[index];
    }

    getEffectByType(type){
        for(var i = 0; i < this.effects.length; i++){
            if(this.effects[i].getType(type)){
                return this.effects[i];
            }
        }
    }

    getIndexOfEffect(type){
        for(var i = 0; i < this.effects.length; i++){
            if(this.effects[i].getType(type)){
                return i;
            }
        }
    }

    switchEffectOnOff(index){
        this.activated[index] = !this.activated[index];
    }
}