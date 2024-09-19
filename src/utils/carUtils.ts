import { Car } from '@/types/car';

export function getSimilarCars(currentCar: Car, allCars: Car[], limit: number = 3): Car[] {
  return allCars
    .filter(car => car.id !== currentCar.id) // Excluye el coche actual
    .sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      
      // Mismo fabricante
      if (a.make === currentCar.make) scoreA += 3;
      if (b.make === currentCar.make) scoreB += 3;
      
      // Mismo modelo
      if (a.model === currentCar.model) scoreA += 2;
      if (b.model === currentCar.model) scoreB += 2;
      
      // Año cercano (dentro de 5 años)
      if (Math.abs(a.year - currentCar.year) <= 5) scoreA += 1;
      if (Math.abs(b.year - currentCar.year) <= 5) scoreB += 1;
      
      // Precio similar (dentro del 20%)
      if (Math.abs(a.price - currentCar.price) / currentCar.price <= 0.2) scoreA += 1;
      if (Math.abs(b.price - currentCar.price) / currentCar.price <= 0.2) scoreB += 1;
      
      return scoreB - scoreA;
    })
    .slice(0, limit);
}