type Optional<T extends object> = {
  [P in keyof T]?: T[P]
}

export type Prefill = Optional<{
  name: string
  email: string
  firstName: string
  lastName: string
  location: string
  guests: string[]
  customAnswers: Optional<{
    a1: string
    a2: string
    a3: string
    a4: string
    a5: string
    a6: string
    a7: string
    a8: string
    a9: string
    a10: string
  }>
  date: Date
}>

export enum CalendlyEvent {
  PROFILE_PAGE_VIEWED = "calendly.profile_page_viewed",
  EVENT_TYPE_VIEWED = "calendly.event_type_viewed",
  DATE_AND_TIME_SELECTED = "calendly.date_and_time_selected",
  EVENT_SCHEDULED = "calendly.event_scheduled",
}

export type Utm = Optional<{
  utmCampaign: string
  utmSource: string
  utmMedium: string
  utmContent: string
  utmTerm: string
  salesforce_uuid: string
}>

/**
 * @description The default title is Calendly Scheduling Page
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title}
 */
export type IframeTitle = string

export type PageSettings = Optional<{
  /**
   * @description Use this setting to hide your profile picture, name, event duration, location, and description when Calendly is embedded. This will help reduce duplicate information that you may already have on your web page.
   * @see {@link https://help.calendly.com/hc/en-us/articles/360020052833-Advanced-embed-options#2} for further information.
   */
  hideLandingPageDetails: boolean
  /**
   * @description Use this setting to hide your profile picture, name, event duration, location, and description when Calendly is embedded. This will help reduce duplicate information that you may already have on your web page.
   * @see {@link https://help.calendly.com/hc/en-us/articles/360020052833-Advanced-embed-options#2} for further information.
   */
  hideEventTypeDetails: boolean
  /**
   * @description This setting is only available for Calendly users on the Pro plan. Use this setting to change your Calendly scheduling page's background color.
   * @example 00a2ff
   * @see {@link https://help.calendly.com/hc/en-us/articles/223147027-Embed-options-overview#3} for further information.
   */
  backgroundColor: string
  /**
   * @description This setting is only available for Calendly users on the Pro plan. Use this setting to change your Calendly scheduling page's text color.
   * @example ffffff
   * @see {@link https://help.calendly.com/hc/en-us/articles/223147027-Embed-options-overview#3} for further information.
   */
  textColor: string
  /**
   * @description This setting is only available for Calendly users on the Pro plan. Use this setting to change your Calendly scheduling page's primary color.
   * @example 4d5055
   * @see {@link https://help.calendly.com/hc/en-us/articles/223147027-Embed-options-overview#3} for further information.
   */
  primaryColor: string
  /**
   * @description The General Data Protection Regulation governs data protection in the EU and EEA. Certain Calendly integrations require access to cookies with user information. If you do not embed the GDPR banner, users in those areas will not have the ability to give their consent in order to access integrations such as Google Analytics, Facebook Pixel, PayPal, and Stripe.
   * @see {@link https://help.calendly.com/hc/en-us/articles/360007385493-Cookie-FAQs} for further information.
   */
  hideGdprBanner: boolean
}>

type OptionsBase = {
  /**
   * Calendly URL (Required)
   * @description The URL of your Calendly event page.
   * @example https://calendly.com/johndoe/30min
   */
  url: string
}

export type CalendlyInlineWidgetOptions = OptionsBase & {
  prefill?: Prefill
  utm?: Utm
  pageSettings?: PageSettings
  iframeTitle?: IframeTitle
}

export type CalendlyPopupButtonOptions = OptionsBase & {
  rootElement: HTMLElement
  text?: string
  prefill?: Prefill
  utm?: Utm
  pageSettings?: PageSettings
  iframeTitle?: IframeTitle
}

export type CalendlyPopupWidgetOptions = OptionsBase & {
  rootElement?: HTMLElement
  text?: string
  color?: string
  textColor?: string
  branding?: boolean
  prefill?: Prefill
  utm?: Utm
  pageSettings?: PageSettings
  iframeTitle?: IframeTitle
}

export type PopupModalContentOptions = OptionsBase & {
  prefill?: Prefill
  utm?: Utm
  pageSettings?: PageSettings
  iframeTitle?: IframeTitle
}

export type PopupModalOptions = PopupModalContentOptions & {
  isOpen: boolean
  rootElement: HTMLElement
}

// --- own ---

export type EventType = "Inline" | "PopupWidget" | "PopupButton"

export type CalendlyClient = {
  closePopupWidget: () => Promise<void>
  destroyBadgeWidget: () => Promise<void>
  initBadgeWidget: (options: CalendlyPopupWidgetOptions) => Promise<void>
  initPopupWidget: (options: PopupModalContentOptions) => Promise<void>
  showPopupWidget: (url: CalendlyPopupWidgetOptions["url"]) => Promise<void>
  initInlineWidget: (options?: Partial<CalendlyInlineWidgetOptions>) => Promise<void>
}