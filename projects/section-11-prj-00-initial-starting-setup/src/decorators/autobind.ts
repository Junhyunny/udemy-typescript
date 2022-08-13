// namespace App {
export default function Autobind(_1: any, _2: string | Symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundedFunc = originalMethod.bind(this);
            return boundedFunc;
        },
    };
    return adjustDescriptor;
}
// }
