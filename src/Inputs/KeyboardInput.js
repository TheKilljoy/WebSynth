//this class maps the buttons on the keyboard to a specific midi value
//and makes it possible to look it up when needed
export default class KeyboardInput
{
    constructor()
    {
        this.charToMidiValue = this.init();
    }

    init()
    {
        let charToMidiValue = 
        {
            "q": 48,
            "2": 49,
            "w": 50,
            "3": 51,
            "e": 52,
            "r": 53,
            "5": 54,
            "t": 55,
            "6": 56,
            "z": 57,
            "7": 58,
            "u": 59,
            "i": 60,
            "9": 61,
            "o": 62,
            "0": 63,
            "p": 64,
            "y": 65,
            "s": 66,
            "x": 67,
            "d": 68,
            "c": 69,
            "f": 70,
            "v": 71,
            "b": 72,
            "h": 73,
            "n": 74,
            "j": 75,
            "m": 76,
            "k": 77,
            ",": 78,
            ".": 79,
            "ö": 80,
            "-": 81 
        }
        return charToMidiValue;
    }

    //returns the midinote that is mapped to this char
    getNote(char)
    {
        return this.charToMidiValue[char];
    }
    //velocity is always 127
    getVelocity()
    {
        return 127;
    }
}