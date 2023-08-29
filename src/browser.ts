import { LogflareUserOptionsI, LogflareHttpClient } from "logflare-transport-core"
import { Level, LogEvent, formatPinoBrowserLogEvent, addLogflareTransformDirectives } from "./utils"

export const createPinoBrowserSend = (options: LogflareUserOptionsI) => {
    const client = new LogflareHttpClient({ ...options, fromBrowser: true })
  
    return (level: Level | number, logEvent: LogEvent) => {
      const logflareLogEvent = formatPinoBrowserLogEvent(logEvent)
      const maybeWithTransforms = addLogflareTransformDirectives(
        logflareLogEvent,
        options
      )
      client.postLogEvents([maybeWithTransforms])
    }
}