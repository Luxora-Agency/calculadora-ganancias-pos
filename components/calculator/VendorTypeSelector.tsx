'use client';

import { VendorType } from '@/lib/types';
import { VENDEDORES } from '@/lib/constants';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface VendorTypeSelectorProps {
  value: VendorType | null;
  onChange: (value: VendorType | null) => void;
}

export function VendorTypeSelector({ value, onChange }: VendorTypeSelectorProps) {
  const vendedor = value ? VENDEDORES[value] : null;

  return (
    <div className="space-y-3">
      <Label htmlFor="vendor-type" className="text-sm font-medium">
        Tipo de Vendedor <span className="text-red-500">*</span>
      </Label>

      <Select
        value={value || ''}
        onValueChange={(v) => onChange(v as VendorType)}
      >
        <SelectTrigger id="vendor-type" className="w-full">
          <SelectValue placeholder="Selecciona tu rol en la jerarquía" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(VENDEDORES).map((v) => (
            <SelectItem key={v.id} value={v.id}>
              <div className="flex items-center gap-2">
                <span className="font-medium">{v.nombre}</span>
                <Badge variant="outline" className="text-xs">
                  {v.puedeReclutar}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {vendedor && (
        <Card className="p-3 bg-fuchsia-50 border-fuchsia-200">
          <p className="text-sm text-fuchsia-800">{vendedor.descripcion}</p>
          <p className="text-xs text-fuchsia-600 mt-1">
            Equipo máximo: {vendedor.maxEquipo}
          </p>
        </Card>
      )}
    </div>
  );
}
