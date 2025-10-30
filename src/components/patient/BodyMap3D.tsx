import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Save, ZoomIn, ZoomOut, Eye, Bone } from 'lucide-react';

// Типы для зон боли
interface PainZone {
  id: string;
  name: string;
  position: [number, number, number];
  painLevel: number;
  color: string;
  bodyPartId: string;
}

// Компонент отдельной кости скелета
interface SkeletonBoneProps {
  name: string;
  modelUrl: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  onPartClick: (partName: string, worldPosition: [number, number, number]) => void;
  painZones: PainZone[];
  selectedZone: string | null;
  boneColor: string;
}

// Компонент отдельной кости
const SkeletonBone: React.FC<SkeletonBoneProps> = ({ 
  name, 
  modelUrl, 
  position, 
  rotation = [0, 0, 0], 
  scale = 0.001,
  onPartClick, 
  painZones,
  selectedZone,
  boneColor = '#f5f5dc'
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useLoader(STLLoader, modelUrl);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current && hovered) {
      // Легкая анимация при наведении
      meshRef.current.scale.setScalar(scale * 1.1);
    } else if (meshRef.current) {
      meshRef.current.scale.setScalar(scale);
    }
  });

  const getZonePainLevel = (zoneName: string): number => {
    const zone = painZones.find(z => z.bodyPartId === zoneName);
    return zone ? zone.painLevel : 0;
  };

  const painLevel = getZonePainLevel(name);

  const handleClick = (event: any) => {
    event.stopPropagation();
    const worldPosition = event.point;
    onPartClick(name, [worldPosition.x, worldPosition.y, worldPosition.z]);
  };

  const getPainColor = () => {
    if (painLevel > 7) return '#ef4444'; // Красный для сильной боли
    if (painLevel > 4) return '#f97316'; // Оранжевый для умеренной боли
    if (painLevel > 0) return '#eab308'; // Желтый для легкой боли
    return boneColor; // Обычный цвет кости
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      <primitive object={geometry} />
      <meshStandardMaterial 
        color={getPainColor()}
        transparent
        opacity={painLevel > 0 ? 0.9 : 0.8}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
};

// Основной компонент скелета
interface SkeletonModelProps {
  onPartClick: (partName: string, worldPosition: [number, number, number]) => void;
  painZones: PainZone[];
  selectedZone: string | null;
}

