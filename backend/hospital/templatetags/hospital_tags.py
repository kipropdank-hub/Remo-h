from django import template

register = template.Library()

# Map the FontAwesome-style values stored in the database to SVG symbols
# defined in templates/hospital/base.html.
ICON_MAP = {
    'fa-heart-pulse': 'heart',
    'fa-brain': 'brain',
    'fa-bone': 'bone',
    'fa-baby': 'baby',
    'fa-shield-virus': 'shield',
    'fa-activity': 'activity',
    'fa-stethoscope': 'stethoscope',
    'fa-users': 'users',
    'fa-star': 'star',
    'fa-calendar': 'calendar',
    'fa-clock': 'clock',
    'fa-phone': 'phone',
    'fa-envelope': 'mail',
    'fa-map-marker': 'pin',
    'fa-award': 'award',
    'fa-check': 'check',
    'fa-flask': 'flask',
    'fa-eye': 'eye',
    'fa-lungs': 'lungs',
    'fa-tooth': 'tooth',
    'fa-x-ray': 'scan',
    'fa-syringe': 'syringe',
    'fa-hand-holding-heart': 'heart',
}


@register.filter
def icon_symbol(value):
    """Return a safe SVG symbol id for an icon name stored in the database."""
    value = (value or '').strip()
    if value in ICON_MAP:
        return ICON_MAP[value]
    return value.replace('fa-', '').strip() or 'heart'
