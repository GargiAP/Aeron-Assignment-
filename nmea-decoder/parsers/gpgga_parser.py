def parse_gpgga(sentence):
    parts = sentence.split(",")

    if parts[0] != "$GPGGA":
        return {"error": "Not a GPGGA sentence"}

    try:
        return {
            "time": parts[1],
            "latitude": parts[2],
            "lat_dir": parts[3],
            "longitude": parts[4],
            "lon_dir": parts[5],
            "fix_quality": parts[6],
            "num_satellites": parts[7],
        }
    except IndexError:
        return {"error": "Invalid GPGGA format"}