const SkeletonModel: React.FC<SkeletonModelProps> = ({ onPartClick, painZones, selectedZone }) => {
  const skeletonRef = useRef<THREE.Group>(null);

  // Позиции и настройки для частей скелета
  const skeletonParts = [
    {
      name: 'head',
      modelUrl: '/skeleton-models/skull.stl',
      position: [0, 1.6, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      scale: 0.002,
      boneColor: '#e6e6fa'
    },
    {
      name: 'spine',
      modelUrl: '/skeleton-models/spine.stl',
      position: [0, 0.8, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      scale: 0.0015,
      boneColor: '#f5f5dc'
    },
    {
      name: 'pelvis',
      modelUrl: '/skeleton-models/pelvis.stl',
      position: [0, 0, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      scale: 0.003,
      boneColor: '#f5f5dc'
    },
    {
      name: 'leftFemur',
      modelUrl: '/skeleton-models/femur_l.stl',
      position: [-0.15, -0.3, 0] as [number, number, number],
      rotation: [Math.PI / 2, 0, 0] as [number, number, number],
      scale: 0.001,
      boneColor: '#f5f5dc'
    },
    {
      name: 'rightFemur',
      modelUrl: '/skeleton-models/femur_l.stl',
      position: [0.15, -0.3, 0] as [number, number, number],
      rotation: [Math.PI / 2, 0, 0] as [number, number, number],
      scale: 0.001,
      boneColor: '#f5f5dc'
    },
    {
      name: 'leftHumerus',
      modelUrl: '/skeleton-models/humerus_l.stl',
      position: [-0.5, 0.8, 0] as [number, number, number],
      rotation: [Math.PI / 2, 0, 0] as [number, number, number],
      scale: 0.002,
      boneColor: '#f5f5dc'
    },
    {
      name: 'rightHumerus',
      modelUrl: '/skeleton-models/humerus_r.stl',
      position: [0.5, 0.8, 0] as [number, number, number],
      rotation: [Math.PI / 2, 0, 0] as [number, number, number],
      scale: 0.002,
      boneColor: '#f5f5dc'
    }
  ];

  // Создаем маркеры зон боли
  const renderPainZones = () => {
    return painZones.map((zone) => (
      <group key={zone.id} position={zone.position}>
        {/* Маркер боли */}
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color={zone.color} 
            transparent 
            opacity={0.9}
            emissive={zone.color}
            emissiveIntensity={0.3}
          />
        </mesh>
        {/* Текст с уровнем боли */}
        <Text
          position={[0, 0.15, 0]}
          fontSize={0.12}
          color="white"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {zone.painLevel}
        </Text>
        {/* Пульсирующее кольцо */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.12, 0.15, 16]} />
          <meshStandardMaterial 
            color={zone.color} 
            transparent 
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    ));
  };

  return (
    <group ref={skeletonRef}>
      {/* Рендеринг частей скелета */}
      {skeletonParts.map((part) => (
        <SkeletonBone
          key={part.name}
          name={part.name}
          modelUrl={part.modelUrl}
          position={part.position}
          rotation={part.rotation}
          scale={part.scale}
          onPartClick={onPartClick}
          painZones={painZones}
          selectedZone={selectedZone}
          boneColor={part.boneColor}
        />
      ))}
      
      {/* Маркеры зон боли */}
      {renderPainZones()}
    </group>
  );
};

// Основной компонент 3D карты тела
export default function BodyMap3D() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [painZones, setPainZones] = useState<PainZone[]>([]);
  const [painLevel, setPainLevel] = useState(5);
  const [viewMode, setViewMode] = useState<'skeleton' | 'pain'>('skeleton');

  const handlePartClick = useCallback((partName: string, worldPosition: [number, number, number]) => {
    setSelectedZone(partName);
    
    // Обновляем или добавляем зону боли
    setPainZones(prev => {
      const existingIndex = prev.findIndex(zone => zone.bodyPartId === partName);
      const newZone: PainZone = {
        id: Date.now().toString(),
        name: getBodyPartDisplayName(partName),
        position: worldPosition,
        painLevel,
        color: getPainColor(painLevel),
        bodyPartId: partName,
      };

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newZone;
        return updated;
      } else {
        return [...prev, newZone];
      }
    });
  }, [painLevel]);

  const getBodyPartDisplayName = (partName: string): string => {
    const names: { [key: string]: string } = {
      head: 'Череп',
      spine: 'Позвоночник',
      pelvis: 'Таз',
      leftFemur: 'Левая бедренная кость',
      rightFemur: 'Правая бедренная кость',
      leftHumerus: 'Левая плечевая кость',
      rightHumerus: 'Правая плечевая кость',
    };
    return names[partName] || partName;
  };

  const getPainColor = (level: number): string => {
    if (level > 7) return '#ef4444';
    if (level > 4) return '#f97316';
    if (level > 0) return '#eab308';
    return '#22c55e';
  };

  const clearAllMarks = () => {
    setPainZones([]);
    setSelectedZone(null);
  };

  const saveMarks = () => {
    console.log('Сохранение зон боли скелета:', painZones);
    // Здесь можно добавить сохранение в базу данных
  };

  return (
    <div className="w-full bg-background rounded-lg border border-border overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border-b border-border bg-card">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <h3 className="text-base sm:text-lg font-semibold">3D Скелетная карта</h3>
          {selectedZone && (
            <Badge variant="outline" className="text-xs w-fit">
              Выбрано: {getBodyPartDisplayName(selectedZone)}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <Button 
            variant={viewMode === 'skeleton' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('skeleton')}
            className="h-8 px-2 sm:px-3"
          >
            <Bone className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden sm:inline">Скелет</span>
          </Button>
          <Button variant="outline" size="sm" onClick={clearAllMarks} className="h-8 px-2 sm:px-3">
            <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden sm:inline">Очистить</span>
          </Button>
          <Button variant="default" size="sm" onClick={saveMarks} className="h-8 px-2 sm:px-3">
            <Save className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden sm:inline">Сохранить</span>
          </Button>
        </div>
      </div>

      {/* Pain Level Selector */}
      <div className="p-3 sm:p-4 bg-muted/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <span className="text-sm font-medium">Уровень боли: {painLevel}/10</span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPainLevel(Math.max(1, painLevel - 1))}
              disabled={painLevel <= 1}
              className="h-8 w-8 p-0"
            >
              <ZoomOut className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPainLevel(Math.min(10, painLevel + 1))}
              disabled={painLevel >= 10}
              className="h-8 w-8 p-0"
            >
              <ZoomIn className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2">
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(painLevel / 10) * 100}%`,
              backgroundColor: getPainColor(painLevel),
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Нет боли</span>
          <span className="hidden sm:inline">Умеренная</span>
          <span className="hidden lg:inline">Сильная</span>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="h-96 bg-gradient-to-b from-slate-50 to-slate-100">
        <Canvas
          camera={{ position: [0, 1, 4], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} />
          <pointLight position={[0, 5, 0]} intensity={0.5} />

          {/* 3D модель скелета */}
          <SkeletonModel
            onPartClick={handlePartClick}
            painZones={painZones}
            selectedZone={selectedZone}
          />

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={8}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
            target={[0, 0.5, 0]}
          />
        </Canvas>
      </div>

      {/* Инструкции */}
      <div className="p-3 sm:p-4 bg-card border-t border-border">
        <div className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
          <strong>Инструкция:</strong> Нажмите на любую кость 3D модели скелета, чтобы отметить зону боли. 
          <span className="hidden sm:inline"> Используйте ползунок для установки уровня интенсивности боли.</span>
        </div>
        <div className="text-sm font-medium mb-2">Легенда:</div>
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0" />
            <span>Легкая (1-3)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-orange-500 flex-shrink-0" />
            <span>Умеренная (4-7)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0" />
            <span>Сильная (8-10)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded flex-shrink-0" style={{ backgroundColor: '#f5f5dc' }} />
            <span>Кость</span>
          </div>
        </div>
      </div>
    </div>
  );
}
