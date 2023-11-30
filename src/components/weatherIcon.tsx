import { Cloud, Cloudy, CloudDrizzle, CloudRain, Sun, CloudFog, Haze, CloudSnow, CloudHail, Tornado, CloudSun } from 'lucide-react';

export interface WeatherIconProps {
  weather_code: number;
  className?: string;
}

/*
 ** Depending on the weather code, this returns the correct icon.
 ** More info here: https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM
 */
// TODO: Map all from 0 - 99
export default function WeatherIcon({ weather_code, className }: WeatherIconProps) {
  switch (weather_code) {
    case 0:
    case 1:
    case 2:
      return <Sun className={className} />;
    case 3:
      return <CloudSun className={className} />;
    case 30:
    case 31:
    case 32:
    case 33:
    case 34:
    case 35:
      return <Tornado className={className} />;
    case 5:
      return <Haze className={className} />;
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 28:
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
    case 47:
    case 48:
    case 49:
      return <CloudFog className={className} />;
    case 4:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
      return <Cloudy className={className} />;
    case 20:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
    case 58:
    case 59:
    case 60:
    case 66:
    case 68:
    case 80:
    case 83:
    case 91:
      return <CloudDrizzle className={className} />;
    case 21:
    case 24:
    case 25:
    case 29:
    case 61:
    case 62:
    case 63:
    case 64:
    case 65:
    case 67:
    case 69:
    case 81:
    case 82:
    case 84:
    case 92:
    case 95:
    case 97:
      return <CloudRain className={className} />;
    case 22:
    case 23:
    case 26:
    case 36:
    case 37:
    case 38:
    case 39:
    case 70:
    case 71:
    case 72:
    case 73:
    case 74:
    case 75:
    case 76:
    case 77:
    case 78:
    case 79:
    case 85:
    case 86:
    case 87:
    case 88:
    case 93:
    case 94:
      return <CloudSnow className={className} />;
    case 27:
    case 89:
    case 90:
    case 96:
    case 99:
      return <CloudHail className={className} />;
    case 98:
      return <Cloud className={className} />;
    default:
      return null; // Should be unreachable
  }
}
