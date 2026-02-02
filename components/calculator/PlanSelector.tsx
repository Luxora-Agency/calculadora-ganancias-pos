'use client';

import { PlanType } from '@/lib/types';
import { PLANES } from '@/lib/constants';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface PlanSelectorProps {
  value: PlanType;
  onChange: (value: PlanType) => void;
}

export function PlanSelector({ value, onChange }: PlanSelectorProps) {
  return (
    <div className="space-y-3">
      <Label htmlFor="plan" className="text-sm font-medium">
        Plan a Vender
      </Label>

      <Select
        value={value}
        onValueChange={(v) => onChange(v as PlanType)}
      >
        <SelectTrigger id="plan" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.values(PLANES).map((plan) => (
            <SelectItem key={plan.id} value={plan.id}>
              <div className="flex items-center gap-2">
                <span>{plan.nombre}</span>
                <span className="text-muted-foreground">
                  {plan.precioFormateado}
                </span>
                {plan.id === 'profesional' && (
                  <Badge className="bg-fuchsia-100 text-fuchsia-700 hover:bg-fuchsia-100">
                    Recomendado
                  </Badge>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
