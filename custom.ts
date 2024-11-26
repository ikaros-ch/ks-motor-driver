//% shim=toggleOnOff
function toggleOnOff(): boolean {
    return true; // Default value
}

enum Motor {
    MotorA,
    MotorB 
}

enum Direction {
    Forward,
    Backward
}

//% color=#0fbc11 icon="\uf085" block="Motor Control"
namespace MotorControl {
    //% block="Set motors to %state"
    //% state.shadow="toggleOnOff"
    export function setMotorState(state: boolean): void {
        pins.digitalWritePin(DigitalPin.P14, state ? 1 : 0);
    }
     //% block="set %motor|speed %speed"
    //% speed.min=-100 speed.max=100
    export function controlMotor(motor: Motor, speed: number): void {
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

        if (speed > 0) {
            // Forward
            pins.digitalWritePin(forwardPin, 1);
            pins.digitalWritePin(backwardPin, 0);
            pins.analogWritePin(pwmPin, Math.map(speed, 0, 100, 0, 1023));
        } else if (speed < 0) {
            // Backward
            pins.digitalWritePin(forwardPin, 0);
            pins.digitalWritePin(backwardPin, 1);
            pins.analogWritePin(pwmPin, Math.map(-speed, 0, 100, 0, 1023));
        } else {
            // Stop
            pins.digitalWritePin(forwardPin, 0);
            pins.digitalWritePin(backwardPin, 0);
            pins.analogWritePin(pwmPin, 0);
        }
    }
    //% block="set Motor1 speed %speed1|and Motor2 speed %speed2"
    //% speed1.min=-100 speed1.max=100 speed2.min=-100 speed2.max=100
    export function controlBothMotors(speed1: number, speed2: number): void {
        controlMotor(Motor.Motor1, speed1);
        controlMotor(Motor.Motor2, speed2);
    }

    /**
     * Stop a motor
     * @param motor the motor to stop (Motor1 or Motor2)
     */
    //% block="stop %motor"
    export function stopMotor(motor: Motor): void {
        let pwmPin: AnalogPin;

        if (motor === Motor.MotorA) {
            pwmPin = AnalogPin.P1;
        } else {
            pwmPin = AnalogPin.P2;
        }

        pins.analogWritePin(pwmPin, 0); // Set PWM to 0 to stop motor
    }

}
