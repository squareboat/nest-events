import "reflect-metadata";
import { isEmpty } from "./helpers";
import { EVENT_EMITTER_NAME } from "./constants";
import { EventMetadata } from "./metadata";

export class EmitsEvent<T> {
  private data: any;

  public getData(): T {
    return this.data;
  }

  async emit(data: T): Promise<void> {
    const event = Reflect.getMetadata(EVENT_EMITTER_NAME, this.constructor);
    if (!event) return;
    this.data = data;

    const promises = [];
    const listeners = EventMetadata.getListeners(event);
    if (isEmpty(listeners)) return;
    for (const listener of listeners) {
      promises.push(listener(this));
    }

    await Promise.all(promises);
    return;
  }
}
