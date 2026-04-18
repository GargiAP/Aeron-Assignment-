def parse_gprmc(sentence):
    parts = sentence.split(",")

    if parts[0] != "$GPRMC":
        return {"error": "Not a GPRMC sentence"}

    try:
        return {
            "time": parts[1],
            "status": parts[2],  # A = active, V = void
            "latitude": parts[3],
            "lat_dir": parts[4],
            "longitude": parts[5],
            "lon_dir": parts[6],
            "speed_knots": parts[7],
            "date": parts[9],
        }
    except IndexError:
        return {"error": "Invalid GPRMC format"}