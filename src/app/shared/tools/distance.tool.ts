export class DistanceTool {
  private static earthRadiusKm = 6371;

  public static getDistanceBetweenCoordinates(posA: google.maps.LatLngLiteral, posB: google.maps.LatLngLiteral): number {

    const dLat = this.degreesToRadians(posB.lat - posA.lat);
    const dLon = this.degreesToRadians(posB.lng - posA.lng);

    const latAInRadians = this.degreesToRadians(posA.lat);
    const latBInRadians = this.degreesToRadians(posB.lat);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(latAInRadians) * Math.cos(latBInRadians);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return this.earthRadiusKm * c * 1000;
  }

  private static degreesToRadians(degrees: number): number {
    return degrees * Math.PI / 180;
  }
}
