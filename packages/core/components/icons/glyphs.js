/* @fairground-co/core — generic icon glyph registry.
   The built-in base set for the line-art icon component. Each value is the
   inner SVG markup for a 24×24 viewBox; render inside:
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
   Style rules for new glyphs: 24×24, 1.75px stroke, round caps/joins, no
   fill, single weight, drawn on the pixel grid, ~20px live area. Keep
   silhouettes simple and unmistakable at 18px. Icons inherit color via
   currentColor and default to ink (var(--text), theme-responsive).
   Domain-specific registries live app-side and merge over this set via the
   Icon component's `glyphs` prop. */
export const CORE_ICON_GLYPHS = {
  /* status */
  check:'<path d="M4 12.5l5 5L20 6.5"/>',
  pending:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3.5 2"/>',
  cancel:'<circle cx="12" cy="12" r="8.5"/><path d="M8.8 8.8l6.4 6.4M15.2 8.8l-6.4 6.4"/>',
  warning:'<path d="M12 3.5L21.5 20H2.5z"/><path d="M12 10v4.5"/><circle cx="12" cy="17.3" r="0.4"/>',
  info:'<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5"/><circle cx="12" cy="8" r="0.4"/>',
  checkcircle:'<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.6 2.6L16 9.2"/>',
  thumbsup:'<path d="M7 10v10H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1z"/><path d="M7 10l4.2-6.5a1.8 1.8 0 0 1 3.1 1.7L13 9h5.2a2 2 0 0 1 2 2.4l-1.3 6.2A2 2 0 0 1 17 20H7"/>',
  thumbsdown:'<path d="M17 14V4h3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1z"/><path d="M17 14l-4.2 6.5a1.8 1.8 0 0 1-3.1-1.7L11 15H5.8a2 2 0 0 1-2-2.4l1.3-6.2A2 2 0 0 1 7 4h10"/>',
  ban:'<circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/>',
  help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.6a2.6 2.6 0 0 1 5-1c0 1.8-2.5 2.2-2.5 3.8"/><circle cx="12" cy="16.6" r="0.6"/>',
  conflict:'<rect x="3.5" y="5.5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3.5v4M16 3.5v4"/><path d="M10.2 13.4l3.6 3.6M13.8 13.4l-3.6 3.6"/>',
  nocontact:'<circle cx="12" cy="12" r="9" stroke-dasharray="2.4 3.6"/>',
  xmark:'<path d="M6 6l12 12M18 6L6 18"/>',
  /* text */
  fontsize:'<path d="M2 18l4-11 4 11"/><path d="M3.4 14.3h5.2"/><path d="M14 18l2.7-7 2.7 7"/><path d="M15.1 15.2h3.2"/>',
  /* wayfinding & nav */
  pin:'<path d="M12 21c-4.5-5-7-7.8-7-11a7 7 0 0 1 14 0c0 3.2-2.5 6-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  people:'<circle cx="9" cy="7" r="2.5"/><path d="M4.5 18v-1.5a4.5 4.5 0 0 1 9 0V18"/><circle cx="16.5" cy="8" r="2"/><path d="M15 13.5a4 4 0 0 1 5 3.5V18"/>',
  group:'<circle cx="6.5" cy="6.6" r="2"/><path d="M3 17.4v-2.9a3.5 3.5 0 0 1 7 0"/><circle cx="17.5" cy="6.6" r="2"/><path d="M14 17.4v-2.9a3.5 3.5 0 0 1 7 0"/><circle cx="12" cy="9.2" r="1.7"/><path d="M9.3 18v-2.1a2.7 2.7 0 0 1 5.4 0V18"/>',
  flag:'<path d="M6 3v18"/><path d="M6 4h10l-2 3 2 3H6"/>',
  phone:'<path d="M6.6 10.8a13 13 0 0 0 5.6 5.6l1.9-1.9a1 1 0 0 1 1-.24 11 11 0 0 0 3.4.55 1 1 0 0 1 1 1V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1h3.3a1 1 0 0 1 1 1 11 11 0 0 0 .55 3.4 1 1 0 0 1-.24 1z"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5 12 13l8.5-6.5"/>',
  edit:'<path d="M4 20h4l9.5-9.5a2 2 0 0 0-2.83-2.83L5 17.2z"/><path d="M13.5 6.5l4 4"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  filter:'<path d="M4 5.5h16l-6 8v6h-4v-6z"/>',
  map:'<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
  list:'<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
  share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>',
  external:'<path d="M14 4h6v6"/><path d="M20 4l-8.5 8.5"/><path d="M18 13.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5.5"/>',
  chevron:'<path d="M6 9l6 6 6-6"/>',
};
