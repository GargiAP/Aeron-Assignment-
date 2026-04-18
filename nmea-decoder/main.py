from parsers.gpgga_parser import parse_gpgga
from parsers.gprmc_parser import parse_gprmc
from utils.convert import convert_to_decimal

def print_table(data):
    print("\n==============================")
    print("      Parsed NMEA Data        ")
    print("==============================")

    for key, value in data.items():
        print(f"{key:<20} : {value}")

    print("==============================\n")


def main():
    sentence = input("Paste NMEA sentence:\n")

    if sentence.startswith("$GPGGA"):
        data = parse_gpgga(sentence)

    elif sentence.startswith("$GPRMC"):
        data = parse_gprmc(sentence)

    else:
        print("Unsupported sentence type")
        return

    if "error" in data:
        print(data["error"])
        return

    # Convert coordinates
    data["latitude_decimal"] = convert_to_decimal(data["latitude"], data["lat_dir"])
    data["longitude_decimal"] = convert_to_decimal(data["longitude"], data["lon_dir"])

    print_table(data)


if __name__ == "__main__":
    main()