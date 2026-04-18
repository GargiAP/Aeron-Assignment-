def convert_to_decimal(coord, direction):
    if not coord:
        return None

    try:
        degrees = float(coord[:2])
        minutes = float(coord[2:])
        decimal = degrees + (minutes / 60)

        if direction in ["S", "W"]:
            decimal *= -1

        return round(decimal, 6)
    except:
        return None
    
def knots_to_kmph(knots):
     return round(float(knots) * 1.852, 2)