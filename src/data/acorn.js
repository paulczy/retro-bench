/* Acorn. Planned: a research agent fills chips, connectors, power, quickref and symptoms. See docs/data-schema.md. */
RCS.add({
  brand: { id: 'acorn', name: 'Acorn', blurb: 'The BBC Micro and Master: 6502 machines with Acorn\'s own ULAs, a 6845 and a 6522.' },
  machines: {
    bbcb: { id: 'bbcb', brand: 'acorn', name: 'BBC Micro Model B', year: 1981, status: 'planned', chips: [], tagline: 'Not entered yet.' },
    bbcmaster: { id: 'bbcmaster', brand: 'acorn', name: 'BBC Master 128', year: 1986, status: 'planned', chips: [], tagline: 'Not entered yet.' },
  },
});
