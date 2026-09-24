"use client"

import { useMemo } from "react"
import { useTheme } from "next-themes"
import { Map, MapArc, MapMarker, MarkerContent, MarkerLabel } from "@/components/ui/map"
import { portfolioConfig } from "@/config/portfolio"

const places = portfolioConfig.contact.availability

const arcs = places.flatMap((origin, index) =>
  places.slice(index + 1).map((destination) => ({
    id: `${origin.city}-${destination.city}`,
    from: origin.coordinates,
    to: destination.coordinates,
  })),
)

const lngs = places.map((place) => place.coordinates[0])
const lats = places.map((place) => place.coordinates[1])
const bounds = [
  [Math.min(...lngs), Math.min(...lats)],
  [Math.max(...lngs), Math.max(...lats)],
] as [[number, number], [number, number]]

export default function BasedAroundMap() {
  const { resolvedTheme } = useTheme()
  const lineColor = resolvedTheme === "dark" ? "#e4e4e7" : "#3f3f46"

  const paint = useMemo(
    () => ({
      "line-color": lineColor,
      "line-width": 1.5,
      "line-dasharray": [1.5, 1.5],
      "line-opacity": 0.9,
    }),
    [lineColor],
  )

  return (
    <div className="mt-6 h-72 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 sm:h-80">
      <Map
        bounds={bounds}
        fitBoundsOptions={{ padding: { top: 64, right: 72, bottom: 48, left: 72 } }}
        cooperativeGestures
        dragRotate={false}
      >
        <MapArc data={arcs} curvature={0.32} interactive={false} paint={paint} />
        {places.map((place) => (
          <MapMarker key={place.city} longitude={place.coordinates[0]} latitude={place.coordinates[1]}>
            <MarkerContent>
              <div className="size-2 rounded-full bg-foreground ring-2 ring-background" />
              <MarkerLabel position="top" className="font-mono text-[11px] tracking-tight">
                {place.city}
              </MarkerLabel>
            </MarkerContent>
          </MapMarker>
        ))}
      </Map>
    </div>
  )
}
