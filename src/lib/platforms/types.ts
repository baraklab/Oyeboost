/**
 * The channels influencers actually post on. Amplibee never publishes to
 * these on anyone's behalf — this is metadata only (label, color, icon),
 * used to render choices and badges across campaigns, briefs, and network
 * profiles.
 */
export type PlatformId = "x" | "linkedin" | "youtube" | "instagram";

export interface PlatformDefinition {
  id: PlatformId;
  name: string;
  shortName: string;
  color: string;
  /** What a genuine deliverable on this channel typically looks like. */
  contentKind: string;
}
