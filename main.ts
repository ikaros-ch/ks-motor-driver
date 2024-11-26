//% color=#0fbc11 icon="\uf085" block="Motor Control"
namespace MotorControl {
    /**
     * Open or close the motor power on pin 14
     * @param state whether to open or close the motor
     */
    //% block="set motor on pin14 to %state"
    //% state.shadow="toggleOnOff"
    export function setMotorState(state: boolean): void {
        pins.digitalWritePin(DigitalPin.P14, state ? 1 : 0);
    }
}
