import type { ExperienceRole } from "@/content/types";

export const experience: ExperienceRole[] = [
  {
    id: "precision-sustainable-agriculture",
    organization: "Precision Sustainable Agriculture",
    title: "Systems Software Intern",
    dates: "May 2025 - Present",
    location: "Raleigh, NC",
    bullets: [
      "Built a one-touch commissioning workflow for Jetson AGX Orin devices, Wi-Fi modems, and managed switches, enabling repeatable field deployment across edge systems.",
      "Implemented static DHCP assignment and multi-switch networking logic for deterministic IP allocation across camera, sensor, and GPU nodes.",
      "Designed OTA update infrastructure for centralized, touchless rollout of system and application updates to distributed embedded platforms.",
      "Implemented a real-time diagnostics API aggregating GPS, camera connectivity, disk, network, and data collection health metrics.",
      "Refactored ROS1 communication into a lean IPC-based middleware layer, improving throughput and reliability for on-device perception pipelines."
    ]
  },
  {
    id: "systems-lab",
    organization: "Systems Lab (Dr. Yoon Man-ki)",
    title: "Research Assistant",
    dates: "Jan 2025 - May 2025",
    location: "Raleigh, NC",
    bullets: [
      "Extended OpenPCDet to support compressed LiDAR range-image representations (PBEA) for 3D detection experimentation.",
      "Benchmarked PointPillars and PV-RCNN on KITTI across multiple range-image resolutions, measuring latency, recall, and average precision.",
      "Built modular evaluation pipelines to quantify resolution vs. runtime vs. detection-fidelity trade-offs.",
      "Analyzed inference timing variability to derive practical efficiency recommendations for real-time autonomy systems."
    ]
  },
  {
    id: "state-street-full-time",
    organization: "State Street",
    title: "Site-Developability Engineer",
    dates: "Jul 2023 - Jul 2024",
    location: "Bangalore, India",
    bullets: [
      "Supported hedge-ledger and financial platforms through incident response and production change workflows to improve service stability.",
      "Coordinated product owners and core engineering teams to reduce operational risk during releases and incident recovery windows.",
      "Improved production deployability and operational readiness by tightening release checks and runbook-driven recovery workflows.",
      "Automated operational reporting and reliability visibility workflows for day-to-day SRE operations."
    ]
  },
  {
    id: "state-street-internship",
    organization: "State Street",
    title: "Cloud Infrastructure Intern",
    dates: "Jan 2023 - Jun 2023",
    location: "Bangalore, India",
    bullets: [
      "Built reliability dashboards in React to centralize infrastructure health signals and speed up production triage.",
      "Assisted cloud infrastructure monitoring and incident triage by consolidating service-health metrics across environments.",
      "Supported automation scripts and operational tooling to reduce repetitive manual tasks in infrastructure workflows."
    ]
  }
];
