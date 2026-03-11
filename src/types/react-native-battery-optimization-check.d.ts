declare module "react-native-battery-optimization-check" {
    export function isBatteryOptimizationEnabled(): Promise<boolean>;
    export function requestBatteryOptimizationSettings(): Promise<void>;
}