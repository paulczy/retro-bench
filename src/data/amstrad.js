/* Amstrad. Planned: a research agent fills chips, connectors, power, quickref and symptoms. See docs/data-schema.md. */
RCS.add({
  brand: { id: 'amstrad', name: 'Amstrad', blurb: 'Z80 machines with the Gate Array, a 6845 and an AY-3-8912; the CPC 464, 664 and 6128.' },
  machines: {
    cpc464: { id: 'cpc464', brand: 'amstrad', name: 'Amstrad CPC 464', year: 1984, status: 'planned', chips: [], tagline: 'Not entered yet.' },
    cpc664: { id: 'cpc664', brand: 'amstrad', name: 'Amstrad CPC 664', year: 1985, status: 'planned', chips: [], tagline: 'Not entered yet.' },
    cpc6128: { id: 'cpc6128', brand: 'amstrad', name: 'Amstrad CPC 6128', year: 1985, status: 'planned', chips: [], tagline: 'Not entered yet.' },
  },
});
