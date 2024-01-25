import type { CalendlyClient, CalendlyPopupWidgetOptions } from "../types"

export const useCalendly = (): CalendlyClient => {
  const scriptUrl = 'https://assets.calendly.com/assets/external/widget.js'

  const attemptToLoadWidgetScript = (): Promise<CalendlyClient | undefined> =>
    new Promise(resolve => {
      try {
        // Return if the widget script is already loaded.
        if ("Calendly" in window) return resolve(window.Calendly as CalendlyClient)

        // Load the widget script if not done.
        if (!("Calendly" in window)) {
          const script = document.createElement("script")
          script.onload = () => {
            return resolve("Calendly" in window ? (window.Calendly as CalendlyClient) : undefined)
          }
          script.onerror = () => {
            console.error("[nuxt-calendly] failed to load widget script.")
            return resolve(undefined)
          }
          script.setAttribute("src", scriptUrl)
          document.head.appendChild(script)
        }
      } catch (error) {
        console.error("[nuxt-calendly] attempt to load widget script failed.")
        return resolve(undefined)
      }
    })

  const getCalendly = async () => {
    if (!import.meta.client) return
    const calendly = await attemptToLoadWidgetScript()
    if (!calendly) return
    return calendly
  }

  const closePopupWidget = async () => {
    const calendly = await getCalendly()
    calendly?.closePopupWidget()
  }

  const destroyBadgeWidget = async () => {
    const calendly = await getCalendly()
    calendly?.destroyBadgeWidget()
  }

  const initBadgeWidget = async (options: Parameters<CalendlyClient["initBadgeWidget"]>["0"]) => {
    const calendly = await getCalendly()
    const fullOptions: Parameters<CalendlyClient["initBadgeWidget"]>["0"] = {
      ...options,
      color: options.color || "#00a2ff",
      textColor: options.textColor || "#ffffff",
      branding: options.branding !== false,
    }
    calendly?.initBadgeWidget(fullOptions)
  }

  const initPopupWidget = async (options: Parameters<CalendlyClient["initPopupWidget"]>["0"]) => {
    const calendly = await getCalendly()
    calendly?.initPopupWidget(options)
  }

  const initInlineWidget = async (options: Parameters<CalendlyClient["initInlineWidget"]>["0"]) => {
    const calendly = await getCalendly()
    const fullOptions: Parameters<CalendlyClient["initInlineWidget"]>["0"] = {
      ...options,
    }
    calendly?.initInlineWidget(fullOptions)
  }

  const showPopupWidget = async (url: CalendlyPopupWidgetOptions["url"]) => {
    const calendly = await getCalendly()
    calendly?.showPopupWidget(url)
  }

  return {
    closePopupWidget,
    destroyBadgeWidget,
    initBadgeWidget,
    initPopupWidget,
    initInlineWidget,
    showPopupWidget,
  }
}
