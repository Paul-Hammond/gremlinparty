// Paul - (03.15.22)
// function for linear interpolation
export const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;