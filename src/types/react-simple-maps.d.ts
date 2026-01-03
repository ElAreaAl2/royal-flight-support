declare module 'react-simple-maps' {
  import * as React from 'react';

  export interface ComposableMapProps {
    projection?: string;
    projectionConfig?: {
      scale?: number;
      center?: [number, number];
      rotate?: [number, number, number];
    };
    width?: number;
    height?: number;
    className?: string;
    children?: React.ReactNode;
  }

  export interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    translateExtent?: [[number, number], [number, number]];
    onMoveStart?: (event: any) => void;
    onMove?: (event: any) => void;
    onMoveEnd?: (event: any) => void;
    className?: string;
    children?: React.ReactNode;
  }

  export interface GeographiesProps {
    geography: string | object;
    children: (data: { geographies: any[] }) => React.ReactNode;
  }

  export interface GeographyProps {
    geography: any;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    onMouseEnter?: (event: React.MouseEvent) => void;
    onMouseLeave?: (event: React.MouseEvent) => void;
    onClick?: (event: React.MouseEvent) => void;
    className?: string;
  }

  export interface MarkerProps {
    coordinates: [number, number];
    onClick?: (event: React.MouseEvent) => void;
    onMouseEnter?: (event: React.MouseEvent) => void;
    onMouseLeave?: (event: React.MouseEvent) => void;
    className?: string;
    children?: React.ReactNode;
  }

  export interface LineProps {
    coordinates: [[number, number], [number, number]];
    stroke?: string;
    strokeWidth?: number;
    strokeLinecap?: string;
  }

  export interface AnnotationProps {
    subject: [number, number];
    dx?: number;
    dy?: number;
    connectorProps?: object;
    children?: React.ReactNode;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;
  export const ZoomableGroup: React.FC<ZoomableGroupProps>;
  export const Geographies: React.FC<GeographiesProps>;
  export const Geography: React.FC<GeographyProps>;
  export const Marker: React.FC<MarkerProps>;
  export const Line: React.FC<LineProps>;
  export const Annotation: React.FC<AnnotationProps>;
}
