import { DynamicModule, Module } from "@nestjs/common";
import { DiscoveryModule } from "@nestjs/core";
import { EventExplorer } from "./explorer";

@Module({})
export class EventModule {
  /**
   * Register options
   * @param options
   */
  static register(): DynamicModule {
    return {
      global: true,
      module: EventModule,
      imports: [DiscoveryModule],
      providers: [EventExplorer],
    };
  }

  /**
   * Register Async Options
   */
  static registerAsync(): DynamicModule {
    return {
      global: true,
      module: EventModule,
      imports: [DiscoveryModule],
      providers: [EventExplorer],
    };
  }
}
