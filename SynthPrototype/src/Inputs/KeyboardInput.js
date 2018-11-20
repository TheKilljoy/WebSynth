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
            "q": 57,
            "2": 58,
            "w": 59,
            "3": 60,
            "e": 61,
            "r": 62,
            "5": 63,
            "t": 64,
            "6": 65,
            "z": 66,
            "7": 67,
            "u": 68,
            "i": 69,
            "9": 70,
            "o": 71,
            "0": 72,
            "p": 73,
            "y": 74,
            "s": 75,
            "x": 76,
            "d": 77,
            "c": 78,
            "f": 79,
            "v": 80,
            "b": 81,
            "h": 82,
            "n": 83,
            "j": 84,
            "m": 85,
            "k": 86,
            ",": 87,
            ".": 88,
            "ö": 89,
            "-": 90 
        }
        return charToMidiValue;
    }

    getNote(char)
    {
        return this.charToMidiValue[char];
    }

    getVelocity()
    {
        return 127;
    }
}