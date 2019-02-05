let type = {
    "SmallHexagon1" : "../../res/ImpulseResponse/161588__jorickhoofd__ir-clap-small-hexagonic-chapel-lo-pitch.wav",
    "SmallHexagon2" : "../../res/ImpulseResponse/161586__jorickhoofd__ir-clap-small-hexagonic-chapel-layered.wav",
    "Basement" : "../../res/ImpulseResponse/160152__jorickhoofd__basement-impulse-response-reverb-1m-away.wav",
    "LivingRoom" : "../../res/ImpulseResponse/160145__jorickhoofd__empty-living-room-impulse-response-reverb-4m-away-clap.wav",
    "Staircase1" : "../../res/ImpulseResponse/160143__jorickhoofd__basement-impulse-response-reverb-6m-away-medium-pitched-clap.wav",
    "Staircase2" : "../../res/ImpulseResponse/160138__jorickhoofd__staircase-impulse-response-long-reverb-20m-away-clap.wav",
    "Staircase3" : "../../res/ImpulseResponse/160137__jorickhoofd__staircase-impulse-response-long-reverb-15m-away-clap.wav"
}

export default class ReverbType {
    static type(Type)
    {
        return type[Type];
    }
}