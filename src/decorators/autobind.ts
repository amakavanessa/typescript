// autobind decorator, that binds the submit button to 'this'
export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}
//webpack is a bundling tool, it helps reduce http request by bundling codes together,less imports required,  it optimizes the codes by minifying it.
//it is also able to transform ts to js codes and bundle it
