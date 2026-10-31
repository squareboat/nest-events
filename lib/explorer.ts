import { Injectable } from "@nestjs/common";
import { DiscoveryService, MetadataScanner } from "@nestjs/core";
import { SquareboatNestEventConstants } from "./constants";
import { EventMetadata } from "./metadata";

@Injectable()
export class EventExplorer {
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly metadataScanner: MetadataScanner
  ) {}

  onModuleInit() {
    const wrappers = this.discovery.getProviders();
    wrappers.forEach((w) => {
      const { instance } = w;
      if (
        !instance ||
        typeof instance === "string" ||
        !Object.getPrototypeOf(instance)
      ) {
        return;
      }
      // getAllMethodNames replaces scanFromPrototype, which is deprecated since Nest 10
      for (const key of this.metadataScanner.getAllMethodNames(Object.getPrototypeOf(instance))) {
        this.lookupListeners(instance, key);
      }
    });
  }

  lookupListeners(instance: Record<string, any>, key: string) {
    const methodRef = instance[key];
    const hasEventMeta = Reflect.hasMetadata(
      SquareboatNestEventConstants.eventName,
      instance,
      key
    );
    if (!hasEventMeta) return;
    const eventName = Reflect.getMetadata(
      SquareboatNestEventConstants.eventName,
      instance,
      key
    );
    EventMetadata.addListener(eventName, methodRef.bind(instance));
  }
}
