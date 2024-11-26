//% shim=toggleOnOff
function toggleOnOff(): boolean {
    return true; // Default value
}

enum Motor {
    MotorA = 0,
    MotorB = 1
}

enum Direction {
    Forward = 0,
    Backward = 1
}

//% color=#0fbc11 icon="\uf085" block="Motor Control"
namespace MotorControl {
    //% block="set motor on pin14 to %state"
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

    /**
     * Control both motors' direction and speed
     * @param direction1 direction for Motor1
     * @param speed1 speed for Motor1 (0-100)
     * @param direction2 direction for Motor2
     * @param speed2 speed for Motor2 (0-100)
     */
    //% block="set Motor A direction %direction1|speed %speed1|and Motor2 direction %direction2|speed %speed2"
    //% speed1.min=0 speed1.max=100 speed2.min=0 speed2.max=100
    export function controlBothMotors(
        direction1: Direction, speed1: number,
        direction2: Direction, speed2: number
    ): void {
        // Motor1 Control
        controlMotor(Motor.Motor1, direction1, speed1);

        // Motor2 Control
        controlMotor(Motor.Motor2, direction2, speed2);
    }
}

