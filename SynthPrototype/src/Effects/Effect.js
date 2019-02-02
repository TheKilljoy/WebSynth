

//"abstract class" every effect needs to extend from.
//every effect needs to implement a method named "apply" and "getType"
export default class Effect{
    constructor(volumeNode, audioContext){
        this.volumeNode = volumeNode;
        this.audioContext = audioContext;

        if(new.target   === Effect) {
            throw new TypeError("This is an abstract class and thus can not be instantiated.")
        }

        if(this.apply === undefined){
            throw new TypeError("The method apply() must be implemented.")
        }

        if(this.getType === undefined){
            throw new TypeError("The method getType() must be implemented.")
        }

    }
}
