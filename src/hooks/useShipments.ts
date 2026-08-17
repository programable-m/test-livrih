import { useState, useEffect, useCallback } from 'react';
import { Parcel, ShipmentStatus, SystemStats } from '../types';
import { ShipmentService, CreateParcelInput, ParcelFilters } from '../services/shipmentService';

export function useShipments(initialFilters?: ParcelFilters) {
  const [filters, setFilters] = useState<ParcelFilters>(initialFilters || {});
  const [parcels, setParcels] = useState<Parcel[]>(() => ShipmentService.getFilteredParcels(filters));
  const [stats, setStats] = useState<SystemStats>(() => ShipmentService.getStats(filters.merchantId));

  const refresh = useCallback(() => {
    setParcels(ShipmentService.getFilteredParcels(filters));
    setStats(ShipmentService.getStats(filters.merchantId));
  }, [filters]);

  useEffect(() => {
    refresh();
    const handleStorageChange = () => refresh();
    window.addEventListener('livrih_storage_change', handleStorageChange);
    return () => window.removeEventListener('livrih_storage_change', handleStorageChange);
  }, [refresh]);

  const createParcel = useCallback(
    (input: CreateParcelInput) => {
      const created = ShipmentService.createParcel(input);
      refresh();
      return created;
    },
    [refresh]
  );

  const updateStatus = useCallback(
    (parcelId: string, status: ShipmentStatus, options?: any) => {
      const updated = ShipmentService.updateParcelStatus(parcelId, status, options);
      refresh();
      return updated;
    },
    [refresh]
  );

  const assignDriver = useCallback(
    (parcelId: string, driverId: string, driverName: string, driverPhone?: string) => {
      const updated = ShipmentService.assignDriver(parcelId, driverId, driverName, driverPhone);
      refresh();
      return updated;
    },
    [refresh]
  );

  return {
    parcels,
    stats,
    filters,
    setFilters,
    refresh,
    createParcel,
    updateStatus,
    assignDriver,
  };
}
