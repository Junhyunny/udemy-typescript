// namespace App {
export interface Validatable {
    value: string | number;
    requried?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

export function validate(validatable: Validatable) {
    let isValid = true;
    if (validatable.requried) {
        isValid = isValid && validatable.value.toString().trim().length !== 0;
    }
    if (validatable.minLength != null && typeof validatable.value === "string") {
        isValid = isValid && validatable.value.toString().trim().length >= validatable.minLength;
    }
    // !== , !=  차이 그리고 != null은 undefined도 같이 처리해준다.
    if (validatable.maxLength != null && typeof validatable.value === "string") {
        isValid = isValid && validatable.value.toString().trim().length <= validatable.maxLength;
    }
    if (validatable.min != null && typeof validatable.value === "number") {
        isValid = isValid && validatable.value >= validatable.min;
    }
    if (validatable.max != null && typeof validatable.value === "number") {
        isValid = isValid && validatable.value <= validatable.max;
    }
    return isValid;
}
// }
