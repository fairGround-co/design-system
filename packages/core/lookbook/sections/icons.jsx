/* Icons — core's generic base registry + the THEME's icon library
   (DECISIONS #30: themes may ship an icon-glyph data library; app glyphs
   graduate app→theme, generic glyphs theme→core). */
import React from 'react';
import { Icon, CORE_ICON_GLYPHS } from '../../components/icons/Icon.jsx';
import { Section, Card, GlyphGrid, LB, BRAND } from '../scaffold.jsx';

export const meta = {
  id: 'icons',
  title: 'Icons',
  visibility: 'public',
  sources: ['coreIcons', 'themeIcons'],
};

export function SectionBody() {
  const themeIcons = LB.themeIcons || null;
  const themeCount = themeIcons ? Object.keys(themeIcons).length : 0;
  return (
    <Section meta={meta}
      lead="One consistent line-art style: 24×24, 1.75px stroke, round caps, currentColor. Core ships the generic base; the theme layer carries the org's own vocabulary (DECISIONS #30) — glyphs tint with the text color, may reference tokens, and may carry deliberate perma-color (org art like flags). Apps merge further registries via the Icon glyphs prop; standalone icons always carry a title.">
      <Card title={`Core base registry — ${Object.keys(CORE_ICON_GLYPHS).length} glyphs`}>
        <GlyphGrid registry={CORE_ICON_GLYPHS} Icon={Icon} showFallback />
      </Card>
      {themeCount > 0 && (
        <Card title={`${LB.title || BRAND} icon library — ${themeCount} glyphs`}
          note="Shipped by the theme package as SVG data; merge over the core set via <Icon glyphs={{...THEME_GLYPHS, ...appGlyphs}}>. A glyph that broadly generalizes is a graduation candidate for core.">
          <GlyphGrid registry={themeIcons} Icon={Icon} />
        </Card>
      )}
      {BRAND && themeCount === 0 && (
        <Card title="Theme icon library" note="This theme ships no icon library yet — org glyphs incubating in apps graduate here (DECISIONS #30).">
          <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-faint)' }}>empty</span>
        </Card>
      )}
    </Section>
  );
}
