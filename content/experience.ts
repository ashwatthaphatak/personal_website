import type { ExperienceRole } from "@/content/types";

export const experience: ExperienceRole[] = [
  {
    id: "precision-sustainable-agriculture",
    organization: "Precision Sustainable Agriculture",
    title: "Systems Software Intern",
    dates: "May 2025 - Present",
    location: "Raleigh, NC",
    bullets: [
      "Built a one-touch commissioning workflow for Jetson AGX Orin systems, modems, and switches to reduce field bring-up time per unit.",
      "Implemented deterministic multi-switch networking and static DHCP allocation across camera, sensor, and GPU nodes to reduce deployment misconfiguration risk.",
      "Shipped OTA update infrastructure for distributed embedded platforms, enabling touchless rollout across field devices.",
      "Implemented real-time diagnostics APIs for GPS, camera health, disk, network, and data collection to improve field triage and remote debugging.",
      "Refactored ROS1 communication into an IPC-based middleware path, improving on-device perception throughput consistency with fewer dropped frames."
    ]
  },
  {
    id: "systems-lab",
    organization: "Systems Lab (Dr. Yoon Man-ki)",
    title: "Research Assistant",
    dates: "Jan 2025 - May 2025",
    location: "Raleigh, NC",
    bullets: [
      "Extended OpenPCDet to support compressed LiDAR range-image representations (PBEA), enabling controlled reconstruction/latency studies for 3D detection.",
      "Benchmarked PointPillars and PV-RCNN on KITTI across multiple input resolutions, quantifying latency vs AP/recall trade-offs for real-time use.",
      "Built modular evaluation pipelines to compare resolution, runtime, and fidelity, shortening experiment turnaround and improving repeatability.",
      "Produced deployment-oriented recommendations for autonomy workloads based on timing variance and detector stability under constrained compute."
    ]
  },
  {
    id: "state-street-full-time",
    organization: "State Street",
    title: "Site Reliability Engineer",
    dates: "Jul 2023 - Jul 2024",
    location: "Bangalore, India",
    bullets: [
      "Supported hedge-ledger and financial services workloads in production, driving incident response and change execution for critical services.",
      "Improved release reliability with stricter pre-production checks and runbook-based recovery to reduce failed and rolled-back changes.",
      "Coordinated engineering and product teams during incident windows to restore service faster and reduce recovery friction.",
      "Automated reliability reporting workflows, reducing manual operational effort for on-call and service owners."
    ]
  },
  {
    id: "state-street-internship",
    organization: "State Street",
    title: "Cloud Infrastructure Intern",
    dates: "Jan 2023 - Jun 2023",
    location: "Bangalore, India",
    bullets: [
      "Built React reliability dashboards that consolidated infrastructure health signals into a single operational view for faster first-response triage.",
      "Unified cross-environment service-health metrics for cloud infrastructure monitoring, improving alert clarity and on-call handoff quality.",
      "Delivered automation tooling for repetitive infrastructure checks and reporting, removing manual steps from on-call workflows."
    ]
  }
];
