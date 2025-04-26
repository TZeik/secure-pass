import { VehicleService } from "../../src/services/VehicleService";
import { Vehicle } from "../../src/models/Vehicle";
import { User } from "../../src/models/User";
import { UserRole } from "../../src/interfaces/IUser";

describe("VehicleService", () => {
  let residentId: string;

  it("Registro de un vehículo", async () => {
    // Usuario residente de prueba
    const resident = await User.create({
      nombre: "Randy Germosén",
      email: "randy@example.com",
      password: "password123",
      role: UserRole.RESIDENTE,
      apartamento: "5",
      torre: "B",
    });

    residentId = resident.id.toString();

    const vehicle = await VehicleService.registerVehicle({
      residente: residentId,
      placa: "A-345678",
      marca: "Honda",
      modelo: "Civic",
      color: "Rojo",
    });

    expect(vehicle._id).toBeDefined();
    expect(vehicle.placa).toBe("A-345678");
    expect(vehicle.residente.toString()).toBe(residentId);
  });

  it("Verificación de formato de placa", async () => {
    const vehicle = await VehicleService.registerVehicle({
      residente: residentId,
      placa: "a-987654", // Placa en lowercase
      marca: "Toyota",
      modelo: "Supra",
      color: "Amarillo",
    });

    expect(vehicle.placa).toBe("A-987654");
  });

  it("Formato de placa inválido", async () => {
    await expect(
      VehicleService.registerVehicle({
        residente: residentId,
        placa: "ABCDEFGH-5", // Formato incorrecto
        marca: "Mazda",
        modelo: "CX-5",
        color: "Negro",
      })
    ).rejects.toThrow("Formato de placa inválido (A-123456)");
  });

  it("Consulta de vehículos por residente", async () => {
    await VehicleService.registerVehicle({
      residente: residentId,
      placa: "A-963852",
      marca: "Nissan",
      modelo: "Sentra",
      color: "Blanco",
    });

    const vehicles = await VehicleService.getVehiclesByResident(residentId);
    expect(vehicles.length).toBe(3); // El Civic, el Supra y el Sentra. (El CX-5 no porque su placa es inválida)
    expect(vehicles[0].placa).toBe("A-963852");
  });

  it("Eliminación de vehículo por placa", async () => {
    await VehicleService.registerVehicle({
      residente: residentId,
      placa: "G-147000",
      marca: "Ford",
      modelo: "Fiesta",
      color: "Azul",
    });

    await VehicleService.deleteVehicle("G-147000");
    const vehicle = await Vehicle.findOne({ placa: "G-147000" });
    expect(vehicle).toBeNull();
  });
});
