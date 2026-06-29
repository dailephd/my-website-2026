# Component Registry

| Component | Area | Status | Responsibility |
| --- | --- | --- | --- |
| `SiteShell` | layout | implemented | Composes header, main container, and footer with adapter data |
| `Header` | layout | implemented | Renders brand, primary navigation, and theme control |
| `Footer` | layout | implemented | Renders attribution and footer navigation |
| `PageContainer` | layout | implemented | Applies shared responsive page bounds |
| `Container` | UI | implemented | Generic responsive width primitive |
| `Card` | UI | implemented | Tokenized solid bordered surface |
| `LinkButton` | UI | implemented | Tokenized accessible internal/external CTA |
| `SectionHeader` | UI | implemented | Typed section heading and description |
| `HomeHero` | section | implemented | Renders profile and CTA props |
| `PlannedPage` | section | implemented | Marks routes reserved for later milestones |
| `ThemeScript` | theme | implemented | Applies persisted/system theme before visible paint |
| `ThemeProvider` | theme | implemented | Owns preference, effective theme, persistence, and system updates |
| `ThemeToggle` | theme | implemented | Cycles system, light, and dark with accessible state text |
| `ProjectCard` | selected work | implemented | Renders one project’s typed summary, status, role, stack, and links |
| `ProjectGrid` | selected work | implemented | Renders featured/standard responsive project collections and empty state |
| `ProjectLinkList` | selected work | implemented | Renders optional safe project links |
| `FeaturedWorkSection` | selected work | available, unwired | Compact preview reserved for a later homepage composition milestone |
| `ProductFamilyHero` | ecosystem | implemented | Renders family positioning, maturity, audience, and links |
| `EcosystemDiagram` | ecosystem | implemented | Renders the accessible three-layer development flow |
| `EcosystemModuleCard` | ecosystem | implemented | Renders one module’s role, maturity, stack, and optional links |
| `RoadmapShowcase` | roadmap | implemented | Composes the full strategy dashboard |
| `RoadmapTimeline` | roadmap | implemented | Renders ordered module lanes and phases |
| `RoadmapPhaseCard` | roadmap | implemented | Renders phase metadata and milestones |
| `RoadmapMilestoneList` | roadmap | implemented | Renders status-bearing milestone detail |
| `RoadmapStatusBadge` | roadmap | implemented | Renders textual roadmap status |
| `RoadmapUpdatedLabel` | roadmap | implemented | Formats the roadmap update date deterministically |
| `RoadmapProgressRail` | roadmap | implemented | Decorative lane separator |
| `RoadmapPreview` | roadmap | implemented, unwired | Compact derived roadmap summary |
| `ProductCard` | product index | implemented | Renders product identity, maturity, links, and optional roadmap preview |
| `ProductGrid` | product index | implemented | Separates featured and secondary product cards responsively |
| `FeaturedWorkSection` | homepage | implemented | Renders the bounded selected-work preview |
| `ProductLabSection` | homepage | implemented | Frames the featured product family and product-lab routes |
| `SelectedRoadmapsSection` | homepage | implemented | Renders the optional ecosystem roadmap preview |
| `TechnicalFocusSection` | homepage | implemented | Renders structured capability summaries |
| `PublicationsPreviewSection` | homepage | implemented | Renders verified research credibility without a full publication system |
| `ContactCTASection` | homepage | implemented | Renders link-derived closing actions |
| `PublicationCard` | publications | implemented | Renders one verified publication with optional metadata |
| `PublicationList` | publications | implemented | Renders verified records or an honest empty state |
| `MediaCard` | gallery | implemented | Renders optimized media with accessible metadata |
| `ProjectScreenshot` | gallery | implemented | Renders screenshot variants |
| `GalleryGrid` | gallery | implemented | Renders responsive records or the empty state |
| `GalleryEmptyState` | gallery | implemented | Explains unavailable media without fake assets |
| `GalleryPreviewSection` | work | implemented | Integrates placement-filtered media |

| `WritingCard` | writing | implemented | Renders verified published writing metadata |
| `WritingEmptyState` | writing | implemented | Renders useful pathways when writing is empty |
| `ContactCard` | contact | implemented | Renders one derived contact pathway |
| `ContactPanel` | contact | implemented | Renders contact context, channels, and email fallback |

| `JsonLd` | SEO | implemented | Safely serializes local structured-data nodes |

M12 refined cards, controls, section headers, shell, homepage, roadmap, and empty states without
changing component APIs. Responsive/accessibility and release hardening remain later milestones.
