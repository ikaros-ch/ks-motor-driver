//% shim=toggleOnOff
function toggleOnOff(): boolean {
    return true; // Default value
}
//% blockId=Motor enum block="Motor"
//% blockNamespace=MotorControl
enum Motor {
    Motor1 = 0,
    Motor2 = 1
}

//% blockId=Direction enum block="Direction"
//% blockNamespace=MotorControl
enum Direction {
    Forward = 0,
    Backward = 1
}

//% color=#0fbc11 icon="\uf085" block="Motor Control"
namespace MotorControl {

    //% block="set motors to %state"
    //% state.shadow="toggleOnOff"
    export function setMotorState(state: boolean): void {
        pins.digitalWritePin(DigitalPin.P14, state ? 1 : 0);
    }
    //% block="set %motor|direction %direction|speed %speed"
    //% speed.min=0 speed.max=100
    export function controlMotor(motor: Motor, direction: Direction, speed: number): void {
        let pwmPin: AnalogPin;
        let forwardPin: DigitalPin;
        let backwardPin: DigitalPin;

        if (motor === Motor.Motor1) {
            pwmPin = AnalogPin.P1;
            forwardPin = DigitalPin.P13;
            backwardPin = DigitalPin.P12;
        } else {
            pwmPin = AnalogPin.P2;
            forwardPin = DigitalPin.P15;
            backwardPin = DigitalPin.P16;
        }

        if (direction === Direction.Forward) {
            pins.digitalWritePin(forwardPin, 1);
            pins.digitalWritePin(backwardPin, 0);
        } else {
            pins.digitalWritePin(forwardPin, 0);
            pins.digitalWritePin(backwardPin, 1);
        }

        // Set speed using PWM
        pins.analogWritePin(pwmPin, Math.map(speed, 0, 100, 0, 1023));
    }


    //% block="stop %motor"
    export function stopMotor(motor: Motor): void {
        let pwmPin: AnalogPin;

        if (motor === Motor.Motor1) {
            pwmPin = AnalogPin.P1;
        } else {
            pwmPin = AnalogPin.P2;
        }

        pins.analogWritePin(pwmPin, 0); // Set PWM to 0 to stop motor
    }
}
