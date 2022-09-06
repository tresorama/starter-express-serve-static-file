import { random } from "nano-crypto";

export const generateRandomId = () => random(49).alphanumeric();
