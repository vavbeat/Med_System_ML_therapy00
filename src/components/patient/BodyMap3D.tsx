import React from 'react';
import { Button } from '@/components/ui/button';

// Упрощенный компонент для отображения анимации визуальной карты тела
export default function BodyMap3D() {
  return (
    <div className="w-full bg-background rounded-lg border border-border overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border-b border-border bg-card">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <h3 className="text-base sm:text-lg font-semibold">Визуальная карта тела</h3>
        </div>
      </div>

      {/* Анимация */}
      <div className="h-96 flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
        <div className="relative w-full max-w-md">
          <img 
            src="/body-animation.gif" 
            alt="Визуальная анимация тела"
            className="w-full h-auto object-contain rounded-lg shadow-lg"
            style={{ maxHeight: '24rem' }}
          />
          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-3 py-1 rounded text-sm">
            Анимация визуальной карты тела
          </div>
        </div>
      </div>

      {/* Информация */}
      <div className="p-3 sm:p-4 bg-card border-t border-border">
        <div className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
          <strong>Визуальная карта тела:</strong> Анимированное изображение анатомии человека для медицинских целей.
        </div>
        <div className="text-sm">
          Данная анимация показывает визуальное представление человеческого тела и может использоваться для:
        </div>
        <ul className="text-sm text-muted-foreground mt-2 ml-4 list-disc">
          <li>Образовательных целей</li>
          <li>Медицинских консультаций</li>
          <li>Визуализации анатомических структур</li>
        </ul>
      </div>
    </div>
  );
}
