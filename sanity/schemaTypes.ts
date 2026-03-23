// Property schema
export const propertySchema = {
  name: 'property',
  title: 'Nemovitost',
  type: 'document',
  fields: [
    { name: 'title', title: 'Název', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'featured', title: 'Doporučená', type: 'boolean' },
    { name: 'price', title: 'Cena (Kč)', type: 'number' },
    { name: 'location', title: 'Lokalita', type: 'string' },
    { name: 'area', title: 'Plocha (m²)', type: 'number' },
    { name: 'rooms', title: 'Počet pokojů', type: 'string' },
    { name: 'type', title: 'Typ', type: 'string', options: { list: ['Prodej','Pronájem'] } },
    { name: 'status', title: 'Status', type: 'string', options: { list: ['Dostupné','Rezervováno','Prodáno'] } },
    { name: 'mainImage', title: 'Hlavní foto', type: 'image', options: { hotspot: true } },
    { name: 'description', title: 'Popis', type: 'text' },
    { name: 'features', title: 'Vlastnosti', type: 'array', of: [{ type: 'string' }] },
  ]
}

// Testimonial schema
export const testimonialSchema = {
  name: 'testimonial',
  title: 'Reference',
  type: 'document',
  fields: [
    { name: 'name', title: 'Jméno klienta', type: 'string' },
    { name: 'text', title: 'Text reference', type: 'text' },
    { name: 'rating', title: 'Hodnocení (1–5)', type: 'number' },
    { name: 'property', title: 'Nemovitost', type: 'string' },
    { name: 'date', title: 'Datum', type: 'date' },
    { name: 'order', title: 'Pořadí', type: 'number' },
  ]
}
