
// this is an implementation of command object design pattern
export function invokeService<T>(service, methodName: string, payload: any){

  return service[methodName] 
      && service[methodName].apply(service, [payload]) as T;
}